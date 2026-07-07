/**
 * Genereert PNG-assets uit huisstijl-HTML met Playwright:
 *  - app/apple-icon.png     (180×180 app-icoon)
 *  - app/opengraph-image.png (1200×630 social share)
 *
 * Draaien: npm run assets
 */
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const tmp = mkdtempSync(join(tmpdir(), "goa-assets-"));

const beeldmerk = (grootte) => `
  <svg width="${grootte}" height="${grootte}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="27" fill="none" stroke="#FFFFFF" stroke-width="7" opacity=".45"/>
    <path d="M50 23a27 27 0 1 1-26.3 33.2" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round"/>
    <path d="M15.5 49l8.2 12.6 12.6-8.2" fill="none" stroke="#FFFFFF" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

/* Apple-icon: vol paars vlak (iOS rondt zelf af) met het beeldmerk. */
const appleIconHtml = `<!doctype html><html><head><style>
  * { margin:0; } body { width:180px; height:180px; background:#9462A6; display:grid; place-items:center; }
</style></head><body>${beeldmerk(124)}</body></html>`;

/* OG-image: gradient, woordmerk, claim, KplusV-afzender. */
const fontFaces = `
  @font-face { font-family: 'Poppins'; font-weight: 700; src: url('file://${ROOT}/assets/fonts/poppins-700.woff2') format('woff2'); }
  @font-face { font-family: 'Inter'; font-weight: 400; src: url('file://${ROOT}/assets/fonts/inter-400.woff2') format('woff2'); }
`;

const ogHtml = `<!doctype html><html><head>
<style>
  ${fontFaces}
  * { margin:0; box-sizing:border-box; }
  body { width:1200px; height:630px; font-family:'Poppins','Segoe UI',Arial,sans-serif;
         background:linear-gradient(135deg,#5760A6 0%,#9462A6 60%,#B8AED6 100%);
         color:#fff; padding:72px 80px; display:flex; flex-direction:column; }
  .merk { display:flex; align-items:center; gap:20px; font-size:40px; font-weight:700; }
  .merk .op { opacity:.75; }
  h1 { font-size:76px; line-height:1.08; font-weight:700; margin-top:96px; max-width:950px; }
  .sub { font-size:30px; font-weight:400; opacity:.92; margin-top:28px; font-family:'Inter','Segoe UI',Arial,sans-serif; }
  .voet { margin-top:auto; font-size:24px; opacity:.85; font-family:'Inter','Segoe UI',Arial,sans-serif; }
</style></head><body>
  <div class="merk">${beeldmerk(64)}<span>Grip<span class="op">Op</span>Afval</span></div>
  <h1>Wij verdienen pas als&nbsp;u bespaart.</h1>
  <div class="sub">Onafhankelijke afvalscheiding op de werkvloer — grip op kosten, stromen en CO2.</div>
  <div class="voet">gripopafval.nl &nbsp;·&nbsp; een propositie van KplusV</div>
</body></html>`;

const browser = await chromium.launch({
  ...(process.env.PLAYWRIGHT_CHROMIUM_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
    : {}),
  // Lokale @font-face-bestanden laden vanaf file://-pagina's.
  args: ["--allow-file-access-from-files"],
});

for (const [naam, html, breedte, hoogte] of [
  ["apple-icon.png", appleIconHtml, 180, 180],
  ["opengraph-image.png", ogHtml, 1200, 630],
]) {
  const bestand = join(tmp, naam.replace(".png", ".html"));
  writeFileSync(bestand, html);
  const page = await browser.newPage({
    viewport: { width: breedte, height: hoogte },
    deviceScaleFactor: 1,
  });
  await page.goto(`file://${bestand}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  await page.screenshot({ path: join(ROOT, "app", naam) });
  await page.close();
  console.log(`✓ app/${naam}`);
}

await browser.close();
