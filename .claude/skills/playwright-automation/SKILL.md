---
name: playwright-automation
description: Run HW04 Task 1 end to end — drive an AI stage by stage to convert manual test cases into data-driven Playwright specs for a feature, review and repair what the AI got wrong, execute the 3-browser matrix so every feature produces its own HTML report labeled "Run by: <StudentID>" plus an ISO timestamp, and turn genuine assertion failures into bug reports. Use when starting or continuing any HW04 automation feature, when running or repairing the browser matrix, when a report is missing/mislabeled, or when auditing the suite against the HW04 rubric.
---

# Playwright Automation (HW04 Task 1)

Produce working, evidence-backed automation — not sample code. Adapted from the
seminar group's `build-playwright-assignment` skill; the additions here cover
what that version left out (ISO timestamp in the label, EShop's shared-SQLite
state hazards, the two-frontend topology, GitHub-issue bug logging,
non-automatable cases, and §12 commit discipline).

**Language rule.** Everything written into a graded document
(`reports/main-report.md`, `ai-gap-analysis/`, `test-design/`, bug reports)
is fluent Vietnamese prose. Code, identifiers, spec titles, commit messages,
file names and the literal `Run by:` label stay English. Never translate the
verbatim prompt/output fields in the AI logs.

## 0. Establish the contract before editing

Read, in this order: `CLAUDE.md` (scope, student ID, commit rules),
`sut-requirements.md` (the oracle), `references/eshop-environment.md` (ports,
accounts, API, state hazards), the HW02 manual cases for the feature, and the
existing `automation/` config. Do not re-derive any of this from the PDF.

Never invent the student ID and never leave `{StudentID}` in an artifact — it
comes from `automation/.env` (`STUDENT_ID`). If the SUT will not start, keep
designing and implementing, but mark execution and reports **blocked**; never
claim a run that did not happen.

Keep a requirement ledger in `reports/main-report.md` and update it as you go:

| Feature | HW02 source cases | Case IDs | Count | Data file | Spec file | Browsers | Reports |
| --- | --- | --- | ---: | --- | --- | --- | --- |

A feature is complete only when it has ≥12 distinct automated cases **and** has
run on all three browsers with three saved reports.

## 1. Drive the conversion stage by stage

§6 forbids one generic "write all the scripts" prompt. For each feature run
these seven stages **separately**, and log each one (`prompt-log` skill for the
raw record, `ai-audit-log` for the reviewed appendix — both, every time):

1. **Analyze** — extract rules, actors, preconditions, state transitions,
   inputs and ambiguities from `sut-requirements.md` + the HW02 cases.
2. **Design** — enumerate ≥12 uniquely-ID'd cases with a real mix of positive,
   negative, boundary and state/error cases. Reuse HW02 IDs where a case
   carries over (`TC-FR02-DT-003` → `F02-TC-003`), and mark cases newly
   designed in HW04 as such — FR-13 needs ~6 of these.
3. **Review** — kill semantic duplicates, check every expected result against
   the oracle, and confirm each has an observable UI oracle. If the only oracle
   is an API response, say so and decide whether the case belongs in the suite.
4. **Model data** — define the JSON schema for the feature and map every case
   ID to exactly one record.
5. **Map automation** — pick locators, setup/teardown, actions and assertions
   per case; identify which cases mutate shared state.
6. **Generate** — write the data file, page objects and the spec.
7. **Verify and repair** — list, run, diagnose from evidence, fix. Repair
   automation and data defects only; a failure caused by a genuine EShop defect
   stays failing.

Write the per-feature case table into `test-design/<feature>/case-map.md`:
HW02 case ID → HW04 case ID → automated test title → data row → status
(automated / not automated + reason).

## 2. Make it genuinely data-driven

