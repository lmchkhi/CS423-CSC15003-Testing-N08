# FR-05 Playwright automation summary

- Student ID: **23127464**
- Feature: **FR-05 — Product listing and search**
- Execution completed: `2026-07-27T08:31:00.171Z`
- Logical cases: **14**; browser executions: **42**
- Test data: `test-data/fr05-search.json`

## Result by browser

| Browser | Passed | Failed | HTML report | Label and timestamp |
| --- | ---: | ---: | --- | --- |
| Chromium | 7 | 7 | `reports/html/fr05-search/chromium/index.html` | Verified |
| Firefox (headed) | 7 | 7 | `reports/html/fr05-search/firefox/index.html` | Verified |
| WebKit | 7 | 7 | `reports/html/fr05-search/webkit/index.html` | Verified |
| **Total** | **21** | **21** | 3 reports | Verified |

Firefox runs in headed mode because the local headless graphics compositor cannot create a browser context. The test itself completed in Firefox.

## Case results

| Case ID | Check | Result on all three browsers |
| --- | --- | --- |
| FR05-DD-001 | Product list uses a grid layout | Passed |
| FR05-DD-002 | Initial product listing is shown | Passed |
| FR05-DD-003 | `iPhone` returns `iPhone 15 Pro Max` | Passed |
| FR05-DD-004 | `iphone` search is case-insensitive | Passed |
| FR05-DD-005 | No-result search shows an empty state | Failed |
| FR05-DD-006 | Special characters do not show a database error | Passed |
| FR05-DD-007 | Whitespace-only search is handled as the full list | Passed |
| FR05-DD-008 | XSS payload is shown as literal text | Failed |
| FR05-DD-009 | SQL-injection payload does not return the full list | Failed |
| FR05-DD-010 | Delayed product load shows a loading state | Failed |
| FR05-DD-011 | Home page has exactly one `h1` | Failed |
| FR05-DD-012 | Product images have non-empty descriptive alt text | Failed |
| FR05-DD-013 | Prices use `₫` and thousand separators | Failed |
| FR05-DD-014 | Product-card heading is visible | Passed |

## Assertion patterns

The suite meaningfully uses URL (`toHaveURL`), value (`toHaveValue`), visibility (`toBeVisible`/`toBeHidden`), count (`toHaveCount`), text (`toHaveText`), CSS (`toHaveCSS`), and attribute (`toHaveAttribute`) assertions.

Re-run: `npm run test:fr05:matrix`
