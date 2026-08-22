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
- at least one AI-generated case in each coverage family: `domain-partition`, `state-transition`, `security`, and `schema-validation`.

Do not generate, draft, prepopulate, or label cases as extension candidates. The assignment's extension cases must come from the student after reviewing the AI baseline. If the student explicitly supplies their own cases, preserve them with `source: student-authored`; never invent their content or claim authorship on their behalf. Set AI-generated cases' `humanReview.status` to `PENDING` until the student explicitly reviews them. Record an agent audit recommendation of `VALID`, `INVALID`, or `INCOMPLETE` with a reason, but keep it separate from human review.

## Materialize the suite

Create the layout from [references/artifact-contract.md](references/artifact-contract.md). Use stable IDs `TC-[MODULE]-[NNN]` and one Markdown file per testcase. Each Markdown file must preserve every section from the lecture template and may add automation metadata after those required sections. Do not render an `AI audit` section in individual testcase Markdown files; retain `source`, `agentAudit`, and `humanReview` only in `suite.manifest.json` and summarize them in the main report.

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
  --report-dir <test-reports/newman/run-id>
```

4. Preserve CLI output, Newman JSON, and HTML. A nonzero Newman exit code means tests failed, not that the runner should discard artifacts.
5. Verify from the report or console log that every request carried the exact `X-Student-Id` header. If this cannot be proven, mark execution incomplete.
6. Capture screenshots from the live terminal that actually runs Newman. Keep the Newman command and relevant output visible; do not open a saved log in TextEdit or another editor and present that as an execution screenshot. Do not reconstruct terminal evidence from text afterward.
   - Prefer an allowed terminal app. If macOS Terminal, Ghostty, or another terminal is blocked by Computer Use policy, use the repository's VS Code integrated terminal.
   - In VS Code, invoke **Maximize Panel** before capture and verify that the terminal fills the workbench with no editor panel visible in the screenshot. Hide the Explorer/sidebar as needed. Clear unrelated terminal output before the run when safe.
   - Preserve the existing terminal font size and application/UI zoom. Do not change text size merely to improve a screenshot. Make evidence legible by maximizing the panel, hiding sidebars, scrolling or repositioning the real output, or rerunning with safe reporter settings.
   - For the mandatory header evidence, capture the real pre-request output showing `X-Student-Id: <actual student ID>`.
   - For a defect screenshot, position the completed Newman output at the relevant failure lines. Include the detecting testcase ID and failed assertion; retain the command line or other run identity in the same frame when practical.
   - Use a normal screenshot without Stickies, student-ID overlays, or assignment-specific capture skills unless the user explicitly requests that capture method for the current assignment.
7. Create a Vietnamese test-run Markdown summary with tester/student ID, endpoint, base URL, commit, timestamp/timezone, testcase result, actual status, related bug, and notes.
8. Redact secrets from retained logs. Do not edit raw response facts to make a test pass.

## Triage failures and capture evidence

For every failure, first reproduce it at least once with the same data and once with the smallest equivalent request. Classify it as `SUT defect`, `specification gap`, `test-script defect`, `test-data/precondition failure`, or `environment failure`.

Create a bug only for a reproducible `SUT defect` whose actual result contradicts the documented oracle. Group failures only when they share one root cause; otherwise create one bug report per defect. Link all detecting testcases while naming one primary `Found by Test Case`.

Capture real evidence from the API response, Newman/Postman console, or HTML report. For Newman failures, prefer the live terminal screenshot procedure above over reopening the retained CLI log in an editor. Prefer a screenshot that visibly includes the request/endpoint, status, response/error, timestamp/run identity, and `X-Student-Id` evidence where relevant. Keep the raw response or log beside the screenshot. Never synthesize, redraw, or alter evidence. If screenshot tooling is unavailable, retain the raw evidence and explicitly mark the screenshot as pending instead of fabricating one.

Render every evidence image as an inline Markdown preview, never as a plain text link. In local Markdown reports, use `![descriptive alt text](<repository-relative-image-path>)`. In GitHub Issue bodies, use `![descriptive alt text](<absolute-GitHub-image-URL>)`; for a GitHub `blob` URL, append `?raw=1` when needed so the image renders. Keep non-image artifacts such as raw logs, JSON, and HTML as ordinary Markdown links. Use concise alt text that identifies the testcase or defect, and never embed secrets in either the image or alt text.

Write each local report from [references/bug-report-template.md](references/bug-report-template.md), using the exact observed values and repository convention.

## Deduplicate and publish GitHub issues

Treat issue creation as an external write. A request to use this skill to test an endpoint authorizes the complete HW06 pipeline, including publishing a GitHub issue for each confirmed, non-duplicate SUT defect. Do not require a second confirmation after the user has invoked the skill for endpoint testing. Skip publishing only when the user explicitly limits the work to local generation, review, execution, or reporting, or explicitly says not to create issues. A later request to publish confirmed defects also supplies the required authorization.

Use the authenticated `gh` CLI for repository discovery, labels, issue searches, issue reads, and issue creation. Run every networked `gh` command outside the sandbox with escalated execution, including read-only fetches. When using `exec_command`, set `sandbox_permissions` to `require_escalated` and provide a concise `justification`; request approval when escalation is not already approved. Do not first run `gh` inside the sandbox: sandboxed network or credential isolation can produce misleading token/authentication failures. If a `gh` command was accidentally run inside the sandbox and fails with an authentication, token, DNS, or connection error, retry the same command once with escalated execution before diagnosing GitHub authentication.

Never print, request, copy, or pass a GitHub token on the command line. Use the existing `gh` credential store. Check authentication with `gh auth status`; if the escalated check still fails, stop and ask the user to authenticate with `gh auth login` themselves.

1. Resolve the canonical repository from `origin`, then confirm it outside the sandbox with `gh repo view --json nameWithOwner,url`.
2. Inspect labels outside the sandbox with `gh label list --json name,description`. Prefer exact existing names and casing. The local convention currently starts with `Type: Bug` and `Status: New`; add existing module, severity, priority, and found-by labels when available. Never create labels unless separately authorized.
3. Search both open and closed issues outside the sandbox with `gh issue list --state all --limit 200 --json number,title,body,state,url,labels`. Compare normalized symptom, endpoint, actual status/error, primary testcase ID, and affected requirement. Inspect candidate bodies, not titles alone.
4. If the same root cause already exists, do not create a duplicate. Add a comment with `gh issue comment` only when authorized and useful; otherwise link the existing issue locally.
5. If no duplicate exists, prepare the final issue body in a local Markdown file and create it outside the sandbox with `gh issue create --repo <owner/repo> --title <title> --body-file <bug-report.md> --label <existing-label>`. Use arguments or `--body-file`; do not interpolate the report body into a shell command. Attach or link the real screenshot using an available GitHub-supported mechanism, and never fabricate an upload. Verify the returned issue number and URL exactly once with `gh issue view`.
6. Never put local filesystem paths or repository-relative artifact links in a GitHub Issue. Use absolute GitHub URLs. Embed image evidence with `![alt](absolute-url)` so GitHub shows a preview; use `?raw=1` for GitHub `blob` image URLs when necessary. If the artifact branch has not been pushed yet, use its intended absolute branch URLs without claiming that they are already accessible. Do not add availability notes to the issue unless the user requests them.
7. After the artifact commit is pushed, replace branch-based evidence URLs with immutable `https://github.com/<owner>/<repo>/blob/<commit-sha>/<path>` URLs and verify the links resolve. Issue creation does not authorize committing or pushing; perform those Git operations only when the user requests them.
8. Update the testcase and test-run `Related bugs` fields with the verified issue number. Never claim an issue exists if escalated authentication, upload, or creation failed.

## Finish and report

Re-run suite validation. Confirm counts for AI-generated, student-authored (when supplied), executed, passed, failed, blocked, and confirmed bugs. Confirm every failed/blocked row has a related bug or explicit non-bug reason. Provide a Vietnamese summary with paths to testcase files, manifest/data/collection, Newman HTML/JSON/CLI outputs, evidence, bug reports, and GitHub issue URLs.

State clearly what remains for the student: human review, at least five genuinely student-authored extension cases with an explanation of what the AI baseline missed, self-drawn generator diagram, required screenshots that could not be captured, AI Audit Report, CI/CD sample runs, commits, and any other HW06 deliverable outside the single-endpoint pipeline. Never claim completion of anti-AI-cheat evidence without real execution.
