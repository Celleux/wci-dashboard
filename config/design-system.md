# WCI Design System (LAW — do not deviate)

> This document is attached to every v0 chat as `project.instructions`. v0 must read
> and obey it. If a rule conflicts with a prompt, **this document wins**.

## 0. Product

World Cup Inu (WCI) — a FIFA World Cup 2026 pari-mutuel betting & prediction
market dashboard, fronted by Paul the Octopus Oracle. Tone: playful, premium,
legible, unmistakable. Dark-only, FIFA26 rainbow-accented.

## 1. Stack (non-negotiable)

- **Next.js 16 App Router**, React 19, TypeScript strict.
- **Tailwind CSS v4** (tokens live in `app/globals.css` under `@theme`).
- **shadcn/ui** primitives, customised to our tokens. No other UI lib.
- **Zustand** for cross-surface state (bet slip, wallet, toasts).
- **TanStack Query v5** for server data, **SWR** behaviour via TanStack.
- **Framer Motion 11** for motion. Respect `useReducedMotion`.
- **Lucide** icons + the 8 custom prototype SVG icons (home, live, slip, trophy,
  octopus, card, stake, doc).
- **Fonts**: Bricolage Grotesque (display), Inter (body), JetBrains Mono
  (numeric). Already wired via `next/font/google`; classes available as
  `.display`, `.display-cond`, `.mono`, `.label`.

## 2. Visual language

### 2.1 Color tokens (Tailwind utilities — USE THESE, never hardcode hex)

