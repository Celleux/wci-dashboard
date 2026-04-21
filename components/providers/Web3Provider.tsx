"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
// RainbowKit CSS is imported from app/layout.tsx so v0's preview bundler
// resolves it from the root (avoids "failed to load from /components/..." error).
import { wagmiConfig } from "@/lib/web3/wagmi-config";

export function Web3Provider({ children }: { children: ReactNode }) {
  const [qc] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 30_000,
          },
        },
      })
  );

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={qc}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#F5D020",
            accentColorForeground: "#0A0615",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
          coolMode
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
