"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Chip } from "@/components/shared/Chip";
import { FlagRect } from "@/components/shared/FlagRect";
import { PaulStudio, type PaulMood } from "@/components/paul/PaulStudio";

interface PaulHeroCardProps {
  reaching?: boolean;
  paulSize?: number;
}

/**
 * Hero card — PAUL wordmark + stats on the LEFT, the animated SVG rig
 * PaulStudio on the RIGHT (overflowing the card bounds for a sticker feel).
 * Background features the official FIFA26 rainbow-arc pattern behind Paul,
 * masked and muted so it reinforces the brand without overpowering.
 *
 * Cursor look-at tracking + periodic wink animation handled here so the
 * mouse-position lookup stays close to the DOM.
 */
export function PaulHeroCard({ paulSize = 440 }: PaulHeroCardProps) {
  const reduce = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<PaulMood>("idle");
  const [lookAt, setLookAt] = useState({ x: 0, y: 0 });

  // Cursor look-at
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      setLookAt({
        x: Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2))),
        y: Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2))),
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  // Periodic wink → focus → wink cycle
  useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setMood("focus");
      setTimeout(() => setMood("idle"), 460);
      t = setTimeout(cycle, 4500 + Math.random() * 2200);
    };
    t = setTimeout(cycle, 2500);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <div
      ref={wrapperRef}
      className="card relative"
      style={{
        "--card-accent": "var(--fifa-purple)",
        minHeight: 500,
        padding: 0,
        overflow: "visible",
      } as React.CSSProperties}
    >
      <div className="card-accent-bar" aria-hidden />

      {/* Base gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 22,
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(139,71,214,0.30) 0%, rgba(41,31,82,0.5) 45%, rgba(20,16,40,0.96) 100%)",
        }}
      />

      {/* FIFA26 arc pattern — the official rainbow pattern from the brand */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 22,
          overflow: "hidden",
          backgroundImage: "url('/assets/pattern.jpg')",
          backgroundSize: "170% auto",
          backgroundPosition: "65% 35%",
          backgroundRepeat: "no-repeat",
          filter: "saturate(1.15) contrast(1.05)",
          opacity: 0.35,
          mixBlendMode: "screen",
          maskImage:
            "radial-gradient(ellipse at 68% 55%, black 10%, rgba(0,0,0,0.5) 45%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 68% 55%, black 10%, rgba(0,0,0,0.5) 45%, transparent 80%)",
        }}
      />

      {/* Conic rainbow glow behind Paul */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          right: "-12%",
          top: "10%",
          bottom: "-12%",
          width: "75%",
          background:
            "conic-gradient(from 0deg, var(--fifa-red), var(--fifa-yellow), var(--fifa-teal), var(--fifa-purple), var(--fifa-magenta), var(--fifa-red))",
          opacity: 0.22,
          filter: "blur(60px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
        animate={reduce ? {} : { rotate: [0, 360] }}
        transition={reduce ? {} : { duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Left: text column */}
      <div
        style={{
          position: "absolute",
          top: 22,
          left: 24,
          zIndex: 4,
          maxWidth: "50%",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
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

        <div
          className="display"
          style={{
            fontSize: "clamp(54px, 8.5vw, 88px)",
            lineHeight: 0.88,
            letterSpacing: "-0.04em",
            background:
              "linear-gradient(180deg, #FFF5AE 0%, var(--gold) 55%, #A88900 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 2px 20px rgba(245,208,32,0.28)",
            margin: 0,
          }}
        >
          PAUL
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span className="mono" style={{ color: "var(--fifa-lime)", fontWeight: 700, fontSize: 13 }}>38W</span>
          <span style={{ color: "var(--t4)" }}>·</span>
          <span className="mono" style={{ color: "var(--coral)", fontWeight: 700, fontSize: 13 }}>12L</span>
          <span style={{ color: "var(--t4)" }}>·</span>
          <span className="mono" style={{ color: "var(--gold)", fontWeight: 700, fontSize: 13 }}>76% ROI</span>
        </div>

        <Chip kind="gold" className="self-start" style={{ fontSize: 10 }}>
          78% CONFIDENCE TODAY
        </Chip>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 999,
            background: "rgba(10,6,21,0.68)",
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

      {/* Right: animated Paul SVG rig */}
      <motion.div
        style={{
          position: "absolute",
          right: -24,
          bottom: -30,
          top: "6%",
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
        <PaulStudio size={paulSize} mood={mood} lookAt={lookAt} />
      </motion.div>

      {/* Bottom stat pills */}
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
            style={{
              "--tile-color": color,
              padding: "10px 12px",
              background: "rgba(10,6,21,0.82)",
              borderRadius: 12,
              backdropFilter: "blur(12px)",
            } as React.CSSProperties}
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
