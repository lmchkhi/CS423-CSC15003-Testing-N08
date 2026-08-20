# HW06 Report Templates

Dùng các bảng này trong Markdown report và supporting files.

## API Selection

| Pool | Feature | Endpoint | Lý do chọn | Kiểm tra trùng teammate |
| --- | --- | --- | --- | --- |
| A | | | | |
| B | | | | |
| C | | | | |

## AI Prompt Log Entry

| Field | Content |
| --- | --- |
| Tool | |
| Date/Time | |
| Mục đích | |
| Prompt | |
| Output Summary | |
| Full Output Link/File | |
| Human Review Notes | |

## Test Case Table

Mỗi test case chi tiết nên có file riêng trong `test-cases/hw06-api/<api-slug>/`. File `reports/hw06-test-cases.md` là index/summary.

Naming convention: `TC-FR<id>-API-<GROUP>-<NNN>.md`, ví dụ `TC-FR03-API-DOM-001.md`, `TC-FR09-API-SEC-001.md`, `TC-FR17-API-SCH-001.md`.

| TC ID | File | Source | Group | Description | Preconditions | Request/Input | Expected Status | Expected Fields/Assertions | Rationale |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | `test-cases/hw06-api/<api-slug>/TC-...md` | AI / Human | DOM / SEC / WF / SCH | | | | | | |

## Test Case File Template

Tham khảo `test-cases/hw06-api/TEMPLATE-HW06-API-TEST-CASE.md`. Mỗi file nên có:

- Requirement ID.
- API / Test type / Technique.
- Blackbox basis.
- Domain / Security / Workflow analysis.
- Preconditions.
- Test data.
- Test steps.
- Expected result.
- Postman/Newman mapping.
- AI audit / Human review.
- Status / Related bugs.

## AI Audit Table

| TC ID | Vấn đề trong AI Output | Label | Human Reasoning | Correction |
| --- | --- | --- | --- | --- |
| | | VALID / INVALID / INCOMPLETE | | |

## Human Extension Table

| TC ID | Missed Case | Expected Result | Vì sao AI bỏ sót |
| --- | --- | --- | --- |
| | | | Prompt gap / model limitation / state setup complexity / API-specific behavior |

## Execution Summary

| API | Generated | Valid After Audit | Human Added | Executed | Passed | Failed | Bugs |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | |

## Postman Feature List

| Feature | Đã dùng? | Evidence / Note |
| --- | --- | --- |
| Collections | | |
| Environments | | |
| Environment variables | | |
| Collection variables | | |
| Pre-request scripts | | |
| Test scripts/assertions | | |
| Data-driven runs | | |
| Newman CLI | | |
| HTML/JSON reporters | | |
| Workspaces | | |
| Monitors | | |
| Mock servers | | |

## Bug Report

Tạo mỗi bug report Markdown trong `reports/bug-reports` và bám template `.github/ISSUE_TEMPLATE/bug-report-template.md`.

| Field | Content |
| --- | --- |
| Bug ID | |
| Title | |
| Endpoint | |
| Severity | |
| Preconditions | |
| Steps to reproduce | |
| Expected Result | |
| Actual Result | |
| Evidence | GitHub Issue URL + screenshot path |
| Related Test Case | |

## CI/CD Report

| Run Type | Commit | Workflow URL | Result | Screenshot | Notes |
| --- | --- | --- | --- | --- | --- |
| Pass | | | | | |
| Intentional Fail | | | | | |
| Restored Pass | | | | | |

## Self-Assessment

| No. | Criteria | Grade | Self-Assessed Grade | Evidence |
| --- | --- | --- | --- | --- |
| 1 | API 1 full pipeline | 30 | | |
| 2 | API 2 full pipeline | 30 | | |
| 3 | API 3 full pipeline | 30 | | |
| 4 | Agent Skills / AI-driven generator | 10 | | |
| | Total | 100 | | |
