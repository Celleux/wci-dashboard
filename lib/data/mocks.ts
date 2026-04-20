// Mock match / leaderboard data — ported from prototype data.jsx.
// Used until the Supabase seed script populates the real tables.

import type { TeamCode } from "./teams";

export interface MockMatch {
  id: string;
  teams: [TeamCode, TeamCode];
  md: string;
  venue: string;
  pools: [number, number, number]; // home, draw, away (USDC)
  pick?: TeamCode;
  conf?: number;
  // live
  minute?: number;
  score?: [number, number];
  // upcoming
  kickMs?: number;
  kickoff?: string;
  // final
  result?: "W" | "L";
  stake?: number;
  payout?: number;
}

// Anchor date — so countdowns render sensibly during demo builds
const now = Date.now();
const hours = (n: number) => now + n * 3600_000;
const iso = (ms: number) => new Date(ms).toISOString();

export const MOCK_LIVE: MockMatch[] = [
  {
    id: "l1",
    teams: ["USA", "TUR"],
    md: "MD2",
    venue: "SoFi, Inglewood",
    pools: [420, 180, 340],
    pick: "USA",
    conf: 78,
    minute: 67,
    score: [1, 1],
  },
  {
    id: "l2",
    teams: ["BRA", "SCO"],
    md: "MD2",
    venue: "Estadio Azteca, Mexico City",
    pools: [610, 210, 180],
    pick: "BRA",
    conf: 88,
    minute: 34,
    score: [2, 0],
  },
  {
    id: "l3",
    teams: ["FRA", "NOR"],
    md: "MD2",
    venue: "MetLife, East Rutherford",
    pools: [510, 250, 380],
    pick: "FRA",
    conf: 62,
    minute: 82,
    score: [2, 2],
  },
];

export const MOCK_UPCOMING: MockMatch[] = [
  {
    id: "u1",
    teams: ["ENG", "CRO"],
    md: "MD1",
    venue: "AT&T, Arlington",
    pools: [380, 220, 360],
    pick: "ENG",
    conf: 54,
    kickMs: hours(2.2),
    kickoff: iso(hours(2.2)),
  },
  {
    id: "u2",
    teams: ["ARG", "AUT"],
    md: "MD1",
    venue: "Mercedes, Atlanta",
    pools: [620, 150, 140],
    pick: "ARG",
    conf: 84,
    kickMs: hours(5),
    kickoff: iso(hours(5)),
  },
  {
    id: "u3",
    teams: ["GER", "ECU"],
    md: "MD1",
    venue: "Gillette, Boston",
    pools: [420, 180, 260],
    pick: "GER",
    conf: 69,
    kickMs: hours(8.6),
    kickoff: iso(hours(8.6)),
  },
  {
    id: "u4",
    teams: ["NED", "JPN"],
    md: "MD1",
    venue: "Lumen, Seattle",
    pools: [310, 180, 290],
    pick: "NED",
    conf: 58,
    kickMs: hours(27),
    kickoff: iso(hours(27)),
  },
  {
    id: "u5",
    teams: ["POR", "COL"],
    md: "MD2",
    venue: "NRG, Houston",
    pools: [420, 160, 380],
    pick: "POR",
    conf: 61,
    kickMs: hours(32),
    kickoff: iso(hours(32)),
  },
  {
    id: "u6",
    teams: ["ESP", "URU"],
    md: "MD2",
    venue: "BMO, Toronto",
    pools: [510, 180, 220],
    pick: "ESP",
    conf: 74,
    kickMs: hours(35),
    kickoff: iso(hours(35)),
  },
];

export const MOCK_FINAL: MockMatch[] = [
  { id: "f1", teams: ["MEX", "KOR"], md: "MD1", venue: "Estadio Azteca", pools: [0, 0, 0], result: "W", stake: 50, payout: 92.37, score: [2, 1] },
  { id: "f2", teams: ["CAN", "QAT"], md: "MD1", venue: "BMO, Toronto",   pools: [0, 0, 0], result: "W", stake: 25, payout: 51.5,  score: [2, 0] },
  { id: "f3", teams: ["BRA", "HAI"], md: "MD1", venue: "Mercedes, Atlanta", pools: [0, 0, 0], result: "W", stake: 40, payout: 68.2,  score: [3, 0] },
  { id: "f4", teams: ["AUS", "PAR"], md: "MD1", venue: "Lumen, Seattle", pools: [0, 0, 0], result: "L", stake: 30, payout: 0,     score: [1, 2] },
];

export interface MockLeader {
  rank: number;
  handle: string;
  country: TeamCode;
  pnl: number;
  roi: number;
  bets: number;
  streak: number;
  badge?: "oracle" | "whale" | null;
  you?: boolean;
}

export const MOCK_LEADERBOARD: MockLeader[] = [
  { rank: 1, handle: "PAUL.eth",     country: "GER", pnl: 42180, roi: 214, bets: 89,  streak: 11, badge: "oracle" },
  { rank: 2, handle: "kraken_bets",  country: "JPN", pnl: 28340, roi: 178, bets: 124, streak: 7,  badge: "whale" },
  { rank: 3, handle: "squiddington", country: "ENG", pnl: 19820, roi: 145, bets: 156, streak: 4,  badge: "whale" },
  { rank: 4, handle: "nostradame",   country: "FRA", pnl: 14200, roi: 132, bets: 78,  streak: 6,  badge: "oracle" },
  { rank: 5, handle: "tifosi_42",    country: "BRA", pnl: 9870,  roi: 119, bets: 203, streak: 2,  badge: null },
  { rank: 6, handle: "YOU",          country: "USA", pnl: 1274,  roi: 108, bets: 23,  streak: 3,  you: true },
  { rank: 7, handle: "0xOracle",     country: "KOR", pnl: 840,   roi: 104, bets: 41,  streak: 1,  badge: null },
  { rank: 8, handle: "orange_blob",  country: "NED", pnl: 612,   roi: 102, bets: 67,  streak: 0,  badge: null },
  { rank: 9, handle: "pepecopa",    country: "ARG", pnl: 420,   roi: 99,  bets: 54,  streak: 0,  badge: null },
  { rank: 10, handle: "degen_gk",   country: "ESP", pnl: 180,   roi: 97,  bets: 88,  streak: 0,  badge: null },
];

export const MOCK_PROFILE = {
  handle: "paulfan.eth",
  wallet: "0xA3F7…D912",
  country: "USA" as TeamCode,
  rank: 6,
  pnl: 1274.45,
  roi: 108,
  bets: 23,
  wins: 14,
  losses: 9,
  streak: 3,
  wci: 312_000,
  usdc: 2_450,
  claimable: 92.37,
};
