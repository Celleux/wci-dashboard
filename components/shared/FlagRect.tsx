import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { TEAM_COLORS, type TeamCode } from "@/lib/data/teams";

interface Props {
  code: TeamCode;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * 24×16 stylized SVG flag per team code, served from `/public/flags/{code}.svg`
 * (extracted from the prototype's flags.jsx). Falls back to a diagonal-split
 * gradient from the team's primary/secondary colors when the SVG is missing.
 */
export function FlagRect({ code, width = 24, height = 16, className }: Props) {
  const [a, b] = TEAM_COLORS[code] ?? ["#666", "#999"];
  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden rounded-[2px] align-middle",
        className
      )}
      style={{
        width,
        height,
        boxShadow:
          "inset 0 0 0 1px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.4)",
        background: `linear-gradient(135deg, ${a} 50%, ${b} 50%)`,
      }}
    >
      <Image
        src={`/flags/${code}.svg`}
        alt=""
        width={width}
        height={height}
        style={{ width: "100%", height: "100%", display: "block" }}
        aria-hidden
      />
    </span>
  );
}
