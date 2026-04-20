import { NextResponse } from "next/server";
import { getTaxTicker } from "@/lib/api/etherscan";

export const revalidate = 60;

export async function GET() {
  const data = await getTaxTicker();
  return NextResponse.json(data);
}
