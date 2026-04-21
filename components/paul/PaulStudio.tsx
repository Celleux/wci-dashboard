"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * PaulStudio — full SVG-animated Paul the Octopus rig.
 * Ported from the prototype's paul.jsx. 5 up-tentacles each holding a
 * spinning soccer ball, 3 base tentacles in a meditation pose, breathing body,
 * periodic wink, cursor look-at tracking, floating sparkles.
 */

export type PaulMood = "idle" | "focus" | "wink";

interface PaulStudioProps {
  size?: number;
  mood?: PaulMood;
  lookAt?: { x: number; y: number };
}

const BALL_CFG = [
  { angle: -130, dist: 210, phase: 0.0 },
  { angle: -100, dist: 200, phase: 0.7 },
  { angle:  -90, dist: 230, phase: 1.4 },
  { angle:  -80, dist: 200, phase: 2.1 },
  { angle:  -50, dist: 210, phase: 2.8 },
];

const UP_ANCHORS = [
  { x: 150, y: 200 },
  { x: 190, y: 150 },
  { x: 260, y: 130 },
  { x: 330, y: 150 },
  { x: 370, y: 200 },
];

function pentPts(cx: number, cy: number, r: number, rot = 0) {
  const out: string[] = [];
  for (let i = 0; i < 5; i++) {
    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2 + rot;
    out.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`);
  }
  return out.join(" ");
}

function SoccerBall({
  r = 26, x = 0, y = 0, spin = 0,
}: { r?: number; x?: number; y?: number; spin?: number }) {
  const outerPatches: { cx: number; cy: number; a: number }[] = [];
  for (let i = 0; i < 5; i++) {
    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2 + Math.PI / 5;
    outerPatches.push({ cx: Math.cos(a) * r * 0.78, cy: Math.sin(a) * r * 0.78, a });
  }
  return (
    <g transform={`translate(${x},${y}) rotate(${spin})`}>
      <circle cx={0} cy={0} r={r} fill="#ffffff" stroke="#0a0512" strokeWidth={2.5} />
      <polygon points={pentPts(0, 0, r * 0.33)} fill="#0a0512" />
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
      {outerPatches.map((p, i) => (
        <polygon
          key={`p${i}`}
          points={pentPts(p.cx, p.cy, r * 0.22, p.a + Math.PI / 2)}
          fill="#0a0512"
          transform={`rotate(${(p.a * 180) / Math.PI + 90} ${p.cx} ${p.cy})`}
        />
      ))}
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
  );
}

function UpTentacle({
  anchor, ballX, ballY, ballR, side, spin, flex,
}: {
  anchor: { x: number; y: number };
  ballX: number;
  ballY: number;
  ballR: number;
  side: "left" | "right";
  spin: number;
  flex: number;
}) {
  const outSign = side === "left" ? -1 : 1;
  const c1x = anchor.x + outSign * (60 + flex * 15);
  const c1y = anchor.y - 10;
  const c2x = ballX - outSign * 30;
  const c2y = ballY + 35;

  const samples = 36;
  const topPts: [number, number][] = [];
  const botPts: [number, number][] = [];
  const cupPts: { x: number; y: number; size: number }[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const mt = 1 - t;
    const px = mt*mt*mt * anchor.x + 3*mt*mt*t*c1x + 3*mt*t*t*c2x + t*t*t*ballX;
    const py = mt*mt*mt * anchor.y + 3*mt*mt*t*c1y + 3*mt*t*t*c2y + t*t*t*ballY;
    const tx = 3*mt*mt*(c1x - anchor.x) + 6*mt*t*(c2x - c1x) + 3*t*t*(ballX - c2x);
    const ty = 3*mt*mt*(c1y - anchor.y) + 6*mt*t*(c2y - c1y) + 3*t*t*(ballY - c2y);
    const len = Math.hypot(tx, ty) || 1;
    const nx = -ty / len;
    const ny =  tx / len;
    const thick = 26 * (1 - t) * 0.7 + 14 * t + 6;
    topPts.push([px + nx * thick, py + ny * thick]);
    botPts.push([px - nx * thick, py - ny * thick]);
    if (i > 2 && i < samples - 2 && i % 4 === 0) {
      const innerSign = side === "left" ? 1 : -1;
      cupPts.push({
        x: px + nx * thick * innerSign * 0.55,
        y: py + ny * thick * innerSign * 0.55,
        size: thick * 0.35 + 1,
      });
    }
  }
  const ribbon =
    `M ${topPts[0][0]} ${topPts[0][1]} ` +
    topPts.slice(1).map((p) => `L ${p[0]} ${p[1]}`).join(" ") +
    ` L ${botPts[botPts.length - 1][0]} ${botPts[botPts.length - 1][1]} ` +
    botPts.slice(0, -1).reverse().map((p) => `L ${p[0]} ${p[1]}`).join(" ") +
    " Z";

  return (
    <g>
      <path d={ribbon} fill="url(#tentGrad)" stroke="#2A0F4A" strokeWidth={3} strokeLinejoin="round" />
      <path d={ribbon} fill="url(#tentShine)" opacity={0.45} />
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
      <SoccerBall r={ballR} x={ballX} y={ballY} spin={spin} />
    </g>
  );
}

function BaseTentaclePath({ d }: { d: string }) {
  return (
    <g>
      <path d={d} fill="url(#tentGrad)" stroke="#2A0F4A" strokeWidth={3} strokeLinejoin="round" />
      <path d={d} fill="url(#tentShine)" opacity={0.4} />
    </g>
  );
}

export function PaulStudio({
  size = 460,
  mood = "idle",
  lookAt = { x: 0, y: 0 },
}: PaulStudioProps) {
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    const loop = (now: number) => {
      setT((now - start) / 1000);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [reduce]);

  const bx = 260;
  const by = 260;
  const breath = 1 + Math.sin(t * 1.2) * 0.015;

  const balls = BALL_CFG.map((b, i) => {
    const rad = (b.angle * Math.PI) / 180;
    const bob = Math.sin(t * 1.3 + b.phase) * 8;
    return {
      x: bx + Math.cos(rad) * b.dist,
      y: by + Math.sin(rad) * b.dist + bob,
      spin: t * (i % 2 === 0 ? 60 : -50) + i * 30,
      flex: Math.sin(t * 1.1 + b.phase),
      side: (i < 2 ? "left" : "right") as "left" | "right",
      r: i === 2 ? 38 : 32,
    };
  });

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

  const pupilDx = Math.max(-4, Math.min(4, lookAt.x * 4));
  const pupilDy = Math.max(-3, Math.min(3, lookAt.y * 3));

  const sparkles = [
    { x: 80,  y: 120, c: "#FFE89A", s: 6 },
    { x: 450, y: 100, c: "#FFE89A", s: 5 },
    { x: 60,  y: 320, c: "#D8A8FF", s: 4 },
    { x: 480, y: 320, c: "#D8A8FF", s: 4 },
    { x: 130, y: 70,  c: "#FFFFFF", s: 3 },
    { x: 400, y: 80,  c: "#FFFFFF", s: 3 },
  ];

  return (
    <svg
      viewBox="0 0 520 620"
      width={size}
      height={(size * 620) / 520}
      style={{ overflow: "visible" }}
      aria-hidden
    >
      <defs>
        <radialGradient id="bodyGrad" cx="38%" cy="32%" r="75%">
          <stop offset="0%"   stopColor="#D8A8FF" />
          <stop offset="35%"  stopColor="#A066E0" />
          <stop offset="70%"  stopColor="#7A3FBF" />
          <stop offset="100%" stopColor="#4A1F7A" />
        </radialGradient>
        <radialGradient id="bellyGrad" cx="50%" cy="60%" r="50%">
          <stop offset="0%"   stopColor="#FFD6FF" stopOpacity={0.7} />
          <stop offset="100%" stopColor="#8C4FC8" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="cheekGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FF8FCC" stopOpacity={0.65} />
          <stop offset="100%" stopColor="#FF8FCC" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="rim" cx="75%" cy="18%" r="45%">
          <stop offset="0%"   stopColor="#FFFFFF" stopOpacity={0.7} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </radialGradient>
        <linearGradient id="tentGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#B078E8" />
          <stop offset="55%"  stopColor="#7A3FBF" />
          <stop offset="100%" stopColor="#3E1A6B" />
        </linearGradient>
        <radialGradient id="tentShine" cx="35%" cy="25%" r="55%">
          <stop offset="0%"   stopColor="#FFFFFF" stopOpacity={0.45} />
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

      <ellipse cx={bx} cy={by + 280} rx={170} ry={18} fill="#000" opacity={0.4} />

      <g>
        {sparkles.map((s, i) => {
          const rot = t * 20 + i * 30;
          const opacity = 0.6 + Math.sin(t * 2 + i) * 0.35;
          return (
            <g key={i} transform={`translate(${s.x},${s.y}) rotate(${rot})`} opacity={opacity}>
              <path
                d={`M 0 -${s.s} L ${s.s * 0.3} -${s.s * 0.3} L ${s.s} 0 L ${s.s * 0.3} ${s.s * 0.3} L 0 ${s.s} L -${s.s * 0.3} ${s.s * 0.3} L -${s.s} 0 L -${s.s * 0.3} -${s.s * 0.3} Z`}
                fill={s.c}
              />
            </g>
          );
        })}
      </g>

      <g filter="url(#softShadow)">
        {UP_ANCHORS.map((a, i) =>
          i % 2 === 1 ? (
            <UpTentacle
              key={`upb${i}`}
              anchor={a}
              ballX={balls[i].x}
              ballY={balls[i].y}
              ballR={balls[i].r}
              side={balls[i].side}
              spin={balls[i].spin}
              flex={balls[i].flex}
            />
          ) : null
        )}
      </g>

      <g style={{ transformOrigin: `${bx}px ${by}px`, transform: `scale(${breath})` }}>
        <ellipse cx={bx} cy={by} rx={130} ry={120} fill="url(#bodyGrad)" stroke="#2A0F4A" strokeWidth={3.5} />
        <ellipse cx={bx} cy={by + 25} rx={95} ry={75} fill="url(#bellyGrad)" />
        <ellipse cx={bx} cy={by} rx={130} ry={120} fill="url(#rim)" />
        <circle cx={bx - 60} cy={by - 70} r={11} fill="#3E1A6B" opacity={0.45} />
        <circle cx={bx - 30} cy={by - 95} r={7}  fill="#3E1A6B" opacity={0.45} />
        <circle cx={bx + 50} cy={by - 80} r={9}  fill="#3E1A6B" opacity={0.45} />
        <circle cx={bx + 75} cy={by - 45} r={6}  fill="#3E1A6B" opacity={0.4} />
      </g>

      <ellipse cx={bx - 70} cy={by + 30} rx={24} ry={13} fill="url(#cheekGrad)" />
      <ellipse cx={bx + 70} cy={by + 30} rx={24} ry={13} fill="url(#cheekGrad)" />

      <g>
        <ellipse cx={bx - 42} cy={by - 5} rx={13} ry={17} fill="#0A0512" />
        <circle cx={bx - 39 + pupilDx * 0.3} cy={by - 10 + pupilDy * 0.3} r={4.5} fill="#FFFFFF" />

        {mood === "focus" ? (
          <>
            <ellipse cx={bx + 42} cy={by - 5} rx={13} ry={17} fill="#0A0512" />
            <circle cx={bx + 45 + pupilDx * 0.3} cy={by - 10 + pupilDy * 0.3} r={4.5} fill="#FFFFFF" />
          </>
        ) : (
          <path
            d={`M ${bx + 28} ${by - 5} Q ${bx + 42} ${by - 16} ${bx + 58} ${by - 5}`}
            stroke="#0A0512"
            strokeWidth={5}
            strokeLinecap="round"
            fill="none"
          />
        )}
      </g>

      <path
        d={`M ${bx - 12} ${by + 35} Q ${bx} ${by + 45} ${bx + 12} ${by + 35}`}
        stroke="#2A0F4A"
        strokeWidth={3.5}
        strokeLinecap="round"
        fill="none"
      />

      <g filter="url(#softShadow)">
        {basePaths.map((d, i) => (
          <BaseTentaclePath key={`base${i}`} d={d} />
        ))}
        {[
          { x: bx - 110, y: by + 180 },
          { x: bx - 70,  y: by + 210 },
          { x: bx - 30,  y: by + 218 },
          { x: bx + 110, y: by + 180 },
          { x: bx + 70,  y: by + 210 },
          { x: bx + 30,  y: by + 218 },
        ].map((c, i) => (
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

      <g filter="url(#softShadow)">
        {UP_ANCHORS.map((a, i) =>
          i % 2 === 0 ? (
            <UpTentacle
              key={`upf${i}`}
              anchor={a}
              ballX={balls[i].x}
              ballY={balls[i].y}
              ballR={balls[i].r}
              side={balls[i].side}
              spin={balls[i].spin}
              flex={balls[i].flex}
            />
          ) : null
        )}
      </g>
    </svg>
  );
}
