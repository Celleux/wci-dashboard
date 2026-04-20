"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useBetSlip, type BetPick } from "@/lib/store/betSlipStore";
import { TEAM_NAMES } from "@/lib/data/teams";
import { FlagRect } from "@/components/shared/FlagRect";
import { cn } from "@/lib/utils/cn";

const QUICK_STAKES = [10, 25, 50, 100];

/** Right-side slide-in bet slip drawer (md+) + bottom sheet on mobile. */
export function BetSlip() {
  const { open, pick, stake, phase, setOpen, setStake, submit } = useBetSlip();

  const payout = pick && stake > 0 ? stake * pick.odds : 0;

  return (
    <AnimatePresence>
      {open && pick && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close bet slip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(5,3,12,0.55)",
              backdropFilter: "blur(6px)",
              zIndex: 60,
              cursor: "pointer",
              border: "none",
              padding: 0,
            }}
          />

          {/* Desktop / tablet: right drawer */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Bet slip"
            initial={{ x: "100%", opacity: 0 }}
            animate={{
              x: phase === "flying" ? "120%" : 0,
              opacity: phase === "flying" ? 0 : 1,
            }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: phase === "flying" ? "tween" : "spring",
              duration: phase === "flying" ? 0.6 : undefined,
              stiffness: 260,
              damping: 30,
            }}
            className={cn(
              "hidden md:flex fixed right-0 top-0 bottom-0 z-[65] flex-col",
              "w-[min(480px,92vw)]"
            )}
            style={{
              background:
                "linear-gradient(180deg, rgba(30,20,60,0.98), rgba(10,6,21,0.98))",
              borderLeft: "1px solid var(--hair-strong)",
              boxShadow:
                "-20px 0 60px -12px rgba(0,0,0,0.7), inset 1px 0 0 rgba(255,255,255,0.05)",
            }}
          >
            <SlipContent
              pick={pick}
              stake={stake}
              phase={phase}
              payout={payout}
              onClose={() => setOpen(false)}
              onStake={setStake}
              onSubmit={submit}
            />
          </motion.aside>

          {/* Mobile: bottom sheet */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Bet slip mobile"
            initial={{ y: "100%" }}
            animate={{
              y: phase === "flying" ? "-120%" : 0,
              opacity: phase === "flying" ? 0 : 1,
            }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="md:hidden fixed inset-x-0 bottom-0 z-[65] flex flex-col rounded-t-[28px]"
            style={{
              maxHeight: "92vh",
              background:
                "linear-gradient(180deg, rgba(30,20,60,0.98), rgba(10,6,21,0.98))",
              borderTop: "1px solid var(--hair-strong)",
              boxShadow: "0 -20px 50px -6px rgba(0,0,0,0.7)",
              paddingBottom: "var(--sa-bottom)",
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-2 pb-1" aria-hidden>
              <span
                style={{
                  width: 40,
                  height: 4,
                  borderRadius: 2,
                  background: "var(--hair-strong)",
                }}
              />
            </div>
            <SlipContent
              pick={pick}
              stake={stake}
              phase={phase}
              payout={payout}
              onClose={() => setOpen(false)}
              onStake={setStake}
              onSubmit={submit}
            />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Shared content ──────────────────────────────────────────── */

interface SlipContentProps {
  pick: BetPick;
  stake: number;
  phase: "idle" | "submitting" | "flying";
  payout: number;
  onClose: () => void;
  onStake: (s: number) => void;
  onSubmit: () => void;
}

function SlipContent({
  pick,
  stake,
  phase,
  payout,
  onClose,
  onStake,
  onSubmit,
}: SlipContentProps) {
  const sideLabel =
    pick.side === "home"
      ? TEAM_NAMES[pick.home as keyof typeof TEAM_NAMES] ?? pick.home
      : pick.side === "away"
        ? TEAM_NAMES[pick.away as keyof typeof TEAM_NAMES] ?? pick.away
        : "Draw";

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Header */}
      <header className="flex items-center justify-between gap-3 border-b border-hair px-5 py-4">
        <div>
          <div className="label text-fifa-teal">BET SLIP</div>
          <h2 className="display text-xl mt-0.5">Lock your pick</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hair text-t2 hover:bg-white/5"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </header>

      {/* Pick card */}
      <div className="p-5 flex-1 overflow-y-auto">
        <div
          className="card p-4 mb-5"
          style={{ "--card-accent": "var(--fifa-teal)" } as React.CSSProperties}
        >
          <div className="card-accent-bar" aria-hidden />
          <div className="flex items-center gap-3 mb-3">
            <FlagRect code={pick.home as any} width={30} height={20} />
            <span className="display text-base">{pick.home}</span>
            <span className="text-t3 text-xs">vs</span>
            <FlagRect code={pick.away as any} width={30} height={20} />
            <span className="display text-base">{pick.away}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="label">Your pick</div>
              <div className="display text-xl">{sideLabel}</div>
            </div>
            <div className="text-right">
              <div className="label">Odds</div>
              <div
                className="mono text-xl tabular-nums font-bold"
                style={{ color: "var(--gold)" }}
              >
                {pick.odds.toFixed(2)}×
              </div>
            </div>
          </div>
          {pick.venue && (
            <div className="mono text-[11px] text-t3 mt-3">
              {pick.md ?? ""} · {pick.venue}
            </div>
          )}
        </div>

        {/* Stake input */}
        <label className="label block mb-2">Stake · USDC</label>
        <div
          className="rounded-xl border border-hair-strong p-3 mb-3"
          style={{ background: "rgba(10,6,21,0.6)" }}
        >
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={1}
            value={stake === 0 ? "" : stake}
            onChange={(e) => onStake(Number(e.target.value) || 0)}
            className="mono display w-full bg-transparent text-3xl tabular-nums outline-none text-t1 placeholder-t4"
            placeholder="0"
            aria-label="Stake in USDC"
          />
        </div>

        {/* Quick stakes */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {QUICK_STAKES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onStake(s)}
              className={cn(
                "rounded-lg py-2.5 label border transition",
                stake === s
                  ? "bg-[rgba(245,208,32,0.15)] border-gold text-gold"
                  : "border-hair text-t2 hover:bg-white/5"
              )}
            >
              {s}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onStake(2450)}
            className="col-span-4 rounded-lg py-2.5 label border border-hair text-t2 hover:bg-white/5 transition"
          >
            MAX · $2,450 USDC
          </button>
        </div>

        {/* Payout preview */}
        <div
          className="rounded-xl p-4 mb-5"
          style={{
            background:
              "linear-gradient(180deg, rgba(245,208,32,0.12), rgba(245,208,32,0.04))",
            border: "1px solid rgba(245,208,32,0.35)",
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="label text-gold">POTENTIAL PAYOUT</span>
            <span className="mono text-[11px] text-t3">0% house edge</span>
          </div>
          <div
            className="display tabular-nums text-3xl"
            style={{ color: "var(--gold)" }}
          >
            +{payout.toFixed(2)} USDC
          </div>
          <div className="mono text-[11px] text-t3 mt-1">
            Win profit: {(payout - stake).toFixed(2)} USDC
          </div>
        </div>

        {/* Paul tag */}
        <div className="flex items-center gap-3 rounded-lg border border-hair px-3 py-2 mb-5 bg-[rgba(139,71,214,0.08)]">
          <Image
            src="/assets/chibi_cheerful.png"
            alt=""
            width={40}
            height={40}
            style={{ filter: "drop-shadow(0 2px 8px rgba(139,71,214,0.4))" }}
          />
          <div className="flex-1">
            <div className="mono text-[11px] text-fifa-magenta">Paul's take</div>
            <div className="text-xs text-t2">
              78% confidence on this line — following the market.
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="border-t border-hair p-4">
        <button
          type="button"
          onClick={onSubmit}
          disabled={stake <= 0 || phase !== "idle"}
          className="btn-3d w-full"
        >
          {phase === "submitting"
            ? "LOCKING IN…"
            : phase === "flying"
              ? "SENT"
              : `PLACE BET · ${stake} USDC`}
        </button>
      </div>
    </div>
  );
}
