---
name: generate-gui-checklist
description: Generate a Vietnamese, screen-first GUI testing checklist as a validated XLSX workbook by default from a user-provided list of application screens, with an optional primary screen and supporting screens. Use for HW03 GUI checklist design, screen-based interface reviews, or requests requiring more than 40 meaningful checks covering IA-01 through IA-04.
---

# Generate GUI Checklist

Create a screen-specific GUI checklist that satisfies the HW03 design requirements. Write the skill's deliverable in Vietnamese even when the screen names or input are in another language.

## Required reference

Read [references/ia-coverage-guide.md](references/ia-coverage-guide.md) completely before generating a checklist. Use it as the authoritative coverage model and output contract.

## Workflow

1. Parse the user's screen list.
   - Preserve the screen names given by the user.
   - Preserve an explicitly identified primary screen.
   - If no primary screen is identified, treat the first listed screen as the provisional primary screen and disclose this assumption.
   - Treat every remaining screen as a supporting screen.
   - Ask for a screen list only when no screen can be inferred from the request or supplied artifacts.
2. Inspect available requirements, screenshots, source files, routes, or design artifacts when the user supplies them or they are clearly available in the workspace.
   - Prefer project-specific requirements over generic GUI heuristics.
   - Cite requirement IDs such as `FR-21`, `FR-22`, `FR-23`, and `FR-24` in the expected result when they directly apply.
   - Do not invent controls, states, routes, or business rules that are not shown or specified.
   - Label an item as a heuristic in its expected result when the behavior is useful to test but not required by the available specification.
   - Do not silently turn one plausible design choice into a requirement. For example, do not require case normalization, automatic trimming, state persistence, or a particular redirect unless evidence supports it.
3. Build a compact screen profile for each selected screen:
   - content and layout;
   - input controls and validation;
   - incoming, outgoing, and contextual navigation;
   - loading, empty, success, error, confirmation, and permission states;
   - platform-specific behavior when Web, Admin, or Mobile is known.
4. Design the checklist using the coverage rules in the reference.
   - Produce at least 48 items by default and never fewer than 41.
   - Cover every aspect from `IA-01` through `IA-04`.
   - Give the primary screen deeper screen-specific coverage than any single supporting screen.
   - Use supporting screens to cover interface behavior that is not meaningful on the primary screen.
   - Prefer fewer strong, observable checks over padding; increase the count only when additional non-duplicate checks are justified.
   - Organize rows by screen, not by IA: primary screen first, supporting screens in the user's order, and `Nhiều màn hình` last.
   - Keep every screen's rows contiguous. Within each screen group, order rows by `IA-01`, `IA-02`, `IA-03`, and `IA-04`, omitting IA values that do not apply to that screen.
   - Treat IA as a coverage label and secondary sort key; do not create IA-first row blocks or one worksheet per IA.
5. Run the quality gate before returning the result.
   - Confirm the total is greater than 40.
   - Confirm all four IA IDs occur and meet their minimum coverage.
   - Confirm every item names its target screen or `Nhiều màn hình`.
   - Confirm every screen appears in one contiguous block and the screen blocks follow the required order.
   - Confirm each item tests one main behavior and has an observable expected result.
   - Remove duplicates and vague checks such as “giao diện đẹp” or “hoạt động đúng”.
   - Confirm the output is in Vietnamese, except for screen names, identifiers, code literals, and standard technical terms.
6. Return the checklist using the required Vietnamese structure below.

## Output structure

Create an XLSX workbook with these worksheets:

1. `Phạm vi`
   - Primary and supporting screens.
   - Platform and evidence inspected.
   - Assumptions, ambiguities, and coverage risks.

2. `Tóm tắt`
   - Item counts by IA and screen.
   - Total designed, executed, Passed, Failed, and Chưa thực hiện.
   - Explicit confirmation that the designed total is greater than 40.
   - Quality-gate results.

3. `Checklist GUI`
   - Use these columns in this exact order:

| ID  | IA  | Màn hình | Vai trò | Hạng mục kiểm tra | Kết quả mong đợi | Trạng thái | Ghi chú | Bằng chứng |
| --- | --- | -------- | ------- | ----------------- | ---------------- | ---------- | ------- | ---------- |

- Freeze the header row and enable filters.
- Apply readable column widths and wrapped text.
- Keep one contiguous block per screen in this order: primary screen, supporting screens in input order, then `Nhiều màn hình`.
- Within a screen block, sort by IA from `IA-01` through `IA-04`; do not group the full worksheet by IA.
- Add a subtle visual separator at the start of each screen block when it matches the workbook style.
- Use stable IDs `GUI-001`, `GUI-002`, and so on.
- Set `Trạng thái` to `Chưa thực hiện` during checklist design.
- Leave `Ghi chú` and `Bằng chứng` as `—` during checklist design.

4. `Phản biện thủ công`
   - Include screen-specific prompts for independent human review.
   - Include a blank table for student-added items and why the AI missed them.
   - Do not present AI suggestions as student contributions.

## Execution boundary

Generate a design-ready checklist by default. Do not claim that an item Passed or Failed without execution evidence.

When the user separately asks to execute the checklist:

- inspect the actual SUT or supplied evidence;
- use only `Passed` or `Failed` for executed items;
- explain every `Failed` item in `Ghi chú`;
- attach or link screenshots only for `Failed` items;
- preserve `Chưa thực hiện` for items that could not be observed;
- never fabricate screenshots, states, participants, devices, or test results.

## File output

Create an XLSX workbook by default, even when the user does not explicitly request a file.

- Use the path requested by the user when provided.
- Otherwise save it as `submissions/gui-checklist-<primary-screen-slug>.xlsx`.
- Use the Spreadsheets skill to create and verify the workbook.
- Verify worksheet names, formulas, filters, frozen headers, text wrapping, row counts, IA counts, screen-block order and contiguity, and status values before delivery.
- Return a concise chat summary with a link to the generated XLSX file.
- Produce Markdown or CSV only when the user explicitly requests that format.
- Preserve the same checklist IDs and columns across all formats.
- Never overwrite an existing workbook unless the user requested an update; use a versioned filename when necessary.
