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
  // When WalletConnect project id is missing, skip RainbowKit entirely and
  // render a dummy button so the page still looks complete.
  if (!process.env.NEXT_PUBLIC_WC_PROJECT_ID) {
    return (
      <button
        type="button"
        className="btn-3d-color"
        title="Set NEXT_PUBLIC_WC_PROJECT_ID in .env.local to enable wallet connect"
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
    );
  }
  return <WalletBadgeInner />;
}
