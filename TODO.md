# WCI Dashboard — Post-Build TODO

Items that the build orchestrator intentionally **left to the user**. Most require paid API access, a crypto wallet, or a legal decision.

## 1. Obtain API keys and paste into `.env.local`

- [ ] **Vercel v0** (for re-running `npm run v0:build`) — [v0.app/account/api-keys](https://v0.app/account/api-keys)
- [ ] **API-Football** Pro tier $19/mo — [dashboard.api-football.com](https://dashboard.api-football.com)
- [ ] **The Odds API** Starter $30/mo — [the-odds-api.com](https://the-odds-api.com)
- [ ] **RapidAPI Pinnacle Odds** ~$20/mo — [rapidapi.com](https://rapidapi.com) (search "pinnacle-odds")
- [ ] **Etherscan** free — [etherscan.io/apis](https://etherscan.io/apis)
- [ ] **Supabase** project + anon/service keys — [supabase.com](https://supabase.com)
- [ ] **WalletConnect Project ID** — [cloud.walletconnect.com](https://cloud.walletconnect.com)
- [ ] **PostHog key** (optional analytics) — [posthog.com](https://posthog.com)
- [ ] **Sentry DSN** (optional error tracking) — [sentry.io](https://sentry.io)

## 2. Initialize database

After filling in Supabase env:

```bash
# 1. In Supabase SQL editor, run:
cat lib/db/schema.sql
# (paste into the SQL editor)

# 2. Seed fixtures from API-Football (requires API_FOOTBALL_KEY):
npx tsx scripts/seed-fixtures.ts
```

## 3. Smart contract deployment (out of scope for this build)

- [ ] Deploy the ERC-20 tax token (3/3 on buys/sells, immutable at deploy)
- [ ] Deploy the pari-mutuel betting contract (Solidity, OpenZeppelin ReentrancyGuard)
- [ ] Deploy the Cope Card ERC-721A minter
- [ ] Deploy the Merkle Distributor (OpenZeppelin)
- [ ] Seed Uniswap v2 LP and lock with UNCX for 180d
- [ ] Paste all contract addresses into `.env.local`
- [ ] Flip `NEXT_PUBLIC_CHAIN_ID` and wire wagmi to mainnet when ready

## 4. Oracle data sources

- [ ] Decide on oracle strategy (Gate B in the playbook): Chainlink Sports Data Feed vs operator attestation + dispute bond
- [ ] If going with Chainlink: complete publisher-agreement review
- [ ] Wire `app/admin/page.tsx::PickPoster` to the actual signer keypair
- [ ] Tune ensemble weights in `lib/oracle/paul.ts` after the first group-stage matchday (re-run `npm run backtest`)

## 5. Legal & compliance (infra, not code)

- [ ] Cloudflare IP gate at the domain for US/UK/DE/AU/IT/FR geofence
- [ ] Terms of Service copy review
- [ ] Privacy / GDPR copy review
- [ ] Risk disclaimers on `/docs`
- [ ] KYC is intentionally NOT required; document this in legal

## 6. Social / content ops (the human side of Paul)

- [ ] 3D Paul rig commissioning (Blender or Spline), 8-tentacle IK
- [ ] ElevenLabs voice-clone recording (200-line corpus)
- [ ] OBS scene stack (4 scenes: Pick / Confession / Live / Roast)
- [ ] Webhook → TTS → avatar pipeline on Railway or Fly
- [ ] Telegram community seeding — 40 chats (LATAM + SEA priority)

## 7. Verification gaps (post-build)

- [ ] Verify PWA installs on real iPhone (Safari → "Add to Home Screen")
- [ ] Verify PWA installs on real Android (Chrome → install prompt)
- [ ] Lighthouse mobile on every route (PWA=100, Perf≥85)
- [ ] axe-core a11y audit on every page
- [ ] Manual keyboard navigation pass
- [ ] Offline mode smoke test (DevTools → kill network → reload)

## 8. Ops / DevOps

- [ ] Vercel project created and linked
- [ ] Cron jobs for:
  - [ ] Weekly Merkle root publish (Sun 23:00 UTC)
  - [ ] ETH → USDC hedge sweep (every Sun)
  - [ ] Oracle re-calibration (nightly Brier-score)
  - [ ] Fixture cache refresh (hourly, 60s TTL)
- [ ] Staging env on a separate Supabase project
