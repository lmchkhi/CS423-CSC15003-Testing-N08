import { defineConfig, devices } from '@playwright/test';

const browserName = process.env.PW_REPORT_BROWSER ?? 'all-browsers';
const featureName = process.env.FEATURE_NAME ?? 'FR-03 Forgot Password Reset';
const studentId = process.env.STUDENT_ID ?? 'STUDENT_ID_NOT_SET';
const reportDir =
  process.env.PW_HTML_REPORT_DIR ?? `reports/html/fr03-forgot-reset-password/${browserName}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  timeout: 45_000,
  expect: {
    timeout: 7_000
  },
  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'never',
        outputFolder: reportDir,
        title: `Run by: ${studentId} | ${featureName} | ${browserName} | ${new Date().toISOString()}`
      }
    ]
  ],
  use: {
    baseURL: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],
  outputDir: 'test-results/fr03-forgot-reset-password'
});
