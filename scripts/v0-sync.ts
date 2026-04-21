/**
 * v0-sync — push the ENTIRE local repo into a v0 chat so the user can edit on
 * v0.app. Creates a single chat named "WCI Dashboard · main" inside the
 * existing project. Persists the chatId in .v0-state.json so we can re-sync
 * to the same chat later (by deleting + re-initing).
 *
 * Usage: npx tsx scripts/v0-sync.ts
 */

import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv();

// Long-timeout fetch so big file uploads don't time out
const _realFetch = globalThis.fetch;
globalThis.fetch = (input: any, init: any = {}) => {
  if (!init.signal) init = { ...init, signal: AbortSignal.timeout(30 * 60 * 1000) };
  return _realFetch(input, init);
};

import { createClient } from "v0-sdk";
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { resolve, relative, extname } from "node:path";

const ROOT = resolve(process.cwd());
const STATE_PATH = resolve(ROOT, ".v0-state.json");

const apiKey = process.env.V0_API_KEY;
if (!apiKey) {
  console.error("V0_API_KEY missing in .env.local");
  process.exit(1);
}
const v0 = createClient({ apiKey });

// ── File collection ──────────────────────────────────────────────
const INCLUDE_DIRS = new Set([
  "app",
  "components",
  "lib",
  "public",
  "scripts",
  "config",
]);
const INCLUDE_ROOT_FILES = new Set([
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "tsconfig.json",
  "postcss.config.mjs",
  "README.md",
  "TODO.md",
  ".env.example",
  ".gitignore",
]);

// Skip binary files (v0 gets the path only; we send source code)
const TEXT_EXTS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".css", ".html", ".md", ".json", ".yaml", ".yml",
  ".svg", ".sql", ".env", ".example", ".gitignore", "",
]);
const MAX_FILE_BYTES = 200_000; // 200 KB per file

const EXCLUDE_DIR_PARTS = new Set([
  "node_modules",
  ".next",
  ".git",
  "verification",
  "public/reference", // avoid shipping 36KB prototype .jsx files again
]);

function walk(dir: string, out: string[]) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    const rel = relative(ROOT, full).replaceAll("\\", "/");
    const parts = rel.split("/");
    if (parts.some((p) => EXCLUDE_DIR_PARTS.has(p))) continue;
    if (rel === "public/reference" || rel.startsWith("public/reference/")) continue;
    if (entry.isDirectory()) {
      walk(full, out);
    } else {
      out.push(full);
    }
  }
}

function collect(): { name: string; content: string }[] {
  const files: string[] = [];
  // Root files
  for (const f of INCLUDE_ROOT_FILES) {
    const p = resolve(ROOT, f);
    if (existsSync(p)) files.push(p);
  }
  // Include dirs
  for (const d of INCLUDE_DIRS) {
    const p = resolve(ROOT, d);
    if (existsSync(p) && statSync(p).isDirectory()) walk(p, files);
  }

  const out: { name: string; content: string }[] = [];
  for (const abs of files) {
    const rel = relative(ROOT, abs).replaceAll("\\", "/");
    const ext = extname(rel).toLowerCase();
    const s = statSync(abs);
    if (s.size > MAX_FILE_BYTES) {
      console.log(`  - skip (too big ${(s.size / 1024).toFixed(0)}KB): ${rel}`);
      continue;
    }
    // Only include text-ish files. Public binary assets (png, jpg) are handled
    // separately by v0 via links; we skip uploading them here.
    if (!TEXT_EXTS.has(ext)) {
      // Still include flag SVGs and small JSONs — SVG is in TEXT_EXTS already
      continue;
    }
    try {
      const content = readFileSync(abs, "utf8");
      out.push({ name: rel, content });
    } catch (e) {
      console.log(`  - skip (read error): ${rel}`);
    }
  }
  return out;
}

// ── Main ─────────────────────────────────────────────────────────
async function main() {
  const state: any = existsSync(STATE_PATH)
    ? JSON.parse(readFileSync(STATE_PATH, "utf8"))
    : { chats: {} };

  if (!state.projectId) {
    console.error("No projectId in .v0-state.json. Run scripts/v0-probe.ts first.");
    process.exit(1);
  }

  console.log("Collecting local files…");
  const files = collect();
  console.log(`  total: ${files.length} files`);
  const bytes = files.reduce((a, f) => a + f.content.length, 0);
  console.log(`  total bytes: ${(bytes / 1024).toFixed(0)} KB`);

  console.log(`\nCreating sync chat in project ${state.projectId}…`);
  const initResp = (await v0.chats.init({
    type: "files",
    files: files.map((f) => ({ name: f.name, content: f.content })),
    projectId: state.projectId,
    chatPrivacy: "private",
    name: `WCI Dashboard · main sync · ${new Date().toISOString().slice(0, 16)}`,
  })) as any;

  const chatId: string = initResp.id;
  const webUrl: string = initResp.webUrl;
  console.log(`\n✓ Sync chat created`);
  console.log(`  id: ${chatId}`);
  console.log(`  web: ${webUrl}`);

  // Persist
  state.chats = state.chats ?? {};
  state.chats.sync = {
    chatId,
    webUrl,
    filesSynced: files.length,
    syncedAt: new Date().toISOString(),
  };
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));

  console.log(`\nOpen ${webUrl} in your browser to edit the repo on v0.app.`);
}

main().catch((e) => {
  console.error("sync failed:", (e as Error).message);
  process.exit(1);
});
