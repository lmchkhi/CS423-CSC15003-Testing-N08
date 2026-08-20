# HW06 API Testing Report - EShop

## 1. Thông tin bài làm

| Mục | Giá trị |
| --- | --- |
| Bài tập | HW06 - API Testing |
| SUT | EShop |
| Base URL | `http://localhost:3000` |
| Hình thức kiểm thử | Blackbox API testing |
| Công cụ chính | Postman, Newman, GitHub Actions, Codex |
| Student ID | `23127475` |

Nguyên tắc: mọi test case và expected behavior trong report này được thiết kế từ `README.md`, `api_specification.md`, API responses quan sát được, và evidence thực thi. Không dùng source code backend/frontend để suy ra expected behavior.

## 2. API selection

| Pool | FR | API chính | API phụ dùng setup/verify/cleanup | Lý do chọn |
| --- | --- | --- | --- | --- |
| Pool A | FR-03 Forgot password/reset password | `POST /api/reset-password` | `POST /api/forgot-password` | Có nhiều parameter (`email`, `resetToken`, `newPassword`), cover password complexity, OTP lifecycle, SEC-07, schema/error cases. |
| Pool B | FR-09 Discount coupons | `POST /api/apply-coupon` | Login user, checkout/order setup nếu cần | Cover C1-C5, `code`, `total_amount`, `user_id`, discount calculation, auth/IDOR risk, schema `discount_amount`/`final_amount`. |
| Pool C | FR-17 Coupon management CRUD | `POST /api/admin/coupons` | `GET /api/coupons`, `DELETE /api/admin/coupons/:id`, admin/user login | Có nhiều input để domain partition và cover admin RBAC SEC-02/SEC-03. |

Ghi chú: các FR được phân không chứa FR-10 order state machine, nên state/workflow coverage sẽ dùng lifecycle phù hợp với API đã chọn: OTP lifecycle, coupon conditions/usage, và coupon CRUD lifecycle.

## 2.1 Artifact layout

| Path | Vai trò | Ghi chú |
| --- | --- | --- |
| `test-cases/hw06-api/` | Test case design chi tiết | Mỗi final test case có một file Markdown riêng, dùng template `TEMPLATE-HW06-API-TEST-CASE.md`. |
| `reports/hw06-test-cases.md` | Master index/summary | Tổng hợp TC ID, file path, audit label, execution result, evidence. |
| `postman/` | Input artifacts để execute test | Chứa Postman collection, environment và data files. Đặt ở root để CLI/CI path ngắn và dễ chạy. |
| `reports/newman/` | Output evidence từ execution | Chứa Newman HTML/JSON reports, nên đặt dưới `reports/` cùng các evidence/report khác. |
| `reports/bug-reports/` | Bug report Markdown | Mỗi bug report bám template `.github/ISSUE_TEMPLATE/bug-report-template.md`. |

## 3. API 1 - FR-03 `POST /api/reset-password`

### 3.1 Generate with AI

Trạng thái: Chưa thực hiện, sẽ làm ở Phase 02.

| Artifact | Link/ghi chú |
| --- | --- |
| Test case files | `test-cases/hw06-api/fr03-reset-password/` |
| Prompt sequence | Chưa có |
| Raw AI test cases | Chưa có |
| AI audit entry | Chưa có |

### 3.2 Human audit

Trạng thái: Chưa thực hiện, sẽ làm ở Phase 03.

| Tổng AI cases | VALID | INVALID | INCOMPLETE | Corrected final cases |
| --- | --- | --- | --- | --- |
| Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |

### 3.3 Human extension

Trạng thái: Chưa thực hiện, sẽ làm ở Phase 03.

| TC ID | Missed case | Expected result | Vì sao AI bỏ sót |
| --- | --- | --- | --- |
| Chưa có | Chưa có | Chưa có | Chưa có |

### 3.4 Execution with Postman/Newman

Trạng thái: Chưa thực hiện, sẽ làm ở Phase 04.

| Artifact | Path/link |
| --- | --- |
| Collection | Chưa có |
| Environment | Chưa có |
| Iteration data | Chưa có |
| Newman HTML report | Chưa có |
| Newman JSON report | Chưa có |
| `X-Student-Id` evidence | Chưa có |

