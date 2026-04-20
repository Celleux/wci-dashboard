/**
 * Pinnacle odds via RapidAPI relay "pinnacle-odds.p.rapidapi.com".
 * Used as the sharpest-book benchmark for the oracle ensemble.
 */

const HOST = "pinnacle-odds.p.rapidapi.com";
const SPORT_ID_SOCCER = 29;

function key() {
  const k = process.env.RAPIDAPI_KEY;
  if (!k) throw new Error("RAPIDAPI_KEY missing");
  return k;
}

type MarketRow = {
  event_id: number;
  starts: string;
  home: string;
  away: string;
  league_name: string;
  moneyline?: { home?: number; draw?: number; away?: number };
};

export interface PinnacleMatch {
  home: string;
  away: string;
  startsAt: string;
  moneyline?: { home: number; draw: number; away: number };
}

export async function getPinnacleWC(): Promise<PinnacleMatch[]> {
  const r = await fetch(
    `https://${HOST}/kit/v1/markets?sport_id=${SPORT_ID_SOCCER}&event_type=prematch&is_have_odds=true`,
    {
      headers: {
        "X-RapidAPI-Key": key(),
        "X-RapidAPI-Host": HOST,
      },
      // @ts-ignore
      next: { revalidate: 60 },
    }
  );
  if (!r.ok) throw new Error(`Pinnacle(RapidAPI) ${r.status}`);
  const body = (await r.json()) as { events: MarketRow[] };
  const rows = body.events.filter((e) => /World Cup/i.test(e.league_name));
  return rows.map((e) => ({
    home: e.home,
    away: e.away,
    startsAt: e.starts,
    moneyline:
      e.moneyline?.home && e.moneyline?.draw && e.moneyline?.away
        ? { home: e.moneyline.home, draw: e.moneyline.draw, away: e.moneyline.away }
        : undefined,
  }));
}
