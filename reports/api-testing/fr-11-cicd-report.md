# FR-11 — CI/CD Report

> Báo cáo lịch sử của pipeline cũ chỉ dành cho Pool B và hai lần chạy GitHub thực tế. Cấu hình hiện hành bao phủ cả ba Pool được trình bày tại `reports/api-testing/api-cicd-report.md` và `.github/workflows/api-test-pools-a-b-c.yml`.

## Scope

- Feature: Pool B — FR-11 Order History View.
- Subject endpoints: `GET /api/orders/my-orders` and `GET /api/orders/:id`.
- Workflow: `.github/workflows/fr-11-api-test.yml`.
- Student ID: `23127464`.
- CI provider: GitHub Actions.

## Pipeline configuration

The workflow runs on `ubuntu-latest` through manual dispatch and path-scoped push/pull-request events. It performs the following sequence:

1. Checks out the repository with `actions/checkout@v4`.
2. Configures Node.js 22 with `actions/setup-node@v4` and the backend npm cache.
3. Installs the SUT dependencies using the committed backend lock file.
4. Installs Newman `6.2.2` and `newman-reporter-htmlextra` `1.23.1`.
5. Verifies that the FR-11 collection contains the collection-level `X-Student-Id` upsert and the assertion for value `23127464`.
6. Starts `src/eshop-sut/backend/server.js` in the background and waits for the local SUT to become reachable.
7. Runs `tests/api-testing/scripts/prepare-fr11-fixture.js` to create deterministic users, orders and runtime tokens.
8. Runs Newman with the FR-11 collection, generated environment and iteration-data file.
9. Preserves Newman's real exit code while still uploading the HTML report and diagnostic evidence with `if: always()`.
10. Stops the exact SUT process and makes the job result match the Newman exit code.

## Test inputs

| Input | Path |
|---|---|
| Postman collection | `tests/api-testing/collections/23127464_FR11_Order_History.postman_collection.json` |
| Runtime environment | `tests/api-testing/environments/fr-11-local.postman_environment.json` |
| Iteration data | `tests/api-testing/data/fr-11-run-data.json` |
| Fixture generator | `tests/api-testing/scripts/prepare-fr11-fixture.js` |

## Student header

The collection-level pre-request script reads `studentId` from the environment and upserts:

```http
X-Student-Id: 23127464
```

The workflow performs a static preflight check for both the header upsert and its Postman assertion before starting the SUT.

## Newman command

```bash
newman run tests/api-testing/collections/23127464_FR11_Order_History.postman_collection.json \
  --environment tests/api-testing/environments/fr-11-local.postman_environment.json \
  --iteration-data tests/api-testing/data/fr-11-run-data.json \
  --reporters cli,json,htmlextra \
  --reporter-json-export "$CI_EVIDENCE_DIR/fr-11-newman-report.json" \
  --reporter-htmlextra-export "$CI_EVIDENCE_DIR/fr-11-newman-report.html"
```

## Uploaded artifact

- Artifact name pattern: `fr-11-newman-html-<run_id>-<run_attempt>`.
- Expected contents: Newman HTML, Newman JSON, raw console, fixture output, SUT log, CI metadata and Newman exit code.
- Retention: 14 days.
- All-pass artifact URL: `https://api.github.com/repos/lmchkhi/CS423-CSC15003-Testing-N08/actions/artifacts/9419095230/zip`.
- Full-collection artifact URL: `https://api.github.com/repos/lmchkhi/CS423-CSC15003-Testing-N08/actions/artifacts/9419199893/zip`.

## Required CI run evidence

### Run 1 — all-pass

| Evidence | Value |
|---|---|
| Purpose | Demonstrate a real FR-11 run with all assertions passing |
| Commit SHA | `fa490400e8145ecc72685328e15542d9ae79e051` |
| GitHub Actions run URL | `https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32402724185` |
| Result | `SUCCESS` |
| Newman HTML artifact URL | `https://api.github.com/repos/lmchkhi/CS423-CSC15003-Testing-N08/actions/artifacts/9419095230/zip` |
| Screenshot | `tests/api-testing/evidence/fr-11/ci-cd-run1-all-pass.png` |
| Screenshot SHA-256 | `983384EE4637844F862E38CBE9BBD7E5010E1BF8C81EC40AA4283C7934409693` |
| Timestamp | `2026-08-21 01:21:19–01:21:55 (Asia/Ho_Chi_Minh)` |

