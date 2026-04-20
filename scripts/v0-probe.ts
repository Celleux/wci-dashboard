// Quick smoke test — verifies V0 API key + creates the project.
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv();
import { createClient } from "v0-sdk";
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

async function main() {
  const apiKey = process.env.V0_API_KEY;
  if (!apiKey) throw new Error("V0_API_KEY missing");
  const v0 = createClient({ apiKey });

  const STATE = resolve(process.cwd(), ".v0-state.json");
  const state: any = existsSync(STATE)
    ? JSON.parse(readFileSync(STATE, "utf8"))
    : { chats: {} };

  const user = await v0.user.get();
  console.log("user:", (user as any).email ?? (user as any).id);

  const shortInstructions = `
WCI dashboard — FIFA WC26 pari-mutuel betting + Paul the Octopus Oracle. Dark-only, mobile-first PWA.

STACK: Next 16 App Router, React 19, TS strict, Tailwind v4 (@theme in app/globals.css), shadcn/ui, Zustand, TanStack Query, Framer Motion, Lucide, Vaul, Embla, Serwist.

TOKENS — never hex: bg-deep, fifa-red/teal/yellow/purple/..., grp-a..l, gold, t1-t4. Classes .display, .mono, .label, .card + .card-accent-bar (set --card-accent), .btn-3d, .btn-3d-color, .btn-outcome (48px+ tap), .chip, .chip-gold, .chip-live, .glass, .pool-seg, .stat-tile.

MOBILE <md: MobileHeader 64px + BottomTabBar safe-area + Vaul BetSheet. >=md: TopHeader + LeftSidebar + right BetSlip. 48x48 min tap. touch-action:manipulation.

READ reference/design-system.md = FULL spec. reference/*.jsx = INTENT only, reimplement in TS.

NEVER: hardcode hex, add UI libs, rewrite app/globals.css or layout.tsx or sw.ts or manifest, emoji in UI, dark-mode toggle.
  `.trim();

  console.log("instructions length:", shortInstructions.length);

  if (!state.projectId) {
    const project = await v0.projects.create({
      name: "WCI Dashboard",
      description:
        "World Cup Inu — Pari-mutuel betting & prediction markets for WC26, fronted by Paul the Oracle.",
      instructions: shortInstructions,
    });
    console.log("project created:", (project as any).id);
    state.projectId = (project as any).id;
    writeFileSync(STATE, JSON.stringify(state, null, 2));
  } else {
    console.log("project already exists:", state.projectId);
  }
  console.log("OK");
}

main().catch((err) => {
  console.error("probe failed:", err);
  process.exit(1);
});
