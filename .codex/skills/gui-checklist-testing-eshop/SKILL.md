---
name: gui-checklist-testing-eshop
description: Create blackbox GUI testing checklists for the EShop project from GUI_Testing.html, api_specification.md, and SystemRequirementsSpecification.md. Use when asked to generate a Markdown checklist for EShop screens/features, manual GUI testing, UI/UX validation, responsive/compatibility/accessibility/feedback checks, or checklist-based blackbox testing without reading implementation source code.
---

# GUI Checklist Testing EShop

## Overview

Create checklist-based blackbox GUI tests for the EShop system. Use only externally observable behavior from requirements, API specifications, GUI testing guidance, and user-provided UI observations.

## Mandatory Inputs

Read these files from the project root before generating a checklist:

- `GUI_Testing.html`
- `api_specification.md`
- `SystemRequirementsSpecification.md`

If a user provides a specific screen, feature, role, platform, browser, viewport, or execution evidence, use that as additional blackbox context.

## Blackbox Boundary

Do not read or inspect implementation source code while using this skill.

Forbidden paths include:

- `backend/`
- `frontend-admin/`
- `frontend-mobile/`
- `frontend-web/`

Do not use component names, routes, selectors, database details, or implementation behavior discovered from those directories. Derive screens and expected behavior from the root documentation and visible UI behavior only.

## Checklist Format

Always output this Markdown structure:

```markdown
# Checklist

|ID|Screen|Category|Expected result|Actual result|Status|
|--|------|--------|---------------|-------------|------|
```

Do not add extra columns. If no execution result is provided, leave `Actual result` empty and set `Status` to `Not Run`. If execution evidence is provided, use `Pass`, `Fail`, or `Blocked`.

Use concise, atomic rows. Each expected result must be independently checkable from the UI. Because there is no separate "Checklist Item" column, write `Expected result` as a self-contained condition, for example: "When the user submits an empty required email field, an error message appears above the submit button."

## Categories

Use exactly one of these category values per row:

- `Visual`
- `Functional`
- `Validation`
- `Usability`
- `Responsive`
- `Compatibility`
- `Accessibility`
- `Feedback`

Use category-oriented IDs:

- `VIS-001` for Visual
- `FUN-001` for Functional
- `VAL-001` for Validation
- `USA-001` for Usability
- `RES-001` for Responsive
- `COM-001` for Compatibility
- `ACC-001` for Accessibility
- `FDB-001` for Feedback

Keep IDs unique in the checklist. Continue numbering within each category.

## Workflow

1. Identify the requested scope: screen, feature, role, platform, or "all EShop".
2. Read the mandatory root documents.
3. Use `references/checklist-rules.md` for coverage guidance and screen mapping.
4. Extract expected behavior from the requirements first, then use API specification only to clarify available user-visible operations and data.
5. Generate rows across the 8 categories when applicable. For a narrow feature, include only categories that produce meaningful, observable checks.
6. Prefer risk-heavy flows: authentication, cart, checkout, coupon, order state, admin CRUD/import, mobile checkout/cart/password reset.
7. Keep expected results specific: mention labels, validation rules, states, role restrictions, money formatting, Vietnamese copy, responsive behavior, and feedback states when relevant.
8. Do not claim actual results unless the user provides test execution observations.

## Output Quality Rules

- Cover normal, invalid, empty, loading, error, success, and permission states where relevant.
- Include role and authentication expectations for protected screens.
- Include responsive checks for desktop, tablet, and mobile viewports when the screen is user-facing.
- Include compatibility checks for supported browsers/devices mentioned by the user or the GUI testing document.
- Include accessibility checks for keyboard navigation, focus order, labels, alt text, and contrast when applicable.
- Avoid backend-only security assertions unless they produce a visible UI expectation.
- Use Vietnamese screen names and expected results unless the user asks otherwise.
