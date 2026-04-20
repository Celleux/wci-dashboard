"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils/cn";

interface Props {
  side: "home" | "draw" | "away";
  label: string;
  odds: number;
  accent?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

/** H / D / A outcome button — 56px tall, 48px min tap, 3D hover lift. */
export function OutcomeBtn({
  label,
  odds,
  accent = "var(--fifa-teal)",
  selected,
  onClick,
  className,
}: Props) {
  const isInfinite = !Number.isFinite(odds);
  return (
    <button
      type="button"
      className={cn("btn-outcome w-full min-h-[56px]", className)}
      data-selected={selected ? "true" : undefined}
      style={{ "--outcome-accent": accent } as CSSProperties}
      onClick={onClick}
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
