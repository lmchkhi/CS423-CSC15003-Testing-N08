---
name: generate-hw04-playwright-tests
description: Turn a user-provided web feature requirement, acceptance criteria, or manual test cases into runnable, data-driven Playwright TypeScript automation that satisfies the HW04 automation-testing rubric. Use when Codex must generate or repair Playwright tests for one or more HW04 features, create at least 12 meaningful cases per feature from external JSON or CSV, configure Chromium/Firefox/WebKit execution, generate separately labeled HTML test reports, or verify automation quality. Do not create or manage AI audit, AI critique, or AI-review documents. Write the skill instructions and code identifiers in English, but communicate with the user and generate test-design and execution-report prose in Vietnamese.
---

# Generate HW04 Playwright Tests

Create working repository artifacts, not a code-only answer. Treat each supplied feature as an independent unit with at least 12 logical test cases. Repeat the workflow for each feature when the user supplies more than one.

Read [references/hw04-contract.md](references/hw04-contract.md) before planning. Read [references/playwright-patterns.md](references/playwright-patterns.md) when implementing or repairing code.

## Language contract

- Write all user-facing messages, plans, questions, summaries, generated test-design Markdown, and test-analysis prose in Vietnamese.
- Keep source-code identifiers, filenames, environment-variable names, Playwright APIs, and machine-readable data keys in English.
- Prefer Vietnamese Playwright test titles while retaining a stable case ID, for example `AUTH-TC-001 | Đăng nhập thành công`.
- Preserve literal rubric labels such as `Run by:` exactly when required.

## Establish the input contract

Inspect the current repository before asking questions. Locate application documentation, source code, routes, existing tests, Playwright configuration, package scripts, seed/reset logic, and startup instructions.

Obtain or discover:

- the feature requirement and its authoritative source;
- feature name, actor, rules, preconditions, inputs, outputs, and failure behavior;
- base URL and startup command;
- student ID;
- credentials, test-data setup, and cleanup/reset method;
- desired output location and repository conventions.

Never invent a student ID, credential, selector, requirement, execution result, or product behavior. Ask one concise Vietnamese question only when a critical value cannot be discovered. If runtime access is unavailable, implement what can be supported from evidence and label execution as blocked.

Create a compact Vietnamese requirement ledger before editing:

| Tính năng | Nguồn yêu cầu | Quy tắc | Mã ca kiểm thử | Tệp dữ liệu | Tệp spec | Trình duyệt | Báo cáo |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Convert the requirement step by step

Perform and document these stages separately for every feature. Never collapse them into one generic generation step.

1. **Analyze** - Extract rules, actors, states, dependencies, validation constraints, observable results, and ambiguities.
2. **Design** - Propose at least 12 distinct cases covering applicable positive, negative, boundary, validation, authorization, state-transition, and recovery behavior.
3. **Review** - Remove semantic duplicates, challenge unsupported assumptions, find missing coverage, and map every expected result to an observable oracle.
4. **Model data** - Define an external JSON or CSV schema and assign one stable ID to every case.
5. **Map automation** - Map each case to setup, stable locators, actions, assertions, cleanup, and isolation.
6. **Generate** - Implement the data, typed loader, fixtures/helpers/page objects when justified, Playwright spec, browser configuration, and report runner.
7. **Verify and repair** - List tests, run cheap checks, execute the suite when possible, classify failures, and make evidence-based fixes.

## Generate the automation package

Adapt to established repository structure. For a new Playwright setup, normally create:

```text
playwright.config.ts
tests/<feature-slug>.spec.ts
test-data/<feature-slug>.json
tests/support/data-loader.ts
scripts/run-feature-matrix.mjs
docs/<feature-slug>-test-design.md
.env.example
```

Add a page object or custom fixture only when it removes meaningful duplication. Do not overwrite a sound existing config or abstraction; merge the HW04 behavior into it.

Do not create, update, summarize, validate, or include AI audit logs, AI critiques, or AI-review documents. Keep this skill scoped to requirements analysis, test design, Playwright automation, execution, and Playwright test reports.

