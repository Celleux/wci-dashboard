"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MobileDrawer } from "./MobileDrawer";

/** 56px compact header for mobile. Logo orb on the left, claim pill center,
 *  menu on the right. Safe-area-top aware. iOS-style glass + rainbow hairline. */
export function MobileHeader() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        aria-label="Header"
        style={{
          position: "relative",
          height: `calc(56px + var(--sa-top, 0px))`,
          paddingTop: "var(--sa-top, 0px)",
          paddingLeft: "var(--sa-left, 0px)",
          paddingRight: "var(--sa-right, 0px)",
          background:
            "linear-gradient(180deg, rgba(18,12,38,0.92) 0%, rgba(10,6,21,0.95) 100%)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          borderBottom: "1px solid var(--hair-strong)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 2px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.5), 0 6px 14px -6px rgba(0,0,0,0.7), 0 18px 32px -14px rgba(0,0,0,0.5)",
        }}
      >
        {/* top sheen highlight */}
        <span aria-hidden className="header-sheen" />

        {/* rainbow hairline */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(245,208,32,0.5) 25%, rgba(0,185,178,0.5) 50%, rgba(230,55,168,0.5) 75%, transparent)",
          }}
        />

        <div
          style={{
            height: 56,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 12px",
          }}
        >
          {/* Logo orb (mini, spinning rainbow ring) */}
          <Link
            href="/"
            aria-label="World Cup Inu home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <motion.div
              aria-hidden
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                padding: 2,
                background:
                  "conic-gradient(from 0deg, var(--fifa-red), var(--fifa-yellow), var(--fifa-teal), var(--fifa-purple), var(--fifa-red))",
                filter: "drop-shadow(0 2px 6px rgba(245,208,32,0.45))",
              }}
              animate={reduce ? {} : { rotate: 360 }}
              transition={
                reduce ? {} : { duration: 16, ease: "linear", repeat: Infinity }
              }
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "var(--bg-deep)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.5)",
                }}
              >
                <Image
                  src="/assets/logo.png"
                  alt=""
                  width={38}
                  height={38}
                  priority
                  style={{ objectFit: "cover" }}
                />
              </div>
            </motion.div>
            <span
              className="display"
              style={{
                fontSize: 14,
                letterSpacing: "-0.01em",
                background: "linear-gradient(180deg, #fff, #C9C0E8 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                whiteSpace: "nowrap",
              }}
            >
              WORLD CUP INU
            </span>
          </Link>

          <div style={{ flex: 1 }} />

          {/* Claim pill (compact) */}
          <button
            type="button"
            aria-label="Claim rewards"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              height: 34,
              padding: "0 10px",
              borderRadius: 999,
              background:
                "linear-gradient(180deg, #FFE85B 0%, var(--gold) 55%, var(--gold-deep) 100%)",
              border: "1px solid rgba(0,0,0,0.5)",
              color: "var(--t-inverse)",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.04em",
              cursor: "pointer",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.55), 0 2px 4px rgba(0,0,0,0.5), 0 0 10px -2px var(--gold)",
              flexShrink: 0,
            }}
          >
            $11.22
          </button>

          {/* Hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "rgba(29,23,64,0.7)",
              border: "1px solid var(--hair-strong)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              cursor: "pointer",
              flexShrink: 0,
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 4px rgba(0,0,0,0.5)",
              touchAction: "manipulation",
            }}
          >
            <span style={{ width: 16, height: 1.5, background: "var(--t2)", borderRadius: 2 }} />
            <span style={{ width: 12, height: 1.5, background: "var(--t2)", borderRadius: 2 }} />
            <span style={{ width: 16, height: 1.5, background: "var(--t2)", borderRadius: 2 }} />
          </button>
        </div>
      </header>

      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
