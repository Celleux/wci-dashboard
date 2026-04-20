// Canonical team data for WC26 — ported from prototype data.jsx.
// Adding FIFA-Elo defaults as seed values for the Dixon-Coles oracle model.

export type TeamCode =
  | "MEX" | "RSA" | "KOR" | "CZE"
  | "CAN" | "BIH" | "QAT" | "SUI"
  | "BRA" | "MAR" | "HAI" | "SCO"
  | "USA" | "PAR" | "AUS" | "TUR"
  | "GER" | "CUW" | "CIV" | "ECU"
  | "NED" | "JPN" | "SWE" | "TUN"
  | "BEL" | "EGY" | "IRN" | "NZL"
  | "ESP" | "CPV" | "KSA" | "URU"
  | "FRA" | "SEN" | "IRQ" | "NOR"
  | "ARG" | "ALG" | "AUT" | "JOR"
  | "POR" | "COD" | "UZB" | "COL"
  | "ENG" | "CRO" | "GHA" | "PAN";

export type GroupKey =
  | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L";

export const GROUPS: Record<GroupKey, { color: string; teams: TeamCode[] }> = {
  A: { color: "var(--grp-a)", teams: ["MEX", "RSA", "KOR", "CZE"] },
  B: { color: "var(--grp-b)", teams: ["CAN", "BIH", "QAT", "SUI"] },
  C: { color: "var(--grp-c)", teams: ["BRA", "MAR", "HAI", "SCO"] },
  D: { color: "var(--grp-d)", teams: ["USA", "PAR", "AUS", "TUR"] },
  E: { color: "var(--grp-e)", teams: ["GER", "CUW", "CIV", "ECU"] },
  F: { color: "var(--grp-f)", teams: ["NED", "JPN", "SWE", "TUN"] },
  G: { color: "var(--grp-g)", teams: ["BEL", "EGY", "IRN", "NZL"] },
  H: { color: "var(--grp-h)", teams: ["ESP", "CPV", "KSA", "URU"] },
  I: { color: "var(--grp-i)", teams: ["FRA", "SEN", "IRQ", "NOR"] },
  J: { color: "var(--grp-j)", teams: ["ARG", "ALG", "AUT", "JOR"] },
  K: { color: "var(--grp-k)", teams: ["POR", "COD", "UZB", "COL"] },
  L: { color: "var(--grp-l)", teams: ["ENG", "CRO", "GHA", "PAN"] },
};

export const TEAM_NAMES: Record<TeamCode, string> = {
  MEX: "Mexico", RSA: "South Africa", KOR: "Korea Republic", CZE: "Czechia",
  CAN: "Canada", BIH: "Bosnia", QAT: "Qatar", SUI: "Switzerland",
  BRA: "Brazil", MAR: "Morocco", HAI: "Haiti", SCO: "Scotland",
  USA: "USA", PAR: "Paraguay", AUS: "Australia", TUR: "Türkiye",
  GER: "Germany", CUW: "Curaçao", CIV: "Côte d'Ivoire", ECU: "Ecuador",
  NED: "Netherlands", JPN: "Japan", SWE: "Sweden", TUN: "Tunisia",
  BEL: "Belgium", EGY: "Egypt", IRN: "Iran", NZL: "New Zealand",
  ESP: "Spain", CPV: "Cape Verde", KSA: "Saudi Arabia", URU: "Uruguay",
  FRA: "France", SEN: "Senegal", IRQ: "Iraq", NOR: "Norway",
  ARG: "Argentina", ALG: "Algeria", AUT: "Austria", JOR: "Jordan",
  POR: "Portugal", COD: "DR Congo", UZB: "Uzbekistan", COL: "Colombia",
  ENG: "England", CRO: "Croatia", GHA: "Ghana", PAN: "Panama",
};

