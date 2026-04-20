"use client";

interface ProfileCardProps {
  handle?: string;
  country?: string;
  joined?: string;
  bets?: number;
  wins?: number;
  roi?: number;
  pfp?: string;
}

function MiniStat({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        className="mono display"
        style={{ fontSize: 14, color, lineHeight: 1 }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 8,
          color: "var(--t3)",
          marginTop: 2,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: 700,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function ProfileCard({
  handle = "anon",
  country = "US",
  joined = "2025",
  bets = 0,
  wins = 0,
  roi = 0,
  pfp,
}: ProfileCardProps) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 14,
        background:
          "linear-gradient(180deg, rgba(139,71,214,0.22), rgba(46,111,230,0.08))",
        border: "1px solid rgba(139,71,214,0.35)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 6px 20px -8px var(--fifa-purple)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background:
                "conic-gradient(from 0deg, var(--fifa-red), var(--fifa-yellow), var(--fifa-teal), var(--fifa-purple), var(--fifa-red))",
              padding: 2,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "#1a1030",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {pfp ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={pfp}
                  alt={handle}
                  width={48}
                  height={48}
                  style={{ transform: "scale(1.4) translateY(4px)" }}
                />
              ) : (
                <span
                  className="display"
                  style={{ fontSize: 16, color: "var(--t2)" }}
                >
                  {handle.slice(0, 1).toUpperCase()}
                </span>
              )}
            </div>
          </div>
          {/* Online indicator */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: -2,
              right: -2,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "var(--fifa-lime)",
              border: "2px solid #1a1030",
              boxShadow: "0 0 8px var(--fifa-lime)",
            }}
          />
        </div>

        {/* Name + country */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            className="display"
            style={{
              fontSize: 14,
              lineHeight: 1.1,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "var(--t1)",
            }}
          >
            {handle}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginTop: 3,
            }}
          >
            <span
              className="label"
              style={{ fontSize: 8, color: "var(--t3)" }}
            >
              {country}
            </span>
            <span style={{ fontSize: 10, color: "var(--t3)" }}>
              Since {joined}
            </span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 4,
          marginTop: 10,
          paddingTop: 10,
          borderTop: "1px solid var(--hair)",
        }}
      >
        <MiniStat label="Bets" value={bets} color="var(--fifa-teal)" />
        <MiniStat label="Wins" value={wins} color="var(--fifa-lime)" />
        <MiniStat label="ROI" value={`${roi}%`} color="var(--gold)" />
      </div>
    </div>
  );
}
