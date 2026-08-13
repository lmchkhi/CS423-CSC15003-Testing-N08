---
name: ai-audit-log
description: Auto-append an entry to reports/ai-audit-report.md every time an AI tool (this agent included) produces an artifact used in the HW05 deliverables — a generated JMeter/k6 test plan, a workload-model choice, a CSV data model, an extractor/assertion repair, an analysis of the raw .jtl logs, a bug triage, the continuous-testing proposal, etc. Use immediately after finishing any AI-assisted sub-task for HW05, not just at the end of the session. Required by HW05 §9 (AI Audit Report) and the course's "AI-First + mandatory audit log" policy. Runs alongside — not instead of — the prompt-log skill, which keeps the separate unfiltered reports/prompt-log.md the TA also requires.
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
interaction used while doing HW05, in the exact format the course already uses
(the file ships with the `[AI-02]` header and an `## Entry #` example — follow
it; the same format was used in HW02/HW03). This is a
**mandatory appendix** — missing it is a 0 for the whole homework — so append
as you go, never reconstruct it from memory at the end.

## Where "AI Output" actually comes from — do not write it from memory

An agentic Claude Code session has **no single answer string** to paste into
the AI Output field. That gap is what produced the failure this file was
rebuilt to fix on 08/08/2026: four entries whose AI Output was a Vietnamese
third-person summary written afterwards ("Phiên agentic: trợ lý đọc…"), under
a heading promising verbatim text.

The fix is not to write a better summary. It is to **read the transcript**.
Claude Code stores every session as JSONL under
`~/.claude/projects/-Users-hbn-Documents-CS423-CSC15003-Testing-N08/`:

```bash
# which transcript covers which session
python3 reports/tools/extract-prompt-log.py

# the assistant's own words, with ICT timestamps, for one session
python3 - <<'PY'
import json,glob
from datetime import datetime,timedelta,timezone
ICT=timezone(timedelta(hours=7))
f=glob.glob('<transcript-id-prefix>*.jsonl')[0]   # run from the projects dir
for line in open(f):
    d=json.loads(line); m=d.get('message') or {}
    if m.get('role')!='assistant': continue
    t=datetime.fromisoformat(d['timestamp'].replace('Z','+00:00')).astimezone(ICT)
    for b in (m.get('content') or []):
        if isinstance(b,dict) and b.get('type')=='text' and b.get('text','').strip():
            print(f"\n===== {t:%H:%M} =====\n{b['text'].strip()}")
PY
```

Take the assistant text blocks whose timestamps fall inside the entry's stage
and paste them **unchanged**, in English. Several short blocks in sequence is
the normal shape of an agentic stage — that sequence *is* the output, and it
reads as a far better audit trail than any summary, because it shows the AI
changing its mind mid-stage.

Two things that are legitimately not the AI's output, and belong in the
student's own fields instead: the content of files the AI wrote (reference
them by path — they ship in the repo), and tool results such as a JMeter
summariser line or a k6 end-of-test summary (quote them under an explicit
lead-in like "trích nguyên văn từ output của JMeter", never blended into the
AI's own words).

**Before committing an edited audit report, verify the quotes are real:**

```bash
# every English quoted line must appear in some transcript
python3 reports/tools/verify-audit-verbatim.py
```

Note that the model's internal reasoning (*thinking*) is stored with an empty
body — only a signature — so it cannot be recovered. Say so rather than
paraphrasing what the AI "was thinking".

## Relationship to `prompt-log`

Two separate files, both required (per the TA's instruction, on top of what
HW05 §9 already asks for):

- `reports/prompt-log.md` (the `prompt-log` skill) — **every** AI interaction,
  unfiltered, no review fields, just Tool/Timestamp/Prompt/Output.
- `reports/ai-audit-report.md` (this skill) — the HW05 §9 appendix: the same
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
- any single stage of designing a test plan (map the workflow to samplers,
  choose the workload model, model the CSV data, wire extractors/assertions,
  generate the `.jmx`/`.js`, review and fix) — §6 explicitly forbids a single
  generic prompt and requires the AI to be driven step by step, so each stage
  is its own entry, never one lumped "generated the three plans" entry
- an AI-chosen parameter (think-time, ramp-up, thread/VU count) and its
  justification — §6 Task 1 asks the AI to help choose these
- an AI-generated `.jmx`, k6 script, CSV data file, or run script
- an AI-proposed fix for a failing extractor, assertion, or lockout collision
- **Task 2**: the AI's analysis of the raw `.jtl` logs, its proposed
  thresholds, and its proposed optimizations — each is its own entry, and the
  Verdict/Reasoning fields are where the misinterpretation hunt is recorded
- **Task 3**: the AI's draft of the continuous performance-testing proposal
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
   - **Artifact type** — one line naming the scenario and the design stage,
     e.g. `Load stage 2 (Workload model) — threads/ramp-up/think-time đề xuất`
     or `Stress stage 5 (Generate) — 23127300_Stress_20260813.jmx + accounts.csv`
     or `Task 2 — phân tích .jtl của Spike, đề xuất ngưỡng p95`.
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

5. **Human review, not rubber-stamping.** HW05 explicitly requires that "every
   result produced by the AI must be carefully reviewed by you" and that
   submitting raw AI output without review is unacceptable. Before writing
   `VALID`, actually check the output against the SUT and against the
   performance-testing technique taught in class. For HW05 the checks that
   most often flip a verdict are: is the ramp-up/think-time realistic or was
   it copied from a generic template; does the thread count actually reach the
   pressure the scenario name claims; do the assertions look past the HTTP
   status into the body; does the plan survive the 3-fail login lockout; and
   for Task 2, does every number the AI quotes actually appear in the `.jtl`.
   If you (the agent) generated the artifact yourself in this same session,
   still write a genuine critique — do not default to `VALID` just because you
   produced it.

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
