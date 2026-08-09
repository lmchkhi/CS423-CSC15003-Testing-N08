import { defineConfig, devices } from '@playwright/test';

import { createReportTime } from './report-time.js';

const reportTime = createReportTime();

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results/fr12-phase-d',
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
        outputFolder: 'playwrite-test/fr12-access/playwright-report',
        open: 'never',
        title: `FR-12 Access Control | Run by: 23127464 | Run time: ${reportTime.display} | ISO timestamp: ${reportTime.iso}`,
      },
    ],
  ],
  use: {
    trace: 'off',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: {
          env: { ...process.env, MOZ_DISABLE_CONTENT_SANDBOX: '1' },
        },
      },
    },
    {
      name: 'msedge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  ],
});
