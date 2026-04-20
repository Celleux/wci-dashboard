"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface LogoOrbProps {
  size?: number;
}

/**
 * Header logo orb — WCI circular logo sitting inside a spinning rainbow halo.
 *
 * Layer stack (z-order inside-out):
 *   1. Outer blurred conic halo (slow counter-spin)
 *   2. Rainbow ring border (fast spin, thicker)
 *   3. Inner dark rim
 *   4. WCI logo image (breathing scale)
 *   5. Specular highlight
 */
export function LogoOrb({ size = 140 }: LogoOrbProps) {
  const reduce = useReducedMotion();
  const ringThickness = Math.max(3, size * 0.035);

  return (
    <motion.div
      aria-label="World Cup Inu logo"
      style={{
        position: "relative",
        width: size,
        height: size,
        filter:
          "drop-shadow(0 14px 30px rgba(0,0,0,0.75)) drop-shadow(0 0 45px rgba(245,208,32,0.45))",
      }}
      animate={reduce ? {} : { y: [0, -4, 0] }}
      transition={reduce ? {} : { duration: 4, ease: "easeInOut", repeat: Infinity }}
    >
      {/* 1. Outer blurred conic halo */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: -size * 0.14,
          borderRadius: "50%",
          background:
            "conic-gradient(from 0deg, var(--fifa-red), var(--fifa-orange), var(--fifa-yellow), var(--fifa-lime), var(--fifa-teal), var(--fifa-blue), var(--fifa-purple), var(--fifa-magenta), var(--fifa-red))",
          filter: "blur(18px)",
          opacity: 0.85,
        }}
        animate={reduce ? {} : { rotate: 360 }}
        transition={reduce ? {} : { duration: 14, ease: "linear", repeat: Infinity }}
      />

      {/* 2. Thicker rainbow ring border (spins opposite direction) */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          padding: ringThickness,
          background:
            "conic-gradient(from 180deg, var(--fifa-yellow), var(--fifa-red), var(--fifa-purple), var(--fifa-teal), var(--fifa-lime), var(--fifa-yellow))",
          boxShadow:
            "0 0 0 2px rgba(0,0,0,0.6), 0 0 32px -6px rgba(245,208,32,0.6)",
        }}
        animate={reduce ? {} : { rotate: -360 }}
        transition={reduce ? {} : { duration: 10, ease: "linear", repeat: Infinity }}
      >
        {/* 3. Gold inner rim */}
        <div
          aria-hidden
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background:
              "linear-gradient(180deg, #FFE85B 0%, var(--gold) 50%, #A88900 100%)",
            padding: Math.max(2, ringThickness * 0.8),
            boxShadow:
              "inset 0 2px 4px rgba(255,255,255,0.5), inset 0 -4px 8px rgba(0,0,0,0.4)",
          }}
        >
          {/* 4. Logo container — breathing scale */}
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              background: "var(--bg-deep)",
              boxShadow:
                "inset 0 4px 12px rgba(255,255,255,0.1), inset 0 -6px 16px rgba(0,0,0,0.6)",
            }}
            animate={reduce ? {} : { scale: [1, 1.04, 1] }}
            transition={reduce ? {} : { duration: 3, ease: "easeInOut", repeat: Infinity }}
          >
            <Image
              src="/assets/logo.png"
              alt=""
              fill
              sizes={`${size}px`}
              priority
              style={{
                objectFit: "cover",
                padding: 0,
              }}
            />
            {/* 5. Specular highlight on top */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: "4%",
                left: "10%",
                width: "55%",
                height: "32%",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.38), transparent 70%)",
                pointerEvents: "none",
                mixBlendMode: "screen",
              }}
            />
            {/* Bottom rim darken */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                boxShadow: "inset 0 -12px 24px -8px rgba(0,0,0,0.6)",
                pointerEvents: "none",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
