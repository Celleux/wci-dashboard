// Generate PWA icon set from public/assets/logo.png.
// Produces 72, 96, 128, 144, 152, 167, 180, 192, 384, 512 (any) + 192, 512 maskable.
// Maskable icons include a dark background and ~10% safe padding per W3C spec.

import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, "../public/assets/logo.png");
const outDir = resolve(__dirname, "../public/icons");
mkdirSync(outDir, { recursive: true });

if (!existsSync(src)) {
  console.error(`Source logo not found at ${src}`);
  process.exit(1);
}

const anySizes = [72, 96, 128, 144, 152, 167, 180, 192, 384, 512];
const maskableSizes = [192, 512];
const bg = { r: 10, g: 6, b: 21, alpha: 1 }; // --bg-deep

async function makeAny(size) {
  const out = resolve(outDir, `icon-${size}.png`);
  await sharp(src)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`  icon-${size}.png`);
}

async function makeMaskable(size) {
  const inner = Math.round(size * 0.8); // 10% safe padding each side
  const out = resolve(outDir, `icon-${size}-maskable.png`);
  const fg = await sharp(src)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: bg },
  })
    .composite([{ input: fg, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`  icon-${size}-maskable.png`);
}

// Also write a favicon.ico-equivalent 32 & 16 as PNG
async function makeFavicon() {
  const out = resolve(__dirname, "../app/icon.png");
  await sharp(src)
    .resize(128, 128, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`  app/icon.png (Next.js auto-favicon)`);
}

console.log("Generating PWA icon set…");
for (const size of anySizes) await makeAny(size);
for (const size of maskableSizes) await makeMaskable(size);
await makeFavicon();
console.log("Done.");
