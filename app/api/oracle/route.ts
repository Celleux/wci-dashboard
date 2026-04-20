import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { paulOraclePick } from "@/lib/oracle/paul";
import type { TeamCode } from "@/lib/data/teams";

const Schema = z.object({
  fixtureId: z.number().int().positive(),
  home: z.string().length(3),
  away: z.string().length(3),
  venueCity: z.string(),
  pinnacle: z
    .object({
      home: z.number().positive(),
      draw: z.number().positive(),
      away: z.number().positive(),
    })
    .optional(),
  polymarket: z
    .object({
      home: z.number().min(0).max(1),
      draw: z.number().min(0).max(1),
      away: z.number().min(0).max(1),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }
  const pick = paulOraclePick({
    ...parsed.data,
    home: parsed.data.home as TeamCode,
    away: parsed.data.away as TeamCode,
  });
  return NextResponse.json({ pick });
}