### 3.5 Bugs found

Trạng thái: Chưa có bug đã xác nhận.

| Bug ID | Related TC | GitHub Issue | Evidence |
| --- | --- | --- | --- |
| Chưa có | Chưa có | Chưa có | Chưa có |

## 4. API 2 - FR-09 `POST /api/apply-coupon`

### 4.1 Generate with AI

Trạng thái: Chưa thực hiện, sẽ làm ở Phase 05.

| Artifact | Link/ghi chú |
| --- | --- |
| Test case files | `test-cases/hw06-api/fr09-apply-coupon/` |
| Prompt sequence | Chưa có |
| Raw AI test cases | Chưa có |
| AI audit entry | Chưa có |

### 4.2 Human audit

Trạng thái: Chưa thực hiện, sẽ làm ở Phase 06.

| Tổng AI cases | VALID | INVALID | INCOMPLETE | Corrected final cases |
| --- | --- | --- | --- | --- |
| Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |

### 4.3 Human extension

Trạng thái: Chưa thực hiện, sẽ làm ở Phase 06.

| TC ID | Missed case | Expected result | Vì sao AI bỏ sót |
| --- | --- | --- | --- |
| Chưa có | Chưa có | Chưa có | Chưa có |

### 4.4 Execution with Postman/Newman

Trạng thái: Chưa thực hiện, sẽ làm ở Phase 07.

| Artifact | Path/link |
| --- | --- |
| Collection | Chưa có |
| Environment | Chưa có |
| Iteration data | Chưa có |
| Newman HTML report | Chưa có |
| Newman JSON report | Chưa có |
| `X-Student-Id` evidence | Chưa có |

### 4.5 Bugs found

Trạng thái: Chưa có bug đã xác nhận.

| Bug ID | Related TC | GitHub Issue | Evidence |
| --- | --- | --- | --- |
| Chưa có | Chưa có | Chưa có | Chưa có |

## 5. API 3 - FR-17 `POST /api/admin/coupons`

### 5.1 Generate with AI

Trạng thái: Chưa thực hiện, sẽ làm ở Phase 08.

| Artifact | Link/ghi chú |
| --- | --- |
| Test case files | `test-cases/hw06-api/fr17-admin-coupons/` |
| Prompt sequence | Chưa có |
| Raw AI test cases | Chưa có |
| AI audit entry | Chưa có |

### 5.2 Human audit

Trạng thái: Chưa thực hiện, sẽ làm ở Phase 09.

| Tổng AI cases | VALID | INVALID | INCOMPLETE | Corrected final cases |
| --- | --- | --- | --- | --- |
| Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |

### 5.3 Human extension

Trạng thái: Chưa thực hiện, sẽ làm ở Phase 09.

| TC ID | Missed case | Expected result | Vì sao AI bỏ sót |
| --- | --- | --- | --- |
| Chưa có | Chưa có | Chưa có | Chưa có |

### 5.4 Execution with Postman/Newman

Trạng thái: Chưa thực hiện, sẽ làm ở Phase 10.

| Artifact | Path/link |
| --- | --- |
| Collection | Chưa có |
| Environment | Chưa có |
| Iteration data | Chưa có |
| Newman HTML report | Chưa có |
| Newman JSON report | Chưa có |
| `X-Student-Id` evidence | Chưa có |

### 5.5 Bugs found

Trạng thái: Chưa có bug đã xác nhận.

| Bug ID | Related TC | GitHub Issue | Evidence |
| --- | --- | --- | --- |
| Chưa có | Chưa có | Chưa có | Chưa có |

## 6. Postman features used

Trạng thái: Chưa thực hiện, sẽ cập nhật sau khi tạo và chạy collection.

| Feature | Đã dùng? | Evidence/ghi chú |
| --- | --- | --- |
| Collections | Chưa | Chưa có |
| Environments | Chưa | Chưa có |
| Environment variables | Chưa | Chưa có |
| Collection variables | Chưa | Chưa có |
| Pre-request scripts | Chưa | Chưa có |
| Test scripts/assertions | Chưa | Chưa có |
| Data-driven runs | Chưa | Chưa có |
| Newman CLI | Chưa | Chưa có |
| HTML/JSON reporters | Chưa | Chưa có |
| GitHub Actions CI | Chưa | Chưa có |
| Workspaces | Chưa | Chưa có |
| Monitors/mock servers | Chưa | Optional |

