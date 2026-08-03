# Playwright implementation patterns

## Configuration

Keep the existing project configuration when compatible. Otherwise define all three named projects:

```ts
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

Require `STUDENT_ID`, `RUN_TIMESTAMP`, `PW_REPORT_BROWSER`, and `FEATURE_SLUG` for a report-producing run. Put the identity into top-level `metadata`, which Playwright includes in its report, and configure the HTML output folder:

```ts
const studentId = process.env.STUDENT_ID;
const runTimestamp = process.env.RUN_TIMESTAMP;
const reportBrowser = process.env.PW_REPORT_BROWSER ?? 'multi-browser';

metadata: {
  'Run identity': `Run by: ${studentId}`,
  'Run timestamp': runTimestamp,
  'Browser': reportBrowser,
},
reporter: [[
  'html',
  {
    open: 'never',
    outputFolder: `reports/${process.env.FEATURE_SLUG}/${reportBrowser}`,
  },
]],
```

Fail configuration early if `STUDENT_ID` or `RUN_TIMESTAMP` is absent during an official run. Do not put the real ID into source code. Open the finished report and visually confirm both metadata values are displayed; do not assume successful file generation proves the requirement.

## Per-browser execution

Invoke each project separately so every browser owns a report folder. A generated runner may compute a fresh timestamp and spawn Playwright with environment variables:

```text
chromium -> reports/<feature>/chromium/
firefox  -> reports/<feature>/firefox/
webkit   -> reports/<feature>/webkit/
```

Use an ISO string from the actual run (`new Date().toISOString()`). Do not replace report files after execution merely to add identity text.

## Data-driven structure

Represent each dataset row with a stable test-case ID and only serializable domain data:

```json
{
  "cases": [
    {
      "id": "TC-LOGIN-001",
      "description": "valid credentials",
      "expected": { "outcome": "success" }
    }
  ]
}
```

Credentials may reference environment-variable names rather than contain secrets. Parse CSV/JSON outside the test declaration, validate required fields, and create one Playwright test per row. Keep boundary inputs and expected messages in the external file.

## Assertions and synchronization

Use at least three meaningful matcher names across the feature. Good combinations include:

- visibility/state: `toBeVisible`, `toBeEnabled`, `toBeChecked`;
- content: `toHaveText`, `toContainText`, `toHaveValue`;
- navigation/data: `toHaveURL`, `toHaveCount`, `toEqual` for API/setup results.

Prefer locator assertions because they auto-retry. Wait for a business-observable condition, response, or locator state. Avoid `waitForTimeout`.

## Failure evidence and triage

Enable screenshots on failure and traces on first retry. Preserve Playwright output next to the relevant run. Before declaring a bug, rerun the exact case, verify test data and environment, and reproduce on at least one relevant browser. Record browser-specific behavior when results differ.
