"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

/**
 * Client-side-only Web3Provider. Always mounts — wagmi config uses
 * injected + Coinbase Wallet by default, with WalletConnect added opportunistically
 * when NEXT_PUBLIC_WC_PROJECT_ID is set.
 */
const Web3Provider = dynamic(
  () => import("./Web3Provider").then((m) => m.Web3Provider),
  { ssr: false }
);

export function Web3ProviderClient({ children }: { children: ReactNode }) {
  return <Web3Provider>{children}</Web3Provider>;
}
