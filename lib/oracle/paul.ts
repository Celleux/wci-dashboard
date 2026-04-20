/**
 * Paul the Oracle — ensemble predictor.
 *
 *   P_Paul = w_model · P_DixonColes + w_pinnacle · P_Pinnacle_devig + w_poly · P_Polymarket
 *
 * Default weights: 0.40 / 0.40 / 0.20. If a source is missing, its weight is
 * redistributed proportionally.
 *
 * Exposes a 0..99 confidence number and a pick ∈ {HOME, DRAW, AWAY}.
 */

import { modelFromElo } from "./dixon-coles";
import { devigProportional, type Probs3 } from "./devig";
import { eloTable } from "./elo";
import type { TeamCode } from "@/lib/data/teams";
import { isHomeAdvantage } from "@/lib/data/teams";

export interface OracleInput {
  fixtureId: number;
  home: TeamCode;
  away: TeamCode;
  venueCity: string;
  pinnacle?: { home: number; draw: number; away: number }; // decimal odds
  polymarket?: { home: number; draw: number; away: number }; // already-probabilistic mid prices
}

export interface OraclePick {
  fixtureId: number;
  pick: "HOME" | "DRAW" | "AWAY";
  confidence: number; // 0..99
  probabilities: Probs3;
  sources: {
    model: Probs3;
    pinnacle?: Probs3;
    polymarket?: Probs3;
  };
  weights: { model: number; pinnacle: number; polymarket: number };
}

const DEFAULTS = { model: 0.4, pinnacle: 0.4, polymarket: 0.2 };

export function paulOraclePick(input: OracleInput, weights = DEFAULTS): OraclePick {
  const elo = eloTable();
  const homeAdv =
    isHomeAdvantage(input.home, input.venueCity) ? 80 :
    isHomeAdvantage(input.away, input.venueCity) ? -80 : 0;

  const model = modelFromElo({
    eloHome: elo.get(input.home),
    eloAway: elo.get(input.away),
    homeAdv,
  });

  const pinnacle = input.pinnacle ? devigProportional(input.pinnacle) : undefined;
  const polymarket = input.polymarket
    ? normalize(input.polymarket.home, input.polymarket.draw, input.polymarket.away)
    : undefined;

  // Redistribute missing-source weights proportionally
  let wM = weights.model;
  let wP = pinnacle ? weights.pinnacle : 0;
  let wY = polymarket ? weights.polymarket : 0;
  const sum = wM + wP + wY;
  wM /= sum;
  wP /= sum;
  wY /= sum;

  const blend = (k: "pH" | "pD" | "pA") =>
    wM * (model as any)[k] + (pinnacle ? wP * (pinnacle as any)[k] : 0) + (polymarket ? wY * (polymarket as any)[k] : 0);

  const probs: Probs3 = { pH: blend("pH"), pD: blend("pD"), pA: blend("pA") };
  const max = Math.max(probs.pH, probs.pD, probs.pA);
  const pick: OraclePick["pick"] =
    probs.pH === max ? "HOME" : probs.pD === max ? "DRAW" : "AWAY";

  // Map max probability [1/3 .. 1] to 0..99 confidence
  const confidence = Math.max(0, Math.min(99, Math.round(((max - 1 / 3) / (2 / 3)) * 100)));

  return {
    fixtureId: input.fixtureId,
    pick,
    confidence,
    probabilities: probs,
    sources: { model: { pH: model.pH, pD: model.pD, pA: model.pA }, pinnacle, polymarket },
    weights: { model: wM, pinnacle: wP, polymarket: wY },
  };
}

function normalize(a: number, b: number, c: number): Probs3 {
  const s = a + b + c;
  return { pH: a / s, pD: b / s, pA: c / s };
}

/**
 * Brier score for a multi-class probabilistic prediction. Lower is better.
 * actual: 'H'|'D'|'A'
 */
export function brierScore(probs: Probs3, actual: "H" | "D" | "A"): number {
  const tH = actual === "H" ? 1 : 0;
  const tD = actual === "D" ? 1 : 0;
  const tA = actual === "A" ? 1 : 0;
  return (probs.pH - tH) ** 2 + (probs.pD - tD) ** 2 + (probs.pA - tA) ** 2;
}
