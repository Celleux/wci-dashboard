"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface ProfileCardProps {
  handle?: string;
  country?: string;
  level?: number;
  xp?: number;
  xpMax?: number;
  streak?: number;
  bets?: number;
  wins?: number;
  roi?: number;
  pfp?: string;
  badges?: Array<"oracle" | "whale" | "streak" | "paul_banker">;
}

function MiniStat({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div style={{ textAlign: "center", minWidth: 0 }}>
      <div
        className="mono display"
        style={{ fontSize: 13, color, lineHeight: 1, whiteSpace: "nowrap" }}
      >
        {value}
      </div>
      <div className="label" style={{ fontSize: 8, marginTop: 3, color: "var(--t3)" }}>
        {label}
      </div>
    </div>
  );
}

function BadgePill({ kind }: { kind: NonNullable<ProfileCardProps["badges"]>[number] }) {
  const MAP = {
    oracle:      { label: "Oracle", color: "var(--fifa-magenta)" },
    whale:       { label: "Whale",  color: "var(--fifa-blue)" },
    streak:      { label: "Streak", color: "var(--fifa-orange)" },
    paul_banker: { label: "Banker", color: "var(--fifa-lime)" },
  } as const;
  const { label, color } = MAP[kind];
  return (
    <span
      className="label"
      style={{
        fontSize: 8,
        padding: "2px 6px",
        borderRadius: 999,
        background: `${color}22`,
        border: `1px solid ${color}55`,
        color,
        boxShadow: `0 0 8px -3px ${color}`,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

/**
 * Compact gamified profile block — fits cleanly inside a 236px-wide column
 * (260px sidebar − 2×12px padding). Avatar + handle on top row, LV badge pinned
 * inside the avatar's bottom-right, XP bar, badges, 3 mini-stats.
 */
export function ProfileCard({
  handle = "paulfan.eth",
  country = "USA",
  level = 7,
  xp = 2_410,
  xpMax = 3_200,
  streak = 3,
  bets = 23,
  wins = 14,
  roi = 108,
  pfp = "/assets/chibi_jumping.png",
  badges = ["oracle", "streak"],
}: ProfileCardProps) {
  const reduce = useReducedMotion();
  const xpPct = Math.min(100, (xp / xpMax) * 100);

  return (
    <div
      style={{
        position: "relative",
        padding: 12,
        paddingTop: 14,
        borderRadius: 16,
        background:
          "linear-gradient(180deg, rgba(139,71,214,0.28) 0%, rgba(46,111,230,0.10) 60%, rgba(20,16,40,0.72) 100%)",
        border: "1px solid rgba(139,71,214,0.45)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.4), 0 8px 20px -6px var(--fifa-purple), 0 0 24px -10px var(--fifa-purple)",
      }}
    >
      {/* Pattern overlay — its own clipped layer so the parent card does NOT
          need overflow:hidden (which would clip the LV badge). */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/assets/pattern.jpg')",
            backgroundSize: "200% auto",
            backgroundPosition: "top right",
            opacity: 0.06,
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Avatar + handle */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
        <div style={{ position: "relative", flexShrink: 0, width: 48, height: 48 }}>
          <motion.div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              padding: 2,
              background:
                "conic-gradient(from 0deg, var(--fifa-red), var(--fifa-yellow), var(--fifa-teal), var(--fifa-purple), var(--fifa-magenta), var(--fifa-red))",
              filter: "drop-shadow(0 3px 8px rgba(139,71,214,0.55))",
            }}
            animate={reduce ? {} : { rotate: 360 }}
            transition={reduce ? {} : { duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "radial-gradient(circle at 30% 25%, #2a1f50 0%, #0A0615 80%)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.5)",
              }}
            >
              <Image
                src={pfp}
                alt={handle}
                width={48}
                height={48}
                style={{
                  objectFit: "cover",
                  transform: "scale(1.35) translateY(3px)",
                }}
              />
            </div>
          </motion.div>

          {/* LEVEL pill */}
          <div
            style={{
              position: "absolute",
              bottom: -3,
              right: -6,
              background:
                "linear-gradient(180deg, #FFE85B 0%, var(--gold) 50%, var(--gold-deep) 100%)",
              border: "2px solid #0A0615",
              borderRadius: 7,
              padding: "1px 5px",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 5px rgba(0,0,0,0.7)",
            }}
          >
            <span
              className="display"
              style={{
                fontSize: 9,
                color: "var(--t-inverse)",
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: "0.02em",
              }}
            >
              LV{level}
            </span>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            className="display"
            style={{
              fontSize: 14,
              lineHeight: 1.1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "var(--t1)",
            }}
            title={handle}
          >
            {handle}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 2,
              fontSize: 10,
              color: "var(--t3)",
            }}
          >
            <span className="label" style={{ fontSize: 8 }}>
              {country}
            </span>
            <span style={{ color: "var(--fifa-orange)" }}>🔥 {streak}</span>
          </div>
        </div>
      </div>

      {/* Badges row */}
      {badges.length > 0 && (
        <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
          {badges.map((b) => (
            <BadgePill key={b} kind={b} />
          ))}
        </div>
      )}

      {/* XP bar */}
      <div style={{ marginTop: 10, position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4,
            alignItems: "baseline",
          }}
        >
          <span className="label" style={{ fontSize: 8 }}>
            XP
          </span>
          <span
            className="mono"
            style={{ fontSize: 9, color: "var(--gold)", whiteSpace: "nowrap" }}
          >
            {xp.toLocaleString()} / {xpMax.toLocaleString()}
          </span>
        </div>
        <div
          style={{
            position: "relative",
            height: 7,
            borderRadius: 4,
            background: "rgba(10,6,21,0.8)",
            border: "1px solid var(--hair)",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6)",
            overflow: "hidden",
          }}
        >
          <div
            className="shimmer"
            style={{
              height: "100%",
              width: `${xpPct}%`,
              background:
                "linear-gradient(90deg, var(--fifa-teal), var(--gold), var(--fifa-magenta))",
              borderRadius: 4,
              boxShadow: "0 0 8px rgba(245,208,32,0.6)",
            }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 4,
          marginTop: 10,
          paddingTop: 8,
          borderTop: "1px solid var(--hair)",
        }}
      >
        <MiniStat label="Bets" value={bets} color="var(--fifa-teal)" />
        <MiniStat label="Wins" value={wins} color="var(--fifa-lime)" />
        <MiniStat label="ROI" value={`${roi}%`} color="var(--gold)" />
      </div>
    </div>
  );
}
