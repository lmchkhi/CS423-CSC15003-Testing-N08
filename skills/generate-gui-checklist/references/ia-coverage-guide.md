# IA Coverage Guide for HW03

Use this guide to turn a list of screens into a thorough, non-repetitive GUI checklist. The deliverable must be in Vietnamese.

## Contents

1. Assignment constraints
2. Input and screen roles
3. IA coverage model
4. Item construction rules
5. Allocation and balance
6. Edge cases
7. Vietnamese output vocabulary
8. Quality gate

## 1. Assignment constraints

- Design more than 40 checklist items.
- Cover all four interface aspects: `IA-01`, `IA-02`, `IA-03`, and `IA-04`.
- Use one or more screens. Several screens are preferred because a single screen often produces shallow or repetitive coverage.
- Execute the checklist separately and mark observed items `Passed` or `Failed`.
- Explain every failed item in Notes and capture screenshots for failed items only.
- Critically review the AI baseline and add genuinely human-identified items. The agent must not label its own suggestions as student-added work or invent why the AI missed them.

The EShop SRS maps the four aspects to:

- `IA-01` - General UI standards.
- `IA-02` - Forms.
- `IA-03` - Navigation.
- `IA-04` - Feedback/state.

Use more specific functional requirements when they impose visible UI behavior on a selected screen.

## 2. Input and screen roles

Accept input such as:

```text
Primary: Checkout
Supporting: Cart, Login, Product Detail
Platform: Web
```

Also accept a plain list. If the primary screen is not marked, use the first screen as a provisional primary and disclose the assumption.

Allocate the deepest coverage to the primary screen. Supporting screens should:

- complete IA coverage that is not meaningful on the primary screen;
- test entry and exit paths around the primary screen;
- verify cross-screen consistency;
- avoid repeating the same generic visual check for every screen.

### Screen-first organization

Use screens as the checklist's top-level grouping:

1. primary screen;
2. supporting screens in the order supplied by the user;
3. `Nhiều màn hình` for genuine cross-screen assertions.

Keep all rows for one screen contiguous. Within each screen block, use IA order `IA-01`, `IA-02`, `IA-03`, then `IA-04`; omit an IA when it is not meaningful for that screen. IA identifies coverage and provides a secondary sort key—it must not divide the complete checklist into IA-first blocks or separate IA worksheets.

After ordering the final rows, assign sequential IDs `GUI-001`, `GUI-002`, and so on in displayed row order. If updating an already executed checklist, preserve existing IDs unless the user explicitly asks to renumber them so evidence and results remain traceable.

## 3. IA coverage model

Assign exactly one primary IA to each item according to its main test intent. Mention related requirements in the expected result instead of duplicating the item under multiple IAs.

### IA-01 - General UI standards

Consider only behaviors relevant to the selected screens:

- Vietnamese language consistency and exact domain terminology;
- one descriptive page-level `h1`;
- visual hierarchy, alignment, spacing, typography, and non-overlap;
- positive action colors versus destructive/cancel colors;
- currency symbol and thousands separators;
- product image aspect ratio, quality, and descriptive alternative text;
- responsive layout, orientation, zoom, and text reflow;
- readable contrast and information not conveyed by color alone;
- visible focus, logical top-to-bottom and left-to-right tab order;
- touch target size and spacing on mobile;
- consistent labels and components across screens;
- safe display of user-controlled text;
- long text, Vietnamese diacritics, and localization resilience.

### IA-02 - Forms

Use actual forms and input controls present on the selected screens:

- visible and associated labels;
- `*` on every required field;
- correct input type, such as `email`, `password`, number, date, or file;
- password masking and intentional reveal behavior;
- valid, invalid, boundary, empty, and whitespace-only input;
- field-specific constraints from the SRS;
- error text placed above the submit action where required;
- error association, clarity, persistence, and correction;
- preservation of valid values after a validation failure;
- sensible defaults and non-editable calculated values;
- prevention of duplicate submission;
- multi-step indicator and current-step clarity;
- keyboard behavior, input method, autocomplete, and submission;
- CSV file restrictions when an import screen is selected.

Do not invent a form on a screen with no input. Instead, cover IA-02 on a supporting screen. Search, quantity, coupon, filter, and confirmation controls count only when they are actually present.

### IA-03 - Navigation

Consider:

- active navbar item is highlighted;
- cart badge reflects product quantity;
- exact navigation labels, including `Đăng xuất`;
- required breadcrumbs on Cart, Checkout, and Product Detail;
- breadcrumb order, labels, and destinations;
- all expected entry and exit paths;
- back, cancel, continue-shopping, and return-to-login actions;
- preservation of state during valid navigation;
- browser Back/Forward behavior on Web;
- deep-link, refresh, authentication redirect, and unauthorized route behavior;
- focus placement after a route change;
- no dead ends, broken links, or unexpected new tabs;
- consistent navigation across primary and supporting screens;
- mobile navigation behavior when applicable.

### IA-04 - Feedback/state

Cover observable state transitions:

