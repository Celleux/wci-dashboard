import type { TransferChain } from "@/lib/transfer/constants";

/** Small circular chain logo pill — colored background + 2-letter short code. */
export function ChainLogo({
  chain,
  size = 24,
}: {
  chain: TransferChain;
  size?: number;
}) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 30% 25%, ${chain.logoColor}, ${chain.logoColor}dd)`,
        color: "#fff",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.4,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.5)",
        flexShrink: 0,
      }}
    >
      {chain.short.slice(0, 3)}
    </span>
  );
}