export const TEAM_COLORS: Record<TeamCode, [string, string]> = {
  MEX: ["#006341", "#CE1126"], RSA: ["#007749", "#FFB81C"], KOR: ["#FFFFFF", "#CD2E3A"], CZE: ["#D7141A", "#11457E"],
  CAN: ["#FF0000", "#FFFFFF"], BIH: ["#002F6C", "#FECB00"], QAT: ["#8A1538", "#FFFFFF"], SUI: ["#FF0000", "#FFFFFF"],
  BRA: ["#FEDB00", "#009B3A"], MAR: ["#C1272D", "#006233"], HAI: ["#00209F", "#D21034"], SCO: ["#0065BF", "#FFFFFF"],
  USA: ["#B22234", "#0B1F3F"], PAR: ["#D52B1E", "#0038A8"], AUS: ["#00843D", "#FFCD00"], TUR: ["#E30A17", "#FFFFFF"],
  GER: ["#000000", "#FFCE00"], CUW: ["#002B7F", "#F9E814"], CIV: ["#FF8200", "#009A44"], ECU: ["#FFD100", "#E8112D"],
  NED: ["#F36C21", "#21468B"], JPN: ["#FFFFFF", "#BC002D"], SWE: ["#006AA7", "#FECC00"], TUN: ["#E70013", "#FFFFFF"],
  BEL: ["#000000", "#FAE042"], EGY: ["#CE1126", "#000000"], IRN: ["#239F40", "#DA0000"], NZL: ["#0C2340", "#FFFFFF"],
  ESP: ["#C60B1E", "#FFC400"], CPV: ["#003893", "#CF2027"], KSA: ["#006C35", "#FFFFFF"], URU: ["#0038A8", "#FFFFFF"],
  FRA: ["#0055A4", "#EF4135"], SEN: ["#00853F", "#FDEF42"], IRQ: ["#007A3D", "#CE1126"], NOR: ["#EF2B2D", "#002868"],
  ARG: ["#74ACDF", "#FFFFFF"], ALG: ["#006233", "#FFFFFF"], AUT: ["#ED2939", "#FFFFFF"], JOR: ["#000000", "#007A3D"],
  POR: ["#FF0000", "#046A38"], COD: ["#007FFF", "#F7D618"], UZB: ["#1EB53A", "#0099B5"], COL: ["#FCD116", "#003893"],
  ENG: ["#FFFFFF", "#CE1124"], CRO: ["#FF0000", "#FFFFFF"], GHA: ["#FCD116", "#006B3F"], PAN: ["#D21034", "#005293"],
};

/**
 * Seed ratings — snapshot of World Football Elo (eloratings.net) ≈ Apr 2026.
 * Swap the runtime `getEloRatings()` (lib/oracle/elo.ts) to these at any time.
 * These are intentionally approximate — used only to seed the Dixon-Coles lambda.
 */
export const TEAM_ELO: Record<TeamCode, number> = {
  ARG: 2140, BRA: 2085, FRA: 2060, ESP: 2048, ENG: 2020, GER: 1998, POR: 1996,
  NED: 1985, BEL: 1950, CRO: 1945, URU: 1935, COL: 1905, MAR: 1900, SUI: 1870,
  USA: 1865, JPN: 1855, MEX: 1850, AUS: 1820, AUT: 1815, ECU: 1810, KOR: 1805,
  NOR: 1798, SEN: 1790, CAN: 1780, IRN: 1775, TUR: 1770, PAR: 1760, SCO: 1755,
  EGY: 1750, CIV: 1745, PAN: 1740, NZL: 1735, TUN: 1730, JOR: 1720, ALG: 1715,
  QAT: 1705, GHA: 1700, COD: 1695, UZB: 1688, CZE: 1680, SWE: 1672, BIH: 1660,
  IRQ: 1650, RSA: 1645, KSA: 1620, CPV: 1590, CUW: 1510, HAI: 1495,
};

export function teamGroup(code: TeamCode): GroupKey | null {
  for (const g of Object.keys(GROUPS) as GroupKey[]) {
    if (GROUPS[g].teams.includes(code)) return g;
  }
  return null;
}

/** Home advantage: only true for the three hosts at home venues. */
export function isHomeAdvantage(code: TeamCode, venueCity: string): boolean {
  if (code === "USA" && /Rutherford|Arlington|Inglewood|Atlanta|Boston|Houston|Philadelphia|Kansas City|Bay Area|Miami|Seattle/i.test(venueCity)) return true;
  if (code === "CAN" && /Toronto|Vancouver/i.test(venueCity)) return true;
  if (code === "MEX" && /Mexico City|Guadalajara|Monterrey/i.test(venueCity)) return true;
  return false;
}
