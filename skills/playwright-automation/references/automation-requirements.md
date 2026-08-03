# Source requirements

Use this as the non-negotiable rubric distilled from the supplied automation-testing specification PDF and the templates in `03 - github_testcase_management.pptx`.

## Per-feature deliverables

- Convert at least 12 test cases into automation scripts. Positive, negative, and edge cases all count.
- Store test data in a separate `.csv` or `.json`; inline hard-coded test-data arrays/objects are not accepted.
- Use at least three distinct assertion patterns.
- Execute the feature on Chromium, Firefox, and WebKit (the user selected these three from the allowed alternatives).
- Produce genuine HTML execution evidence that visibly contains `Run by: <StudentID>` and an ISO timestamp.
- Critically review AI-generated scripts and correct fragile selectors, weak/missing assertions, missing cases, flaky waits, and similar problems. Explain what was wrong and why AI missed it.
- Document unautomated cases and the reason.
- When a failing assertion reveals a genuine defect, create a bug report with real evidence. The assignment additionally expects bugs to be logged on GitHub Issues with screenshots, but external issue creation requires user authorization.

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
9. real evidence.

Recommended GitHub labels: `type: bug`, `module: <module>`, `severity: <level>`, `priority: <level>`, `status: new`, and `found-by: test-case`.