Backgrounds: `bg-bg-deep` (#0A0615), `bg-bg-surface` (#141028), `bg-bg-elevated` (#1D1740).

FIFA26 palette: `fifa-red` #E8392C, `fifa-crimson` #B8202F, `fifa-orange` #FF7A1F,
`fifa-yellow` #F5D020, `fifa-lime` #9FD634, `fifa-green` #2BB673, `fifa-teal` #00B9B2,
`fifa-cyan` #4ED1E6, `fifa-blue` #2E6FE6, `fifa-purple` #8B47D6, `fifa-violet` #6B38B8,
`fifa-magenta` #E637A8, `fifa-pink` #FF6AA8.

Group colors: `grp-a` #4AE89E, `grp-b` #FF3B5C, `grp-c` #FF8C1F, `grp-d` #3B7BFF,
`grp-e` #7A3AFF, `grp-f` #2DD4BF, `grp-g` #FF6AA8, `grp-h` #4FE0C8, `grp-i` #9B5CFF,
`grp-j` #3A8A9E, `grp-k` #FF5533, `grp-l` #5AA9FF.

Semantic: `gold` #F5D020, `gold-deep` #A88900, `gold-dark` #6B5500, `coral` #E8392C,
`lime` #9FD634.

Text: `t1` (white), `t2` #C9C0E8, `t3` #8079A8, `t4` #544E72. CSS vars
`--t-inverse` (#0A0615) for dark text on light fills.

Borders: `hair` (rgba(255,255,255,0.08)) and `hair-strong` (rgba(255,255,255,0.14)).

### 2.2 Typography classes

- `.display` — Bricolage Grotesque 800, tight letter-spacing. Use for headings and
  hero numbers.
- `.display-cond` — Bricolage 800 condensed (wdth 75). Use for tight columns.
- `.mono` — JetBrains Mono, tabular-nums. Use for odds, prices, countdowns, IDs.
- `.label` — Inter 700 10px uppercase 0.12em tracking, color `t3`. Use for
  section labels ("LIVE MATCHES", "POOL SPLIT").

### 2.3 Premium card

```tsx
<div className="card" style={{ "--card-accent": "var(--fifa-teal)" }}>
  <div className="card-accent-bar" aria-hidden />
  {/* content */}
</div>
```

22px radius, six-layer shadow incl. colored glow via `--card-accent`. Always
set an accent. Default is teal.

### 2.4 Buttons

- `btn-3d` — the gold hero button (Paul's pick, place bet). 48px min height.
- `btn-3d-color` — colored variant; set `--btn-light`, `--btn-dark`, `--btn-shadow`
  CSS vars via style prop.
- `btn-outcome` — for H/D/A picks on match cards. Set `--outcome-accent`. 56px
  min height. Supports `data-selected="true"`.

### 2.5 Chips

- `chip` — neutral pill.
- `chip-gold` — highlight/achievement.
- `chip-live` — animated red dot, "LIVE" indicator.

### 2.6 Structural helpers

- `group-tile` — 32px color tile with the group letter (set `--group-color`).
- `pool-seg` + `pool-seg > span` — stacked horizontal bar for H/D/A pool split.
- `stat-tile` — colored-top-bar stat card (set `--tile-color`).
- `sidebar-item` — nav row; honor `data-active="true"` with golden accent.
- `glass` — bg with 24px backdrop-blur and `hair` border.

### 2.7 Shadows

All depth comes from layered inset highlights + outer drops + colored glows.
Never use plain `shadow-sm/md/lg` Tailwind defaults for our cards or
buttons — use the classes above.

## 3. Mobile-first + PWA

**This is a mobile-first app shipped as an installable PWA. Every component
has a mobile variant before a desktop variant.**

### 3.1 Breakpoints (Tailwind)

- `xs` 375 — iPhone SE baseline
- `sm` 640 — large phone
- `md` 768 — tablet / small desktop
- `lg` 1024 — desktop
- `xl` 1440 — prototype desktop
- `2xl` 1920 — wide

### 3.2 Mobile shell (below `md`)

- Top header: 64px, notched, shows only logo orb + wallet dot + menu.
- Bottom tab bar: fixed, 5 tabs (Home / Matches / Oracle / Bets / More),
  safe-area aware via `.sa-pb`. 48px min tap targets, active = gold accent bar.
- Hamburger/"More" opens a full-screen sheet with profile, wallet, nav, streak.
- BetSlip becomes a **Vaul bottom sheet** (`components/betting/mobile/BetSheet.tsx`)
  with 40% / 90% / 100% snap points.
- Paul hero scales to 220px; stacks above Next Match card.
- Hero grid collapses to single column.

### 3.3 Touch rules

- **48×48 px minimum** tap target on ALL interactive elements. Spacing ≥ 8px.
- Always set `touch-action: manipulation` on custom buttons.
- Swipe-to-dismiss on sheets (Vaul does this).
- Horizontal carousels use Embla with snap + momentum.
- Long-press on match cards opens a quick-bet popover.
- Respect safe-area insets via `.sa-pt/pb/pl/pr` helpers.

### 3.4 PWA

- Manifest lives at `public/manifest.webmanifest` (already exists). Do not rewrite.
- Service worker source is `app/sw.ts` (compiled by `@serwist/next`).
- Always render an offline banner when `navigator.onLine === false`.
- Bet submissions MUST queue via background-sync when offline.
- Install prompt: capture `beforeinstallprompt` on Android/desktop Chrome;
  render a custom "Add to Home Screen" banner on iOS Safari (no native event).

### 3.5 Performance budget

- Initial JS ≤ 170 KB gzipped on `/`.
- Paul character: CSS/SVG only (no Lottie, no WebGL). Pause off-screen.
- `next/image` for all raster images. Prefer WebP/AVIF.
- Dynamic-import charts, wagmi providers, heavy components.

## 4. File & naming conventions

- One component per file, PascalCase filename.
- Co-locate types in a `types.ts` file per feature folder.
- Server Components by default; `"use client"` only where interactivity needs it.
- Hooks in `lib/hooks/`, prefix `use*`.
- Zustand stores in `lib/store/`, suffix `*Store`.
- API routes are thin proxies; business logic lives in `lib/`.
- NEVER import from `/public/reference/*` — those are read-only specs.

## 5. Accessibility

- Every interactive element reachable by keyboard. Visible focus ring.
- Color-coded outcomes (H/D/A) always also carry a shape/label (home/draw/away).
- `aria-live="polite"` on toast region.
- 48×48 px tap targets.
- WCAG 2.1 AA contrast on all text.
- Respect `prefers-reduced-motion`.

## 6. Copy voice

- Short, confident, slightly cheeky (Paul's voice, droll British).
- Never use emoji in UI copy.
- No FIFA / World Cup trademark use. We say "WC26" and "the tournament."
- Paul speaks in first person: "I'm picking Brazil" not "Paul picks Brazil."
- Losing states get comedy, not pity: "rough read" / "Paul warned you" / "cope card minted."

## 7. What v0 must NEVER do

- Never hardcode hex colors or font families. Use tokens.
- Never add a UI library outside shadcn + the approved list above.
- Never copy layouts or styling from `/public/reference/` verbatim at the CSS
  level — read them as *design intent only*. The style already lives in
  `app/globals.css`.
- Never introduce dark-mode toggling logic. Dark is the only mode.
- Never rewrite `app/globals.css` or `app/layout.tsx`. They are locked.
- Never rewrite `public/manifest.webmanifest` or `app/sw.ts`.
- Never mock data inside components; put mocks in `lib/mocks/*` behind a hook.
- Never use emoji in UI.

## 8. Preferred data shapes

Match:
```ts
type Fixture = {
  id: number;
  date: string; // ISO8601
  status: "NS"|"LIVE"|"HT"|"FT"|"PST"|"CANC"|"ABD";
  round: "Group Stage - 1"|"Group Stage - 2"|"Group Stage - 3"
       | "Round of 32"|"Round of 16"|"Quarter-finals"
       | "Semi-finals"|"3rd Place Final"|"Final";
  group: "A"|"B"|"C"|"D"|"E"|"F"|"G"|"H"|"I"|"J"|"K"|"L"|null;
  venue: { name: string; city: string };
  home: TeamCode; away: TeamCode;
  minute?: number;
  score?: { home: number; away: number };
};

type OraclePick = {
  fixtureId: number;
  pick: "HOME"|"DRAW"|"AWAY";
  confidence: number; // 0..99
  probabilities: { pH: number; pD: number; pA: number };
  sources: {
    model: { pH: number; pD: number; pA: number };
    pinnacle?: { pH: number; pD: number; pA: number };
    polymarket?: { pH: number; pD: number; pA: number };
  };
};

type Pool = { fixtureId: number; home: number; draw: number; away: number; currency: "USDC" };
type Bet = { id: string; fixtureId: number; side: "home"|"draw"|"away"; stake: number; odds: number; status: "pending"|"won"|"lost"|"void"; payout?: number };
```
