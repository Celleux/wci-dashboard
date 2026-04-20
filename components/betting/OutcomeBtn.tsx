"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils/cn";
import { useBetSlip, type BetSide } from "@/lib/store/betSlipStore";

interface Props {
  side: BetSide;
  label: string;
  odds: number;
  accent?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  /** Context for the bet slip (home/away teams, fixtureId, etc.). */
  fixtureId?: number | string;
  home?: string;
  away?: string;
  venue?: string;
  md?: string;
  kickoff?: string;
}

/** H / D / A outcome button — 56px tall, 48px min tap, triggers bet-slip store. */
export function OutcomeBtn({
  side,
  label,
  odds,
  accent = "var(--fifa-teal)",
  selected,
  onClick,
  className,
  fixtureId,
  home,
  away,
  venue,
  md,
  kickoff,
}: Props) {
  const pickOutcome = useBetSlip((s) => s.pickOutcome);
  const isInfinite = !Number.isFinite(odds);

  const handleClick = () => {
    onClick?.();
    if (fixtureId !== undefined && home && away) {
      pickOutcome({
        fixtureId,
        home,
        away,
        side,
        label,
        odds: isInfinite ? 1 : odds,
        venue,
        md,
        kickoff,
      });
    }
  };

  return (
    <button
      type="button"
      className={cn("btn-outcome w-full min-h-[56px]", className)}
      data-selected={selected ? "true" : undefined}
      style={{ "--outcome-accent": accent } as CSSProperties}
      onClick={handleClick}
    >
      <div className="flex flex-col items-start gap-0.5">
        <span className="label" style={{ color: accent, fontSize: 10 }}>
          {label}
        </span>
        <span className="display text-lg tabular-nums">
          {isInfinite ? "—" : odds.toFixed(2)}
        </span>
      </div>
    </button>
  );
}
