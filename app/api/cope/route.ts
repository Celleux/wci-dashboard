import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/db/supabase";

export const revalidate = 30;

export async function GET() {
  const sb = getSupabase();
  if (!sb) return NextResponse.json({ cards: [] });
  const { data, error } = await sb
    .from("cope_cards")
    .select("*")
    .eq("redacted", false)
    .order("minted_at", { ascending: false })
    .limit(100);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ cards: data ?? [] });
}
