import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const studentId = '23127464';
const feature = 'fr05-search';
const browsers = ['chromium', 'firefox', 'webkit'];
const startedAt = new Date().toISOString();
const cells = [];

for (const browser of browsers) {
  const reportDir = join('reports', 'html', feature, browser);
  rmSync(reportDir, { recursive: true, force: true });
  mkdirSync(reportDir, { recursive: true });
  const runTimestamp = new Date().toISOString();
  const result = spawnSync('npx', ['playwright', 'test', 'tests/automation/fr05-search.spec.js', '--project', browser], {
    shell: process.platform === 'win32',
    stdio: 'inherit',
    env: { ...process.env, STUDENT_ID: studentId, PW_FEATURE: feature, PW_BROWSER: browser, PW_REPORT_DIR: reportDir }
  });
  const indexPath = join(reportDir, 'index.html');
  const label = `Run by: ${studentId} | FR-05 Product Search | ${browser}`;
  if (existsSync(indexPath)) {
    const reportHtml = readFileSync(indexPath, 'utf8');
    const banner = `<header id="hw04-run-label" style="background:#0f172a;color:#fff;padding:12px 20px;font:600 16px system-ui;position:relative;z-index:1">${label}<br><small style="font-weight:400">Executed: ${runTimestamp}</small></header>`;
    writeFileSync(indexPath, reportHtml.replace('<body>', `<body>${banner}`));
  }
  const labeledReport = existsSync(indexPath) && readFileSync(indexPath, 'utf8');
  const labelVerified = Boolean(labeledReport?.includes(label) && labeledReport.includes(runTimestamp));
  cells.push({ feature, browser, exitCode: result.status ?? 1, report: indexPath, runTimestamp, labelVerified });
}

const manifest = { studentId, feature, startedAt, completedAt: new Date().toISOString(), cells };
writeFileSync(join('reports', 'fr05-run-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.table(cells);
if (cells.some((cell) => cell.exitCode !== 0 || !cell.labelVerified)) process.exitCode = 1;
