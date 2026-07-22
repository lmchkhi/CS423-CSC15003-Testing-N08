---
name: gui-bug-report-writer
description: Create a Vietnamese Markdown bug report from a bug related to a specific failed GUI checklist item. Use when Codex is given a checklist item, checklist ID, expected result, actual bug behavior, evidence, or environment details and needs to produce a clear bug report .md based on the GUI_Testing seminar slide format. Keep common testing terms in English when useful, such as Bug Report, Environment, Preconditions, Steps to Reproduce, Expected Result, Actual Result, Severity, Priority, Evidence, Status, Re-test, and Regression.
---

# GUI Bug Report Writer

## Core Workflow

Create one complete bug report in Markdown for a bug tied to a specific checklist item. Write primarily in Vietnamese. Keep English technical terms only when they improve clarity or match testing vocabulary.

1. Identify the source checklist item: `Checklist ID`, screen/feature, category, checklist item, preconditions, steps, expected result, actual result, status, evidence, and automation note if provided.
2. Extract the bug observation: what failed, where it happened, how often it happens, and what evidence exists.
3. Fill missing fields with `Chưa cung cấp` only when a reasonable inference would be risky. Do not invent environment, account, device, browser, or evidence.
4. Produce a single bug report `.md` body. Do not create a checklist, test case file, automation script, or test summary unless explicitly requested.
5. Make the bug reproducible: steps must be ordered, concrete, and aligned with the checklist item.
6. Make `Expected Result` and `Actual Result` unambiguous and observable.
7. Assign `Severity` and `Priority` when possible, and briefly justify them in Vietnamese.

## Reference

Read [references/bug-report-format.md](references/bug-report-format.md) when writing bug reports. It contains the slide-derived required fields, quality rules, severity/priority guidance, and Markdown template.

## Output Rules

Use this Markdown structure unless the user asks for a different file format:

```md
# BUG_<CHECKLIST_ID>: <Title>

## Thông Tin Chung
...

## Environment
...

## Preconditions
...

## Steps to Reproduce
...

## Expected Result
...

## Actual Result
...

## Severity & Priority
...

## Evidence
...

## Notes
...
```

Title rules:

- Include the affected screen/feature and symptom.
- Prefer precise phrasing such as `Product List bị tràn ngang tại viewport 390px`.
- Avoid vague titles such as `UI lỗi` or `Chức năng không hoạt động`.

Quality bar:

- Every step must be repeatable.
- `Expected Result` and `Actual Result` must describe different, observable outcomes.
- `Environment` must include browser/device/viewport if provided.
- `Evidence` must say exactly what screenshot/video/log demonstrates, or `Chưa cung cấp`.
- If the report is based on a checklist item, preserve the original `Checklist ID`.
