import { NextResponse } from "next/server";
import { getWCOdds } from "@/lib/api/odds-api";

export const revalidate = 60;

export async function GET() {
  try {
    const odds = await getWCOdds();
    return NextResponse.json({ events: odds });
  } catch (e) {
    return NextResponse.json(
      { events: [], error: (e as Error).message },
      { status: 503 }
    );
  }
}
