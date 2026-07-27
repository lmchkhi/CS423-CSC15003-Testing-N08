# [BUG][FR-05] Automation result summary — seven reproducible failures

## Found by Test Case

FR05-DD-005, FR05-DD-008, FR05-DD-009, FR05-DD-010, FR05-DD-011, FR05-DD-012, and FR05-DD-013.

## Requirement liên quan

FR-05: empty state, safe search-keyword display, loading state, exactly one `h1`, descriptive product-image alt text, and `₫` price formatting.

## Severity / Priority

- Critical / P0: FR05-DD-009 — SQL-injection input returned all five listed products.
- Major / P1: FR05-DD-008 — XSS input was not presented as literal text.
- Minor / P2: FR05-DD-005, FR05-DD-010, FR05-DD-011, FR05-DD-012, FR05-DD-013.

## Environment

- SUT URL: `http://127.0.0.1:5173/`
- Student ID: `23127464`
- Run completed: `2026-07-27T08:31:00.171Z`
- Browsers: Chromium, Firefox (headed), WebKit

## Steps to reproduce

1. Open the EShop home page.
2. Perform the relevant search from the external data record, or observe the initial product listing.
3. Compare the visible UI result with FR-05.

## Expected result

The UI provides empty/loading states, displays search data safely as text, prevents search manipulation from returning the complete list, contains one `h1`, uses descriptive image alt text, and formats prices with `₫`.

## Actual result

All seven failures reproduced in Chromium, Firefox, and WebKit. The precise failed cases and expected UI outcomes are recorded in the HTML reports and the automation summary.

## Evidence

- [Run manifest](../../reports/fr05-run-manifest.json)
- [Automation summary](../../reports/automation-fr05-summary.md)
- [Chromium report](../../reports/html/fr05-search/chromium/index.html)
- [Firefox report](../../reports/html/fr05-search/firefox/index.html)
- [WebKit report](../../reports/html/fr05-search/webkit/index.html)

Each report contains failure screenshots and the visible label `Run by: 23127464` with its ISO execution timestamp.
