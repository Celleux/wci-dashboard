"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChibiImage } from "@/components/shared/ChibiImage";
import type { TransferPhase } from "@/lib/store/transferStore";

const LINES: Record<TransferPhase, string> = {
  idle: "What chain we running? Pick a side.",
  scouting: "Scouting the best route. Don't rush genius.",
  route_ready: "Sharp line. Tap it and we go.",
  approving: "Signing one form. Not the fun one yet.",
  bridging: "Midfield battle. Nearly through.",
  settling: "Customs. Paperwork. Nearly through.",
  done: "Clean ball through the channels. Go bet.",
  error: "Route collapsed. Let me find another path.",
};

export function PaulCommentary({
  phase,
  override,
}: {
  phase: TransferPhase;
  override?: string;
}) {
  const line = override ?? LINES[phase] ?? LINES.idle;
  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-hair px-3 py-2.5"
      style={{
        background:
          "linear-gradient(180deg, rgba(139,71,214,0.15) 0%, rgba(10,6,21,0.4) 100%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <ChibiImage
        src="/assets/chibi_cheerful.png"
        size={44}
        glow="rgba(139,71,214,0.4)"
      />
      <div className="flex-1 min-w-0">
        <div className="label" style={{ fontSize: 9, color: "var(--fifa-magenta)" }}>
          Paul says
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={line}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-t1 italic"
          >
            &ldquo;{line}&rdquo;
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
