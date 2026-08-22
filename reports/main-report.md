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
| `reports/hw06-test-cases.md` | Master test case table | Tổng hợp từng TC ID, file path, audit label, human extension, execution result, evidence. |
| `postman/` | Input artifacts để execute test | Chứa Postman collection, environment và data files. Đặt ở root để CLI/CI path ngắn và dễ chạy. |
| `reports/newman/` | Output evidence từ execution | Chứa Newman HTML/JSON reports, nên đặt dưới `reports/` cùng các evidence/report khác. |
| `reports/bug-reports/` | Bug report Markdown | Mỗi bug report bám template `.github/ISSUE_TEMPLATE/bug-report-template.md`. |

## 3. API 1 - FR-03 `POST /api/reset-password`

### 3.1 Generate with AI

Trạng thái: Đã thực hiện ở Phase 02; raw output đã được human audit ở Phase 03.

| Artifact | Link/ghi chú |
| --- | --- |
| Test case files | `test-cases/hw06-api/fr03-reset-password/` |
| Prompt/output trace | `reports/ai-audit-report.md` Entry #7; prompt framework dựa trên `skills/` và `reports/hw06-execution-plan.md` |
| Raw AI test cases | `reports/ai-generated/fr03-reset-password-raw-test-cases.md` |
| AI audit entry | `reports/ai-audit-report.md` Entry #7 |

Raw generation summary:

| Group | Count | Ghi chú |
| --- | --- | --- |
| Domain | 22 | Cover `email`, `resetToken`, `newPassword` partitions |
| Security | 8 | Cover SEC-05, SEC-07, sensitive data exposure |
| Workflow | 8 | Cover forgot-password setup, token binding/reuse, postcondition login |
| Schema | 8 | Cover JSON content type, message/error shape, no sensitive fields, response time |
| Total | 46 | Đã audit ở Phase 03; xem `reports/hw06-test-cases.md` section 3 |

### 3.2 Human audit

Trạng thái: Đã thực hiện ở Phase 03. Chi tiết audit: `reports/hw06-test-cases.md` section 3.

| Tổng AI cases | VALID | INVALID | INCOMPLETE | Corrected final cases |
| --- | --- | --- | --- | --- |
| 46 | 39 | 1 | 6 | 44 |

### 3.3 Human extension

Trạng thái: Đã thực hiện ở Phase 03. Đã thêm 6 human-authored cases, final FR-03 suite có 50 cases.

| TC ID | Missed case | Expected result | Vì sao AI bỏ sót |
| --- | --- | --- | --- |
| `TC-FR03-API-DOM-023` | `newPassword` empty string | 400, có `message`/`error`, không 5xx | AI thường gộp empty password với too-short password |
| `TC-FR03-API-DOM-024` | Valid password đúng boundary 8 ký tự | 200, có `message`, không trả password/token | AI có case too short và valid dài hơn nhưng bỏ sót exact lower boundary |
| `TC-FR03-API-DOM-025` | `resetToken` có whitespace đầu/cuối | 400, có `message`/`error`, không 5xx | AI kiểm tra whitespace email nhưng bỏ sót whitespace token |
| `TC-FR03-API-WF-007` | Failed reset do weak password không đổi password hiện tại | 400 then old password login 200 | AI tập trung token consumption, bỏ sót postcondition dữ liệu password |
| `TC-FR03-API-SCH-009` | Malformed JSON body | 400, không leak stack trace | AI chủ yếu sinh JSON syntactically valid |
| `TC-FR03-API-SCH-010` | Invalid `Content-Type: text/plain` | 400 hoặc 415, không 5xx | AI kiểm tra success Content-Type nhưng bỏ sót request content-type negative |

### 3.4 Execution with Postman/Newman

Trạng thái: Đã thực hiện ở Phase 04 trên backend `http://localhost:3000`.

| Artifact | Path/link |
| --- | --- |
| Collection | `postman/hw06-fr03-reset-password.postman_collection.json` |
| Environment | `postman/hw06-local.postman_environment.json` |
| Case data/traceability file | `postman/data/hw06-fr03-reset-password.data.json` |
| Newman HTML report | `reports/newman/hw06-fr03-reset-password.html` |
| Newman JSON report | `reports/newman/hw06-fr03-reset-password.json` |
| Newman CLI output | `reports/newman/hw06-fr03-reset-password-cli.txt` |
| `X-Student-Id` evidence | 50/50 request item có static header `X-Student-Id: {{studentId}}`; collection-level pre-request script vẫn upsert header `X-Student-Id=23127475`; Newman CLI output logs `[HW06] ... X-Student-Id=23127475` for executed requests. |

Execution summary:

| Metric | Value |
| --- | --- |
| Final test cases | 50 |
| Executed test cases | 50 |
| Passed test cases | 36 |
| Failed test cases | 14 |
| Newman requests | 136 executed, 0 failed |
| Newman assertions | 218 executed, 20 failed |
| Confirmed bugs | 3 |

Newman exit code là `1` vì assertion failures từ SUT behavior. Không có request failure hoặc script failure trong run chính.

### 3.5 Bugs found

Trạng thái: Đã xác nhận 3 bug qua Newman evidence và đã tạo GitHub Issue sau khi sinh viên approve.

