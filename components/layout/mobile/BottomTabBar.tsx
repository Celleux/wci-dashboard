"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon, type NavIconKind } from "../NavIcon";

interface TabItem {
  label: string;
  href: string;
  icon: NavIconKind;
}

const TABS: TabItem[] = [
  { label: "Home",    href: "/",          icon: "home" },
  { label: "Matches", href: "/matches",   icon: "live" },
  { label: "Oracle",  href: "/oracle",    icon: "octopus" },
  { label: "Bets",    href: "/my-bets",  icon: "slip" },
  { label: "More",    href: "/_more",     icon: "trophy" },
];

/** Fixed 5-tab bottom bar, safe-area aware. Hidden >= md. */
export function BottomTabBar({ onMore }: { onMore?: () => void }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile tab bar"
      className="bottom-tab-bar md:hidden"
    >
      {TABS.map((tab) => {
        const active =
          tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        const isMore = tab.href === "/_more";

        const content = (
          <>
            {active && (
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0,
                  left: "25%",
                  right: "25%",
                  height: 2,
                  background: "var(--gold)",
                  borderRadius: "0 0 2px 2px",
                  boxShadow: "0 0 8px var(--gold)",
                }}
              />
            )}
            <NavIcon kind={tab.icon} active={active} size={20} />
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: active ? "var(--gold)" : "var(--t3)",
                lineHeight: 1,
              }}
            >
              {tab.label}
            </span>
          </>
        );

        const sharedStyle: React.CSSProperties = {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          padding: "8px 4px 6px",
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
              {content}
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
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
