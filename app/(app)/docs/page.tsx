import { ChibiImage } from "@/components/shared/ChibiImage";
import { AccentCard } from "@/components/shared/AccentCard";
import { Chip } from "@/components/shared/Chip";

export const metadata = { title: "Docs" };

const Q: { q: string; a: string; accent: string }[] = [
  {
    q: "How does the pari-mutuel pool work?",
    a:
      "Every USDC stake goes into a pool, split across home / draw / away. When the match settles, the entire losing side's stake is redistributed to the winning side pro-rata. No house edge, no protocol skim on bets. The 0% marketing line is literal.",
    accent: "var(--fifa-teal)",
  },
  {
    q: "What is the 3/3 tax?",
    a:
      "Every buy or sell of $WCI on Uniswap routes 3% to a rewards pool and 3% to an ecosystem treasury. Wallet-to-wallet transfers are untaxed. The rewards pool is swapped to WETH every Sunday and dropped to 100K+ holders via Merkle.",
    accent: "var(--gold)",
  },
  {
    q: "Who is Paul?",
    a:
      "Paul the Oracle is a 3D-rigged octopus with a voice clone, an ECDSA keypair, and a thermostat for the tournament. He posts signed picks on-chain at T−60 before each kickoff. His record is public. When he's wrong he writes a Confession.",
    accent: "var(--fifa-magenta)",
  },
  {
    q: "Cope Cards — what are they?",
    a:
      "ERC-721A NFTs auto-minted to your wallet when a bet loses. They include a Paul roast tailored to your bet. Gas is low, minting is free, sharing is one tap.",
    accent: "var(--fifa-orange)",
  },
  {
    q: "Paul's Pocket · what does 100K WCI get me?",
    a:
      "Holding 100K WCI (float-priced, ≈$500 at launch) turns on a 2× winnings multiplier (paid from non-holders), weekly Merkle rewards, and auto-follow of Paul's picks at T−60.",
    accent: "var(--fifa-lime)",
  },
  {
    q: "Geofence?",
    a:
      "We enforce Cloudflare IP geofence on US, UK, DE, AU, IT, FR for the dashboard. The smart contracts are permissionless; the frontend is the gate. No KYC, ever.",
    accent: "var(--fifa-blue)",
  },
];

export default function DocsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero */}
      <AccentCard accent="var(--fifa-violet)" className="p-6 overflow-visible">
        <div className="grid items-center gap-6 md:grid-cols-[auto_1fr]">
          <ChibiImage src="/assets/chibi_tarot.png" size={170} glow="rgba(139,71,214,0.55)" />
          <div>
            <Chip>Handbook v5</Chip>
            <h1 className="display text-4xl md:text-5xl mt-2 leading-none">
              How it works
            </h1>
            <p className="text-t2 mt-2 max-w-xl">
              A five-minute read covers the pool math, the 3/3 token, Paul's
              oracle, cope cards, Merkle rewards, and the geofence.
            </p>
          </div>
        </div>
      </AccentCard>

      <div className="grid gap-4 md:grid-cols-2">
        {Q.map((item) => (
          <AccentCard key={item.q} accent={item.accent} className="p-5">
            <h2 className="display text-lg mb-2">{item.q}</h2>
            <p className="text-t2 text-sm leading-relaxed">{item.a}</p>
          </AccentCard>
        ))}
      </div>
    </div>
  );
}
