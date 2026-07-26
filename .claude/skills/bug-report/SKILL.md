---
name: bug-report
description: File a bug found during HW03 GUI-checklist execution, usability sessions, or cross-platform testing — writes bug-reports/BUG-<ID>.md in the repo's own template and creates a matching GitHub issue with the screenshot attached. Use whenever a checklist item fails, a usability participant hits a genuine defect, or a cross-platform run shows a real bug (not a one-off environment fluke).
---

# Bug Report

**Language: section headers (`Found by Test Case`, `Severity / Priority`,
etc.) stay in English exactly as in
`.github/ISSUE_TEMPLATE/bug-report-template.md` — do not translate them, the
grader/GitHub matches on these literally. Everything you write *inside* those
sections (steps to reproduce, expected/actual result, title, notes) must be
natural, fluent Vietnamese — the repo's own template already models this
(see its Vietnamese example under "Steps to reproduce"). Only keep jargon in
English: IDs (`BUG-...`, `GUI-...`), severity labels (`Critical`/`Major`/
`Minor`/`Trivial`), browser/OS/device names.**

Shared utility invoked by `gui-checklist`, `usability-evaluation`, and
`cross-platform-testing`. Produces one bug both as a Markdown file (for the
main report) and as a GitHub Issue (required by HW03 §6 — "Report all
discovered bugs both in the Markdown report and on your GitHub Issues page.
Remember to attach bug screenshots to each GitHub issue.").

## Before filing

Only file real bugs. A checklist item marked `Failed` because of a genuine
UI/usability defect gets a bug; a `Failed` caused by test-environment noise
(SUT not running, wrong URL, stale build) does not — fix the environment and
retest instead.

## ID scheme

`BUG-<AREA>-<NUM>`, zero-padded 3 digits, area matches the source:
- GUI checklist bug → area = the IA code + short screen tag, e.g.
  `BUG-IA02-CHECKOUT-001`.
- Usability bug → area = flow tag, e.g. `BUG-USAB-SIGNUP-001`.
- Cross-platform bug → area = platform tag, e.g. `BUG-XPLAT-SAFARI-001`.

Number sequentially per area; check existing files in `bug-reports/` first so
IDs never collide.

## Steps

1. **Screenshot first.** Save it under `bug-reports/screenshots/<BUG-ID>.png`
   (or `.jpg`). Task 1 requires screenshots for **Failed items only** — don't
   screenshot passes.

2. **Write `bug-reports/<BUG-ID>.md`** using the repo's own issue template at
   `.github/ISSUE_TEMPLATE/bug-report-template.md` as the source of truth for
   fields:

   ```markdown
   # <BUG-ID>: <one-line title>

   ## Found by Test Case
   <checklist item ID / usability session ID / cross-platform run ID>

   ## Requirement liên quan
   <FR-xx or IA-xx this relates to>

   ## Severity / Priority
   <Critical|Major|Minor|Trivial> / <P0|P1|P2|P3>

   ## Environment
   **Browser/Device**: ...
   **OS**: ...
   **URL**: ...

   ## Steps to reproduce
   1. ...

   ## Expected result
   ...

   ## Actual result
   ...

   ## Evidence
   ![<BUG-ID>](screenshots/<BUG-ID>.png)
   ```

   Section names and order must match
   `.github/ISSUE_TEMPLATE/bug-report-template.md` exactly (`Found by Test
   Case` → `Requirement liên quan` → `Severity / Priority` → `Environment` →
   `Steps to reproduce` → `Expected result` → `Actual result` → `Evidence`) —
   don't rename, reorder, split, or merge sections. One intentional deviation:
   `Found by Test Case` uses this project's real IDs (`GUI-<NNN>` from
   `gui-checklist`, `session-0N` from `usability-evaluation`, the
   cross-platform run row) instead of the template's literal placeholder
   `TC-<Module_Name>-<TC_NUM>` — HW03's own skills never generate `TC-`-style
   IDs, so mapping to a fake `TC-` id would be less traceable, not more
   compliant.

3. **Severity guidance** (mirrors HW03 Task 2 Phase 3 — "Prioritise by
   severity"): a bug that blocks the participant/tester from completing the
   flow is `Critical`/`Major`; a visual-only or copy issue is `Minor`/`Trivial`.
   Be consistent across the whole report — keep a running severity legend in
   `reports/main-report.md` if you introduce new tiers.

4. **Commit the screenshot + report file** before creating the GitHub issue —
   the issue body will link to the raw file on GitHub, which only resolves
   once the commit is pushed.

   ```bash
   git add bug-reports/<BUG-ID>.md bug-reports/screenshots/<BUG-ID>.png
   git commit -m "docs(bug): file <BUG-ID> — <short title>"
   git push
   ```

   Confirm with the student before pushing if this is the first push of the
   session.

5. **Create the GitHub issue**, reusing the repo's template and embedding the
   now-pushed screenshot via its raw URL (the `gh` CLI cannot upload binary
   attachments directly, so link to the committed file instead):

   ```bash
   OWNER_REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
   BRANCH=$(git branch --show-current)
   cat > /tmp/issue-body.md <<EOF
   ## Found by Test Case
   <...>

   ## Requirement liên quan
   <...>

   ## Severity / Priority
   <...>

   ## Environment
   <...>

   ## Steps to reproduce
   <...>

   ## Expected result
   <...>

   ## Actual result
   <...>

   ## Evidence
   ![<BUG-ID>](https://github.com/$OWNER_REPO/raw/$BRANCH/bug-reports/screenshots/<BUG-ID>.png)
   EOF

   gh issue create \
     --title "[BUG][<Module>] <short title>" \
     --body-file /tmp/issue-body.md \
     --label "Type: Bug,Status: New"
   ```

   Confirm the exact title/labels/repo with the student before running
   `gh issue create` — creating issues is visible to the whole team.

6. **Cross-link.** Record the returned issue URL back into the
   `bug-reports/<BUG-ID>.md` file and into whichever checklist row / session
   note / cross-platform row triggered the bug, so every deliverable traces to
   the same issue.

7. **Log it** — hand off to `ai-audit-log` if AI helped draft the report, then
   commit the cross-link update:
   ```bash
   git add bug-reports/<BUG-ID>.md checklist/gui-checklist.md usability/sessions/ cross-platform/report.md
   git commit -m "docs(bug): cross-link <BUG-ID> to issue #<N>"
   ```
   (Stage only the files actually touched.)
