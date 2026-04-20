"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface Props {
  target: number | string | Date;
  className?: string;
  /** Show only the largest two units (e.g. "12h 34m"). */
  compact?: boolean;
}

function pad(n: number) {
  return String(Math.max(0, Math.floor(n))).padStart(2, "0");
}

/** Client-side countdown; tick via `requestAnimationFrame` and pause offscreen. */
export function Countdown({ target, className, compact }: Props) {
  const t = new Date(target).getTime();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    let raf = 0;
    let prev = 0;
    const tick = (ts: number) => {
      if (ts - prev > 500) {
        setNow(Date.now());
        prev = ts;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const delta = Math.max(0, t - now);
  const s = Math.floor(delta / 1000) % 60;
  const m = Math.floor(delta / 60_000) % 60;
  const h = Math.floor(delta / 3_600_000) % 24;
  const d = Math.floor(delta / 86_400_000);

  const content = compact
    ? d > 0
      ? `${d}d ${h}h`
      : h > 0
        ? `${h}h ${pad(m)}m`
        : `${pad(m)}m ${pad(s)}s`
    : `${d > 0 ? `${d}d ` : ""}${pad(h)}:${pad(m)}:${pad(s)}`;

  return (
    <span className={cn("mono tabular-nums", className)} aria-live="off">
      T− {content}
    </span>
  );
}
