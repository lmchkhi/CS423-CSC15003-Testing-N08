# FR-16 — Phase D Execution Plan

> Tài liệu này ghi lại kế hoạch tại thời điểm Phase D. Evidence hiện hành là schema rerun `tests/api-testing/evidence/fr-16/20260822-230924/`.

## Scope lock

- Pool C, FR-16, endpoint under test: `POST /api/admin/import-products`.
- Student ID: `23127464`.
- Primary contract: JSON body `{ "products": [...] }` with `Content-Type: application/json`.
- CSV multipart/raw requests are exploratory negative cases only.
- Phase C final approval was supplied by the human and recorded in the workbook before execution.
- No bug report, CI/CD work, or Phase E activity is in scope.

## Automation selection

| Source | Selected | Excluded | Basis |
|---|---:|---:|---|
| AI-generated cases | 29 | 11 | Automate 29 human-labelled `VALID`; exclude 9 `INCOMPLETE` and 2 `INVALID`. |
| Human-origin cases | 3 | 2 | Automate `FR16-H01`, `FR16-H04`, `FR16-H05`; exclude incomplete `FR16-H02`, `FR16-H03`. |
| **Total** | **32** | **13** | 45 designed/human-origin cases considered. |

Selected AI case groups:

- `FR16-VLD-001`–`003`.
- `FR16-AUTH-001`–`008`.
- `FR16-NAME-001`–`002`.
- `FR16-PRICE-001`–`003`, `FR16-PRICE-006`.
- `FR16-CAT-001`.
- `FR16-ATOM-001`–`004`.
- `FR16-INPUT-001`–`004`.
- `FR16-SEC-001`.
- `FR16-CSV-001`–`002`.

Excluded AI cases: `FR16-VLD-004`, `FR16-NAME-003`–`005`, `FR16-PRICE-004`–`005`, `FR16-CAT-002`–`004`, `FR16-SEC-002`–`003`.

## Fixture and isolation plan

- Back up `src/eshop-sut/backend/database.sqlite` before every runner attempt.
- Start the SUT in-process and wait for HTTP plus seeded SQLite tables/data.
- Create dedicated admin and non-admin users, one stable category, and a sentinel product.
- Generate admin, non-admin, expired, tampered-payload, tampered-signature and missing-identity JWTs.
- Remove prior `FR16-RUN-*` marker products, create a unique `runId`, and record baseline product count.
- Export the runtime environment to `tests/api-testing/environments/fr-16-local.postman_environment.json`.

## Oracle and request plan

- Collection-level pre-request script upserts `X-Student-Id: 23127464` and logs it.
- Each selected case is one collection request with at least one `pm.test` assertion.
- Valid imports use unique names and read-only `GET /api/products` verification.
- Authentication/authorization failures assert no success marker in the response and no persisted marker; no exact 401/403 oracle is used.
- Price rejection and atomicity cases assert that marker products are absent; atomic batches require all markers absent.
- Method mismatch uses only broad `status >= 400` plus unchanged product count.
- CSV exploratory requests assert no imported marker and do not require an exact rejection status/body.
- Read-only product verification calls are dependencies, not additional feature subjects.

## Runtime artifacts

- Fixture: `tests/api-testing/scripts/prepare-fr16-fixture.js`.
- Generator: `tests/api-testing/scripts/generate-fr16-postman.js`.
- Collection: `tests/api-testing/collections/23127464_FR16_Product_Import.postman_collection.json`.
- Environment: `tests/api-testing/environments/fr-16-local.postman_environment.json`.
- Data: `tests/api-testing/data/fr-16-run-data.json`.
- CSV exploratory input: `tests/api-testing/data/fr-16-exploratory.csv`.
- Runner: `tests/api-testing/scripts/run-fr16-newman.js`.
- Evidence finalizer: `tests/api-testing/scripts/finalize-fr16-evidence.js`.

## Command and evidence retention

Canonical invocation:

```powershell
node tests/api-testing/scripts/run-fr16-newman.js
```

The runner creates a new `tests/api-testing/evidence/fr-16/<timestamp>/` directory and retains console, JSON, HTML, command, fixture output, SUT log and metadata even when Newman exits non-zero. Newman runs with `cli,json,htmlextra` reporters.

## Failure triage plan

- Setup/port/fixture/dependency failures: `LOI_MOI_TRUONG`.
- Incorrect request construction or assertion logic: `LOI_SCRIPT` (the skill taxonomy calls this `LOI_CA_KIEM_THU`).
- Access-control violations: `LOI_BAO_MAT_SUT`.
- FR-16 validation/atomicity violations: `LOI_CHUC_NANG_SUT` under the skill evidence taxonomy.
- No failure is converted into a bug report in Phase D.

## Actual run handoff

- Preserved setup attempt: `20260821-024805`.
- Preserved pre-canonical test-script run: `20260821-024833`.
- Canonical run: `20260821-024915`.
- Header screenshot: `PENDING HUMAN CAPTURE`; the FR-11 screenshot is not reused because it does not show an FR-16 request/collection.

PHASE D PLAN: COMPLETE  
EXECUTION EVIDENCE: SEE `reports/api-testing/fr-16-phase-d-execution-analysis.md`
