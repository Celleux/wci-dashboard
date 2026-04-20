"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type OutcomeSide = "home" | "draw" | "away";

interface NextMatchCardProps {
  /** Called when user picks an outcome. */
  onPickOutcome: (side: OutcomeSide) => void;
}

// ── Countdown ──────────────────────────────────────────────
function pad(v: number) {
  return String(v).padStart(2, "0");
}

function TickDigit({ v }: { v: string }) {
  const prefersReduced = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={v}
        initial={prefersReduced ? {} : { y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={prefersReduced ? {} : { y: 8, opacity: 0 }}
        transition={{ duration: 0.12 }}
        style={{ display: "inline-block" }}
      >
        {v}
      </motion.span>
    </AnimatePresence>
  );
}

function Countdown({ targetMs }: { targetMs: number }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, targetMs - now);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);

  return (
    <div
      className="mono"
      style={{
        fontSize: "clamp(40px, 7vw, 58px)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        color: "#fff",
        lineHeight: 1,
        display: "flex",
        alignItems: "baseline",
        gap: 2,
      }}
    >
      <span style={{ color: "var(--t3)", fontSize: "clamp(20px, 4vw, 28px)", marginRight: 6 }}>
        T&minus;
      </span>
      <TickDigit v={pad(h)} />
      <span style={{ color: "var(--t4)", margin: "0 2px" }}>:</span>
      <TickDigit v={pad(m)} />
      <span style={{ color: "var(--t4)", margin: "0 2px" }}>:</span>
      <TickDigit v={pad(s)} />
    </div>
  );
}

