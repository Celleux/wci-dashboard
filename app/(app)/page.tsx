"use client";

import { PaulHeroCard } from "@/components/cards/PaulHeroCard";
import { NextMatchCard } from "@/components/cards/NextMatchCard";
import { MatchCard } from "@/components/cards/MatchCard";
import { LeaderboardPreview } from "@/components/home/LeaderboardPreview";
import { MyBetsPreview } from "@/components/home/MyBetsPreview";
import { MOCK_LIVE, MOCK_UPCOMING } from "@/lib/data/mocks";

export default function Scoreboard() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Hero row — Paul + next match (v0-generated, self-contained) */}
      <section className="grid gap-4 md:grid-cols-2 md:gap-6">
        <PaulHeroCard paulSize={280} />
        <NextMatchCard
          onPickOutcome={(side) => {
            // Store-wire lives in lib/store/betSlipStore.ts (future chat);
            // for now log so we can verify interaction works.
            console.log("pick", side);
          }}
        />
      </section>

      {/* Live matches */}
      <section>
        <header className="mb-3 flex items-center justify-between">
          <h2 className="card-title">Live now</h2>
          <span className="label">{MOCK_LIVE.length} matches</span>
        </header>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {MOCK_LIVE.map((m) => (
            <MatchCard
              key={m.id}
              status="live"
              home={m.teams[0]}
              away={m.teams[1]}
              minute={m.minute!}
              score={m.score!}
              pool={{ home: m.pools[0], draw: m.pools[1], away: m.pools[2] }}
              md={m.md}
              venue={m.venue}
            />
          ))}
        </div>
      </section>

      {/* Upcoming matches */}
      <section>
        <header className="mb-3 flex items-center justify-between">
          <h2 className="card-title">Upcoming</h2>
          <span className="label">Next 48 hours</span>
        </header>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {MOCK_UPCOMING.slice(0, 6).map((m) => (
            <MatchCard
              key={m.id}
              status="upcoming"
              home={m.teams[0]}
              away={m.teams[1]}
              kickoff={m.kickoff!}
              pool={{ home: m.pools[0], draw: m.pools[1], away: m.pools[2] }}
              md={m.md}
              venue={m.venue}
            />
          ))}
        </div>
      </section>

      {/* Leaderboard + My bets row */}
      <section className="grid gap-4 md:grid-cols-2 md:gap-6">
        <LeaderboardPreview />
        <MyBetsPreview />
      </section>
    </div>
  );
}
