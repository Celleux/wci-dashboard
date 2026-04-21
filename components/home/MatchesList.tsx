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
    <div className="rounded-xl border border-hair bg-[rgba(20,16,40,0.45)] hover:border-hair-strong transition-colors">
      {/* Row 1 — group + teams + status */}
      <div className="flex items-center gap-2 px-3 py-2.5 md:px-3.5">
        {group && <GroupTile group={group} size={26} />}
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <FlagRect code={home} width={20} height={13} />
          <span className="display text-sm">{home}</span>
          <span className="text-t4 text-xs">vs</span>
          <FlagRect code={away} width={20} height={13} />
          <span className="display text-sm">{away}</span>
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

      {/* Row 2 — pool bar + tri-odds — grid on desktop, stacked on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 px-3 pb-2.5 md:px-3.5">
        <PoolBar pool={pool} barOnly className="flex-1 min-w-0" />
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span
            className="mono text-[11px] tabular-nums px-2 py-1 rounded font-bold"
            style={{ color: "var(--fifa-teal)", background: "rgba(0,185,178,0.12)" }}
          >
            {Number.isFinite(odds.home) ? odds.home.toFixed(2) : "—"}
          </span>
          <span
            className="mono text-[11px] tabular-nums px-2 py-1 rounded font-bold"
            style={{ color: "var(--t3)", background: "rgba(128,121,168,0.12)" }}
          >
            {Number.isFinite(odds.draw) ? odds.draw.toFixed(2) : "—"}
          </span>
          <span
            className="mono text-[11px] tabular-nums px-2 py-1 rounded font-bold"
            style={{ color: "var(--fifa-orange)", background: "rgba(255,122,31,0.12)" }}
          >
            {Number.isFinite(odds.away) ? odds.away.toFixed(2) : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function MatchesList() {
  const [tab, setTab] = useState<Tab>("all");
  const rows = TAB_DATA[tab];

  return (
    <AccentCard accent="var(--fifa-teal)" className="p-3 sm:p-5">
      <header className="mb-3 flex flex-wrap items-center justify-between gap-2">
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
