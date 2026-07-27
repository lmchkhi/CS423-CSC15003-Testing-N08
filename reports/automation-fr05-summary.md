# FR-05 Playwright automation summary

- Student ID: **23127464**
- Feature: **FR-05 — Product listing and search**
- Data-driven case: **FR05-DD-001** (`iPhone` → `iPhone 15 Pro Max`)
- Test data: `test-data/fr05-search.json`
- Execution completed: `2026-07-27T07:58:30.550Z`

## Assertions

1. The home-page URL is loaded.
2. The entered search value equals the JSON input.
3. The expected matching product heading has the required count.
4. The matching product heading is visible.

## Browser-run result

| Browser | Result | HTML report | Label and timestamp |
| --- | --- | --- | --- |
| Chromium | Passed | `reports/html/fr05-search/chromium/index.html` | Verified |
| Firefox | Passed | `reports/html/fr05-search/firefox/index.html` | Verified |
| WebKit | Passed | `reports/html/fr05-search/webkit/index.html` | Verified |

Firefox is configured in headed mode because the environment's headless graphics compositor fails to start. The final GUI-permitted Firefox run passed in 23.2 seconds.

Re-run: `npm run test:fr05:matrix`
