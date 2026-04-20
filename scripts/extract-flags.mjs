// Extract the 48 flag SVGs from prototype's flags.jsx into standalone .svg files.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, "../public/reference/flags.jsx");
const out = resolve(__dirname, "../public/flags");
mkdirSync(out, { recursive: true });

const text = readFileSync(src, "utf8");

// Pull the FLAG_SVG object: `const FLAG_SVG = { ... };`
const match = text.match(/const FLAG_SVG = \{([\s\S]*?)\n\};/);
if (!match) {
  console.error("Could not find FLAG_SVG object");
  process.exit(1);
}
const body = match[1];

// Parse each entry: `  CODE: '...svg...',` (code is 3 uppercase letters)
const entryRe = /^\s*([A-Z]{3}):\s*'([^']*)'/gm;
let m;
let count = 0;
while ((m = entryRe.exec(body)) !== null) {
  const code = m[1];
  const inner = m[2];
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" preserveAspectRatio="none">` +
    inner +
    `</svg>`;
  writeFileSync(resolve(out, `${code}.svg`), svg, "utf8");
  count++;
}
console.log(`Extracted ${count} flag SVGs to public/flags/`);
