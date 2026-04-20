import Image from "next/image";
import { AccentCard } from "@/components/shared/AccentCard";
import { Chip } from "@/components/shared/Chip";
import { GroupTile } from "@/components/shared/GroupTile";
import { FlagRect } from "@/components/shared/FlagRect";
import { PoolBar } from "@/components/shared/PoolBar";
import { Countdown } from "@/components/shared/Countdown";
import { GROUPS, TEAM_NAMES, type GroupKey } from "@/lib/data/teams";
import { MOCK_LIVE, MOCK_UPCOMING, MOCK_FINAL } from "@/lib/data/mocks";
import { parimutuelOdds } from "@/lib/pool/parimutuel";

export const metadata = { title: "Matches" };

const FILTERS = [
  { key: "all", label: "All" },
  { key: "live", label: "Live · 3" },
  { key: "upcoming", label: "Upcoming · 6" },
  { key: "final", label: "Final · 4" },
];

const MDS = ["MD1", "MD2", "MD3", "R32", "R16", "QF", "SF", "F"];

export default function MatchesPage() {
  const all = [...MOCK_LIVE, ...MOCK_UPCOMING, ...MOCK_FINAL];
  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <AccentCard accent="var(--fifa-cyan)" className="p-6 overflow-visible">
        <div className="grid items-center gap-6 md:grid-cols-[auto_1fr]">
          <Image
            src="/assets/chibi_battle.png"
            alt=""
            width={160}
            height={160}
            style={{
              filter:
                "drop-shadow(0 16px 36px rgba(0,0,0,0.6)) drop-shadow(0 0 28px rgba(78,209,230,0.4))",
            }}
          />
          <div>
            <Chip>WC26 · 104 matches · 48 teams</Chip>
            <h1 className="display text-4xl md:text-5xl mt-2 leading-none">
              Match Board
            </h1>
            <p className="text-t2 mt-2 max-w-xl">
              Every fixture for the tournament. Filter by status, matchday, or
              group. Pools update in real time as bets land.
            </p>
          </div>
        </div>
      </AccentCard>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f, i) => (
          <button
            key={f.key}
            className="label px-3 py-2 rounded-lg border"
            style={{
              borderColor: i === 0 ? "rgba(245,208,32,0.35)" : "var(--hair)",
              background: i === 0 ? "rgba(245,208,32,0.12)" : "transparent",
              color: i === 0 ? "var(--gold)" : "var(--t2)",
            }}
          >
            {f.label}
          </button>
        ))}
        <span className="label text-t3 mx-3">·</span>
        {MDS.map((m, i) => (
          <button
            key={m}
            className="label px-3 py-2 rounded-lg border"
            style={{
              borderColor: i === 1 ? "rgba(0,185,178,0.4)" : "var(--hair)",
              background: i === 1 ? "rgba(0,185,178,0.1)" : "transparent",
              color: i === 1 ? "var(--fifa-teal)" : "var(--t2)",
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Groups strip */}
      <AccentCard accent="var(--fifa-blue)" className="p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="label text-t3">Groups</div>
          {(Object.keys(GROUPS) as GroupKey[]).map((g) => (
            <div key={g} className="flex items-center gap-1.5">
              <GroupTile group={g} size={26} />
              <div className="flex gap-0.5">
                {GROUPS[g].teams.map((t) => (
                  <FlagRect key={t} code={t} width={16} height={11} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </AccentCard>

      {/* List */}
      <AccentCard accent="var(--fifa-teal)" className="p-5">
        <div className="flex flex-col gap-2">
          {all.map((m) => {
            const pool = { home: m.pools[0], draw: m.pools[1], away: m.pools[2] };
            const odds = parimutuelOdds(pool);
            const isLive = typeof m.minute === "number";
            const isFinal = m.result !== undefined;

            return (
              <div
                key={m.id}
                className="grid items-center gap-3 rounded-xl border border-hair bg-[rgba(20,16,40,0.45)] px-3 py-3 hover:border-hair-strong transition-colors"
                style={{
                  gridTemplateColumns:
                    "auto minmax(0,1fr) minmax(140px,auto) auto auto",
                }}
              >
                <div className="flex items-center gap-2">
                  <Chip>{m.md}</Chip>
                </div>

                <div className="min-w-0 flex items-center gap-2">
                  <FlagRect code={m.teams[0]} width={22} height={14} />
                  <span className="display text-sm">{m.teams[0]}</span>
                  <span className="text-t4 text-xs">vs</span>
                  <FlagRect code={m.teams[1]} width={22} height={14} />
                  <span className="display text-sm">{m.teams[1]}</span>
                  <span className="mono text-[11px] text-t3 truncate hidden md:inline">
                    {TEAM_NAMES[m.teams[0]]} · {TEAM_NAMES[m.teams[1]]} · {m.venue}
                  </span>
                </div>

                <div className="w-40">
                  <PoolBar pool={pool} barOnly />
                </div>

                <div className="flex items-center gap-1.5">
                  {(["home", "draw", "away"] as const).map((side, idx) => (
                    <span
                      key={side}
                      className="mono text-xs tabular-nums px-2 py-1 rounded"
                      style={{
                        color: idx === 0 ? "var(--fifa-teal)" : idx === 1 ? "var(--t3)" : "var(--fifa-orange)",
                        background:
                          idx === 0
                            ? "rgba(0,185,178,0.1)"
                            : idx === 1
                            ? "rgba(128,121,168,0.1)"
                            : "rgba(255,122,31,0.1)",
                      }}
                    >
                      {Number.isFinite(odds[side]) ? odds[side].toFixed(2) : "—"}
                    </span>
                  ))}
                </div>

                {isLive ? (
                  <Chip kind="live">LIVE · {m.minute}&apos;</Chip>
                ) : isFinal ? (
                  <Chip kind={m.result === "W" ? "gold" : "default"}>
                    {m.score?.[0]}-{m.score?.[1]} FT
                  </Chip>
                ) : m.kickoff ? (
                  <Chip kind="gold">
                    <Countdown target={m.kickoff} compact />
                  </Chip>
                ) : (
                  <Chip>TBD</Chip>
                )}
              </div>
            );
          })}
        </div>
      </AccentCard>
    </div>
  );
}
