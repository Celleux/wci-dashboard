/**
 * Elo ratings loader for national teams.
 * Seed values live in lib/data/teams.ts::TEAM_ELO.
 * In a hot path, replace with a periodic fetch of eloratings.net or a cron job.
 */

import { TEAM_ELO, type TeamCode } from "@/lib/data/teams";

export interface EloTable {
  get(code: TeamCode): number;
  diff(home: TeamCode, away: TeamCode): number;
}

const DEFAULT_ELO = 1500;

export function eloTable(overrides?: Partial<Record<TeamCode, number>>): EloTable {
  const table: Record<string, number> = { ...TEAM_ELO, ...(overrides ?? {}) };
  return {
    get: (code) => table[code] ?? DEFAULT_ELO,
    diff: (home, away) => (table[home] ?? DEFAULT_ELO) - (table[away] ?? DEFAULT_ELO),
  };
}

/** K-factor 60 for World Cup matches (FIFA recommendation), 20 for friendlies. */
export const ELO_K = { wc: 60, knockout: 70, qualifier: 40, friendly: 20 } as const;

/**
 * Apply an Elo update after a real result.
 *   eloDiff = K * G * (W - W_expected)
 * where G = goal-difference multiplier, W = 1 win / 0.5 draw / 0 loss.
 */
export function eloUpdate({
  homeElo,
  awayElo,
  homeGoals,
  awayGoals,
  K = ELO_K.wc,
  neutralVenue = true,
}: {
  homeElo: number;
  awayElo: number;
  homeGoals: number;
  awayGoals: number;
  K?: number;
  neutralVenue?: boolean;
}) {
  const homeAdv = neutralVenue ? 0 : 100; // 100 Elo points for true home field
  const diff = homeElo + homeAdv - awayElo;
  const wExpHome = 1 / (1 + Math.pow(10, -diff / 400));

  const gd = Math.abs(homeGoals - awayGoals);
  const G = gd <= 1 ? 1 : gd === 2 ? 1.5 : (11 + gd) / 8;

  const wActual = homeGoals > awayGoals ? 1 : homeGoals === awayGoals ? 0.5 : 0;
  const delta = K * G * (wActual - wExpHome);

  return { homeElo: homeElo + delta, awayElo: awayElo - delta, delta };
}
