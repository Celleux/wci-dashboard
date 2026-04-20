import Link from "next/link";
import { AccentCard } from "@/components/shared/AccentCard";
import { Chip } from "@/components/shared/Chip";
import { TeamTile } from "@/components/shared/TeamTile";
import { MOCK_FINAL } from "@/lib/data/mocks";

export function MyBetsPreview() {
  return (
    <AccentCard accent="var(--fifa-teal)" className="p-5">
      <header className="mb-3 flex items-center justify-between">
        <h2 className="card-title">My Bets · recent</h2>
        <Link href="/my-bets" className="label hover:text-gold">
          All history →
        </Link>
      </header>
      <ul className="flex flex-col gap-2">
        {MOCK_FINAL.map((m) => (
          <li
            key={m.id}
            className="flex items-center gap-3 rounded-lg px-2 py-2 border border-[var(--hair)]"
          >
            <div className="flex items-center gap-1 min-w-0 flex-1">
              <TeamTile code={m.teams[0]} size="sm" stacked={false} />
              <span className="mono text-t3 text-xs">vs</span>
              <TeamTile code={m.teams[1]} size="sm" stacked={false} />
            </div>
            <span className="mono text-[11px] text-t3">
              {m.score?.[0]}–{m.score?.[1]}
            </span>
            <Chip kind={m.result === "W" ? "gold" : "default"}>
              {m.result === "W" ? `+${(m.payout ?? 0).toFixed(2)}` : "—"} USDC
            </Chip>
          </li>
        ))}
      </ul>
    </AccentCard>
  );
}
