/**
 * API-Football (api-football.com) client — fixtures, live, lineups, events.
 * Server-side only. Uses `x-apisports-key` header.
 * Docs: https://www.api-football.com/documentation-v3
 */

const BASE = "https://v3.football.api-sports.io";
const WC_LEAGUE_ID = 1;
const WC_SEASON = 2026;

function key() {
  const k = process.env.API_FOOTBALL_KEY;
  if (!k) throw new Error("API_FOOTBALL_KEY missing");
  return k;
}

export interface AFFixture {
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
}

async function call<T>(path: string, cache: RequestCache = "default"): Promise<T> {
  const r = await fetch(`${BASE}${path}`, {
    headers: { "x-apisports-key": key() },
    cache,
    // @ts-ignore — Next fetch extension
    next: { revalidate: 60 },
  });
  if (!r.ok) throw new Error(`api-football ${r.status} ${path}`);
  return (await r.json()) as T;
}

export async function getWC2026Fixtures(): Promise<AFFixture[]> {
  const { response } = await call<{ response: AFFixture[] }>(
    `/fixtures?league=${WC_LEAGUE_ID}&season=${WC_SEASON}`,
    "force-cache"
  );
  return response;
}

export async function getLiveFixture(fixtureId: number): Promise<AFFixture | null> {
  const { response } = await call<{ response: AFFixture[] }>(
    `/fixtures?id=${fixtureId}`,
    "no-store"
  );
  return response[0] ?? null;
}

export async function getLineups(fixtureId: number) {
  const { response } = await call<{ response: unknown[] }>(
    `/fixtures/lineups?fixture=${fixtureId}`
  );
  return response;
}

export async function getEvents(fixtureId: number) {
  const { response } = await call<{ response: unknown[] }>(
    `/fixtures/events?fixture=${fixtureId}`,
    "no-store"
  );
  return response;
}
