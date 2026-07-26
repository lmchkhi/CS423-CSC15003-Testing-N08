---
name: ai-audit-log
description: Auto-append an entry to reports/ai-audit-report.md every time an AI tool (this agent included) produces an artifact used in the HW03 deliverables — a checklist batch, a gap-analysis note, a usability synthesis, a bug triage, etc. Use immediately after finishing any AI-assisted sub-task for HW03, not just at the end of the session. Required by HW03 §9 (AI Audit Report) and the course's "AI-First + mandatory audit log" policy.
---

# AI Audit Log

Keeps `reports/ai-audit-report.md` a complete, entry-by-entry record of every AI
interaction used while doing HW03, in the exact format the course already uses
(see the HW02 entries already in that file for the pattern). This is a
**mandatory appendix** — missing it is a 0 for the whole homework — so append
as you go, never reconstruct it from memory at the end.

## When to run this

Run it right after any of these produce something that ends up in a
deliverable:
- an AI-generated checklist batch (gui-checklist skill)
- an AI-drafted gap-analysis note
- an AI-assisted usability synthesis / severity ranking
- an AI-drafted bug report
- any other AI prompt whose output you kept, edited, or rejected

Do **not** batch every single trivial exchange — log interactions that
produced an artifact or a judgment call, not every clarifying question.

## Steps

1. **Ensure the header block exists.** Open `reports/ai-audit-report.md`. If
   the `## 1. Thông tin Sinh viên` table at the top has empty values, stop and
   ask the student for: Họ tên, MSSV, Lớp/Khoá, ngày làm bài, danh sách công cụ
   AI đã dùng. Never invent these.

2. **Find the next entry number.** Grep the file for `## Entry #` and take
   `max(N) + 1`. If the file has no entries yet, start at `#1`.

3. **Collect the fields** for the new entry — ask the invoking context (or the
   student) for anything you don't already have:
   - **Tool** — exact product name, e.g. `Claude (Sonnet 5, Claude Code)`.
   - **Timestamp** — real wall-clock time, `H:MM AM/PM DD/MM/YYYY`.
   - **Artifact type** — one line, e.g. `12 GUI checklist items — IA02 Forms
     (Checkout screen)`.
   - **Full prompt** — the verbatim prompt text. Never paraphrase; copy
     exactly what was sent.
   - **AI output** — the actual output. If it is very long, keep it complete
     but trim obviously repeated boilerplate; never summarize away the
     substance, since the grader compares this to the verdict/reasoning.
   - **Verdict** — one of `CORRECT`, `INCOMPLETE`, `WRONG`, `BIASED`. This must
     reflect an actual human judgment, not a rubber stamp — see Human Review
     below.
   - **Reasoning** — why that verdict, in the student's own analytical voice.
   - **Student fix** — what was changed, added, or rejected as a result. If
     nothing needed fixing, say so explicitly (`Không cần chỉnh sửa`).

4. **Append** using this exact template (matches the existing HW02 entries):

   ```markdown
   ## Entry #<N>

   ### (1) Prompt + Tool

   | Field             | Content         |
   | ----------------- | --------------- |
   | **Tool**          | <tool>          |
   | **Timestamp**     | <timestamp>     |
   | **Artifact type** | <artifact type> |

   **Full prompt:**

   ```
   <verbatim prompt>
   ```

   ### (2) AI Output

   ```
   <verbatim / lightly-trimmed output>
   ```

   ### (3) Verdict

   **`<CORRECT|INCOMPLETE|WRONG|BIASED>`**

   ### (4) Reasoning

   <why>

   ### (5) Student Fix

   <what changed, or "Không cần chỉnh sửa">

   ---
   ```

5. **Human review, not rubber-stamping.** HW03 explicitly requires that "every
   result produced by the AI must be carefully reviewed by you" and that
   submitting raw AI output without review is unacceptable. Before writing
   `CORRECT`, actually check the output against the SUT / the technique taught
   in class. If you (the agent) generated the artifact yourself in this same
   session, still write a genuine critique — do not default to `CORRECT`
   just because you produced it.

6. **Feed the AI Critique.** After the session (or when the student asks),
   review all logged entries and help draft `reports/ai-critique.md`: a
   200–300 word paragraph covering where the AI was wrong/biased/incomplete,
   why it missed the issue, and what principle was learned. Ground every claim
   in a specific entry number from the audit log — don't write generic AI
   commentary not backed by a logged interaction.

7. **Commit.**
   ```bash
   git add reports/ai-audit-report.md reports/ai-critique.md
   git commit -m "docs(ai-audit): log entry #<N> — <artifact type>"
   ```
   Commit the audit-log update with the step it documents, not silently
   amended later — §12 wants one commit per step, and the audit trail is
   itself a step.

## Guardrails

- If the student says "I didn't use AI for this part," write that fact
  instead of fabricating an entry — the assignment explicitly allows and
  requires declaring non-use.
- Never delete or renumber existing entries; the log is append-only.
- Keep prompts and outputs verbatim. A paraphrased log is not an audit trail
  and will likely be rejected by the grader.
