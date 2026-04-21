"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Chip } from "@/components/shared/Chip";
import { ChibiImage } from "@/components/shared/ChibiImage";

/**
 * Hero for the Transfer Window — "sign your stack to USDC" football metaphor.
 * FIFA26 pattern layered behind. Paul in battle pose, coaching the swap.
 */
export function TransferHero() {
  const reduce = useReducedMotion();

  return (
    <div
      className="card relative overflow-visible p-5 md:p-6"
      style={{ "--card-accent": "var(--fifa-blue)" } as React.CSSProperties}
    >
      <div className="card-accent-bar" aria-hidden />

      {/* FIFA26 pattern behind the whole hero */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 22,
          overflow: "hidden",
          backgroundImage: "url('/assets/pattern.jpg')",
          backgroundSize: "170% auto",
          backgroundPosition: "70% 45%",
          backgroundRepeat: "no-repeat",
          filter: "saturate(1.15)",
          opacity: 0.25,
          mixBlendMode: "screen",
          maskImage:
            "radial-gradient(ellipse at 70% 50%, black 10%, rgba(0,0,0,0.4) 45%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 70% 50%, black 10%, rgba(0,0,0,0.4) 45%, transparent 82%)",
        }}
      />

      {/* Slow rainbow conic behind Paul */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          right: "-10%",
          top: "-10%",
          bottom: "-10%",
          width: "60%",
          background:
            "conic-gradient(from 0deg, var(--fifa-red), var(--fifa-yellow), var(--fifa-teal), var(--fifa-blue), var(--fifa-magenta), var(--fifa-red))",
          opacity: 0.18,
          filter: "blur(60px)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
        animate={reduce ? {} : { rotate: [0, 360] }}
        transition={reduce ? {} : { duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-[3] grid items-center gap-5 md:grid-cols-[1fr_auto]">
        <div>
          <Chip kind="gold" className="mb-2">
            powered by LI.FI · 20+ bridges · 30+ DEXes
          </Chip>
          <h1
            className="display"
            style={{
              fontSize: "clamp(36px, 8vw, 72px)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              margin: 0,
              background:
                "linear-gradient(180deg, #FFF5AE 0%, var(--gold) 55%, #A88900 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Transfer Window
          </h1>
          <p className="text-t2 mt-2 max-w-md text-sm sm:text-base">
            Sign your stack to USDC. Cross any chain. Paul scouts the best route
            across every bridge and DEX, so you just tap once.
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            <Chip>Multi-chain</Chip>
            <Chip>Best-route routing</Chip>
            <Chip kind="live">Live quotes</Chip>
          </div>
        </div>
        <div className="hidden md:block">
          <ChibiImage
            src="/assets/chibi_battle.png"
            size={200}
            glow="rgba(46,111,230,0.55)"
            priority
          />
        </div>
      </div>
    </div>
  );
}
