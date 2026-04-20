"use client";

import {
  motion,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { PaulStudio, PaulMood } from "./PaulStudio";

interface PaulHeroProps {
  /** Display size passed through to PaulStudio (220–520). */
  size?: number;
  /** When true Paul switches to `focus` mood (both eyes open). */
  reaching?: boolean;
}

/**
 * Wrapper that adds:
 *  - Cursor look-at tracking
 *  - Periodic wink-to-focus eye blink
 *  - Hover scale + drop-shadow
 *  - Click squish
 *  - Pause when off-screen (via useInView)
 */
export function PaulHero({ size = 460, reaching = false }: PaulHeroProps) {
  const prefersReduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { amount: 0.15 });

  const [mood, setMood] = useState<PaulMood>("idle");
  const [lookAt, setLookAt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Cursor look-at
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!wrapperRef.current || !isInView) return;
      const r = wrapperRef.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      setLookAt({
        x: Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2))),
        y: Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2))),
      });
    },
    [isInView],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Periodic wink cycle (idle → focus blink → back to idle)
  useEffect(() => {
    if (prefersReduced || !isInView || reaching) return;
    let t: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setMood("focus");
      setTimeout(() => setMood("idle"), 450);
      t = setTimeout(cycle, 4000 + Math.random() * 2500);
    };
    t = setTimeout(cycle, 2500);
    return () => clearTimeout(t);
  }, [prefersReduced, isInView, reaching]);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 400);
  };

  const currentMood: PaulMood = reaching ? "focus" : mood;

  return (
    <motion.div
      ref={wrapperRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      animate={
        prefersReduced
          ? {}
          : {
              scale: clicked ? 0.94 : hovered ? 1.035 : 1,
              y: clicked ? 4 : 0,
              filter: hovered
                ? "drop-shadow(0 20px 40px rgba(168,85,247,0.4))"
                : "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
            }
      }
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transformOrigin: "center bottom",
        cursor: "pointer",
      }}
      aria-label="Paul the Oracle — click to interact"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      <PaulStudio size={size} mood={currentMood} lookAt={lookAt} />
    </motion.div>
  );
}
