"use client";

import { Clock, Zap, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { AccentCard } from "@/components/shared/AccentCard";
import { Chip } from "@/components/shared/Chip";
import { cn } from "@/lib/utils/cn";
import { formatUnits } from "@/lib/transfer/constants";

interface Props {
  routes: any[];
  selectedIndex: number;
  onSelect: (i: number) => void;
}

/**
 * Displays the recommended route + up to 2 alternatives. Shows ETA, fees,
 * receive amount, and bridge/DEX badges. Tap to switch.
 */
export function RouteCard({ routes, selectedIndex, onSelect }: Props) {
  const [showAll, setShowAll] = useState(false);
  if (!routes.length) return null;
  const visible = showAll ? routes.slice(0, 5) : routes.slice(0, 1);
  const selected = routes[selectedIndex];
  const toDecimals = selected?.toToken?.decimals ?? 18;
  const toSymbol = selected?.toToken?.symbol ?? "";

  const fmtAmount = (amount: string | undefined, decimals: number) => {
    if (!amount) return "—";
    try {
      return formatUnits(BigInt(amount), decimals, 4);
    } catch {
      return amount;
    }
  };
  const fmtTime = (sec: number | undefined) => {
    if (!sec) return "—";
    if (sec < 60) return `${Math.round(sec)}s`;
    if (sec < 3600) return `${Math.round(sec / 60)}m`;
    return `${(sec / 3600).toFixed(1)}h`;
  };

  return (
    <AccentCard accent="var(--gold)" className="p-5">
      <header className="flex items-center justify-between mb-3">
        <div>
          <div className="label text-gold">Paul&apos;s recommended route</div>
          <h3 className="display text-lg mt-1">
            You&apos;ll receive{" "}
            <span className="mono tabular-nums" style={{ color: "var(--gold)" }}>
              {fmtAmount(selected?.toAmount, toDecimals)} {toSymbol}
            </span>
          </h3>
        </div>
        <Chip kind="gold">
          {fmtTime(selected?.steps?.[0]?.estimate?.executionDuration)}
        </Chip>
      </header>

      <div className="flex flex-col gap-2">
        {visible.map((r, i) => (
          <button
            key={`${r.id ?? i}`}
            type="button"
            onClick={() => onSelect(i)}
            className={cn(
              "w-full text-left rounded-xl border p-3 transition",
              i === selectedIndex
                ? "border-[var(--gold)] bg-[rgba(245,208,32,0.08)] ring-1 ring-[var(--gold)]"
                : "border-hair bg-[rgba(20,16,40,0.4)] hover:border-hair-strong"
            )}
            style={{ touchAction: "manipulation" }}
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                {(r.steps ?? []).map((s: any, si: number) => (
                  <span
                    key={si}
                    className="label px-2 py-1 rounded"
                    style={{
                      fontSize: 9,
                      color: "var(--t1)",
                      background: "rgba(139,71,214,0.18)",
                      border: "1px solid rgba(139,71,214,0.35)",
                    }}
                  >
                    {s.toolDetails?.name ?? s.tool ?? "bridge"}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-[11px] text-t3">
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {fmtTime(r.steps?.[0]?.estimate?.executionDuration)}
                </span>
                <span className="flex items-center gap-1">
                  <Zap size={11} />
                  ${Number(r.gasCostUSD ?? 0).toFixed(2)} gas
                </span>
                {r.insurance?.state === "INSURED" && (
                  <span className="flex items-center gap-1 text-fifa-lime">
                    <Shield size={11} />
                    insured
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="mono text-t3 text-[11px]">
                Get ≈
              </span>
              <span
                className="mono display text-lg tabular-nums"
                style={{ color: i === selectedIndex ? "var(--gold)" : "var(--t1)" }}
              >
                {fmtAmount(r.toAmount, r.toToken?.decimals ?? 18)}{" "}
                {r.toToken?.symbol ?? ""}
              </span>
            </div>
          </button>
        ))}
      </div>

      {routes.length > 1 && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="label mt-3 flex items-center gap-1 text-t2 hover:text-t1"
        >
          {showAll ? (
            <>
              <ChevronUp size={14} />
              Hide alternatives
            </>
          ) : (
            <>
              <ChevronDown size={14} />
              {Math.min(routes.length - 1, 4)} more routes
            </>
          )}
        </button>
      )}
    </AccentCard>
  );
}
