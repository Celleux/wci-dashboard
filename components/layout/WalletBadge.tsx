"use client";

/** Compact wallet pill shown in the TopHeader right section. */
export function WalletBadge() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 12px 6px 6px",
        background: "linear-gradient(180deg, #1D1740, #141028)",
        border: "1px solid var(--hair-strong)",
        borderRadius: 999,
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.5)",
      }}
    >
      {/* ETH icon */}
      <div
        aria-hidden
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #627EEA, #3C5099)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
      >
        <svg width="10" height="16" viewBox="0 0 10 16" aria-hidden>
          <path
            d="M 5 0 L 5 6 L 10 8 L 5 0 Z M 5 0 L 5 6 L 0 8 L 5 0 Z M 0 9 L 5 11.5 L 10 9 L 5 16 L 0 9 Z"
            fill="#fff"
            opacity="0.9"
          />
        </svg>
      </div>

      <span
        className="mono"
        style={{ fontSize: 11, color: "var(--t1)", fontWeight: 600 }}
      >
        0xA3F7…D912
      </span>

      {/* Online dot */}
      <span
        aria-label="Connected"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--fifa-lime)",
          boxShadow: "0 0 8px var(--fifa-lime)",
          flexShrink: 0,
        }}
      />
    </div>
  );
}
