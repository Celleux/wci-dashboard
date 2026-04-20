import Image from "next/image";
import { AccentCard } from "@/components/shared/AccentCard";
import { Chip } from "@/components/shared/Chip";
import { FlagRect } from "@/components/shared/FlagRect";
import { MOCK_LEADERBOARD } from "@/lib/data/mocks";
import { cn } from "@/lib/utils/cn";

export const metadata = { title: "Leaderboard" };

const TABS = ["Reward · weekly", "Grudge points", "Paul's Bankers", "All-time"];

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <AccentCard accent="var(--gold)" className="p-6 overflow-visible">
        <div className="grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
          <Image
            src="/assets/chibi_tarot.png"
            alt=""
            width={180}
            height={180}
            style={{
              filter:
                "drop-shadow(0 16px 36px rgba(0,0,0,0.6)) drop-shadow(0 0 28px rgba(245,208,32,0.4))",
            }}
          />
          <div>
            <Chip kind="gold">Weekly Merkle drop · Sun 23:00 UTC</Chip>
            <h1 className="display text-4xl md:text-5xl mt-2 leading-none">
              Leaderboard
            </h1>
            <p className="text-t2 mt-2 max-w-xl">
              Top 100 WCI stakers split the 3% rewards pool each week.
              Grudge points pile up when you bet against Paul and he's right.
              Climb one, dodge the other.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-center gap-2">
            <div className="label">This week's pot</div>
            <div className="display text-4xl" style={{ color: "var(--gold)" }}>
              $18,420
            </div>
          </div>
        </div>
      </AccentCard>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((t, i) => (
          <button
            key={t}
            className="label px-4 py-2 rounded-lg border"
            style={{
              borderColor: i === 0 ? "rgba(245,208,32,0.4)" : "var(--hair)",
              background: i === 0 ? "rgba(245,208,32,0.12)" : "transparent",
              color: i === 0 ? "var(--gold)" : "var(--t2)",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Top 3 podium */}
      <section className="grid gap-4 md:grid-cols-3">
        {MOCK_LEADERBOARD.slice(0, 3).map((r, i) => {
          const colors = ["var(--gold)", "#B4B4C4", "#CD7F32"];
          return (
            <AccentCard key={r.rank} accent={colors[i]} className="p-5">
              <header className="flex items-center justify-between mb-3">
                <span
                  className="display text-3xl"
                  style={{ color: colors[i] }}
                >
                  #{r.rank}
                </span>
                {r.badge === "oracle" && <Chip kind="gold">Oracle</Chip>}
                {r.badge === "whale" && <Chip>Whale</Chip>}
              </header>
              <div className="flex items-center gap-3 mb-4">
                <FlagRect code={r.country} width={28} height={18} />
                <span className="display text-xl">{r.handle}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="label">PnL</div>
                  <div
                    className="mono tabular-nums display text-lg"
                    style={{ color: "var(--fifa-teal)" }}
                  >
                    +${r.pnl.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="label">ROI</div>
                  <div
                    className="mono tabular-nums display text-lg"
                    style={{ color: "var(--gold)" }}
                  >
                    {r.roi}%
                  </div>
                </div>
                <div>
                  <div className="label">Bets</div>
                  <div className="mono display text-lg">{r.bets}</div>
                </div>
                <div>
                  <div className="label">Streak</div>
                  <div className="mono display text-lg">{r.streak}</div>
                </div>
              </div>
            </AccentCard>
          );
        })}
      </section>

      {/* Full table */}
      <AccentCard accent="var(--fifa-teal)" className="p-5">
        <header className="mb-3 flex items-center justify-between">
          <h2 className="card-title">Full ranking</h2>
          <Chip>Top 2,847</Chip>
        </header>
        <div className="flex flex-col gap-2">
          {MOCK_LEADERBOARD.map((r) => (
            <div
              key={r.rank}
              className={cn(
                "grid gap-3 items-center rounded-xl border px-3 py-3",
                r.you
                  ? "bg-[rgba(245,208,32,0.12)] border-[rgba(245,208,32,0.4)]"
                  : "border-hair bg-[rgba(20,16,40,0.4)]"
              )}
              style={{
                gridTemplateColumns:
                  "auto auto 1fr auto auto auto auto auto",
              }}
            >
              <span className="mono w-7 text-right text-t3 font-bold">
                {r.rank}
              </span>
              <FlagRect code={r.country} width={22} height={14} />
              <span
                className={cn(
                  "display text-sm truncate",
                  r.you ? "text-gold" : "text-t1"
                )}
              >
                {r.handle}
              </span>
              {r.badge === "oracle" ? (
                <Chip kind="gold">Oracle</Chip>
              ) : r.badge === "whale" ? (
                <Chip>Whale</Chip>
              ) : (
                <span className="w-16" aria-hidden />
              )}
              <span
                className="mono text-xs tabular-nums"
                style={{
                  color: r.pnl > 0 ? "var(--fifa-teal)" : "var(--fifa-orange)",
                }}
              >
                {r.pnl > 0 ? "+" : ""}
                {r.pnl.toLocaleString()}
              </span>
              <span className="mono text-xs text-t2">
                {r.roi}%
              </span>
              <span className="mono text-xs text-t3">{r.bets} bets</span>
              <span className="mono text-xs text-t3">
                🔥 {r.streak}
              </span>
            </div>
          ))}
        </div>
      </AccentCard>
    </div>
  );
}
