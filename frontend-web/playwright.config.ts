import { defineConfig, devices } from '@playwright/test';

const reportFolder = process.env.PW_REPORT_FOLDER ?? 'playwright-report';
const studentId = process.env.STUDENT_ID ?? '23127062';
const runTimestamp = process.env.RUN_ISO_TIMESTAMP ?? 'static-check';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/fr-01-register.spec.ts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'never',
        outputFolder: reportFolder,
        title: `Run by: ${studentId} | ${runTimestamp}`,
      },
    ],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? 'http://127.0.0.1:5173',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
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
  webServer: [
    {
      command: 'node ../backend/server.js',
      url: 'http://127.0.0.1:3000/api/products',
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
    },
    {
      command: 'npm run dev -- --host 127.0.0.1',
      url: 'http://127.0.0.1:5173',
      reuseExistingServer: !process.env.CI,
      timeout: 30_000,
    },
  ],
});
