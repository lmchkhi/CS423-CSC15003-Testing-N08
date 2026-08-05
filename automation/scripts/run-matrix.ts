import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { config, localIsoTimestamp, runTimestamp } from '../utils/config';
import { stampReport } from '../utils/stamp';

/**
 * HW04 §6: each feature must run on all three browsers and each run must
 * produce its own HTML report labeled "Run by: <StudentID>". This runner
 * executes the nine cells one at a time and writes reports/run-manifest.md.
 *
 *   npm run matrix                                  # all 9 cells
 *   npm run matrix -- --feature fr-02-login         # 3 cells
 *   npm run matrix -- --browser webkit              # 3 cells
 *   npm run matrix -- --feature fr-13-dashboard --browser firefox
 */

interface Feature {
  slug: string;
  name: string;
  spec: string;
}

const FEATURES: Feature[] = [
  { slug: 'fr-02-login', name: 'FR-02 Dang nhap & khoa tai khoan', spec: 'tests/fr-02-login.spec.ts' },
  { slug: 'fr-10-order-state', name: 'FR-10 Trang thai don hang', spec: 'tests/fr-10-order-state.spec.ts' },
  { slug: 'fr-13-dashboard', name: 'FR-13 Dashboard', spec: 'tests/fr-13-dashboard.spec.ts' },
];

const BROWSERS = ['chromium', 'firefox', 'webkit'] as const;

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const MANIFEST = path.join(REPO_ROOT, 'reports', 'run-manifest.md');

function arg(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

interface CellResult {
  feature: Feature;
  browser: string;
  exitCode: number;
  reportPath: string;
  passed: number;
  failed: number;
  skipped: number;
  timestamp: string;
}

function readCounts(jsonPath: string): Pick<CellResult, 'passed' | 'failed' | 'skipped'> {
  const empty = { passed: 0, failed: 0, skipped: 0 };
  if (!fs.existsSync(jsonPath)) return empty;
  try {
    const report = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) as {
      stats?: { expected?: number; unexpected?: number; skipped?: number };
    };
    return {
      passed: report.stats?.expected ?? 0,
      failed: report.stats?.unexpected ?? 0,
      skipped: report.stats?.skipped ?? 0,
    };
  } catch {
    return empty;
  }
}

function runCell(feature: Feature, browser: string): CellResult {
  const reportDirRel = path.join('..', 'reports', 'html', feature.slug, browser);
  const jsonRel = path.join('..', 'reports', 'json', `${feature.slug}-${browser}.json`);
  const jsonAbs = path.join(REPO_ROOT, 'reports', 'json', `${feature.slug}-${browser}.json`);
  const timestamp = localIsoTimestamp();

  console.log(`\n=== ${feature.slug} × ${browser} → reports/html/${feature.slug}/${browser} ===`);

  const result = spawnSync(
    'npx',
    ['playwright', 'test', feature.spec, `--project=${browser}`],
    {
      stdio: 'inherit',
      env: {
        ...process.env,
        FEATURE_SLUG: feature.slug,
        FEATURE_NAME: feature.name,
        BROWSER: browser,
        REPORT_DIR: reportDirRel,
        REPORT_JSON: jsonRel,
        RUN_TIMESTAMP: timestamp,
      },
    },
  );

  // §11: make "Run by: <StudentID>" + ISO timestamp visible in the report page.
  const reportDirAbs = path.join(REPO_ROOT, 'reports', 'html', feature.slug, browser);
  const stamped = stampReport(reportDirAbs, {
    studentId: config.studentId,
    studentName: config.studentName,
    feature: feature.name,
    browser,
    timestamp,
  });
  if (!stamped) {
    console.warn(`WARNING: could not stamp ${reportDirAbs}/index.html — report missing?`);
  }

  return {
    feature,
    browser,
    exitCode: result.status ?? 1,
    reportPath: `reports/html/${feature.slug}/${browser}/index.html`,
    timestamp,
    ...readCounts(jsonAbs),
  };
}

function verifyLabel(cell: CellResult): boolean {
  const indexPath = path.join(REPO_ROOT, cell.reportPath);
  if (!fs.existsSync(indexPath)) return false;
  const html = fs.readFileSync(indexPath, 'utf8');
  return html.includes(`Run by: ${config.studentId}`) && html.includes(cell.timestamp);
}

/** Canonical key for one matrix cell, and the order rows are emitted in. */
function cellKey(featureSlug: string, browser: string): string {
  return `${featureSlug}|${browser}`;
}

const CANONICAL_ORDER = FEATURES.flatMap((feature) =>
  BROWSERS.map((browser) => cellKey(feature.slug, browser)),
);

