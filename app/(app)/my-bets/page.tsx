import Image from "next/image";
import { AccentCard } from "@/components/shared/AccentCard";
import { Chip } from "@/components/shared/Chip";
import { FlagRect } from "@/components/shared/FlagRect";
import { Sparkline } from "@/components/shared/Sparkline";
import { MOCK_FINAL, MOCK_LIVE, MOCK_UPCOMING } from "@/lib/data/mocks";
import { TEAM_NAMES } from "@/lib/data/teams";
import { cn } from "@/lib/utils/cn";

export const metadata = { title: "My Bets" };

const TABS = ["All", "Active · 3", "Pending", "Won · 14", "Lost · 9"];

const STATS = [
  { label: "Total staked", value: "$2,850", accent: "var(--fifa-teal)" },
  { label: "Total payout", value: "$4,124", accent: "var(--fifa-lime)" },
  { label: "Net PnL", value: "+$1,274", accent: "var(--gold)" },
  { label: "ROI", value: "108%", accent: "var(--fifa-magenta)" },
];

export default function MyBetsPage() {
  const live = MOCK_LIVE.slice(0, 2);
  const pending = MOCK_UPCOMING.slice(0, 2);
  const settled = MOCK_FINAL;

  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <AccentCard accent="var(--fifa-teal)" className="p-6 overflow-visible">
        <div className="grid gap-6 md:grid-cols-[auto_1fr]">
          <Image
            src="/assets/chibi_cheerful.png"
            alt=""
            width={160}
            height={160}
            style={{
              filter:
                "drop-shadow(0 16px 36px rgba(0,0,0,0.6)) drop-shadow(0 0 28px rgba(0,185,178,0.4))",
            }}
          />
          <div>
            <Chip>Lifetime · 23 bets · 61% win rate</Chip>
            <h1 className="display text-4xl md:text-5xl mt-2 leading-none">
              Your bets
            </h1>
            <p className="text-t2 mt-2 max-w-lg">
              Every pick, every settlement, every payout. Losses auto-mint a
              Cope Card to <code className="mono">/cope</code>. You can export
              everything to CSV at any time.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="stat-tile"
                  style={{ "--tile-color": s.accent } as React.CSSProperties}
                >
                  <div className="label">{s.label}</div>
                  <div
                    className="display mono"
                    style={{ fontSize: 22, color: s.accent }}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AccentCard>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((t, i) => (
          <button
            key={t}
            className="label px-3 py-2 rounded-lg border"
            style={{
              borderColor: i === 0 ? "rgba(245,208,32,0.35)" : "var(--hair)",
              background: i === 0 ? "rgba(245,208,32,0.12)" : "transparent",
              color: i === 0 ? "var(--gold)" : "var(--t2)",
            }}
          >
            {t}
          </button>
        ))}
        <button
          type="button"
          className="label ml-auto px-3 py-2 rounded-lg border border-hair text-t2 hover:bg-white/5"
        >
          Export CSV
        </button>
      </div>

      {/* PnL chart */}
      <AccentCard accent="var(--gold)" className="p-5">
        <header className="mb-3 flex items-center justify-between">
          <h2 className="card-title">PnL · this tournament</h2>
          <Chip kind="gold">+$1,274 · 108% ROI</Chip>
        </header>
        <Sparkline
          data={[0, 50, 80, 60, 90, 140, 180, 230, 260, 340, 400, 510, 620, 700, 850, 930, 1020, 1150, 1200, 1274]}
          width={1000}
          height={120}
          stroke="var(--gold)"
          fill="var(--gold)"
          className="w-full h-28"
        />
      </AccentCard>

      {/* Active */}
      <section>
        <header className="mb-3 flex items-center justify-between">
          <h2 className="card-title">Active · live</h2>
          <Chip kind="live">{live.length} live</Chip>
        </header>
        <div className="grid gap-3">
          {live.map((m) => (
            <AccentCard key={m.id} accent="var(--fifa-red)" className="p-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <FlagRect code={m.teams[0]} width={26} height={17} />
                  <span className="display text-sm">{m.teams[0]}</span>
                  <span className="text-t3 text-xs">vs</span>
                  <FlagRect code={m.teams[1]} width={26} height={17} />
                  <span className="display text-sm">{m.teams[1]}</span>
                </div>
                <Chip kind="live">LIVE · {m.minute}&apos;</Chip>
                <span className="mono text-lg tabular-nums ml-auto">
                  {m.score?.[0]} – {m.score?.[1]}
                </span>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="label">Stake</div>
                    <div className="mono text-sm">$50</div>
                  </div>
                  <div>
                    <div className="label">On</div>
                    <div className="display text-sm" style={{ color: "var(--fifa-teal)" }}>
                      {TEAM_NAMES[m.teams[0]]}
                    </div>
                  </div>
                  <div>
                    <div className="label">Payout if win</div>
                    <div className="mono text-sm" style={{ color: "var(--gold)" }}>
                      $92.50
                    </div>
                  </div>
                </div>
              </div>
            </AccentCard>
          ))}
        </div>
      </section>

      {/* Pending */}
      <section>
        <header className="mb-3 flex items-center justify-between">
          <h2 className="card-title">Pending</h2>
          <Chip>Pre-kickoff</Chip>
        </header>
        <div className="grid gap-3">
          {pending.map((m) => (
            <AccentCard key={m.id} accent="var(--fifa-teal)" className="p-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <FlagRect code={m.teams[0]} width={26} height={17} />
                  <span className="display text-sm">{m.teams[0]}</span>
                  <span className="text-t3 text-xs">vs</span>
                  <FlagRect code={m.teams[1]} width={26} height={17} />
                  <span className="display text-sm">{m.teams[1]}</span>
                </div>
                <Chip kind="gold">Upcoming</Chip>
                <div className="flex items-center gap-3 ml-auto">
                  <div>
                    <div className="label">Stake</div>
                    <div className="mono text-sm">$25</div>
                  </div>
                  <div>
                    <div className="label">On</div>
                    <div className="display text-sm" style={{ color: "var(--fifa-teal)" }}>
                      {TEAM_NAMES[m.teams[0]]}
                    </div>
                  </div>
                </div>
              </div>
            </AccentCard>
          ))}
        </div>
      </section>

      {/* Settled */}
      <section>
        <header className="mb-3 flex items-center justify-between">
          <h2 className="card-title">Settled</h2>
          <Chip>14 won · 9 lost</Chip>
        </header>
        <div className="grid gap-3">
          {settled.map((m) => (
            <AccentCard
              key={m.id}
              accent={m.result === "W" ? "var(--fifa-lime)" : "var(--coral)"}
              className="p-4"
            >
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <FlagRect code={m.teams[0]} width={26} height={17} />
                  <span className="display text-sm">{m.teams[0]}</span>
                  <span className="text-t3 text-xs">vs</span>
                  <FlagRect code={m.teams[1]} width={26} height={17} />
                  <span className="display text-sm">{m.teams[1]}</span>
                </div>
                <span className="mono text-sm tabular-nums text-t2">
                  {m.score?.[0]} – {m.score?.[1]}
                </span>
                <div className="flex items-center gap-3 ml-auto">
                  <div>
                    <div className="label">Stake</div>
                    <div className="mono text-sm">${m.stake}</div>
                  </div>
                  <div>
                    <div className="label">Payout</div>
                    <div
                      className="mono text-sm tabular-nums"
                      style={{
                        color:
                          m.result === "W" ? "var(--fifa-lime)" : "var(--coral)",
                      }}
                    >
                      {m.result === "W" ? `+$${m.payout?.toFixed(2)}` : "$0"}
                    </div>
                  </div>
                  <Chip
                    kind={m.result === "W" ? "gold" : "default"}
                    className={m.result === "L" ? "text-coral" : undefined}
                  >
                    {m.result === "W" ? "WON" : "LOST · Cope #4"}
                  </Chip>
                </div>
              </div>
            </AccentCard>
          ))}
        </div>
      </section>
    </div>
  );
}
