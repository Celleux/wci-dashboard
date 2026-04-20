"use client";

interface StreakBonusProps {
  streak?: number;
  bonus?: number;
}

export function StreakBonus({ streak = 0, bonus = 5 }: StreakBonusProps) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 12,
        background:
          "linear-gradient(135deg, rgba(245,208,32,0.20), rgba(232,57,44,0.10))",
        border: "1px solid rgba(245,208,32,0.30)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px -4px rgba(245,208,32,0.30)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Flame icon */}
        <div
          aria-hidden
          style={{
            width: 28,
            height: 28,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-hidden>
            <path
              d="M9 1 C9 1 14 6 14 10 C14 13 12 14.5 10.5 14 C12 11 10 9 10 9 C10 12 8 14 7 15 C5.5 13 5 11 6 8 C3 10 3 14 5 16 C6 17.5 7.5 18 9 18 C12.5 18 15 15.5 15 12 C15 7 9 1 9 1 Z"
              fill="var(--gold)"
              opacity="0.9"
            />
            <path
              d="M9 12 C9 12 10.5 13.5 10 15 C9.5 16.5 8 17 7.5 16 C8 14.5 7 13 7 13 C7 14 6.5 15 7 16 C5.5 15 5.5 13 7 12 C7 12 8 11 9 12 Z"
              fill="var(--fifa-orange)"
            />
          </svg>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="label" style={{ color: "var(--gold)", fontSize: 9 }}>
            STREAK
          </div>
          <div
            className="display"
            style={{ fontSize: 14, color: "var(--t1)", lineHeight: 1.1 }}
          >
            <span className="mono">{streak}</span> MATCHES
          </div>
        </div>
      </div>

      <div style={{ fontSize: 10, color: "var(--t3)", marginTop: 6 }}>
        <span style={{ color: "var(--fifa-lime)", fontWeight: 700 }}>
          +{bonus}%
        </span>{" "}
        payout on next win
      </div>
    </div>
  );
}
