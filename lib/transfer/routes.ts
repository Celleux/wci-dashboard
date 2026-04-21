/**
 * Thin wrapper around the LI.FI SDK — route scouting, execution, token lists.
 * All methods lazy-import the SDK so the server bundle stays slim.
 */

import { initLifi } from "./lifi-client";

export interface RouteQuery {
  fromChainId: number;
  toChainId: number;
  fromToken: string;
  toToken: string;
  fromAmount: string; // wei as decimal string
  fromAddress?: string;
  slippage?: number; // 0.005 = 0.5%
}

export async function scoutRoutes(q: RouteQuery) {
  await initLifi();
  const { getRoutes } = await import("@lifi/sdk");
  const { routes } = await getRoutes({
    fromChainId: q.fromChainId,
    toChainId: q.toChainId,
    fromTokenAddress: q.fromToken,
    toTokenAddress: q.toToken,
    fromAmount: q.fromAmount,
    fromAddress: q.fromAddress,
    options: {
      order: "RECOMMENDED",
      slippage: q.slippage ?? 0.005,
    },
  });
  return routes;
}

export async function getTokensForChain(chainId: number) {
  await initLifi();
  const { getTokens } = await import("@lifi/sdk");
  const { tokens } = await getTokens({ chains: [chainId] });
  const list = tokens?.[chainId] ?? [];
  // Dedupe by address (LI.FI can return duplicates across providers)
  const byAddr = new Map<string, (typeof list)[number]>();
  for (const t of list) {
    const key = (t.address ?? "").toLowerCase();
    if (!byAddr.has(key)) byAddr.set(key, t);
  }
  return Array.from(byAddr.values());
}

export async function executeRoute(route: any, onUpdate: (r: any) => void) {
  await initLifi();
  const { executeRoute: exec } = await import("@lifi/sdk");
  return await exec(route, { updateRouteHook: onUpdate });
}
