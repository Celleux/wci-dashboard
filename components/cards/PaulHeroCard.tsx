"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PaulHero } from "@/components/paul/PaulHero";

interface PaulHeroCardProps {
  /** Pass true when the next-match card has been interacted with. */
  reaching?: boolean;
  /** Responsive Paul size: defaults to 320 (mobile), override for desktop. */
  paulSize?: number;
}

/**
 * Left hero card on the home page.
 * Shows Paul the Oracle with stats + identity header.
 * Tentacles intentionally overflow the card bounds (overflow: visible).
 */
export function PaulHeroCard({
  reaching = false,
  paulSize = 320,
}: PaulHeroCardProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="card"
      style={{
        "--card-accent": "var(--fifa-purple)",
        padding: 0,
        height: 520,
        overflow: "visible",
        position: "relative",
      } as React.CSSProperties}
    >
      {/* Accent bar */}
      <div className="card-accent-bar" aria-hidden />

      {/* Pattern layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 22,
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(139,71,214,0.22), rgba(20,16,40,0.95))",
        }}
        aria-hidden
      />

      {/* Rotating rainbow glow behind Paul */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: "10% 10% -20% -20%",
          background:
            "conic-gradient(from 0deg, var(--fifa-red), var(--fifa-yellow), var(--fifa-teal), var(--fifa-purple), var(--fifa-magenta), var(--fifa-red))",
          opacity: 0.16,
          filter: "blur(50px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
        animate={prefersReduced ? {} : { rotate: [0, 360] }}
        transition={
          prefersReduced
            ? {}
            : { duration: 30, repeat: Infinity, ease: "linear" }
        }
      />

      {/* Header — text info top-left */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 24,
          zIndex: 4,
          maxWidth: "58%",
        }}
      >
        {/* Live badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--fifa-lime)",
              boxShadow: "0 0 12px var(--fifa-lime)",
              display: "inline-block",
            }}
          />
          <span
            className="label"
            style={{ color: "var(--fifa-lime)", fontSize: 10 }}
          >
            THE ORACLE &middot; LIVE
          </span>
        </div>

        {/* Name */}
        <div
          className="display"
          style={{
            fontSize: "clamp(44px, 8vw, 64px)",
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
            marginTop: 6,
            background: "linear-gradient(180deg, #fff, var(--gold))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          PAUL
        </div>

        {/* Win/loss/ROI row */}
        <div
          style={{
            color: "var(--t2)",
            fontSize: 12,
            marginTop: 8,
            display: "flex",
            gap: 6,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            className="mono"
            style={{ color: "var(--fifa-lime)", fontWeight: 700 }}
          >
            38W
          </span>
          <span style={{ color: "var(--t4)" }}>&middot;</span>
          <span
            className="mono"
            style={{ color: "var(--coral)", fontWeight: 700 }}
          >
            12L
          </span>
          <span style={{ color: "var(--t4)" }}>&middot;</span>
          <span
            className="mono"
            style={{ color: "var(--gold)", fontWeight: 700 }}
          >
            76% ROI
          </span>
        </div>

        {/* Chips */}
        <div
          style={{
            marginTop: 14,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            alignItems: "flex-start",
          }}
        >
          <span className="chip chip-gold" style={{ fontSize: 10, height: 26 }}>
            78% CONFIDENCE TODAY
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(10,6,21,0.6)",
              border: "1px solid var(--hair-strong)",
            }}
          >
            <span
              className="mono"
              style={{ fontSize: 11, fontWeight: 700, color: "var(--t1)" }}
            >
              USA
            </span>
            <span style={{ fontSize: 10, color: "var(--t3)" }}>vs</span>
            <span
              className="mono"
              style={{ fontSize: 11, fontWeight: 700, color: "var(--t1)" }}
            >
              TUR
            </span>
          </div>
        </div>
      </div>

      {/* Paul character — bottom-right, overflows card */}
      <div
        style={{
          position: "absolute",
          right: -20,
          bottom: 0,
          top: 40,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            transform: `scale(${paulSize / 460})`,
            transformOrigin: "bottom right",
          }}
        >
          <PaulHero size={460} reaching={reaching} />
        </div>
      </div>

      {/* Bottom stats bar */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          zIndex: 3,
          display: "flex",
          gap: 8,
        }}
      >
        {(
          [
            ["STREAK", "5", "var(--fifa-orange)"],
            ["TOP %", "0.1%", "var(--gold)"],
            ["FOLLOWERS", "12.8K", "var(--fifa-teal)"],
          ] as const
        ).map(([label, value, color]) => (
          <div
            key={label}
            style={{
              flex: 1,
              padding: "8px 10px",
              background: "rgba(10,6,21,0.75)",
              border: `1px solid ${color}33`,
              borderRadius: 10,
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="label" style={{ fontSize: 9, color }}>
              {label}
            </div>
            <div
              className="display mono"
              style={{ fontSize: 16, color: "#fff", marginTop: 2 }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
