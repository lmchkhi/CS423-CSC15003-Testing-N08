---
name: playwright-automation
description: "Analyze one web-system feature and produce the complete automation-testing evidence set: at least 12 individually documented Markdown test cases, external CSV/JSON test data, data-driven Playwright scripts for Chromium/Firefox/WebKit with at least three assertion patterns, genuine per-browser HTML reports labeled with the supplied StudentID and an ISO timestamp, failure triage, and Markdown bug reports for confirmed product defects. Use for feature automation, converting manual feature tests to Playwright, or maintaining the same coursework artifacts after a feature changes."
---

# Playwright Automation

Build and execute one feature at a time. Treat AI output as a draft, inspect the SUT, run the tests, and record corrections. Never fabricate execution evidence.

## Load the rules

Read [references/automation-requirements.md](references/automation-requirements.md) before planning artifacts. Read [references/playwright-implementation.md](references/playwright-implementation.md) before writing or running Playwright.

## Establish inputs

Obtain or discover:

- the feature description and requirement ID;
- the SUT repository, base URL, and startup procedure;
- `StudentID` before any report-producing run;
- required roles/accounts and safe setup/cleanup mechanisms.

Inspect local requirements, routes, UI, API contracts, existing Playwright configuration, and test conventions. Ask only for information that cannot be discovered safely. Never invent credentials, URLs, selectors, feature behavior, execution results, or defects.

Use a lowercase hyphenated `feature-slug` and a stable uppercase module token. Keep unrelated user changes intact.

## Analyze the feature

1. Decompose the feature into user-visible behaviors, validation rules, permissions, state transitions, and dependencies.
2. Create a coverage plan with positive, negative, boundary, edge, authorization, and recovery cases as applicable.
3. Select at least 12 meaningful, non-duplicate cases. Do not inflate the count with cosmetic variants.
4. Map each case to a requirement and a test technique such as equivalence partitioning, boundary value analysis, decision table, or state transition.
5. Record assumptions and unresolved ambiguities. Confirm risky assumptions from source code, running UI, or the user.

## Create the artifact layout

Use this contract unless the repository already has an equivalent convention; if adapting, pass corresponding paths to the validator:

```text
tests/
  test-cases/<feature-slug>/TC-<MODULE>-001.md
  data/<feature-slug>.json              # or .csv
  e2e/<feature-slug>.spec.ts
  pages/                                # optional page/component objects
reports/<feature-slug>/
  chromium/
  firefox/
  webkit/
bugs/<feature-slug>/BUG-<MODULE>-001.md  # only for confirmed product bugs
artifacts/<feature-slug>/                # screenshots, traces, logs
```

## Write the manual test cases

Create at least 12 separate Markdown files. Copy [assets/test-case-template.md](assets/test-case-template.md) for each case and preserve every heading. Use IDs `TC-<MODULE>-<NNN>`.

- Make preconditions reproducible.
- Reference a dataset row/key under **Test data**; keep actual automation values in CSV/JSON.
- Write observable steps and one unambiguous expected result.
- Start with `Not Run / None`.
- Keep the ID stable if the title changes.

## Implement the Playwright suite

Automate every feasible test-case ID one-to-one and explicitly document any case that cannot be automated.

- Load domain test values from `tests/data/<feature-slug>.json` or `.csv`; do not embed test-data arrays or objects in the spec.
- Read base URLs, secrets, and environment-specific accounts from configuration or environment variables. Never commit secrets.
- Keep selectors in page/component objects when useful; selector definitions are code, not test data.
- Prefer role, label, text, and stable test-id locators. Avoid positional CSS/XPath selectors when a user-facing contract exists.
- Use web-first assertions and deterministic state synchronization. Do not use arbitrary sleeps.
- Use at least three distinct assertion matcher patterns across the feature, for example `toBeVisible`, `toHaveText`, and `toHaveURL`. Choose assertions that prove the requirement, not merely page activity.
- Configure named projects for `chromium`, `firefox`, and `webkit`.
- Isolate cases and make setup/cleanup repeatable. Generate unique values at runtime where uniqueness is required; keep fixed boundaries and expected values in the data file.
- Preserve traceability by including each `TC-...` ID in the test title or dataset.

Run type checks/linting when present. Review generated code for fragile selectors, weak assertions, missing edges, shared state, unsafe credentials, and flaky waits; fix the issues and record what changed and why in the feature's main report or review log.

## Execute and generate genuine reports

Run the feature once per project, not as an unlabelled synthetic result. Use the supplied `StudentID` and one actual ISO-8601 timestamp per invocation. Configure each report title or metadata so its visible HTML contains:

```text
Run by: <StudentID>
<ISO-8601 timestamp>
```

Write reports to `reports/<feature-slug>/<browser>/`. Do not hand-edit an HTML report or manufacture a passing run. Preserve real failed reports. If the SUT, browser binaries, or dependencies prevent execution, report the blocker and do not claim a report exists.

## Triage failures and report bugs

For every failed assertion, distinguish:

1. test defect (bad selector/data/assertion);
2. environment or infrastructure problem;
3. confirmed product defect.

Fix and rerun categories 1 and 2 where safe. Create a bug file only for category 3 after reproducing it. Copy [assets/bug-report-template.md](assets/bug-report-template.md), attach real screenshot/trace/log paths, link the discovering test case, and update that test case to `Fail / BUG-...`. Never infer a product bug solely from a timeout or unavailable service.

Create a GitHub Issue only when the user requests or authorizes external publication; otherwise produce the Markdown bug file ready to paste.

## Validate and hand off

Resolve `SKILL_DIR` to the directory containing this `SKILL.md`, then run:

```bash
python3 "$SKILL_DIR/scripts/validate_feature.py" \
  --root <repository-root> \
  --feature <feature-slug> \
  --student-id <StudentID> \
  --require-reports
```

Resolve all errors. Review validator warnings manually because hard-coded domain data and weak requirements cannot be proven mechanically.

Summarize test cases automated/executed/passed/failed, three browser runs, confirmed bugs, report paths, unautomated cases, and human-review fixes. Remind the student that the HTML evidence and demo video must come from real attributable execution.
