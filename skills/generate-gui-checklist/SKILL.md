---
name: generate-gui-checklist
description: Generate a Vietnamese GUI testing checklist from a user-provided list of application screens, with an optional primary screen and any number of supporting screens. Use for HW03 GUI checklist design, screen-based interface reviews, or requests that require more than 40 meaningful and executable checks covering IA-01 General UI standards, IA-02 Forms, IA-03 Navigation, and IA-04 Feedback/state.
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
5. Run the quality gate before returning the result.
   - Confirm the total is greater than 40.
   - Confirm all four IA IDs occur and meet their minimum coverage.
   - Confirm every item names its target screen or `Nhiều màn hình`.
   - Confirm each item tests one main behavior and has an observable expected result.
   - Remove duplicates and vague checks such as “giao diện đẹp” or “hoạt động đúng”.
   - Confirm the output is in Vietnamese, except for screen names, identifiers, code literals, and standard technical terms.
6. Return the checklist using the required Vietnamese structure below.

## Output structure

Return these sections in order:

1. `Phạm vi và giả định`
   - List the primary and supporting screens.
   - State the platform and evidence inspected, if known.
   - State any provisional assumptions or coverage risks.
2. `Tóm tắt độ bao phủ`
   - Show item counts by IA and by screen.
   - Show the total and explicitly confirm whether it is greater than 40.
3. `Checklist GUI`
   - Use a Markdown table with these columns:

| ID | IA | Màn hình | Vai trò | Hạng mục kiểm tra | Kết quả mong đợi | Trạng thái | Ghi chú | Bằng chứng |
|---|---|---|---|---|---|---|---|---|

   - Use stable IDs `GUI-001`, `GUI-002`, and so on.
   - Use `Chính`, `Hỗ trợ`, or `Nhiều màn hình` for `Vai trò`.
   - Set `Trạng thái` to `Chưa thực hiện` during checklist design.
   - Leave `Ghi chú` and `Bằng chứng` as `—` during checklist design.
4. `Kiểm tra độ đầy đủ`
   - Report the quality-gate result, any inapplicable states, and any unresolved requirement ambiguity.
5. `Gợi ý phản biện thủ công`
   - Provide screen-specific areas the student should independently inspect, such as accessibility, keyboard-only use, RTL resilience, dark mode, zoom, localization, and recovery from unusual states.
   - Present these as prompts for human review, not as completed student contributions.
   - Include a blank template for the student to record an added item and explain why the AI missed it.

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

Return Markdown in chat unless the user requests a file. When a file is requested, use the requested path and format. Preserve the same IDs and columns when producing CSV or XLSX so later execution and reporting remain traceable.
