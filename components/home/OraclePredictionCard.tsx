import { AccentCard } from "@/components/shared/AccentCard";
import { Chip } from "@/components/shared/Chip";
import { FlagRect } from "@/components/shared/FlagRect";
import { ConfidenceBar } from "@/components/shared/ConfidenceBar";
import { TEAM_NAMES } from "@/lib/data/teams";

export function OraclePredictionCard() {
  return (
    <AccentCard accent="var(--fifa-magenta)" className="p-5">
      <header className="mb-3 flex items-center justify-between">
        <h2 className="card-title">Oracle Prediction</h2>
        <Chip kind="gold">Paul · 78%</Chip>
      </header>

      <div className="mb-4 flex items-center gap-3">
        <FlagRect code="USA" width={56} height={38} />
        <div>
          <div className="label">Paul's pick</div>
          <div className="display text-xl">{TEAM_NAMES.USA}</div>
          <div className="mono text-[11px] text-t3">vs {TEAM_NAMES.TUR} · tonight</div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <ConfidenceBar
          value={72}
          label="Dixon-Coles model"
          accent="var(--fifa-teal)"
        />
        <ConfidenceBar
          value={81}
          label="Pinnacle de-vigged"
          accent="var(--fifa-blue)"
        />
        <ConfidenceBar
          value={68}
          label="Polymarket"
          accent="var(--fifa-magenta)"
        />
      </div>

      <div className="mt-4 rounded-lg border border-hair bg-[rgba(10,6,21,0.5)] p-3">
        <div className="label mb-1" style={{ color: "var(--fifa-magenta)" }}>
          Ensemble
        </div>
        <div className="mono text-[11px] text-t2 leading-relaxed">
          H <span className="text-t1 font-bold">74%</span> · D{" "}
          <span className="text-t1 font-bold">15%</span> · A{" "}
          <span className="text-t1 font-bold">11%</span>
        </div>
      </div>
    </AccentCard>
  );
}
