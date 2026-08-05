# EShop automation suite — HW04

TypeScript + `@playwright/test`. Three features, ≥12 data-driven cases each,
run across Chromium / Firefox / WebKit into nine separately-labeled HTML
reports.

## 1. Install

```bash
cd automation
npm install
npx playwright install          # Chromium, Firefox, WebKit browser builds
cp .env.example .env            # then edit .env
```

`.env` holds identity and URLs — `STUDENT_ID`, `STUDENT_NAME`, `WEB_URL`,
`ADMIN_URL`, `API_URL`, the seeded accounts, `HEADLESS`. Never put any of these
in a spec; `.env` is gitignored.

## 2. Start the SUT

Three terminals (details in
`../.claude/skills/playwright-automation/references/eshop-environment.md`):

```bash
cd ~/Documents/eshop-sut/backend        && node server.js      # :3000
cd ~/Documents/eshop-sut/frontend-web   && npm run dev         # :5173
cd ~/Documents/eshop-sut/frontend-admin && npm run dev         # :5174
```

Reset the data with `node database.js` in `backend/` **while the server is
stopped**, then restart it.

## 3. Run

```bash
npm run smoke                                   # environment check
npm run test:list                               # discovery: >=12 cases/feature
npx playwright test tests/fr-02-login.spec.ts --project=chromium

npm run matrix                                  # all 9 cells + run-manifest.md
npm run matrix -- --feature fr-02-login         # one feature, 3 browsers
npm run matrix -- --feature fr-13-dashboard --browser webkit
npm run report:verify                           # asserts the label in all 9 reports
```

Reports land in `../reports/html/<feature-slug>/<browser>/index.html`, JSON
summaries in `../reports/json/`, and the run manifest in
`../reports/run-manifest.md`. Open a report with:

```bash
open ../reports/html/fr-02-login/chromium/index.html
```

Each report's title reads
`Run by: 23127300 | Ha Bao Ngoc | <feature> | <browser> | <ISO timestamp>`, and
the same values repeat in the report's metadata panel.

## 4. Layout

| Path | What |
| --- | --- |
| `tests/` | one spec per feature + `smoke.spec.ts` |
| `test-data/` | one `.cases.json` per feature — the only place case data lives |
| `pages/` | page objects (locators only, no assertions) |
| `fixtures/` | shared setup (logged-in user, admin session) |
| `utils/config.ts` | `.env` loading + validation, the `Run by:` label |
| `utils/data.ts` | data loader: schema, duplicate-ID and ≥12-record checks |
| `utils/api.ts` | API client for setup/teardown and expected values only |
| `scripts/run-matrix.ts` | the 3×3 runner + manifest writer |
| `scripts/verify-reports.ts` | §11 label check across all nine reports |

## 5. Rules that are not negotiable

- No inline case arrays — data comes from `test-data/*.json` (§6).
- `workers: 1`, `fullyParallel: false` — EShop is one SQLite file.
- Tests create their own users/orders via the API; nothing depends on run order.
- No `retries`, no `test.skip` on a red test, no assertion loosened to get
  green. A genuine defect stays failing and gets a bug report.
