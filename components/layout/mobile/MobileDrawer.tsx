"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NavIcon, type NavIconKind } from "../NavIcon";
import { ProfileCard } from "../ProfileCard";
import { WalletBadgeClient } from "../WalletBadgeClient";

interface Props {
  open: boolean;
  onClose: () => void;
}

const NAV: { key: string; label: string; href: string; icon: NavIconKind; badge?: number }[] = [
  { key: "home",        label: "Dashboard",    href: "/",           icon: "home" },
  { key: "matches",     label: "Live Matches", href: "/matches",    icon: "live", badge: 3 },
  { key: "bets",        label: "My Bets",      href: "/my-bets",   icon: "slip", badge: 3 },
  { key: "leaderboard", label: "Leaderboard",  href: "/leaderboard", icon: "trophy" },
  { key: "oracle",      label: "Paul's Oracle", href: "/oracle",   icon: "octopus" },
  { key: "cope",        label: "Cope Cards",   href: "/cope",       icon: "card" },
  { key: "staking",     label: "Staking",      href: "/staking",   icon: "stake" },
  { key: "settings",    label: "Settings",     href: "/settings",   icon: "doc" },
  { key: "docs",        label: "Docs",         href: "/docs",       icon: "doc" },
];

export function MobileDrawer({ open, onClose }: Props) {
  const pathname = usePathname();
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(5,3,12,0.55)",
              backdropFilter: "blur(6px)",
              zIndex: 60,
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
          {/* Sheet */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              zIndex: 65,
              width: "min(320px, 88vw)",
              background:
                "linear-gradient(180deg, rgba(30,20,60,0.98) 0%, rgba(10,6,21,0.98) 100%)",
              borderRight: "1px solid var(--hair-strong)",
              boxShadow: "20px 0 60px -12px rgba(0,0,0,0.7)",
              display: "flex",
              flexDirection: "column",
              paddingTop: "var(--sa-top, 0px)",
              paddingBottom: "var(--sa-bottom, 0px)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 14px 12px",
                borderBottom: "1px solid var(--hair)",
              }}
            >
              <Image src="/assets/logo.png" alt="" width={36} height={36} priority />
              <div style={{ flex: 1 }}>
                <div className="display" style={{ fontSize: 14, lineHeight: 1 }}>
                  WORLD CUP INU
                </div>
                <div className="mono" style={{ fontSize: 9, color: "var(--gold)", marginTop: 2, letterSpacing: "0.2em" }}>
                  THE ORACLE · V2
                </div>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--hair)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--t2)",
                  cursor: "pointer",
                  touchAction: "manipulation",
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "12px 12px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <ProfileCard />

              {/* Wallet row */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  padding: "8px 12px",
                  borderRadius: 12,
                  background: "rgba(10,6,21,0.5)",
                  border: "1px solid var(--hair)",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span className="label" style={{ fontSize: 9 }}>Wallet</span>
                <WalletBadgeClient />
              </div>

              <div className="label" style={{ padding: "0 4px", marginTop: 4 }}>
                Navigation
              </div>
              <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {NAV.map((item) => {
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
                      data-active={active ? "true" : undefined}
                      style={{ minHeight: 48 }}
                    >
                      <NavIcon kind={item.icon} active={active} size={20} />
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {item.badge ? (
                        <span
                          style={{
                            minWidth: 22,
                            height: 22,
                            padding: "0 6px",
                            borderRadius: 999,
                            background:
                              "linear-gradient(180deg, #FF7060, var(--fifa-red))",
                            color: "#fff",
                            fontSize: 10,
                            fontWeight: 800,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer — streak bonus */}
            <div
              style={{
                margin: 12,
                padding: 12,
                borderRadius: 14,
                background:
                  "linear-gradient(180deg, rgba(245,208,32,0.18), rgba(245,208,32,0.05))",
                border: "1px solid rgba(245,208,32,0.4)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <div className="label" style={{ fontSize: 9, color: "var(--gold)" }}>
                🔥 STREAK · 7 MATCHES
              </div>
              <div className="mono" style={{ fontSize: 11, color: "var(--t2)", marginTop: 4 }}>
                +5% payout on your next win
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