For every case retain:

- stable ID;
- Vietnamese title;
- category and covered rule;
- preconditions;
- primitive inputs and expected values;
- actions;
- precise observable oracle;
- cleanup/reset needs.

Store records in a separate `.json` or `.csv` file. Do not place test-case arrays or objects inline in a spec, config, page object, fixture, or helper. Validate the file at runtime and fail clearly on malformed input, duplicate/missing IDs, missing fields, unknown action/expectation types, or fewer than 12 cases.

Generate tests from records while keeping materially different user journeys readable. Do not branch on individual case IDs. Use a small typed action/expectation vocabulary or separate focused groups that still consume external records.

## Apply Playwright quality rules

- Prefer TypeScript and `@playwright/test`.
- Prefer `getByRole`, then `getByLabel`/`getByPlaceholder`/`getByText`, then test IDs; use CSS only when semantic locators are unavailable.
- Avoid XPath, positional selectors, arbitrary sleeps, swallowed errors, execution-order dependencies, unsafe `any`, and conditional assertions that silently skip verification.
- Use web-first waits and assertions.
- Use unique test entities and deterministic setup/cleanup. Keep secrets in environment variables.
- Exercise the requested feature through the UI; use APIs only for permitted setup and cleanup.
- Keep legitimate product failures visible. Never weaken an oracle, add a broad skip, or raise retries merely to make the suite green.
- Enable useful evidence such as screenshot on failure and trace on first retry.

Use at least three meaningful assertion families across each feature or suite, and map them to case IDs in the test-design document. Examples include visibility, text/accessibility, value/attribute/state, URL/navigation, collection count, and response/plain-value assertions.

## Configure browsers and reports

Configure three actual projects: Chromium, Firefox, and WebKit, unless the user explicitly chooses the permitted Chrome/Edge/Firefox combination and the installed environment supports it.

Create one Playwright HTML report per feature-browser run. Use a stable unique folder such as:

```text
reports/html/<feature-slug>/<browser>/
```

Make the visible report title or metadata contain both:

```text
Run by: <actual-student-id>
<ISO-8601 timestamp>
```

Use a deterministic sequential matrix runner. Preserve reports for failed runs, print the feature/browser/status/report path, continue through all cells when safe, and exit nonzero if any cell fails. Never claim reports exist until real execution creates and inspection confirms them.

## Validate in increasing scope

Run the cheapest applicable checks first:

1. Validate data-file shape and case count.
2. Run TypeScript/static checks.
3. Run `npx playwright test --list` for all projects.
4. Confirm at least 12 discovered logical cases per feature and all three projects.
5. Run one representative case per feature on Chromium.
6. Run every feature-browser cell.
7. Inspect report HTML for the exact student label, ISO timestamp, browser identity, case counts, and honest result.

For three features with exactly 12 cases each, expect at least 108 browser-expanded executions and nine separately generated reports. Browser repetition is not additional logical test-case coverage.

Classify every failure as product defect, automation defect, invalid data, or environment/dependency failure. Repair automation and data defects. Preserve genuine product failures with screenshots and Vietnamese bug-report evidence. Document cases that cannot be automated and why.

## Complete the handoff

Return a concise Vietnamese handoff that separates:

- implemented artifacts;
- commands actually executed;
- verified results;
- failures, genuine defects, and blockers;
- exact rerun commands.

Report the logical case count per feature, covered assertion families, browser matrix status, report paths, and student-label/timestamp verification. Do not represent generated code as executed evidence.

Before calling the work complete, verify:

- [ ] The requirement source and assumptions are documented.
- [ ] Every feature has at least 12 distinct cases.
- [ ] Case data is external JSON or CSV.
- [ ] At least three meaningful assertion families are present.
- [ ] Chromium, Firefox, and WebKit are configured.
- [ ] Every requested feature ran on all three browsers, or blockers are explicit.
- [ ] Every real run has its own HTML report.
- [ ] Every report visibly contains the actual student ID and ISO timestamp.
- [ ] No execution evidence, report, bug, commit history, or video claim is fabricated.
