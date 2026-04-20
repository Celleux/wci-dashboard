import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv();
import { createClient } from "v0-sdk";
import { readFileSync } from "node:fs";

async function main() {
  const v0 = createClient({ apiKey: process.env.V0_API_KEY! });
  const state = JSON.parse(readFileSync(".v0-state.json", "utf8"));
  const which = (process.argv[2] ?? "B").toUpperCase();
  const chatId = state.chats[which]?.chatId;
  console.log("chatId:", chatId);

  const msgs: any = await v0.chats.findMessages({ chatId, limit: 100 });
  console.log(`messages: ${msgs.data.length}`);
  for (const m of msgs.data) {
    console.log(`\n[${m.role}] type=${m.type} finishReason=${m.finishReason ?? "-"} at ${m.createdAt}`);
    const preview = (m.content ?? "").slice(0, 180);
    console.log(preview.replace(/\n+/g, " "));
  }
  const versions: any = await v0.chats.findVersions({ chatId, limit: 20 });
  console.log(`\nversions: ${versions.data.length}`);
  for (const v of versions.data) {
    console.log(`  ${v.id} status=${v.status} ${v.createdAt}`);
  }
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
