"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getTokensForChain } from "@/lib/transfer/routes";
import type { TokenLite } from "@/lib/store/transferStore";
import { cn } from "@/lib/utils/cn";

interface Props {
  open: boolean;
  onClose: () => void;
  onPick: (t: TokenLite) => void;
  chainId: number;
  current?: TokenLite;
}

const POPULAR_SYMBOLS = ["ETH", "MATIC", "BNB", "AVAX", "USDC", "USDT", "DAI", "WETH", "WBTC", "ARB", "OP"];

export function TokenPicker({ open, onClose, onPick, chainId, current }: Props) {
  const [tokens, setTokens] = useState<TokenLite[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    setQ("");
    (async () => {
      try {
        const list = await getTokensForChain(chainId);
        if (cancelled) return;
        const mapped: TokenLite[] = list
          .filter((t: any) => t.symbol && t.decimals != null)
          .map((t: any) => ({
            address: t.address,
            symbol: t.symbol,
            decimals: t.decimals,
            name: t.name,
            logoURI: t.logoURI,
            priceUSD: t.priceUSD,
          }));
        // Sort: popular first, then by USD price desc (proxy for importance)
        mapped.sort((a, b) => {
          const ap = POPULAR_SYMBOLS.indexOf(a.symbol);
          const bp = POPULAR_SYMBOLS.indexOf(b.symbol);
          if (ap !== bp) return (ap === -1 ? 99 : ap) - (bp === -1 ? 99 : bp);
          return Number(b.priceUSD ?? 0) - Number(a.priceUSD ?? 0);
        });
        setTokens(mapped);
      } catch (e) {
        console.error("token load failed", e);
        setTokens([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, chainId]);

  const filtered = useMemo(() => {
    if (!q.trim()) return tokens.slice(0, 200);
    const s = q.trim().toLowerCase();
    return tokens
      .filter(
        (t) =>
          t.symbol.toLowerCase().includes(s) ||
          (t.name ?? "").toLowerCase().includes(s) ||
          t.address.toLowerCase() === s
      )
      .slice(0, 200);
  }, [q, tokens]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close token picker"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 70,
              background: "rgba(5,3,12,0.55)",
              backdropFilter: "blur(6px)",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Select token"
            initial={{ y: "10%", opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "10%", opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed z-[72] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(440px,92vw)] max-h-[80vh] flex flex-col"
          >
            <div
              className="card flex flex-col max-h-[80vh] overflow-hidden"
              style={{ "--card-accent": "var(--fifa-orange)" } as React.CSSProperties}
            >
              <div className="card-accent-bar" aria-hidden />
              <header className="flex items-center justify-between p-5 pb-3">
                <div>
                  <div className="label">Select token</div>
                  <h3 className="display text-xl mt-1">Pick your coin</h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="w-9 h-9 rounded-full border border-hair flex items-center justify-center text-t2 hover:bg-white/5"
                >
                  <X size={16} />
                </button>
              </header>

              <div className="px-5 pb-3">
                <div
                  className="flex items-center gap-2 rounded-xl border border-hair-strong px-3 py-2"
                  style={{ background: "rgba(10,6,21,0.6)" }}
                >
                  <Search size={16} className="text-t3" />
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by symbol, name, or paste address"
                    className="mono flex-1 bg-transparent text-sm text-t1 outline-none placeholder-t4"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-3 pb-4">
                {loading ? (
                  <div className="flex items-center justify-center py-12 text-t3">
                    <Loader2 size={20} className="animate-spin mr-2" />
                    Loading tokens…
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="text-center py-12 text-t3 text-sm">
                    No tokens match. Paste a contract address to import one.
                  </div>
                ) : (
                  <ul className="flex flex-col gap-1">
                    {filtered.map((t) => {
                      const active =
                        current &&
                        current.address.toLowerCase() === t.address.toLowerCase();
                      return (
                        <li key={`${t.address}-${t.symbol}`}>
                          <button
                            type="button"
                            onClick={() => {
                              onPick(t);
                              onClose();
                            }}
                            className={cn(
                              "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition",
                              active
                                ? "bg-[rgba(245,208,32,0.12)] border border-[rgba(245,208,32,0.3)]"
                                : "hover:bg-white/5 border border-transparent"
                            )}
                            style={{ touchAction: "manipulation" }}
                          >
                            <TokenLogo token={t} />
                            <div className="flex-1 min-w-0">
                              <div
                                className="display text-sm"
                                style={{ color: active ? "var(--gold)" : "var(--t1)" }}
                              >
                                {t.symbol}
                              </div>
                              <div className="mono text-[11px] text-t3 truncate">
                                {t.name ?? t.address.slice(0, 8) + "…"}
                              </div>
                            </div>
                            {t.priceUSD && (
                              <div className="mono text-[11px] text-t3 tabular-nums">
                                ${Number(t.priceUSD).toFixed(2)}
                              </div>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
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
          width: 32,
          height: 32,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
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
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "linear-gradient(180deg, #3a2d6d, #1a1030)",
        color: "var(--t1)",
        fontSize: 11,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        border: "1px solid var(--hair)",
      }}
    >
      {token.symbol.slice(0, 3)}
    </span>
  );
}
