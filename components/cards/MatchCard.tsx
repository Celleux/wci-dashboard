import { AccentCard } from "@/components/shared/AccentCard";
import { Chip } from "@/components/shared/Chip";
import { Countdown } from "@/components/shared/Countdown";
import { PoolBar } from "@/components/shared/PoolBar";
import { TeamTile } from "@/components/shared/TeamTile";
import { GroupTile } from "@/components/shared/GroupTile";
import { OutcomeBtn } from "@/components/betting/OutcomeBtn";
import { teamGroup, TEAM_NAMES, type TeamCode } from "@/lib/data/teams";
import { parimutuelOdds, type PoolSplit } from "@/lib/pool/parimutuel";

export type MatchStatus = "live" | "upcoming" | "final";

interface BaseProps {
  home: TeamCode;
  away: TeamCode;
  pool: PoolSplit;
  md: string;
  venue: string;
}
type Props =
  | ({ status: "live"; minute: number; score: [number, number] } & BaseProps)
  | ({ status: "upcoming"; kickoff: string | Date } & BaseProps)
  | ({ status: "final"; score: [number, number]; result?: "W" | "L" } & BaseProps);

export function MatchCard(props: Props) {
  const { home, away, pool, md, venue, status } = props;
  const group = teamGroup(home);
  const odds = parimutuelOdds(pool);

  const accent =
    status === "live" ? "var(--fifa-red)" :
    status === "upcoming" ? "var(--fifa-teal)" :
    "var(--t3)";

  return (
    <AccentCard accent={accent} className="p-5">
      <header className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Chip>{md}</Chip>
          {group && <GroupTile group={group} size={24} />}
        </div>
        {status === "live" && <Chip kind="live">LIVE · {props.minute}&apos;</Chip>}
        {status === "upcoming" && (
          <Chip kind="gold">
            <Countdown target={(props as any).kickoff} compact />
          </Chip>
        )}
        {status === "final" && (
          <Chip>
            FT · {props.score[0]} – {props.score[1]}
          </Chip>
        )}
      </header>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 mb-3">
        <TeamTile code={home} size="md" stacked />
        {status === "live" || status === "final" ? (
          <div className="display text-2xl tabular-nums">
            {props.score[0]} <span className="text-t3 mx-1">:</span> {props.score[1]}
          </div>
        ) : (
          <span className="display-cond text-xl text-t3">vs</span>
        )}
        <TeamTile code={away} size="md" stacked />
      </div>

      <div className="mb-3 text-center text-[11px] text-t3">
        {TEAM_NAMES[home]} vs {TEAM_NAMES[away]} · {venue}
      </div>

      <PoolBar pool={pool} barOnly={status === "final"} />

      {status !== "final" && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          <OutcomeBtn side="home" label={home} odds={odds.home} accent="var(--fifa-teal)" />
          <OutcomeBtn side="draw" label="DRAW" odds={odds.draw} accent="var(--t3)" />
          <OutcomeBtn side="away" label={away} odds={odds.away} accent="var(--fifa-orange)" />
        </div>
      )}
    </AccentCard>
  );
}
