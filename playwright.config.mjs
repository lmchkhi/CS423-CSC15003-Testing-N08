import { defineConfig, devices } from "@playwright/test";

const officialRun = process.env.PW_OFFICIAL_RUN === "1";
const studentId = process.env.STUDENT_ID;
const runTimestamp = process.env.RUN_TIMESTAMP;
const supportedBrowsers = ["chromium", "firefox", "webkit"];
const reportBrowser = process.env.PW_REPORT_BROWSER ?? "chromium";
const featureSlug = process.env.FEATURE_SLUG ?? "account-registration";
const listOnly = process.argv.includes("--list");
const featureTitles = {
  "account-registration": "FR-01 Account registration",
  "product-csv-import": "FR-16 Product CSV import",
  "shopping-cart": "FR-07 Shopping cart"
};
const featureTitle = featureTitles[featureSlug] ?? featureSlug;
const defaultWebBaseURL =
  featureSlug === "product-csv-import"
    ? "http://127.0.0.1:5174"
    : "http://127.0.0.1:5173";
const webServer =
  featureSlug === "product-csv-import"
    ? [
        {
          command: `node -e "require('./server'); setInterval(() => {}, 60000)"`,
          cwd: "./backend",
          url: "http://127.0.0.1:3000/api/products",
          reuseExistingServer: true,
          timeout: 30_000
        },
        {
          command: "npm run dev -- --host 127.0.0.1 --port 5174",
          cwd: "./frontend-admin",
          url: "http://127.0.0.1:5174",
          reuseExistingServer: true,
          timeout: 30_000
        }
      ]
    : featureSlug === "shopping-cart"
      ? {
          command: "npm run dev -- --host 127.0.0.1 --port 5173",
          cwd: "./frontend-web",
          url: "http://127.0.0.1:5173",
          reuseExistingServer: true,
          timeout: 30_000
        }
      : undefined;
const reportTitle = studentId
  ? `${featureTitle} — Run by: ${studentId}`
  : `${featureTitle} — Local non-evidence run`;

if (officialRun && (!studentId || !runTimestamp)) {
  throw new Error("Official runs require STUDENT_ID and RUN_TIMESTAMP.");
}

if (!supportedBrowsers.includes(reportBrowser)) {
  throw new Error(
    `PW_REPORT_BROWSER must be one of: ${supportedBrowsers.join(", ")}.`
  );
}

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: `${featureSlug}.spec.mjs`,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 20_000,
  expect: { timeout: 5_000 },
  outputDir: `artifacts/${featureSlug}/${reportBrowser}`,
  webServer,
  use: {
    baseURL: process.env.WEB_BASE_URL ?? defaultWebBaseURL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure"
  },
  metadata: {
    "Run identity": studentId
      ? `Run by: ${studentId}`
      : "Local non-evidence run",
    "Run timestamp": runTimestamp ?? new Date().toISOString(),
    Browser: reportBrowser,
    Feature: featureTitle
  },
  reporter: listOnly
    ? [["list"]]
    : [
        ["list"],
        [
          "html",
          {
            open: "never",
            outputFolder: `reports/${featureSlug}/${reportBrowser}`,
            title: reportTitle
          }
        ]
      ],
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } }
  ].filter((project) => project.name === reportBrowser)
});
