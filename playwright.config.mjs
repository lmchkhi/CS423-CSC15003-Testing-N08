import { defineConfig, devices } from '@playwright/test';

const officialRun = process.env.PW_OFFICIAL_RUN === '1';
const studentId = process.env.STUDENT_ID;
const runTimestamp = process.env.RUN_TIMESTAMP;
const reportBrowser = process.env.PW_REPORT_BROWSER ?? 'local';
const featureSlug = process.env.FEATURE_SLUG ?? 'account-registration';
const reportTitle = studentId
  ? `FR-01 Account registration — Run by: ${studentId}`
  : 'FR-01 Account registration — Local non-evidence run';

if (officialRun && (!studentId || !runTimestamp)) {
  throw new Error('Official runs require STUDENT_ID and RUN_TIMESTAMP.');
}

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: 'account-registration.spec.mjs',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 20_000,
  expect: { timeout: 5_000 },
  outputDir: `artifacts/${featureSlug}/${reportBrowser}`,
  use: {
    baseURL: process.env.WEB_BASE_URL ?? 'http://127.0.0.1:5173',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  metadata: {
    'Run identity': studentId ? `Run by: ${studentId}` : 'Local non-evidence run',
    'Run timestamp': runTimestamp ?? new Date().toISOString(),
    Browser: reportBrowser,
    Feature: 'FR-01 Account registration',
  },
  reporter: [['list'], ['html', {
    open: 'never',
    outputFolder: `reports/${featureSlug}/${reportBrowser}`,
    title: reportTitle,
  }]],
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
