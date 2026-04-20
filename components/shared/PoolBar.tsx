import { cn } from "@/lib/utils/cn";
import { poolImpliedProbs, type PoolSplit } from "@/lib/pool/parimutuel";

interface Props {
  pool: PoolSplit;
  className?: string;
  /** Hide the tiny percentage labels under the bar. */
  barOnly?: boolean;
}

/** Stacked H / D / A parimutuel split. */
export function PoolBar({ pool, className, barOnly }: Props) {
  const p = poolImpliedProbs(pool);
  return (
    <div className={cn("w-full", className)}>
      <div className="pool-seg flex h-[10px] w-full">
        <span
          style={{
            width: `${p.pH * 100}%`,
            background: "linear-gradient(180deg, var(--fifa-teal), #006a66)",
          }}
        />
        <span
          style={{
            width: `${p.pD * 100}%`,
            background: "linear-gradient(180deg, var(--t3), var(--t4))",
          }}
        />
        <span
          style={{
            width: `${p.pA * 100}%`,
            background: "linear-gradient(180deg, var(--fifa-orange), #8a3f0d)",
          }}
        />
      </div>
      {!barOnly && (
        <div className="mono mt-1 flex justify-between text-[10px] text-t3">
          <span style={{ color: "var(--fifa-teal)" }}>H {(p.pH * 100).toFixed(0)}%</span>
          <span>D {(p.pD * 100).toFixed(0)}%</span>
          <span style={{ color: "var(--fifa-orange)" }}>A {(p.pA * 100).toFixed(0)}%</span>
        </div>
      )}
    </div>
  );
}
