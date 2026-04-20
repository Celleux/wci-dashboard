"use client";

import { Drawer } from "vaul";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ProfileCard } from "../ProfileCard";
import { WalletCard } from "../WalletCard";
import { NavIcon, type NavIconKind } from "../NavIcon";
import { StreakBonus } from "../StreakBonus";

interface DrawerNavItem {
  key: string;
  label: string;
  href: string;
  icon: NavIconKind;
  badge?: number;
}

const DRAWER_NAV: DrawerNavItem[] = [
  { key: "home",        label: "Dashboard",    href: "/",            icon: "home" },
  { key: "matches",     label: "Live Matches", href: "/matches",     icon: "live",    badge: 3 },
  { key: "bets",        label: "My Bets",      href: "/my-bets",    icon: "slip",    badge: 3 },
  { key: "leaderboard", label: "Leaderboard",  href: "/leaderboard", icon: "trophy" },
  { key: "oracle",      label: "Paul's Oracle", href: "/oracle",    icon: "octopus" },
  { key: "cope",        label: "Cope Cards",   href: "/cope",        icon: "card" },
  { key: "staking",     label: "Staking",      href: "/staking",    icon: "stake" },
  { key: "docs",        label: "Docs",         href: "/docs",        icon: "doc" },
];

interface MobileDrawerSheetProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawerSheet({ open, onClose }: MobileDrawerSheetProps) {
  const pathname = usePathname();

  return (
    <Drawer.Root open={open} onClose={onClose} shouldScaleBackground>
      <Drawer.Portal>
        {/* Overlay */}
        <Drawer.Overlay
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.70)",
            backdropFilter: "blur(4px)",
            zIndex: 60,
          }}
          onClick={onClose}
        />

        {/* Sheet content */}
        <Drawer.Content
          aria-label="Navigation menu"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            maxHeight: "95dvh",
            zIndex: 61,
            borderRadius: "20px 20px 0 0",
            background:
              "linear-gradient(180deg, rgba(26,18,52,0.98), rgba(10,6,21,0.99))",
            border: "1px solid var(--hair-strong)",
            borderBottom: "none",
            boxShadow:
              "0 -8px 40px rgba(0,0,0,0.80), inset 0 1px 0 rgba(255,255,255,0.10)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Drag handle */}
          <div
            aria-hidden
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: "var(--hair-strong)",
              margin: "12px auto 4px",
              flexShrink: 0,
            }}
          />

          {/* Scrollable body */}
          <div
            className="sidebar-scroll"
            style={{
              overflowY: "auto",
              padding: "8px 16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              paddingBottom: `calc(20px + env(safe-area-inset-bottom))`,
            }}
          >
            <ProfileCard />
            <WalletCard />

            {/* Nav grid */}
            <nav aria-label="Full navigation">
              <div
                className="label"
                style={{ marginBottom: 10, fontSize: 9, letterSpacing: "0.2em" }}
              >
                NAVIGATION
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {DRAWER_NAV.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className="sidebar-item"
                      style={{
                        textDecoration: "none",
                        minHeight: 52,
                        position: "relative",
                        ...(active
                          ? {
                              background:
                                "linear-gradient(90deg, rgba(245,208,32,0.18), rgba(245,208,32,0.02))",
                              border: "1px solid rgba(245,208,32,0.40)",
                              color: "var(--gold)",
                              boxShadow:
                                "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 16px -6px var(--gold)",
                            }
                          : {}),
                      }}
                    >
                      {active && (
                        <span
                          aria-hidden
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 4,
                            bottom: 4,
                            width: 3,
                            background:
                              "linear-gradient(180deg, var(--gold), var(--fifa-orange))",
                            borderRadius: "0 2px 2px 0",
                            boxShadow: "0 0 8px var(--gold)",
                          }}
                        />
                      )}
                      <div
                        aria-hidden
                        style={{
                          width: 30,
                          height: 30,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 8,
                          flexShrink: 0,
                          background: active
                            ? "linear-gradient(180deg, rgba(245,208,32,0.20), rgba(245,208,32,0.05))"
                            : "linear-gradient(180deg, #201838, #110A24)",
                          border: `1px solid ${active ? "rgba(245,208,32,0.30)" : "var(--hair)"}`,
                        }}
                      >
                        <NavIcon kind={item.icon} active={active} size={14} />
                      </div>
                      <span style={{ flex: 1, fontSize: 14 }}>{item.label}</span>
                      {item.badge != null && item.badge > 0 && (
                        <span
                          className="mono"
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: 999,
                            background:
                              "linear-gradient(180deg, var(--fifa-red), var(--fifa-orange))",
                            color: "#fff",
                            minWidth: 20,
                            textAlign: "center",
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>

            <StreakBonus streak={7} bonus={5} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
