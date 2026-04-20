/**
 * One-shot seeding: pull 104 WC2026 fixtures from API-Football and insert into Supabase.
 *
 * Prereqs in .env.local:
 *   API_FOOTBALL_KEY
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Run: npx tsx scripts/seed-fixtures.ts
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv();

import { createClient } from "@supabase/supabase-js";

const AF_KEY = process.env.API_FOOTBALL_KEY;
const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!AF_KEY) {
  console.error("Missing API_FOOTBALL_KEY — skipping seed. Obtain key at api-football.com.");
  process.exit(0);
}
if (!SB_URL || !SB_KEY) {
  console.error("Missing Supabase env. See .env.example.");
  process.exit(1);
}

const sb = createClient(SB_URL, SB_KEY, { auth: { persistSession: false } });

const TEAMS = [
  ["MEX", "Mexico", "A"], ["RSA", "South Africa", "A"], ["KOR", "Korea Republic", "A"], ["CZE", "Czechia", "A"],
  ["CAN", "Canada", "B"], ["BIH", "Bosnia", "B"], ["QAT", "Qatar", "B"], ["SUI", "Switzerland", "B"],
  ["BRA", "Brazil", "C"], ["MAR", "Morocco", "C"], ["HAI", "Haiti", "C"], ["SCO", "Scotland", "C"],
  ["USA", "USA", "D"], ["PAR", "Paraguay", "D"], ["AUS", "Australia", "D"], ["TUR", "Türkiye", "D"],
  ["GER", "Germany", "E"], ["CUW", "Curaçao", "E"], ["CIV", "Côte d'Ivoire", "E"], ["ECU", "Ecuador", "E"],
  ["NED", "Netherlands", "F"], ["JPN", "Japan", "F"], ["SWE", "Sweden", "F"], ["TUN", "Tunisia", "F"],
  ["BEL", "Belgium", "G"], ["EGY", "Egypt", "G"], ["IRN", "Iran", "G"], ["NZL", "New Zealand", "G"],
  ["ESP", "Spain", "H"], ["CPV", "Cape Verde", "H"], ["KSA", "Saudi Arabia", "H"], ["URU", "Uruguay", "H"],
  ["FRA", "France", "I"], ["SEN", "Senegal", "I"], ["IRQ", "Iraq", "I"], ["NOR", "Norway", "I"],
  ["ARG", "Argentina", "J"], ["ALG", "Algeria", "J"], ["AUT", "Austria", "J"], ["JOR", "Jordan", "J"],
  ["POR", "Portugal", "K"], ["COD", "DR Congo", "K"], ["UZB", "Uzbekistan", "K"], ["COL", "Colombia", "K"],
  ["ENG", "England", "L"], ["CRO", "Croatia", "L"], ["GHA", "Ghana", "L"], ["PAN", "Panama", "L"],
] as const;

type Fixture = {
  fixture: {
    id: number;
    date: string;
    status: { short: string };
    venue: { name: string | null; city: string | null };
  };
  teams: {
    home: { id: number; name: string };
    away: { id: number; name: string };
  };
  goals: { home: number | null; away: number | null };
  league: { round: string };
};

async function main() {
  console.log("Seeding teams (48)…");
  const teamRows = TEAMS.map(([code, name, grp]) => ({ code, name, grp, colors: ["#666", "#999"] }));
  const { error: teamErr } = await sb.from("teams").upsert(teamRows);
  if (teamErr) throw teamErr;

  console.log("Pulling WC2026 fixtures from API-Football…");
  const r = await fetch(
    "https://v3.football.api-sports.io/fixtures?league=1&season=2026",
    { headers: { "x-apisports-key": AF_KEY! } }
  );
  if (!r.ok) throw new Error(`API-Football ${r.status}`);
  const json = (await r.json()) as { response: Fixture[] };
  console.log(`  got ${json.response.length} fixtures`);

  // Normalize API-Football round strings to our enum
  const mapRound = (r: string): string | null => {
    if (/1st Round|Group Stage - 1/.test(r)) return "Group Stage - 1";
    if (/2nd Round|Group Stage - 2/.test(r)) return "Group Stage - 2";
    if (/3rd Round|Group Stage - 3/.test(r)) return "Group Stage - 3";
    if (/Round of 32/.test(r)) return "Round of 32";
    if (/Round of 16/.test(r)) return "Round of 16";
    if (/Quarter/.test(r)) return "Quarter-finals";
    if (/Semi/.test(r)) return "Semi-finals";
    if (/3rd Place/.test(r)) return "3rd Place Final";
    if (/^Final$/.test(r)) return "Final";
    return null;
  };

  const teamIdxByName = new Map<string, string>();
  for (const [code, name] of TEAMS) teamIdxByName.set(name.toLowerCase(), code);

  const rows = json.response.flatMap((f): any[] => {
    const round = mapRound(f.league.round);
    if (!round) return [];
    const home = teamIdxByName.get(f.teams.home.name.toLowerCase());
    const away = teamIdxByName.get(f.teams.away.name.toLowerCase());
    if (!home || !away) {
      console.warn(`  skipping fixture ${f.fixture.id} — unknown team ${f.teams.home.name} / ${f.teams.away.name}`);
      return [];
    }
    return [{
      id: f.fixture.id,
      kickoff: f.fixture.date,
      status: f.fixture.status.short,
      round,
      venue_name: f.fixture.venue.name ?? "TBD",
      venue_city: f.fixture.venue.city ?? "TBD",
      home_code: home,
      away_code: away,
      score_home: f.goals.home,
      score_away: f.goals.away,
    }];
  });

  console.log(`Upserting ${rows.length} fixtures to Supabase…`);
  const { error } = await sb.from("fixtures").upsert(rows);
  if (error) throw error;
  console.log("Done.");
}

main().catch((e) => {
  console.error("seed-fixtures failed:", e);
  process.exit(1);
});
