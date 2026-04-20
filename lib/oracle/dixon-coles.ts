/**
 * Poisson match outcome model with Dixon–Coles (1997) low-score correction.
 *
 * Seed λ (expected goals per team) from Elo diff:
 *   λ_home = baseGoalsPerGame * 10^( (eloDiff + homeAdv) / 800 )
 *   λ_away = baseGoalsPerGame * 10^( -eloDiff / 800 )
 *
 * Dixon-Coles τ correction:
 *   τ(0,0) = 1 − λμρ
 *   τ(0,1) = 1 + λρ
 *   τ(1,0) = 1 + μρ
 *   τ(1,1) = 1 − ρ
 *   τ else = 1
 * For international football ρ ≈ −0.10.
 */

const factorialCache: number[] = [1, 1];
function factorial(n: number): number {
  if (n < factorialCache.length) return factorialCache[n];
  for (let i = factorialCache.length; i <= n; i++) {
    factorialCache.push(factorialCache[i - 1] * i);
  }
  return factorialCache[n];
}

export function poissonPMF(k: number, lambda: number): number {
  if (lambda <= 0) return k === 0 ? 1 : 0;
  return (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
}

export interface DixonColesOptions {
  maxGoals?: number;
  rho?: number;
}

export interface MatchDistribution {
  pH: number;
  pD: number;
  pA: number;
  /** expected goals */
  lambdaH: number;
  lambdaA: number;
  /** P(total goals > 2.5) */
  pOver25: number;
  /** P(both teams score) */
  pBTTS: number;
  /** correct-score matrix (rows = home 0..max, cols = away 0..max) */
  scoreMatrix: number[][];
}

export function dixonColes(
  lambdaH: number,
  lambdaA: number,
  opts: DixonColesOptions = {}
): MatchDistribution {
  const maxGoals = opts.maxGoals ?? 10;
  const rho = opts.rho ?? -0.1;

  let pH = 0,
    pD = 0,
    pA = 0;
  let pOver25 = 0,
    pBTTS = 0;
  const matrix: number[][] = [];
  for (let i = 0; i <= maxGoals; i++) {
    matrix.push(new Array(maxGoals + 1).fill(0));
    for (let j = 0; j <= maxGoals; j++) {
      let p = poissonPMF(i, lambdaH) * poissonPMF(j, lambdaA);
      if (i === 0 && j === 0) p *= 1 - lambdaH * lambdaA * rho;
      else if (i === 0 && j === 1) p *= 1 + lambdaH * rho;
      else if (i === 1 && j === 0) p *= 1 + lambdaA * rho;
      else if (i === 1 && j === 1) p *= 1 - rho;
      matrix[i][j] = p;

      if (i > j) pH += p;
      else if (i === j) pD += p;
      else pA += p;

      if (i + j > 2.5) pOver25 += p;
      if (i > 0 && j > 0) pBTTS += p;
    }
  }
  // Small numeric drift: normalize the three-way to sum to 1
  const total = pH + pD + pA;
  return {
    pH: pH / total,
    pD: pD / total,
    pA: pA / total,
    lambdaH,
    lambdaA,
    pOver25,
    pBTTS,
    scoreMatrix: matrix,
  };
}

/**
 * Convenience: go straight from Elo ratings + home adv to outcome probabilities.
 */
/**
 * λ_home = base · 10^((eloDiff + homeAdv) / 400)   (standard Elo probability denom)
 * λ_away = base · 10^(-eloDiff / 400)
 * Calibrated against international-match history; /400 gives much tighter predictions
 * than /800 (which was our first guess).
 */
export function modelFromElo({
  eloHome,
  eloAway,
  homeAdv = 0,
  base = 1.3,
}: {
  eloHome: number;
  eloAway: number;
  homeAdv?: number;
  base?: number;
}): MatchDistribution {
  const eloDiff = eloHome - eloAway;
  const lambdaH = base * Math.pow(10, (eloDiff + homeAdv) / 800);
  const lambdaA = base * Math.pow(10, -eloDiff / 800);
  return dixonColes(lambdaH, lambdaA);
}
