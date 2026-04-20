"use client";

import {
  motion,
  useReducedMotion,
  useInView,
  useAnimationFrame,
} from "framer-motion";
import { useRef, useState } from "react";
import { UpTentacle } from "./UpTentacle";
import { BaseTentacle } from "./BaseTentacle";

export type PaulMood = "idle" | "wink" | "focus" | "happy";

interface PaulStudioProps {
  /** Overall size in px (220–520). Height scales with viewBox ratio. */
  size?: number;
  mood?: PaulMood;
  /** Normalised cursor position (-1..1, -1..1) for pupil look-at. */
  lookAt?: { x: number; y: number };
}

/** Full 8-tentacle Paul rig with Framer Motion breath + sway. */
export function PaulStudio({
  size = 460,
  mood = "idle",
  lookAt = { x: 0, y: 0 },
}: PaulStudioProps) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [time, setTime] = useState(0);

  // Tick time only when visible and not reduced-motion
  useAnimationFrame((t) => {
    if (isInView && !prefersReduced) {
      setTime(t / 1000);
    }
  });

  const pupilDx = Math.max(-4, Math.min(4, lookAt.x * 4));
  const pupilDy = Math.max(-3, Math.min(3, lookAt.y * 3));

  // Body center
  const bx = 260;
  const by = 240;

  // 5 up-tentacle ball configs — arc above head
  const ballConfigs = [
    { angle: -130, dist: 210, phase: 0.0 },
    { angle: -100, dist: 200, phase: 0.7 },
    { angle: -90, dist: 230, phase: 1.4 },
    { angle: -80, dist: 200, phase: 2.1 },
    { angle: -50, dist: 210, phase: 2.8 },
  ];

  const balls = ballConfigs.map((b, i) => {
    const rad = (b.angle * Math.PI) / 180;
    const bob = prefersReduced ? 0 : Math.sin(time * 1.3 + b.phase) * 8;
    return {
      x: bx + Math.cos(rad) * b.dist,
      y: by + Math.sin(rad) * b.dist + bob,
      spin: prefersReduced ? 0 : (time * (i % 2 === 0 ? 60 : -50) + i * 30),
      flex: prefersReduced ? 0 : Math.sin(time * 1.1 + b.phase),
      side: (i < 2 ? "left" : "right") as "left" | "right",
      r: i === 2 ? 40 : 34,
    };
  });

  // Up-tentacle anchors spread across top half of body perimeter
  const upAnchors = [
    { x: bx - 110, y: by - 40 },
    { x: bx - 70, y: by - 90 },
    { x: bx, y: by - 110 },
    { x: bx + 70, y: by - 90 },
    { x: bx + 110, y: by - 40 },
  ];

  // 3 bottom tentacle paths (meditation pose)
  const basePaths = [
    `M ${bx - 90} ${by + 95}
     C ${bx - 150} ${by + 140}, ${bx - 160} ${by + 200}, ${bx - 80} ${by + 220}
     C ${bx - 40} ${by + 230}, ${bx - 10} ${by + 225}, ${bx + 5} ${by + 215}
     C ${bx - 20} ${by + 205}, ${bx - 50} ${by + 195}, ${bx - 70} ${by + 180}
     C ${bx - 110} ${by + 160}, ${bx - 115} ${by + 125}, ${bx - 90} ${by + 95} Z`,
    `M ${bx + 90} ${by + 95}
     C ${bx + 150} ${by + 140}, ${bx + 160} ${by + 200}, ${bx + 80} ${by + 220}
     C ${bx + 40} ${by + 230}, ${bx + 10} ${by + 225}, ${bx - 5} ${by + 215}
     C ${bx + 20} ${by + 205}, ${bx + 50} ${by + 195}, ${bx + 70} ${by + 180}
     C ${bx + 110} ${by + 160}, ${bx + 115} ${by + 125}, ${bx + 90} ${by + 95} Z`,
    `M ${bx - 40} ${by + 105}
     C ${bx - 20} ${by + 180}, ${bx + 20} ${by + 190}, ${bx + 50} ${by + 160}
     C ${bx + 30} ${by + 170}, ${bx + 5} ${by + 175}, ${bx - 5} ${by + 170}
     C ${bx - 30} ${by + 160}, ${bx - 35} ${by + 140}, ${bx - 40} ${by + 105} Z`,
  ];

  // Bottom suction cups
  const bottomCups = [
    { x: bx - 110, y: by + 180 },
    { x: bx - 70, y: by + 210 },
    { x: bx - 30, y: by + 218 },
    { x: bx + 110, y: by + 180 },
    { x: bx + 70, y: by + 210 },
    { x: bx + 30, y: by + 218 },
  ];

  const height = (size * 560) / 520;

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 520 560"
      width={size}
      height={height}
      style={{ overflow: "visible" }}
      aria-label="Paul the Oracle octopus character"
      role="img"
    >
      <defs>
        <radialGradient id="bodyGrad" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#D8A8FF" />
          <stop offset="35%" stopColor="#A066E0" />
          <stop offset="70%" stopColor="#7A3FBF" />
          <stop offset="100%" stopColor="#4A1F7A" />
        </radialGradient>
        <radialGradient id="bellyGrad" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#FFD6FF" stopOpacity={0.7} />
          <stop offset="100%" stopColor="#8C4FC8" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="cheekGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF8FCC" stopOpacity={0.65} />
          <stop offset="100%" stopColor="#FF8FCC" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="rimGrad" cx="75%" cy="18%" r="45%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.7} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </radialGradient>
        <linearGradient id="tentGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B078E8" />
          <stop offset="55%" stopColor="#7A3FBF" />
          <stop offset="100%" stopColor="#3E1A6B" />
        </linearGradient>
        <radialGradient id="tentShine" cx="35%" cy="25%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.45} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </radialGradient>
        <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={5} />
          <feOffset dx={0} dy={8} />
          <feComponentTransfer>
            <feFuncA type="linear" slope={0.55} />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse
        cx={bx}
        cy={by + 260}
        rx={170}
        ry={18}
        fill="#000"
        opacity={0.4}
      />

      {/* Sparkles */}
      {[
        { x: 80, y: 120, c: "#FFE89A", s: 6 },
        { x: 450, y: 100, c: "#FFE89A", s: 5 },
        { x: 60, y: 280, c: "#D8A8FF", s: 4 },
        { x: 480, y: 280, c: "#D8A8FF", s: 4 },
        { x: 130, y: 50, c: "#FFFFFF", s: 3 },
        { x: 400, y: 60, c: "#FFFFFF", s: 3 },
      ].map((sp, i) => (
        <motion.g
          key={i}
          style={{ x: sp.x, y: sp.y, transformOrigin: `${sp.x}px ${sp.y}px` }}
          animate={
            prefersReduced
              ? {}
              : {
                  rotate: [0, 360],
                  opacity: [0.4, 0.9, 0.4],
                }
          }
          transition={
            prefersReduced
              ? {}
              : {
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.3,
                }
          }
        >
          <path
            d={`M 0 -${sp.s} L ${sp.s * 0.3} -${sp.s * 0.3} L ${sp.s} 0 L ${sp.s * 0.3} ${sp.s * 0.3} L 0 ${sp.s} L -${sp.s * 0.3} ${sp.s * 0.3} L -${sp.s} 0 L -${sp.s * 0.3} -${sp.s * 0.3} Z`}
            fill={sp.c}
          />
        </motion.g>
      ))}

      {/* Up-tentacles behind body (odd indices) */}
      <g filter="url(#softShadow)">
        {upAnchors.map(
          (a, i) =>
            i % 2 === 1 && (
              <UpTentacle
                key={`upb${i}`}
                anchor={a}
                ball={balls[i]}
                side={balls[i].side}
                flex={balls[i].flex}
                spin={balls[i].spin}
                swayDelay={i * 0.4}
              />
            ),
        )}
      </g>

      {/* Body with breathing scale */}
      <motion.g
        style={{ transformOrigin: `${bx}px ${by}px` }}
        animate={prefersReduced ? {} : { scale: [1, 1.015, 1] }}
        transition={
          prefersReduced
            ? {}
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <ellipse
          cx={bx}
          cy={by}
          rx={130}
          ry={120}
          fill="url(#bodyGrad)"
          stroke="#2A0F4A"
          strokeWidth={3.5}
        />
        <ellipse
          cx={bx}
          cy={by + 25}
          rx={95}
          ry={75}
          fill="url(#bellyGrad)"
        />
        <ellipse cx={bx} cy={by} rx={130} ry={120} fill="url(#rimGrad)" />
        {/* Mantle spots */}
        <circle cx={bx - 60} cy={by - 70} r={11} fill="#3E1A6B" opacity={0.45} />
        <circle cx={bx - 30} cy={by - 95} r={7} fill="#3E1A6B" opacity={0.45} />
        <circle cx={bx + 50} cy={by - 80} r={9} fill="#3E1A6B" opacity={0.45} />
        <circle cx={bx + 75} cy={by - 45} r={6} fill="#3E1A6B" opacity={0.4} />
      </motion.g>

      {/* Cheeks */}
      <ellipse
        cx={bx - 70}
        cy={by + 30}
        rx={24}
        ry={13}
        fill="url(#cheekGrad)"
      />
      <ellipse
        cx={bx + 70}
        cy={by + 30}
        rx={24}
        ry={13}
        fill="url(#cheekGrad)"
      />

      {/* Eyes */}
      {/* Left eye */}
      <ellipse cx={bx - 42} cy={by - 5} rx={13} ry={17} fill="#0A0512" />
      <circle
        cx={bx - 39 + pupilDx * 0.3}
        cy={by - 10 + pupilDy * 0.3}
        r={4.5}
        fill="#FFFFFF"
      />
      {/* Right eye — wink by default (idle), open when focus/happy */}
      {mood === "idle" || mood === "wink" ? (
        <path
          d={`M ${bx + 28} ${by - 5} Q ${bx + 42} ${by - 16} ${bx + 58} ${by - 5}`}
          stroke="#0A0512"
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <>
          <ellipse cx={bx + 42} cy={by - 5} rx={13} ry={17} fill="#0A0512" />
          <circle
            cx={bx + 45 + pupilDx * 0.3}
            cy={by - 10 + pupilDy * 0.3}
            r={4.5}
            fill="#FFFFFF"
          />
        </>
      )}

      {/* Mouth */}
      <path
        d={`M ${bx - 12} ${by + 35} Q ${bx} ${by + 45} ${bx + 12} ${by + 35}`}
        stroke="#2A0F4A"
        strokeWidth={3.5}
        strokeLinecap="round"
        fill="none"
      />

      {/* Bottom seated tentacles */}
      <g filter="url(#softShadow)">
        {basePaths.map((p, i) => (
          <BaseTentacle key={`base${i}`} path={p} swayDelay={i * 0.6} />
        ))}
        {/* Suction cup dots along bottom tentacles */}
        {bottomCups.map((c, i) => (
          <circle
            key={`bcup${i}`}
            cx={c.x}
            cy={c.y}
            r={4}
            fill="#FFB38A"
            stroke="#5a1a3a"
            strokeWidth={1.2}
            opacity={0.9}
          />
        ))}
      </g>

      {/* Up-tentacles in front of body (even indices) */}
      <g filter="url(#softShadow)">
        {upAnchors.map(
          (a, i) =>
            i % 2 === 0 && (
              <UpTentacle
                key={`upf${i}`}
                anchor={a}
                ball={balls[i]}
                side={balls[i].side}
                flex={balls[i].flex}
                spin={balls[i].spin}
                swayDelay={i * 0.35}
              />
            ),
        )}
      </g>
    </svg>
  );
}
