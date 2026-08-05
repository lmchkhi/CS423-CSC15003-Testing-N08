# Source requirements

Use this as the non-negotiable rubric distilled from the supplied automation-testing specification PDF and the templates in `03 - github_testcase_management.pptx`.

## Per-feature deliverables

- Convert at least 12 test cases into automation scripts. Positive, negative, and edge cases all count.
- Store test data in a separate `.csv` or `.json`; inline hard-coded test-data arrays/objects are not accepted.
- Use at least three distinct assertion patterns.
- Execute the feature on Chromium, Firefox, and WebKit (the user selected these three from the allowed alternatives).
- Produce genuine HTML execution evidence whose title visibly contains `Run by: <StudentID>` immediately on open, while its metadata contains the ISO timestamp. Do not duplicate the timestamp in the title.
- Critically review AI-generated scripts and correct fragile selectors, weak/missing assertions, missing cases, flaky waits, and similar problems. Explain what was wrong and why AI missed it.
- Document unautomated cases and the reason.
- When a failing assertion reveals a genuine defect, create a local bug report with real evidence, then publish one corresponding GitHub Issue through `gh`. Apply exact existing remote labels according to the convention observed on the repository's current issues; do not invent labels from the template.

## Evidence integrity

- Do not generate or fabricate HTML execution reports. They must result from an actual run.
- Do not fabricate screenshots, console logs, traces, pass/fail counts, timestamps, commits, or bugs.
- Preserve failed results; distinguish product defects from test and environment defects.
- The student remains responsible for human review and correctness.

## Test-case Markdown contract

Each test case is one file with these sections, in this order:

1. `# TC-<MODULE>-<NNN>: <title>`
2. `## Requirement ID`
3. `## Module / Test type / Technique`
4. `## Preconditions`
5. `## Test data`
6. `## Test steps`
7. `## Expected result`
8. `## Status / Related bugs`

## Bug-report Markdown contract

Use a separate bug document with:

1. title `[BUG][<Module>] <summary>`;
2. `Found by Test Case`;
3. related requirement;
4. severity and priority;
5. browser, OS, URL, build/commit;
6. reproducible steps;
7. expected result;
8. actual result;
9. real evidence with at least one screenshot embedded as a Markdown image preview; link non-image artifacts such as traces or logs.

For GitHub publication, derive the semantic label targets `type: bug`, `module: <module>`, `severity: <level>`, `priority: <level>`, `status: new`, and `found-by: test-case` from the bug metadata and test context. Map them to the exact label names and combinations already used by the remote repository's issues. Use this mapping only for the remote operation; local bug reports must not contain `Suggested labels` or `Verified remote labels` sections or lines. Only a missing module label may be created, and only by copying the naming, description, and color convention of existing remote module labels; all other label families are read-only.
