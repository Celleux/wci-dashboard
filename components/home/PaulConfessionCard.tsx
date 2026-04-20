import { AccentCard } from "@/components/shared/AccentCard";
import { Chip } from "@/components/shared/Chip";

export function PaulConfessionCard() {
  return (
    <AccentCard accent="var(--fifa-purple)" className="p-5">
      <header className="mb-3 flex items-center justify-between">
        <h2 className="card-title">Paul's Confession</h2>
        <Chip>T−120</Chip>
      </header>
      <blockquote className="text-t1 italic leading-relaxed">
        &ldquo;Honestly? Germany versus Ecuador is the one I&apos;m sweating.
        Keep your stake small. This one&apos;s a drunk-uncle pick — I&apos;m
        50/50 and I don&apos;t love either side.&rdquo;
      </blockquote>
      <div className="mono mt-3 text-[11px] text-t3">— Paul, the octopus</div>
    </AccentCard>
  );
}

export function PaulLedgerCard() {
  return (
    <AccentCard accent="var(--fifa-lime)" className="p-5">
      <header className="mb-3 flex items-center justify-between">
        <h2 className="card-title">Paul's Ledger</h2>
        <Chip kind="gold">Week 3 · 38W / 12L</Chip>
      </header>
      <ul className="flex flex-col gap-2 text-sm text-t2">
        <li className="flex justify-between border-b border-hair pb-2">
          <span>Accuracy across tournament</span>
          <span className="mono text-fifa-lime font-bold">76%</span>
        </li>
        <li className="flex justify-between border-b border-hair pb-2">
          <span>Average pick confidence</span>
          <span className="mono text-t1">68%</span>
        </li>
        <li className="flex justify-between border-b border-hair pb-2">
          <span>Best pick of the week</span>
          <span className="mono text-fifa-lime">BRA vs SCO · 88%</span>
        </li>
        <li className="flex justify-between">
          <span>Hardest cope</span>
          <span className="mono text-coral">USA vs TUR · 48 min</span>
        </li>
      </ul>
    </AccentCard>
  );
}
