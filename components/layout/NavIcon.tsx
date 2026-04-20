"use client";

export type NavIconKind =
  | "home"
  | "live"
  | "slip"
  | "trophy"
  | "octopus"
  | "card"
  | "stake"
  | "doc";

interface NavIconProps {
  kind: NavIconKind;
  active?: boolean;
  size?: number;
}

export function NavIcon({ kind, active = false, size = 14 }: NavIconProps) {
  const c = active ? "var(--gold)" : "var(--t2)";
  const common = {
    fill: "none",
    stroke: c,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (kind) {
    case "home":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden>
          <path {...common} d="M2 7 L8 2 L14 7 V13 H10 V9 H6 V13 H2 Z" />
        </svg>
      );
    case "live":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden>
          <circle cx="8" cy="8" r="5.5" {...common} />
          <circle cx="8" cy="8" r="2" fill={c} stroke="none" />
        </svg>
      );
    case "slip":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden>
          <path
            {...common}
            d="M4 2 H12 V14 L10 12 L8 14 L6 12 L4 14 Z M6 6 H10 M6 9 H10"
          />
        </svg>
      );
    case "trophy":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden>
          <path
            {...common}
            d="M5 3 H11 V7 Q11 10 8 10 Q5 10 5 7 Z M3 3 Q3 6 5 6.5 M13 3 Q13 6 11 6.5 M8 10 V13 M5 13 H11"
          />
        </svg>
      );
    case "octopus":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden>
          <circle cx="8" cy="6" r="4" {...common} />
          <path
            {...common}
            d="M4 9 Q3 12 4 14 M6 10 Q5 13 6 14 M8 10 V14 M10 10 Q11 13 10 14 M12 9 Q13 12 12 14"
          />
        </svg>
      );
    case "card":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden>
          <rect x="2.5" y="3" width="11" height="10" rx="1.5" {...common} />
          <path {...common} d="M5 6 H11 M5 9 H9" />
        </svg>
      );
    case "stake":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden>
          <path
            {...common}
            d="M8 2 L2 5 L8 8 L14 5 Z M2 8 L8 11 L14 8 M2 11 L8 14 L14 11"
          />
        </svg>
      );
    case "doc":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden>
          <path
            {...common}
            d="M4 2 H10 L13 5 V14 H4 Z M10 2 V5 H13 M6 8 H11 M6 11 H11"
          />
        </svg>
      );
    default:
      return null;
  }
}