- loading indicators and prevention of premature actions;
- friendly empty state with message and illustration/icon;
- success feedback such as toast, badge, inline confirmation, or redirect;
- validation and server error feedback;
- confirmation dialog before a destructive action;
- disabled, enabled, pressed, selected, and focus states;
- duplicate-click and in-progress behavior;
- data refresh after create, update, delete, add-to-cart, checkout, or status change;
- cart, authentication, and form state persistence where specified;
- timeout, offline, retry, partial failure, and unexpected server response;
- permission and session-expiry feedback;
- screen reader announcement or equivalent perceivable feedback for dynamic changes;
- status label translation and color distinction where applicable.

## 4. Item construction rules

Write each checklist item as one executable assertion.

Good:

```text
Khi người dùng để trống trường Email và gửi form Đăng nhập, thông báo bắt buộc xuất hiện phía trên nút “Đăng nhập”.
```

Weak:

```text
Kiểm tra form đăng nhập hoạt động đúng và hiển thị lỗi phù hợp.
```

For every item:

- name a screen or `Nhiều màn hình`;
- specify a trigger or condition when the result depends on interaction;
- state one main behavior;
- state an observable expected result;
- include concrete labels, formats, values, or requirement IDs when known;
- avoid subjective words without measurable criteria;
- avoid combining desktop, mobile, happy-path, and error-path checks in one row;
- avoid duplicate checks that differ only by screen name.

Use a cross-screen item when the purpose is consistency. Use separate items when screens have genuinely different controls, rules, or states.

Distinguish specification-backed expectations from heuristics:

- Cite the applicable FR ID for a specification-backed expectation.
- Prefix an unspecified but useful expectation with `Heuristic:` in the expected-result cell.
- When several designs could be valid, test for a clear and consistent response instead of mandating one design.
- Do not require undocumented transformations such as trimming or uppercasing a coupon. Test the value as entered and expect either documented acceptance or a clear rejection.
- Do not assume redirects, persistence, focus movement, retry behavior, or control labels beyond the available evidence.

## 5. Allocation and balance

Use 48 items as the default target:

| IA    | Default | Hard minimum |
| ----- | ------: | -----------: |
| IA-01 |      12 |           10 |
| IA-02 |      12 |            8 |
| IA-03 |      12 |            8 |
| IA-04 |      12 |           10 |
| Total |      48 |           41 |

The final total must exceed 40. The hard minimums prevent token coverage while allowing adaptation to screen types.

Additional allocation rules:

- Give the primary screen more screen-specific rows than any single supporting screen.
- Include at least two meaningful rows for every supporting screen.
- Include cross-screen rows only when they test a real relationship or consistency rule.
- Do not meet a quota with near-duplicates.
- Increase beyond 48 when many screens contain distinct forms, navigation paths, or states.
- Do not scatter one screen across multiple IA sections; keep its allocated rows together.

Before finalizing, calculate counts directly from the generated rows. Do not estimate them.

## 6. Edge cases

### Only one screen

Generate a checklist only when all four aspects can be meaningfully exercised. State that single-screen scope risks shallow coverage. If an IA is not present, identify the gap and recommend a concrete supporting screen rather than inventing controls.

### No form-oriented screen

Do not force 8 artificial IA-02 rows. State that full HW03 coverage cannot be demonstrated from the selected scope and recommend adding Login, Register, Checkout, Profile, Product Detail quantity, Search, or another real form screen.

### No primary screen

Use the first listed screen provisionally and make the assumption visible. Do not claim that the student formally selected it.

### Requirements or UI artifacts are available

Inspect them before generating generic items. Prefer visible, project-specific assertions. Record which evidence was used.

### Requirements conflict with the implementation

Use the requirement as the expected result. Do not mark a failure until the implementation is executed or inspected.

### Design-only request

Use `Chưa thực hiện`, `—`, and `—` for Status, Notes, and Evidence. Never infer execution results from requirements alone.

## 7. Vietnamese output vocabulary

Use these values consistently:

| Concept           | Output            |
| ----------------- | ----------------- |
| Primary screen    | Màn hình chính    |
| Supporting screen | Màn hình hỗ trợ   |
| Cross-screen      | Nhiều màn hình    |
| Not executed      | Chưa thực hiện    |
| Passed            | Passed            |
| Failed            | Failed            |
| Notes             | Ghi chú           |
| Evidence          | Bằng chứng        |
| Expected result   | Kết quả mong đợi  |
| Coverage risk     | Rủi ro độ bao phủ |

Keep IA IDs, FR IDs, HTML attributes, routes, filenames, and standard technical terms unchanged.

## 8. Quality gate

Reject or revise the draft unless every answer is yes:

1. Is the row count greater than 40?
2. Are all four IA IDs present?
3. Does every IA meet its hard minimum?
4. Does every selected supporting screen have at least two meaningful rows?
5. Does the primary screen have more screen-specific rows than any one supporting screen?
6. Are screen blocks contiguous and ordered as primary, supporting screens in input order, then `Nhiều màn hình`?
7. Within each screen block, are rows ordered from `IA-01` through `IA-04`?
8. Does every row name a screen and one primary IA?
9. Is every expected result observable?
10. Are project-specific requirements used where available?
11. Are undocumented expectations labeled as heuristics rather than presented as requirements?
12. Are duplicate and compound rows removed?
13. Are design-only statuses still `Chưa thực hiện`?
14. Is the deliverable in Vietnamese?
15. Are human-review suggestions clearly separated from AI-generated checklist rows?
