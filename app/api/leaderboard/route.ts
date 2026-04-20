import { NextResponse, type NextRequest } from "next/server";
import { getSupabase } from "@/lib/db/supabase";

export const revalidate = 60;

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type") ?? "reward";
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ entries: [], type });

  const view =
    type === "grudge" ? "leaderboard_grudge" :
    type === "reward" ? "leaderboard_reward" : "leaderboard_reward";

  const { data, error } = await sb.from(view).select("*").limit(100);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ entries: data ?? [], type });
}
