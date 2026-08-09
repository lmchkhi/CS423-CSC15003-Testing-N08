/**
 * HTML -> PDF using the Chromium that `npx playwright install` already put on
 * disk for the browser matrix. Called by build-pdfs.py, which does the
 * Markdown -> HTML half; keeping the split this way means neither half needs a
 * dependency the repo does not already have.
 *
 *   node reports/tools/html-to-pdf.mjs <jobs.json>
 *
 * jobs.json: [{ "html": "<abs path>", "pdf": "<abs path>", "title": "..." }]
 */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

// ESM resolves bare specifiers from this file's own directory, and
// reports/tools/ has no node_modules — so resolve `playwright` explicitly out
// of the automation project, the one place it is installed.
const here = path.dirname(fileURLToPath(import.meta.url));
const automationPkg = path.resolve(here, '..', '..', 'automation', 'package.json');
const { chromium } = createRequire(automationPkg)('playwright');

const jobs = JSON.parse(readFileSync(process.argv[2], 'utf8'));

const footer = (title) => `
<div style="width:100%;font-size:7.5pt;color:#666;
            font-family:Helvetica,Arial,sans-serif;padding:0 16mm;
            display:flex;justify-content:space-between;">
  <span>${title} — Hà Bảo Ngọc, 23127300</span>
  <span><span class="pageNumber"></span>/<span class="totalPages"></span></span>
</div>`;

const browser = await chromium.launch();
const page = await browser.newPage();

for (const { html, pdf, title } of jobs) {
  // A file:// URL rather than setContent so relative image paths in the
  // bug-report style documents still resolve from the repo.
  await page.goto(pathToFileURL(html).href, { waitUntil: 'load' });
  await page.pdf({
    path: pdf,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: footer(title),
    margin: { top: '16mm', bottom: '16mm', left: '0mm', right: '0mm' },
  });
  console.log(`  ${pdf}`);
}

await browser.close();
