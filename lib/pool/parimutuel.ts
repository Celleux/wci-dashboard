/**
 * Pari-mutuel betting math — 0% house edge per WCI playbook.
 *
 *   S = home + draw + away
 *   odds_i  = (1 - fee) * S / pool_i
 *   prob_i  = pool_i / S     (zero-vig by construction)
 */

export type PoolSplit = { home: number; draw: number; away: number };

export type DecimalOdds = { home: number; draw: number; away: number };

export type ImpliedProbs = { pH: number; pD: number; pA: number };

const EPS = 1e-9;

export function poolTotal(p: PoolSplit): number {
  return p.home + p.draw + p.away;
}

export function parimutuelOdds(p: PoolSplit, fee = 0): DecimalOdds {
  const S = poolTotal(p);
  if (S < EPS) return { home: Infinity, draw: Infinity, away: Infinity };
  const k = 1 - fee;
  return {
    home: p.home > EPS ? (k * S) / p.home : Infinity,
    draw: p.draw > EPS ? (k * S) / p.draw : Infinity,
    away: p.away > EPS ? (k * S) / p.away : Infinity,
  };
}

export function poolImpliedProbs(p: PoolSplit): ImpliedProbs {
  const S = poolTotal(p);
  if (S < EPS) return { pH: 1 / 3, pD: 1 / 3, pA: 1 / 3 };
  return { pH: p.home / S, pD: p.draw / S, pA: p.away / S };
}

/** Payout for a winning ticket: stake + share of loser pool. */
export function winningPayout(
  pools: PoolSplit,
  winnerSide: "home" | "draw" | "away",
  stake: number,
  fee = 0
): number {
  const winnerPool = pools[winnerSide];
  const S = poolTotal(pools);
  const distributable = (S - winnerPool) * (1 - fee);
  if (winnerPool < EPS) return stake;
  const share = (stake / winnerPool) * distributable;
  return stake + share;
}

/**
 * Cold-start seed: given reference probabilities (e.g. de-vigged Pinnacle),
 * return a pool split that totals `amount` and matches those probabilities.
 */
export function seedPoolFromProbs(amount: number, p: ImpliedProbs): PoolSplit {
  const norm = p.pH + p.pD + p.pA;
  return {
    home: (amount * p.pH) / norm,
    draw: (amount * p.pD) / norm,
    away: (amount * p.pA) / norm,
  };
}
