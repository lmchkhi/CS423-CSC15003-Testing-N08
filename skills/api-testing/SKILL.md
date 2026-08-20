---
name: api-testing
description: Generate, audit, execute, and report data-driven API tests for the EShop HW06 repository from an API endpoint and student ID. Use when Codex must read api_specification.md, create at least 35 Markdown API test cases covering domain partitions, state transitions, security, and schema validation, build Postman/Newman artifacts, enforce X-Student-Id, create real execution evidence and HTML reports, write one Markdown bug report per confirmed defect, or deduplicate and publish GitHub Issues using the repository's label conventions. Write all user-facing artifacts in Vietnamese while retaining clear English technical terms.
---

# API Testing

Execute the complete pipeline for exactly one user-selected endpoint. Treat the endpoint and student ID as required inputs. Keep instructions and code in English; write generated testcase, run, summary, and bug-report content in Vietnamese, preserving useful technical terms.

## Establish the repository context

1. Resolve the repository root with `git rev-parse --show-toplevel`. Work only inside that repository.
2. Read `api_specification.md` completely, then isolate the exact method and route requested by the user. Reject an endpoint not present in the file and list the closest matches.
3. Read the applicable feature requirements and `SEC-01` through `SEC-07` in `README.md`. Read setup instructions only as needed. Use the specification and requirements as the oracle; never redefine expected behavior from `backend/server.js`.
4. Read `.github/ISSUE_TEMPLATE/bug-report-template.md` and inspect live GitHub labels plus open and closed issues before preparing any issue write.
5. Read [references/coverage-oracle.md](references/coverage-oracle.md), [references/artifact-contract.md](references/artifact-contract.md), and [references/testcase-template.md](references/testcase-template.md). Read [references/bug-report-template.md](references/bug-report-template.md) only after a genuine defect is observed.
6. Check whether the SUT is reachable at the configured base URL. Start it only when the user request authorizes execution and the repository provides a safe start command. Do not silently modify the database or seed state outside normal API calls.

Do not expose passwords, bearer tokens, OTPs, cookies, or other secrets in Markdown, screenshots, reports, GitHub issues, or console summaries. A student ID is required evidence and is not a secret, but validate it as a non-empty value containing only letters, digits, hyphens, or underscores.

## Build the coverage model before writing cases

Create a compact coverage matrix for every path, query, header, and body parameter. Include valid, invalid, missing, null, empty, type-confused, boundary, and interaction partitions. Model observable states and allowed/forbidden transitions, including repeated operations and terminal states. Map applicable security requirements. Define exact response status, content type, JSON type, required/forbidden fields, field types, and invariants.

Do not invent undocumented success behavior. When the specification is ambiguous, state a conservative oracle and mark the case `INCOMPLETE` with the ambiguity. Distinguish product defects from specification gaps, test-data failures, environment failures, and test-script failures.

Generate:

- at least 35 cases with `source: ai-generated`;
- at least 5 additional high-value cases with `source: extension-candidate`, concentrating on security and state transitions;
- at least one case in each coverage family: `domain-partition`, `state-transition`, `security`, and `schema-validation`.

The extension cases are candidates for the student's own contribution. Never claim they were human-authored or human-reviewed. Set `humanReview.status` to `PENDING` until the student actually reviews them. Record an agent audit recommendation of `VALID`, `INVALID`, or `INCOMPLETE` with a reason, but keep it separate from human review.

## Materialize the suite

Create the layout from [references/artifact-contract.md](references/artifact-contract.md). Use stable IDs `TC-[MODULE]-[NNN]` and one Markdown file per testcase. Each Markdown file must preserve every section from the lecture template and may add audit/automation metadata after those required sections.

Create `suite.manifest.json` following [references/suite-manifest.md](references/suite-manifest.md). Then run:

```bash
node skills/api-testing/scripts/validate_suite.mjs --manifest <suite.manifest.json>
node skills/api-testing/scripts/render_testcases.mjs --manifest <suite.manifest.json> --output <test-case-directory>
node skills/api-testing/scripts/build_postman_collection.mjs --manifest <suite.manifest.json> --collection <collection.json> --data <test-data.json>
```

Fix every validation error. Do not lower minimum counts to make validation pass.

