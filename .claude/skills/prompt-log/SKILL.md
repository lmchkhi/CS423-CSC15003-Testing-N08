---
name: prompt-log
description: Auto-append every AI interaction used for HW04 — no exceptions, no selection — to reports/prompt-log.md as a raw, verbatim, chronological record. Use immediately after any AI prompt/response that happened during HW04 work, even trivial or rejected ones. This is separate from ai-audit-log — prompt-log is the complete unfiltered record; ai-audit-log is the smaller reviewed appendix required by HW04 §9. Per the TA's instruction, both files must be maintained together.
---

# Prompt Log

Keeps `reports/prompt-log.md` a **complete, unfiltered, chronological** record
of every AI interaction during HW04 — every prompt sent and every output
received, in the order they happened. No selection, no judgment call about
whether an interaction "matters enough" to log — if it happened, it goes in.

This is distinct from the `ai-audit-log` skill:

| | `prompt-log` (this skill) | `ai-audit-log` |
|---|---|---|
| Scope | every interaction, unfiltered | every interaction that produced a kept/edited/rejected artifact (still all of them per HW04 §9, not a subset) |
| Fields | Tool, Timestamp, Prompt, Output | same four fields **plus** Verdict, Reasoning, Student Fix |
| Purpose | raw ground-truth trail | the reviewed appendix HW04 §9 requires, with human judgment attached |

Both files are required — run **both** skills for the same interaction when
it's the kind of interaction `ai-audit-log` also covers (an artifact that
went into a deliverable). For everything else (quick clarifying questions,
throwaway checks, exploratory back-and-forth that never became an artifact),
`prompt-log` still gets an entry; `ai-audit-log` does not.

## When to run this

After **any** AI prompt/response during HW04 work — no filtering. This
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

*Complete, unfiltered record of every AI interaction during HW04. See
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

### Claude Code work — regenerate, don't hand-write

`reports/prompt-log.md` is a **build artifact**. Claude Code already keeps a
complete transcript of every session under
`~/.claude/projects/-Users-hbn-Documents-CS423-CSC15003-Testing-N08/`, so the
log is extracted from that rather than typed from memory — which is the only
way the verbatim rule above can actually hold:

```bash
python3 reports/tools/extract-prompt-log.py
```

The script rebuilds the whole file from the transcripts, so entry numbering is
derived from the source of truth and never drifts. **Do not append Claude Code
entries by hand.** After a new session, add its transcript id to `SESSIONS` in
the script (the printed summary tells you the id and its first prompt), rerun,
and check the diff.

> Why not grep for `max(N) + 1`? Prompts and outputs legitimately contain
> text that looks like an entry header — this log quotes its own format at
> least once — so counting headers with `grep '^## \['` overcounts. The
> transcripts have no such ambiguity.

### Other AI tools — append by hand

For an interaction that did **not** happen inside Claude Code (a browser
ChatGPT session, an IDE assistant), there is no transcript to extract, so
append it manually in the same format under a `**Phiên: <tool>, ngoài Claude
Code**` divider, numbered after the last generated entry. Note in the entry
that it was hand-transcribed.

### Then commit

```bash
git add reports/prompt-log.md reports/tools/extract-prompt-log.py
git commit -m "docs(prompt-log): regenerate through <session/date>"
```

Fine to batch a few consecutive entries into one commit if they happened
in the same short burst of work — unlike `ai-audit-log` and the spec
commits, this file isn't tied to §12's commit count (which only counts
commits that change test-script files, not the raw prompt trail).

## Guardrails

- **Never edit `reports/prompt-log.md` directly for Claude Code work** — the
  edit would be silently destroyed by the next regeneration, and a hand-edited
  "verbatim" log is exactly the failure this file exists to prevent. Change the
  extractor, or add the hand-transcribed section for non-Claude-Code tools.
- Regenerating **may** renumber entries, and that is fine — the numbering is a
  function of the transcripts, not a ledger to preserve. What must never happen
  is dropping a session from `SESSIONS` so its interactions disappear.
- The extractor's two documented reductions (file bodies referenced by path,
  Bash stdout capped with the cut marked) are the **only** permitted ones. Do
  not add a filter that drops interactions, and never paraphrase inside a
  Prompt or Output block to make it shorter.
- Never skip an interaction because it seems too small or because the output
  was rejected/unused — unfiltered means unfiltered.
- Don't merge this file's job into `ai-audit-report.md` or vice versa; the TA
  wants them as two separate files, run both skills.
