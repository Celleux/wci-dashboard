"use client";

import Link from "next/link";

interface MobileHeaderProps {
  onMenuOpen?: () => void;
}

/** 64 px notched header shown only below md breakpoint. */
export function MobileHeader({ onMenuOpen }: MobileHeaderProps) {
  return (
    <header
      className="mobile-header md:hidden"
      aria-label="Mobile header"
    >
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 12,
        }}
      >
        {/* Logo wordmark */}
        <Link
          href="/"
          aria-label="World Cup Inu home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Mini orb */}
          <div
            aria-hidden
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background:
                "conic-gradient(from 0deg, var(--fifa-red), var(--fifa-yellow), var(--fifa-teal), var(--fifa-purple), var(--fifa-red))",
              padding: 2,
              filter: "drop-shadow(0 2px 6px rgba(245,208,32,0.35))",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: "var(--bg-deep)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="display"
                style={{ fontSize: 8, color: "var(--gold)" }}
              >
                WCI
              </span>
            </div>
          </div>

          <span
            className="display"
            style={{
              fontSize: 15,
              letterSpacing: "-0.02em",
              background: "linear-gradient(180deg, #fff, #C9C0E8 80%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            WORLD CUP INU
          </span>
        </Link>

        {/* Wallet dot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 10px",
            background: "rgba(29,23,64,0.90)",
            border: "1px solid var(--hair-strong)",
            borderRadius: 999,
            flexShrink: 0,
          }}
        >
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
          <span
            className="mono"
            style={{ fontSize: 10, color: "var(--t2)", fontWeight: 600 }}
          >
            0xA3F7…D912
          </span>
        </div>

        {/* Hamburger */}
        <button
          aria-label="Open menu"
          onClick={onMenuOpen}
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "rgba(29,23,64,0.70)",
            border: "1px solid var(--hair-strong)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            flexShrink: 0,
            cursor: "pointer",
          }}
        >
          <span
            aria-hidden
            style={{
              display: "block",
              width: 16,
              height: 1.5,
              background: "var(--t2)",
              borderRadius: 2,
            }}
          />
          <span
            aria-hidden
            style={{
              display: "block",
              width: 12,
              height: 1.5,
              background: "var(--t2)",
              borderRadius: 2,
            }}
          />
          <span
            aria-hidden
            style={{
              display: "block",
              width: 16,
              height: 1.5,
              background: "var(--t2)",
              borderRadius: 2,
            }}
          />
        </button>
      </div>
    </header>
  );
}
