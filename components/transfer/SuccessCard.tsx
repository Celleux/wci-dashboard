"use client";

import Link from "next/link";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { AccentCard } from "@/components/shared/AccentCard";
import { Chip } from "@/components/shared/Chip";
import { ChibiImage } from "@/components/shared/ChibiImage";

interface Props {
  amountOut?: string;
  symbol?: string;
  chainName?: string;
  txHash?: string;
  explorerUrl?: string;
  onBet?: () => void;
  onReset?: () => void;
}

export function SuccessCard({
  amountOut,
  symbol = "USDC",
  chainName = "Base",
  txHash,
  explorerUrl,
  onBet,
  onReset,
}: Props) {
  return (
    <AccentCard accent="var(--fifa-lime)" className="p-6 overflow-visible">
      <div className="grid items-center gap-4 md:grid-cols-[auto_1fr]">
        <ChibiImage
          src="/assets/chibi_cheerful.png"
          size={140}
          glow="rgba(159,214,52,0.55)"
        />
        <div>
          <Chip kind="gold" className="mb-2">
            <CheckCircle2 size={12} className="mr-1 inline" /> Settled
          </Chip>
          <h2 className="display text-3xl md:text-4xl leading-tight">
            You now have{" "}
            <span className="mono tabular-nums" style={{ color: "var(--fifa-lime)" }}>
              {amountOut ?? "—"} {symbol}
            </span>
          </h2>
          <p className="text-t2 mt-1 text-sm">
            on <span className="text-fifa-teal font-bold">{chainName}</span>.
            Paul&apos;s queued your stake. Place a bet when you&apos;re ready.
          </p>

          {txHash && (
            <a
              href={explorerUrl ?? `#${txHash}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-xs text-t3 hover:text-t1"
            >
              <ExternalLink size={12} />
              <span className="mono">{txHash.slice(0, 8)}…{txHash.slice(-6)}</span>
            </a>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            <Link href="/matches" onClick={onBet} className="btn-3d">
              FOLLOW PAUL · PLACE A BET
            </Link>
            <button
              type="button"
              onClick={onReset}
              className="label px-4 py-3 rounded-xl border border-hair text-t2 hover:bg-white/5"
            >
              Another transfer
            </button>
          </div>
        </div>
      </div>
    </AccentCard>
  );
}
