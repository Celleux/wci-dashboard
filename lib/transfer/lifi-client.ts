/**
 * LI.FI SDK client for the Transfer Window.
 * Config is EVM-only and uses our existing wagmi connectors.
 * Creation is lazy so it only runs in the browser (SDK has node-only deps).
 */

let _initialized = false;

export async function initLifi() {
  if (_initialized) return;
  if (typeof window === "undefined") return;

  const { createConfig, EVM } = await import("@lifi/sdk");
  const { getWalletClient, switchChain } = await import("@wagmi/core");
  const { wagmiConfig } = await import("@/lib/web3/wagmi-config");

  createConfig({
    integrator: "worldcupinu",
    providers: [
      EVM({
        getWalletClient: async () => {
          const c = await getWalletClient(wagmiConfig as any);
          if (!c) throw new Error("Connect a wallet first.");
          return c as any;
        },
        switchChain: async (chainId) => {
          await switchChain(wagmiConfig as any, { chainId });
          const c = await getWalletClient(wagmiConfig as any, { chainId });
          if (!c) throw new Error("Could not obtain wallet after chain switch.");
          return c as any;
        },
      }),
    ],
  });

  _initialized = true;
}
