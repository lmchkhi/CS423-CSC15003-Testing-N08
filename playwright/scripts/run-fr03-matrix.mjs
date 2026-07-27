import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const browsers = ['chromium', 'firefox', 'webkit'];
const featureSlug = 'fr03-forgot-reset-password';
const featureName = 'FR-03 Forgot Password Reset';
const studentId = process.env.STUDENT_ID;

if (!studentId) {
  console.error('STUDENT_ID is required so every HTML report can visibly contain "Run by: <StudentID>".');
  console.error('Example: STUDENT_ID=25127001 npm run test:fr03:matrix');
  process.exit(2);
}

fs.mkdirSync(path.join('reports'), { recursive: true });

const manifest = [];

function ensureVisibleReportLabel(indexPath, browser) {
  if (!fs.existsSync(indexPath)) {
    return { exists: false, hasStudentLabel: false, hasBrowserLabel: false };
  }

  const label = `Run by: ${studentId}`;
  const browserText = `Browser: ${browser}`;
  const timestampText = `Timestamp: ${new Date().toISOString()}`;
  let html = fs.readFileSync(indexPath, 'utf8');

  if (!html.includes(label)) {
    const banner = `<div id="student-run-label" style="position:sticky;top:0;z-index:9999;padding:10px 16px;background:#0f62fe;color:#fff;font:600 14px Arial,sans-serif">${label} | Feature: ${featureName} | ${browserText} | ${timestampText}</div>`;
    html = html.includes('<body>') ? html.replace('<body>', `<body>${banner}`) : `${banner}\n${html}`;
    fs.writeFileSync(indexPath, html, 'utf8');
  }

  const verifiedHtml = fs.readFileSync(indexPath, 'utf8');
  return {
    exists: true,
    hasStudentLabel: verifiedHtml.includes(label),
    hasBrowserLabel: verifiedHtml.includes(browser)
  };
}

for (const browser of browsers) {
  const reportDir = path.join('reports', 'html', featureSlug, browser);
  const env = {
    ...process.env,
    FEATURE_NAME: featureName,
    PW_REPORT_BROWSER: browser,
    PW_HTML_REPORT_DIR: reportDir
  };

  console.log(`\n=== Running ${featureName} on ${browser} ===`);
  const result = spawnSync(
    'npx',
    ['playwright', 'test', 'tests/fr03-forgot-reset-password.spec.ts', `--project=${browser}`],
    {
      env,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    }
  );

  const indexPath = path.join(reportDir, 'index.html');
  const reportCheck = ensureVisibleReportLabel(indexPath, browser);
  const status = result.status ?? 1;

  manifest.push({
    feature: featureName,
    browser,
    exitStatus: status,
    reportPath: indexPath,
    reportExists: reportCheck.exists,
    hasStudentLabel: reportCheck.hasStudentLabel,
    hasBrowserLabel: reportCheck.hasBrowserLabel,
    checkedAt: new Date().toISOString()
  });
}

const manifestPath = path.join('reports', `${featureSlug}-manifest.json`);
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log('\nFR-03 browser matrix summary:');
for (const item of manifest) {
  console.log(
    `${item.browser}: exit=${item.exitStatus}, report=${item.reportPath}, Run by label=${item.hasStudentLabel}`
  );
}
console.log(`Manifest: ${manifestPath}`);

const failed = manifest.some(
  (item) => item.exitStatus !== 0 || !item.reportExists || !item.hasStudentLabel || !item.hasBrowserLabel
);
process.exit(failed ? 1 : 0);
