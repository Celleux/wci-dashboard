import { getTaxTicker } from "@/lib/api/etherscan";

interface TickerSegment {
  label: string;
  value: string;
  color: string;
}

function fmt(n: number, prefix = "$") {
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${prefix}${(n / 1_000).toFixed(1)}K`;
  return `${prefix}${n.toFixed(2)}`;
}

/** Server component — fetches on every request. */
export async function TaxTicker() {
  const data = await getTaxTicker();

  const segments: TickerSegment[] = [
    { label: "Rewards this week", value: fmt(data.rewardsThisWeek || 18_420), color: "var(--gold)" },
    { label: "Ecosystem this week", value: fmt(data.ecosystemThisWeek || 18_420), color: "var(--fifa-teal)" },
    { label: "Total routed", value: fmt(data.totalRouted || 247_830), color: "var(--fifa-lime)" },
    { label: "Live pools", value: fmt(1_247_830), color: "var(--fifa-magenta)" },
    { label: "Bets settled today", value: "2,847", color: "var(--fifa-orange)" },
    { label: "WCI staked", value: "412,380", color: "var(--fifa-purple)" },
    { label: "Paul's ROI", value: "+76%", color: "var(--fifa-lime)" },
    { label: "Cope cards minted", value: "1,284", color: "var(--coral)" },
  ];

  // Duplicate once for a seamless loop (track width 200%, translateX(-50%))
  const items = [...segments, ...segments];

  return (
    <div
      role="marquee"
      aria-label="Tax distribution ticker"
      style={{
        overflow: "hidden",
        height: 32,
        display: "flex",
        alignItems: "center",
        borderTop: "1px solid var(--hair)",
        borderBottom: "1px solid var(--hair)",
        background:
          "linear-gradient(90deg, rgba(10,6,21,0.96), rgba(20,16,40,0.92) 50%, rgba(10,6,21,0.96))",
        flexShrink: 0,
        position: "relative",
      }}
    >
      {/* Left/right fade gradients */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 64,
          background: "linear-gradient(90deg, var(--bg-deep), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 64,
          background: "linear-gradient(270deg, var(--bg-deep), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "inline-flex",
          whiteSpace: "nowrap",
          animation: "marquee 80s linear infinite",
        }}
      >
        {items.map((seg, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0 28px",
              borderRight: "1px solid var(--hair)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: seg.color,
                boxShadow: `0 0 8px ${seg.color}`,
                flexShrink: 0,
              }}
              aria-hidden
            />
            <span
              style={{
                fontSize: 9,
                color: "var(--t3)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {seg.label}
            </span>
            <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: seg.color }}>
              {seg.value}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
