"use client";

import { createConfig, http } from "wagmi";
import { mainnet, polygon, arbitrum, base, optimism, bsc, avalanche } from "wagmi/chains";
import { injected, coinbaseWallet, walletConnect } from "wagmi/connectors";

/**
 * Wagmi config — always mountable (no required env vars). WalletConnect is
 * only enabled when NEXT_PUBLIC_WC_PROJECT_ID is set; otherwise we fall back
 * to injected (MetaMask/Rainbow/browser) + Coinbase Wallet SDK.
 */

const connectors: any[] = [
  injected({ shimDisconnect: true }),
  coinbaseWallet({ appName: "World Cup Inu", appLogoUrl: "/assets/logo.png" }),
];
if (process.env.NEXT_PUBLIC_WC_PROJECT_ID) {
  connectors.push(
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
      metadata: {
        name: "World Cup Inu",
        description: "Paul's Oracle for WC26",
        url: "https://wci-dashboard-amber.vercel.app",
        icons: ["https://wci-dashboard-amber.vercel.app/assets/logo.png"],
      },
      showQrModal: true,
    })
  );
}

export const wagmiConfig = createConfig({
  chains: [base, mainnet, arbitrum, optimism, polygon, bsc, avalanche],
  connectors,
  ssr: true,
  transports: {
    [base.id]:      http(),
    [mainnet.id]:   http(),
    [arbitrum.id]:  http(),
    [optimism.id]:  http(),
    [polygon.id]:   http(),
    [bsc.id]:       http(),
    [avalanche.id]: http(),
  },
});
