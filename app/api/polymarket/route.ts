import { NextResponse } from "next/server";
import { getWCPolymarketOutrights } from "@/lib/api/polymarket";

export const revalidate = 120;

export async function GET() {
  try {
    const markets = await getWCPolymarketOutrights();
    return NextResponse.json({ markets });
  } catch (e) {
    return NextResponse.json(
      { markets: [], error: (e as Error).message },
      { status: 503 }
    );
  }
}
