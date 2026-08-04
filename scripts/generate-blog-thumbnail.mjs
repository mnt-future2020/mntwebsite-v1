// Generate a blog cover thumbnail in the MnT "blueprint" house style
// (1600x800 PNG, dark navy grid + Sora headline + IBM Plex Mono data strip),
// matching the existing public/blog/*.png set.
//
// Renders an HTML card in headless Chromium and screenshots it. Fonts (Sora +
// IBM Plex Mono, the site's own display/mono faces) are inlined from
// scripts/assets/blog-thumb-fonts.css so generation needs no network.
//
// Usage:
//   node scripts/generate-blog-thumbnail.mjs \
//     --slug product-page-ai-visibility \
//     --kicker "AI COMMERCE" \
//     --line1 "AI reads your product pages worst." \
//     --line2 "That's the page that sells." \
//     --mono1 "Product pages: 66% machine-readable" --badge1 "LAST PLACE" \
//     --mono2 "Homepage 75%  ·  Returns 82%"        --badge2 "ADOBE 2026"
//
// Writes public/blog/blog-<slug>.png
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Playwright ships with the sandbox/CI image rather than this project's
// dependencies, so resolve it from the global install when it isn't local.
function loadChromium() {
  const require = createRequire(import.meta.url);
  for (const id of ["playwright", "playwright-core", "/opt/node22/lib/node_modules/playwright"]) {
    try {
      return require(id).chromium;
    } catch {
      /* try next */
    }
  }
  throw new Error("Playwright not found. Install it: npm i -D playwright");
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith("--")) continue;
    const key = argv[i].slice(2);
    const val = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
    out[key] = val;
  }
  return out;
}

const esc = (s = "") =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// House-style tokens, sampled from the existing public/blog/*.png covers.
const T = {
  w: 1600,
  h: 800,
  bg: "#0A1628",
  grid: 48,
  margin: 96,
  white: "#FFFFFF",
  blue: "#7FC0F7", // headline line 2
  kicker: "#219CFC",
  mono: "#A3B9D4",
  accent: "#219BFA", // badge text
  footer: "#647EA9",
};

export function buildHtml(o, fontCss) {
  return `<style>
${fontCss}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${T.w}px;height:${T.h}px}
body{background:${T.bg};font-family:'Sora',sans-serif;-webkit-font-smoothing:antialiased}
.card{position:relative;width:${T.w}px;height:${T.h}px;overflow:hidden;background:${T.bg}}
/* faint 48px blueprint grid */
.grid{position:absolute;inset:0;
  background-image:linear-gradient(to right,rgba(255,255,255,.022) 1px,transparent 1px),
                   linear-gradient(to bottom,rgba(255,255,255,.022) 1px,transparent 1px);
  background-size:${T.grid}px ${T.grid}px}
/* soft blue glow toward the top-right */
.glow{position:absolute;top:-260px;right:-200px;width:900px;height:760px;
  background:radial-gradient(closest-side,rgba(28,116,205,.30),rgba(28,116,205,.10) 55%,transparent 78%)}
.brand{position:absolute;left:${T.margin}px;top:88px;display:flex;align-items:center;gap:17px}
.mark{width:44px;height:44px;border-radius:11px;background:#fff;display:flex;align-items:center;
  justify-content:center;font-weight:800;font-size:25px;color:${T.bg};letter-spacing:-.02em}
.kick{font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:17px;letter-spacing:.12em;position:relative;top:-2px;
  text-transform:uppercase;color:${T.kicker}}
.head{position:absolute;left:${T.margin}px;top:236px;max-width:1350px;font-weight:800;font-size:65.5px;
  line-height:71px;letter-spacing:-.02em}
.head .a{color:${T.white}}
.head .b{color:${T.blue}}
.strip{position:absolute;left:${T.margin}px;bottom:119px;display:flex;flex-direction:column;gap:15px}
.row{display:flex;align-items:center;gap:17px;font-family:'IBM Plex Mono',monospace;font-weight:400;
  font-size:23.5px;color:${T.mono};line-height:1}
.pill{display:inline-flex;align-items:center;border:1.5px solid rgba(33,155,250,.42);border-radius:999px;
  padding:6px 15px 7px;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:14px;
  letter-spacing:.09em;text-transform:uppercase;color:${T.accent};line-height:1}
.sig{position:absolute;right:${T.margin}px;bottom:120px;font-family:'IBM Plex Mono',monospace;
  font-size:16px;letter-spacing:-.06em;color:${T.footer}}
</style>
<div class="card">
  <div class="grid"></div><div class="glow"></div>
  <div class="brand"><div class="mark">M</div><div class="kick">${esc(o.kicker)}</div></div>
  <div class="head"><div class="a">${esc(o.line1)}</div><div class="b">${esc(o.line2)}</div></div>
  <div class="strip">
    <div class="row"><span>${esc(o.mono1)}</span>${o.badge1 ? `<span class="pill">${esc(o.badge1)}</span>` : ""}</div>
    ${o.mono2 ? `<div class="row"><span>${esc(o.mono2)}</span>${o.badge2 ? `<span class="pill">${esc(o.badge2)}</span>` : ""}</div>` : ""}
  </div>
  <div class="sig">MnT Future</div>
</div>`;
}

export async function generate(o) {
  const fontCss = await fs.readFile(path.join(__dirname, "assets", "blog-thumb-fonts.css"), "utf8");
  const chromium = loadChromium();
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: T.w, height: T.h },
      deviceScaleFactor: 1,
    });
    await page.setContent(buildHtml(o, fontCss), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const outPath = path.join(ROOT, "public", "blog", `blog-${o.slug}.png`);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await page.screenshot({ path: outPath, type: "png" });
    return outPath;
  } finally {
    await browser.close();
  }
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const a = parseArgs(process.argv.slice(2));
  const required = ["slug", "kicker", "line1", "line2", "mono1"];
  const missing = required.filter((k) => !a[k]);
  if (missing.length) {
    console.error(`Missing required arg(s): ${missing.map((m) => "--" + m).join(", ")}`);
    process.exit(1);
  }
  const out = await generate(a);
  console.log(`✓ ${path.relative(ROOT, out)}`);
}
