import * as fs from 'node:fs';
import * as path from 'node:path';
import { config } from '../utils/config';

/**
 * §11 anti-cheat gate: every HTML report must visibly carry
 * "Run by: <StudentID>" together with an ISO timestamp. File existence is not
 * evidence — this reads each index.html and checks the strings.
 *
 *   npm run report:verify
 */

const HTML_ROOT = path.resolve(__dirname, '..', '..', 'reports', 'html');
const ISO_PATTERN = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z/;
const EXPECTED_CELLS = 9;

interface Check {
  report: string;
  hasRunBy: boolean;
  hasTimestamp: boolean;
}

/**
 * Exactly reports/html/<feature>/<browser>/index.html — not the trace viewer's
 * own nested index.html, and not scratch dirs (prefixed with "_").
 */
function findReports(root: string): string[] {
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((feature) => feature.isDirectory() && !feature.name.startsWith('_'))
    .flatMap((feature) =>
      fs
        .readdirSync(path.join(root, feature.name), { withFileTypes: true })
        .filter((browser) => browser.isDirectory())
        .map((browser) => path.join(root, feature.name, browser.name, 'index.html'))
        .filter((file) => fs.existsSync(file)),
    );
}

function main(): void {
  const reports = findReports(HTML_ROOT);

  if (reports.length === 0) {
    console.error(`No reports under ${HTML_ROOT}. Run \`npm run matrix\` first.`);
    process.exitCode = 1;
    return;
  }

  const checks: Check[] = reports.map((file) => {
    const html = fs.readFileSync(file, 'utf8');
    return {
      report: path.relative(path.join(HTML_ROOT, '..', '..'), file),
      hasRunBy: html.includes(`Run by: ${config.studentId}`),
      hasTimestamp: ISO_PATTERN.test(html),
    };
  });

  for (const check of checks) {
    const ok = check.hasRunBy && check.hasTimestamp;
    console.log(
      `${ok ? 'ok  ' : 'FAIL'} ${check.report}` +
        (ok ? '' : `  (Run by: ${check.hasRunBy}, ISO timestamp: ${check.hasTimestamp})`),
    );
  }

  const bad = checks.filter((c) => !c.hasRunBy || !c.hasTimestamp);
  console.log(
    `\n${checks.length}/${EXPECTED_CELLS} expected reports found, ${bad.length} unlabeled.`,
  );

  process.exitCode = bad.length > 0 || checks.length < EXPECTED_CELLS ? 1 : 0;
}

main();
