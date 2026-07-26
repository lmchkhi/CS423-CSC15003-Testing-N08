---
name: ai-audit-log
description: Auto-append an entry to reports/ai-audit-report.md every time an AI tool (this agent included) produces an artifact used in the HW03 deliverables — a checklist batch, a gap-analysis note, a usability synthesis, a bug triage, etc. Use immediately after finishing any AI-assisted sub-task for HW03, not just at the end of the session. Required by HW03 §9 (AI Audit Report) and the course's "AI-First + mandatory audit log" policy. Runs alongside — not instead of — the prompt-log skill, which keeps the separate unfiltered reports/prompt-log.md the TA also requires.
---

# AI Audit Log

**Language: every file this skill writes (`reports/ai-audit-report.md`,
`reports/ai-critique.md`) must be natural, fluent Vietnamese prose for the
parts that are the student's own writing — Reasoning, Student Fix, the
Conclusion section, everything. Only keep technical jargon in English: tool
names (Claude, ChatGPT), field labels that are part of the fixed template
(`Tool`, `Timestamp`, `Verdict`, `VALID`/`INVALID`/`INCOMPLETE`), code
identifiers, and IA/ISTQB terms with no natural Vietnamese equivalent.

**Hard exception — Full prompt and AI Output stay 100% verbatim, in
whatever language they actually occurred in.** This overrides the Vietnamese
rule above: never translate, paraphrase, "clean up," or shorten either field
to make them read more naturally or more Vietnamese. If the real prompt was
typed in English, log it in English. If the AI answered in English, log that
in English too — copy-paste exact, byte for byte, including typos and
awkward phrasing. The only trim allowed is dropping obviously repeated
boilerplate from a very long output (per step 3 below), never a rewrite for
tone, language, or length. The audit is worthless as evidence if these two
fields don't match what actually happened.**

Keeps `reports/ai-audit-report.md` a complete, entry-by-entry record of every AI
interaction used while doing HW03, in the exact format the course already uses
(see the HW02 entries already in that file for the pattern). This is a
**mandatory appendix** — missing it is a 0 for the whole homework — so append
as you go, never reconstruct it from memory at the end.

## Relationship to `prompt-log`

Two separate files, both required (per the TA's instruction, on top of what
HW03 §9 already asks for):

- `reports/prompt-log.md` (the `prompt-log` skill) — **every** AI interaction,
  unfiltered, no review fields, just Tool/Timestamp/Prompt/Output.
- `reports/ai-audit-report.md` (this skill) — the HW03 §9 appendix: the same
  four fields **plus** the reviewed fields (Verdict/Reasoning/Student Fix)
  that turn a raw interaction into evidence of human review.

When an interaction is the kind this skill logs (see "When to run this"
below), run **both** skills for it — `prompt-log` first (or in either order,
they don't depend on each other), then this one. Don't let this skill's
entry substitute for the `prompt-log` entry or vice versa; they're different
files with different jobs.

## When to run this

Run it right after any of these produce something that ends up in a
deliverable:
- an AI-generated checklist batch (gui-checklist skill)
- an AI-drafted gap-analysis note
- an AI-assisted usability synthesis / severity ranking
- an AI-drafted bug report
- any other AI prompt whose output you kept, edited, or rejected

Do **not** batch every single trivial exchange — log interactions that
produced an artifact or a judgment call, not every clarifying question. (The
`prompt-log` skill has no such filter — trivial exchanges still go there.)

## Steps

1. **Ensure the header block exists.** Open `reports/ai-audit-report.md`. It
   must follow the official `[AI-02]` template (§1 Student Info → §2
   Instructions → §3 Audit Table/Entries → §4 Summary of AI Accuracy → §5
   Conclusion → §6 Mandatory Disclosure → Signature). If the `## 1. Thông tin
   Sinh viên` table at the top has empty values, stop and ask the student for:
   Họ tên, MSSV, Lớp/Khoá, ngày làm bài, danh sách công cụ AI đã dùng. Never
   invent these. Known values for this student: Họ tên = Hà Bảo Ngọc, MSSV =
   23127300 — pre-fill those two, still ask for the rest if missing.

2. **Find the next entry number.** Grep the file for `## Entry #` and take
   `max(N) + 1`. If the file has no entries yet, start at `#1`.

3. **Collect the fields** for the new entry — ask the invoking context (or the
   student) for anything you don't already have:
   - **Tool** — exact product name, e.g. `Claude (Sonnet 5, Claude Code)`.
   - **Timestamp** — real wall-clock time, `H:MM AM/PM DD/MM/YYYY`.
   - **Artifact type** — one line, e.g. `12 GUI checklist items — IA02 Forms
     (Checkout screen)`.
   - **Full prompt** — the verbatim prompt text, byte for byte, in whatever
     language it was actually written in. Never paraphrase, translate, or
     fix typos; copy exactly what was sent.
   - **AI output** — the verbatim output, byte for byte, in whatever language
     it actually came back in. Default to pasting the entire thing as-is,
     including its original formatting. The *only* allowed trim: if the same
     boilerplate block (e.g. an identical disclaimer) repeats many times
     back-to-back, you may collapse the repeats — never trim anything that
     differs, and never summarize/rewrite/shorten substance for readability.
     When in doubt, paste more, not less — the grader compares this raw text
     against the verdict/reasoning.
   - **Verdict** — one of `VALID`, `INVALID`, `INCOMPLETE` (matches the
     official `[AI-02]` template — do not use other labels). This must
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

   **`<VALID|INVALID|INCOMPLETE>`**

   ### (4) Reasoning

   <why>

   ### (5) Student Fix

   <what changed, or "Không cần chỉnh sửa">

   ---
   ```

5. **Human review, not rubber-stamping.** HW03 explicitly requires that "every
   result produced by the AI must be carefully reviewed by you" and that
   submitting raw AI output without review is unacceptable. Before writing
   `VALID`, actually check the output against the SUT / the technique taught
   in class. If you (the agent) generated the artifact yourself in this same
   session, still write a genuine critique — do not default to `VALID`
   just because you produced it.

5a. **Keep §4 (Summary of AI Accuracy) in sync.** After appending an entry,
    recount every `### (3) Verdict` in the file and update the `## 4. Tổng hợp
    độ chính xác của AI` table (total audited, VALID/INVALID/INCOMPLETE counts
    and percentages). Do this every time — it is a required section of the
    `[AI-02]` template, not a one-time fill-in.

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
