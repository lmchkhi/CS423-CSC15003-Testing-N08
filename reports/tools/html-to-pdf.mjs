/**
 * HTML -> PDF using headless Chromium. Called by build-pdfs.py, which does the
 * Markdown -> HTML half; keeping the split this way means neither half needs a
 * dependency the other one owns.
 *
 *   cd reports/tools && npm install && npx playwright install chromium
 *   node reports/tools/html-to-pdf.mjs <jobs.json>
 *
 * jobs.json: [{ "html": "<abs path>", "pdf": "<abs path>", "title": "..." }]
 */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

// HW04 resolved `playwright` out of its automation/ project. HW05 has no such
// project — the PDF toolchain is the only thing here that needs a browser — so
// it carries its own package.json in this directory.
const here = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(path.join(here, 'package.json'));
const { chromium } = require('playwright');

// Load mermaid from the local node_modules so the pipeline works offline and
// reproduces identically across machines.
const mermaidSrc = readFileSync(
  path.join(here, 'node_modules', 'mermaid', 'dist', 'mermaid.min.js'),
  'utf8'
);

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

  // ── Mermaid rendering ────────────────────────────────────────────────────
  // python-markdown renders ```mermaid fences as <code class="language-mermaid">
  // inside a <pre>. Convert those to <pre class="mermaid"> so mermaid.run()
  // picks them up, inject the bundle, then wait for every diagram to render.
  const hasMermaid = await page.evaluate(() => {
    const blocks = document.querySelectorAll('code.language-mermaid');
    blocks.forEach(code => {
      const pre = document.createElement('pre');
      pre.className = 'mermaid';
      pre.textContent = code.textContent;
      code.parentElement.replaceWith(pre);
    });
    return blocks.length > 0;
  });

  if (hasMermaid) {
    await page.addScriptTag({ content: mermaidSrc });
    await page.evaluate(async () => {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        securityLevel: 'loose',
      });
      await window.mermaid.run();
    });
    // Wait until every pre.mermaid has been processed (or give up after 10 s
    // so a malformed diagram does not hang the whole pipeline).
    await page.waitForFunction(
      () => document.querySelectorAll('pre.mermaid:not([data-processed])').length === 0,
      { timeout: 10_000 }
    ).catch(() => {
      console.error('  WARNING: some mermaid diagrams may not have rendered');
    });
  }
  // ── end Mermaid ──────────────────────────────────────────────────────────

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
