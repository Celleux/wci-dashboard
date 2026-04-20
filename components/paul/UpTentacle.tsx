"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SoccerBall } from "./SoccerBall";

interface Point {
  x: number;
  y: number;
}

interface UpTentacleProps {
  anchor: Point;
  ball: Point & { r?: number };
  side: "left" | "right";
  /** 0..1  — modulates bend amplitude driven by Framer Motion externally */
  flex?: number;
  spin?: number;
  holdsBall?: boolean;
  swayDelay?: number;
}

/**
 * Upward-curling tentacle that holds a soccer ball at its tip.
 * Builds a tapered cubic-bezier ribbon with suction cups on the inner face,
 * then animates the whole group with a gentle float.
 */
export function UpTentacle({
  anchor,
  ball,
  side,
  flex = 0,
  spin = 0,
  holdsBall = true,
  swayDelay = 0,
}: UpTentacleProps) {
  const prefersReduced = useReducedMotion();
  const outSign = side === "left" ? -1 : 1;

  // Cubic bezier control points — S-curve out sideways then up to ball
  const c1x = anchor.x + outSign * (60 + flex * 15);
  const c1y = anchor.y - 10;
  const c2x = ball.x - outSign * 30;
  const c2y = ball.y + 35;

  const SAMPLES = 36;
  const topPts: [number, number][] = [];
  const botPts: [number, number][] = [];
  const cupPts: { x: number; y: number; size: number }[] = [];

  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    const mt = 1 - t;
    // Cubic bezier position
    const px =
      mt * mt * mt * anchor.x +
      3 * mt * mt * t * c1x +
      3 * mt * t * t * c2x +
      t * t * t * ball.x;
    const py =
      mt * mt * mt * anchor.y +
      3 * mt * mt * t * c1y +
      3 * mt * t * t * c2y +
      t * t * t * ball.y;
    // Tangent
    const tx =
      3 * mt * mt * (c1x - anchor.x) +
      6 * mt * t * (c2x - c1x) +
      3 * t * t * (ball.x - c2x);
    const ty =
      3 * mt * mt * (c1y - anchor.y) +
      6 * mt * t * (c2y - c1y) +
      3 * t * t * (ball.y - c2y);
    const len = Math.hypot(tx, ty) || 1;
    const nx = -ty / len;
    const ny = tx / len;
    // Taper: thick at base, thinner at tip
    const thick = 26 * (1 - t) * 0.7 + 14 * t + 6;
    topPts.push([px + nx * thick, py + ny * thick]);
    botPts.push([px - nx * thick, py - ny * thick]);
    // Suction cups on inner face
    if (i > 2 && i < SAMPLES - 2 && i % 4 === 0) {
      const innerSign = side === "left" ? 1 : -1;
      const cupx = px + nx * thick * innerSign * 0.55;
      const cupy = py + ny * thick * innerSign * 0.55;
      cupPts.push({ x: cupx, y: cupy, size: thick * 0.35 + 1 });
    }
  }

  const ribbonPath =
    `M ${topPts[0][0]} ${topPts[0][1]} ` +
    topPts
      .slice(1)
      .map((p) => `L ${p[0]} ${p[1]}`)
      .join(" ") +
    ` L ${botPts[botPts.length - 1][0]} ${botPts[botPts.length - 1][1]} ` +
    botPts
      .slice(0, -1)
      .reverse()
      .map((p) => `L ${p[0]} ${p[1]}`)
      .join(" ") +
    " Z";

  return (
    <motion.g
      animate={
        prefersReduced
          ? {}
          : {
              y: [0, -6, 0, 4, 0],
              rotate: [0, outSign * 1.2, 0, outSign * -0.8, 0],
            }
      }
      transition={
        prefersReduced
          ? {}
          : {
              duration: 4.8,
              delay: swayDelay,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
      style={{ transformOrigin: `${anchor.x}px ${anchor.y}px` }}
    >
      {/* Ribbon body */}
      <path
        d={ribbonPath}
        fill="url(#tentGrad)"
        stroke="#2A0F4A"
        strokeWidth={3}
        strokeLinejoin="round"
      />
      {/* Shine overlay */}
      <path d={ribbonPath} fill="url(#tentShine)" opacity={0.45} />
      {/* Suction cups */}
      {cupPts.map((c, i) => (
        <circle
          key={i}
          cx={c.x}
          cy={c.y}
          r={c.size * 0.55}
          fill="#FFB38A"
          stroke="#5a1a3a"
          strokeWidth={1.3}
          opacity={0.95}
        />
      ))}
      {/* Soccer ball at tip */}
      {holdsBall && (
        <SoccerBall
          r={ball.r ?? 30}
          x={ball.x}
          y={ball.y}
          spin={spin}
          animateSpin
        />
      )}
    </motion.g>
  );
}