One file per feature: `automation/test-data/<feature-slug>.cases.json`. Inline
case arrays or case objects in a spec, fixture, helper or config are an
automatic rubric failure (§6 — "hardcoded inline arrays or objects in the
script are not accepted").

A record holds case ID, category, inputs, and the primitive expected values the
test asserts on. It never holds selectors, functions or secrets — secrets come
from `.env`.

**The test for whether a suite is actually data-driven:** for every field the
schema declares, `grep` the spec for a read of it, and ask whether editing that
field in the JSON would change the result. A field that fails either check is
decoration — the real oracle is still in the script. Applies equally to a
constant in the spec that serves exactly one case (a status-label domain, a
list of expected URLs): if it is one case's expected value, it belongs in that
case's record. Run this check across **all** features when it finds a hit in
one; the same generator wrote the others.

`automation/utils/data.ts` loads and validates at runtime and fails early with
an actionable message for: unreadable/malformed file, duplicate or missing case
IDs, missing required fields, unknown action/expectation keys, and **fewer than
12 records for a feature**. Keep the case ID in the generated test title. Do
not `if (caseId === 'F02-TC-007')` — dispatch through a small documented
action/expectation vocabulary, or split materially different journeys into
their own `describe` blocks that still read external records.

## 3. Implement the specs

TypeScript + `@playwright/test`. Locator priority: `getByRole` with accessible
name → `getByLabel` / `getByPlaceholder` / `getByText` → test IDs → CSS only
when nothing semantic exists (and say why in a comment). No XPath **for
identifying an element**, no positional selectors, no `waitForTimeout` as a
substitute for a web-first assertion, no order-dependent tests, no conditional
assertions that silently skip verification.

Two exceptions, both of which must carry a comment saying why:

- `locator('xpath=..')` to hop from a semantic anchor to its container is
  allowed — Playwright has no CSS parent combinator, and the anchor is still
  the accessible name. FR-13's metric cards need this: the value `<p>` has no
  role or test id, only the `<h3>` beside it does.
- `waitForTimeout` is allowed when the wall-clock interval *is* the rule under
  test, as with FR-02's 30-second lockout window. Nowhere else.

Use ≥3 distinct meaningful assertion patterns across the suite and record which
test demonstrates each in the ledger. Useful families here: visibility
(`toBeVisible`/`toBeHidden`), text/accessible state
(`toHaveText`/`toContainText`), value/attribute (`toHaveValue`/`toHaveAttribute`
— e.g. FR-02's `type="email"` rule), navigation (`toHaveURL`), count
(`toHaveCount`), and value equality on an API-derived expected number
(`expect(revenue).toBe(sumOfDelivered)` for FR-13).

**EShop state hazards — the seminar skill is silent on these and they cause
most flakes:**

- One SQLite file for everything, so the suite runs `workers: 1`,
  `fullyParallel: false`. Never assume a test has the DB to itself across runs.
- FR-02's lockout is a **real 30-second wall-clock timer after ≥3 consecutive
  failures**. Every case that trips it registers its own throwaway account via
  the API first, so it can never lock `test@eshop.com` and poison the rest of
  the matrix. Budget the wait in the test timeout; don't shorten the assertion
  to dodge it.
- FR-10 needs a *fresh order per transition case* — create it through
  `POST /api/checkout` in setup, then drive the transition through the admin UI
  so the feature itself is still exercised via the frontend.
- FR-13 must not hardcode revenue/order totals: the seed and every previous
  matrix cell changes them. Compute the expected value from
  `GET /api/admin/orders` at assertion time (sum `total_amount` where
  `status = 'delivered'`) and assert the dashboard equals it. That is the
  requirement restated, not a weakened oracle.
- Admin lives on a different origin (`:5174`) from the shop (`:5173`). Use the
  configured `ADMIN_URL`/`WEB_URL`, never a bare relative path, when a test
  crosses apps.

Enable `screenshot: 'only-on-failure'`, `trace: 'retain-on-failure'`,
`video: 'retain-on-failure'`; keep `retries: 0` locally so defects stay visible.

## 4. The 3×3 matrix and the nine reports

Three explicit projects: `chromium`, `firefox`, `webkit`. Do not fake coverage
by cloning a project under a new name.

Run **one feature × one browser per invocation** via
`npm run matrix` (`automation/scripts/run-matrix.ts`), which writes each cell to
its own folder:

```
reports/html/<feature-slug>/<browser>/
```

Every report must visibly carry, per §11:

```
Run by: 23127300 | <feature> | <browser> | <ISO timestamp>
```

The label is built in `playwright.config.ts` from `.env` + the runner's env
vars, and is set **both** as the HTML reporter `title` and in config
`metadata`, so it survives a reporter change. Keep the exact string `Run by:`.

After the matrix finishes:

1. `grep -l "Run by: $STUDENT_ID" reports/html/*/*/index.html` must return 9
   files. File existence alone is not evidence.
2. Confirm the ISO timestamp is present in each and that cells did not
   overwrite one another.
3. Update `reports/run-manifest.md`: feature, browser, exit status, test
   counts, report path, ISO timestamp. Record failures honestly — a cell that
   failed still keeps its report.

The runner returns non-zero if any cell failed and never aborts the remaining
cells silently.

## 5. Failures → bugs → issues

Triage every failure into: product defect / bad automation / bad data /
environment. Fix the last three. For a product defect:

- keep the test failing,
- capture the screenshot Playwright already saved and copy it to
  `bug-reports/screenshots/<BUG-ID>.png`,
- hand off to the **`bug-report` skill**, which writes
  `bug-reports/BUG-<ID>.md` in the repo template and files the GitHub issue
  with the screenshot linked (§6 requires both the Markdown report and the
  issue).

Use `BUG-FR02-###`, `BUG-FR10-###`, `BUG-FR13-###`, continuing from the HW02
numbering only if the bug is genuinely the same defect — otherwise start a new
number and cross-reference the HW02 report.

## 6. What you could not automate

§6 requires this explicitly. Record every non-automated case in
`test-design/not-automated.md`: case ID, why (needs a human oracle, needs email
access, is mobile-only, is non-deterministic, browser can't reach it), and what
would make it automatable. An honest short list beats a padded suite.

## 7. The AI gap analysis (§6 "review and fix")

`ai-gap-analysis/ai-generated-script-gaps.md` is graded work, not a formality.
For each defect the AI's first draft had, write: what it produced, why it is
wrong here, what you changed, and **why the AI missed it** — prompt quality,
model limitation, or a property of the feature it could not observe (e.g. it
cannot know the DB is shared, or that lockout is 30 s, unless told). Tie each
entry to an `ai-audit-report.md` entry number. Typical finds: brittle CSS
selectors, missing waits replaced by sleeps, assertions that assert the buggy
current behaviour, missing negative/state cases, ignored cross-origin admin.

## 8. Commits (§12)

≥8 commits over ≥4 different days, and **only commits touching test-script
files count**. Commit at the end of each stage-6/7 cycle, not in one batch:

```bash
git add automation/tests/<feature>.spec.ts automation/test-data/<feature>.cases.json
git commit -m "test(fr-02): automate lockout cases F02-TC-004..007"
```

Regenerate `git-log.txt` (`git log --pretty=fuller > git-log.txt`) before
submitting.

## Verification gate

Cheapest checks first; do not report success before all of these pass:

1. `npm ci` (or `npm install`) and `npx playwright install` in `automation/`.
2. `npm run typecheck`.
3. `npx playwright test --list` — ≥12 cases per feature per project.
4. One representative case per feature on Chromium.
5. `npm run matrix` — all nine cells.
6. Nine report folders exist, each with `Run by: <StudentID>` **and** an ISO
   timestamp visible in the HTML; `reports/run-manifest.md` matches reality.
7. Every genuine failure has a bug report + issue; every non-automated case is
   documented.

In the handoff, separate **implemented** from **executed and verified**, and
state: case count per feature, assertion patterns used, matrix result, report
paths, label verification, open failures/blockers, and the exact rerun command.
