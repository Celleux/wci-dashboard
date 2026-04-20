/**
 * Polymarket — free Gamma API for prediction-market sentiment.
 * Read-only. No auth.
 */

const GAMMA = "https://gamma-api.polymarket.com";

export interface PolyMarket {
  question: string;
  outcomes: string[];
  outcomePrices: string[];
  volume: number;
  endDate: string;
  slug: string;
  conditionId?: string;
}

export async function getWCPolymarketOutrights(): Promise<PolyMarket[]> {
  const r = await fetch(`${GAMMA}/markets?tag_id=soccer&active=true&limit=200`, {
    // @ts-ignore
    next: { revalidate: 120 },
  });
  if (!r.ok) throw new Error(`Polymarket ${r.status}`);
  const rows = (await r.json()) as any[];
  return rows
    .filter((m) => /world cup 2026/i.test(m.question ?? ""))
    .map((m) => ({
      question: m.question,
      outcomes: Array.isArray(m.outcomes) ? m.outcomes : safeJson(m.outcomes),
      outcomePrices: Array.isArray(m.outcomePrices) ? m.outcomePrices : safeJson(m.outcomePrices),
      volume: Number(m.volume ?? 0),
      endDate: m.endDate ?? "",
      slug: m.slug ?? "",
      conditionId: m.conditionId,
    }));
}

function safeJson<T = unknown>(s: unknown): T {
  if (typeof s !== "string") return s as T;
  try {
    return JSON.parse(s) as T;
  } catch {
    return s as unknown as T;
  }
}
