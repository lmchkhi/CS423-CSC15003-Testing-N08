import { defineConfig, devices } from '@playwright/test';

import { createReportTime } from './report-time.js';

const reportTime = createReportTime();
const inheritedProcessEnv = Object.fromEntries(
  Object.entries(process.env).filter((entry): entry is [string, string] => entry[1] !== undefined),
);

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results/fr08-phase-d',
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
        outputFolder: 'playwrite-test/FR-08-checkout/playwright-report',
        open: 'never',
        title: `FR-08 Checkout | Run by: 23127464 | Run time: ${reportTime.display} | ISO timestamp: ${reportTime.iso}`,
      },
    ],
  ],
  use: {
    trace: 'off',
    screenshot: 'only-on-failure',
    // Login password is rendered as type="text" by the SUT. Recording failure video would
    // capture runtime credentials; Firefox page creation is handled separately below.
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
          // Firefox 1538 launches but browserContext.newPage fails under the default sandbox
          // on this Windows test host. A minimal black-box probe confirmed these flags restore it.
          firefoxUserPrefs: {
            'security.sandbox.content.level': 0,
            'security.sandbox.gpu.level': 0,
          },
          env: {
            ...inheritedProcessEnv,
            MOZ_DISABLE_CONTENT_SANDBOX: '1',
            MOZ_DISABLE_GMP_SANDBOX: '1',
            MOZ_DISABLE_RDD_SANDBOX: '1',
            MOZ_DISABLE_GPU_SANDBOX: '1',
          },
        },
      },
    },
    {
      name: 'msedge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  ],
});
