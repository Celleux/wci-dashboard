import Image from "next/image";
import { AccentCard } from "@/components/shared/AccentCard";
import { Chip } from "@/components/shared/Chip";
import { ConfidenceBar } from "@/components/shared/ConfidenceBar";
import { Sparkline } from "@/components/shared/Sparkline";

export const metadata = { title: "Staking · Paul's Pocket" };

const EPOCHS = [
  { epoch: 14, amount: 128.42, status: "claimable" },
  { epoch: 13, amount: 94.11,  status: "claimed" },
  { epoch: 12, amount: 112.88, status: "claimed" },
  { epoch: 11, amount: 76.50,  status: "claimed" },
  { epoch: 10, amount: 42.30,  status: "claimed" },
];

export default function StakingPage() {
  const wci = 312_000;
  const threshold = 100_000;
  const pct = Math.min(100, (wci / threshold) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <AccentCard accent="var(--fifa-lime)" className="p-6 overflow-visible">
        <div className="grid items-center gap-6 md:grid-cols-[auto_1fr]">
          <Image
            src="/assets/chibi_galaxy.png"
            alt=""
            width={180}
            height={180}
            style={{
              filter:
                "drop-shadow(0 18px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 34px rgba(159,214,52,0.45))",
            }}
          />
          <div>
            <Chip kind="gold">You hold 312,000 WCI</Chip>
            <h1 className="display text-4xl md:text-5xl mt-2 leading-none">
              Paul's Pocket
            </h1>
            <p className="text-t2 mt-2 max-w-xl">
              Hold 100,000 WCI or more and every winning bet gets a <strong>2×
              multiplier</strong>, you qualify for the weekly Merkle rewards drop,
              and Paul auto-follows you on his signed on-chain picks at T−60.
            </p>
            <div className="mt-4">
              <ConfidenceBar
                value={pct}
                label={`Threshold · 100K WCI (${wci.toLocaleString()} held)`}
                accent="var(--fifa-lime)"
              />
            </div>
          </div>
        </div>
      </AccentCard>

      {/* Benefits grid */}
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "2× Multiplier", val: "ACTIVE", accent: "var(--fifa-lime)", sub: "on winning bets" },
          { label: "Auto-follow Paul", val: "ON", accent: "var(--fifa-magenta)", sub: "at T−60 each match" },
          { label: "Weekly rewards drop", val: "$128.42", accent: "var(--gold)", sub: "claimable this week" },
        ].map((t) => (
          <AccentCard key={t.label} accent={t.accent} className="p-5">
            <div className="label">{t.label}</div>
            <div
              className="display text-2xl mt-1"
              style={{ color: t.accent }}
            >
              {t.val}
            </div>
            <div className="mono text-[11px] text-t3 mt-1">{t.sub}</div>
          </AccentCard>
        ))}
      </section>

      {/* Claim */}
      <AccentCard accent="var(--gold)" className="p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Chip kind="gold">Merkle epoch 14 · snapshot Sun 23:00 UTC</Chip>
            <h2 className="display text-3xl mt-2">Claim this week</h2>
            <p className="text-t3 text-sm mt-1">
              WETH routed from the 3% rewards tax, swapped and distributed
              every Sunday. 30-day claim window.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div
              className="display text-4xl mono tabular-nums"
              style={{ color: "var(--gold)" }}
            >
              $128.42
            </div>
            <button type="button" className="btn-3d">
              CLAIM REWARDS
            </button>
          </div>
        </div>
        <Sparkline
          data={[42, 52, 78, 94, 112, 88, 128]}
          width={600}
          height={80}
          stroke="var(--gold)"
          fill="var(--gold)"
          className="w-full h-20 mt-4"
        />
      </AccentCard>

      {/* Epoch history */}
      <AccentCard accent="var(--fifa-teal)" className="p-5">
        <header className="mb-3">
          <h2 className="card-title">Claim history</h2>
        </header>
        <div className="flex flex-col gap-2">
          {EPOCHS.map((e) => (
            <div
              key={e.epoch}
              className="flex items-center gap-4 rounded-xl border border-hair px-3 py-3"
            >
              <span className="mono text-t3 w-20">EPOCH {e.epoch}</span>
              <span className="mono text-sm text-t2">
                Sunday snapshot · {Math.floor(wci * 0.8).toLocaleString()} snapshot balance
              </span>
              <span
                className="mono tabular-nums ml-auto font-bold"
                style={{ color: "var(--gold)" }}
              >
                +${e.amount.toFixed(2)}
              </span>
              <Chip kind={e.status === "claimable" ? "gold" : "default"}>
                {e.status === "claimable" ? "Claim now" : "Claimed"}
              </Chip>
            </div>
          ))}
        </div>
      </AccentCard>
    </div>
  );
}
