"use client";

import { useMemo } from "react";
import { FlagRect } from "@/components/shared/FlagRect";
import type { TeamCode } from "@/lib/data/teams";

interface WhaleEvent {
  id: number;
  handle: string;
  country: TeamCode;
  team: TeamCode;
  amount: number;
  side: "home" | "draw" | "away";
  status: "won" | "placed" | "lost";
}

const FEED: WhaleEvent[] = [
  { id: 1,  handle: "kraken_bets",  country: "JPN", team: "BRA", amount: 2400, side: "home", status: "won" },
  { id: 2,  handle: "0xOracle",     country: "KOR", team: "ARG", amount: 600,  side: "home", status: "placed" },
  { id: 3,  handle: "pepecopa",     country: "ARG", team: "FRA", amount: 180,  side: "away", status: "lost" },
  { id: 4,  handle: "squiddington", country: "ENG", team: "ESP", amount: 1250, side: "home", status: "placed" },
  { id: 5,  handle: "PAUL.eth",     country: "GER", team: "BRA", amount: 3500, side: "home", status: "won" },
  { id: 6,  handle: "tifosi_42",    country: "BRA", team: "BRA", amount: 900,  side: "home", status: "placed" },
  { id: 7,  handle: "orange_blob",  country: "NED", team: "NED", amount: 350,  side: "home", status: "placed" },
  { id: 8,  handle: "nostradame",   country: "FRA", team: "FRA", amount: 2100, side: "home", status: "won" },
  { id: 9,  handle: "degen_gk",     country: "ESP", team: "ESP", amount: 420,  side: "home", status: "placed" },
  { id: 10, handle: "whaleplex",    country: "USA", team: "USA", amount: 5500, side: "home", status: "placed" },
];

function badge(status: WhaleEvent["status"]) {
  if (status === "won") return { label: "WON", color: "var(--fifa-lime)" };
  if (status === "lost") return { label: "LOST", color: "var(--coral)" };
  return { label: "PLACED", color: "var(--fifa-teal)" };
}

/** Horizontal whale-activity ticker — scrolls infinitely, under the tax ticker. */
export function WhaleBar() {
  const items = useMemo(() => [...FEED, ...FEED], []);

  return (
    <div
      role="marquee"
      aria-label="Whale activity"
      style={{
        overflow: "hidden",
        height: 36,
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid var(--hair)",
        background:
          "linear-gradient(90deg, rgba(10,6,21,0.95) 0%, rgba(30,20,60,0.6) 50%, rgba(10,6,21,0.95) 100%)",
        flexShrink: 0,
        position: "relative",
      }}
    >
      {/* Left label */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 14px",
          background:
            "linear-gradient(90deg, rgba(10,6,21,0.98) 70%, rgba(10,6,21,0))",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--fifa-lime)",
            boxShadow: "0 0 10px var(--fifa-lime)",
            animation: "pulse-dot 1.6s ease-in-out infinite",
          }}
          aria-hidden
        />
        <span className="label" style={{ color: "var(--fifa-lime)" }}>
          WHALE FEED
        </span>
      </div>

      {/* Scrolling feed */}
      <div
        style={{
          display: "inline-flex",
          whiteSpace: "nowrap",
          animation: "marquee 70s linear infinite",
          marginLeft: 140,
        }}
      >
        {items.map((ev, i) => {
          const b = badge(ev.status);
          return (
            <span
              key={`${ev.id}-${i}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "0 22px",
                borderLeft: "1px solid var(--hair)",
              }}
            >
              <FlagRect code={ev.country} width={16} height={11} />
              <span className="mono text-[11px] text-t2">{ev.handle}</span>
              <span className="text-t4 text-[10px]">
                {ev.status === "won" ? "won" : ev.status === "lost" ? "lost" : "placed"}
              </span>
              <span
                className="mono text-[11px] tabular-nums font-bold"
                style={{ color: b.color }}
              >
                {ev.amount.toLocaleString()} USDC
              </span>
              <span className="text-t4 text-[10px]">on</span>
              <FlagRect code={ev.team} width={16} height={11} />
              <span className="mono text-[11px] font-bold">{ev.team}</span>
              <span
                className="mono text-[9px] px-1.5 py-0.5 rounded"
                style={{
                  color: b.color,
                  background: `${b.color}22`,
                  border: `1px solid ${b.color}55`,
                }}
              >
                {b.label}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
