# Playwright Implementation Patterns

Use these patterns as adaptable starting points. Preserve sound repository conventions and replace all placeholders with evidence-backed values.

## Typed external data

Prefer JSON when records contain nested actions or expectations:

```json
[
  {
    "id": "AUTH-TC-001",
    "titleVi": "Đăng nhập thành công",
    "category": "positive",
    "input": {
      "email": "valid@example.test",
      "passwordEnv": "E2E_USER_PASSWORD"
    },
    "expected": {
      "kind": "url",
      "value": "/account"
    }
  }
]
```

Validate at runtime before registering tests:

```ts
import fs from 'node:fs';

export function loadCases<T extends { id: string }>(
  path: string,
  validate: (value: unknown) => value is T,
  minimum = 12,
): T[] {
  const raw: unknown = JSON.parse(fs.readFileSync(path, 'utf8'));
  if (!Array.isArray(raw) || !raw.every(validate)) {
    throw new Error(`Dữ liệu kiểm thử không hợp lệ: ${path}`);
  }
  if (raw.length < minimum) {
    throw new Error(`Cần ít nhất ${minimum} ca kiểm thử trong ${path}`);
  }
  const ids = raw.map((item) => item.id);
  if (new Set(ids).size !== ids.length) {
    throw new Error(`Mã ca kiểm thử bị trùng trong ${path}`);
  }
  return raw;
}
```

Use a schema library already present in the repository when available. Do not add a dependency solely to avoid a small explicit type guard.

## Test registration

Include the stable ID and Vietnamese description in every title:

```ts
for (const testCase of cases) {
  test(`${testCase.id} | ${testCase.titleVi}`, async ({ page }) => {
    // Arrange with deterministic setup.
    // Act through the feature's UI.
    // Assert the requirement's observable result.
  });
}
```

When cases have materially different journeys, group them by a small typed `journey` or `expected.kind` vocabulary. Never use a switch on specific IDs.

## Browser and reporter configuration

Merge these ideas into the existing config:

```ts
import { defineConfig, devices } from '@playwright/test';

const reportFolder = process.env.PW_REPORT_FOLDER ?? 'playwright-report';
const studentId = process.env.STUDENT_ID;
const runTimestamp = process.env.RUN_ISO_TIMESTAMP;

if (!studentId) throw new Error('Thiếu biến môi trường STUDENT_ID');
if (!runTimestamp) throw new Error('Thiếu biến môi trường RUN_ISO_TIMESTAMP');

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['list'],
    ['html', {
      open: 'never',
      outputFolder: reportFolder,
      title: `Run by: ${studentId} | ${runTimestamp}`,
    }],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

Keep the ISO timestamp stable for one feature-browser run. Generate it in the runner immediately before invoking Playwright. Do not use an import-time timestamp that could be mistaken for execution evidence before a run occurs.

## Sequential feature-browser runner

Implement a small Node runner that:

1. Receives an actual student ID from `STUDENT_ID`.
2. Defines feature slugs and their spec paths.
3. Iterates Chromium, Firefox, and WebKit sequentially.
4. Generates `new Date().toISOString()` for each cell.
5. Sets `PW_REPORT_FOLDER` to `reports/html/<feature>/<browser>`.
6. Sets `RUN_ISO_TIMESTAMP` for the visible report title.
7. Invokes `npx playwright test <spec> --project=<browser>`.
8. Records exit code, timestamp, and report path.
9. Continues to preserve all possible reports, then exits nonzero if any cell failed.

Prefer `spawnSync` with an argument array and `shell: false`. Avoid string-built shell commands.

## Assertion coverage

Choose assertions that implement actual oracles, not rubric decoration:

| Family | Examples | Suitable oracle |
| --- | --- | --- |
| Visibility | `toBeVisible`, `toBeHidden` | Message, dialog, restricted control |
| Text/accessibility | `toContainText`, `toHaveAccessibleName` | Confirmation, validation, accessible UI |
| Value/state | `toHaveValue`, `toBeChecked`, `toHaveAttribute` | Form persistence, selected state |
| Navigation | `toHaveURL` | Redirect or route transition |
| Collection | `toHaveCount` | Search results, cart rows |
| Plain value/response | `toBe`, `toEqual`, `toMatchObject` | Status or permitted setup verification |

Map at least three used families to concrete case IDs in the Vietnamese test-design document.

## Repair rules

- Replace brittle CSS/XPath with semantic locators only after inspecting the rendered UI or source.
- Replace fixed timeouts with Playwright auto-waiting or an observable readiness condition.
- Strengthen weak assertions to match the requirement.
- Fix isolation with unique data, setup APIs, fixtures, or cleanup rather than serializing the whole suite without cause.
- Treat a mismatch between valid expected behavior and actual behavior as a potential product defect.
- Retain traces, screenshots, report paths, and failure messages as evidence; do not infer a bug without inspection.
