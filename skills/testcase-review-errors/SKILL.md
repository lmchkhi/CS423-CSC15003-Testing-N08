---
name: testcase-review-errors
description: "Review testcase markdown files and list errors based on the project testcase format. Use when asked to review one or multiple testcases, audit testcase quality, or check testcase compliance. Supports up to 5 testcase files per run."
argument-hint: "Provide 1-5 testcase file paths to review"
user-invocable: true
---

# Testcase Review Errors

Review testcase files and report three error classes:
- consistency errors
- format errors
- logical errors

Use this skill when a user asks to review testcases, audit testcase quality, or validate testcase writing quality against the project template.

## Inputs
- (May provide) one to five testcase files in markdown format.
- Reference format file: [tc-format.md](./assets/tc-format.md).

If more than five files are provided, stop and ask the user to split the review into smaller batches.

## Error taxonomy

### Format errors
A testcase violates mandatory structure or writing format rules from the template.
Examples:
- Missing required section headings.
- Wrong section order when order matters for readability.
- Invalid ID format (expected pattern like `TC-FRxx-Functionality-xxx`).
- Missing test data table.
- Steps not in numbered list format.

### Consistency errors
A testcase has internal mismatch across sections.
Examples:
- Test data values used in steps do not exist in the Test data section.
- Steps reference data that is marked invalid while expected result assumes success.
- Precondition states one role/environment but any else assume another.
- Title, ID, and described objective refer to different functionality.

### Logical errors
A testcase is syntactically valid but weak or incorrect in testing logic.
Examples:
- Expected result is not measurable or cannot be verified. However, it can be non measurable if the test case is black box testing / need subjective(ish) measurement.
- Steps cannot lead to the claimed expected result.
- No negative assertion for invalid data scenarios.
- Preconditions are insufficient to execute the scenario.

## Procedure
1. Validate file count.
If the request contains more than five testcase files, ask the user to provide at most five files in this run.

2. Parse required sections.
Check each testcase against required sections in [tc-format.md](./assets/tc-format.md):
- Title
- ID
- Mo ta
- Moi truong kiem thu
- Precodition
- Test data
- Cac buoc thuc hien
- Ket qua mong doi
- Trang thai cua testcase

3. Perform format checks.
Verify heading presence, ID pattern, test-data table shape, and numbered execution steps.

4. Perform consistency checks.
Cross-check title, ID, objective (Mo ta), preconditions, data (Test data), steps, and expected results for contradictions.

5. Perform logical checks.
Assess whether the scenario is executable, assertions are verifiable, and outcomes are measurable(ish).

## Output format
For each testcase file, use this structure:

- File: <path>
- Format errors:
  - <error item or "None">
- Consistency errors:
  - <error item or "None">
- Logical errors:
  - <error item or "None">

