import { defineConfig, devices } from '@playwright/test';

const runtimeTimestamp = new Date().toISOString();

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results/fr12-phase-d',
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
        outputFolder: 'reports/fr12-access/playwright-report',
        open: 'never',
        title: `FR-12 Access Control | Run by: 23127464 | Runtime timestamp: ${runtimeTimestamp}`,
      },
    ],
  ],
  use: {
    trace: 'off',
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
