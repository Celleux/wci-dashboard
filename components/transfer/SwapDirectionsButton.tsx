"use client";

import { ArrowDownUp } from "lucide-react";

export function SwapDirectionsButton({ onSwap }: { onSwap: () => void }) {
  return (
    <div className="flex items-center justify-center -my-2 relative z-[2]">
      <button
        type="button"
        onClick={onSwap}
        aria-label="Swap directions"
        className="flex items-center justify-center rounded-full border border-hair-strong bg-[rgba(10,6,21,0.85)] text-t2 hover:text-gold hover:border-[var(--gold)] transition"
        style={{
          width: 40,
          height: 40,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 10px rgba(0,0,0,0.5), 0 0 12px -4px var(--fifa-purple)",
          touchAction: "manipulation",
        }}
      >
        <ArrowDownUp size={16} />
      </button>
    </div>
  );
}
