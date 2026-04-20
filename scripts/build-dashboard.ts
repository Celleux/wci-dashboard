/**
 * WCI Dashboard — v0 Platform API batch orchestrator
 *
 * Usage:
 *   npm run v0:build -- [chatId...]         run specific chats (by id, e.g. A B C)
 *   npm run v0:build                        run all remaining chats
 *   npm run v0:build -- --only=A            equivalent to `A`
 *   npm run v0:build -- --force             re-run even if state marks as done
 *
 * State persists to .v0-state.json so runs are resumable across sessions.
 */

import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv();

// Patch global fetch so v0's sync sendMessage (which can take 10–20 min for big
// prompts) doesn't hit Node's default socket timeouts.
const _realFetch = globalThis.fetch;
const LONG_TIMEOUT_MS = 30 * 60 * 1000; // 30 min
globalThis.fetch = (input: any, init: any = {}) => {
  if (!init.signal) {
    init = { ...init, signal: AbortSignal.timeout(LONG_TIMEOUT_MS) };
  }
  return _realFetch(input, init);
};

import { createClient } from "v0-sdk";
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve, relative } from "node:path";
import yaml from "js-yaml";

// ──────────────────────────────────────────────────────────────
// Config
// ──────────────────────────────────────────────────────────────

const ROOT = resolve(process.cwd());
const STATE_PATH = resolve(ROOT, ".v0-state.json");
const CHATS_PATH = resolve(ROOT, "config/chats.yaml");
const INSTRUCTIONS_PATH = resolve(ROOT, "config/design-system.md");

type ChatDef = {
  id: string;
  title: string;
  thinking?: boolean;
  turns: string[];
};

type ChatsConfig = {
  project: { name: string; description: string; instructionsFile: string };
  referenceFiles: string[];
  chats: ChatDef[];
};

type State = {
  projectId?: string;
  chats: Record<
    string,
    {
      chatId?: string;
      status: "pending" | "in_progress" | "done" | "error";
      lastError?: string;
      turnIdx: number;
      filesWritten: number;
      startedAt?: string;
      finishedAt?: string;
    }
  >;
};

function loadState(): State {
  if (existsSync(STATE_PATH)) {
    return JSON.parse(readFileSync(STATE_PATH, "utf8"));
  }
  return { chats: {} };
}
function saveState(s: State) {
  writeFileSync(STATE_PATH, JSON.stringify(s, null, 2));
}
function loadChatsConfig(): ChatsConfig {
  return yaml.load(readFileSync(CHATS_PATH, "utf8")) as ChatsConfig;
}

// ──────────────────────────────────────────────────────────────
// CLI args
// ──────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);
const force = argv.includes("--force");
const onlyArgs = argv
  .filter((a) => !a.startsWith("--"))
  .concat(
    argv
      .filter((a) => a.startsWith("--only="))
      .map((a) => a.slice("--only=".length))
  );
const selected = onlyArgs.length ? new Set(onlyArgs.map((s) => s.toUpperCase())) : null;

// ──────────────────────────────────────────────────────────────
// v0 client
// ──────────────────────────────────────────────────────────────

const apiKey = process.env.V0_API_KEY;
if (!apiKey) {
  console.error("V0_API_KEY is missing. Set it in .env.local.");
  process.exit(1);
}
const v0 = createClient({ apiKey });

// ──────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────

function readFile(path: string): string {
  return readFileSync(resolve(ROOT, path), "utf8");
}

