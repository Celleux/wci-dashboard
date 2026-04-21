"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon, type NavIconKind } from "../NavIcon";

interface TabItem {
  label: string;
  href: string;
  icon: NavIconKind;
  badge?: number;
}

const TABS: TabItem[] = [
  { label: "Home",     href: "/",          icon: "home" },
  { label: "Matches",  href: "/matches",   icon: "live",   badge: 3 },
  { label: "Transfer", href: "/transfer",  icon: "stake" },
  { label: "Bets",     href: "/my-bets",  icon: "slip",   badge: 3 },
  { label: "More",     href: "/menu",      icon: "trophy" },
];

/**
 * Fixed 5-tab bottom bar (mobile only). iOS-style glass with safe-area inset,
 * 56px min tap row, subtle gradient top rule and rivet corners.
 */
export function BottomTabBar({ onMore }: { onMore?: () => void }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 45,
        display: "flex",
        alignItems: "stretch",
        height: `calc(64px + var(--sa-bottom, 0px))`,
        paddingBottom: "var(--sa-bottom, 0px)",
        paddingLeft: "var(--sa-left, 0px)",
        paddingRight: "var(--sa-right, 0px)",
        background:
          "linear-gradient(180deg, rgba(18,12,38,0.94) 0%, rgba(10,6,21,0.97) 100%)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        borderTop: "1px solid var(--hair-strong)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 -8px 20px -6px rgba(0,0,0,0.6)",
      }}
    >
      {/* Top gradient rule */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 5%, rgba(245,208,32,0.4) 50%, transparent 95%)",
          pointerEvents: "none",
        }}
      />

      {TABS.map((tab) => {
        const active =
          tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        const isMore = tab.href === "/menu";

        const inner = (
          <>
            {/* Active gold bar */}
            {active && (
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: "28%",
                  right: "28%",
                  height: 3,
                  borderRadius: "0 0 3px 3px",
                  background:
                    "linear-gradient(90deg, transparent, var(--gold), transparent)",
                  boxShadow: "0 0 10px var(--gold)",
                }}
              />
            )}

            <div style={{ position: "relative" }}>
              <NavIcon kind={tab.icon} active={active} size={22} />
              {tab.badge && tab.badge > 0 && (
                <span
                  aria-label={`${tab.badge} notifications`}
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -8,
                    minWidth: 16,
                    height: 16,
                    padding: "0 4px",
                    borderRadius: 999,
                    background:
                      "linear-gradient(180deg, #FF7060, var(--fifa-red))",
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 800,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1.5px solid #0A0615",
                    boxShadow: "0 2px 6px rgba(232,57,44,0.6)",
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </div>

            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: active ? "var(--gold)" : "var(--t3)",
                lineHeight: 1,
                marginTop: 4,
              }}
            >
              {tab.label}
            </span>
          </>
        );

        const sharedStyle: React.CSSProperties = {
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          paddingTop: 8,
          paddingBottom: 6,
          minHeight: 56,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          position: "relative",
          color: active ? "var(--gold)" : "var(--t3)",
          transition: "color 160ms var(--ease)",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
          textDecoration: "none",
        };

        if (isMore) {
          return (
            <button
              key={tab.href}
              type="button"
              aria-label={tab.label}
              aria-current={active ? "page" : undefined}
              onClick={onMore}
              style={sharedStyle}
            >
              {inner}
            </button>
          );
        }
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-label={tab.label}
            aria-current={active ? "page" : undefined}
            style={sharedStyle}
          >
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}
