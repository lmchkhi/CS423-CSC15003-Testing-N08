# HW04 Automation Contract

Use this reference as the rubric checklist derived from `2026.HW04.Automation Testing_En.pdf`.

This skill intentionally excludes AI audit logs, AI critiques, and AI-review documents. Do not create, update, summarize, or validate those artifacts while using this skill.

## Core assignment rules

- Automate the same three web features selected in HW02: one each from Pools A, B, and C. Pool D mobile features are excluded.
- If HW02 is unavailable, self-declare three web features from Pools A-C and document the reason.
- For each feature, convert at least 12 test cases into automation scripts through a documented, step-by-step AI process.
- Accept positive, negative, and edge cases toward the minimum, provided they are distinct and meaningful.
- Store test data in a separate `.csv` or `.json` file. Inline test-case arrays or objects are not accepted.
- Use at least three distinct assertion patterns.
- Run every feature on at least three browsers:
  - Chromium / Firefox / WebKit; or
  - Chrome / Edge / Firefox.
- Produce at least nine feature-browser runs across three features.
- Produce an Allure or Playwright HTML report for every run.
- Display `Run by: {StudentID}` visibly in every report.
- Include an ISO timestamp in each real HTML report.

## Automation quality and evidence rules

- Critically review and correct AI-generated scripts.
- Do not change a correct expected result to accommodate a product defect.
- Log genuine bugs in Markdown and on GitHub Issues, with a screenshot for each issue.
- Document unautomated cases and explain why.

## Non-fabrication constraints

- HTML reports must come from real execution and contain the actual student ID plus an ISO timestamp.
- The demo video must be recorded by the student, narrated in Vietnamese, last at least five minutes, demonstrate one script end to end including multi-browser execution and its report, explain at least one human fix, and show face-cam or terminal output from `whoami` and `hostname`.
- Do not generate or claim the demo video on the student's behalf.
- Do not fabricate reports, screenshots, bugs, terminal evidence, or execution results.

## Repository and submission context

- Keep a public GitHub repository with at least eight meaningful commits across at least four days.
- Only commits changing test-script files such as `.spec.js` or `.spec.ts` count toward the eight-commit minimum.
- Do not fabricate or backdate commit history.
- Provide the Git commit log as a text file.
- Submission filename:
  `<StudentID>_HW04_AI_Automation_<SelfAssessedGrade>.zip`
- `SelfAssessedGrade` must be three digits in the range `000` to `100`.

The broader submission package contains artifacts outside this skill's scope. This skill handles only requirements analysis, test design, Playwright code, execution, Playwright HTML reports, and directly related bug evidence.
