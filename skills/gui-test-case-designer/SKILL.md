---
name: gui-test-case-designer
description: Analyze GUI requirements, user stories, acceptance criteria, prototypes, or existing screens and create Vietnamese GUI testing checklists organized by actual screens/user-facing pages. Use when Codex needs to derive screen-based checklist Markdown files from requirements, using Vietnamese with diacritics and the required columns ID, Screen, Category, Checklist Item, Expected Result, Actual Result, and Status.
---

# GUI Test Case Designer

## Core Workflow

Create GUI checklists in Vietnamese using a screen-first structure. Requirements are the source of truth for expected behavior, but the checklist must be organized around the screens and components a tester actually sees, not around the raw FR IDs.

Write checklist content in Vietnamese with diacritics. Keep only the required column names in English: `ID`, `Screen`, `Category`, `Checklist Item`, `Expected Result`, `Actual Result`, and `Status`.

1. Read the requirement(s), README/SRS, existing routes, components, screenshots, or prototypes.
2. Map each requirement to concrete screens, routes, panels, forms, dialogs, tables, cards, navigation areas, and user-facing states.
3. Group checklist items by screen or major screen section. Example: `/profile` -> `Hồ sơ của bạn` and `Lịch sử đơn hàng`.
4. Use the requirement to define expected behavior, but phrase every checklist item as something observable on the screen.
5. Include missing or risky requirement-to-screen gaps as checklist items or notes. Example: required `Confirm Password` field is absent on the Register screen.
6. Cover relevant GUI categories, using short English category labels if useful: `Visual`, `Functional`, `Validation`, `Usability`, `Responsive`, `Compatibility`, `Accessibility`, and `Feedback`.
7. Prioritize risk-heavy screens: login, register, profile, cart, checkout, payment, destructive actions, data submission, and permission boundaries.

## Reference

Read [references/gui-testing-seminar.md](references/gui-testing-seminar.md) when creating substantial GUI checklists. Use it for the screen-first checklist method, GUI categories, required columns, and responsive/accessibility expectations.

## Output Format

If the user asks for Markdown files, create one `.md` file per FR or per screen group, whichever is clearer for execution. If they do not ask for files, produce Markdown content in the response.

Prefer this structure inside each file:

- Title: `# Checklist GUI Testing - <FR or Screen>: <Name>`
- `## 1. Thông tin màn hình`: requirement source, route/screen, related component, goal.
- `## 2. Tiền điều kiện`: account, data, environment, navigation setup.
- `## 3+.` Screen-based checklist sections such as initial display, form interaction, table/list state, empty state, error/success feedback, responsive/accessibility.
- `## Ghi chú`: assumptions, screen gaps, known UI risks, or data setup notes.

## Required Checklist Columns

Use these column names exactly for every checklist table:

| Column | Meaning |
|---|---|
| `ID` | Unique checklist criterion ID |
| `Screen` | Screen, route, panel, dialog, table, or feature |
| `Category` | GUI testing category |
| `Checklist Item` | What to verify |
| `Expected Result` | Observable expected UI behavior |
| `Actual Result` | Actual observed UI behavior during execution; use blank or `Chưa chạy` before execution |
| `Status` | `Not Run`, `Pass`, `Fail`, or `Blocked` |

Use concise IDs by category and screen, for example:

- `REG-VAL-01`, `REG-FUN-01` for Register.
- `CHK-FUN-01`, `CHK-FDB-01` for Checkout.
- `ORD-FUN-01`, `ORD-VIS-01` for Order History.

## Quality Bar

Every expected result must be observable. Avoid vague wording such as "hoạt động đúng"; name the exact UI state, message, URL, enabled/disabled state, item count, visible text, focus position, or layout constraint.

Because the reduced checklist format only has seven columns, include necessary setup, data, or action context briefly inside `Checklist Item` or `Expected Result`.

When a requirement is technical, translate it into screen behavior:

- `JWT required` -> user without login cannot continue from the screen and sees login/error/no-permission feedback.
- `Email type=email` -> invalid email is blocked by HTML5 validation or visible form validation.
- `Backend recalculates total` -> total displayed on checkout cannot be edited by the user, and payment summary uses cart-derived total.
- `User only sees own orders` -> order history list/table for user A does not show user B's orders.

For responsive checks, include concrete viewport sizes: desktop `1440x900`, tablet `768x1024`, mobile `390x844`.

For accessibility checks, include keyboard traversal, visible focus, labels, Enter/Space behavior, and clear error messages.

When creating files in a repo, keep paths organized, for example `docs/gui-checklists/<FR-or-screen>.md`.
