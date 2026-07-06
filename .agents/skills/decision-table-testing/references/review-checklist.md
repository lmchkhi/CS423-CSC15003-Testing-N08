# Review Checklist

Use this checklist to audit an existing decision table, test suite, or requirements artifact.

## Completeness

- Every valid condition combination has an expected outcome.
- Every documented exception is represented.
- Default and fallback behavior is explicit.
- Impossible combinations are marked with a reason, not silently omitted.
- Numeric and temporal boundaries are covered outside or beside the table.

## Exclusivity

- No two rows match the same concrete input with conflicting outcomes.
- Wildcards such as `ANY` do not accidentally overlap with more specific rows.
- Precedence is stated when overlaps are intentional.
- Derived conditions do not contradict source conditions.

## Consistency

- Condition labels use one vocabulary throughout the table.
- Outcomes are observable and testable.
- `Y/N`, enum values, ranges, and `ANY` are not mixed carelessly in one column.
- Similar rules use similar phrasing and expected-result detail.

## Feasibility

- Each rule can be turned into a concrete test setup.
- Preconditions are controllable in the test environment.
- External dependencies, roles, feature flags, time, and data state are identified.
- Unreachable states are documented as constraints.

## Traceability

- Each rule maps back to a requirement, user story, ticket, API spec section, or business policy.
- Each high-risk rule maps to at least one test case.
- Test IDs identify the covered rule IDs.
- Assumptions are visible and reviewable.
- Test case IDs use `TC-[MODULE]-[NUMBER]` and map to files under `tests/test-cases/<module>/`.
- Failed or blocked test run rows include a related bug or a clear reason.
- Bug issues include `Found by Test Case`, and pull requests use `Fixes #NN` or `Related to #NN`.

## Risk Review

Prioritize extra tests for:

- Authorization, authentication, permissions, and privacy.
- Payments, refunds, billing, and irreversible transactions.
- Compliance, eligibility, and legal decisioning.
- Data loss, destructive operations, and workflow completion.
- Known defect clusters and complex state transitions.

## Review Output

When reporting review findings, lead with defects:

```markdown
## Findings

| Severity | Rule/Test | Issue | Impact | Suggested fix |
| --- | --- | --- | --- | --- |

## Gaps

## Suggested Additional Tests
```

## Repository Structure Check

- Official test cases live in `tests/test-cases/<module>/`.
- Execution evidence lives in `tests/test-runs/`.
- Summaries live in `tests/test-summary/`.
- `traceability-matrix.md` links requirements, test cases, results, bugs, and status.
- GitHub bug templates live under `.github/ISSUE_TEMPLATE/`.
