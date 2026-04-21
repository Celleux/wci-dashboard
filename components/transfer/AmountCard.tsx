"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ChainLogo } from "./ChainLogo";
import { ChainPicker } from "./ChainPicker";
import { TokenPicker } from "./TokenPicker";
import { getChain, type SupportedChainId } from "@/lib/transfer/constants";
import type { TokenLite } from "@/lib/store/transferStore";

interface Props {
  label: string;
  accent: string;
  chainId: SupportedChainId;
  token: TokenLite;
  amount: string; // only used for "from" side; the "to" side receives computed value
  readOnly?: boolean;
  placeholder?: string;
  onAmountChange?: (a: string) => void;
  onPickChain: (id: SupportedChainId) => void;
  onPickToken: (t: TokenLite) => void;
  usdValue?: string | null;
}

/**
 * Token + chain + amount input card. Shared layout for both FROM and TO.
 */
export function AmountCard({
  label,
  accent,
  chainId,
  token,
  amount,
  readOnly,
  placeholder = "0",
  onAmountChange,
  onPickChain,
  onPickToken,
  usdValue,
}: Props) {
  const chain = getChain(chainId)!;
  const [chainOpen, setChainOpen] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);

  return (
    <div
      className="card p-4 sm:p-5 relative"
      style={{ "--card-accent": accent } as React.CSSProperties}
    >
      <div className="card-accent-bar" aria-hidden />
      <div className="flex items-center justify-between mb-3">
        <span className="label" style={{ color: accent }}>
          {label}
        </span>
        <button
          type="button"
          onClick={() => setChainOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-hair bg-[rgba(10,6,21,0.55)] px-2 py-1 hover:border-hair-strong"
          style={{ minHeight: 28, touchAction: "manipulation" }}
        >
          <ChainLogo chain={chain} size={18} />
          <span className="label" style={{ fontSize: 10 }}>
            {chain.name}
          </span>
          <ChevronDown size={12} className="text-t3" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setTokenOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-hair-strong bg-[rgba(10,6,21,0.55)] px-3 py-2 hover:border-[var(--gold)]"
          style={{ minHeight: 44, touchAction: "manipulation" }}
        >
          <TokenLogo token={token} />
          <span className="display text-base">{token.symbol}</span>
          <ChevronDown size={14} className="text-t3" />
        </button>

        <input
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          value={amount}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={(e) => {
            const v = e.target.value.replace(/[^0-9.]/g, "");
            onAmountChange?.(v);
          }}
          className="mono display flex-1 bg-transparent text-right text-3xl tabular-nums outline-none text-t1 placeholder-t4 min-w-0"
          style={{ minWidth: 0 }}
          aria-label={`${label} amount`}
        />
      </div>

      <div className="flex justify-between items-center mt-2 text-[11px] text-t3">
        <span>
          Balance —{" "}
          <button type="button" className="text-gold hover:underline">
            max
          </button>
        </span>
        <span className="mono">
          {usdValue ? `≈ $${usdValue}` : "—"}
        </span>
      </div>

      <ChainPicker
        open={chainOpen}
        onClose={() => setChainOpen(false)}
        onPick={onPickChain}
        current={chainId}
        label={label}
      />
      <TokenPicker
        open={tokenOpen}
        onClose={() => setTokenOpen(false)}
        onPick={onPickToken}
        chainId={chainId}
        current={token}
      />
    </div>
  );
}

function TokenLogo({ token }: { token: TokenLite }) {
  if (token.logoURI) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={token.logoURI}
        alt=""
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
        }}
      />
    );
  }
  return (
    <span
      aria-hidden
      className="display"
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "linear-gradient(180deg, #3a2d6d, #1a1030)",
        color: "var(--t1)",
        fontSize: 9,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid var(--hair)",
      }}
    >
      {token.symbol.slice(0, 3)}
    </span>
  );
}
