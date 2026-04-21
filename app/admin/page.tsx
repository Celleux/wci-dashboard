import { ChibiImage } from "@/components/shared/ChibiImage";
import { AccentCard } from "@/components/shared/AccentCard";
import { Chip } from "@/components/shared/Chip";

export const metadata = { title: "Operator · Admin" };

const OPS = [
  {
    label: "Markets",
    accent: "var(--fifa-teal)",
    rows: [
      { k: "Live fixtures", v: "104" },
      { k: "Open pools", v: "42" },
      { k: "Settled this week", v: "18" },
    ],
  },
  {
    label: "Paul",
    accent: "var(--fifa-magenta)",
    rows: [
      { k: "Signed picks (24h)", v: "6" },
      { k: "Brier (last 30)", v: "0.213" },
      { k: "Keypair status", v: "OK" },
    ],
  },
  {
    label: "Tax router",
    accent: "var(--gold)",
    rows: [
      { k: "Rewards balance", v: "18.42 ETH" },
      { k: "Ecosystem balance", v: "18.42 ETH" },
      { k: "Last sweep", v: "Sun 23:00 UTC" },
    ],
  },
];

const ACTIONS = [
  { label: "Sweep rewards → WETH", accent: "var(--gold)" },
  { label: "Publish Merkle root", accent: "var(--fifa-lime)" },
  { label: "Freeze outcomes · admin kill", accent: "var(--coral)" },
  { label: "Trigger Paul confession", accent: "var(--fifa-magenta)" },
];

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero — operator gate */}
      <AccentCard accent="var(--coral)" className="p-6 overflow-visible">
        <div className="grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
          <ChibiImage
            src="/assets/chibi_jars.png"
            size={170}
            glow="rgba(232,57,44,0.55)"
          />
          <div>
            <Chip kind="gold">Restricted · multisig only</Chip>
            <h1 className="display text-4xl md:text-5xl mt-2 leading-none">
              Operator Panel
            </h1>
            <p className="text-t2 mt-2 max-w-xl">
              Only wallets in the WCI26 ops multisig can take destructive
              actions here. Connect a signer to unlock sweeps, Merkle roots,
              emergency freezes, and Paul's confession queue.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <div
              className="mono text-[11px] uppercase tracking-[0.2em]"
              style={{ color: "var(--coral)" }}
            >
              LOCKED
            </div>
            <div
              aria-hidden
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(180deg, rgba(232,57,44,0.22), rgba(143,31,26,0.28))",
                border: "1px solid rgba(232,57,44,0.5)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.12), 0 0 24px -6px var(--coral)",
              }}
            >
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden>
                <path
                  d="M6 10V8a6 6 0 1 1 12 0v2m-9 4h6m-9-4h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1z"
                  stroke="var(--coral)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </AccentCard>

      {/* Stats grid */}
      <section
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
      >
        {OPS.map((o) => (
          <AccentCard key={o.label} accent={o.accent} className="p-5">
            <header className="mb-3 flex items-center justify-between">
              <h2 className="card-title">{o.label}</h2>
              <span
                className="mono text-[10px] uppercase tracking-[0.16em]"
                style={{ color: o.accent }}
              >
                Read-only
              </span>
            </header>
            <dl className="flex flex-col gap-2">
              {o.rows.map((r) => (
                <div
                  key={r.k}
                  className="flex items-center justify-between rounded-xl border border-hair bg-[rgba(10,6,21,0.35)] px-3 py-2"
                >
                  <dt className="label">{r.k}</dt>
                  <dd
                    className="mono tabular-nums text-sm font-bold"
                    style={{ color: o.accent }}
                  >
                    {r.v}
                  </dd>
                </div>
              ))}
            </dl>
          </AccentCard>
        ))}
      </section>

      {/* Action queue (gated) */}
      <AccentCard accent="var(--fifa-magenta)" className="p-5">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="card-title">Privileged actions</h2>
            <p className="text-t3 text-xs mt-1">
              Every action is logged on-chain and requires 3-of-5 multisig.
            </p>
          </div>
          <Chip>Connect signer →</Chip>
        </header>

        <ul className="grid gap-3 sm:grid-cols-2">
          {ACTIONS.map((a) => (
            <li
              key={a.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-hair bg-[rgba(10,6,21,0.4)] px-4 py-3"
              style={{ borderLeft: `3px solid ${a.accent}` }}
            >
              <span className="display text-sm">{a.label}</span>
              <button
                type="button"
                disabled
                className="tab-btn"
                aria-label={`${a.label} — locked`}
                title="Locked — connect an ops multisig signer"
              >
                LOCKED
              </button>
            </li>
          ))}
        </ul>
      </AccentCard>

      <p className="text-t4 text-xs mono text-center">
        Wire auth from{" "}
        <code className="text-t3">lib/web3/auth.ts</code> — drop this file
        when the signer check is in place.
      </p>
    </div>
  );
}
