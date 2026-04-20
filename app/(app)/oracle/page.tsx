import Image from "next/image";
import { AccentCard } from "@/components/shared/AccentCard";
import { Chip } from "@/components/shared/Chip";
import { ConfidenceBar } from "@/components/shared/ConfidenceBar";
import { FlagRect } from "@/components/shared/FlagRect";
import { Sparkline } from "@/components/shared/Sparkline";
import { PaulConfessionCard, PaulLedgerCard } from "@/components/home/PaulConfessionCard";
import type { TeamCode } from "@/lib/data/teams";

export const metadata = { title: "Paul's Oracle" };

const PICKS: {
  home: TeamCode;
  away: TeamCode;
  pick: TeamCode | "DRAW";
  conf: number;
  md: string;
  kickoff: string;
  rationale: string;
}[] = [
  { home: "USA", away: "TUR", pick: "USA", conf: 78, md: "MD2", kickoff: "Tonight · 21:00 ET", rationale: "Home crowd + USA xG 1.8 vs TUR conceding 1.4/match." },
  { home: "BRA", away: "SCO", pick: "BRA", conf: 88, md: "MD2", kickoff: "Tonight · 18:00 ET", rationale: "Elo gap 440 pts. Scotland's back line hasn't held vs top-10 in 18 months." },
  { home: "ARG", away: "AUT", pick: "ARG", conf: 84, md: "MD1", kickoff: "Tomorrow · 15:00 ET", rationale: "Messi on the squad sheet. Austria's press breaks vs verticality." },
  { home: "ENG", away: "CRO", pick: "ENG", conf: 54, md: "MD1", kickoff: "Tomorrow · 12:00 ET", rationale: "Paul admits: this one's close. Croatia's midfield still elite." },
  { home: "GER", away: "ECU", pick: "GER", conf: 69, md: "MD1", kickoff: "Tomorrow · 18:00 ET", rationale: "Germany xG-for 2.1 the last 5. Ecuador compact but thin up top." },
  { home: "FRA", away: "NOR", pick: "FRA", conf: 62, md: "MD2", kickoff: "Live · 82' · 2-2", rationale: "Paul already sweating — Haaland's on fire." },
];

const PHASES: { label: string; acc: number }[] = [
  { label: "Group MD1", acc: 78 },
  { label: "Group MD2", acc: 76 },
  { label: "Group MD3", acc: 70 },
  { label: "R32", acc: 72 },
  { label: "R16", acc: 66 },
  { label: "QF", acc: 58 },
  { label: "SF", acc: 50 },
  { label: "Final", acc: 100 },
];

export default function OraclePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <AccentCard accent="var(--fifa-magenta)" className="p-6 overflow-visible relative">
        <div className="grid items-center gap-6 md:grid-cols-[auto_1fr]">
          <Image
            src="/assets/chibi_oracle.png"
            alt="Paul"
            width={220}
            height={220}
            priority
            style={{
              filter:
                "drop-shadow(0 24px 48px rgba(0,0,0,0.6)) drop-shadow(0 0 42px rgba(230,55,168,0.45))",
            }}
          />
          <div>
            <Chip kind="gold">Paul · The Oracle · live</Chip>
            <h1 className="display text-4xl md:text-6xl mt-2 leading-none">
              I PICK. YOU STACK.
            </h1>
            <p className="text-t2 mt-3 max-w-xl">
              Ensemble of Dixon-Coles goal model, Pinnacle de-vigged odds, and
              Polymarket sentiment. Updates T-60 before kickoff and again at
              halftime. Confidence auto-rebalances after each matchday via
              Brier-score calibration.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip>
                <span className="mono text-fifa-lime mr-1">38W</span>
                <span className="text-t3 mx-1">·</span>
                <span className="mono text-coral mr-1">12L</span>
                <span className="text-t3 mx-1">·</span>
                <span className="mono text-gold">76% ROI</span>
              </Chip>
              <Chip kind="gold">Followers · 12,812</Chip>
            </div>
          </div>
        </div>
      </AccentCard>

      {/* Accuracy by phase */}
      <AccentCard accent="var(--fifa-teal)" className="p-5">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="card-title">Accuracy by tournament phase</h2>
          <Chip kind="gold">Brier 0.21 · calibrated</Chip>
        </header>
        <div className="grid gap-3 md:grid-cols-4 lg:grid-cols-8">
          {PHASES.map((p) => (
            <div
              key={p.label}
              className="stat-tile"
              style={{ "--tile-color": "var(--fifa-teal)" } as React.CSSProperties}
            >
              <div className="label" style={{ fontSize: 9 }}>
                {p.label}
              </div>
              <div className="display mono mt-1" style={{ fontSize: 22 }}>
                {p.acc}%
              </div>
            </div>
          ))}
        </div>
      </AccentCard>

      {/* Current picks */}
      <section>
        <header className="mb-3 flex items-center justify-between">
          <h2 className="card-title">Paul's current slate</h2>
          <Chip>T-60 drop · 6 picks</Chip>
        </header>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PICKS.map((p) => (
            <AccentCard
              key={`${p.home}-${p.away}`}
              accent={p.conf > 75 ? "var(--fifa-lime)" : p.conf < 60 ? "var(--fifa-orange)" : "var(--fifa-teal)"}
              className="p-4"
            >
              <header className="flex items-center justify-between mb-3">
                <Chip>{p.md}</Chip>
                <Chip kind={p.conf > 75 ? "gold" : "default"}>
                  {p.conf > 75 ? "LOCK" : p.conf < 60 ? "TOO CLOSE" : "SOLID"}
                </Chip>
              </header>
              <div className="flex items-center gap-3 mb-3">
                <FlagRect code={p.home} width={32} height={22} />
                <span className="display text-lg">{p.home}</span>
                <span className="text-t3 text-xs">vs</span>
                <FlagRect code={p.away} width={32} height={22} />
                <span className="display text-lg">{p.away}</span>
              </div>
              <div className="mono text-[11px] text-t3 mb-3">{p.kickoff}</div>
              <ConfidenceBar
                value={p.conf}
                label={`Paul picks · ${p.pick === "DRAW" ? "Draw" : p.pick}`}
                accent={p.conf > 75 ? "var(--fifa-lime)" : "var(--fifa-teal)"}
              />
              <p className="text-t2 text-[12px] mt-3 italic">
                &ldquo;{p.rationale}&rdquo;
              </p>
            </AccentCard>
          ))}
        </div>
      </section>

      {/* Record chart + Ledger */}
      <section className="grid gap-6 md:grid-cols-2">
        <AccentCard accent="var(--fifa-teal)" className="p-5">
          <header className="mb-3 flex items-center justify-between">
            <h2 className="card-title">Rolling win rate · last 50 matches</h2>
            <Chip kind="gold">76%</Chip>
          </header>
          <Sparkline
            data={[
              62, 60, 65, 68, 67, 70, 72, 74, 73, 75, 77, 76, 74, 78, 80, 79, 78, 80, 82, 81,
              79, 78, 76, 75, 74, 72, 73, 75, 76, 77, 78, 76, 75, 73, 72, 70, 71, 73, 74, 75,
              76, 77, 78, 79, 76, 74, 73, 75, 76, 76,
            ]}
            width={560}
            height={120}
            stroke="var(--fifa-teal)"
            fill="var(--fifa-teal)"
            className="w-full h-32"
          />
        </AccentCard>
        <PaulLedgerCard />
      </section>

      {/* Confession */}
      <PaulConfessionCard />
    </div>
  );
}
