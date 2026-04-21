import { ChibiImage } from "@/components/shared/ChibiImage";
import { AccentCard } from "@/components/shared/AccentCard";
import { Chip } from "@/components/shared/Chip";
import { FlagRect } from "@/components/shared/FlagRect";
import type { TeamCode } from "@/lib/data/teams";

export const metadata = { title: "Cope Cards" };

interface Cope {
  id: number;
  handle: string;
  country: TeamCode;
  team: TeamCode;
  amount: number;
  roast: string;
  accent: string;
  mintedAgo: string;
}

const CARDS: Cope[] = [
  { id: 1, handle: "pepecopa",    country: "ARG", team: "FRA", amount: 180,  accent: "var(--fifa-orange)", mintedAgo: "2m ago",  roast: "Bet on France to score first. They scored eighth." },
  { id: 2, handle: "orange_blob", country: "NED", team: "JPN", amount: 210,  accent: "var(--fifa-purple)", mintedAgo: "18m ago", roast: "Followed the herd. The herd doesn't know." },
  { id: 3, handle: "drunk_uncle", country: "ENG", team: "CRO", amount: 95,   accent: "var(--fifa-teal)",   mintedAgo: "1h ago",  roast: "Croatia's midfield ate you alive. Again." },
  { id: 4, handle: "chart_crimes", country: "GER", team: "ECU", amount: 320, accent: "var(--fifa-magenta)", mintedAgo: "2h ago", roast: "Paul told you not to. You did anyway. Paul was right." },
  { id: 5, handle: "ilovemessi",  country: "ARG", team: "ALG", amount: 55,   accent: "var(--fifa-red)",    mintedAgo: "3h ago",  roast: "Algeria covered. You covered your eyes." },
  { id: 6, handle: "degenwarlock", country: "USA", team: "PAR", amount: 410, accent: "var(--fifa-lime)",   mintedAgo: "4h ago",  roast: "Went heavy on Paraguay. Heavy was the word." },
  { id: 7, handle: "icantstop",   country: "KOR", team: "CZE", amount: 125,  accent: "var(--fifa-blue)",   mintedAgo: "5h ago",  roast: "Parlay of 5. One leg was KOR. You know the rest." },
  { id: 8, handle: "0xCope",      country: "USA", team: "TUR", amount: 275,  accent: "var(--fifa-yellow)", mintedAgo: "6h ago",  roast: "LIVE draw turned into a loss. Classic." },
];

const FILTERS = ["All", "Today", "This week", "Mine"] as const;

export default function CopePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <AccentCard accent="var(--fifa-orange)" className="p-6 overflow-visible">
        <div className="grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
          <ChibiImage src="/assets/chibi_jars.png" size={180} glow="rgba(255,122,31,0.5)" />
          <div>
            <Chip>ERC-721A · minted on-chain</Chip>
            <h1 className="display text-4xl md:text-5xl mt-2 leading-none">
              Cope Cards
            </h1>
            <p className="text-t2 mt-2 max-w-xl">
              Auto-minted for every losing bet. Wallet handle + team + amount +
              Paul's one-line roast. Share to X or TikTok in one tap and get
              roasted live on Paul's ledger stream.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-center gap-2">
            <div className="mono text-5xl display" style={{ color: "var(--fifa-orange)" }}>
              1,284
            </div>
            <div className="label">minted · all time</div>
          </div>
        </div>
      </AccentCard>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {FILTERS.map((f, i) => (
            <button
              key={f}
              className="label px-3 py-2 rounded-lg border"
              style={{
                borderColor: i === 0 ? "rgba(245,208,32,0.35)" : "var(--hair)",
                background: i === 0 ? "rgba(245,208,32,0.12)" : "transparent",
                color: i === 0 ? "var(--gold)" : "var(--t2)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <Chip kind="live">3 mints in the last minute</Chip>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {CARDS.map((c) => (
          <AccentCard key={c.id} accent={c.accent} className="p-4">
            <header className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FlagRect code={c.country} width={20} height={13} />
                <span className="mono text-[11px] text-t2">{c.handle}</span>
              </div>
              <span className="mono text-[10px] text-t3">{c.mintedAgo}</span>
            </header>

            <div
              className="rounded-xl p-4 mb-3 relative overflow-hidden"
              style={{
                background: `linear-gradient(180deg, ${c.accent}33, rgba(10,6,21,0.9))`,
                border: `1px solid ${c.accent}66`,
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  right: -30,
                  bottom: -20,
                  width: 110,
                  height: 110,
                  opacity: 0.18,
                  background: `radial-gradient(circle, ${c.accent}, transparent 70%)`,
                  filter: "blur(20px)",
                }}
              />
              <div className="label mb-1" style={{ color: c.accent }}>
                Backed
              </div>
              <div className="flex items-center gap-2 mb-3">
                <FlagRect code={c.team} width={28} height={18} />
                <span className="display text-lg">{c.team}</span>
              </div>
              <div className="label mb-1" style={{ color: c.accent }}>
                Lost
              </div>
              <div
                className="display mono text-2xl tabular-nums"
                style={{ color: c.accent }}
              >
                ${c.amount}
              </div>
            </div>

            <blockquote className="text-t2 text-xs italic mb-3">
              &ldquo;{c.roast}&rdquo; — Paul
            </blockquote>

            <div className="flex gap-2">
              <button
                type="button"
                className="label px-3 py-2 rounded-lg border border-hair flex-1 hover:bg-white/5"
              >
                Share on X
              </button>
              <button
                type="button"
                className="label px-3 py-2 rounded-lg border border-hair flex-1 hover:bg-white/5"
              >
                TikTok
              </button>
            </div>
          </AccentCard>
        ))}
      </div>
    </div>
  );
}
