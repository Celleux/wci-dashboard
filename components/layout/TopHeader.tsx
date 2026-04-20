"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoOrb } from "./LogoOrb";
import { HeaderWave } from "./HeaderWave";
import { WalletBadge } from "./WalletBadge";

const HEADER_H = 100;

interface HeaderNavLink {
  label: string;
  href: string;
}

const LEFT_LINKS: HeaderNavLink[] = [
  { label: "Dashboard",   href: "/" },
  { label: "Matches",     href: "/matches" },
  { label: "My Bets",     href: "/my-bets" },
];

const RIGHT_LINKS: HeaderNavLink[] = [
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Oracle",      href: "/oracle" },
  { label: "Docs",        href: "/docs" },
];

function HeaderTab({ label, href }: { label: string; href: string }) {
  const pathname = usePathname();
  const active =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "10px 16px",
        minHeight: 48,
        background: active
          ? "linear-gradient(180deg, rgba(245,208,32,0.25), rgba(245,208,32,0.08))"
          : "transparent",
        border: `1px solid ${active ? "rgba(245,208,32,0.50)" : "transparent"}`,
        color: active ? "var(--gold)" : "var(--t2)",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.01em",
        cursor: "pointer",
        transition: "all 160ms var(--ease)",
        boxShadow: active
          ? "inset 0 1px 0 rgba(255,255,255,0.15), 0 0 24px -6px var(--gold)"
          : "none",
        textShadow: active ? "0 0 12px rgba(245,208,32,0.50)" : "none",
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

      <HeaderWave headerH={HEADER_H} notchR={110} />

      <div
        style={{
          position: "relative",
          height: HEADER_H,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          maxWidth: 1560,
          margin: "0 auto",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          aria-label="World Cup Inu home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background:
                "conic-gradient(from 0deg, var(--fifa-red), var(--fifa-yellow), var(--fifa-teal), var(--fifa-purple), var(--fifa-red))",
              padding: 2,
              filter: "drop-shadow(0 2px 6px rgba(245,208,32,0.4))",
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
                style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0" }}
              >
                WCI
              </span>
            </div>
          </div>

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
                fontSize: 18,
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                background:
                  "linear-gradient(180deg, #fff, #C9C0E8 75%, #8A7DC8)",
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
                marginTop: 4,
              }}
            >
              THE ORACLE · V2
            </span>
          </div>
        </Link>

        {/* Left nav links */}
        <nav
          aria-label="Left header navigation"
          style={{ display: "flex", gap: 4, marginLeft: 28 }}
        >
          {LEFT_LINKS.map((l) => (
            <HeaderTab key={l.href} {...l} />
          ))}
        </nav>

        {/* Center spacer — LogoOrb protrudes here */}
        <div
          style={{ flex: 1, minWidth: 180, position: "relative" }}
          aria-hidden
        >
          <div
            style={{
              position: "absolute",
              top: 6,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
            }}
          >
            <LogoOrb size={110} />
          </div>
        </div>

        {/* Right nav links */}
        <nav
          aria-label="Right header navigation"
          style={{ display: "flex", gap: 4 }}
        >
          {RIGHT_LINKS.map((l) => (
            <HeaderTab key={l.href} {...l} />
          ))}
        </nav>

        {/* Wallet */}
        <div
          style={{
            marginLeft: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <WalletBadge />
        </div>
      </div>
    </header>
  );
}