function buildReferenceFiles(cfg: ChatsConfig) {
  return cfg.referenceFiles.map((p) => {
    // Remap all to reference/<basename-preserving> so v0 sees a clean tree.
    let name = p.replace(/^public\/reference\//, "reference/");
    name = name.replace(/^config\//, "reference/");
    name = name.replace(/^app\//, "reference/app/");
    if (!name.startsWith("reference/")) name = `reference/${name}`;
    return { name, content: readFile(p), locked: true };
  });
}

// Foundation files v0 must NEVER overwrite. Even if it emits them in a response,
// we silently drop them on the floor.
const PROTECTED_PATHS = new Set([
  "package.json",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "next.config.ts",
  "next.config.js",
  "next.config.mjs",
  "tsconfig.json",
  "postcss.config.mjs",
  "postcss.config.js",
  "tailwind.config.ts",
  "tailwind.config.js",
  "app/globals.css",
  "app/layout.tsx",
  "app/page.tsx",
  "app/sw.ts",
  "app/icon.png",
  "app/favicon.ico",
  "public/manifest.webmanifest",
  ".env",
  ".env.local",
  ".env.example",
  ".gitignore",
  "AGENTS.md",
  "CLAUDE.md",
]);

// Paths that v0 isn't allowed to touch under these prefixes either
const PROTECTED_PREFIXES = [
  "public/assets/",
  "public/flags/",
  "public/icons/",
  "public/reference/",
  "scripts/",
  "config/",
  "lib/db/",
];

function syncFilesToDisk(files: Array<{ name: string; content: string; locked?: boolean }>) {
  let written = 0;
  let skipped = 0;
  for (const f of files) {
    // Skip reference files v0 echoes back
    if (f.name.startsWith("reference/")) continue;
    // Skip anything in protected list
    if (PROTECTED_PATHS.has(f.name)) {
      skipped++;
      console.log(`      skipped (protected): ${f.name}`);
      continue;
    }
    if (PROTECTED_PREFIXES.some((p) => f.name.startsWith(p))) {
      skipped++;
      console.log(`      skipped (protected prefix): ${f.name}`);
      continue;
    }
    const outPath = resolve(ROOT, f.name);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, f.content);
    written++;
  }
  if (skipped) console.log(`    ↳ skipped ${skipped} protected files`);
  return written;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

const SHORT_INSTRUCTIONS = `
WCI dashboard — FIFA WC26 pari-mutuel betting + Paul the Octopus Oracle. Dark-only, mobile-first PWA.

STACK: Next 16 App Router, React 19, TS strict, Tailwind v4 (@theme in app/globals.css), shadcn/ui, Zustand, TanStack Query, Framer Motion, Lucide, Vaul, Embla, Serwist.

TOKENS — never hex: bg-deep, fifa-red/teal/yellow/purple/..., grp-a..l, gold, t1-t4. Classes .display, .mono, .label, .card + .card-accent-bar (set --card-accent), .btn-3d, .btn-3d-color, .btn-outcome (48px+ tap), .chip, .chip-gold, .chip-live, .glass, .pool-seg, .stat-tile.

MOBILE <md: MobileHeader 64px + BottomTabBar safe-area + Vaul BetSheet. >=md: TopHeader + LeftSidebar + right BetSlip. 48x48 min tap. touch-action:manipulation.

READ reference/design-system.md = FULL spec. reference/*.jsx = INTENT only, reimplement in TS.

NEVER: hardcode hex, add UI libs, rewrite app/globals.css or layout.tsx or sw.ts or manifest, emoji in UI, dark-mode toggle.
`.trim();

async function ensureProject(cfg: ChatsConfig, state: State): Promise<string> {
  if (state.projectId) {
    console.log(`  • Reusing project ${state.projectId}`);
    return state.projectId;
  }
  console.log(`  • Creating new v0 project: ${cfg.project.name}`);
  const project = (await v0.projects.create({
    name: cfg.project.name,
    description: cfg.project.description,
    instructions: SHORT_INSTRUCTIONS,
  })) as any;
  state.projectId = project.id;
  saveState(state);
  console.log(`  • Project id: ${project.id}`);
  return project.id;
}

async function runChat(
  projectId: string,
  chat: ChatDef,
  cfg: ChatsConfig,
  state: State
) {
  const s = state.chats[chat.id] ?? {
    status: "pending" as const,
    turnIdx: 0,
    filesWritten: 0,
  };
  state.chats[chat.id] = s;

  if (s.status === "done" && !force) {
    console.log(`\n[${chat.id}] ${chat.title} — already done (skipping)`);
    return;
  }

  console.log(`\n[${chat.id}] ${chat.title}`);
  s.status = "in_progress";
  s.startedAt ??= new Date().toISOString();
  saveState(state);

  try {
    let chatId = s.chatId;
    // Init chat with reference files on first turn
    if (!chatId) {
      const refFiles = buildReferenceFiles(cfg);
      console.log(`  • Initializing chat (${refFiles.length} locked refs)`);
      const initResp = await v0.chats.init({
        type: "files",
        files: refFiles, // each file already has `locked: true`
        projectId,
        chatPrivacy: "private",
        name: `${chat.id}: ${chat.title}`,
      });
      chatId = (initResp as any).id;
      s.chatId = chatId;
      saveState(state);
      console.log(`  • Chat id: ${chatId}`);
    }

    // Send every unsent turn (sync mode — sendMessage returns the full chat
    // with updated latestVersion.files).
    for (let i = s.turnIdx; i < chat.turns.length; i++) {
      console.log(`  • Sending turn ${i + 1}/${chat.turns.length}`);
      const preSnap = (await v0.chats.getById({ chatId: chatId! })) as any;
      const priorVersionId: string | undefined = preSnap?.latestVersion?.id;
      console.log(`    ↳ prior version: ${priorVersionId ?? "(none)"}`);

      const resp = (await v0.chats.sendMessage({
        chatId: chatId!,
        message: chat.turns[i],
        modelConfiguration: { thinking: chat.thinking === true },
        responseMode: "sync",
      })) as any;

      let lv = resp?.latestVersion;
      // Some sync responses return before the version finishes building;
      // poll briefly until the version id has changed AND status is completed.
      const deadline = Date.now() + 10 * 60 * 1000;
      while (Date.now() < deadline && (!lv || lv.id === priorVersionId || lv.status !== "completed")) {
        if (lv?.status === "failed") {
          throw new Error(`v0 version ${lv.id} failed`);
        }
        await sleep(4000);
        const snap = (await v0.chats.getById({ chatId: chatId! })) as any;
        lv = snap?.latestVersion;
        console.log(`    ↳ poll: version ${lv?.id} status=${lv?.status}`);
      }
      if (!lv || lv.id === priorVersionId || lv.status !== "completed") {
        throw new Error(`turn ${i + 1} never produced a new completed version`);
      }
      const files = lv.files ?? [];
      const written = syncFilesToDisk(files);
      s.filesWritten += written;
      s.turnIdx = i + 1;
      saveState(state);
      console.log(`    ↳ wrote ${written} files (version ${lv.id})`);
    }

    s.status = "done";
    s.finishedAt = new Date().toISOString();
    saveState(state);
    console.log(`  • ✓ Done. Total files written: ${s.filesWritten}`);
  } catch (err: any) {
    s.status = "error";
    s.lastError = err?.message ?? String(err);
    saveState(state);
    console.error(`  • ✗ Chat ${chat.id} failed: ${s.lastError}`);
    throw err;
  }
}

// ──────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────

async function main() {
  const cfg = loadChatsConfig();
  const state = loadState();

  console.log(`v0 build orchestrator (force=${force})`);
  const projectId = await ensureProject(cfg, state);

  const chats = cfg.chats.filter((c) => !selected || selected.has(c.id.toUpperCase()));
  console.log(
    `Running ${chats.length} chat${chats.length === 1 ? "" : "s"}: ${chats
      .map((c) => c.id)
      .join(", ")}`
  );

  for (const chat of chats) {
    try {
      await runChat(projectId, chat, cfg, state);
    } catch (err) {
      // Per plan: if a phase blocks, log a TODO and move on.
      console.error(`Continuing to next chat after failure in ${chat.id}.`);
    }
    // Gentle pacing so we don't hammer the API
    await sleep(1000);
  }

  console.log("\nAll requested chats processed.");
  const pending = Object.entries(state.chats).filter(([, v]) => v.status !== "done");
  if (pending.length) {
    console.log(
      `Pending: ${pending.map(([k, v]) => `${k}(${v.status})`).join(", ")}`
    );
  } else {
    console.log("All chats: done ✓");
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
