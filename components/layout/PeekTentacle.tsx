"use client";

import { motion, useReducedMotion } from "framer-motion";

interface PeekTentacleProps {
  onOpen?: () => void;
  disabled?: boolean;
}

/**
 * Purple tentacle that floats on the right viewport edge (desktop only).
 * Clicking or hovering triggers the bet slip drawer.
 */
export function PeekTentacle({ onOpen, disabled = false }: PeekTentacleProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Open bet slip"
      onClick={disabled ? undefined : onOpen}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) onOpen?.();
      }}
      onHoverStart={disabled ? undefined : onOpen}
      className="hidden md:block"
      style={{
        position: "fixed",
        right: 0,
        top: "50%",
        translateY: "-50%",
        width: 80,
        height: 280,
        zIndex: 35,
        cursor: disabled ? "default" : "pointer",
        pointerEvents: disabled ? "none" : "auto",
      }}
      animate={
        reduce
          ? {}
          : { y: [0, -6, 0], rotate: [0, -3, 0] }
      }
      transition={
        reduce
          ? {}
          : { duration: 3, ease: "easeInOut", repeat: Infinity }
      }
    >
      <svg
        viewBox="0 0 80 280"
        width="80"
        height="280"
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="tentGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#6B2FA8" />
            <stop offset="50%"  stopColor="#9D52D9" />
            <stop offset="100%" stopColor="#6B2FA8" />
          </linearGradient>
          <radialGradient id="suctionG" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor="#FFB5A0" />
            <stop offset="100%" stopColor="#E89070" />
          </radialGradient>
          <filter id="tentGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="1.5" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Glow blob */}
        <path
          d="M 80 80 Q 40 100 30 140 Q 20 180 50 210 Q 70 230 80 230"
          stroke="#9D52D9"
          strokeWidth="36"
          fill="none"
          strokeLinecap="round"
          opacity="0.35"
          filter="url(#tentGlow)"
        >
          {!reduce && (
            <animate
              attributeName="opacity"
              values="0.25;0.5;0.25"
              dur="2.5s"
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* Main tentacle body */}
        <path
          d="M 80 80 Q 35 110 28 150 Q 22 195 52 220 Q 72 232 80 230"
          stroke="url(#tentGrad)"
          strokeWidth="26"
          fill="none"
          strokeLinecap="round"
        />
        {/* Shadow stripe */}
        <path
          d="M 80 80 Q 35 110 28 150 Q 22 195 52 220 Q 72 232 80 230"
          stroke="#4A1D7A"
          strokeWidth="26"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Suction cups */}
        {([
          [68, 92],
          [42, 112],
          [30, 165],
          [42, 210],
        ] as [number, number][]).map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="5"
            fill="url(#suctionG)"
            opacity="0.9"
          />
        ))}

        {/* Tip ball */}
        <circle cx="80" cy="230" r="10" fill="url(#tentGrad)" />

        {/* BET label */}
        <g transform="translate(4, 132)">
          <rect
            x="-2"
            y="-12"
            width="36"
            height="24"
            rx="4"
            fill="rgba(0,0,0,0.65)"
            stroke="var(--gold)"
            strokeWidth="1"
          />
          <text
            x="16"
            y="4"
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fill="var(--gold)"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.08em"
          >
            BET
          </text>
        </g>
      </svg>
    </motion.div>
  );
}
