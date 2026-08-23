# HW06 API Testing - README

## 1. Thông Tin Nộp Bài

| Mục | Giá trị |
| --- | --- |
| Bài tập | HW06 - API Testing |
| SUT | EShop |
| Student ID | `23127475` |
| Cách tiếp cận testing | Blackbox API testing |
| Public GitHub repository | https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/tree/hw06/23127475 |
| Main report | `reports/main-report.md` |
| Test case master report | `reports/hw06-test-cases.md` |
| AI Critique | `reports/ai-critique.md` |
| AI Audit Report | `reports/ai-audit-report.md` |

README này chứa self-assessment table và Test Summary Report theo yêu cầu của HW06. Cấu trúc Test Summary Report được rút gọn theo các phần thường dùng trong mẫu của SoftwareTestingHelp: mục tiêu, tổng quan ứng dụng, phạm vi testing, metrics, loại testing, environment/tools, defect summary, exit criteria và conclusion.

## 2. Self-Assessment

| No. | Criteria | Grade | Self-Assessed Grade |
| --- | --- | --- | --- |
| 1 | API 1 - full pipeline (generate + audit + extend + execute + bugs) | 30 | 30 |
| 2 | API 2 - full pipeline (same criteria) | 30 | 30 |
| 3 | API 3 - full pipeline (same criteria) | 30 | 30 |
| 4 | Agent Skills (AI-driven test generator) | 10 | 10 |
| | **Total** | **100** | **100** |

## 3. Test Summary Report

### 3.1 Mục Tiêu

Mục tiêu của test cycle này là đánh giá 3 API được chọn của EShop bằng blackbox API testing. Bộ test kiểm tra domain partitions, workflow/state behavior, security requirements, schema validation, Postman/Newman execution evidence, CI/CD evidence và bug reporting.

### 3.2 Tổng Quan Ứng Dụng

EShop là hệ thống e-commerce có các chức năng dành cho customer và admin. Bài HW06 này tập trung vào API behavior thay vì UI behavior. Expected behavior được suy ra từ `README.md`, `api_specification.md`, FR/SEC requirements và API responses quan sát được. Source code không được dùng để thiết kế test cases hoặc quyết định expected behavior.

### 3.3 Phạm Vi Testing

In scope:

| API | Requirement | Endpoint | Coverage chính |
| --- | --- | --- | --- |
| API 1 | FR-03 Forgot password/reset password | `POST /api/reset-password` | Email/token/password partitions, OTP lifecycle, SEC-07, schema/error response |
| API 2 | FR-09 Discount coupons | `POST /api/apply-coupon` | Coupon conditions C1-C5, calculation, auth/IDOR, schema validation |
| API 3 | FR-17 Coupon management CRUD | `POST /api/admin/coupons` | Admin coupon fields, RBAC, create/list/duplicate/cleanup workflow, schema/content-type |

Out of scope:

| Phạm vi | Lý do |
| --- | --- |
| UI testing | HW06 là API testing. |
| Source-code review | Bài làm tuân thủ blackbox testing rules. |
| Performance/load testing | HW06 không yêu cầu; response-time assertions chỉ được dùng như lightweight schema/runtime checks. |
| Execute FR-10 order state machine | Các FR được phân công là FR-03, FR-09 và FR-17. Workflow/state coverage được áp dụng cho các API đã chọn thay thế. |

### 3.4 Test Metrics

| Metric | Số lượng |
| --- | ---: |
| Số API được test | 3 |
| AI-generated test cases | 146 |
| Human-added test cases | 18 |
| Final test cases | 157 |
| Test cases executed | 157 |
| Test cases passed | 81 |
| Test cases failed | 76 |
| Bugs confirmed | 17 |

Pass/fail rate:

| Metric | Giá trị |
| --- | ---: |
| Execution rate | 100.00% |
| Pass rate | 51.59% |
| Fail rate | 48.41% |

Kết quả theo từng API:

