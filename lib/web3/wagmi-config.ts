"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, arbitrum, base } from "wagmi/chains";

/**
 * Wagmi / RainbowKit config.
 * Works even without NEXT_PUBLIC_WC_PROJECT_ID — RainbowKit will use a demo id.
 */
export const wagmiConfig = getDefaultConfig({
  appName: "World Cup Inu",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "wci-demo-dashboard",
  chains: [mainnet, polygon, arbitrum, base],
  ssr: true,
});
