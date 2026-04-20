/**
 * The Odds API (the-odds-api.com) — 3-way reference odds from ~60 sportsbooks.
 * Returns median consensus + vig-free probabilities (proportional de-vig).
 */

import { devigProportional, medianOdds, type DecimalOdds3 } from "@/lib/oracle/devig";

const BASE = "https://api.the-odds-api.com/v4";
const SPORT = "soccer_fifa_world_cup";

function key() {
  const k = process.env.ODDS_API_KEY;
  if (!k) throw new Error("ODDS_API_KEY missing");
  return k;
}

export interface ReferenceOdds {
  eventId: string;
  kickoff: string;
  home: string;
  away: string;
  books: Array<{ name: string; h2h: DecimalOdds3 }>;
  consensus: DecimalOdds3;
  fairProbs: { pH: number; pD: number; pA: number };
}

type OAEvent = {
  id: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Array<{
    title: string;
    markets: Array<{
      key: string;
      outcomes: Array<{ name: string; price: number }>;
    }>;
  }>;
};

export async function getWCOdds(): Promise<ReferenceOdds[]> {
  const url = new URL(`${BASE}/sports/${SPORT}/odds/`);
  url.searchParams.set("apiKey", key());
  url.searchParams.set("regions", "us,uk,eu");
  url.searchParams.set("markets", "h2h");
  url.searchParams.set("oddsFormat", "decimal");

  const r = await fetch(url.toString(), {
    // @ts-ignore
    next: { revalidate: 60 },
  });
  if (!r.ok) throw new Error(`OddsAPI ${r.status}`);
  const events = (await r.json()) as OAEvent[];

  return events
    .map((ev): ReferenceOdds | null => {
      const books = ev.bookmakers
        .map((b) => {
          const h2h = b.markets.find((m) => m.key === "h2h");
          if (!h2h) return null;
          const home = h2h.outcomes.find((o) => o.name === ev.home_team)?.price;
          const away = h2h.outcomes.find((o) => o.name === ev.away_team)?.price;
          const draw = h2h.outcomes.find((o) => o.name === "Draw")?.price;
          return home && away && draw ? { name: b.title, h2h: { home, draw, away } } : null;
        })
        .filter((b): b is NonNullable<typeof b> => b !== null);

      if (!books.length) return null;

      const consensus = medianOdds(books.map((b) => b.h2h));
      const fairProbs = devigProportional(consensus);

      return {
        eventId: ev.id,
        kickoff: ev.commence_time,
        home: ev.home_team,
        away: ev.away_team,
        books,
        consensus,
        fairProbs: { pH: fairProbs.pH, pD: fairProbs.pD, pA: fairProbs.pA },
      };
    })
    .filter((x): x is ReferenceOdds => x !== null);
}

export async function getSportKey() {
  const url = new URL(`${BASE}/sports`);
  url.searchParams.set("apiKey", key());
  const r = await fetch(url.toString());
  if (!r.ok) throw new Error(`OddsAPI sports ${r.status}`);
  return (await r.json()) as Array<{ key: string; title: string; active: boolean }>;
}
