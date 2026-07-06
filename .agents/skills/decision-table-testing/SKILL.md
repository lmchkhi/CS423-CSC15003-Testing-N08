---
name: decision-table-testing
description: Design, analyze, generate, and review decision table tests for requirements, business rules, APIs, validation logic, workflows, and state-dependent behavior. Use when Codex needs to convert rules into condition/action tables, identify combinations, collapse impossible or equivalent cases, detect missing or overlapping rules, choose representative test cases, review decision-table coverage, or explain decision-table testing artifacts.
---

# Decision Table Testing

Use this skill to turn rule-heavy behavior into compact, testable decision tables and executable test ideas. Prefer it when behavior depends on combinations of conditions rather than a single input.

## Core Workflow

1. Extract decision factors.
   - Identify conditions, actions/outcomes, constraints, priorities, defaults, and exceptions.
   - Preserve original requirement wording beside normalized condition names when traceability matters.
   - Mark each condition type: boolean, enumerated, numeric range, temporal, stateful, or derived.

2. Normalize condition domains.
   - Convert vague states into explicit values: `valid/invalid`, `present/missing`, `approved/rejected/pending`.
   - Partition numeric inputs into equivalence classes before table construction.
   - Add boundary-value tests separately when numeric ranges are relevant.

3. Build the full logical space.
   - For small spaces, enumerate all combinations.
   - For large spaces, use constraints to remove impossible combinations early.
   - Record assumptions for omitted combinations, especially "cannot happen" states.

4. Resolve each rule.
   - Map every valid condition combination to one expected action/outcome.
   - If multiple outcomes apply, identify precedence explicitly.
   - Flag gaps (`no outcome`) and overlaps (`conflicting outcomes`) before generating tests.

5. Minimize without hiding risk.
   - Merge rules only when merged rows have the same outcome and unchanged observable behavior.
   - Use `-` or `ANY` only when a condition truly does not affect the outcome.
   - Keep separate rows for regulatory, security, payment, authorization, eligibility, or irreversible actions even if they look mergeable.

6. Generate repository-ready tests.
   - Create at least one positive test for each action/outcome.
   - Create negative tests for rejected, blocked, denied, fallback, and error outcomes.
   - Name test cases with stable IDs: `TC-[MODULE]-[NUMBER]`, for example `TC-LOGIN-001`.
   - Store generated test case files under `tests/test-cases/<module>/TC-MODULE-NNN.md`.
   - Add pairwise or risk-based sampling when exhaustive testing is impractical.
   - Include boundary and transition tests outside the decision table when needed.

7. Review the artifact.
   - Check completeness, exclusivity, consistency, feasibility, traceability, and expected-result clarity.
   - Prefer concise tables that a tester or developer can execute without rereading the original prose.

## Repository Template

When asked to create or update test artifacts, follow the GitHub test case management structure used by this project:

```text
project-root/
├── src/
├── tests/
│   ├── test-cases/
│   │   └── <module>/
│   │       └── TC-MODULE-NNN.md
│   ├── test-runs/
│   │   └── sprint-N-test-run.md
│   └── test-summary/
│       └── sprint-N-summary.md
├── traceability-matrix.md
└── .github/
    └── ISSUE_TEMPLATE/
```

Use the templates in `assets/templates/` when creating repository artifacts:

- `test-case.md` for files under `tests/test-cases/<module>/`.
- `test-run.md` for files under `tests/test-runs/`.
- `traceability-matrix.md` for the root traceability matrix.
- `bug_report.md` for `.github/ISSUE_TEMPLATE/bug_report.md`.

## Decision Table Output

When the user only asks for a decision table in the chat, use this compact shape unless they request files:

```markdown
## Assumptions

| ID | Assumption | Source/Reason |
| --- | --- | --- |

## Decision Table

| Rule | Condition A | Condition B | Condition C | Expected action/outcome | Requirement ID | Notes |
| --- | --- | --- | --- | --- | --- | --- |

## Repository Test Cases

| Test Case ID | File path | Rule(s) | Requirement ID | Module | Test type | Technique | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Coverage Notes
```

Use `Y/N`, explicit enum values, ranges, or `ANY`; do not mix these styles in the same condition column unless there is a clear reason. Use `technique: decision-table` when mapping generated tests to GitHub labels.

## When To Read References

- Read `references/modeling-guide.md` when converting messy requirements into a normalized decision table.
- Read `references/github-testcase-management.md` when creating files, issue templates, test runs, labels, or traceability artifacts in this repository.
- Read `references/review-checklist.md` when reviewing or auditing an existing table, test suite, or requirements artifact.
- Read `references/examples.md` when a concrete example pattern would help shape the answer.

## Helper Script

Use `scripts/analyze_table.py` for CSV decision tables when deterministic checks are useful. The script expects a CSV with a `Rule` column, one or more condition columns, and one or more outcome/action columns.

```bash
python3 .agents/skills/decision-table-testing/scripts/analyze_table.py path/to/table.csv
```

The script reports duplicate rules, overlapping rows with conflicting outcomes, rows with missing outcomes, and a compact summary of condition domains.
