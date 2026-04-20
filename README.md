# World Cup Inu — Dashboard

**Pari-mutuel betting & prediction markets for the FIFA World Cup 2026, fronted by Paul the Oracle.**

- Next.js 16 App Router · React 19 · TypeScript strict
- Tailwind v4 with `@theme` tokens
- shadcn/ui, Framer Motion 11, TanStack Query 5, Zustand, Vaul, Embla
- Serwist PWA — installable, offline-ready, background-sync bet queue
- wagmi v2 + RainbowKit — mobile wallet connectors
- Supabase for fixtures, pools, bets, cope cards, Merkle epochs
- Generated programmatically via the Vercel **v0 Platform API**

---

## Quick start

```bash
# 1. Install deps (wagmi/RainbowKit requires --legacy-peer-deps)
npm install --legacy-peer-deps

# 2. Populate .env.local from .env.example
cp .env.example .env.local
# …then fill in keys (see TODO.md)

# 3. Generate PWA icons from /public/assets/logo.png (only needs re-running if logo changes)
npm run generate:icons

# 4. Extract the 48 country flag SVGs from the prototype
npm run generate:flags

# 5. Dev server (webpack, Serwist disabled in dev)
npm run dev

# 6. Production build (generates /public/sw.js)
npm run build
npm run start
```

Open <http://localhost:3000>.

---

## Architecture

```
app/
  (app)/          ← authenticated dashboard routes under AppShell
  (marketing)/    ← public docs
  admin/          ← operator panel (role-gated)
  api/            ← Next route handlers (fixtures, odds, oracle, pools, bets, SSE…)
  offline/        ← PWA offline fallback
  sw.ts           ← Serwist service worker source
  globals.css     ← DESIGN SYSTEM — tokens + Tailwind @theme + component classes
  layout.tsx      ← fonts, PWA meta, body backgrounds

components/
  layout/         ← TopHeader, LeftSidebar, PeekTentacle, TaxTicker, + mobile/
  cards/          ← PaulHeroCard, NextMatchCard, MatchCard
  betting/        ← BetSlip (md+), BetSheet (Vaul mobile), OutcomeBtn, StakeInput
  paul/           ← PaulStudio, UpTentacle, BaseTentacle, SoccerBall
  oracle/         ← OraclePick, ConfidenceBar, PickBreakdown, ConfessionCarousel
  cope/           ← CopeCard, CopeFeed, RoastQueue
  leaderboard/    ← LeaderboardTabs, LeaderboardTable, BadgeChip
  toasts/         ← Win/Loss/Contrarian/EmptyState
  pwa/            ← InstallPrompt (iOS + Android), OfflineBanner, UpdateAvailableToast
  shared/         ← Countdown, CountUp, Sparkline, PoolBar, FlagRect, PullToRefresh
  ui/             ← shadcn primitives (themed to our tokens)

lib/
  api/            ← external: api-football, odds-api, pinnacle, polymarket, etherscan
  oracle/         ← elo, dixon-coles, devig, paul (ensemble)
  pool/           ← parimutuel math (zero-vig)
  db/             ← schema.sql, Supabase client
  web3/           ← wagmi config, contract ABIs, Merkle helpers
  hooks/          ← useFixtures, useOracle, useBetSlip, useWallet, useLivePool
  store/          ← zustand slices (bet slip, toasts, wallet)
  data/           ← teams, team colors, team Elo seed
  utils/          ← cn

scripts/
  build-dashboard.ts   ← v0 orchestrator (reads config/chats.yaml)
  seed-fixtures.ts     ← one-shot API-Football → Supabase
  backtest-oracle.ts   ← Brier-score rolling backtest on WC18+WC22+Euro24
  generate-icons.mjs   ← PWA icon set from logo.png
  extract-flags.mjs    ← flags.jsx → 48 × public/flags/*.svg
```

---

## Design system

All tokens live in `app/globals.css` under `@theme`. Use Tailwind utilities — **never hardcode hex**:

- `bg-bg-deep`, `text-t1`, `border-hair-strong`, `text-fifa-teal`, `bg-grp-d`, etc.
- `.display`, `.display-cond`, `.mono`, `.label` for typography.
- `.card` + `.card-accent-bar` (set `--card-accent`) for premium cards.
- `.btn-3d`, `.btn-3d-color`, `.btn-outcome` for the chunky 3D buttons.
- `.chip`, `.chip-gold`, `.chip-live` for pills.
- `.stat-tile`, `.pool-seg`, `.sidebar-item`, `.group-tile` for structural pieces.

Mobile-first at 375 px; scales up to 1920 px. 48×48 min tap target on everything.

---

## PWA

Installable on iOS + Android. Offline fallback at `/offline`. Background-sync queues bet submissions.

**Install on iPhone:** Safari → Share → Add to Home Screen.
**Install on Android:** Chrome shows a native install prompt after ~30 s on site, or use the in-app "Install WCI" button.

Service worker strategies (see `app/sw.ts`):
- `NetworkFirst` for `/api/*` (5 s timeout → cache)
- `StaleWhileRevalidate` for documents
- `CacheFirst` for `/assets/*`, `/flags/*.svg`, `/icons/*`, fonts

---

## Data APIs

See `TODO.md` for keys. All calls go through `lib/api/*`. Components never hit external APIs directly — they hit `/api/*` in Next.

| API | Purpose | Cost |
|---|---|---|
| API-Football | Fixtures, lineups, live events | $19/mo |
| The Odds API | 3-way reference odds, 60 books | $30/mo |
| RapidAPI Pinnacle | Sharp-book benchmark | ~$20/mo |
| Polymarket Gamma | Prediction-market sentiment | free |
| Azuro subgraph | On-chain peer comparison | free |
| Etherscan | Tax-ticker counter | free |

---

## Oracle

`lib/oracle/paul.ts` ensembles three sources:

```
P_Paul = 0.40 · P_DixonColes + 0.40 · P_Pinnacle_devig + 0.20 · P_Polymarket
```

- **Dixon-Coles** is a Poisson match-outcome model with low-score correction (ρ=-0.1), λ seeded from current Elo diff.
- **Pinnacle** is proportionally de-vigged (`devig.ts`).
- **Polymarket** is CLOB midprice on per-match conditions when available.
- Weights auto-rebalance after each matchday via Brier-score calibration (`scripts/backtest-oracle.ts`).

Confidence displayed 0–99; <40 → "Too close to call"; >75 → "Lock" badge.

---

## Re-running v0

The dashboard was generated by `scripts/build-dashboard.ts` consuming `config/chats.yaml`. To re-run a single chat:

```bash
npm run v0:build -- A        # just Chat A
npm run v0:build -- --force  # re-run completed chats
npm run v0:build             # all pending
```

State persists to `.v0-state.json` so runs are resumable.

**Protected files:** `scripts/build-dashboard.ts::PROTECTED_PATHS` — v0 cannot overwrite `package.json`, `next.config.ts`, `app/globals.css`, `app/layout.tsx`, `app/sw.ts`, `public/manifest.webmanifest`, or anything under `public/assets/`, `public/flags/`, `public/icons/`, `scripts/`, `config/`, `lib/db/`.

---

## Next steps

See [`TODO.md`](./TODO.md) for everything that needs human action (API keys, contract deployment, PWA install verification, legal copy).
