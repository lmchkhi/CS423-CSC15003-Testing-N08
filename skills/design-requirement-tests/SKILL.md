---
name: design-requirement-tests
description: Analyze user-provided software requirements as black-box specifications with Decision Table Testing, assess safe Pairwise Testing reductions, and generate a Markdown analysis, one Markdown file per test case, and a Markdown test-run summary. Use when Codex receives requirement IDs, user stories, acceptance criteria, business rules, validation rules, authorization matrices, state-dependent behavior, or input combinations that need systematic, requirement-only test design and traceable test artifacts.
---

# Design Requirement Tests

Turn each requirement into a traceable decision model and executable Markdown test suite. Preserve required business-rule, boundary, sequence, and security coverage; use Pairwise only where it is demonstrably safe and useful.

## Load the resources

Read [references/decision-table-pairwise.md](references/decision-table-pairwise.md) before designing the model. Use these output assets:

- [assets/analysis-template.md](assets/analysis-template.md) for the consolidated analysis.
- [assets/test-case-template.md](assets/test-case-template.md) for every individual test case.
- [assets/test-run-template.md](assets/test-run-template.md) for the run summary.

## Isolate the requirement

- Treat the requirement currently being analyzed as the only source of requirement-specific facts.
- Write artifacts in the user's language; default to Vietnamese when the requirement is Vietnamese.
- Treat examples supplied to demonstrate formatting as format examples only unless the user explicitly says they belong to the same requirement.
- Never transfer fields, constraints, IDs, expected results, dates, tester names, bugs, or environment values from another example.
- Use only the requirement and test data explicitly supplied by the user as the test-design source.
- Do not read source code, database schemas/data, server logs, implementation configuration, or workspace specifications to derive conditions, actions, test data, or expected results.
- Do not automatically enrich the requirement with an API specification or another document found in the workspace. Use supplementary material only when the user explicitly includes it in scope.
- Treat UI, public API responses, browser Network/Storage panels, and other externally observable behavior as black-box execution surfaces, not as sources that redefine expected behavior.
- Record unobservable internal requirements as black-box testability gaps and cover them indirectly through observable behavior where possible. Never require DB access, a test hook, or source inspection in a black-box test case.

## Choose the output location

Follow a user-provided location or an established repository convention. Otherwise create:

```text
test-artifacts/{{REQUIREMENT_ID}}/
├── {{REQUIREMENT_ID}}-decision-table-analysis.md
├── test-cases/
│   ├── TC-{{REQUIREMENT_ID}}-001.md
│   └── ...
└── {{REQUIREMENT_ID}}-test-run.md
```

Preserve the requirement ID exactly in document content and filenames. Sanitize only characters that are invalid in filenames. For multiple requirements, create one isolated artifact set per requirement unless the user explicitly requests a combined model.

## Execute the workflow

### 1. Normalize scope

1. Extract the requirement ID, title, actors, entry points, inputs, states, thresholds, outputs, side effects, security rules, timing rules, and observable UI/API behavior.
2. Rewrite compound prose into numbered atomic rules such as `AR-01`, without changing its meaning.
3. Separate explicit facts from assumptions and unresolved questions.
4. Proceed with clearly labeled, conservative assumptions when they do not change the core behavior. Flag a question as blocking only when different answers would materially change the decision model.

### 2. Model conditions and actions

1. Define conditions as meaningful equivalence classes, ranges, roles, states, or event histories; do not force every condition into a Boolean when a multivalued condition is clearer.
2. Define observable actions and outcomes, including state changes, counters, timers, tokens, headers, messages, navigation, and rejected side effects.
3. List impossible or constrained combinations before building the table.
4. Model sequence-dependent requirements as state/history conditions. Add boundary or state-transition scenarios when a single decision table row cannot express the behavior adequately.

### 3. Build and simplify the decision table

1. Create the full logical table for feasible combinations, with stable rule IDs `R1`, `R2`, and so on.
2. Mark infeasible combinations explicitly and explain the constraint.
3. Map every atomic rule to at least one decision rule, supplementary boundary/state scenario, or explicit non-testable note.
4. Merge columns only when they have the same action vector and the differing condition truly becomes irrelevant. Use `—` for “don't care” and document every merge.
5. Retain separate rows whenever the distinction affects an expected result, side effect, threshold, state transition, message class, authorization result, or security property.

### 4. Evaluate Pairwise Testing

Do not assume Pairwise is automatically applicable. Apply it only to a candidate factor space with at least three reasonably independent factors and multiple levels where exhaustive combinations add redundancy.

1. List candidate factors, levels, constraints, and excluded mandatory scenarios.
2. Keep all decision-table rules that encode business logic, threshold boundaries, temporal sequences, state transitions, authorization/security invariants, or known high-risk interactions as mandatory seeded tests.
3. Generate a pairwise set only for the remaining combinatorial space.
4. Demonstrate pair coverage with a mapping or coverage check; never claim reduction from row count alone.
5. Report the counts before reduction, after decision-table simplification, mandatory tests, Pairwise-added tests, final unique tests, and reduction percentage where meaningful.
6. If Pairwise is unsafe or offers no reduction, say so and keep the Decision Table suite.

### 5. Derive executable test cases

1. Cover each retained decision rule with at least one test case.
2. Add distinct tests for required boundaries, sequences, resets, timer transitions, persistent side effects, client/server responsibilities, and negative security behavior when the requirement demands them.
3. Deduplicate only when one executable scenario covers the same rules with identical setup and expected outcome. Record all covered rule IDs in the analysis traceability matrix.
4. Assign IDs sequentially as `TC-{{REQUIREMENT_ID}}-001`, `002`, and so on.
5. Keep one primary objective per test case and make its data, steps, and expected result concrete enough to execute.
6. Use `Decision Table Testing`, `Pairwise Testing`, or both in the technique field according to the scenario's actual derivation. Add BVA, State Transition Testing, Security Testing, or another technique only when genuinely used.
7. Initialize `Status / Related bugs` as `Not Run / —`; never invent execution results or bug IDs.
8. Assert only externally observable outcomes. Do not invent endpoint paths, response fields, storage keys, status codes, database columns, or internal instrumentation absent from the requirement.
9. When the requirement names an internal counter or state that black-box testing cannot inspect directly, test its observable consequences and document the direct-observation limitation in the analysis.

### 6. Create the test run

- Add exactly one row for every generated test-case file.
- Initialize `Tester` with a placeholder, `Result` as `⬜ Not Run`, `Related Bug` as `—`, and `Note` as `—`.
- Leave execution date, environment, and build/commit as explicit placeholders unless the user supplied them for this run.
- Set the initial summary to zero Passed, Failed, and Blocked; set Not Run and Total to the generated test count.

### 7. Validate before finishing

Verify all of the following:

- Every stated rule is traceable to a test, a supplementary scenario, or a documented gap.
- Every retained decision rule has coverage.
- Every generated test case has exactly one file and one test-run row.
- Test IDs and filenames are unique, sequential, and consistent.
- Expected results describe the requirement, not an assumed implementation.
- Test design cites only user-supplied requirement material and explicitly authorized supplementary input.
- Preconditions and steps require no source-code, database, server-log, or test-hook access.
- Pairwise exclusions, constraints, coverage evidence, and reduction claims are explicit.
- No values leaked from unrelated examples.
- All Markdown tables render consistently and contain no unresolved template tokens except intentional execution placeholders.

Finish by reporting the created paths, test count, Decision Table rule count, whether Pairwise was applied, and any blocking ambiguity.
