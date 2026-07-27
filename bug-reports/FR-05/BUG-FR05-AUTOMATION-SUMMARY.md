# [BUG][FR-05] Automation execution summary — no product defect observed

## Found by Test Case

FR05-DD-001 — search `iPhone` and verify that `iPhone 15 Pro Max` is shown.

## Requirement liên quan

FR-05 — Product listing and search: the search bar finds products by product name.

## Severity / Priority

N/A — this execution did not reveal a reproducible product defect. No GitHub Issue should be created from this report.

## Environment

- SUT web URL: `http://127.0.0.1:5173/`
- Student ID: `23127464`
- Execution window: `2026-07-27T07:57:58.805Z` to `2026-07-27T07:58:33.363Z`
- Browsers: Chromium, Firefox (headed), WebKit

## Steps to reproduce

1. Open the EShop home page.
2. Enter `iPhone` in the product-search box.
3. Submit the search.
4. Observe the returned product list.

## Expected result

The search result includes the product named `iPhone 15 Pro Max`.

## Actual result

The expected product was visible and all assertions passed in Chromium, Firefox, and WebKit.

## Evidence

| Browser | Result | HTML report |
| --- | --- | --- |
| Chromium | Passed | [Chromium report](../../reports/html/fr05-search/chromium/index.html) |
| Firefox | Passed | [Firefox report](../../reports/html/fr05-search/firefox/index.html) |
| WebKit | Passed | [WebKit report](../../reports/html/fr05-search/webkit/index.html) |

The [run manifest](../../reports/fr05-run-manifest.json) records exit code `0` and a verified `Run by: 23127464` label with ISO timestamp for each browser.

### Execution note — not a product bug

Firefox initially could not start in headless mode because the local graphics compositor failed. Running Firefox in headed mode with GUI permission allowed the same test to complete successfully. This is an execution-environment constraint, not a defect observed in the EShop UI.

### Scope limitation

This report covers one positive, data-driven FR-05 case only. It does not establish that FR-05 is defect-free; negative, empty-result, loading-state, safety, accessibility, and formatting cases remain outside this run.
