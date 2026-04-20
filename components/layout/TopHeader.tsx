"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogoOrb } from "./LogoOrb";
import { HeaderWave } from "./HeaderWave";
import { WalletBadgeClient as WalletBadge } from "./WalletBadgeClient";

const HEADER_H = 88;
const ORB_SIZE = 132; // bigger than header so it protrudes up + down through notch

interface HeaderNavLink {
  label: string;
  href: string;
}

const LEFT_LINKS: HeaderNavLink[] = [
  { label: "Dashboard", href: "/" },
  { label: "Matches", href: "/matches" },
  { label: "My Bets", href: "/my-bets" },
];

const RIGHT_LINKS: HeaderNavLink[] = [
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Oracle", href: "/oracle" },
  { label: "Docs", href: "/docs" },
];

function HeaderTab({ label, href }: { label: string; href: string }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "8px 14px",
        minHeight: 40,
        background: active
          ? "linear-gradient(180deg, rgba(245,208,32,0.22), rgba(245,208,32,0.06))"
          : "transparent",
        border: `1px solid ${active ? "rgba(245,208,32,0.45)" : "transparent"}`,
        color: active ? "var(--gold)" : "var(--t2)",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.01em",
        cursor: "pointer",
        transition: "all 160ms var(--ease)",
        boxShadow: active
          ? "inset 0 1px 0 rgba(255,255,255,0.12), 0 0 20px -6px var(--gold)"
          : "none",
        textShadow: active ? "0 0 10px rgba(245,208,32,0.45)" : "none",
        whiteSpace: "nowrap",
        textDecoration: "none",
      }}
    >
      {label}
    </Link>
  );
}

export function TopHeader() {
  return (
    <header
      style={{
        position: "relative",
        zIndex: 40,
        height: HEADER_H,
        flexShrink: 0,
      }}
    >
      {/* Backdrop blur */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          height: HEADER_H,
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
        }}
      />

      {/* Notched edge + rainbow stroke */}
      <HeaderWave headerH={HEADER_H} notchR={70} />

      {/* Tabs + wordmark + wallet (row) */}
      <div
        style={{
          position: "relative",
          height: HEADER_H,
          display: "flex",
          alignItems: "center",
          paddingLeft: 20,
          paddingRight: 20,
          gap: 14,
        }}
      >
        {/* Wordmark (left) */}
        <Link
          href="/"
          aria-label="World Cup Inu home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
            textDecoration: "none",
          }}
        >
          <Image
            src="/assets/logo.png"
            alt=""
            width={36}
            height={36}
            priority
            style={{
              filter:
                "drop-shadow(0 2px 6px rgba(245,208,32,0.35))",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1,
            }}
          >
            <span
              className="display"
              style={{
                fontSize: 16,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                background: "linear-gradient(180deg, #fff, #C9C0E8 75%, #8A7DC8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              WORLD CUP INU
            </span>
            <span
              className="mono"
              style={{
                fontSize: 9,
                color: "var(--gold)",
                letterSpacing: "0.2em",
                fontWeight: 700,
                marginTop: 3,
              }}
            >
              THE ORACLE · V2
            </span>
          </div>
        </Link>

        {/* Left tabs */}
        <nav
          aria-label="Left header navigation"
          style={{ display: "flex", gap: 4, marginLeft: 14 }}
        >
          {LEFT_LINKS.map((l) => (
            <HeaderTab key={l.href} {...l} />
          ))}
        </nav>

        {/* Center spacer — the notch lives here; orb sits over it (absolute) */}
        <div style={{ flex: 1, minWidth: 160 }} aria-hidden />

        {/* Right tabs */}
        <nav
          aria-label="Right header navigation"
          style={{ display: "flex", gap: 4 }}
        >
          {RIGHT_LINKS.map((l) => (
            <HeaderTab key={l.href} {...l} />
          ))}
        </nav>

        {/* Claim + wallet */}
        <div
          style={{
            marginLeft: 10,
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            className="btn-3d"
            style={{ padding: "8px 14px", minHeight: 40, fontSize: 12 }}
          >
            CLAIM $11.22
          </button>
          <WalletBadge />
        </div>
      </div>

      {/* Orb — absolutely centered over the notch, half above + half into header */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: -ORB_SIZE * 0.22,
          transform: "translateX(-50%)",
          zIndex: 45,
          pointerEvents: "none",
        }}
      >
        <LogoOrb size={ORB_SIZE} />
      </div>
    </header>
  );
}
