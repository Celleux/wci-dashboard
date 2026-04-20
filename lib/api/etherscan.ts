"use server";

/**
 * Etherscan helper — used by TaxTicker to read the cumulative 3/3 token tax
 * routed to the rewards + ecosystem wallets.
 * Falls back to zeros when the key isn't set so the UI stays legible.
 */

const BASE = "https://api.etherscan.io/api";

export interface TaxTickerData {
  rewardsThisWeek: number;
  ecosystemThisWeek: number;
  totalRouted: number;
  updatedAt: string;
}

const ZERO: TaxTickerData = {
  rewardsThisWeek: 0,
  ecosystemThisWeek: 0,
  totalRouted: 0,
  updatedAt: new Date().toISOString(),
};

function key() {
  return process.env.ETHERSCAN_API_KEY ?? "";
}
function rewardsWallet() {
  return process.env.NEXT_PUBLIC_REWARDS_WALLET ?? "";
}
function ecosystemWallet() {
  return process.env.NEXT_PUBLIC_ECOSYSTEM_WALLET ?? "";
}

async function ethBalance(addr: string): Promise<number> {
  if (!addr || !key()) return 0;
  try {
    const u = new URL(BASE);
    u.searchParams.set("module", "account");
    u.searchParams.set("action", "balance");
    u.searchParams.set("address", addr);
    u.searchParams.set("tag", "latest");
    u.searchParams.set("apikey", key());
    const r = await fetch(u.toString(), {
      // @ts-ignore
      next: { revalidate: 60 },
    });
    if (!r.ok) return 0;
    const body = (await r.json()) as { status: string; result: string };
    if (body.status !== "1") return 0;
    return Number(body.result) / 1e18;
  } catch {
    return 0;
  }
}

/**
 * Return the tax ticker snapshot. Weekly deltas require a nightly cron snapshot;
 * for the placeholder phase we only surface cumulative totals.
 */
export async function getTaxTicker(): Promise<TaxTickerData> {
  try {
    const [r, e] = await Promise.all([
      ethBalance(rewardsWallet()),
      ethBalance(ecosystemWallet()),
    ]);
    return {
      rewardsThisWeek: 0,
      ecosystemThisWeek: 0,
      totalRouted: r + e,
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return ZERO;
  }
}
