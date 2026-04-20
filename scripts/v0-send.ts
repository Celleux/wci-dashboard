// Direct test: send a short message to an existing chat.
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
  const msg = process.argv.slice(3).join(" ") || "Hello Paul, testing.";
  console.log("chatId:", chatId);
  console.log("msg:", msg);
  const mode = (process.env.MODE ?? "async") as "sync" | "async";
  console.log("mode:", mode);
  const resp = (await v0.chats.sendMessage({
    chatId,
    message: msg,
    modelConfiguration: { thinking: false },
    responseMode: mode,
  })) as any;
  console.log("sendMessage returned:", typeof resp, Object.keys(resp ?? {}).slice(0, 8));
  console.log("preview:", JSON.stringify(resp, null, 2).slice(0, 800));
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
