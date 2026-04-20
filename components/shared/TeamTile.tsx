import type { CSSProperties } from "react";
import { cn } from "@/lib/utils/cn";
import { FlagRect } from "./FlagRect";
import { TEAM_NAMES, type TeamCode } from "@/lib/data/teams";

interface Props {
  code: TeamCode;
  size?: "sm" | "md" | "lg";
  stacked?: boolean;
  className?: string;
  style?: CSSProperties;
}

const SIZES = {
  sm: { badge: 32, flag: 20, text: "text-[10px]" },
  md: { badge: 44, flag: 28, text: "text-xs" },
  lg: { badge: 68, flag: 44, text: "text-sm" },
};

/** Team badge tile: flag in a 3D-lifted frame + team code underneath. */
export function TeamTile({ code, size = "md", stacked = true, className, style }: Props) {
  const s = SIZES[size];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2",
        stacked && "flex-col gap-1",
        className
      )}
      style={style}
    >
      <span
        className="relative grid place-items-center rounded-lg"
        style={{
          width: s.badge,
          height: s.badge,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.35))",
          border: "1px solid var(--hair-strong)",
          boxShadow:
            "inset 0 1.5px 0 rgba(255,255,255,0.08), 0 2px 0 rgba(0,0,0,0.4), 0 4px 10px -2px rgba(0,0,0,0.5)",
        }}
      >
        <FlagRect code={code} width={s.flag} height={Math.round(s.flag * 2 / 3)} />
      </span>
      <span className={cn("label tracking-[0.08em]", s.text)} title={TEAM_NAMES[code]}>
        {code}
      </span>
    </span>
  );
}
