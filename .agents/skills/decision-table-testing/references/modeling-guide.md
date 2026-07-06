# Modeling Guide

Use this guide when requirements are prose, user stories, API rules, validation specs, or workflow descriptions.

## Extraction

Start by listing:

- Decision: the question being answered, such as "Can the user submit the claim?"
- Conditions: independent facts that influence the decision.
- Actions/outcomes: externally visible results.
- Constraints: combinations that cannot occur or are out of scope.
- Priority rules: which rule wins when multiple rules match.
- Default behavior: what happens when no special rule applies.

Avoid turning actions into conditions. For example, "show warning" is an action, while "amount exceeds limit" is a condition.

## Condition Design

Use boolean conditions only when the original concept is naturally binary. Otherwise use explicit domains:

- Account status: `active`, `suspended`, `closed`
- Role: `guest`, `user`, `admin`
- Payment state: `unpaid`, `authorized`, `captured`, `refunded`
- Input quality: `missing`, `malformed`, `valid`

For numeric inputs, partition first:

- Example: `age < 18`, `18 <= age <= 64`, `age >= 65`
- Add boundary tests for values at and around each boundary: `17`, `18`, `64`, `65`

For time-based inputs, name the reference point:

- `before_cutoff`, `at_cutoff`, `after_cutoff`
- `trial_active`, `trial_expired`

## Table Construction

Use one row per rule. For each row:

- Fill every condition column with a concrete value or `ANY`.
- Fill the outcome column with one observable expected result.
- Add notes only for constraints, precedence, or traceability.

If a rule has multiple visible outcomes, either:

- Use separate action columns when the actions are independently checkable, or
- Keep one expected outcome and describe secondary checks in the test case.

## Minimization

Merge rows only when all differing conditions have no effect on the outcome. Prefer explicit rows when:

- The behavior is high risk.
- A condition has caused bugs historically.
- The domain is regulated, financial, privacy-related, or security-sensitive.
- The merged row would make a tester guess which concrete input to use.

## Test Derivation

For each rule, produce:

- A concrete input combination.
- Preconditions and state setup.
- The operation under test.
- The expected outcome.
- A stable test case ID in `TC-[MODULE]-[NUMBER]` format.
- A target file path under `tests/test-cases/<module>/`.
- Priority: high for critical outcomes, medium for normal paths, low for redundant sampled paths.

When exhaustive coverage is too large, combine:

- One representative test per decision table rule.
- Pairwise coverage across lower-risk condition domains.
- Boundary tests for numeric and temporal partitions.
- State transition tests when previous state affects the outcome.
