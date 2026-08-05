---
name: playwright-automation
description: "Analyze one web-system feature and produce the complete automation-testing evidence set: at least 12 individually documented Markdown test cases, external CSV/JSON test data, data-driven Playwright scripts for Chromium/Firefox/WebKit with at least three assertion patterns, genuine per-browser HTML reports labeled with the supplied StudentID and an ISO timestamp, failure triage, Markdown bug reports for confirmed product defects, and corresponding GitHub Issues labeled by the remote repository's existing convention. Use for feature automation, converting manual feature tests to Playwright, or maintaining the same coursework artifacts after a feature changes."
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

Run the feature once per project, not as an unlabelled synthetic result. Use the supplied `StudentID` and one actual ISO-8601 timestamp per invocation. Put the identity in the HTML reporter title so it is visible immediately when the report opens:

```text
Run by: <StudentID>
```

Store the ISO-8601 run timestamp in report metadata. Do not duplicate the timestamp in the title. Open the generated report and verify the title visibly shows the Student ID without expanding Metadata.

Write reports to `reports/<feature-slug>/<browser>/`. Do not hand-edit an HTML report or manufacture a passing run. Preserve real failed reports. If the SUT, browser binaries, or dependencies prevent execution, report the blocker and do not claim a report exists.

## Triage failures and report bugs

For every failed assertion, distinguish:

1. test defect (bad selector/data/assertion);
2. environment or infrastructure problem;
3. confirmed product defect.

Fix and rerun categories 1 and 2 where safe. Create a bug file only for category 3 after reproducing it. Copy [assets/bug-report-template.md](assets/bug-report-template.md), embed at least one real screenshot under **Evidence** with Markdown image syntax so it renders as a preview, and link traces/videos/logs with normal Markdown links. Prefer repository-relative paths for local evidence and hosted image URLs when the report must render remotely. Link the discovering test case and update it to `Fail / BUG-...`. Keep GitHub label selection out of the bug report: do not add `Suggested labels` or `Verified remote labels` sections or lines. Never infer a product bug solely from a timeout or unavailable service.

## Publish confirmed bugs to GitHub

After creating each local bug-report Markdown file, publish one corresponding GitHub Issue to the repository remote with GitHub CLI:

1. Run `gh auth status` and `gh repo view --json nameWithOwner,url` from the repository root. Use `-R <owner/repo>` on later commands if the resolved repository is ambiguous.
2. Inspect the remote before choosing labels:

   - run `gh label list --limit 200 --json name,description,color` to discover available labels and the visual convention for each label family;
   - run `gh issue list --state all --limit 100 --json number,title,labels,url` to learn the spelling, casing, prefixes, and combinations used by existing issues.

3. Derive type, module, severity, priority, status, and discovery source from the bug title, existing report metadata, and test context, then map them to exact existing label names. Use this mapping only for the GitHub operation; do not write suggested or verified label lists into the local bug report. For type, severity, priority, status, and discovery-source labels, never invent, rename, or create labels; when no established label represents a dimension, retain that metadata in the issue body and omit only that label.
4. Handle the module label as the only creation exception. If the exact module label is missing but the remote has an established module-label family, derive the new name, casing, prefix, description style, and color from its peers, then create and verify it before creating the issue:

```bash
gh label create "<module-label-following-remote-convention>" \
  --description "<description-following-peer-module-labels>" \
  --color "<six-character-color-used-by-peer-module-labels>"
gh label list --limit 200 --json name,description,color
```

Do not use `--force` and do not modify an existing label. If the remote has no module-label convention to derive from, keep the module in the issue body and report that a module label could not be created safely without inventing a convention.
5. Search the listed issues for the same bug ID, title, discovering test case, or reproduction before publishing. Reuse and report the existing issue URL when it is a duplicate.
6. For a new issue, use the local report as the body and pass every verified label explicitly:

```bash
gh issue create \
  --title "[BUG][<Module>] <summary>" \
  --body-file "bugs/<feature-slug>/BUG-<MODULE>-<NNN>.md" \
  --label "<exact-existing-label>" \
  --label "<another-exact-existing-label>"
```

7. Capture the returned issue URL, verify it with `gh issue view <issue-url> --json url,title,labels`, add only the issue URL or duplicate-reuse URL to the local bug report and discovering test case, and include it in the handoff. Do not add a verified-label summary to the bug report. Keep one local bug report mapped to one GitHub Issue. Do not claim publication without a returned and verified issue URL.

If `gh auth status` fails or GitHub returns an authentication/authorization response such as `401` or `403`, report the credential or repository-permission problem. If authentication succeeds but `gh repo view`, label/issue reads, `gh label create`, or `gh issue create` fails with DNS, connectivity, operation-not-permitted, or similar environment errors, treat sandbox/network isolation as a possible cause: rerun the same command with the required elevated sandbox/network permission before concluding GitHub is inaccessible. Preserve the local report and exact command error if publication remains blocked.

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
