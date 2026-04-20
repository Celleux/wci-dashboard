"use client";

import { usePathname } from "next/navigation";
import { ProfileCard } from "./ProfileCard";
import { WalletCard } from "./WalletCard";
import { SidebarNavItem, type NavItemDef } from "./SidebarNavItem";
import { RankCard } from "./RankCard";
import { StreakBonus } from "./StreakBonus";

const NAV_ITEMS: NavItemDef[] = [
  { key: "home",        label: "Dashboard",    href: "/",           icon: "home" },
  { key: "matches",     label: "Live Matches", href: "/matches",    icon: "live",    badge: 3 },
  { key: "bets",        label: "My Bets",      href: "/my-bets",   icon: "slip",    badge: 3 },
  { key: "leaderboard", label: "Leaderboard",  href: "/leaderboard", icon: "trophy" },
  { key: "oracle",      label: "Paul's Oracle", href: "/oracle",   icon: "octopus" },
  { key: "cope",        label: "Cope Cards",   href: "/cope",       icon: "card" },
  { key: "staking",     label: "Staking",      href: "/staking",   icon: "stake" },
  { key: "docs",        label: "Docs",         href: "/docs",       icon: "doc" },
];

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Main navigation"
      style={{
        width: 260,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid var(--hair-strong)",
        background:
          "linear-gradient(180deg, rgba(26,18,52,0.85), rgba(10,6,21,0.95))",
        boxShadow:
          "inset -1px 0 0 rgba(245,208,32,0.08), 2px 0 20px -4px rgba(0,0,0,0.6)",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* Scrollable region */}
      <div
        className="sidebar-scroll"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 12px 4px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <ProfileCard />
        <WalletCard />

        {/* Nav */}
        <nav aria-label="App navigation">
          <div
            className="label"
            style={{
              marginBottom: 8,
              padding: "0 4px",
              fontSize: 9,
              letterSpacing: "0.20em",
            }}
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
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <SidebarNavItem key={item.key} item={item} active={active} />
              );
            })}
          </div>
        </nav>

        <RankCard rank={42} totalRank={12_400} delta={12} />
      </div>

      {/* Sticky bottom streak */}
      <div
        style={{
          padding: "8px 12px 12px",
          borderTop: "1px solid var(--hair)",
          flexShrink: 0,
        }}
      >
        <StreakBonus streak={7} bonus={5} />
      </div>
    </aside>
  );
}
