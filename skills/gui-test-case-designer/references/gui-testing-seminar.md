# GUI Testing Seminar Reference

This reference distills `GUI_Testing.html` for creating screen-based GUI checklists in Vietnamese.

## GUI Testing Scope

GUI Testing checks the parts of a product users see and interact with directly. The goal is to verify that the interface displays correctly, behaves correctly, is easy to use, and gives clear feedback.

Common test objects:

- Buttons
- Input fields
- Dropdowns
- Checkbox and radio controls
- Menus
- Modals and popups
- Product cards or repeated cards
- Forms
- Error messages
- Loading states

Core categories:

- `Visual`: position, color, size, font, alignment, spacing, overlap.
- `Functional`: buttons, forms, menus, navigation, search, add/remove/update actions.
- `Validation`: valid data, invalid data, required fields, boundary data, error placement.
- `Usability`: clarity, ease of operation, prevention of user confusion.
- `Responsive`: desktop, tablet, and mobile layout behavior.
- `Compatibility`: supported browsers, devices, operating systems, font/layout consistency.
- `Accessibility`: keyboard use, focus order/indicator, labels, contrast, Enter/Space behavior.
- `Feedback`: loading, empty, error, success, disabled, and no-permission states.

## Inputs To Request Or Infer

Use these inputs when available:

- Requirement, user story, and acceptance criteria.
- Business rules and validation rules.
- Figma, prototype, design system, or existing UI.
- Supported browsers, devices, operating systems, and viewport sizes.
- Test account, test data, and test environment.

If inputs are missing, make explicit assumptions in Vietnamese and still produce useful baseline coverage.

## Checklist Design

Build checklists using a mix of these methods. Prefer a screen-first structure: map requirements to the screens, panels, dialogs, forms, tables, cards, and states a tester can observe directly.

- Requirement-based: derive expected behavior from user stories and acceptance criteria.
- Screen-based: group checks by actual route/screen/visible section instead of listing raw FR IDs.
- Design-based: compare with Figma, prototype, or design system.
- Component-based: list UI components and their behavior.
- State-based: cover loading, empty, error, success, disabled, valid, invalid, and focus states.
- Heuristic-based: include usability principles and confusion prevention.
- Risk-based: prioritize login, cart, checkout, payment, destructive actions, and data submission.
- Experience-based: include likely historical or exploratory issues.

Required checklist columns:

| Column | Purpose | Example |
|---|---|---|
| ID | Unique criterion ID | `FUN-01` |
| Screen | Screen or function | `Cart` |
| Category | GUI testing category | `Functional` |
| Checklist Item | What to check | `Remove one product from cart` |
| Expected Result | Observable expected behavior | `Only the selected product is removed` |
| Actual Result | Actual observed behavior | `Chưa chạy` |
| Status | Execution status | `Not Run` |

Checklist rows must contain enough context in `Checklist Item` and `Expected Result` to be executable without separate manual test cases.

If the user asks for files, it is acceptable to create separate Markdown checklist files by FR or screen group. Each file should still organize rows by screen and use the slide-style columns above.

Example checklist items:

| ID | Category | Checklist Item | Expected Result |
|---|---|---|---|
| `VIS-01` | Visual | Check button alignment on a product card | Buttons are aligned consistently |
| `FUN-01` | Functional | Select a product category | Products from the selected category are shown |
| `FUN-02` | Functional | Search for a product | Matching products are shown |
| `FUN-03` | Functional | Remove one product from cart | Only the selected product is removed |
| `VAL-01` | Validation | Leave Address and City blank | Field-specific errors appear below each field |
| `RES-01` | Responsive | View Products at 390px width | No horizontal overflow appears |
| `ACC-01` | Accessibility | Navigate with Tab | Focus is visible and follows a logical order |

## Executable Checklist Row Design

Each checklist item should behave like a compact executable checklist row. Include enough detail for direct execution:

- `ID`
- `Screen`
- `Category`
- `Checklist Item`
- `Expected Result`
- `Actual Result`
- `Status`

Keep steps reproducible. Prefer user-observable assertions: visible text, URL, enabled/disabled state, error placement, item count, focused element, no overflow, or successful data update.

## Execution And Reporting

Checklist execution flow:

1. Choose browser, device, and viewport.
2. Prepare preconditions and data.
3. Perform the user action.
4. Compare expected result with actual result.
5. Record `Pass`, `Fail`, `Blocked`, or `Not Run`.
6. Attach evidence when useful.
7. If failed, record the observed behavior in `Actual Result` and set `Status` to `Fail` for later defect reporting.

Test summary should mention total, pass, fail, blocked, not run, pass rate, high-risk areas, severe defects, viewport/browser risk, release readiness, and regression needs when execution data exists. Do not add a summary unless the user asks for execution reporting or provides execution results.

## Environment Coverage

Baseline responsive viewports from the seminar:

- Desktop: `1440x900`
- Tablet: `768x1024`
- Mobile: `390x844`

Responsive checks:

- No horizontal overflow.
- Menu is visible and not covered.
- Main content remains readable and usable.
- Buttons and inputs remain tappable.
- Critical content is not clipped or overlapped.

Compatibility checks:

- Chrome
- Edge
- Firefox if in scope
- Font and layout consistency
- Main user flows still work

Accessibility checks:

- Tab navigation works.
- Focus indicator is visible.
- Inputs have clear labels.
- Enter and Space activate expected controls.
- Error messages are clear and associated with the relevant field.

## Automation Guidance

Manual and automation complement each other:

- Manual testing is strong for visual issues, usability, subjective review, and flexible exploration while UI changes often.
- Automation is strong for repeatable regression checks, deterministic user flows, and stable assertions.

Good automation candidates:

- Login
- Search
- Navigation
- Add to Cart
- Remove Cart Item
- Form validation
- Checkout
- Basic horizontal overflow checks

For each automation candidate, state the stable selector or observable assertion when possible. Useful assertions include URL changes, visible text, count changes, validation messages, disabled/enabled state, screenshot/trace capture, and no horizontal overflow:

```js
const hasHorizontalOverflow = await page.evaluate(
  () => document.documentElement.scrollWidth > document.documentElement.clientWidth
);
expect(hasHorizontalOverflow).toBe(false);
```
