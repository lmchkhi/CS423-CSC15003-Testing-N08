---
name: use-case-testing
description: Design, document, execute-support, and review use case testing artifacts for functional requirements, user workflows, UI/API behavior, alternate flows, exception flows, traceability matrices, console/API test scripts, and bug reports. Use when Codex needs to convert requirements into use cases, derive test conditions, create Markdown test cases, distinguish technique-specific test IDs such as UCT, record test runs, or write bug reports found by use case test cases.
---

# Use Case Testing

## Core Workflow
1. Read the requirement source first, then inspect related API specs, UI code, backend behavior, and existing test documents.
2. Identify the use case: actor, trigger, preconditions, main success scenario, alternate flows, exception flows, and postconditions.
3. Derive test conditions from the flows. Cover the main path, authentication/authorization gates, data display, calculations, server-side validation, state cleanup, and error handling.
4. Create a test design analysis file under `tests/test-summary/` using Vietnamese when the surrounding project uses Vietnamese.
5. Create one Markdown file per test case under `tests/test-cases/<module>/`.
6. Add or update `tests/traceability-matrix.md` so each requirement maps to each test case.
7. When the user reports execution results, write bug reports for failed cases under `tests/bug-reports/<module>/` using the repository issue template if one exists.

## Naming Rules
- Use stable IDs: `TC-[MODULE]-UCT-[NUMBER]`.
- Use `UCT` to distinguish Use Case Testing from other techniques such as STT, EP, BVA, or decision-table testing.
- Keep module names short and consistent with existing folders, for example `checkout`, `login`, `order-state`.
- Use three-digit numbering: `001`, `002`, `003`.
- Keep file names identical to the test case ID: `TC-CHECKOUT-UCT-001.md`.

## Test Design Analysis Contents
Include these sections:
- `Requirement ID`
- `Module / Test type / Technique`
- `Mục tiêu kiểm thử`
- `Phạm vi yêu cầu`
- `Use case chính`
- `Luồng thành công cơ bản`
- `Luồng thay thế và ngoại lệ`
- `Điều kiện kiểm thử được suy ra`
- `Test data dùng chung`
- `Traceability`
- `Ghi chú thiết kế`

Use tables for actors, flow mapping, test data, and traceability. Make the writing natural and fluent; do not sound like a raw translation.

## Test Case Contents
Each test case file must follow this structure:
- Title: `# TC-[MODULE]-UCT-[NUMBER]: <Tên test case>`
- `Requirement ID`
- `Module / Test type / Technique`
- `Preconditions`
- `Test data`
- `Test steps`
- `Expected result`
- `Status / Related bugs`

Write expected results as observable pass/fail criteria. If a requirement says the backend must enforce a rule, include an API-level test case rather than only a UI test.

## Execution Support
When the user asks for scripts to execute test cases:
- Prefer browser DevTools snippets for UI/API exercises in web apps.
- Make snippets self-contained; define helpers such as `wait`, `clickByText`, and `API` inside the snippet unless the user explicitly asks for shared helpers.
- Avoid full page reloads in snippets when working with SPA state; click app navigation links instead.
- Print `console.table` with `expected` and `pass` fields.
- For API tests, use `fetch` and inspect status code, response body, and follow-up reads such as order history.

## Bug Reports
When a test fails, create one bug report per distinct defect. Use the repo template when present, otherwise use:
- `Found by Test Case`
- `Requirement liên quan`
- `Severity / Priority`
- `Environment`
- `Steps to reproduce`
- `Expected result`
- `Actual result`
- `Evidence`
- `Labels đề xuất`

Use the actual console output, HTTP status, order ID, persisted value, screenshot notes, or reproduction evidence provided by the user. Do not merge separate defects just because they belong to the same requirement.

## References
- Read `references/templates.md` when creating new Markdown artifacts.
