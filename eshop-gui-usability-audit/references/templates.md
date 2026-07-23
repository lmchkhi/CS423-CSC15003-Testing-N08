# HW03 templates

Copy and tailor only the sections needed. Preserve the black-box evidence rule.

## GUI checklist

| ID      | Screen | Standard | Check          | Expected observable result | Status  | Evidence / notes                                  | Origin     |
| ------- | ------ | -------- | -------------- | -------------------------- | ------- | ------------------------------------------------- | ---------- |
| GUI-001 | Cart   | IA-01    | [atomic check] | [visible outcome]          | Not run | [screenshot/session note] (when screen is failed) | AI / Human |

After the table, add:

| Human-added ID | Missing item | Why an AI draft may miss it        | Human review basis                             |
| -------------- | ------------ | ---------------------------------- | ---------------------------------------------- |
| GUI-\_\_\_     | [item]       | [specific overlooked context/risk] | [assignment, screen observation, or test goal] |

## Bug report

Before drafting, inspect every file in `.github/ISSUE_TEMPLATE` and use the current matching template. Fill its frontmatter and headings exactly. Evidence must state test case, environment, observable reproduction steps, expected visible result, actual visible result, and screenshot/video/session reference. Never use code-derived reasoning.

## Usability test plan

| Field            | Content                                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Objective        | [what users should be able to accomplish and evaluate]                                                                       |
| Scope            | Cart → checkout → coupon → payment confirmation                                                                              |
| Method           | Moderated/unmoderated, think-aloud, session length                                                                           |
| Participants     | [target characteristics/count and consent approach]                                                                          |
| Scenario         | Complete a purchase for items you want, adjust the cart as needed, and try an available promotion before confirming payment. |
| Success criteria | [completion, errors, confidence, time, assistance]                                                                           |
| Measures         | Task outcome, observations, SUS or UEQ-S, evidence IDs                                                                       |
| Environment      | [device/browser/build/URL/date]                                                                                              |

## Participant table

| Participant ID | Relevant experience         | Device/browser | Session date | Consent recorded | Notes     |
| -------------- | --------------------------- | -------------- | ------------ | ---------------- | --------- |
| P01            | [optional, non-identifying] | [environment]  | [date]       | Yes/No           | [context] |

## Observation notes

| Participant | Task goal | Outcome                | Time   | Errors/hesitations | Quote/behavior         | Intervention  | Evidence |
| ----------- | --------- | ---------------------- | ------ | ------------------ | ---------------------- | ------------- | -------- |
| P01         | [goal]    | Success/Partial/Failed | [time] | [observed only]    | [verbatim/description] | None/[detail] | [ID]     |

## SUS result summary

| Participant |  Q1 |  Q2 |  Q3 |  Q4 |  Q5 |  Q6 |  Q7 |  Q8 |  Q9 | Q10 | SUS score | Notes |
| ----------- | --: | --: | --: | --: | --: | --: | --: | --: | --: | --: | --------: | ----- |
| P01         |     |     |     |     |     |     |     |     |     |     |           |       |

State the scoring formula, sample size, mean/median as appropriate, missing responses, and that results are descriptive for the tested sample. For UEQ-S, record the exact instrument version, item scores, scale calculation, and benchmark/comparison source if used.

## Severity-ranked findings

| Rank | Finding                      | Severity                     | Evidence                    | Impact / frequency | Recommendation |
| ---: | ---------------------------- | ---------------------------- | --------------------------- | ------------------ | -------------- |
|    1 | [observable usability issue] | Critical/Major/Minor/Trivial | [participant/checklist IDs] | [basis]            | [action]       |

## AI critique

| AI output reviewed         | What was useful | Limitation/error/risk | Human correction | Evidence basis        |
| -------------------------- | --------------- | --------------------- | ---------------- | --------------------- |
| [checklist/draft/analysis] | [value]         | [gap]                 | [change]         | [UI/session evidence] |

## AI audit entry

AI Audit Entry:

- Tool: [exact model/tool if visible; otherwise `Codex AI assistant / model not visible`]
- Date: [current system date and time, including timezone if available]
- User Prompt: [short summary or quote]
- AI Action: [concise action]

## Commit messages

- `test(hw03): add black-box GUI checklist for cart and checkout flow`
- `test(hw03): record GUI checklist execution evidence`
- `docs(hw03): add coupon and checkout usability test plan`
- `docs(hw03): summarize SUS results and severity-ranked findings`
- `docs(hw03): add AI critique and audit report entries`