| API | Generated | Added | Final | Executed | Passed | Failed | Bugs |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| FR-03 `POST /api/reset-password` | 46 | 6 | 50 | 50 | 36 | 14 | 3 |
| FR-09 `POST /api/apply-coupon` | 46 | 6 | 51 | 51 | 27 | 24 | 8 |
| FR-17 `POST /api/admin/coupons` | 54 | 6 | 56 | 56 | 18 | 38 | 6 |
| **Total** | **146** | **18** | **157** | **157** | **81** | **76** | **17** |

### 3.5 Các Loại Testing Đã Thực Hiện

| Testing type | Evidence |
| --- | --- |
| Domain partition testing | Field-level positive/negative/boundary cases trong `reports/hw06-test-cases.md` |
| Security testing | Missing/invalid token, wrong role, IDOR, SQLi/XSS, sensitive-field leak checks |
| Workflow/state testing | OTP lifecycle, coupon usage conditions, coupon create/list/duplicate/delete lifecycle |
| Schema validation | Status code, `Content-Type`, required fields, field types, safe error shape, response time |
| Automation execution | Postman collections và Newman HTML/JSON/CLI reports |
| CI/CD testing | GitHub Actions pass, intentional fail và restored pass runs |
| Bug reporting | Markdown bug reports và GitHub Issues #268-#284 |

### 3.6 Test Environment Và Tools

| Mục | Giá trị |
| --- | --- |
| Backend base URL | `http://localhost:3000` |
| API execution tools | Postman, Newman |
| Newman reporters | CLI, HTML Extra, JSON |
| CI/CD | GitHub Actions |
| AI tools | Codex-assisted generation/audit/reporting với human review |
| Required test header | `X-Student-Id: 23127475` |

### 3.7 Defect Summary

| API | Bugs | GitHub Issues |
| --- | ---: | --- |
| FR-03 `POST /api/reset-password` | 3 | #268, #269, #270 |
| FR-09 `POST /api/apply-coupon` | 8 | #271, #272, #273, #274, #275, #276, #277, #278 |
| FR-17 `POST /api/admin/coupons` | 6 | #279, #280, #281, #282, #283, #284 |
| **Total** | **17** | #268-#284 |

Tất cả bug reports được lưu trong `reports/bug-reports/` và tuân theo template `.github/ISSUE_TEMPLATE/bug-report-template.md`.

### 3.8 Exit Criteria

| Criteria | Status | Evidence |
| --- | --- | --- |
| Chọn và test đúng 3 API | Met | FR-03, FR-09, FR-17 |
| Mỗi API có ít nhất 35 final test cases | Met | 50, 51 và 56 final cases |
| Mỗi API có ít nhất 5 human-added cases | Met | 6 added cases/API |
| Execute toàn bộ final cases | Met | 157/157 executed |
| Có Newman evidence | Met | `reports/newman/` |
| Bugs được document kèm evidence | Met | `reports/bug-reports/`, GitHub Issues #268-#284 |
| Có CI/CD pass/fail evidence | Met | GitHub Actions links và `reports/screenshots/` |
| Có AI generator design và pseudocode | Met | `ai-test-generator-design.md`, `AI-Driven-API-Test-Generator.drawio.png` |

### 3.9 Kết Luận

HW06 API testing cycle đã hoàn thành planned blackbox test design, audit, human extension, execution, CI/CD evidence và bug reporting cho 3 API. Tổng cộng 157 final test cases đã được execute, trong đó 81 cases passed và 76 cases failed do các SUT behavior issues đã được xác nhận. Mười bảy bugs đã được document và liên kết với GitHub Issues. Final branch có restored passing CI workflow cho Newman smoke suite, còn full FR-03/FR-09/FR-17 suites vẫn là bug-finding suites với các failing assertions đã được document.

## 4. Key References

| Artifact | Path/link |
| --- | --- |
| Main report | `reports/main-report.md` |
| Test cases | `reports/hw06-test-cases.md`, `test-cases/hw06-api/` |
| Postman collections | `postman/` |
| Newman reports | `reports/newman/` |
| Bug reports | `reports/bug-reports/` |
| AI generator design | `ai-test-generator-design.md` |
| AI critique | `reports/ai-critique.md` |
| AI audit report | `reports/ai-audit-report.md` |
| Test summary report template reference | https://www.softwaretestinghelp.com/test-summary-report-template-download-sample/ |
