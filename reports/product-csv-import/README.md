# FR-16 Product CSV import — execution summary

## Scope and traceability

- Requirement: FR-16
- StudentID: `23127062`
- Automated cases: 15/15
- Unautomated cases: None
- External data: `tests/data/product-csv-import.json`
- Suite: `tests/e2e/product-csv-import.spec.mjs`

## Official results

| Browser | Timestamp (UTC) | Passed | Failed | HTML report |
|---|---:|---:|---:|---|
| Chromium | 2026-08-08T05:42:20Z | 6 | 9 | `reports/product-csv-import/chromium/index.html` |
| Firefox | 2026-08-08T05:44:23Z | 6 | 9 | `reports/product-csv-import/firefox/index.html` |
| WebKit | 2026-08-08T05:45:13Z | 6 | 9 | `reports/product-csv-import/webkit/index.html` |

All three runs reproduced the same failures. Reports are genuine Playwright output; failed screenshots and traces are under `artifacts/product-csv-import/<browser>/`.
Each HTML report was opened after execution and visibly shows `FR-16 Product CSV import — Run by: 23127062`; the validator also confirmed the ISO timestamp in report Metadata and its absence from the title.

## Confirmed product defects

- `BUG-CSV-001`: quoted comma fields are not parsed according to RFC 4180 (TC-CSV-003).
- `BUG-CSV-002`: non-CSV filename extensions are accepted (TC-CSV-004).
- `BUG-CSV-003`: price is not validated and a row error does not roll back the import (TC-CSV-006 through TC-CSV-011).
- `BUG-CSV-004`: an invalid header is not detected or reported as a header error (TC-CSV-012).

`gh` was rechecked outside the sandbox and authenticated successfully through the macOS keyring. All four confirmed defects already had matching issues, so the existing verified URLs were reused instead of creating duplicates: [#31](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/31), [#24](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/24), [#32](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/32), and [#25](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/25).

## Human review of generated automation

The initial draft had two test defects that were corrected before official execution:

1. A product-name locator matched both the image cell's accessible name (from `alt`) and the text cell. It was scoped to a product row containing the stable `Sửa` action and then to exact cell text.
2. Empty/header-only files keep an `Import 0 sản phẩm` button in the DOM. The oracle was corrected from “button absent” to the business-equivalent and less implementation-coupled “button disabled with zero rows”.

The suite uses no arbitrary sleeps, isolates names by run, cleans imported test records after every case, and checks the backend state for atomicity. Manual review is still required before submission, and any demo video must show a real attributable run.
