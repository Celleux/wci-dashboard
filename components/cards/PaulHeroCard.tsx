"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Chip } from "@/components/shared/Chip";
import { FlagRect } from "@/components/shared/FlagRect";

interface PaulHeroCardProps {
  reaching?: boolean;
  paulSize?: number;
}

/**
 * Hero card — PAUL wordmark + stats on the LEFT, chibi character BIG on the
 * RIGHT overflowing the card (overflow: visible). Animated conic halo behind
 * Paul. Bottom row has 3 stat pills (streak / top% / followers).
 */
export function PaulHeroCard({ paulSize = 460 }: PaulHeroCardProps) {
  const reduce = useReducedMotion();

  return (
    <div
      className="card relative"
      style={{
        "--card-accent": "var(--fifa-purple)",
        minHeight: 440,
        padding: 0,
        overflow: "visible",
      } as React.CSSProperties}
    >
      <div className="card-accent-bar" aria-hidden />

      {/* Gradient background panel */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 22,
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(139,71,214,0.25) 0%, rgba(41,31,82,0.5) 45%, rgba(20,16,40,0.95) 100%)",
        }}
      />

      {/* Conic rainbow glow behind Paul */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          right: "-10%",
          top: "8%",
          bottom: "-10%",
          width: "70%",
          background:
            "conic-gradient(from 0deg, var(--fifa-red), var(--fifa-yellow), var(--fifa-teal), var(--fifa-purple), var(--fifa-magenta), var(--fifa-red))",
          opacity: 0.18,
          filter: "blur(55px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
        animate={reduce ? {} : { rotate: [0, 360] }}
        transition={reduce ? {} : { duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Left column — PAUL + stats + chips */}
      <div
        style={{
          position: "absolute",
          top: 22,
          left: 24,
          zIndex: 4,
          maxWidth: "58%",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {/* Live badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            aria-hidden
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--fifa-lime)",
              boxShadow: "0 0 12px var(--fifa-lime)",
              animation: reduce ? undefined : "pulse-dot 1.6s ease-in-out infinite",
            }}
          />
          <span className="label" style={{ color: "var(--fifa-lime)" }}>
            THE ORACLE · LIVE
          </span>
        </div>

        {/* PAUL wordmark */}
        <div
          className="display"
          style={{
            fontSize: "clamp(54px, 9vw, 84px)",
            lineHeight: 0.88,
            letterSpacing: "-0.04em",
            background: "linear-gradient(180deg, #FFF5AE 0%, var(--gold) 50%, #A88900 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 2px 20px rgba(245,208,32,0.25)",
            margin: 0,
          }}
        >
          PAUL
        </div>

        {/* W / L / ROI */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span className="mono" style={{ color: "var(--fifa-lime)", fontWeight: 700, fontSize: 13 }}>
            38W
          </span>
          <span style={{ color: "var(--t4)" }}>·</span>
          <span className="mono" style={{ color: "var(--coral)", fontWeight: 700, fontSize: 13 }}>
            12L
          </span>
          <span style={{ color: "var(--t4)" }}>·</span>
          <span className="mono" style={{ color: "var(--gold)", fontWeight: 700, fontSize: 13 }}>
            76% ROI
          </span>
        </div>

        {/* Confidence chip */}
        <Chip kind="gold" className="self-start" style={{ fontSize: 10 }}>
          78% CONFIDENCE TODAY
        </Chip>

        {/* USA vs TUR pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 999,
            background: "rgba(10,6,21,0.65)",
            border: "1px solid var(--hair-strong)",
            alignSelf: "flex-start",
            backdropFilter: "blur(6px)",
          }}
        >
          <FlagRect code="USA" width={22} height={14} />
          <span className="mono text-xs" style={{ fontWeight: 700 }}>USA</span>
          <span className="text-t3 text-[10px]">vs</span>
          <FlagRect code="TUR" width={22} height={14} />
          <span className="mono text-xs" style={{ fontWeight: 700 }}>TUR</span>
        </div>
      </div>

      {/* Paul character — BIG, right-side, overflowing */}
      <motion.div
        style={{
          position: "absolute",
          right: -30,
          bottom: -20,
          top: "12%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          zIndex: 3,
          pointerEvents: "none",
          width: "55%",
        }}
        animate={reduce ? {} : { y: [0, -8, 0] }}
        transition={reduce ? {} : { duration: 4, ease: "easeInOut", repeat: Infinity }}
      >
        <Image
          src="/assets/chibi_oracle.png"
          alt="Paul the Oracle"
          width={paulSize}
          height={paulSize}
          priority
          style={{
            objectFit: "contain",
            filter:
              "drop-shadow(0 24px 48px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(139,71,214,0.45))",
          }}
        />
      </motion.div>

      {/* Bottom stat pill row */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          zIndex: 4,
          display: "flex",
          gap: 8,
        }}
      >
        {([
          ["STREAK", "5", "var(--fifa-orange)"],
          ["TOP %", "0.1%", "var(--gold)"],
          ["FOLLOWERS", "12.8K", "var(--fifa-teal)"],
        ] as const).map(([label, value, color]) => (
          <div
            key={label}
            className="flex-1 stat-tile"
            style={
              {
                "--tile-color": color,
                padding: "10px 12px",
                background: "rgba(10,6,21,0.78)",
                borderRadius: 12,
                backdropFilter: "blur(12px)",
              } as React.CSSProperties
            }
          >
            <div className="label" style={{ fontSize: 9, color }}>
              {label}
            </div>
            <div className="display mono" style={{ fontSize: 18, color: "#fff", marginTop: 2 }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
