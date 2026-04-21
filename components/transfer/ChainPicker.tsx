"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { CHAINS, type SupportedChainId } from "@/lib/transfer/constants";
import { ChainLogo } from "./ChainLogo";
import { cn } from "@/lib/utils/cn";

interface Props {
  open: boolean;
  onClose: () => void;
  onPick: (id: SupportedChainId) => void;
  current?: SupportedChainId;
  label?: string;
}

export function ChainPicker({ open, onClose, onPick, current, label = "Select chain" }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close chain picker"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 70,
              background: "rgba(5,3,12,0.55)",
              backdropFilter: "blur(6px)",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            initial={{ y: "10%", opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "10%", opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed z-[72] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(480px,92vw)] p-0"
          >
            <div
              className="card p-5"
              style={{ "--card-accent": "var(--fifa-teal)" } as React.CSSProperties}
            >
              <div className="card-accent-bar" aria-hidden />
              <header className="flex items-center justify-between mb-4">
                <div>
                  <div className="label">{label}</div>
                  <h3 className="display text-xl mt-1">Pick a chain</h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="w-9 h-9 rounded-full border border-hair flex items-center justify-center text-t2 hover:bg-white/5"
                >
                  <X size={16} />
                </button>
              </header>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CHAINS.map((c) => {
                  const active = c.id === current;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        onPick(c.id);
                        onClose();
                      }}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-xl border p-3 transition min-h-[84px]",
                        active
                          ? "border-[var(--gold)] bg-[rgba(245,208,32,0.1)] ring-1 ring-[var(--gold)]"
                          : "border-hair bg-[rgba(10,6,21,0.4)] hover:border-hair-strong hover:bg-[rgba(255,255,255,0.04)]"
                      )}
                      style={{ touchAction: "manipulation" }}
                    >
                      <ChainLogo chain={c} size={36} />
                      <div className="text-center">
                        <div
                          className="display text-sm"
                          style={{ color: active ? "var(--gold)" : "var(--t1)" }}
                        >
                          {c.name}
                        </div>
                        <div className="mono text-[10px] text-t3">
                          {c.nativeSymbol}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
