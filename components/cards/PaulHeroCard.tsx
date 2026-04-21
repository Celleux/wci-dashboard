"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Chip } from "@/components/shared/Chip";
import { FlagRect } from "@/components/shared/FlagRect";
import { PaulStudio, type PaulMood } from "@/components/paul/PaulStudio";

/**
 * Hero card — PAUL wordmark + stats on the LEFT, the animated SVG rig
 * PaulStudio on the RIGHT. Fully responsive: the Paul container shrinks to
 * fit narrow screens (min 180px side length) and grows to ~440px on lg+.
 */
export function PaulHeroCard() {
  const reduce = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mood, setMood] = useState<PaulMood>("idle");
  const [lookAt, setLookAt] = useState({ x: 0, y: 0 });

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
      className="card relative w-full"
      style={
        {
          "--card-accent": "var(--fifa-purple)",
          // Responsive min-height: 380 mobile → 500 desktop
          minHeight: "clamp(380px, 48vw, 520px)",
          padding: 0,
          overflow: "hidden",
        } as React.CSSProperties
      }
    >
      <div className="card-accent-bar" aria-hidden />

      {/* Base gradient */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 22,
          background:
            "linear-gradient(180deg, rgba(139,71,214,0.30) 0%, rgba(41,31,82,0.5) 45%, rgba(20,16,40,0.96) 100%)",
        }}
      />

      {/* FIFA26 arc pattern behind Paul */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 22,
          overflow: "hidden",
          backgroundImage: "url('/assets/pattern.jpg')",
          backgroundSize: "180% auto",
          backgroundPosition: "65% 40%",
          backgroundRepeat: "no-repeat",
          filter: "saturate(1.15) contrast(1.05)",
          opacity: 0.30,
          mixBlendMode: "screen",
          maskImage:
            "radial-gradient(ellipse at 68% 55%, black 8%, rgba(0,0,0,0.5) 42%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 68% 55%, black 8%, rgba(0,0,0,0.5) 42%, transparent 78%)",
        }}
      />

      {/* Conic rainbow glow behind Paul */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          right: "-14%",
          top: "8%",
          bottom: "-14%",
          width: "72%",
          background:
            "conic-gradient(from 0deg, var(--fifa-red), var(--fifa-yellow), var(--fifa-teal), var(--fifa-purple), var(--fifa-magenta), var(--fifa-red))",
          opacity: 0.22,
          filter: "blur(55px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
        animate={reduce ? {} : { rotate: [0, 360] }}
        transition={reduce ? {} : { duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Responsive flex grid — stacks on narrow, side-by-side on md+ */}
      <div
        className="relative z-[3] flex h-full flex-col md:grid"
        style={{
          // On md+ we switch to a two-column grid: text + Paul
          gridTemplateColumns: "1fr 1fr",
          minHeight: "inherit",
        }}
      >
        {/* Left column: PAUL + stats */}
        <div
          className="flex flex-col gap-2 md:gap-3 p-4 pb-0 md:p-6 md:pb-6"
          style={{ zIndex: 4 }}
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
              fontSize: "clamp(52px, 12vw, 92px)",
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

        {/* Right column: Paul SVG — fills its cell responsively */}
        <motion.div
          className="relative flex items-end justify-center md:justify-end md:-mr-4 md:-mb-4"
          style={{
            height: "clamp(240px, 46vw, 520px)",
            minHeight: 240,
            paddingTop: 8,
          }}
          animate={reduce ? {} : { y: [0, -6, 0] }}
          transition={reduce ? {} : { duration: 4, ease: "easeInOut", repeat: Infinity }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              maxWidth: 540,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <PaulStudio responsive mood={mood} lookAt={lookAt} />
          </div>
        </motion.div>
      </div>

      {/* Bottom stat pills — absolute so they overlay the grid */}
      <div
        className="absolute left-3 right-3 md:left-4 md:right-4 bottom-3 md:bottom-4 z-[5] flex gap-2"
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
              padding: "8px 10px",
              background: "rgba(10,6,21,0.82)",
              borderRadius: 10,
              backdropFilter: "blur(12px)",
            } as React.CSSProperties}
          >
            <div className="label" style={{ fontSize: 9, color }}>
              {label}
            </div>
            <div className="display mono" style={{ fontSize: 15, color: "#fff", marginTop: 2 }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
