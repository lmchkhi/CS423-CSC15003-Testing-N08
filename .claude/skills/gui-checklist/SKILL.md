---
name: gui-checklist
description: Run HW03 Task 1 end to end — design a 40+ item GUI checklist covering IA01 (general UI), IA02 (forms), IA03 (navigation), IA04 (feedback/state) on chosen EShop screens, critique the AI's first pass and add human-found gaps with reasoning, execute the checklist against the running SUT, and file bugs for failures. Use when the student is starting or continuing the GUI checklist deliverable for HW03.
---

# GUI Checklist (HW03 Task 1)

Guides the AI through the checklist technique step by step, the way it's
taught — not a single "generate a GUI checklist" prompt. Output lands in
`checklist/gui-checklist.md` (the working table) which the student exports to
`.xlsx` before submission (§14 requires an Excel file).

## Phase A — Scope

1. Ask the student which screen(s) they're covering if not already recorded.
   One screen is allowed but won't realistically reach 40 non-repetitive
   items (per §5) — recommend 3–5 screens across pools, e.g. Home + Product
   Detail + Cart + Checkout, or an Admin screen, or a Mobile screen.
2. Check `checklist/gui-checklist.md`'s header (or the student directly) for
   which screens teammates already claimed — §5 forbids duplicating a
   teammate's primary screen within the group.
3. Record the chosen screens and why, in `checklist/gui-checklist.md`.
4. Commit:
   ```bash
   git add checklist/gui-checklist.md
   git commit -m "docs(checklist): select scope — <screens>"
   ```

## Phase B — AI-generated first pass, one IA aspect at a time

Do **not** ask for all 40+ items in one generic prompt. Run one focused prompt
per (IA aspect × screen) combination, e.g. "List IA02 (forms) checklist items
for the Checkout screen's coupon + payment form, covering validation,
labeling, error messaging, and required-field indication." See
`references/ia-seed-categories.md` for the sub-topics to steer each prompt
toward so the AI has something concrete to check instead of free-associating.

For each prompt run:
1. Send it, capture the output.
2. Log it immediately with the `ai-audit-log` skill (tool, prompt, output,
   verdict, reasoning) — don't defer logging to the end.
3. Append the surviving items to `checklist/gui-checklist.md` using this
   schema:

   | ID | IA | Screen | Item | Source | Result | Notes | Screenshot | Bug ID |
   |---|---|---|---|---|---|---|---|---|
   | GUI-001 | IA02 | Checkout | Coupon field shows inline error for an invalid code before submit | AI | Not Run | | | |

   `Source` is `AI` or `Human` — every item must be traceable.

## Phase C — Critical human review (mandatory, not optional)

HW03 explicitly requires: "Critically review the AI-generated items and add
to your checklist any items the AI missed. For each item you add, explain why
the AI missed it." This is graded, so do it deliberately:

1. After each AI batch, actively look for gaps using
   `references/ia-seed-categories.md` as a checklist-of-checklists — the spec
   calls out accessibility, RTL layout, and dark mode as *examples* of things
   AI commonly skips, not the full list. Also check: keyboard-only navigation,
   focus order, touch-target size on mobile, loading/skeleton states, offline
   /slow-network feedback, empty-state design, destructive-action
   confirmation, session-timeout messaging, and Vietnamese-specific concerns
   (currency formatting ₫, date format, diacritics rendering, VN phone/ID
   validation).
2. For every item you (the human) add, write a one-line reason in a
   `ai-gap-analysis/gui-checklist-gaps.md` entry — mirror the existing
   `ai-gap-analysis/FR-01-register.md` style — attributing the miss to one of:
   prompt scope (you didn't ask), model limitation (it doesn't know this
   SUT's specifics), or interface-specific trait (something unique to EShop's
   design). Do not write generic filler reasons; tie each to the actual
   prompt that was sent.
3. Mark those rows `Source = Human` in the checklist table.
4. Commit:
   ```bash
   git add checklist/gui-checklist.md ai-gap-analysis/gui-checklist-gaps.md
   git commit -m "docs(checklist): design + gap analysis for <IA aspect/screen>"
   ```

## Phase D — Execution against the running SUT

1. Confirm the SUT is running locally (per `eshop-sut` repo instructions) and
   record the build/commit hash and URL in the checklist header.
2. **If the Claude for Chrome extension is connected**, drive the browser
   directly instead of waiting for the student to narrate each check:
   - Navigate to the target screen yourself, perform the exact interaction
     each row describes (click, type, resize, toggle), and read the actual
     rendered state back from the page — don't infer Pass/Fail from the HTML
     alone if the check is visual (spacing, alignment, contrast).
   - Go through every row in order. For each: perform the check, set
     `Result` to `Passed` or `Failed` based on what you observed.
   - For **Failed** rows only: capture a screenshot through the extension,
     save it under `checklist/screenshots/GUI-<id>.png`, and link it in the
     `Screenshot` column. Fill `Notes` with the concrete reason (what you saw
     vs. expected).
   - Narrate what you're doing and finding as you go (one line per row is
     enough) so the student watching can catch a misjudgment in real time —
     this is still the student's checklist, and a wrong Pass/Fail call is on
     them if unreviewed. Pause and ask the student if a check is genuinely
     ambiguous (e.g. a subjective "does this look right" call).
   - If the extension isn't connected or a check needs something it can't do
     (multi-window, OS-level dialogs, devtools inspection), fall back to
     step 3.
3. **Without browser automation**: go through every row in order. For each,
   ask the student to perform the check and describe what they saw; set
   `Result` to `Passed` or `Failed` from their description. For **Failed**
   rows only, have the student save a screenshot under
   `checklist/screenshots/GUI-<id>.png` and link it in the `Screenshot`
   column, with `Notes` describing the concrete reason it failed.
4. For any Failed row, file it with the `bug-report` skill and record the
   returned `BUG-ID` in the `Bug ID` column.
5. For **Passed** rows, leave `Screenshot` empty — §6 says screenshots are for
   failed items only; don't pad the report with pass screenshots.
6. Commit after the execution pass:
   ```bash
   git add checklist/gui-checklist.md checklist/screenshots/
   git commit -m "test(checklist): execute <IA aspect/screen> items against SUT"
   ```
   (Bug reports get their own commit — see the `bug-report` skill.)

## Phase E — Roll up into the main report

Once execution is complete, update `reports/main-report.md`'s Task 1 section
with: screens covered, total items (must exceed 40), pass/fail counts per IA
aspect, and links to filed bugs. Keep the full item-by-item table in
`checklist/gui-checklist.md` / the exported `.xlsx` — the main report should
summarize, not duplicate, the whole table. Refresh `git-log.txt` too:
```bash
git log --pretty=format:'%h %ad %s' --date=short > git-log.txt
git add git-log.txt reports/main-report.md
git commit -m "docs: roll up GUI checklist into main report"
```

## Guardrails

- Never mark an item `Passed` without actually exercising it on the running
  SUT — this skill supports execution, it doesn't simulate it. This applies
  whether the click happened via Claude for Chrome or the student's own hand;
  never mark a row from guessing what "probably" happens.
- Keep IA coverage balanced; a 40-item checklist that's 35 IA01 items and one
  each of IA02–IA04 fails the "cover all four" requirement even if the count
  clears 40.
- If the AI batch already included a good item, don't re-derive it as a fake
  "human gap" just to pad the gap-analysis section — that misrepresents the
  review and is exactly the kind of raw-AI-output-without-review the
  assignment forbids.
- Commit each phase separately (§12) — never squash scope + generation +
  review + execution into one commit, and never amend/rebase past commits to
  "clean up" the history.
