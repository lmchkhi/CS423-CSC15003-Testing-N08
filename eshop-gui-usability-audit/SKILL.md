---
name: eshop-gui-usability-audit
description: Support HW03 black-box GUI and usability testing of the EShop SUT, especially Cart, Checkout, Coupon, Checkout Success, and Admin Coupon Management. Use when asked about HW03, EShop GUI testing, usability testing, GUI checklist design or execution, defect/bug reports, SUS or UEQ-S, AI Critique, AI Audit Report, or the assigned cart/checkout/coupon testing scope.
---

# EShop GUI & Usability Audit

Use this skill for evidence-based HW03 work. Keep the work concise, reproducible, and ready to paste into course reports.

## Non-negotiable black-box boundary

- Treat every GUI and usability conclusion as black-box testing.
- Inspect `src/eshop-sut` only to learn how to run the SUT, discover routes/screens, and locate report or issue templates.
- Never cite source code, implementation details, DOM inspection, API responses, or inferred logic as defect evidence.
- Base findings only on visible UI behavior, user interactions, screenshots/video, participant notes, checklist results, and session evidence.
- State an observed fact separately from a hypothesis. Mark unconfirmed hypotheses as such; do not report them as defects.

## Workflow

1. Establish the test context: SUT URL/build, browser/OS, viewport, account/role, test data, date, and evidence location. Run the app using project instructions only.
2. Map the observable scope: Cart, Checkout, coupon controls, Checkout Success, and Admin Coupon Management. Do not expand beyond it unless asked.
3. Draft and execute a GUI checklist. Cover IA-01 through IA-04 and produce more than 40 atomic, observable items. Use `references/templates.md`.
4. Label which checklist items are AI-generated and which are human-reviewed additions. For every human addition, explain the concrete context or risk that likely caused an AI-only draft to miss it.
5. Record `Passed`, `Failed`, `Blocked`, or `Not applicable` plus concise observed evidence for every executed item. Do not mark unexecuted items as passed.
6. For each reproducible failure, inspect `.github/ISSUE_TEMPLATE` before drafting any GitHub Issue. Use the current template's headings and required frontmatter; never assume the template's contents from memory.
7. Plan and run usability sessions with a goal-oriented scenario, not click-by-click participant instructions. Capture observations, SUS or UEQ-S results, and severity-ranked findings.
8. Prepare AI Critique and AI Audit material from the actual interaction and evidence. Suggest a focused commit message after each major deliverable.

## GUI checklist rules

- Use atomic wording: one UI condition or action per row, a defined expected visible outcome, and a concrete evidence field.
- Include at least 41 applicable items across IA-01 General UI standards, IA-02 Forms, IA-03 Navigation, and IA-04 Feedback/state. Distribute coverage across every assigned screen.
- Use this minimum planning allocation before tailoring: IA-01 12 items, IA-02 12, IA-03 10, and IA-04 12 (46 total). Replace inapplicable items with equally observable items rather than reducing the total.
- Check responsive/zoom behavior, keyboard-only use, focus visibility/order, labels and error association, required/invalid states, destructive-action confirmation, loading/empty/error/success states, duplicate submissions, totals/discount visibility, coupon edge cases, return navigation, and admin state changes when observable.
- Test valid and invalid coupon attempts, cart update/remove behavior, and payment confirmation in the end-to-end flow.
- Ask for missing execution evidence rather than inventing results. Screenshots must identify the relevant state without exposing sensitive data.

## Usability testing rules

- Define objectives before sessions, recruit/record participant context ethically, and use the goal: complete a purchase while managing cart contents and trying a coupon. Do not prescribe clicks, menu names, or exact field values unless needed for safe test data.
- Encourage think-aloud; observe without coaching. Record success, time, errors, hesitation, quotes, workarounds, and facilitator interventions.
- Use SUS consistently (same 10-item, 1–5 scale) or use UEQ-S consistently (same selected version and scoring method). Do not combine scales into one score.
- Rank findings by observed impact, frequency, persistence, and task criticality. Link each finding to session/checklist evidence.

## Required response artifact

For templates and field definitions, read `references/templates.md` as needed. Include only the artifact requested, plus a commit-message suggestion when a major testing artifact is produced.

### AI Audit Entry

Whenever answering a question related to HW03, EShop GUI Testing, Usability Testing, checklist design, bug reports, SUS/UEQ-S, AI Critique, or AI Audit Report, append this exact short section to the end of the response:

AI Audit Entry:
- Tool: [exact model/tool if visible; otherwise `Codex AI assistant / model not visible`]
- Date: [current system date and time, including timezone if available]
- User Prompt: [short summary or quote of the latest user prompt]
- AI Action: [concise summary of this response]
