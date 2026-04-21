"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAccount } from "wagmi";

import { TransferHero } from "@/components/transfer/TransferHero";
import { AmountCard } from "@/components/transfer/AmountCard";
import { SwapDirectionsButton } from "@/components/transfer/SwapDirectionsButton";
import { RouteCard } from "@/components/transfer/RouteCard";
import { ProgressCard } from "@/components/transfer/ProgressCard";
import { SuccessCard } from "@/components/transfer/SuccessCard";
import { PaulCommentary } from "@/components/transfer/PaulCommentary";
import { WalletBadgeClient } from "@/components/layout/WalletBadgeClient";

import {
  useTransfer,
  type TransferPhase,
} from "@/lib/store/transferStore";
import { scoutRoutes, executeRoute } from "@/lib/transfer/routes";
import { parseUnits, formatUnits, getChain } from "@/lib/transfer/constants";

export default function TransferBodyRoot() {
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <TransferHero />
      <TransferBody />
    </div>
  );
}

function TransferBody() {
  const {
    fromChainId,
    toChainId,
    fromToken,
    toToken,
    amount,
    routes,
    selectedRoute,
    phase,
    error,
    successAmount,
    lastTxHash,
    commentary,
    setAmount,
    setFromChain,
    setToChain,
    setFromToken,
    setToToken,
    setRoutes,
    selectRoute,
    setPhase,
    setError,
    setSuccess,
    reset,
    swapDirections,
  } = useTransfer();

  const { address, isConnected } = useAccount();
  const selectedIndex = useMemo(() => {
    return Math.max(0, routes.findIndex((r) => r === selectedRoute));
  }, [routes, selectedRoute]);

  // Debounced route scouting whenever the inputs change
  const [localErr, setLocalErr] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (phase === "approving" || phase === "bridging" || phase === "settling" || phase === "done") {
      return;
    }
    const amtNum = Number(amount);
    if (!amount || !Number.isFinite(amtNum) || amtNum <= 0) {
      setRoutes([]);
      setPhase("idle");
      setLocalErr(undefined);
      return;
    }
    let cancelled = false;
    setPhase("scouting", "Scouting the best route…");
    setLocalErr(undefined);
    const t = setTimeout(async () => {
      try {
        const wei = parseUnits(amount, fromToken.decimals).toString();
        const r = await scoutRoutes({
          fromChainId,
          toChainId,
          fromToken: fromToken.address,
          toToken: toToken.address,
          fromAmount: wei,
          fromAddress: address,
        });
        if (cancelled) return;
        if (!r.length) {
          setRoutes([]);
          setLocalErr("No route available. Try a different pair or amount.");
          setPhase("idle");
          return;
        }
        setRoutes(r as any[]);
        setPhase("route_ready", "Sharp line. Tap it and we go.");
      } catch (e) {
        if (cancelled) return;
        setRoutes([]);
        setLocalErr((e as Error).message || "Couldn't scout a route.");
        setPhase("idle");
      }
    }, 450);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [
    amount,
    fromChainId,
    toChainId,
    fromToken.address,
    fromToken.decimals,
    toToken.address,
    address,
    setRoutes,
    setPhase,
    phase,
  ]);

  const handleExecute = useCallback(async () => {
    if (!selectedRoute) return;
    if (!isConnected) {
      setError("Connect a wallet to continue.");
      return;
    }
    try {
      setPhase("approving", "Signing one form. Not the fun one yet.");
      await executeRoute(selectedRoute, (r: any) => {
        const step = r?.steps?.find((s: any) => s.execution);
        const execStatus = step?.execution?.status;
        if (execStatus === "PENDING") setPhase("bridging", "Midfield battle. Nearly through.");
        if (execStatus === "RESUMED") setPhase("settling", "Customs. Paperwork. Nearly through.");
        if (execStatus === "FAILED") {
          setError(step?.execution?.process?.find((p: any) => p.error)?.error?.message ?? "Route failed.");
        }
      });
      const finalAmount = formatUnits(
        BigInt(selectedRoute.toAmount ?? "0"),
        selectedRoute.toToken?.decimals ?? 18,
        4
      );
      const lastStep = selectedRoute.steps?.[selectedRoute.steps.length - 1];
      const tx = lastStep?.execution?.process?.find((p: any) => p.txHash)?.txHash ?? "";
      setSuccess(finalAmount, tx);
    } catch (e) {
      setError((e as Error).message || "Transfer failed.");
    }
  }, [selectedRoute, isConnected, setPhase, setError, setSuccess]);

  const toChain = getChain(toChainId);
  const expectedOut = selectedRoute?.toAmount
    ? formatUnits(
        BigInt(selectedRoute.toAmount),
        selectedRoute.toToken?.decimals ?? toToken.decimals,
        4
      )
    : "";

  const canExecute = phase === "route_ready" && !!selectedRoute && !!address;

  return (
    <div className="grid gap-5 md:gap-6 lg:grid-cols-[1fr_380px]">
      {/* Left: the swap form */}
      <div className="flex flex-col gap-3">
        <AmountCard
          label="You pay"
          accent="var(--fifa-teal)"
          chainId={fromChainId}
          token={fromToken}
          amount={amount}
          onAmountChange={setAmount}
          onPickChain={setFromChain}
          onPickToken={setFromToken}
        />
        <SwapDirectionsButton onSwap={swapDirections} />
        <AmountCard
          label="You receive"
          accent="var(--fifa-orange)"
          chainId={toChainId}
          token={toToken}
          amount={expectedOut}
          readOnly
          placeholder="0"
          onPickChain={setToChain}
          onPickToken={setToToken}
        />

        {localErr && (
          <div
            className="rounded-xl border border-coral/40 p-3 text-xs text-t2"
            style={{ background: "rgba(232,57,44,0.08)" }}
          >
            {localErr}
          </div>
        )}

        {phase === "scouting" && (
          <div className="flex items-center gap-2 text-t3 text-sm justify-center py-2">
            <Loader2 size={16} className="animate-spin" />
            Scouting {routes.length ? `${routes.length} routes` : "the best route"}…
          </div>
        )}

        {routes.length > 0 && (
          <RouteCard
            routes={routes}
            selectedIndex={selectedIndex}
            onSelect={(i) => selectRoute(routes[i])}
          />
        )}

        {(phase === "approving" || phase === "bridging" || phase === "settling" || phase === "error") && (
          <ProgressCard phase={phase} error={error} />
        )}

        {phase === "done" && (
          <SuccessCard
            amountOut={successAmount}
            symbol={toToken.symbol}
            chainName={toChain?.name ?? ""}
            txHash={lastTxHash}
            explorerUrl={lastTxHash ? `https://blockscan.com/tx/${lastTxHash}` : undefined}
            onReset={reset}
          />
        )}

        {/* CTA bar */}
        <div className="sticky bottom-[calc(76px+var(--sa-bottom,0px))] md:static z-30">
          {!isConnected && phase !== "done" ? (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[rgba(245,208,32,0.35)] bg-[rgba(245,208,32,0.06)] px-4 py-3">
              <div>
                <div className="label text-gold">Wallet required</div>
                <div className="text-xs text-t2">
                  Connect a wallet to sign and send your transfer.
                </div>
              </div>
              <WalletBadgeClient />
            </div>
          ) : phase !== "done" ? (
            <ExecuteButton
              phase={phase}
              canExecute={canExecute}
              label={expectedOut ? `${expectedOut} ${toToken.symbol}` : ""}
              onClick={handleExecute}
            />
          ) : null}
        </div>
      </div>

      {/* Right: Paul commentary + info */}
      <aside className="flex flex-col gap-3 order-first lg:order-last">
        <PaulCommentary phase={phase} override={commentary ?? undefined} />
        <div
          className="rounded-xl border border-hair p-3 text-[11px] text-t3"
          style={{ background: "rgba(10,6,21,0.4)" }}
        >
          <div className="label mb-1" style={{ color: "var(--fifa-teal)" }}>
            How it works
          </div>
          <ol className="list-decimal list-inside space-y-1 text-t2 text-xs">
            <li>Pick what you have + what you want on which chain.</li>
            <li>Paul scouts the best route across 20+ bridges and 30+ DEXes.</li>
            <li>Tap SIGN & SEND — one signature covers the whole journey.</li>
            <li>Funds land on the destination chain, ready to bet.</li>
          </ol>
        </div>
      </aside>
    </div>
  );
}

function ExecuteButton({
  phase,
  canExecute,
  label,
  onClick,
}: {
  phase: TransferPhase;
  canExecute: boolean;
  label: string;
  onClick: () => void;
}) {
  const busy = phase === "approving" || phase === "bridging" || phase === "settling";
  const copy =
    phase === "idle"
      ? "Enter an amount"
      : phase === "scouting"
      ? "Scouting route…"
      : phase === "route_ready"
      ? (label ? `SIGN & SEND · ${label}` : "SIGN & SEND")
      : phase === "approving"
      ? "Approving…"
      : phase === "bridging"
      ? "Bridging…"
      : phase === "settling"
      ? "Settling…"
      : phase === "error"
      ? "Retry"
      : "Continue";
  return (
    <button
      type="button"
      className="btn-3d w-full"
      disabled={!canExecute && !busy && phase !== "error"}
      onClick={onClick}
    >
      {copy}
    </button>
  );
}
