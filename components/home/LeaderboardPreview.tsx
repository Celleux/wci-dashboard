import Link from "next/link";
import { AccentCard } from "@/components/shared/AccentCard";
import { FlagRect } from "@/components/shared/FlagRect";
import { Chip } from "@/components/shared/Chip";
import { MOCK_LEADERBOARD } from "@/lib/data/mocks";
import { cn } from "@/lib/utils/cn";

export function LeaderboardPreview() {
  const rows = MOCK_LEADERBOARD.slice(0, 6);
  return (
    <AccentCard accent="var(--gold)" className="p-5">
      <header className="mb-3 flex items-center justify-between">
        <h2 className="card-title">Leaderboard</h2>
        <Link href="/leaderboard" className="label hover:text-gold">
          See all →
        </Link>
      </header>
      <ul className="flex flex-col gap-2">
        {rows.map((r) => (
          <li
            key={r.rank}
            className={cn(
              "flex items-center gap-3 rounded-lg px-2 py-2",
              r.you && "bg-[rgba(245,208,32,0.08)] border border-[rgba(245,208,32,0.3)]"
            )}
          >
            <span className="mono w-6 text-right text-t3">{r.rank}</span>
            <FlagRect code={r.country} width={22} height={14} />
            <span className={cn("flex-1 truncate text-sm", r.you ? "text-gold" : "text-t1")}>
              {r.handle}
            </span>
            {r.badge === "oracle" && <Chip kind="gold">Oracle</Chip>}
            {r.badge === "whale" && <Chip>Whale</Chip>}
            <span
              className="mono text-sm tabular-nums"
              style={{ color: r.pnl > 0 ? "var(--fifa-teal)" : "var(--fifa-orange)" }}
            >
              {r.pnl > 0 ? "+" : ""}
              {r.pnl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </li>
        ))}
      </ul>
    </AccentCard>
  );
}
