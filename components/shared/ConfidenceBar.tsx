import { cn } from "@/lib/utils/cn";

interface Props {
  value: number; // 0..100
  accent?: string;
  className?: string;
  label?: string;
}

/** Horizontal progress bar with shimmer on the fill. */
export function ConfidenceBar({
  value,
  accent = "var(--fifa-teal)",
  className,
  label,
}: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="label mb-1 flex justify-between">
          <span>{label}</span>
          <span className="mono" style={{ color: accent }}>
            {pct.toFixed(0)}%
          </span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative h-2 w-full overflow-hidden rounded-full bg-bg-elevated"
        style={{
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="shimmer h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${accent}, color-mix(in srgb, ${accent} 80%, white 20%))`,
            boxShadow: `0 0 12px ${accent}`,
          }}
        />
      </div>
    </div>
  );
}
