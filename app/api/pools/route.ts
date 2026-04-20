import { NextResponse, type NextRequest } from "next/server";
import { getSupabase } from "@/lib/db/supabase";

export const revalidate = 30;

export async function GET(req: NextRequest) {
  const sb = getSupabase();
  const fixtureId = req.nextUrl.searchParams.get("fixtureId");
  if (!sb) {
    return NextResponse.json(
      { pools: [], error: "supabase not configured" },
      { status: 503 }
    );
  }

  if (fixtureId) {
    const { data, error } = await sb
      .from("pools")
      .select("*")
      .eq("fixture_id", Number(fixtureId))
      .maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ pool: data });
  }

  const { data, error } = await sb.from("pools").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ pools: data ?? [] });
}
