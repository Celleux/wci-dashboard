"use client";

import { motion, useReducedMotion } from "framer-motion";

interface BaseTentacleProps {
  path: string;
  /** Gentle sway delay so each tentacle is offset. */
  swayDelay?: number;
  swayAmplitude?: number; // degrees
}

/**
 * Downward meditation-pose tentacle.
 * Uses a pre-built SVG path string (closed) so the caller can define the exact
 * shape. Renders with the tentacle gradient + an overlay shine pass, plus a
 * slow Framer Motion sway when not reduced-motion.
 */
export function BaseTentacle({
  path,
  swayDelay = 0,
  swayAmplitude = 1.5,
}: BaseTentacleProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.g
      animate={
        prefersReduced
          ? {}
          : {
              rotate: [0, swayAmplitude, 0, -swayAmplitude, 0],
            }
      }
      transition={
        prefersReduced
          ? {}
          : {
              duration: 5.2,
              delay: swayDelay,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
      style={{ transformOrigin: "260px 340px" }}
    >
      {/* Base fill */}
      <path
        d={path}
        fill="url(#tentGrad)"
        stroke="#2A0F4A"
        strokeWidth={3}
        strokeLinejoin="round"
      />
      {/* Shine overlay */}
      <path d={path} fill="url(#tentShine)" opacity={0.4} />
    </motion.g>
  );
}
