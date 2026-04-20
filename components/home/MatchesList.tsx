"use client";

import { useState } from "react";
import { AccentCard } from "@/components/shared/AccentCard";
import { FlagRect } from "@/components/shared/FlagRect";
import { GroupTile } from "@/components/shared/GroupTile";
import { Chip } from "@/components/shared/Chip";
import { PoolBar } from "@/components/shared/PoolBar";
import { Countdown } from "@/components/shared/Countdown";
import { TEAM_NAMES, teamGroup } from "@/lib/data/teams";
import { MOCK_LIVE, MOCK_UPCOMING, type MockMatch } from "@/lib/data/mocks";
import { parimutuelOdds } from "@/lib/pool/parimutuel";
import { cn } from "@/lib/utils/cn";

type Tab = "live" | "upcoming" | "all";

const TAB_DATA: Record<Tab, MockMatch[]> = {
  live: MOCK_LIVE,
  upcoming: MOCK_UPCOMING,
  all: [...MOCK_LIVE, ...MOCK_UPCOMING],
};

function MatchRow({ m }: { m: MockMatch }) {
  const [home, away] = m.teams;
  const group = teamGroup(home);
  const pool = { home: m.pools[0], draw: m.pools[1], away: m.pools[2] };
  const odds = parimutuelOdds(pool);
  const live = typeof m.minute === "number";

  return (
    <div
      className="grid items-center gap-3 rounded-xl border border-hair bg-[rgba(20,16,40,0.45)] px-3 py-3 hover:border-hair-strong transition-colors"
      style={{
        gridTemplateColumns: "auto minmax(0,1fr) auto auto auto",
      }}
    >
      {group && <GroupTile group={group} size={28} />}

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <FlagRect code={home} width={22} height={14} />
          <span className="display text-sm">{home}</span>
          <span className="text-t4 text-xs">vs</span>
          <FlagRect code={away} width={22} height={14} />
          <span className="display text-sm">{away}</span>
        </div>
        <div className="mono text-[11px] text-t3 truncate">
          {TEAM_NAMES[home]} · {TEAM_NAMES[away]} · {m.venue}
        </div>
      </div>

      <div className="w-40">
        <PoolBar pool={pool} barOnly />
      </div>

      <div className="flex items-center gap-1.5">
        <span
          className="mono text-xs tabular-nums px-2 py-1 rounded"
          style={{ color: "var(--fifa-teal)", background: "rgba(0,185,178,0.1)" }}
        >
          {Number.isFinite(odds.home) ? odds.home.toFixed(2) : "—"}
        </span>
        <span
          className="mono text-xs tabular-nums px-2 py-1 rounded"
          style={{ color: "var(--t3)", background: "rgba(128,121,168,0.1)" }}
        >
          {Number.isFinite(odds.draw) ? odds.draw.toFixed(2) : "—"}
        </span>
        <span
          className="mono text-xs tabular-nums px-2 py-1 rounded"
          style={{ color: "var(--fifa-orange)", background: "rgba(255,122,31,0.1)" }}
        >
          {Number.isFinite(odds.away) ? odds.away.toFixed(2) : "—"}
        </span>
      </div>

      {live ? (
        <Chip kind="live">LIVE · {m.minute}&apos;</Chip>
      ) : m.kickoff ? (
        <Chip kind="gold">
          <Countdown target={m.kickoff} compact />
        </Chip>
      ) : (
        <Chip>FT</Chip>
      )}
    </div>
  );
}

export function MatchesList() {
  const [tab, setTab] = useState<Tab>("all");
  const rows = TAB_DATA[tab];

  return (
    <AccentCard accent="var(--fifa-teal)" className="p-5">
      <header className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="card-title">Matches</h2>
        <div className="flex rounded-lg border border-hair bg-[rgba(10,6,21,0.6)] p-0.5">
          {(
            [
              ["all", "All"],
              ["live", `Live · ${MOCK_LIVE.length}`],
              ["upcoming", `Upcoming · ${MOCK_UPCOMING.length}`],
            ] as [Tab, string][]
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={cn(
                "label px-3 py-2 rounded-md transition",
                tab === k ? "text-gold bg-[rgba(245,208,32,0.12)]" : "text-t3 hover:text-t1"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-col gap-2">
        {rows.map((m) => (
          <MatchRow key={m.id} m={m} />
        ))}
      </div>
    </AccentCard>
  );
}
