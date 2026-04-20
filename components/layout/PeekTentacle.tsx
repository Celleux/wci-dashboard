"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useBetSlip } from "@/lib/store/betSlipStore";

/**
 * Right-edge tentacle. Hover or click opens the bet slip.
 * If no pick is active, it still opens the drawer (so the user can see the
 * empty-slip state).
 */
export function PeekTentacle() {
  const reduce = useReducedMotion();
  const { setOpen, pick } = useBetSlip();

  const open = () => {
    if (!pick) {
      // Load a default demo pick so the drawer isn't empty
      useBetSlip.getState().pickOutcome({
        fixtureId: "demo",
        home: "USA",
        away: "TUR",
        side: "home",
        label: "USA",
        odds: 2.24,
        venue: "SoFi, Inglewood",
        md: "MD2",
        kickoff: new Date(Date.now() + 2 * 3600_000 + 14 * 60_000).toISOString(),
      });
    } else {
      setOpen(true);
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Open bet slip"
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      onHoverStart={open}
      className="hidden md:block"
      style={{
        position: "fixed",
        right: 0,
        top: "50%",
        translateY: "-50%",
        width: 96,
        height: 300,
        zIndex: 35,
        cursor: "pointer",
      }}
      animate={reduce ? {} : { y: [0, -6, 0], rotate: [0, -3, 0] }}
      transition={reduce ? {} : { duration: 3, ease: "easeInOut", repeat: Infinity }}
      whileHover={{ scale: 1.05 }}
    >
      <svg
        viewBox="0 0 96 300"
        width="96"
        height="300"
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="tentGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6B2FA8" />
            <stop offset="50%" stopColor="#A859E5" />
            <stop offset="100%" stopColor="#6B2FA8" />
          </linearGradient>
          <linearGradient id="tentShine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <radialGradient id="suctionG" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FFB5A0" />
            <stop offset="100%" stopColor="#E89070" />
          </radialGradient>
          <filter id="tentGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Glow blob */}
        <path
          d="M 96 80 Q 40 105 28 150 Q 16 200 52 230 Q 82 246 96 245"
          stroke="#A859E5"
          strokeWidth="44"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
          filter="url(#tentGlow)"
        >
          {!reduce && (
            <animate
              attributeName="opacity"
              values="0.3;0.6;0.3"
              dur="2.8s"
              repeatCount="indefinite"
            />
          )}
        </path>

        {/* Main tentacle body */}
        <path
          d="M 96 80 Q 38 108 26 155 Q 18 205 52 232 Q 82 246 96 245"
          stroke="url(#tentGrad)"
          strokeWidth="32"
          fill="none"
          strokeLinecap="round"
        />
        {/* Top highlight */}
        <path
          d="M 96 80 Q 38 108 26 155 Q 18 205 52 232 Q 82 246 96 245"
          stroke="url(#tentShine)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
          transform="translate(0,-6)"
        />
        {/* Shadow underline */}
        <path
          d="M 96 80 Q 38 108 26 155 Q 18 205 52 232 Q 82 246 96 245"
          stroke="#3E1565"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
          transform="translate(0,10)"
        />

        {/* Suction cups */}
        {([
          [80, 92],
          [50, 118],
          [30, 170],
          [50, 220],
        ] as [number, number][]).map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="6.5" fill="url(#suctionG)" opacity="0.95" />
            <circle cx={cx} cy={cy} r="2.5" fill="#7A4A38" opacity="0.6" />
          </g>
        ))}

        {/* Tip ball */}
        <circle cx="96" cy="245" r="11" fill="url(#tentGrad)" />

        {/* BET label badge */}
        <g transform="translate(6, 138)">
          <rect
            x="0"
            y="0"
            width="46"
            height="28"
            rx="6"
            fill="rgba(10,6,21,0.85)"
            stroke="var(--gold)"
            strokeWidth="1.2"
          />
          <text
            x="23"
            y="18"
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            fill="var(--gold)"
            fontFamily="'Bricolage Grotesque', sans-serif"
            letterSpacing="0.12em"
          >
            BET
          </text>
        </g>
      </svg>
    </motion.div>
  );
}