function renderRow(cell: CellResult): string {
  const status = cell.exitCode === 0 ? 'PASS' : 'FAIL';
  const label = verifyLabel(cell) ? 'yes' : '**NO**';
  return (
    `| ${cell.feature.slug} | ${cell.browser} | ${status} (exit ${cell.exitCode}) ` +
    `| ${cell.passed} | ${cell.failed} | ${cell.skipped} | ${cell.timestamp} ` +
    `| \`${cell.reportPath}\` | ${label} |`
  );
}

/** `| a | b | ... |` -> ['', 'a', 'b', ..., ''], so data columns start at 1. */
function columns(line: string): string[] {
  return line.split('|').map((cell) => cell.trim());
}

/**
 * A filtered run (`--feature`, `--browser`) must not delete the rows of cells
 * it did not execute — on video day FR-02 is re-run on camera after the other
 * six cells already have rows. Existing rows are kept verbatim and re-keyed by
 * (feature, browser); header and separator lines never match CANONICAL_ORDER,
 * so they drop out naturally.
 */
function readExistingRows(): Map<string, string> {
  const rows = new Map<string, string>();
  if (!fs.existsSync(MANIFEST)) return rows;
  for (const line of fs.readFileSync(MANIFEST, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) continue;
    const cols = columns(trimmed);
    const key = cellKey(cols[1] ?? '', cols[2] ?? '');
    if (CANONICAL_ORDER.includes(key)) rows.set(key, trimmed);
  }
  return rows;
}

function writeManifest(cells: CellResult[]): void {
  const rows = readExistingRows();
  for (const cell of cells) {
    rows.set(cellKey(cell.feature.slug, cell.browser), renderRow(cell));
  }

  const ordered = CANONICAL_ORDER.filter((key) => rows.has(key)).map(
    (key) => rows.get(key) as string,
  );

  const failedCells = ordered.filter((line) =>
    (columns(line)[3] ?? '').startsWith('FAIL'),
  ).length;
  const unlabeled = ordered.filter((line) => columns(line)[9] !== 'yes').length;
  const refreshed = cells
    .map((cell) => `${cell.feature.slug}×${cell.browser}`)
    .join(', ');

  const body = `# Run manifest — HW04 browser matrix

Last updated ${localIsoTimestamp()} by \`npm run matrix\`.
Run by: ${config.studentId} (${config.studentName}).
Cells refreshed by this invocation: ${refreshed || 'none'}. Rows for cells not
run this time are carried over unchanged from the previous invocation.

Statuses are recorded as they happened. A FAIL cell keeps its report — a
failing assertion that reflects a genuine EShop defect is evidence, not
something to hide.

| Feature | Browser | Result | Passed | Failed | Skipped | ISO timestamp | Report | Label verified |
|---|---|---|---:|---:|---:|---|---|---|
${ordered.join('\n')}

**Cells recorded:** ${ordered.length} / ${CANONICAL_ORDER.length} · **Failed cells:** ${failedCells} · **Reports missing the \`Run by:\` label or timestamp:** ${unlabeled}
`;

  fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
  fs.writeFileSync(MANIFEST, body, 'utf8');
  console.log(`\nManifest written to ${path.relative(REPO_ROOT, MANIFEST)}`);
}

function main(): void {
  const featureFilter = arg('feature');
  const browserFilter = arg('browser');

  const features = featureFilter
    ? FEATURES.filter((f) => f.slug === featureFilter)
    : FEATURES;
  const browsers = browserFilter
    ? BROWSERS.filter((b) => b === browserFilter)
    : [...BROWSERS];

  if (features.length === 0) {
    throw new Error(`Unknown --feature. Known: ${FEATURES.map((f) => f.slug).join(', ')}`);
  }
  if (browsers.length === 0) {
    throw new Error(`Unknown --browser. Known: ${BROWSERS.join(', ')}`);
  }

  console.log(
    `Matrix: ${features.length} feature(s) × ${browsers.length} browser(s) = ` +
      `${features.length * browsers.length} cell(s). Base timestamp ${runTimestamp}.`,
  );

  const cells: CellResult[] = [];
  for (const feature of features) {
    for (const browser of browsers) {
      // Every cell runs even if an earlier one failed — all reports are needed.
      cells.push(runCell(feature, browser));
    }
  }

  console.log('\n--- Matrix summary ---');
  for (const cell of cells) {
    console.log(
      `${cell.exitCode === 0 ? 'PASS' : 'FAIL'}  ${cell.feature.slug.padEnd(18)} ${cell.browser.padEnd(9)} ` +
        `${cell.passed}p/${cell.failed}f  ${cell.reportPath}  label=${verifyLabel(cell) ? 'ok' : 'MISSING'}`,
    );
  }

  writeManifest(cells);
  process.exitCode = cells.some((c) => c.exitCode !== 0) ? 1 : 0;
}

main();
