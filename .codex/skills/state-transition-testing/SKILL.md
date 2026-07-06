---
name: state-transition-testing
description: Design, document, execute, and report state transition testing for requirements with finite states, valid and invalid transitions, final states, role-based events, APIs, UI workflows, traceability matrices, browser-console execution scripts, and bug reports.
---

# State Transition Testing

## Overview

Use this skill when a requirement describes states, transitions, lifecycle rules, final states, or role/event-dependent behavior. The goal is to turn that requirement into a state model, a transition table, focused Markdown test cases, execution evidence, traceability, and bug reports when transitions fail.

## Workflow

1. Read the requirement and nearby related requirements before designing tests.
2. Identify states, starting state, final states, actors, events, guards, and side effects.
3. Build a transition table with valid and invalid transitions.
4. Choose coverage:
   - state coverage: every state is reached at least once
   - valid transition coverage: every allowed edge is exercised
   - invalid transition coverage: representative disallowed edges are rejected
   - final-state coverage: final states reject all outgoing transitions
5. Create a test design analysis file under `tests/test-summary/`.
6. Create one Markdown file per test case under `tests/test-cases/<requirement-or-module>/`.
7. Use stable IDs that include the method suffix `STT`, for example `TC-ORDER-STT-001`.
8. Update `traceability-matrix.md` with requirement, test case, result, bug issue, and status.
9. When asked for executable checks, generate browser-console or API scripts that print a compact table with `id`, `name`, `result`, `actual`, and `expected`.
10. When a test fails, create a bug report under `tests/bug-reports/` using the GitHub test management template.

## Output Structure

Prefer this repository structure unless the project already has a stronger convention:

```text
tests/
├── test-cases/
│   └── <requirement-or-module>/
│       └── TC-<MODULE>-STT-001.md
├── test-runs/
│   └── <sprint-or-date>-test-run.md
├── test-summary/
│   └── <requirement>-state-transition-testing-analysis.md
└── bug-reports/
    └── BUG-<MODULE>-STT-001.md
traceability-matrix.md
```

## Design Rules

- Keep each test case independent when possible; use a fresh entity or reset data before each case.
- Separate valid transitions from invalid transitions so failures are easy to diagnose.
- For invalid transitions, assert both response/error and unchanged state.
- For role-based transitions, include the actor in the test name and preconditions.
- For final states, test at least one prohibited outgoing transition from each final state; add more if risk is high.
- Do not mark a test as pass/fail until there is execution evidence.
- If a test fails, link it both ways: test case `Status / Related bugs`, bug report `Found by Test Case`, and traceability matrix `Bug Issue`.

## Templates

Read `references/templates.md` when creating or updating:

- state transition test design analysis
- individual STT test cases
- browser-console execution scripts
- test run files
- traceability matrix rows
- bug reports

