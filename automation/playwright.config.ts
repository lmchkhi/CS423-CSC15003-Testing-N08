import { defineConfig, devices } from '@playwright/test';
import {
  config as env,
  jsonReportPath,
  reportDir,
  runLabel,
  runMetadata,
} from './utils/config';

/**
 * One invocation of Playwright = one matrix cell (one feature on one browser),
 * driven by scripts/run-matrix.ts. Report folder, feature name and browser
 * label all come from env so the nine cells never overwrite each other.
 */
export default defineConfig({
  testDir: './tests',

  // EShop keeps everything in a single SQLite file: parallel workers corrupt
  // each other's state (FR-02 lockout counters, FR-10 order transitions).
  fullyParallel: false,
  workers: 1,

  // Retries hide real defects; HW04 wants genuine failures visible.
  retries: 0,
  forbidOnly: !!process.env.CI,

  // FR-02's account lockout is a real 30-second wall-clock wait.
  timeout: 90_000,
  expect: { timeout: 10_000 },

  metadata: runMetadata,

  reporter: [
    ['list'],
    // §11: the title carries the literal "Run by: <StudentID>" + ISO timestamp.
    ['html', { outputFolder: reportDir, open: 'never', title: runLabel }],
    ['json', { outputFile: jsonReportPath }],
  ],

  use: {
    baseURL: env.webUrl,
    headless: env.headless,
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
