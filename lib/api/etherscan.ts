"use server";

export interface TaxTickerData {
  rewardsThisWeek: number;
  ecosystemThisWeek: number;
  totalRouted: number;
}

/**
 * Stub — replace with real Etherscan / on-chain reads once contract is live.
 * Returns zeroed values so the TaxTicker renders without errors.
 */
export async function getTaxTicker(): Promise<TaxTickerData> {
  return {
    rewardsThisWeek: 0,
    ecosystemThisWeek: 0,
    totalRouted: 0,
  };
}
