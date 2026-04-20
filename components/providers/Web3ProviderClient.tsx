"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

/**
 * Client-side-only Web3Provider. RainbowKit's getDefaultConfig throws during
 * SSR if NEXT_PUBLIC_WC_PROJECT_ID isn't set, so we isolate the provider to
 * the browser. The rest of the app still prerenders normally.
 */
const Web3Provider = dynamic(
  () => import("./Web3Provider").then((m) => m.Web3Provider),
  { ssr: false }
);

export function Web3ProviderClient({ children }: { children: ReactNode }) {
  // Only mount the Web3Provider when a project id is present.
  // Without it, skip the provider entirely so pages still render.
  if (!process.env.NEXT_PUBLIC_WC_PROJECT_ID) {
    return <>{children}</>;
  }
  return <Web3Provider>{children}</Web3Provider>;
}
