---
name: bug-report
description: File a bug revealed by an HW05 performance run — writes bug-reports/BUG-<ID>.md in the repo's own template and creates a matching GitHub issue with evidence attached. Use whenever a JMeter/k6 run surfaces a genuine EShop defect (error response, crash, functional regression) or a reportable performance issue (latency/error-rate breach), as opposed to a test-plan bug, exhausted CSV data, or a stopped SUT.
---

# Bug Report

**Language: section headers (`Found by Test Case`, `Severity / Priority`,
etc.) stay in English exactly as in
`.github/ISSUE_TEMPLATE/bug-report-template.md` — do not translate them, the
grader/GitHub matches on these literally. Everything you write *inside* those
sections (steps to reproduce, expected/actual result, title, notes) must be
natural, fluent Vietnamese — the repo's own template already models this
(see its Vietnamese example under "Steps to reproduce"). Only keep jargon in
English: IDs (`BUG-...`), severity labels (`Critical`/`Major`/`Minor`/
`Trivial`), tool/OS names, HTTP status codes, metric names (p95, RPS,
throughput, error rate), sampler and scenario names.**

Produces one bug both as a Markdown file (for the main report) and as a GitHub
Issue — required by HW05 §6 Task 1 ("Report issues. Log any genuine bugs or
performance issues (error responses, crashes, functional regressions) on your
GitHub Issues page with screenshots").

## Two kinds of finding, both welcome

| Kind | Example | §6 status |
|---|---|---|
| **Functional / correctness defect under load** | checkout returns 500, an order is created twice, `reset-password` accepts a spent token, a 200 response carrying an error body | Required — "genuine bugs" |
| **Performance issue** | p95 blows past the stated threshold at N VUs, error rate climbs above 0 under Spike, throughput collapses instead of plateauing | "encouraged but not penalised if absent" — file them anyway, they are cheap marks |

Mark which kind the bug is in the title (`[BUG]` vs `[PERF]`) so the two are
countable separately in the README summary table.

## Before filing

Only file real findings. Triage first — the following are **not** bugs, fix them
and rerun:

- CSV data exhausted mid-run (JMeter recycles or stops the thread; k6 wraps the
  array) so later iterations reuse a spent account or a password that was
  already rotated;
- an extractor that yielded an empty `${resetToken}` / `${token}`, turning every
  downstream request into a 401;
- the **login lockout** firing because the plan reused an account across threads
  — that is the plan's fault, not the SUT's;
- the backend not running, the DB file locked by a stale process, or the machine
  swapping because something else was open during the run.

A defect that reproduces in Load, Stress **and** Spike is one bug, not three —
say in `Environment` which scenarios reproduced it. A defect that appears only
at a specific load level is a real and interesting finding: state the exact VU
count / arrival rate at which it starts.

## ID scheme

- Functional defects: `BUG-<FR>-<NUM>` — `BUG-FR03-001` (forgot/reset password),
  `BUG-FR02-001` (login), `BUG-FR05-001` / `BUG-FR06-001` (product list /
  detail), `BUG-FR07-001` (cart), `BUG-FR08-001` (checkout).
- Performance issues: `BUG-PERF-<NUM>`.

Zero-padded 3 digits, numbered sequentially per prefix. Check existing files in
`bug-reports/` first so IDs never collide. If the failure is the same defect
already reported in an earlier homework, take a new HW05 number and
cross-reference the old report ID in the body instead of silently reusing it.

## Steps

1. **Evidence first — from the run itself, never re-staged afterwards.** A
   performance bug's evidence is a set, not a single image. Collect:

   - the **failing sampler's response** — from JMeter's View Results Tree
     (Request + Response data tabs) or k6's console/check output. Save as
     `bug-reports/screenshots/<BUG-ID>.png`;
   - the **`.jtl` row(s)** that back the claim, quoted as text in the report
     body — label, timestamp, elapsed, responseCode, success flag, failureMessage;
   - for a `BUG-PERF-*`, the **report view** showing the metric (Summary /
     Aggregate report row, or the HTML dashboard panel) plus the resource
     monitor if the claim involves CPU/memory.

   Screenshots use the browser `zoom` action, not `screenshot` — the latter
   re-encodes as lossy JPEG even when the file is named `.png`, and unreadable
   numbers are not evidence.

   Each bug's image must come from **its own** finding — never reuse a sibling
   bug's image because it happens to show a similar screen. Verify before
   committing:

   ```bash
   md5 -q bug-reports/screenshots/*.png | sort | uniq -d   # must print nothing
   ```

2. **Pull the exact numbers out of the raw log, don't eyeball them.** Every
   figure quoted in the report comes from the `.jtl`, computed — not read off a
   graph:

   ```bash
   # failing rows for one sampler in one run
   awk -F, 'NR==1 || ($8=="false")' perf/results/jtl/<run>.jtl | head -20

   # p95 elapsed for a given label
   python3 - <<'PY'
   import csv, statistics, sys
   rows=[int(r["elapsed"]) for r in csv.DictReader(open("perf/results/jtl/<run>.jtl"))
         if r["label"]=="<sampler label>"]
   rows.sort()
   print(len(rows), "samples  p95 =", rows[int(len(rows)*0.95)-1], "ms")
   PY
   ```

   A number in a bug report that cannot be re-derived from the attached `.jtl`
   is the single most damaging thing this file can contain — §11 has the raw
   logs specifically so the TA can check.

3. **Write `bug-reports/<BUG-ID>.md`** using the repo's own issue template at
   `.github/ISSUE_TEMPLATE/bug-report-template.md` as the source of truth for
   fields:

   ```markdown
   # <BUG-ID>: <one-line title>

   ## Found by Test Case
   <scenario + sampler, e.g. 23127300_Stress_20260813 — sampler "POST /api/checkout",
   xuất hiện từ vòng ramp thứ 3 (≈120 VU)>

   ## Requirement liên quan
   <FR-xx + the exact clause from api_specification.md it violates, or the
   stated performance threshold it breaches>

   ## Severity / Priority
   <Critical|Major|Minor|Trivial> / <P0|P1|P2|P3>

   ## Environment
   **Tool**: Apache JMeter 5.6.3 (hoặc k6 v2.2.0)
   **OS / Hardware**: <macOS ver, chip, RAM — khớp với bảng spec trong báo cáo>
   **SUT**: EShop backend, http://localhost:3000
   **Workload**: <threads / ramp-up / duration của lần chạy tái hiện được>

   ## Steps to reproduce
   1. ...

   ## Expected result
   ...

   ## Actual result
   ...

   ## Evidence
   ![<BUG-ID>](screenshots/<BUG-ID>.png)

   Trích từ `perf/results/jtl/<run>.jtl`:

   ```
   <timeStamp>,<elapsed>,<label>,<responseCode>,<responseMessage>,...,<success>,<failureMessage>
   ```
   ```

   Section names and order must match
   `.github/ISSUE_TEMPLATE/bug-report-template.md` exactly (`Found by Test
   Case` → `Requirement liên quan` → `Severity / Priority` → `Environment` →
   `Steps to reproduce` → `Expected result` → `Actual result` → `Evidence`) —
   don't rename, reorder, split, or merge sections.

   **Steps to reproduce must be manual, human-followable steps** — a grader
   reproduces by hand with curl/Postman where possible, not by re-running a
   200-thread plan. If the defect genuinely only manifests under concurrency,
   say so and give the minimum load that reproduces it, plus the single request
   sequence a human can send to see the wrong response. `Actual result` quotes
   what the run observed (HTTP status, response body, the `.jtl` row, the
   measured metric), never a source file or line number — black-box evidence
   only.

4. **Severity guidance**: a finding that loses or corrupts data (a paid checkout
   that creates no order, a duplicated order), breaks a security/state rule (a
   reset token reusable after it was spent, a lockout that never engages), or
   crashes the backend is `Critical`/`Major`. A latency threshold breach with no
   errors is usually `Minor`/`Major` depending on how far past the threshold it
   sits. Keep the tiers consistent across the whole report — the severity legend
   lives in `reports/main-report.md`.

5. **Commit the evidence + report file** before creating the GitHub issue — the
   issue body links to the raw file on GitHub, which only resolves once the
   commit is pushed.

   ```bash
   git add bug-reports/<BUG-ID>.md bug-reports/screenshots/<BUG-ID>.png
   git commit -m "docs(bug): file <BUG-ID> — <short title>"
   git push
   ```

   Confirm with the student before pushing if this is the first push of the
   session.

6. **Create the GitHub issue**, reusing the repo's template and embedding the
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
     --title "[BUG|PERF][<Module>] <short title>" \
     --body-file /tmp/issue-body.md \
     --label "Type: Bug,Status: New,Severity: <Critical|Major|Minor|Trivial>,Priority: <P0|P1|P2|P3>,Module: <Module>"
   ```

   **All five label groups are required** — `Type`, `Status`, `Severity`,
   `Priority`, and `Module`. The repo's other issues all carry the full set, so
   an issue with only `Type: Bug,Status: New` is under-labelled and will not
   filter correctly. `Severity` and `Priority` must repeat exactly what the
   report's `Severity / Priority` section says; `Module` must be an existing
   label — run `gh label list` first and reuse the closest existing module
   rather than creating a near-duplicate.

   Confirm the exact title/labels/repo with the student before running
   `gh issue create` — creating issues is visible to the whole team.

7. **Cross-link.** Record the returned issue URL back into
   `bug-reports/<BUG-ID>.md`, into the bug table in `README.md`, and into
   `reports/main-report.md`, so every deliverable traces to the same issue.

8. **Log it** — hand off to `ai-audit-log` if AI helped draft the report, then
   commit the cross-link update:
   ```bash
   git add bug-reports/<BUG-ID>.md README.md reports/main-report.md
   git commit -m "docs(bug): cross-link <BUG-ID> to issue #<N>"
   ```
   (Stage only the files actually touched.)

9. **Do not tune the failure away.** After filing, never lower the thread count,
   raise a timeout, loosen an assertion, or point the plan at a lighter endpoint
   so the run comes back green. The failing samplers in the `.jtl` and the HTML
   report are the bug's primary evidence, and §6 expects the runs to surface
   genuine defects.
