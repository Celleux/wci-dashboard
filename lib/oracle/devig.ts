/**
 * Turn decimal sportsbook odds into vig-free probabilities.
 *
 * Two methods:
 *  - `devigProportional` — cheap, biases toward favorite; fine for sharp books.
 *  - `devigShin` — Shin's model, more accurate for margin-heavy US books.
 */

export type DecimalOdds3 = { home: number; draw: number; away: number };
export type Probs3 = { pH: number; pD: number; pA: number };

export function impliedRaw(o: DecimalOdds3): Probs3 {
  return { pH: 1 / o.home, pD: 1 / o.draw, pA: 1 / o.away };
}

export function devigProportional(o: DecimalOdds3): Probs3 {
  const raw = impliedRaw(o);
  const book = raw.pH + raw.pD + raw.pA;
  return { pH: raw.pH / book, pD: raw.pD / book, pA: raw.pA / book };
}

/** Shin (1993) de-vig. Iteratively solves for z (insider-trading parameter). */
export function devigShin(o: DecimalOdds3): Probs3 {
  const raw = impliedRaw(o);
  const book = raw.pH + raw.pD + raw.pA;
  const qs = [raw.pH, raw.pD, raw.pA];

  const fAt = (z: number) =>
    qs
      .map(
        (q) =>
          (Math.sqrt(z * z + 4 * (1 - z) * (q * q) / book) - z) / (2 * (1 - z))
      )
      .reduce((a, b) => a + b, 0);

  // Bisection on z in [0, 0.5]
  let lo = 0;
  let hi = 0.5;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const s = fAt(mid);
    if (s > 1) lo = mid;
    else hi = mid;
  }
  const z = (lo + hi) / 2;
  const pAt = (q: number) =>
    (Math.sqrt(z * z + 4 * (1 - z) * (q * q) / book) - z) / (2 * (1 - z));
  return { pH: pAt(raw.pH), pD: pAt(raw.pD), pA: pAt(raw.pA) };
}

export function medianOdds(books: DecimalOdds3[]): DecimalOdds3 {
  const med = (arr: number[]) => {
    const a = [...arr].sort((x, y) => x - y);
    return a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2;
  };
  return {
    home: med(books.map((b) => b.home)),
    draw: med(books.map((b) => b.draw)),
    away: med(books.map((b) => b.away)),
  };
}
