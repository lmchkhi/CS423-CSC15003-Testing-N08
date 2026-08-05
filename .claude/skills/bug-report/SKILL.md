---
name: bug-report
description: File a bug revealed by a failing HW04 automation assertion — writes bug-reports/BUG-<ID>.md in the repo's own template and creates a matching GitHub issue with the failure screenshot attached. Use whenever a Playwright test fails because of a genuine EShop defect (not a flaky selector, bad test data, or a stopped SUT).
---

# Bug Report

**Language: section headers (`Found by Test Case`, `Severity / Priority`,
etc.) stay in English exactly as in
`.github/ISSUE_TEMPLATE/bug-report-template.md` — do not translate them, the
grader/GitHub matches on these literally. Everything you write *inside* those
sections (steps to reproduce, expected/actual result, title, notes) must be
natural, fluent Vietnamese — the repo's own template already models this
(see its Vietnamese example under "Steps to reproduce"). Only keep jargon in
English: IDs (`BUG-...`, `F02-TC-...`), severity labels (`Critical`/`Major`/
`Minor`/`Trivial`), browser/OS/device names, test titles.**

Invoked by `playwright-automation` at stage 7 (verify and repair). Produces one
bug both as a Markdown file (for the main report) and as a GitHub Issue
(required by HW04 §6 — "wherever a failing assertion reveals a genuine defect,
a bug report. Log such bugs both in the Markdown report and on your GitHub
Issues page, attaching a screenshot to each issue").

## Before filing

Only file real bugs. Triage the failure first: a failing assertion caused by a
genuine EShop defect gets a bug; one caused by a brittle selector, a missing
wait, wrong test data, a stale login, or a stopped SUT does **not** — fix the
automation or the environment and rerun.

A defect that reproduces on all three browsers is one bug, not three. A defect
that appears in only one engine is a real (and interesting) finding — say which
browser and which version in `Environment`.

## ID scheme

`BUG-<FR>-<NUM>`, zero-padded 3 digits: `BUG-FR02-001`, `BUG-FR10-001`,
`BUG-FR13-001`. Number sequentially per feature; check existing files in
`bug-reports/` first so IDs never collide. If the failure is the same defect
already reported in HW02, keep a new HW04 number and cross-reference the HW02
report ID in the body instead of silently reusing it.

## Steps

1. **Screenshot first.** Playwright already saved one on failure under
   `automation/test-results/<test-dir>/test-failed-1.png`. Copy that file to
   `bug-reports/screenshots/<BUG-ID>.png` — it is the run's own evidence, so
   prefer it over a hand-taken screenshot. Screenshot failures only.

2. **Write `bug-reports/<BUG-ID>.md`** using the repo's own issue template at
   `.github/ISSUE_TEMPLATE/bug-report-template.md` as the source of truth for
   fields:

   ```markdown
   # <BUG-ID>: <one-line title>

   ## Found by Test Case
   <HW04 case ID + automated test title, e.g. F02-TC-004 — "F02-TC-004 khóa
   tài khoản sau 3 lần sai">

   ## Requirement liên quan
   <FR-xx and the exact clause from sut-requirements.md it violates>

   ## Severity / Priority
   <Critical|Major|Minor|Trivial> / <P0|P1|P2|P3>

   ## Environment
   **Browser/Device**: <chromium|firefox|webkit> <version> (Playwright <ver>)
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
   don't rename, reorder, split, or merge sections. `Found by Test Case` takes
   the HW04 case ID (`F02-TC-004`) plus the automated test title, so a grader
   can jump from the bug to the exact test in the HTML report; if the case
   carries over from HW02, add its HW02 ID in parentheses.

   **Steps to reproduce must be manual, human-followable steps** — a grader
   reproduces by hand, not by running the suite. "Run `npm run matrix`" is not
   a reproduction step. `Actual result` quotes what the run observed
   (the assertion message and the on-screen text), never a source file or line
   number — black-box evidence only.

3. **Severity guidance**: a bug that blocks the user from completing the flow,
   corrupts data, or breaks a security/state rule (an illegal FR-10 transition
   being accepted, a wrong FR-13 revenue total) is `Critical`/`Major`; a
   visual-only or copy issue is `Minor`/`Trivial`.
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

6. **Cross-link.** Record the returned issue URL back into
   `bug-reports/<BUG-ID>.md`, into the case row in
   `test-design/<feature>/case-map.md`, and into the bug table in
   `README.md` / `reports/main-report.md`, so every deliverable traces to the
   same issue.

7. **Log it** — hand off to `ai-audit-log` if AI helped draft the report, then
   commit the cross-link update:
   ```bash
   git add bug-reports/<BUG-ID>.md test-design/<feature>/case-map.md README.md
   git commit -m "docs(bug): cross-link <BUG-ID> to issue #<N>"
   ```
   (Stage only the files actually touched.)

8. **Leave the test red.** Do not skip, `fixme`, or soften the failing
   assertion after filing — the failing test in the HTML report is the bug's
   primary evidence, and §6 expects the suite to surface genuine defects.
