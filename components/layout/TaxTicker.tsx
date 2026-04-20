import { getTaxTicker } from "@/lib/api/etherscan";

interface TickerSegment {
  label: string;
  value: string;
  color: string;
}

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

/** Server component — fetches on every request; wrap in Suspense. */
export async function TaxTicker() {
  const data = await getTaxTicker();

  const segments: TickerSegment[] = [
    {
      label: "Rewards this week",
      value: fmt(data.rewardsThisWeek),
      color: "var(--gold)",
    },
    {
      label: "Ecosystem this week",
      value: fmt(data.ecosystemThisWeek),
      color: "var(--fifa-teal)",
    },
    {
      label: "Total routed",
      value: fmt(data.totalRouted),
      color: "var(--fifa-lime)",
    },
  ];

  // Repeat items so marquee loops seamlessly
  const items = [...segments, ...segments, ...segments];

  return (
    <div
      role="marquee"
      aria-label="Tax distribution ticker"
      style={{
        overflow: "hidden",
        height: 28,
        display: "flex",
        alignItems: "center",
        borderTop: "1px solid var(--hair)",
        background:
          "linear-gradient(90deg, rgba(10,6,21,0.95), rgba(20,16,40,0.95))",
      }}
    >
      <div className="tax-ticker-track" aria-hidden>
        {items.map((seg, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "0 28px",
              borderRight: "1px solid var(--hair)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: seg.color,
                boxShadow: `0 0 6px ${seg.color}`,
                flexShrink: 0,
              }}
              aria-hidden
            />
            <span
              style={{
                fontSize: 9,
                color: "var(--t3)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              {seg.label}
            </span>
            <span
              className="mono"
              style={{ fontSize: 10, fontWeight: 700, color: seg.color }}
            >
              {seg.value}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
