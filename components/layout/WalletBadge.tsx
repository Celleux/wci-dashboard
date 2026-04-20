"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

/**
 * Wallet badge — real RainbowKit connect button, themed to match our card chrome.
 * When a wallet is connected, shows chain chip + balance + address.
 */
export function WalletBadge() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              opacity: !ready ? 0 : 1,
              pointerEvents: !ready ? "none" : "auto",
              userSelect: !ready ? "none" : "auto",
            }}
          >
            {!connected ? (
              <button
                type="button"
                onClick={openConnectModal}
                className="btn-3d-color"
                style={{
                  "--btn-light": "var(--fifa-purple)",
                  "--btn-dark": "var(--fifa-violet)",
                  "--btn-shadow": "#3b1985",
                  padding: "8px 14px",
                  minHeight: 40,
                  fontSize: 11,
                } as React.CSSProperties}
              >
                CONNECT WALLET
              </button>
            ) : chain?.unsupported ? (
              <button
                type="button"
                onClick={openChainModal}
                className="btn-3d-color"
                style={{
                  "--btn-light": "var(--coral)",
                  "--btn-dark": "var(--coral-deep)",
                  "--btn-shadow": "#6a1814",
                  padding: "8px 14px",
                  minHeight: 40,
                  fontSize: 11,
                } as React.CSSProperties}
              >
                WRONG NETWORK
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={openChainModal}
                  aria-label={`Switch network (current: ${chain.name})`}
                  className="hidden md:flex"
                  style={{
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 10px",
                    height: 36,
                    borderRadius: 999,
                    background:
                      "linear-gradient(180deg, rgba(245,208,32,0.16), rgba(245,208,32,0.04))",
                    border: "1px solid rgba(245,208,32,0.35)",
                    color: "var(--gold)",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 14px -4px var(--gold)",
                  }}
                >
                  {chain.hasIcon && chain.iconUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={chain.iconUrl}
                      alt=""
                      style={{ width: 14, height: 14, borderRadius: "50%" }}
                    />
                  )}
                  {chain.name}
                </button>

                <button
                  type="button"
                  onClick={openAccountModal}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 12px 6px 6px",
                    height: 36,
                    background: "linear-gradient(180deg, #1D1740, #141028)",
                    border: "1px solid var(--hair-strong)",
                    borderRadius: 999,
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.5)",
                    cursor: "pointer",
                  }}
                >
                  <div
                    aria-hidden
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background:
                        "conic-gradient(from 0deg, var(--fifa-red), var(--fifa-yellow), var(--fifa-teal), var(--fifa-purple), var(--fifa-red))",
                      flexShrink: 0,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
                  />
                  <span
                    className="mono"
                    style={{ fontSize: 11, color: "var(--t1)", fontWeight: 700 }}
                  >
                    {account.displayName}
                  </span>
                  {account.displayBalance && (
                    <span
                      className="mono"
                      style={{
                        fontSize: 10,
                        color: "var(--gold)",
                        fontWeight: 700,
                      }}
                    >
                      {account.displayBalance}
                    </span>
                  )}
                  <span
                    aria-hidden
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--fifa-lime)",
                      boxShadow: "0 0 8px var(--fifa-lime)",
                      flexShrink: 0,
                    }}
                  />
                </button>
              </>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