// ── Pool bar ───────────────────────────────────────────────
function PoolBar({
  home,
  draw,
  away,
}: {
  home: number;
  draw: number;
  away: number;
}) {
  const total = home + draw + away;
  return (
    <div
      style={{
        display: "flex",
        height: 8,
        borderRadius: 4,
        overflow: "hidden",
        background: "rgba(255,255,255,0.06)",
      }}
    >
      <motion.div
        style={{ background: "var(--fifa-teal)" }}
        initial={{ width: 0 }}
        animate={{ width: `${(home / total) * 100}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.div
        style={{ background: "var(--t3)" }}
        initial={{ width: 0 }}
        animate={{ width: `${(draw / total) * 100}%` }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      />
      <motion.div
        style={{ background: "var(--fifa-orange)" }}
        initial={{ width: 0 }}
        animate={{ width: `${(away / total) * 100}%` }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  );
}

// ── Confidence bar ─────────────────────────────────────────
function ConfidenceBar({ value }: { value: number }) {
  return (
    <div
      style={{
        height: 8,
        borderRadius: 4,
        background: "rgba(255,255,255,0.06)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        className="shimmer"
        style={{
          height: "100%",
          background: "var(--gold)",
          boxShadow: "0 0 12px var(--gold)",
        }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}

// ── Outcome button ─────────────────────────────────────────
const OUTCOME_CONFIG = {
  home: {
    label: "H",
    fullLabel: "USA",
    accent: "var(--fifa-teal)",
  },
  draw: {
    label: "D",
    fullLabel: "DRAW",
    accent: "var(--t3)",
  },
  away: {
    label: "A",
    fullLabel: "TUR",
    accent: "var(--fifa-orange)",
  },
} as const;

function OutcomeBtn({
  side,
  pool,
  total,
  selected,
  onClick,
}: {
  side: OutcomeSide;
  pool: number;
  total: number;
  selected: boolean;
  onClick: () => void;
}) {
  const { fullLabel, accent } = OUTCOME_CONFIG[side];
  const pct = ((pool / total) * 100).toFixed(0);
  const implied = (total / pool).toFixed(2);

  return (
    <button
      className="btn-outcome"
      data-selected={selected ? "true" : "false"}
      onClick={onClick}
      style={
        {
          "--outcome-accent": accent,
          padding: "12px 10px",
          touchAction: "manipulation",
          minHeight: 56,
        } as React.CSSProperties
      }
      aria-pressed={selected}
      aria-label={`Pick ${fullLabel}`}
    >
      <div
        style={{
          fontSize: 10,
          color: "var(--t3)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontWeight: 600,
        }}
      >
        {fullLabel}
      </div>
      <div
        className="display mono"
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: accent,
          marginTop: 2,
          letterSpacing: "-0.01em",
        }}
      >
        {implied}&times;
      </div>
      <div className="mono" style={{ fontSize: 10, color: "var(--t3)", marginTop: 2 }}>
        ${pool}K &middot; {pct}%
      </div>
    </button>
  );
}

// ── Main card ──────────────────────────────────────────────
export function NextMatchCard({ onPickOutcome }: NextMatchCardProps) {
  const prefersReduced = useReducedMotion();
  const [selected, setSelected] = useState<OutcomeSide | null>(null);

  const kickoffTarget = useMemo(
    () => Date.now() + 2 * 3_600_000 + 14 * 60_000 + 33_000,
    [],
  );

  const pools = { home: 420, draw: 180, away: 340 };
  const total = pools.home + pools.draw + pools.away;

  const handlePick = (side: OutcomeSide) => {
    setSelected(side);
    onPickOutcome(side);
  };

  return (
    <div
      className="card"
      style={
        {
          "--card-accent": "var(--fifa-red)",
          padding: 28,
          height: 520,
          position: "relative",
          overflow: "hidden",
        } as React.CSSProperties
      }
    >
      {/* Accent bar */}
      <div className="card-accent-bar" aria-hidden />

      {/* Decorative group stripe */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "linear-gradient(90deg, var(--grp-d), var(--grp-a))",
          boxShadow: "0 0 20px var(--grp-d)",
        }}
      />

      {/* Top row — match identity */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        {/* Left: group + teams */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              className="group-tile"
              style={
                {
                  "--group-color": "var(--grp-d)",
                  width: 22,
                  height: 22,
                  fontSize: 12,
                  borderRadius: 6,
                } as React.CSSProperties
              }
            >
              D
            </div>
            <span className="label">NEXT KICK &middot; GROUP D &middot; MD2</span>
          </div>

          {/* Team display */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 16,
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: "linear-gradient(180deg, var(--grp-d), #0A0615)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 0 rgba(0,0,0,0.5), 0 8px 16px -4px var(--grp-d)",
                }}
              >
                <span
                  className="display mono"
                  style={{ fontSize: 14, color: "var(--t1)", letterSpacing: "0.04em" }}
                >
                  USA
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <span
                className="display"
                style={{ fontSize: 13, color: "var(--t3)", fontWeight: 600 }}
              >
                VS
              </span>
              <span className="mono" style={{ fontSize: 9, color: "var(--t4)" }}>
                SoFi Stadium
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: "linear-gradient(180deg, var(--fifa-red), #0A0615)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 0 rgba(0,0,0,0.5), 0 8px 16px -4px var(--fifa-red)",
                }}
              >
                <span
                  className="display mono"
                  style={{ fontSize: 14, color: "var(--t1)", letterSpacing: "0.04em" }}
                >
                  TUR
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Paul's pick */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <span className="chip chip-gold" style={{ fontSize: 10, height: 26 }}>
            {"I'M PICKING"}
          </span>
          <div
            className="display mono"
            style={{
              fontSize: 32,
              marginTop: 6,
              color: "var(--gold)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            USA
          </div>
          <div
            className="mono"
            style={{ fontSize: 10, color: "var(--fifa-lime)", marginTop: 4 }}
          >
            Pool split 54/21/25
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div
        style={{
          marginTop: 24,
          paddingTop: 20,
          borderTop: "1px solid var(--hair)",
        }}
      >
        <span className="label" style={{ display: "block", marginBottom: 8 }}>
          KICKOFF COUNTDOWN
        </span>
        <Countdown targetMs={kickoffTarget} />
      </div>

      {/* Confidence bar */}
      <div style={{ marginTop: 18 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <span className="label">MY CONFIDENCE</span>
          <span
            className="mono"
            style={{ fontSize: 13, color: "var(--gold)", fontWeight: 700 }}
          >
            78%
          </span>
        </div>
        <ConfidenceBar value={78} />
      </div>

      {/* Pool split bar */}
      <div style={{ marginTop: 14 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span className="label">POOL SPLIT</span>
          <span
            className="mono"
            style={{ fontSize: 10, color: "var(--t3)" }}
          >
            ${total}K TOTAL
          </span>
        </div>
        <PoolBar home={pools.home} draw={pools.draw} away={pools.away} />
      </div>

      {/* H / D / A outcome buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          marginTop: 18,
        }}
      >
        {(["home", "draw", "away"] as const).map((side) => (
          <OutcomeBtn
            key={side}
            side={side}
            pool={pools[side]}
            total={total}
            selected={selected === side}
            onClick={() => handlePick(side)}
          />
        ))}
      </div>

      {/* Follow Paul CTA */}
      <motion.button
        className="btn-3d"
        onClick={() => handlePick(selected ?? "home")}
        whileTap={prefersReduced ? {} : { scale: 0.97, y: 4 }}
        style={{
          width: "100%",
          padding: "16px",
          marginTop: 14,
          fontSize: 15,
          touchAction: "manipulation",
        }}
        aria-label="Place bet following Paul's pick"
      >
        PLACE BET &middot; FOLLOW PAUL
      </motion.button>
    </div>
  );
}
