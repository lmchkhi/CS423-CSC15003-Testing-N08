# FR-03 Playwright Automation

Black-box Playwright automation for `FR-03: Forgot password and password reset (two steps)`.

## Scope

- Source requirements: `../SystemRequirementsSpecification.md`, `../api_specification.md`, `../2026.HW04.Automation Testing_En.pdf`
- SUT code folders are intentionally not used as test design sources.
- Fifteen data-driven logical test cases are implemented for FR-03: `FR03-TC-001` through `FR03-TC-015`.

## Setup

```bash
cd playwright
npm install
```

Start the EShop backend and frontend web according to `../setup_guide.md`.

## Run

Set the required runtime values:

```bash
export STUDENT_ID=23127475
export FRONTEND_URL=http://localhost:5173
export API_URL=http://localhost:3000
```

List discovered tests. Expected discovery is 45 executions: 15 FR-03 cases across Chromium, Firefox, and WebKit.

```bash
npm run test:list
```

Run the full FR-03 three-browser matrix:

```bash
npm run test:fr03:matrix
```

Expected HTML reports:

```text
playwright/reports/html/fr03-forgot-reset-password/chromium/index.html
playwright/reports/html/fr03-forgot-reset-password/firefox/index.html
playwright/reports/html/fr03-forgot-reset-password/webkit/index.html
```

Each report title includes `Run by: <STUDENT_ID>`, feature name, browser, and an ISO timestamp. The runner also writes:

```text
playwright/reports/fr03-forgot-reset-password-manifest.json
```

## Test Data

The testcase data is stored outside the spec:

```text
playwright/test-data/fr03-forgot-reset-password.json
```

The spec validates required fields and duplicate testcase IDs before executing.
