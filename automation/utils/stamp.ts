import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * HW04 §11 requires each HTML report to *visibly* display
 * "Run by: <StudentID>" together with an ISO timestamp.
 *
 * Playwright's HTML reporter stores config `metadata` inside a base64 payload
 * embedded in index.html, so the string renders in the report's metadata panel
 * but is not present as plain text in the file — a grader (or a grep) cannot
 * confirm it without opening and expanding the report. This helper therefore
 * stamps the same values into the page as a real banner element and into
 * <title>.
 *
 * It only ADDS a header; test results, counts and attachments are untouched.
 * The banner is written after the run, from the same values the run used.
 */
export interface StampFields {
  studentId: string;
  studentName: string;
  feature: string;
  browser: string;
  timestamp: string;
}

const BANNER_ID = 'hw04-run-banner';

export function stampReport(reportDirAbs: string, fields: StampFields): boolean {
  const indexPath = path.join(reportDirAbs, 'index.html');
  if (!fs.existsSync(indexPath)) return false;

  let html = fs.readFileSync(indexPath, 'utf8');
  if (html.includes(BANNER_ID)) return true; // already stamped

  const label =
    `Run by: ${fields.studentId} | ${fields.studentName} | ` +
    `${fields.feature} | ${fields.browser} | ${fields.timestamp}`;

  const banner = `<div id="${BANNER_ID}" style="font:14px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;background:#0f172a;color:#f8fafc;padding:12px 16px;border-bottom:3px solid #38bdf8">
<strong style="font-size:16px">Run by: ${escapeHtml(fields.studentId)}</strong>
&nbsp;·&nbsp; Student: ${escapeHtml(fields.studentName)}
&nbsp;·&nbsp; Feature: ${escapeHtml(fields.feature)}
&nbsp;·&nbsp; Browser: ${escapeHtml(fields.browser)}
&nbsp;·&nbsp; Timestamp (ISO): ${escapeHtml(fields.timestamp)}
</div>`;

  html = html.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${escapeHtml(label)}</title>`,
  );

  const bodyOpen = html.match(/<body[^>]*>/i);
  if (!bodyOpen) return false;
  html = html.replace(bodyOpen[0], `${bodyOpen[0]}\n${banner}\n`);

  fs.writeFileSync(indexPath, html, 'utf8');
  return true;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
