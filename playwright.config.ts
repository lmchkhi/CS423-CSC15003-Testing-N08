import { defineConfig, devices } from '@playwright/test';

const runtimeTimestamp = new Date().toISOString();

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results/fr08-phase-d',
  fullyParallel: false,
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
        outputFolder: 'reports/FR-08-checkout/playwright-report',
        open: 'never',
        title: `FR-08 Checkout | Run by: 23127464 | Runtime timestamp: ${runtimeTimestamp}`,
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
