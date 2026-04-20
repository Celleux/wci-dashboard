import { NextResponse, type NextRequest } from "next/server";
import { getSupabase } from "@/lib/db/supabase";
import { getWC2026Fixtures } from "@/lib/api/api-football";

export const revalidate = 60;

/**
 * GET /api/fixtures
 * Query params: ?status=NS|LIVE|FT ?group=A..L ?round=Group%20Stage%20-%201
 *
 * Strategy: prefer Supabase (seeded by scripts/seed-fixtures.ts). If Supabase
 * isn't configured, fall through to a live API-Football call.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status");
  const group = searchParams.get("group");
  const round = searchParams.get("round");

  const sb = getSupabase();
  if (sb) {
    let q = sb.from("fixtures").select("*").order("kickoff", { ascending: true });
    if (status) q = q.eq("status", status);
    if (round) q = q.eq("round", round);
    const { data, error } = await q;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const filtered = group
      ? data?.filter((f) => {
          // join on teams.grp — fallback filter to home team's group
          return true; // TODO: require teams join when ready
        })
      : data;
    return NextResponse.json({ fixtures: filtered ?? [] });
  }

  // Fallback: live API-Football
  try {
    const fixtures = await getWC2026Fixtures();
    return NextResponse.json({ fixtures, source: "api-football" });
  } catch (e: unknown) {
    return NextResponse.json(
      { fixtures: [], error: (e as Error).message, source: "error" },
      { status: 503 }
    );
  }
}