## 7. CI/CD report

Trạng thái: Chưa thực hiện, sẽ làm ở Phase 11-13.

| Run type | Commit | Workflow URL | Result | Screenshot/evidence | Notes |
| --- | --- | --- | --- | --- | --- |
| Passing run | Chưa có | Chưa có | Chưa có | Chưa có | Phase 11 |
| Intentional failing run | Chưa có | Chưa có | Chưa có | Chưa có | Phase 12 |
| Restored passing run | Chưa có | Chưa có | Chưa có | Chưa có | Phase 13 |

## 8. Bug reports

Bug report rule: khi phát hiện bug thật, tạo Markdown bug report trong `reports/bug-reports` theo template `.github/ISSUE_TEMPLATE/bug-report-template.md`, sau đó tạo GitHub Issue và cập nhật URL thật vào report.

| Bug ID | Endpoint | Requirement | Severity/Priority | GitHub Issue | Evidence |
| --- | --- | --- | --- | --- | --- |
| Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |

## 9. AI-driven test generator design

Trạng thái: Đã có file thiết kế ban đầu `ai-test-generator-design.md`, sẽ review/finalize ở Phase 15.

| Artifact | Path/link | Status |
| --- | --- | --- |
| Design document | `ai-test-generator-design.md` | Draft |
| Pseudocode | `ai-test-generator-design.md` | Draft |
| Self-drawn diagram | Chưa có final image | Chưa hoàn tất |
| Demo video | Chưa có | Optional |

## 10. AI critique

Trạng thái: Chưa thực hiện, sẽ viết ở Phase 15.

Yêu cầu: 200-300 words, nêu AI sai/incomplete ở đâu, vì sao fail, và bài học khi collaborate với AI.

## 11. AI Audit Report

AI Audit Report được lưu tại `reports/ai-audit-report.md` và sẽ được cập nhật sau mỗi lượt AI hỗ trợ HW06.

| Artifact | Path | Status |
| --- | --- | --- |
| AI Audit Report | `reports/ai-audit-report.md` | Đang cập nhật |

## 12. Test summary

Trạng thái: Chưa có số liệu execution.

| API | Generated cases | Human added cases | Final cases | Executed | Passed | Failed | Bugs |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR-03 `POST /api/reset-password` | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |
| FR-09 `POST /api/apply-coupon` | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |
| FR-17 `POST /api/admin/coupons` | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |
| Total | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |

## 13. Self-assessment

| No. | Criteria | Grade | Self-assessed grade | Evidence |
| --- | --- | --- | --- | --- |
| 1 | API 1 - full pipeline | 30 | Chưa chấm | Chưa có |
| 2 | API 2 - full pipeline | 30 | Chưa chấm | Chưa có |
| 3 | API 3 - full pipeline | 30 | Chưa chấm | Chưa có |
| 4 | Agent Skills / AI-driven generator | 10 | Chưa chấm | `skills/`, `ai-test-generator-design.md` |
| | Total | 100 | Chưa chấm | Chưa có |

## 14. Submission checklist

| Deliverable | Status | Path/link |
| --- | --- | --- |
| Main report Markdown | Đang làm | `reports/main-report.md` |
| Main report PDF | Chưa có | Chưa có |
| Public GitHub repository link | Chưa có | Chưa có |
| Postman collections | Chưa có | Chưa có |
| Postman environment/data files | Chưa có | Chưa có |
| Newman HTML reports | Chưa có | Chưa có |
| Postman feature list | Chưa có | Section 6 |
| CI/CD report | Chưa có | Section 7 |
| Excel/test case table | Skeleton | `reports/hw06-test-cases.md`, `test-cases/hw06-api/` |
| AI test-generator diagram/pseudocode | Draft | `ai-test-generator-design.md` |
| Bug reports/GitHub Issues | Chưa có bug xác nhận | `reports/bug-reports/` |
| AI Critique | Chưa có | Section 10 |
| AI Audit Report | Đang làm | `reports/ai-audit-report.md` |
| Git commit log | Chưa có | Chưa có |
| README self-assessment | Chưa có | Chưa có |
