---
name: usability-evaluation
description: Run HW03 Task 2 end to end — plan a moderated usability study of one end-to-end EShop flow, prepare SUS/UEQ-S instruments and probe questions, structure the 7 real participant sessions, and analyse results into severity-ranked findings and bugs. Use when the student is starting or continuing the usability evaluation deliverable for HW03. Never fabricates participants, quotes, or scores — those must come from the student.
---

# Usability Evaluation (HW03 Task 2)

**Language: every file this skill writes under `usability/` (plan, session
notes, analysis, roll-up) must be natural, fluent Vietnamese — objectives,
scenario text, observation notes, probe answers, synthesis, everything except
proper nouns the participant actually said in another language. Only keep
jargon in English: SUS/UEQ-S, instrument item names, and field labels that
are fixed schema (`Date/time`, `Consent to record`). Session-script spoken
lines should already be in Vietnamese since sessions run with Vietnamese
participants — do not draft them in English and expect the student to
translate live.**

Three phases, matching the spec exactly. Output lives under `usability/`.
This task is worth 40/100 and is the one with explicit anti-cheat
constraints — treat the participant list and session data as ground truth
supplied by the student, never generated.

## Hard constraint — read first

§11 (Anti-AI-Cheat Constraints): the list of 7 participants and their
verifiable contact info **must not be AI-generated or fabricated**; the TA
may call two of them, and impersonation is 0 points for the whole task.
**This skill must never invent a participant name, contact, quote, or score.**
Every field in `usability/participants.md` and every session file must come
from the student typing/pasting real data. If asked to "fill in" participants,
stop and ask for the real list instead of generating placeholders that look
real — clearly-marked TODO placeholders are fine, fake-looking data is not.

## Phase 1 — Plan & prepare

1. **Objectives** — ask the student what they want to learn (e.g. where users
   hit navigation bottlenecks on the flow, confidence completing checkout).
   Write to `usability/plan.md`.
2. **Task scenario** — turn the one chosen end-to-end flow (§5) into a
   goal-oriented scenario, e.g. "Find a winter coat under 500,000 ₫ and check
   out using a discount coupon." Give a goal, never step-by-step instructions
   — a scenario that tells the participant which buttons to click defeats the
   whole test. Write to `usability/plan.md`.
3. **Instruments** — pick SUS or UEQ-S (see `references/sus-scale.md` /
   `references/ueqs-scale.md` for the standard item text and scoring
   formulas) or help draft a justified custom scale. Draft probe questions
   covering at minimum clarity, error recovery, speed, and trust — see
   `references/probe-questions.md` for a starting set to adapt to the
   specific flow. Write to `usability/plan.md`. Build the post-test
   questionnaire in Google Forms from `usability/post-test-survey.md` (SUS
   items, exact wording, don't reorder — the scoring formula depends on
   item position) and write the session moderator script from
   `usability/session-script.md`, filling in the real task scenario for the
   flow being tested.
4. **Participants** — create `usability/participants.md` with this table,
   populated only from real student-supplied data:

   | # | Name | Contact (masked) | Profile | Outside class? | Consent obtained |
   |---|---|---|---|---|---|
   | 1 | | Zalo: 090xxxx1234 → mask middle 4: 090**xxxx**1234 | | Yes | Yes/No |

   Verify: 7 rows, contact has the middle 4 digits masked, "Outside class" is
   Yes for all (HW03 students are ineligible), non-IT/non-tester preferred
   but not required.
5. **Pilot session** — run one pilot with a person outside the 7 to catch an
   unclear scenario or broken flow before real sessions; log findings and any
   scenario/instrument changes in `usability/plan.md`.
6. Commit after plan, after the participants table, and after the pilot —
   three separate commits, not one:
   ```bash
   git add usability/plan.md
   git commit -m "docs(usability): objectives + scenario + instruments"

   git add usability/participants.md
   git commit -m "docs(usability): recruit 7 participants"

   git add usability/plan.md
   git commit -m "test(usability): pilot session"
   ```

## Phase 2 — Conduct sessions (one file per participant)

For each of the 7 sessions, create `usability/sessions/session-0N.md`:

```markdown
# Session 0N — Người tham gia #N

- **Ngày/giờ**:
- **Đồng ý ghi hình (Consent to record)**: Yes/No
- **Giờ bắt đầu/kết thúc task**, **kết quả task (task success)**: Y/N/Partial

## Ghi chú quan sát (structured, ghi trực tiếp trong lúc test)
| Thời điểm | Bước trong flow | Quan sát (khó khăn/lỗi/do dự/câu nói của người dùng) |
|---|---|---|

## Kết quả SUS / UEQ-S
<điểm từng câu, không chỉ điểm tổng — cần cho Phase 3>

## Trả lời câu hỏi probe
- Độ rõ ràng (Clarity):
- Khả năng phục hồi sau lỗi (Error recovery):
- Tốc độ (Speed):
- Độ tin cậy (Trust):
- (các câu probe riêng cho flow này, nếu có)
```

Follow `usability/session-script.md` verbatim for the spoken parts (set the
stage, task delivery, closing, probes) — it already encodes the required
behaviors:
- Set the stage: say you're testing the product, not them; ask them to think
  aloud.
- Observe neutrally: no leading hints, no explaining the UI; step in only if
  completely stuck.
- Capture evidence: screen recording (+ audio with consent) plus the
  structured notes above.
- Close with the Google Form (SUS scale), then the probe questions.

Commit after **each** session — §12 calls this out by name ("each usability
session"), so don't wait until all 7 are done:
```bash
git add usability/sessions/session-0N.md
git commit -m "test(usability): session 0N — <participant profile, no real name if sensitive>"
```

## Phase 3 — Analyse & report

1. **Score.** Compute SUS (or UEQ-S) per participant using the formula in the
   reference file, then the mean across all 7. Put the table in
   `usability/analysis.md`.
2. **Synthesise.** Pull friction points from all 7 session files, group
   similar ones together, and explicitly separate isolated one-off bugs from
   systemic design issues (a bug is a defect; a systemic issue is a design
   pattern that confused multiple participants).
3. **Prioritise by severity** — blockers that prevented task completion vs.
   minor visual complaints; use a simple scale (Blocker / Major / Minor) and
   justify each rating against how many participants hit it and whether they
   recovered.
4. **File genuine bugs** (not systemic UX complaints — those go in the
   synthesis, not GitHub Issues) via the `bug-report` skill, one per real
   defect, screenshot attached.
5. **Log AI involvement** in synthesis/scoring help via `ai-audit-log` — this
   is exactly the kind of "AI-assisted judgment call" that needs an entry.
6. Commit the analysis as its own step, separate from the sessions:
   ```bash
   git add usability/analysis.md
   git commit -m "docs(usability): score + synthesise + prioritise findings"
   ```

## Roll-up

Update `reports/main-report.md`'s Task 2 section with: flow tested,
objectives, mean SUS/UEQ-S score, top findings by severity, bug count and
links, and a pointer to `usability/participants.md`. Then:
```bash
git log --pretty=format:'%h %ad %s' --date=short > git-log.txt
git add git-log.txt reports/main-report.md
git commit -m "docs: roll up usability evaluation into main report"
```

## Guardrails

- Commit each step separately (§12); never amend/rebase past commits to
  "clean up" the history — the grader wants the real, granular log.