This first CI revision intentionally selects the `GET /api/orders/my-orders` folder (25 executable cases) to produce the required real all-pass sample. It does not represent a claim that the full FR-11 collection passes.

### Run 2 — controlled failure

| Evidence | Value |
|---|---|
| Purpose | Run the complete FR-11 collection after removing the folder filter, exposing the confirmed detail-endpoint failures |
| Commit SHA | `fa469cff4cdf4de5ea71cc2883d182c730684132` |
| GitHub Actions run URL | `https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32403028362` |
| Result | `FAILURE — Enforce Newman result` |
| Failed assertion | `PENDING — verify exact assertion list from the authenticated CI artifact; canonical local run identifies DET-011 and DET-026–DET-033` |
| Newman HTML artifact URL | `https://api.github.com/repos/lmchkhi/CS423-CSC15003-Testing-N08/actions/artifacts/9419199893/zip` |
| Screenshot | `tests/api-testing/evidence/fr-11/ci-cd-run2-with-failure.png` |
| Screenshot SHA-256 | `B118D9A9FEFFEC9279257ACC9DA9CA05300C8C4E88C0E047DD5876BEB24406D5` |
| Timestamp | `2026-08-21 01:24:38–01:25:00 (Asia/Ho_Chi_Minh)` |

The controlled-failure evidence must come from a real commit/run and must not overwrite the all-pass evidence.

### Bootstrap attempt — not counted as a required sample run

| Evidence | Value |
|---|---|
| Commit SHA | `528b66aee41d9e73fb85448e65504d399eae0da8` |
| GitHub Actions run URL | `https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/actions/runs/32402504988` |
| Result | `FAILURE — Setup Node.js failed before Newman execution` |

The backend dependency manifest and SUT source were ignored by the repository's `**/src` rule and therefore absent from the first runner checkout. Commit `fa490400e8145ecc72685328e15542d9ae79e051` added only the required backend runtime files and produced the successful all-pass sample above.

## Commit and publication status

- Workflow commit SHA: `fa469cff4cdf4de5ea71cc2883d182c730684132`.
- Repository URL: `https://github.com/lmchkhi/CS423-CSC15003-Testing-N08`.
- Workflow run links: all-pass and full-collection runs recorded above.
- Screenshots: `PROVIDED` for both required runs.

## Status

CI/CD CONFIGURATION: COMPLETE

GITHUB ACTIONS EXECUTION: COMPLETE — 1 SUCCESS, 1 FAILURE

ALL-PASS RUN EVIDENCE: COMPLETE

CONTROLLED-FAILURE RUN EVIDENCE: COMPLETE — AUTHENTICATED ASSERTION DETAIL REVIEW PENDING

ALL-PASS COMMIT SHA: fa490400e8145ecc72685328e15542d9ae79e051

FULL-COLLECTION COMMIT SHA: fa469cff4cdf4de5ea71cc2883d182c730684132

PHASE E: COMPLETE

## Phase E deliverables

### Completed

- GitHub Actions workflow for FR-11 with Node.js 22, SUT startup/readiness, deterministic fixture, Newman and htmlextra artifact upload.
- Real all-pass run with commit, link, artifact and screenshot.
- Real full-collection failure run with commit, link, artifact and screenshot.
- Local Newman console/JSON/HTML evidence and Postman header screenshot.
- Local security bug report for missing authentication and ownership/IDOR on `GET /api/orders/:id`.
- FR-11 Phase A contract, Phase B generation log, Phase C human-review workbook and Phase D execution analysis.

### Missing or pending

- Exact assertion list from the authenticated CI artifact: `PENDING`; canonical local evidence records `DET-011` and `DET-026`–`DET-033`.
- Published GitHub Issue and issue screenshot: `NOT CREATED`.
- Student-designed/self-drawn AI test-generation diagram: `PENDING`.
- FR-11/API demo video: `NOT PROVIDED` (optional when applicable).
