import { defineConfig, devices } from '@playwright/test';

const studentId = process.env.STUDENT_ID ?? '23127475';
const feature = process.env.HW04_FEATURE ?? 'fr03-forgot-password';
const browser = process.env.HW04_BROWSER ?? 'chromium';
const runAt = process.env.HW04_RUN_AT ?? new Date().toISOString();
const reportDir = process.env.HW04_REPORT_DIR ?? `reports/html/${feature}/${browser}`;

export default defineConfig({
  testDir: './tests/automation/specs',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: false,
  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'never',
        outputFolder: reportDir,
        title: `Run by: ${studentId} | ${feature} | ${browser} | ${runAt}`,
      },
    ],
  ],
  use: {
    baseURL: process.env.WEB_BASE_URL ?? 'http://127.0.0.1:5173',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
