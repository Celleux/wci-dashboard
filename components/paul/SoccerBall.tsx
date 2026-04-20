"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SoccerBallProps {
  r?: number;
  x?: number;
  y?: number;
  spin?: number; // degrees
  animateSpin?: boolean;
}

/** Five-point pentagon + surrounding hex-wedge soccer ball, all SVG. */
export function SoccerBall({
  r = 26,
  x = 0,
  y = 0,
  spin = 0,
  animateSpin = false,
}: SoccerBallProps) {
  const prefersReduced = useReducedMotion();

  const pentPts = (
    cx: number,
    cy: number,
    radius: number,
    rot = 0,
  ): string => {
    const pts: string[] = [];
    for (let i = 0; i < 5; i++) {
      const a = (Math.PI * 2 * i) / 5 - Math.PI / 2 + rot;
      pts.push(
        `${cx + Math.cos(a) * radius},${cy + Math.sin(a) * radius}`,
      );
    }
    return pts.join(" ");
  };

  const outerPatches: { cx: number; cy: number; a: number }[] = [];
  for (let i = 0; i < 5; i++) {
    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2 + Math.PI / 5;
    outerPatches.push({
      cx: Math.cos(a) * r * 0.78,
      cy: Math.sin(a) * r * 0.78,
      a,
    });
  }

  const spinAnimate =
    animateSpin && !prefersReduced
      ? { rotate: [spin, spin + 360] }
      : { rotate: spin };
  const spinTransition =
    animateSpin && !prefersReduced
      ? { duration: 6, repeat: Infinity, ease: "linear" as const }
      : {};

  return (
    <motion.g
      style={{ transformOrigin: `${x}px ${y}px` }}
      animate={spinAnimate}
      transition={spinTransition}
    >
      <g transform={`translate(${x},${y})`}>
        {/* White base */}
        <circle
          cx={0}
          cy={0}
          r={r}
          fill="#ffffff"
          stroke="#0a0512"
          strokeWidth={2.5}
        />
        {/* Central black pentagon */}
        <polygon points={pentPts(0, 0, r * 0.33)} fill="#0a0512" />
        {/* Radial seam lines from pentagon to edge */}
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
          return (
            <line
              key={`r${i}`}
              x1={Math.cos(a) * r * 0.33}
              y1={Math.sin(a) * r * 0.33}
              x2={Math.cos(a) * r}
              y2={Math.sin(a) * r}
              stroke="#0a0512"
              strokeWidth={2}
              strokeLinecap="round"
            />
          );
        })}
        {/* Surrounding hex wedges */}
        {outerPatches.map((p, i) => (
          <polygon
            key={`p${i}`}
            points={pentPts(p.cx, p.cy, r * 0.22, p.a + Math.PI / 2)}
            fill="#0a0512"
            transform={`rotate(${(p.a * 180) / Math.PI + 90} ${p.cx} ${p.cy})`}
          />
        ))}
        {/* Specular shine */}
        <ellipse
          cx={-r * 0.4}
          cy={-r * 0.5}
          rx={r * 0.28}
          ry={r * 0.14}
          fill="#ffffff"
          opacity={0.95}
          transform={`rotate(-20 ${-r * 0.4} ${-r * 0.5})`}
        />
      </g>
    </motion.g>
  );
}
