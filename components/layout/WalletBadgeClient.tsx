"use client";

import dynamic from "next/dynamic";

/** Client-only wrapper so RainbowKit imports don't break prerender. */
const WalletBadgeInner = dynamic(
  () => import("./WalletBadge").then((m) => m.WalletBadge),
  {
    ssr: false,
    loading: () => (
      <button
        type="button"
        className="btn-3d-color"
        style={
          {
            "--btn-light": "var(--fifa-purple)",
            "--btn-dark": "var(--fifa-violet)",
            "--btn-shadow": "#3b1985",
            padding: "8px 14px",
            minHeight: 40,
            fontSize: 11,
          } as React.CSSProperties
        }
      >
        CONNECT WALLET
      </button>
    ),
  }
);

export function WalletBadgeClient() {
  // Wagmi config now always mounts (injected + Coinbase + optional WC).
  return <WalletBadgeInner />;
}
