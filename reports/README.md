# HW04 AI Automation Testing - Submission README

## Student Information

| Field | Value |
| --- | --- |
| Student name | Ngô Hồng Thanh |
| Student ID | 23127475 |
| Class / Course | CS423 / CSC13003 |
| Assignment | HW04 - AI Automation Testing |
| SUT | EShop - Vietnamese e-commerce demo application |
| Automation framework | Playwright Test |
| Test language | TypeScript |
| AI tool used | Codex |
| Repository branch | `hw04/23127475` |

## Self-Assessment

| No. | Criteria | Grade | Self-Assessed Grade |
| --- | --- | ---: | ---: |
| 1 | Task 1 - Feature A | 25 | 25 |
| 1 | Task 1 - Feature B | 25 | 25 |
| 1 | Task 1 - Feature C | 25 | 25 |
| 2 | Task 2 - Demo video | 15 | 15 |
| 3 | Agent Skills | 10 | 10 |
|   | Total | 100 | 100 |

## Test Summary Report

| Metric | Value |
| --- | ---: |
| Number of features automated | 3 |
| Number of unique test cases automated | 55 |
| Number of browser runs | 9 |
| Number of executed test instances | 165 |
| Number of passed test instances | 99 |
| Number of failed test instances | 66 |
| Number of automation bug reports | 11 |

## Feature-Level Summary

| Feature | Pool | Unique test cases | Browser runs | Executed | Passed | Failed | Bug reports |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| FR-03 - Forgot password and password reset | A | 18 | 3 | 54 | 21 | 33 | 6 |
| FR-11 - Order history view | B | 15 | 3 | 45 | 39 | 6 | 2 |
| FR-14 - Category management CRUD | C | 22 | 3 | 66 | 39 | 27 | 3 |
| **Total** |  | **55** | **9** | **165** | **99** | **66** | **11** |

## Browser Coverage

Each selected feature was executed on:

- Chromium
- Firefox
- WebKit

HTML reports are stored under [`reports/html/`](html/). Each browser report has a `hw04-report.html` wrapper showing `Run by: 23127475`, feature name, browser, total tests, passed tests, and failed tests.

## Main Deliverables

| Deliverable | Path |
| --- | --- |
| Main report | [`reports/main-report.md`](main-report.md) |
| AI audit report | [`reports/ai-audit-report.md`](ai-audit-report.md) |
| AI critique | [`reports/ai-critique.md`](ai-critique.md) |
| Demo video script | [`reports/video-demo-script.md`](video-demo-script.md) |
| Automation test scripts | [`tests/automation/specs/`](../tests/automation/specs/) |
| Automation test data | [`tests/automation/data/`](../tests/automation/data/) |
| HTML reports | [`reports/html/`](html/) |
| JSON results | [`reports/results/`](results/) |
| Bug reports | [`bug-reports/automation/`](../bug-reports/automation/) |
| Commit plan | [`reports/automation-commit-plan.md`](automation-commit-plan.md) |

## Demo Video Link

Link video demo end-to-end: [https://youtu.be/LFFgFHookvI](https://youtu.be/LFFgFHookvI)

## Bug Summary

| Feature | Bug report count | GitHub Issues |
| --- | ---: | --- |
| FR-03 | 6 | #214, #215, #216, #217, #218, #219 |
| FR-11 | 2 | #239, #240 |
| FR-14 | 3 | #241, #242, #243 |

All automation bug reports are available in [`bug-reports/automation/`](../bug-reports/automation/), with Playwright report links and evidence paths.
