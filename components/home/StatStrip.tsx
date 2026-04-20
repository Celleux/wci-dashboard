import type { CSSProperties } from "react";
import { Sparkline } from "@/components/shared/Sparkline";

interface Tile {
  label: string;
  value: string;
  sub?: string;
  accent: string;
  trend?: number[];
  positive?: boolean;
}

const TILES: Tile[] = [
  {
    label: "Total pool (USDC)",
    value: "$1,247,830",
    sub: "+18% this week",
    accent: "var(--fifa-teal)",
    trend: [12, 15, 14, 18, 22, 19, 25, 28, 32, 30, 36, 42],
    positive: true,
  },
  {
    label: "Matches today",
    value: "2,847",
    sub: "12 live · 18 upcoming",
    accent: "var(--fifa-orange)",
    trend: [2, 4, 8, 14, 20, 24, 28, 30, 30, 31, 30, 30],
    positive: true,
  },
  {
    label: "WCI staked",
    value: "412,380",
    sub: "Paul's Pocket · 100K+",
    accent: "var(--fifa-magenta)",
    trend: [200, 220, 260, 290, 310, 340, 380, 400, 410, 412, 412, 412],
    positive: true,
  },
  {
    label: "My PnL this week",
    value: "+$127",
    sub: "8 wins · 3 losses",
    accent: "var(--fifa-lime)",
    trend: [0, 10, 8, 18, 22, 40, 65, 70, 90, 100, 115, 127],
    positive: true,
  },
];

/** Four big KPI stat tiles matching the reference dashboard row. */
export function StatStrip() {
  return (
    <section
      className="grid gap-3 sm:gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
    >
      {TILES.map((t) => (
        <div
          key={t.label}
          className="stat-tile"
          style={{ "--tile-color": t.accent } as CSSProperties}
        >
          <div className="label" style={{ fontSize: 10 }}>
            {t.label}
          </div>
          <div
            className="display mt-1"
            style={{ fontSize: 30, lineHeight: 1, letterSpacing: "-0.02em" }}
          >
            {t.value}
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span
              className="mono text-[11px]"
              style={{ color: t.positive ? "var(--fifa-lime)" : "var(--coral)" }}
            >
              {t.sub}
            </span>
            {t.trend && (
              <Sparkline
                data={t.trend}
                stroke={t.accent}
                fill={t.accent}
                width={80}
                height={26}
              />
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
