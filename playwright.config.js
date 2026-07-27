import { defineConfig, devices } from '@playwright/test';

const browser = process.env.PW_BROWSER ?? 'chromium';
const feature = process.env.PW_FEATURE ?? 'fr05-search';
const studentId = process.env.STUDENT_ID ?? '23127464';
const reportFolder = process.env.PW_REPORT_DIR ?? `reports/html/${feature}/${browser}`;

export default defineConfig({
  testDir: './tests/automation',
  timeout: 30_000,
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  use: {
    baseURL: 'http://127.0.0.1:5173',
    launchOptions: { timeout: 15_000 },
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure'
  },
  reporter: [['html', {
    open: 'never',
    outputFolder: reportFolder,
    title: `Run by: ${studentId} | FR-05 Product Search | ${browser}`
  }]],
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: { headless: false, timeout: 30_000 }
      }
    },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ]
});
