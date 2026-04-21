"use client";

import { create } from "zustand";
import {
  CHAINS,
  DEFAULT_SETTLEMENT_CHAIN,
  NATIVE_TOKEN,
  USDC_BY_CHAIN,
  type SupportedChainId,
} from "@/lib/transfer/constants";

export type TransferPhase =
  | "idle"
  | "scouting"
  | "route_ready"
  | "approving"
  | "bridging"
  | "settling"
  | "done"
  | "error";

export interface TokenLite {
  address: string;
  symbol: string;
  decimals: number;
  name?: string;
  logoURI?: string;
  priceUSD?: string;
}

const ETH_DEFAULT: TokenLite = {
  address: NATIVE_TOKEN,
  symbol: "ETH",
  decimals: 18,
  name: "Ether",
};

const USDC_DEFAULT = (chainId: SupportedChainId): TokenLite => ({
  address: USDC_BY_CHAIN[chainId],
  symbol: "USDC",
  decimals: 6,
  name: "USD Coin",
});

interface TransferState {
  fromChainId: SupportedChainId;
  toChainId: SupportedChainId;
  fromToken: TokenLite;
  toToken: TokenLite;
  amount: string;
  routes: any[];
  selectedRoute: any | null;
  phase: TransferPhase;
  error?: string;
  lastTxHash?: string;
  successAmount?: string;
  commentary?: string;

  setFromChain: (id: SupportedChainId) => void;
  setToChain: (id: SupportedChainId) => void;
  setFromToken: (t: TokenLite) => void;
  setToToken: (t: TokenLite) => void;
  setAmount: (a: string) => void;
  setRoutes: (r: any[]) => void;
  selectRoute: (r: any | null) => void;
  setPhase: (p: TransferPhase, commentary?: string) => void;
  setError: (e: string | undefined) => void;
  setSuccess: (amountOut: string, txHash: string) => void;
  reset: () => void;
  swapDirections: () => void;
}

const DEFAULT_FROM: SupportedChainId = 1;   // Ethereum
const DEFAULT_TO: SupportedChainId = DEFAULT_SETTLEMENT_CHAIN; // Base

export const useTransfer = create<TransferState>((set, get) => ({
  fromChainId: DEFAULT_FROM,
  toChainId: DEFAULT_TO,
  fromToken: ETH_DEFAULT,
  toToken: USDC_DEFAULT(DEFAULT_TO),
  amount: "",
  routes: [],
  selectedRoute: null,
  phase: "idle",

  setFromChain: (id) =>
    set((s) => ({
      fromChainId: id,
      fromToken:
        s.fromToken.symbol === "USDC" ? USDC_DEFAULT(id) : s.fromToken,
      routes: [],
      selectedRoute: null,
      phase: "idle",
    })),

  setToChain: (id) =>
    set((s) => ({
      toChainId: id,
      toToken: s.toToken.symbol === "USDC" ? USDC_DEFAULT(id) : s.toToken,
      routes: [],
      selectedRoute: null,
      phase: "idle",
    })),

  setFromToken: (t) =>
    set({ fromToken: t, routes: [], selectedRoute: null, phase: "idle" }),

  setToToken: (t) =>
    set({ toToken: t, routes: [], selectedRoute: null, phase: "idle" }),

  setAmount: (amount) =>
    set({ amount, routes: [], selectedRoute: null, phase: "idle" }),

  setRoutes: (routes) =>
    set({ routes, selectedRoute: routes[0] ?? null }),

  selectRoute: (r) => set({ selectedRoute: r }),

  setPhase: (phase, commentary) => set({ phase, commentary }),

  setError: (error) => set({ error, phase: error ? "error" : get().phase }),

  setSuccess: (amountOut, txHash) =>
    set({
      phase: "done",
      successAmount: amountOut,
      lastTxHash: txHash,
      commentary: "Your squad just got deeper. Go bet.",
    }),

  reset: () =>
    set({
      amount: "",
      routes: [],
      selectedRoute: null,
      phase: "idle",
      error: undefined,
      successAmount: undefined,
      lastTxHash: undefined,
      commentary: undefined,
    }),

  swapDirections: () =>
    set((s) => ({
      fromChainId: s.toChainId,
      toChainId: s.fromChainId,
      fromToken: s.toToken,
      toToken: s.fromToken,
      routes: [],
      selectedRoute: null,
      phase: "idle",
    })),
}));

export { CHAINS, USDC_DEFAULT, ETH_DEFAULT, NATIVE_TOKEN };
