---
name: prompt-log
description: Auto-append every AI interaction used for HW03 — no exceptions, no selection — to reports/prompt-log.md as a raw, verbatim, chronological record. Use immediately after any AI prompt/response that happened during HW03 work, even trivial or rejected ones. This is separate from ai-audit-log — prompt-log is the complete unfiltered record; ai-audit-log is the smaller reviewed appendix required by HW03 §9. Per the TA's instruction, both files must be maintained together.
---

# Prompt Log

Keeps `reports/prompt-log.md` a **complete, unfiltered, chronological** record
of every AI interaction during HW03 — every prompt sent and every output
received, in the order they happened. No selection, no judgment call about
whether an interaction "matters enough" to log — if it happened, it goes in.

This is distinct from the `ai-audit-log` skill:

| | `prompt-log` (this skill) | `ai-audit-log` |
|---|---|---|
| Scope | every interaction, unfiltered | every interaction that produced a kept/edited/rejected artifact (still all of them per HW03 §9, not a subset) |
| Fields | Tool, Timestamp, Prompt, Output | same four fields **plus** Verdict, Reasoning, Student Fix |
| Purpose | raw ground-truth trail | the reviewed appendix HW03 §9 requires, with human judgment attached |

Both files are required — run **both** skills for the same interaction when
it's the kind of interaction `ai-audit-log` also covers (an artifact that
went into a deliverable). For everything else (quick clarifying questions,
throwaway checks, exploratory back-and-forth that never became an artifact),
`prompt-log` still gets an entry; `ai-audit-log` does not.

## When to run this

After **any** AI prompt/response during HW03 work — no filtering. This
includes things `ai-audit-log`'s guidance says not to bother with (trivial
exchanges, clarifying questions) — the whole point of this file is that
nothing is left out.

Do not defer logging to the end of a session and reconstruct from memory —
append as each interaction happens.

## Format

`reports/prompt-log.md` is a flat, chronological, append-only list — no
review fields, no verdict, just the raw record:

```markdown
# Prompt Log

*Complete, unfiltered record of every AI interaction during HW03. See
`reports/ai-audit-report.md` for the reviewed subset with verdicts.*

## [<N>] <tool> — <H:MM AM/PM DD/MM/YYYY>

**Prompt:**
```
<verbatim prompt, byte for byte, original language>
```

**Output:**
```
<verbatim output, byte for byte, original language>
```

---
```

Number entries sequentially (`[1]`, `[2]`, ...) across the whole file,
independent of `ai-audit-log`'s own `Entry #N` numbering — the two counters
are unrelated and will diverge, that's expected.

## Verbatim rule — same hard exception as ai-audit-log

**Prompt and Output are never translated, paraphrased, "cleaned up,"
summarized, or shortened.** Copy exactly what was sent and exactly what came
back, in whatever language it actually occurred in, including typos and
awkward phrasing. The only allowed trim is collapsing an identical
boilerplate block that repeats many times back-to-back — never trim content
that differs. This file is the raw evidence; if it doesn't match what
actually happened, it's worthless as a record.

## Steps

1. Find the next `[N]` by grepping for `## \[` and taking `max(N) + 1`. Start
   at `[1]` if the file doesn't exist yet — create it with the header shown
   above.
2. Append the entry using the format above.
3. Commit:
   ```bash
   git add reports/prompt-log.md
   git commit -m "docs(prompt-log): entry [<N>] — <tool>, <one-line what-for>"
   ```
   Fine to batch a few consecutive entries into one commit if they happened
   in the same short burst of work — unlike `ai-audit-log`/checklist/session
   commits, this file isn't tied to a graded "one commit per testing step"
   requirement (§12 is about the testing procedure, not the raw prompt
   trail).

## Guardrails

- Never delete or renumber existing entries; append-only, same as
  `ai-audit-log`.
- Never skip an interaction because it seems too small or because the output
  was rejected/unused — unfiltered means unfiltered.
- Don't merge this file's job into `ai-audit-report.md` or vice versa; the TA
  wants them as two separate files, run both skills.
