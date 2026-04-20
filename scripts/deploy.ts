/**
 * Deploy the current state of the v0 project to Vercel via the v0 Platform API.
 * Uses the latest chat/version we have in .v0-state.json (falls back to chat A).
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv();

import { createClient } from "v0-sdk";
import { readFileSync } from "node:fs";

async function main() {
  const v0 = createClient({ apiKey: process.env.V0_API_KEY! });
  const state = JSON.parse(readFileSync(".v0-state.json", "utf8"));
  if (!state.projectId) {
    console.error("No projectId in .v0-state.json. Run scripts/v0-probe.ts first.");
    process.exit(1);
  }

  // Pick the most recent successful chat (prefer A = shell).
  const candidates = ["A", "C", "B", "D", "E", "F"];
  let chatEntry: any;
  let chatKey = "A";
  for (const k of candidates) {
    const c = state.chats[k];
    if (c?.chatId) {
      chatEntry = c;
      chatKey = k;
      break;
    }
  }
  if (!chatEntry) {
    console.error("No chat with chatId found.");
    process.exit(1);
  }
  console.log(`Using chat ${chatKey} id=${chatEntry.chatId}`);

  const chat = (await v0.chats.getById({ chatId: chatEntry.chatId })) as any;
  const versionId = chat?.latestVersion?.id;
  if (!versionId) {
    console.error("Chat has no latestVersion.");
    process.exit(1);
  }
  console.log(`Latest version: ${versionId} (status=${chat.latestVersion.status})`);

  try {
    const dep = (await v0.deployments.create({
      projectId: state.projectId,
      chatId: chatEntry.chatId,
      versionId,
    })) as any;
    console.log("\nDeployment created:");
    console.log("  id:         ", dep.id);
    console.log("  webUrl:     ", dep.webUrl);
    console.log("  inspectorUrl:", dep.inspectorUrl);
    console.log("  status:     ", dep.status);
  } catch (e) {
    console.error("deploy failed:", (e as Error).message);
    process.exit(1);
  }
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