Use a data-driven collection: one endpoint request consumes one JSON row per iteration. Put environment-dependent values in Postman variables. The generated pre-request script must upsert `X-Student-Id` for every request and log its presence. Use `Authorization: Bearer <token>` exactly when the spec requires it. Include negative authentication and authorization cases without leaking tokens.

## Execute with Newman

1. Verify the effective base URL, student ID, user/admin token availability, and any prerequisite state. Never substitute a made-up token.
2. Prefer a repository-local Newman installation. Require both Newman and `newman-reporter-htmlextra`; do not silently install packages globally.
3. Run the supplied runner:

```bash
bash skills/api-testing/scripts/run_newman.sh \
  --collection <collection.json> \
  --data <test-data.json> \
  --environment <environment.json> \
  --report-dir <reports/newman/run-id>
```

4. Preserve CLI output, Newman JSON, and HTML. A nonzero Newman exit code means tests failed, not that the runner should discard artifacts.
5. Verify from the report or console log that every request carried the exact `X-Student-Id` header. If this cannot be proven, mark execution incomplete.
6. Capture the mandatory real console screenshot showing the pre-request script output for `X-Student-Id: <actual student ID>`. The screenshot must come from the actual Postman/Newman execution context; do not reconstruct it from text afterward.
7. Create a Vietnamese test-run Markdown summary with tester/student ID, endpoint, base URL, commit, timestamp/timezone, testcase result, actual status, related bug, and notes.
8. Redact secrets from retained logs. Do not edit raw response facts to make a test pass.

## Triage failures and capture evidence

For every failure, first reproduce it at least once with the same data and once with the smallest equivalent request. Classify it as `SUT defect`, `specification gap`, `test-script defect`, `test-data/precondition failure`, or `environment failure`.

Create a bug only for a reproducible `SUT defect` whose actual result contradicts the documented oracle. Group failures only when they share one root cause; otherwise create one bug report per defect. Link all detecting testcases while naming one primary `Found by Test Case`.

Capture real evidence from the API response, Newman/Postman console, or HTML report. Prefer a screenshot that visibly includes the request/endpoint, status, response/error, timestamp/run identity, and `X-Student-Id` evidence where relevant. Keep the raw response or log beside the screenshot. Never synthesize, redraw, or alter evidence. If screenshot tooling is unavailable, retain the raw evidence and explicitly mark the screenshot as pending instead of fabricating one.

Write each local report from [references/bug-report-template.md](references/bug-report-template.md), using the exact observed values and repository convention.

## Deduplicate and publish GitHub issues

Treat issue creation as an external write. A request for the complete HW06 pipeline including GitHub issue handling authorizes confirmed bug issue creation. If the prompt asks only for generation, review, local execution, or reporting, ask before publishing.

1. Confirm GitHub authentication and the canonical `owner/repo` from `origin`.
2. Inspect current labels. Prefer exact existing names and casing. The local convention currently starts with `Type: Bug` and `Status: New`; add existing module, severity, priority, and found-by labels when available. Never create labels unless separately authorized.
3. Search open and closed issues by normalized symptom, endpoint, actual status/error, primary testcase ID, and affected requirement. Inspect candidate bodies, not titles alone.
4. If the same root cause already exists, do not create a duplicate. Add a comment/evidence only when authorized and useful; otherwise link the existing issue locally.
5. If no duplicate exists, upload or attach the real screenshot using the available GitHub capability, then create the issue from the local Markdown. Verify the returned issue number and URL exactly once.
6. Update the testcase and test-run `Related bugs` fields with the issue number. Never claim an issue exists if authentication, upload, or creation failed.

## Finish and report

Re-run suite validation. Confirm counts for generated, extension, executed, passed, failed, blocked, and confirmed bugs. Confirm every failed/blocked row has a related bug or explicit non-bug reason. Provide a Vietnamese summary with paths to testcase files, manifest/data/collection, Newman HTML/JSON/CLI outputs, evidence, bug reports, and GitHub issue URLs.

State clearly what remains for the student: human review, self-drawn generator diagram, required screenshots that could not be captured, AI Audit Report, CI/CD sample runs, commits, and any other HW06 deliverable outside the single-endpoint pipeline. Never claim completion of anti-AI-cheat evidence without real execution.
