import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface Props {
  children: ReactNode;
  accent?: string; // CSS value for --card-accent (e.g. "var(--fifa-teal)")
  className?: string;
  style?: CSSProperties;
  /** Hide the top glowing accent bar. */
  barless?: boolean;
}

/**
 * Premium 3D card wrapper — the .card class lives in globals.css.
 * Set `accent` to override the default FIFA teal glow.
 */
export function AccentCard({
  children,
  accent = "var(--fifa-teal)",
  className,
  style,
  barless,
}: Props) {
  return (
    <div
      className={cn("card relative", className)}
      style={{ "--card-accent": accent, ...style } as CSSProperties}
    >
      {!barless && <div className="card-accent-bar" aria-hidden />}
      {children}
    </div>
  );
}
