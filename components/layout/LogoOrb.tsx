"use client";

import { motion, useReducedMotion } from "framer-motion";

interface LogoOrbProps {
  size?: number;
}

export function LogoOrb({ size = 120 }: LogoOrbProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-label="World Cup Inu logo"
      style={{
        position: "relative",
        width: size,
        height: size,
        filter:
          "drop-shadow(0 12px 28px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(245,208,32,0.4))",
      }}
      animate={reduce ? {} : { y: [0, -4, 0] }}
      transition={
        reduce ? {} : { duration: 4, ease: "easeInOut", repeat: Infinity }
      }
    >
      {/* Outer rainbow halo — blurred conic */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: -10,
          borderRadius: "50%",
          background:
            "conic-gradient(from 0deg, var(--fifa-red), var(--fifa-orange), var(--fifa-yellow), var(--fifa-lime), var(--fifa-teal), var(--fifa-blue), var(--fifa-purple), var(--fifa-magenta), var(--fifa-red))",
          filter: "blur(14px)",
          opacity: 0.75,
        }}
        animate={reduce ? {} : { rotate: 360 }}
        transition={
          reduce
            ? {}
            : { duration: 12, ease: "linear", repeat: Infinity }
        }
      />

      {/* Conic ring border — spins in reverse */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "conic-gradient(from 180deg, var(--fifa-yellow), var(--fifa-red), var(--fifa-purple), var(--fifa-teal), var(--fifa-yellow))",
          padding: 4,
        }}
        animate={reduce ? {} : { rotate: -360 }}
        transition={
          reduce
            ? {}
            : { duration: 10, ease: "linear", repeat: Infinity }
        }
      >
        {/* Inner gold ring */}
        <div
          aria-hidden
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "linear-gradient(180deg, #F5D020 0%, #B8860B 100%)",
            padding: 3,
            boxShadow:
              "inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.3)",
          }}
        >
          {/* Dark hub */}
          <motion.div
            aria-hidden
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 25%, #2a1f50 0%, #0A0615 80%)",
              boxShadow:
                "inset 0 4px 8px rgba(255,255,255,0.15), inset 0 -6px 12px rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
            animate={
              reduce
                ? {}
                : {
                    filter: [
                      "drop-shadow(0 0 20px var(--gold)) drop-shadow(0 0 40px var(--fifa-red))",
                      "drop-shadow(0 0 30px var(--fifa-yellow)) drop-shadow(0 0 50px var(--fifa-magenta))",
                      "drop-shadow(0 0 20px var(--gold)) drop-shadow(0 0 40px var(--fifa-red))",
                    ],
                  }
            }
            transition={
              reduce
                ? {}
                : { duration: 3, ease: "easeInOut", repeat: Infinity }
            }
          >
            {/* Specular highlight */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: 6,
                left: 14,
                width: "45%",
                height: "30%",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse, rgba(255,255,255,0.45), transparent)",
                pointerEvents: "none",
              }}
            />
            {/* WCI text mark — replace with next/image once asset exists */}
            <span
              className="display"
              style={{
                fontSize: size * 0.2,
                color: "var(--gold)",
                letterSpacing: "-0.04em",
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                position: "relative",
                zIndex: 1,
                lineHeight: 1,
              }}
            >
              WCI
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