| Bug ID | Related TC | GitHub Issue | Evidence |
| --- | --- | --- | --- |
| `BUG-FR03-API-001` | `TC-FR03-API-DOM-015` đến `DOM-023`, `SEC-004`, `WF-006`, `WF-007` | [#268](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/268) | `reports/bug-reports/BUG-FR03-API-001.md`, Newman HTML/JSON/CLI |
| `BUG-FR03-API-002` | `TC-FR03-API-SEC-008` | [#269](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/269) | `reports/bug-reports/BUG-FR03-API-002.md`, Newman HTML/JSON/CLI |
| `BUG-FR03-API-003` | `TC-FR03-API-SCH-010` | [#270](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/270) | `reports/bug-reports/BUG-FR03-API-003.md`, Newman HTML/JSON/CLI |

## 4. API 2 - FR-09 `POST /api/apply-coupon`

### 4.1 Generate with AI

Trạng thái: Chưa thực hiện, sẽ làm ở Phase 05.

| Artifact | Link/ghi chú |
| --- | --- |
| Test case files | `test-cases/hw06-api/fr09-apply-coupon/` |
| Prompt/output trace | Chưa có |
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
| Prompt/output trace | Chưa có |
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

Trạng thái: Đã dùng cho FR-03; các API còn lại sẽ cập nhật ở phase tương ứng.

| Feature | Đã dùng? | Evidence/ghi chú |
| --- | --- | --- |
| Collections | Có | `postman/hw06-fr03-reset-password.postman_collection.json` |
| Environments | Có | `postman/hw06-local.postman_environment.json` |
| Environment variables | Có | `baseUrl`, `studentId`, generated email/token variables trong environment/runtime |
| Collection variables | Có | `collectionRunId` và helper values dùng trong pre-request setup |
| Pre-request scripts | Có | Setup blackbox bằng API: register, forgot-password, reset-password/login verification; upsert `X-Student-Id` |
| Test scripts/assertions | Có | Status, schema/message/error shape, sensitive-field leak, token reuse, password postcondition, response time |
| Data-driven runs | Một phần | `postman/data/hw06-fr03-reset-password.data.json` dùng làm case map/traceability; FR-03 collection chạy stateful per item thay vì Newman iteration-data để tránh token state nhiễu nhau |
| Newman CLI | Có | `reports/newman/hw06-fr03-reset-password-cli.txt` |
| HTML/JSON reporters | Có | `reports/newman/hw06-fr03-reset-password.html`, `reports/newman/hw06-fr03-reset-password.json` |
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

Bug report rule: khi phát hiện bug thật, tạo Markdown bug report trong `reports/bug-reports` theo template `.github/ISSUE_TEMPLATE/bug-report-template.md`. GitHub Issue chỉ tạo sau khi sinh viên review bug report và yêu cầu tạo issue; sau đó cập nhật URL thật vào report.

| Bug ID | Endpoint | Requirement | Severity/Priority | GitHub Issue | Evidence |
| --- | --- | --- | --- | --- | --- |
| `BUG-FR03-API-001` | `POST /api/reset-password` | FR-03, FR-01, SEC-07 | Major/P1 | [#268](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/268) | `reports/bug-reports/BUG-FR03-API-001.md`; `reports/newman/hw06-fr03-reset-password.html` |
| `BUG-FR03-API-002` | `POST /api/forgot-password` setup for reset flow | FR-03, SEC-07 | Major/P1 | [#269](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/269) | `reports/bug-reports/BUG-FR03-API-002.md`; `reports/newman/hw06-fr03-reset-password.html` |
| `BUG-FR03-API-003` | `POST /api/reset-password` | FR-03, SEC-05 | Major/P2 | [#270](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/270) | `reports/bug-reports/BUG-FR03-API-003.md`; `reports/newman/hw06-fr03-reset-password.html` |

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

Trạng thái: Đã có số liệu execution cho FR-03; FR-09 và FR-17 chưa thực hiện.

| API | Generated cases | Human added cases | Final cases | Executed | Passed | Failed | Bugs |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FR-03 `POST /api/reset-password` | 46 | 6 | 50 | 50 | 36 | 14 | 3 |
| FR-09 `POST /api/apply-coupon` | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |
| FR-17 `POST /api/admin/coupons` | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |
| Total | 46 | 6 | 50 | 50 | 36 | 14 | 3 |

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
| Postman collections | Có FR-03 | `postman/hw06-fr03-reset-password.postman_collection.json` |
| Postman environment/data files | Có FR-03 | `postman/hw06-local.postman_environment.json`, `postman/data/hw06-fr03-reset-password.data.json` |
| Newman HTML reports | Có FR-03 | `reports/newman/hw06-fr03-reset-password.html` |
| Postman feature list | Có FR-03 | Section 6 |
| CI/CD report | Chưa có | Section 7 |
| Excel/test case table | Đang cập nhật; FR-03 completed | `reports/hw06-test-cases.md`, `test-cases/hw06-api/` |
| AI test-generator diagram/pseudocode | Draft | `ai-test-generator-design.md` |
| Bug reports/GitHub Issues | Có 3 bug reports FR-03 và 3 GitHub Issues | `reports/bug-reports/`, #268, #269, #270 |
| AI Critique | Chưa có | Section 10 |
| AI Audit Report | Đang làm | `reports/ai-audit-report.md` |
| Git commit log | Chưa có | Chưa có |
| README self-assessment | Chưa có | Chưa có |
