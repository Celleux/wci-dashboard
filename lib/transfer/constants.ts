// Chain + token constants for the Transfer Window (LI.FI swap bridge).

export type SupportedChainId = 1 | 8453 | 42161 | 10 | 137 | 56 | 43114;

export interface TransferChain {
  id: SupportedChainId;
  key: string;
  name: string;
  short: string;
  nativeSymbol: string;
  accent: string; // CSS color for the chain chip
  logoColor: string; // accent/background for the logo pill
}

/** Tuned order — places settlement chain (Base) first. */
export const CHAINS: TransferChain[] = [
  { id: 8453,  key: "base",      name: "Base",       short: "BASE",  nativeSymbol: "ETH",   accent: "var(--fifa-blue)",    logoColor: "#0052FF" },
  { id: 1,     key: "ethereum",  name: "Ethereum",   short: "ETH",   nativeSymbol: "ETH",   accent: "var(--fifa-purple)",  logoColor: "#627EEA" },
  { id: 42161, key: "arbitrum",  name: "Arbitrum",   short: "ARB",   nativeSymbol: "ETH",   accent: "var(--fifa-cyan)",    logoColor: "#28A0F0" },
  { id: 10,    key: "optimism",  name: "Optimism",   short: "OP",    nativeSymbol: "ETH",   accent: "var(--fifa-red)",     logoColor: "#FF0420" },
  { id: 137,   key: "polygon",   name: "Polygon",    short: "POLY",  nativeSymbol: "MATIC", accent: "var(--fifa-magenta)", logoColor: "#8247E5" },
  { id: 56,    key: "bsc",       name: "BSC",        short: "BSC",   nativeSymbol: "BNB",   accent: "var(--fifa-yellow)",  logoColor: "#F0B90B" },
  { id: 43114, key: "avalanche", name: "Avalanche",  short: "AVAX",  nativeSymbol: "AVAX",  accent: "var(--fifa-orange)",  logoColor: "#E84142" },
];

/** Zero-address sentinel for native tokens per LI.FI convention. */
export const NATIVE_TOKEN = "0x0000000000000000000000000000000000000000";

/** Curated USDC per chain — used as default "to" token. */
export const USDC_BY_CHAIN: Record<SupportedChainId, string> = {
  1:     "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  8453:  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  42161: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  10:    "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
  137:   "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  56:    "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  43114: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
};

export const DEFAULT_SETTLEMENT_CHAIN: SupportedChainId = 8453; // Base

export function getChain(id: number): TransferChain | undefined {
  return CHAINS.find((c) => c.id === id);
}

/** Format big-number wei to human string, e.g. 1_234_500_000_000_000_000n → "1.2345" */
export function formatUnits(value: bigint, decimals: number, maxFrac = 6): string {
  const whole = value / 10n ** BigInt(decimals);
  const frac = value % 10n ** BigInt(decimals);
  let fracStr = frac.toString().padStart(decimals, "0").slice(0, maxFrac);
  fracStr = fracStr.replace(/0+$/, "");
  return fracStr ? `${whole}.${fracStr}` : `${whole}`;
}

export function parseUnits(amount: string, decimals: number): bigint {
  const [whole = "0", frac = ""] = amount.split(".");
  const padded = (frac + "0".repeat(decimals)).slice(0, decimals);
  return BigInt(whole) * 10n ** BigInt(decimals) + BigInt(padded || "0");
}
