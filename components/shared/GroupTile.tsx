import type { CSSProperties } from "react";
import { cn } from "@/lib/utils/cn";
import { GROUPS, type GroupKey } from "@/lib/data/teams";

interface Props {
  group: GroupKey;
  size?: number;
  className?: string;
}

/** 32px color tile with the group letter. */
export function GroupTile({ group, size = 32, className }: Props) {
  return (
    <span
      className={cn("group-tile", className)}
      style={
        {
          width: size,
          height: size,
          fontSize: Math.round(size * 0.53),
          "--group-color": GROUPS[group].color,
        } as CSSProperties
      }
    >
      {group}
    </span>
  );
}
