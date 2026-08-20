# FR-11 — CI/CD Report

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
  --folder "GET /api/orders/my-orders" \
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
- Real artifact URL: `PENDING — workflow has not been run on GitHub Actions`.

## Required CI run evidence

### Run 1 — all-pass

| Evidence | Value |
|---|---|
| Purpose | Demonstrate a real FR-11 run with all assertions passing |
| Commit SHA | `PENDING — fill after push` |
| GitHub Actions run URL | `PENDING — run not executed` |
| Result | `PENDING` |
| Newman HTML artifact URL | `PENDING` |
| Screenshot | `PENDING — human capture required after the real run` |
| Timestamp | `PENDING` |

This first CI revision intentionally selects the `GET /api/orders/my-orders` folder (25 executable cases) to produce the required real all-pass sample. It does not represent a claim that the full FR-11 collection passes.

### Run 2 — controlled failure

| Evidence | Value |
|---|---|
| Purpose | Run the complete FR-11 collection after removing the folder filter, exposing the confirmed detail-endpoint failures |
| Commit SHA | `PENDING — fill after push` |
| GitHub Actions run URL | `PENDING — run not executed` |
| Result | `PENDING` |
| Failed assertion | `PENDING — record the actual failed assertions` |
| Newman HTML artifact URL | `PENDING` |
| Screenshot | `PENDING — human capture required after the real run` |
| Timestamp | `PENDING` |

The controlled-failure evidence must come from a real commit/run and must not overwrite the all-pass evidence.

## Commit and publication status

- Workflow commit SHA: `PENDING — fill after commit and push`.
- Repository URL: `PENDING — no public repository URL recorded in this report`.
- Workflow run links: `PENDING`.
- Screenshots: `PENDING`.

## Status

CI/CD CONFIGURATION: COMPLETE

GITHUB ACTIONS EXECUTION: NOT EXECUTED

ALL-PASS RUN EVIDENCE: PENDING

CONTROLLED-FAILURE RUN EVIDENCE: PENDING

COMMIT SHA: PENDING
