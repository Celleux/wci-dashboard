import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv();
import { createClient } from "v0-sdk";
import { readFileSync } from "node:fs";

async function main() {
  const v0 = createClient({ apiKey: process.env.V0_API_KEY! });
  const state = JSON.parse(readFileSync(".v0-state.json", "utf8"));
  const raw = process.argv[2] ?? "B";
  // Sync chat key is stored lowercase; seed chat keys A/B/C uppercase. Try exact, then uppercase.
  const which = state.chats[raw]?.chatId ? raw : raw.toUpperCase();
  const chatId = state.chats[which]?.chatId;
  if (!chatId) {
    console.error(`No chatId for ${which}`);
    process.exit(1);
  }
  console.log(`Inspecting chat ${which}: ${chatId}`);
  const chat = (await v0.chats.getById({ chatId })) as any;
  console.log("webUrl:", chat.webUrl);
  console.log("latestVersion.id:", chat.latestVersion?.id);
  console.log("latestVersion.status:", chat.latestVersion?.status);
  console.log("latestVersion.files.length:", chat.latestVersion?.files?.length);
  if (chat.latestVersion?.files?.length) {
    console.log("files:");
    for (const f of chat.latestVersion.files) {
      console.log(`  ${f.locked ? "🔒" : "  "} ${f.name} (${f.content.length} bytes)`);
    }
  }
  const msgs = (await v0.chats.findMessages({ chatId, limit: 20 })) as any;
  console.log(`\nmessages (${msgs.data.length}):`);
  for (const m of msgs.data) {
    console.log(`\n[${m.role}] (${m.type})`);
    const preview = (m.content ?? "").slice(0, 700);
    console.log(preview);
    console.log("…");
  }
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
