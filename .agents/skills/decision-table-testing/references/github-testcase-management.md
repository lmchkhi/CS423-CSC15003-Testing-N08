# GitHub Test Case Management Structure

Use this reference when creating repository files, issue templates, test runs, labels, or traceability artifacts.

## Repository Layout

Create or update artifacts in this structure:

```text
project-root/
├── src/
├── tests/
│   ├── test-cases/
│   │   ├── login/
│   │   │   ├── TC-LOGIN-001.md
│   │   │   └── TC-LOGIN-002.md
│   │   ├── register/
│   │   └── checkout/
│   ├── test-runs/
│   │   ├── sprint-1-test-run.md
│   │   └── sprint-2-regression.md
│   └── test-summary/
└── traceability-matrix.md
└── .github/ISSUE_TEMPLATE/
```

Use `tests/test-cases/` for official test case designs, `tests/test-runs/` for execution evidence by sprint or regression round, and `tests/test-summary/` for summary reports. Keep bug reports as GitHub Issues, not comments inside test case files.

Do not edit official test cases directly on `main`; create a branch and review changes through a pull request.

## Test Case ID Convention

Use stable IDs in this format:

```text
TC-[MODULE]-[NUMBER]
```

Examples:

- `TC-LOGIN-001`
- `TC-REGISTER-005`
- `TC-CART-003`
- `TC-CHECKOUT-010`

Avoid unstable names such as `test1`, `check-login`, `case-a`, or `login-success-test-v2-final`.

## Test Case File Template

Use `assets/templates/test-case.md` when creating files under `tests/test-cases/<module>/`.

Required sections:

- Title: `# TC-MODULE-NNN: Short title`
- `Requirement ID`
- `Module / Test type / Technique`
- `Preconditions`
- `Test data`
- `Test steps`
- `Expected result`
- `Status / Related bugs`

For decision-table-derived tests, set technique to `Decision Table Testing` and include the covered rule IDs.

## Test Run Template

Use `assets/templates/test-run.md` when recording execution evidence. Each failed or blocked result must include a related bug or a clear reason.

Required columns:

- `Test Case ID`
- `Module`
- `Tester`
- `Result`
- `Related Bug`
- `Note`

Allowed results:

- `Pass`
- `Fail`
- `Blocked`
- `Not Run`

## Labels

Use prefixed labels so GitHub filters remain easy:

- Type: `type: test-case`, `type: test-run`, `type: bug`, `type: task`
- Module: `module: login`, `module: register`, `module: cart`, `module: checkout`, `module: api`
- Technique: `technique: EP`, `technique: BVA`, `technique: decision-table`, `technique: state-transition`
- Result/status: `result: pass`, `result: fail`, `result: blocked`, `status: new`, `status: ready for retest`
- Risk: `severity: critical`, `severity: major`, `priority: P0`, `priority: P1`

## Bug Linking

Maintain two-way traceability:

- In the bug issue, include `Found by Test Case: TC-MODULE-NNN`.
- In the test run, set `Result = Fail` or `Blocked` and include `Related Bug = #NN`.
- In the test case file, add related bugs when the bug is serious or recurring.
- In the pull request, use `Fixes #NN` or `Related to #NN`.

Do not create generic bugs. Every bug should trace back to the test case, workflow run, or script that discovered it.

## Bug Report Template

Use `assets/templates/bug_report.md` for `.github/ISSUE_TEMPLATE/bug_report.md`.

Required sections:

- `Found by Test Case`
- `Related Requirement`
- `Severity / Priority`
- `Environment`
- `Steps to reproduce`
- `Expected result`
- `Actual result`
- `Evidence`

Recommended labels: `type: bug`, `module: <module>`, `severity: <level>`, `priority: <level>`, `status: new`, `found-by: test-case`.

## Traceability Matrix

Use `assets/templates/traceability-matrix.md` for the root `traceability-matrix.md`.

Required columns:

- `Requirement`
- `Test Case`
- `Result`
- `Bug Issue`
- `Status`

Use the matrix to answer:

- Which requirements have been tested?
- Which bugs belong to each requirement?
- Which test cases need regression or retest?
