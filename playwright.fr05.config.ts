import { defineConfig, devices } from '@playwright/test';

import { createReportTime } from './report-time.js';

const reportTime = createReportTime();

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
    'Run time (dd/MM/yyyy HH:mm)': reportTime.display,
    'Runtime timestamp (ISO)': reportTime.iso,
  },
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwrite-test/fr05-search/playwright-report',
        open: 'never',
        title: `FR-05 — Xem danh sách và tìm kiếm sản phẩm | Run by: 23127464 | Run time: ${reportTime.display} | ISO timestamp: ${reportTime.iso}`,
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
