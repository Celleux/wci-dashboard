import type { CSSProperties, ReactNode } from "react"

export type ChipKind = "default" | "gold" | "live"

export interface ChipProps {
  children: ReactNode
  /** Visual variant — maps to the `.chip`, `.chip-gold`, `.chip-live` CSS classes. */
  kind?: ChipKind
  className?: string
  style?: CSSProperties
}

/**
 * Chip — a simple pill indicator.
 *
 * Variants:
 *  - `default`  neutral pill (`.chip`)
 *  - `gold`     golden highlight / achievement (`.chip .chip-gold`)
 *  - `live`     animated red dot for live state (`.chip .chip-live`)
 */
export function Chip({ children, kind = "default", className = "", style }: ChipProps) {
  const cls =
    kind === "gold"
      ? "chip chip-gold"
      : kind === "live"
        ? "chip chip-live"
        : "chip"

  return (
    <span className={`${cls} ${className}`.trim()} style={style}>
      {children}
    </span>
  )
}
