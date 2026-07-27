import { spawnSync } from 'node:child_process';
import path from 'node:path';

const studentId = process.env.STUDENT_ID ?? '23127062';
const browsers = ['chromium', 'firefox', 'webkit'];
const features = [
  {
    slug: 'fr-01-register',
    spec: 'tests/fr-01-register.spec.ts',
  },
];
const results = [];

for (const feature of features) {
  for (const browser of browsers) {
    const timestamp = new Date().toISOString();
    const reportFolder = path.join('reports', 'html', feature.slug, browser);
    const result = spawnSync(
      process.platform === 'win32' ? 'npx.cmd' : 'npx',
      ['playwright', 'test', feature.spec, `--project=${browser}`],
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          STUDENT_ID: studentId,
          RUN_ISO_TIMESTAMP: timestamp,
          PW_REPORT_FOLDER: reportFolder,
        },
        encoding: 'utf8',
        shell: false,
        stdio: 'inherit',
      },
    );
    const status = result.status === 0 ? 'PASSED' : 'FAILED';
    results.push({ feature: feature.slug, browser, status, reportFolder, timestamp });
    console.log(
      `[${status}] feature=${feature.slug} browser=${browser} report=${reportFolder} timestamp=${timestamp}`,
    );
  }
}

console.table(results);
process.exitCode = results.some((result) => result.status === 'FAILED') ? 1 : 0;
