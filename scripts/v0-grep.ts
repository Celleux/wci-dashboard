// Fetch a specific file from the current v0 sync chat and print a match count
// for a given regex. Used to confirm what v0 actually has vs. GitHub.
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv();
import { createClient } from "v0-sdk";
import { readFileSync } from "node:fs";

async function main() {
  const v0 = createClient({ apiKey: process.env.V0_API_KEY! });
  const state = JSON.parse(readFileSync(".v0-state.json", "utf8"));
  const chatId: string = state.chats.sync?.chatId;
  if (!chatId) {
    console.error("No sync chat id");
    process.exit(1);
  }
  const [, path, needle] = process.argv;
  const filePath = process.argv[2] ?? "components/providers/Web3Provider.tsx";
  const regex = process.argv[3] ?? "rainbowkit/styles.css";

  const chat = (await v0.chats.getById({ chatId })) as any;
  const file = chat.latestVersion?.files?.find((f: any) => f.name === filePath);
  if (!file) {
    console.error(`File not in chat: ${filePath}`);
    process.exit(1);
  }
  console.log(`Chat ${chatId} · file ${filePath} (${file.content.length} bytes)`);
  const lines = file.content.split(/\r?\n/) as string[];
  const matches: [number, string][] = [];
  for (let i = 0; i < lines.length; i++) {
    if (new RegExp(regex).test(lines[i])) matches.push([i + 1, lines[i]]);
  }
  console.log(`Regex /${regex}/ matches: ${matches.length}`);
  for (const [ln, l] of matches) console.log(`  ${ln}: ${l}`);
  console.log("\nFirst 20 lines:");
  for (let i = 0; i < Math.min(20, lines.length); i++) {
    console.log(`${String(i + 1).padStart(2)} | ${lines[i]}`);
  }
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
