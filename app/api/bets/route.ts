import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/db/supabase";

export const dynamic = "force-dynamic";

const PlaceSchema = z.object({
  fixtureId: z.number().int().positive(),
  side: z.enum(["home", "draw", "away"]),
  stake: z.number().positive(),
  oddsAtEntry: z.number().positive(),
});

export async function GET(req: NextRequest) {
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ bets: [] });
  const user = req.nextUrl.searchParams.get("user");
  let q = sb.from("bets").select("*").order("placed_at", { ascending: false });
  if (user) q = q.eq("user_id", user);
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ bets: data ?? [] });
}

export async function POST(req: NextRequest) {
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ error: "db not configured" }, { status: 503 });
  const body = await req.json().catch(() => null);
  const parsed = PlaceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }
  // Auth check deferred to Supabase RLS + the caller's session
  const { data, error } = await sb
    .from("bets")
    .insert([
      {
        fixture_id: parsed.data.fixtureId,
        side: parsed.data.side,
        stake: parsed.data.stake,
        odds_at_entry: parsed.data.oddsAtEntry,
      },
    ])
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ bet: data });
}
