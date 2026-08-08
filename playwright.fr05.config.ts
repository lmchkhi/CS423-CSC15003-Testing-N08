import { defineConfig, devices } from '@playwright/test';

const runtimeTimestamp = new Date().toISOString();

export default defineConfig({
  testDir: './tests',
  testMatch: 'fr05-search.spec.ts',
  outputDir: 'test-results/fr05-phase-d',
  fullyParallel: false,
  workers: 1,
  forbidOnly: true,
  retries: 0,
  metadata: {
    'Run by': '23127464',
    'Runtime timestamp': runtimeTimestamp,
  },
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'reports/fr05-search/playwright-report',
        open: 'never',
        title: `FR-05 — Xem danh sách và tìm kiếm sản phẩm | Run by: 23127464 | Runtime timestamp: ${runtimeTimestamp}`,
      },
    ],
  ],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
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
      name: 'msedge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  ],
});
