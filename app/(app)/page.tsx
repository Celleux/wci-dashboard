"use client";

import { PaulHeroCard } from "@/components/cards/PaulHeroCard";
import { NextMatchCard } from "@/components/cards/NextMatchCard";
import { StatStrip } from "@/components/home/StatStrip";
import { MatchesList } from "@/components/home/MatchesList";
import { LeaderboardPreview } from "@/components/home/LeaderboardPreview";
import { MyBetsPreview } from "@/components/home/MyBetsPreview";
import { OraclePredictionCard } from "@/components/home/OraclePredictionCard";
import { PaulConfessionCard, PaulLedgerCard } from "@/components/home/PaulConfessionCard";
import { useBetSlip } from "@/lib/store/betSlipStore";

export default function Scoreboard() {
  const pickOutcome = useBetSlip((s) => s.pickOutcome);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Hero row */}
      <section className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <PaulHeroCard />
        <NextMatchCard
          onPickOutcome={(side) => {
            const labels = { home: "USA", draw: "DRAW", away: "TUR" };
            const odds = { home: 2.24, draw: 5.22, away: 2.76 };
            pickOutcome({
              fixtureId: "next",
              home: "USA",
              away: "TUR",
              side,
              label: labels[side],
              odds: odds[side],
              venue: "SoFi, Inglewood",
              md: "MD2",
              kickoff: new Date(Date.now() + 2 * 3600_000 + 14 * 60_000).toISOString(),
            });
          }}
        />
      </section>

      {/* 4 KPI stat tiles */}
      <StatStrip />

      {/* Matches list + right column */}
      <section className="grid gap-4 lg:grid-cols-[1fr_360px] lg:gap-6">
        <MatchesList />
        <div className="flex flex-col gap-4 md:gap-6">
          <OraclePredictionCard />
          <MyBetsPreview />
          <PaulConfessionCard />
        </div>
      </section>

      {/* Bottom row */}
      <section className="grid gap-4 md:grid-cols-2 md:gap-6">
        <LeaderboardPreview />
        <PaulLedgerCard />
      </section>
    </div>
  );
}
