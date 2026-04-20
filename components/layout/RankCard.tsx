"use client";

interface RankCardProps {
  rank?: number;
  totalRank?: number;
  delta?: number;
}

export function RankCard({ rank = 0, totalRank = 1, delta = 0 }: RankCardProps) {
  const pct = totalRank > 0 ? ((rank / totalRank) * 100).toFixed(1) : "0.0";

  return (
    <div
      style={{
        padding: 12,
        borderRadius: 14,
        background:
          "linear-gradient(180deg, rgba(0,185,178,0.18), rgba(46,111,230,0.05))",
        border: "1px solid rgba(0,185,178,0.35)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), 0 6px 16px -8px var(--fifa-teal)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative field-line arc */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: -20,
          top: -20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: "2px solid rgba(0,185,178,0.15)",
          pointerEvents: "none",
        }}
      />

      <div className="label" style={{ color: "var(--fifa-teal)", fontSize: 9 }}>
        LEADERBOARD RANK
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 6,
          marginTop: 3,
        }}
      >
        <div
          className="display mono"
          style={{
            fontSize: 30,
            color: "var(--fifa-cyan)",
            lineHeight: 1,
            textShadow: "0 2px 8px rgba(0,185,178,0.4)",
          }}
        >
          #{rank}
        </div>
        <div style={{ fontSize: 10, color: "var(--t3)" }}>
          of {totalRank.toLocaleString()}
        </div>
      </div>

      <div style={{ marginTop: 6, fontSize: 10, color: "var(--t2)" }}>
        Top{" "}
        <span
          className="mono"
          style={{ color: "var(--gold)", fontWeight: 700 }}
        >
          {pct}%
        </span>
      </div>

      {delta !== 0 && (
        <div
          className="mono"
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            fontSize: 9,
            color: delta > 0 ? "var(--fifa-lime)" : "var(--fifa-red)",
            padding: "2px 5px",
            borderRadius: 4,
            background:
              delta > 0
                ? "rgba(159,214,52,0.18)"
                : "rgba(232,57,44,0.18)",
            border: `1px solid ${delta > 0 ? "rgba(159,214,52,0.4)" : "rgba(232,57,44,0.4)"}`,
            zIndex: 1,
          }}
        >
          {delta > 0 ? "▲" : "▼"} {Math.abs(delta)}
        </div>
      )}
    </div>
  );
}
