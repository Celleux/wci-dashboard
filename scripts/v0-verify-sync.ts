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
    console.error("No sync chat in state");
    process.exit(1);
  }

  console.log(`Inspecting sync chat ${chatId}…`);
  const chat = (await v0.chats.getById({ chatId })) as any;
  const lv = chat?.latestVersion;
  console.log("web:", chat.webUrl);
  console.log("latestVersion.id:", lv?.id);
  console.log("latestVersion.status:", lv?.status);
  console.log("latestVersion.files count:", lv?.files?.length);

  // Look for 4 sentinel files from v4.2
  const sentinels = [
    "components/paul/PaulStudio.tsx",
    "components/layout/ProfileCard.tsx",
    "components/layout/HeaderWave.tsx",
    "components/shared/ChibiImage.tsx",
  ];
  for (const s of sentinels) {
    const f = lv?.files?.find((x: any) => x.name === s);
    if (!f) {
      console.log(`  ✗ missing: ${s}`);
    } else {
      // quick content-marker check
      let marker = "";
      if (s.endsWith("PaulStudio.tsx")) marker = "SoccerBall";
      else if (s.endsWith("ProfileCard.tsx")) marker = "BadgePill";
      else if (s.endsWith("HeaderWave.tsx")) marker = "NotchStroke";
      else if (s.endsWith("ChibiImage.tsx")) marker = "Wide soft glow backplate";
      const hit = marker && f.content.includes(marker);
      console.log(`  ${hit ? "✓" : "?"} ${s}: ${f.content.length} bytes${marker ? ` · marker "${marker}" ${hit ? "FOUND" : "missing"}` : ""}`);
    }
  }
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
