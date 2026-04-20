"use client";

import { PaulHeroCard } from "@/components/cards/PaulHeroCard";
import { NextMatchCard } from "@/components/cards/NextMatchCard";
import { StatStrip } from "@/components/home/StatStrip";
import { MatchesList } from "@/components/home/MatchesList";
import { LeaderboardPreview } from "@/components/home/LeaderboardPreview";
import { MyBetsPreview } from "@/components/home/MyBetsPreview";
import { OraclePredictionCard } from "@/components/home/OraclePredictionCard";
import { PaulConfessionCard, PaulLedgerCard } from "@/components/home/PaulConfessionCard";

export default function Scoreboard() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Hero row */}
      <section className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <PaulHeroCard paulSize={280} />
        <NextMatchCard
          onPickOutcome={(side) => {
            console.log("pick", side);
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

      {/* Bottom row — Leaderboard + Paul's Ledger */}
      <section className="grid gap-4 md:grid-cols-2 md:gap-6">
        <LeaderboardPreview />
        <PaulLedgerCard />
      </section>
    </div>
  );
}
