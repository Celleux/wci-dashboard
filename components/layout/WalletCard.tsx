"use client";

interface WalletCardProps {
  wallet?: string;
  wci?: number;
  usdc?: number;
  claimable?: number;
  wciChange?: string;
}

export function WalletCard({
  wallet = "0xA3F7…D912",
  wci = 0,
  usdc = 0,
  claimable = 0,
  wciChange = "+0.0%",
}: WalletCardProps) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 14,
        background: "linear-gradient(180deg, #1D1740, #141028)",
        border: "1px solid var(--hair-strong)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), 0 6px 16px -6px rgba(0,0,0,0.6)",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <div className="label" style={{ fontSize: 9 }}>
          WALLET
        </div>
        <span className="mono" style={{ fontSize: 9, color: "var(--t3)" }}>
          {wallet}
        </span>
      </div>

      {/* WCI balance */}
      <div
        style={{
          padding: "8px 10px",
          borderRadius: 9,
          background: "linear-gradient(90deg, rgba(245,208,32,0.12), transparent)",
          border: "1px solid rgba(245,208,32,0.2)",
          marginBottom: 5,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          aria-hidden
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, var(--fifa-yellow), var(--gold-deep))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {/* Octopus silhouette */}
          <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden fill="none">
            <circle cx="8" cy="6" r="4" stroke="#0A0615" strokeWidth="1.8" />
            <path
              d="M4 9 Q3 12 4 14 M6 10 Q5 13 6 14 M8 10 V14 M10 10 Q11 13 10 14 M12 9 Q13 12 12 14"
              stroke="#0A0615"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 9, color: "var(--t3)" }}>WCI</div>
          <div
            className="mono"
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--gold)",
              lineHeight: 1,
            }}
          >
            {wci >= 1000 ? `${(wci / 1000).toFixed(1)}K` : wci.toLocaleString()}
          </div>
        </div>
        <div
          className="mono"
          style={{ fontSize: 10, color: "var(--fifa-lime)", flexShrink: 0 }}
        >
          {wciChange}
        </div>
      </div>

      {/* USDC balance */}
      <div
        style={{
          padding: "8px 10px",
          borderRadius: 9,
          background: "linear-gradient(90deg, rgba(46,111,230,0.12), transparent)",
          border: "1px solid rgba(46,111,230,0.2)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          aria-hidden
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #4ED1E6, #2E6FE6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 800,
            fontSize: 11,
            flexShrink: 0,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          $
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 9, color: "var(--t3)" }}>USDC</div>
          <div
            className="mono"
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--fifa-cyan)",
              lineHeight: 1,
            }}
          >
            {usdc.toFixed(2)}
          </div>
        </div>
      </div>

      {claimable > 0 && (
        <button
          style={{
            width: "100%",
            marginTop: 6,
            padding: "7px 10px",
            borderRadius: 8,
            background:
              "linear-gradient(180deg, rgba(159,214,52,0.25), rgba(159,214,52,0.10))",
            border: "1px solid rgba(159,214,52,0.45)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.10), 0 0 12px -4px var(--fifa-lime)",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: 48,
          }}
        >
          <span
            style={{
              fontSize: 10,
              color: "var(--fifa-lime)",
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            CLAIM
          </span>
          <span
            className="mono"
            style={{ fontSize: 12, fontWeight: 700, color: "var(--fifa-lime)" }}
          >
            +${claimable.toFixed(2)}
          </span>
        </button>
      )}
    </div>
  );
}
