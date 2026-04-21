"use client";

import { Check, Loader2, AlertCircle } from "lucide-react";
import { AccentCard } from "@/components/shared/AccentCard";
import type { TransferPhase } from "@/lib/store/transferStore";
import { cn } from "@/lib/utils/cn";

interface Step {
  key: "approving" | "bridging" | "settling" | "done";
  label: string;
  position: "GK" | "DEF" | "MID" | "FWD" | "GOAL";
}

const STEPS: Step[] = [
  { key: "approving", label: "Approve",  position: "DEF"  },
  { key: "bridging",  label: "Bridge",   position: "MID"  },
  { key: "settling",  label: "Settle",   position: "FWD"  },
  { key: "done",      label: "Complete", position: "GOAL" },
];

const ORDER: TransferPhase[] = ["approving", "bridging", "settling", "done"];

export function ProgressCard({
  phase,
  error,
}: {
  phase: TransferPhase;
  error?: string;
}) {
  const currentIdx = ORDER.indexOf(phase);

  return (
    <AccentCard accent="var(--fifa-teal)" className="p-5">
      <header className="mb-4">
        <div className="label text-fifa-teal">Execution</div>
        <h3 className="display text-lg mt-1">Paul&apos;s pitch formation</h3>
      </header>

      <ol className="grid grid-cols-4 gap-2">
        {STEPS.map((s, i) => {
          const state =
            error && i === currentIdx
              ? "error"
              : i < currentIdx
                ? "done"
                : i === currentIdx
                  ? "active"
                  : "pending";
          return (
            <li key={s.key} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border transition",
                  state === "done" && "border-[var(--fifa-lime)] bg-[rgba(159,214,52,0.18)] text-fifa-lime",
                  state === "active" && "border-[var(--gold)] bg-[rgba(245,208,32,0.15)] text-gold",
                  state === "error" && "border-[var(--coral)] bg-[rgba(232,57,44,0.18)] text-coral",
                  state === "pending" && "border-hair bg-[rgba(10,6,21,0.5)] text-t3"
                )}
              >
                {state === "done" ? (
                  <Check size={18} />
                ) : state === "active" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : state === "error" ? (
                  <AlertCircle size={16} />
                ) : (
                  <span className="mono text-[10px] font-bold">{s.position}</span>
                )}
              </div>
              <div
                className="label text-center"
                style={{
                  fontSize: 9,
                  color:
                    state === "done"
                      ? "var(--fifa-lime)"
                      : state === "active"
                        ? "var(--gold)"
                        : state === "error"
                          ? "var(--coral)"
                          : "var(--t3)",
                }}
              >
                {s.label}
              </div>
            </li>
          );
        })}
      </ol>

      {error && (
        <div
          className="mt-4 rounded-lg border border-coral/40 p-3"
          style={{ background: "rgba(232,57,44,0.08)" }}
        >
          <div className="label text-coral mb-1">Something went wrong</div>
          <p className="text-xs text-t2">{error}</p>
        </div>
      )}
    </AccentCard>
  );
}
