# HW06 API Testing Execution Plan

## 1. Skill readiness

Bộ skill hiện tại đã đủ để thực hiện HW06 end-to-end:

| Skill | Vai trò trong HW06 | Kết luận |
| --- | --- | --- |
| `$hw06-api-testing` | Điều phối toàn bộ pipeline, checklist nộp bài, report template, quy tắc blackbox | Đủ |
| `$eshop-api-test-generator` | Sinh test cases theo domain partitions, security, state/workflow, schema validation | Đủ |
| `$postman-newman-api-runner` | Tạo Postman collection/environment/data, Newman command/report, CI workflow | Đủ |
| `$gh-create-bug-issues` | Tạo bug report theo `.github/ISSUE_TEMPLATE/bug-report-template.md`, đặt ở `reports/bug-reports`; tạo GitHub Issues chỉ sau khi sinh viên approve | Đủ |
| `$hw06-ai-audit-log` | Ghi AI Audit Report sau mỗi lượt AI hỗ trợ HW06 | Đủ |

Nguyên tắc chung: chỉ làm blackbox testing. Không đọc source code backend/frontend để suy ra expected behavior hoặc test case.

## 2. Selected APIs

| Pool | FR được phân | API chính được chọn | API phụ dùng setup/verify | Lý do chọn |
| --- | --- | --- | --- | --- |
| Pool A | FR-03 Forgot password/reset password | `POST /api/reset-password` | `POST /api/forgot-password` để lấy `resetToken` | Phù hợp nhất vì có nhiều parameter: `email`, `resetToken`, `newPassword`; cover password complexity, OTP lifecycle, SEC-07, schema/error cases. |
| Pool B | FR-09 Discount coupons | `POST /api/apply-coupon` | Login user, checkout/order setup nếu cần kiểm tra usage count | Phù hợp nhất vì cover đủ coupon conditions C1-C5, `code`, `total_amount`, `user_id`, discount calculation, auth/IDOR risk, schema `discount_amount`/`final_amount`. |
| Pool C | FR-17 Coupon management CRUD | `POST /api/admin/coupons` | `GET /api/coupons`, `DELETE /api/admin/coupons/:id`, admin/user login | Phù hợp nhất vì có nhiều input để domain partition: `code`, `type`, `discount_value`, `min_order_amount`, `expired_at`, `max_uses_per_user`; cover admin RBAC SEC-02/SEC-03 và schema. |

Ghi chú về state transitions: bộ FR được phân không chứa FR-10 order state machine, nên state coverage sẽ tập trung vào lifecycle/state phù hợp với từng API: OTP requested -> reset success -> token used/invalid; coupon active/expired/usage-limit; coupon CRUD create -> visible -> duplicate rejected -> cleanup/delete. Nếu giảng viên yêu cầu literal FR-10, cần xin đổi/chọn thêm order API; với phân công hiện tại, không tự thêm API ngoài FR-03/09/17.

## 3. Commit/phase plan

Mỗi phase tương ứng một commit. Commit message có thể dùng theo cột `Commit message`.

Artifact layout chủ đích:

- `postman/` nằm ở root repo vì đây là input artifacts để chạy test: collection, environment, iteration data.
- `reports/newman/` nằm trong `reports/` vì đây là output evidence/report do Newman sinh ra sau execution.
- `test-cases/hw06-api/` chứa per-test-case Markdown files để dễ đọc/review; `reports/hw06-test-cases.md` là master table theo từng test case, đồng thời chứa audit summary và human extension tracking.
- `reports/bug-reports/` chứa bug report Markdown theo template GitHub Issue của repo.

| Phase | Commit message | Công việc chính | Artifacts/evidence |
| --- | --- | --- | --- |
| 00 | `chore(hw06): setup skills and execution plan` | Hoàn thiện bộ skills, tạo file plan này, xác nhận API selection FR-03/09/17 | `skills/`, `reports/hw06-execution-plan.md`, `reports/ai-audit-report.md` |
| 01 | `docs(hw06): select APIs and prepare report skeleton` | Tạo skeleton main report, test case index/template, Postman folder layout, bug report folder | `reports/main-report.md`, `reports/hw06-test-cases.md`, `test-cases/hw06-api/`, `reports/bug-reports/`, `postman/`, `reports/newman/` |
| 02 | `test(hw06-fr03): generate reset-password API cases` | Dùng `$eshop-api-test-generator` sinh >=35 AI cases cho `POST /api/reset-password`; log prompt/output trong AI audit | AI audit entry, raw AI test case table cho FR-03 |
| 03 | `test(hw06-fr03): audit and extend reset-password cases` | Audit mọi AI case thành `VALID/INVALID/INCOMPLETE`, sửa case lỗi, thêm >=5 human cases | Final FR-03 test cases, audit table, extension table |
| 04 | `test(hw06-fr03): implement run and report reset-password tests` | Tạo collection/data cho FR-03, chạy Newman, phân loại failures, tạo bug report Markdown nếu có bug thật; chưa tạo GitHub Issue | `postman/hw06-fr03-reset-password.*`, Newman HTML/JSON, `reports/bug-reports/BUG-FR03-*.md` nếu có |
| 05 | `test(hw06-fr09): generate apply-coupon API cases` | Sinh >=35 AI cases cho `POST /api/apply-coupon`, cover C1-C5, calculation, auth/IDOR/security/schema | AI audit entry, raw AI test case table cho FR-09 |
| 06 | `test(hw06-fr09): audit and extend apply-coupon cases` | Audit toàn bộ FR-09 cases, sửa invalid/incomplete, thêm >=5 human cases | Final FR-09 test cases, audit table, extension table |
| 07 | `test(hw06-fr09): implement run and report apply-coupon tests` | Tạo collection/data, chạy Newman, phân loại failures, tạo bug report Markdown nếu có bug thật; chưa tạo GitHub Issue | `postman/hw06-fr09-apply-coupon.*`, Newman reports, `reports/bug-reports/BUG-FR09-*.md` nếu có |
| 08 | `test(hw06-fr17): generate admin coupon API cases` | Sinh >=35 AI cases cho `POST /api/admin/coupons`, cover domain/security/admin/schema | AI audit entry, raw AI test case table cho FR-17 |
| 09 | `test(hw06-fr17): audit and extend admin coupon cases` | Audit FR-17 cases, sửa case, thêm >=5 human cases, định nghĩa cleanup bằng DELETE nếu cần | Final FR-17 test cases, audit table, extension table |
| 10 | `test(hw06-fr17): implement run and report admin-coupon tests` | Tạo collection/data, chạy Newman, cleanup created coupons, phân loại failures, tạo bug report Markdown nếu có bug thật; chưa tạo GitHub Issue | `postman/hw06-fr17-admin-coupons.*`, Newman reports, `reports/bug-reports/BUG-FR17-*.md` nếu có |
| 11 | `ci(hw06): add Newman API test workflow passing run` | Tạo GitHub Actions workflow chạy backend + Newman; push để có passing run | `.github/workflows/newman-api-test.yml`, CI pass screenshot/link |
| 12 | `ci(hw06): capture intentional failing Newman run` | Đổi một `expectedStatus` có chủ đích để CI fail, push và lưu evidence | CI fail screenshot/link, note giá trị đã đổi |
| 13 | `ci(hw06): restore Newman expectations after fail demo` | Khôi phục expected value đúng để final branch pass | CI restored pass screenshot/link |
| 14 | `docs(hw06): create approved GitHub bug issues` | Approval-gated: chỉ tạo GitHub Issues khi sinh viên review/đồng ý bug reports | GitHub Issue URLs cập nhật vào bug reports và main report |
| 15 | `docs(hw06): finalize AI generator design and critique` | Hoàn thiện `ai-test-generator-design.md`, pseudocode, self-drawn diagram, AI Critique 200-300 words | Diagram PNG/Mermaid, pseudocode, AI Critique |
| 16 | `docs(hw06): finalize report, audit log, and submission package` | Hoàn thiện main report, AI Audit Report, Git commit log, README self-assessment, test summary, zip checklist | Final Markdown/PDF reports, commit log, README, submission checklist |

## 4. Detailed phase guide

### Phase 00 - `chore(hw06): setup skills and execution plan`

Mục tiêu: tạo nền làm bài và chốt scope trước khi sinh test.

Việc cần làm:

- Kiểm tra 5 skill trong `skills/` đã có đủ: điều phối HW06, generator, Postman/Newman, GitHub bug issues, AI audit log.
- Kiểm tra skill bug report đã ghi rõ bug report phải đặt trong `reports/bug-reports`.
- Tạo và review file plan `reports/hw06-execution-plan.md`.
- Chốt 3 API chính: FR-03 `POST /api/reset-password`, FR-09 `POST /api/apply-coupon`, FR-17 `POST /api/admin/coupons`.
- Ghi AI audit entry cho lượt setup/plan.

Files/artifacts:

- `skills/`
- `reports/hw06-execution-plan.md`
- `reports/ai-audit-report.md`

Kiểm tra trước commit:

- `reports/hw06-execution-plan.md` có bảng selected APIs, phase/commit plan, coverage checklist, bug handling rule.
- Không có plan nào yêu cầu đọc source code để sinh expected behavior.
- YAML frontmatter của skill parse được.

Không làm trong phase này:

- Chưa generate test cases.
- Chưa tạo Postman collection thật.
- Chưa tạo bug report nếu chưa có bug/evidence.

### Phase 01 - `docs(hw06): select APIs and prepare report skeleton`

Mục tiêu: chuẩn bị cấu trúc report và thư mục artifact để các phase sau chỉ điền nội dung.

Việc cần làm:

- Tạo hoặc cập nhật `reports/main-report.md` với các section chính: API selection, AI generation, human audit, human extension, execution result, bug report, Postman features, CI/CD, AI critique, self-assessment.
- Tạo folder `reports/bug-reports` để lưu bug report Markdown theo template `.github/ISSUE_TEMPLATE/bug-report-template.md`.
- Tạo folder `reports/newman` cho Newman HTML/JSON reports.
- Tạo folder `postman/data` cho iteration data.
- Tạo folder `test-cases/hw06-api` cho per-test-case Markdown files.
- Tạo template `test-cases/hw06-api/TEMPLATE-HW06-API-TEST-CASE.md` dựa trên sample `test-cases/TC-FR03-DT-001.md` nhưng điều chỉnh cho API testing: thêm method/endpoint, headers/body/query, expected status, schema assertions, Postman/Newman mapping, audit label.
- Tạo bảng test case master/index trong `reports/hw06-test-cases.md`: API, TC ID, file, source, group, request/input, expected status, assertions, audit label.
- Ghi rõ trong report rằng đây là blackbox testing và API được chọn theo FR-03/09/17.

Files/artifacts:

- `reports/main-report.md`
- `reports/bug-reports/`
- `reports/newman/`
- `postman/`
- `postman/data/`
- `test-cases/hw06-api/`
- `test-cases/hw06-api/TEMPLATE-HW06-API-TEST-CASE.md`

Kiểm tra trước commit:

- Report skeleton có đủ heading cho 3 API.
- `reports/bug-reports` tồn tại.
- `test-cases/hw06-api` có template và folder con cho FR-03/FR-09/FR-17.
- Chưa có evidence giả hoặc placeholder bị trình bày như kết quả thật.

Không làm trong phase này:

- Không tạo GitHub Issue.
- Không chạy Newman nếu chưa có collection/data.

### Phase 02 - `test(hw06-fr03): generate reset-password API cases`

Mục tiêu: dùng AI sinh raw test cases cho FR-03.

Việc cần làm:

- Chuẩn bị prompt theo từng lượt cho `POST /api/reset-password`: endpoint metadata, domain partitions, security, workflow/state, schema.
- Đưa blackbox inputs: API spec body `email`, `resetToken`, `newPassword`; FR-03 reset password; SEC-07 OTP; password complexity từ FR-01.
- Nói rõ `POST /api/forgot-password` chỉ là setup API để lấy `resetToken`.
- Yêu cầu AI không invent field `confirmPassword` cho API vì API spec không liệt kê field này.
- Yêu cầu output >=35 cases, columns: `tc_id`, `group`, `description`, `precondition`, `request`, `input`, `expected_status`, `expected_fields`, `rationale`.
- Lưu prompt/output trace trong `reports/ai-audit-report.md`; lưu raw AI output trong file raw test case riêng.
- Append AI audit entry.

Files/artifacts:

- Section FR-03 trong `reports/main-report.md`
- Raw FR-03 AI-generated test case table
- `reports/ai-audit-report.md`

Kiểm tra trước commit:

- Có >=35 raw AI cases.
- Cases cover email, resetToken, newPassword, OTP lifecycle, security, schema.
- Các assumption của AI được ghi rõ, chưa xem là final.

Không làm trong phase này:

- Chưa sửa/audit cases.
- Chưa chuyển sang Postman data.

### Phase 03 - `test(hw06-fr03): audit and extend reset-password cases`

Mục tiêu: biến raw AI cases FR-03 thành final reviewed test cases.

Việc cần làm:

- Gắn nhãn mọi AI case: `VALID`, `INVALID`, hoặc `INCOMPLETE`.
- Với `INVALID`, ghi lý do như sai spec, invent field, expected status vô lý, setup không khả thi.
- Với `INCOMPLETE`, bổ sung setup/resetToken/token reuse details/expected fields.
- Chuẩn hóa final TC IDs, ví dụ `FR03-RP-DOM-001`, `FR03-RP-SEC-001`, `FR03-RP-SCH-001`.
- Thêm ít nhất 5 human-authored cases AI bỏ sót, ưu tiên SEC-07: OTP dùng sai email, OTP reuse, weak password, SQLi email, malformed resetToken.
- Ghi vì sao AI bỏ sót từng human case.

Files/artifacts:

- FR-03 audit table
- FR-03 final test case table
- FR-03 human extension table
- `reports/hw06-test-cases.md`

Kiểm tra trước commit:

- Mọi AI case đều có label và reasoning.
- Final FR-03 cases vẫn >=35.
- Có >=5 human cases.
- Không có final case dựa vào source code.

Không làm trong phase này:

- Chưa execute Newman.
- Chưa report bug nếu chưa chạy/observe bug.

### Phase 04 - `test(hw06-fr03): implement run and report reset-password tests`

Mục tiêu: execute final FR-03 cases bằng Postman/Newman, phân loại failures ngay khi còn đủ context, và tạo bug report Markdown cho bug thật nếu có.

Việc cần làm:

- Tạo collection/data/environment cho FR-03, ví dụ `postman/hw06-fr03-reset-password.postman_collection.json`, `postman/data/hw06-fr03-reset-password.data.json`.
- Thêm pre-request script upsert `X-Student-Id`.
- Tạo setup flow lấy `resetToken` từ `POST /api/forgot-password` cho cases cần token hợp lệ.
- Viết assertions: status, content type, response time, expected fields, no unexpected 500.
- Chạy backend bằng cách blackbox qua API.
- Chạy Newman và export HTML/JSON reports.
- Lưu evidence đại diện cho `X-Student-Id` ở cấp collection/run, không phải từng test case: pre-request script upsert header và log được header; có thể dùng Postman Console screenshot hoặc Newman/htmlextra output nếu output thể hiện rõ header này.
- Review failed cases ngay sau Newman run.
- Phân loại từng failure: `SUT bug`, `test data issue`, `Postman script issue`, hoặc `environment issue`.
- Với `SUT bug`, tạo Markdown bug report trong `reports/bug-reports`.
- Dùng đúng template `.github/ISSUE_TEMPLATE/bug-report-template.md`.
- Điền đủ: Found by Test Case, Requirement liên quan, Severity/Priority, Environment, Steps, Expected, Actual, Evidence.
- Link evidence thật: Newman HTML/JSON, console output, screenshot nếu có.
- Cập nhật `reports/main-report.md` và `reports/hw06-test-cases.md` với execution result và bug report path.
- Không tạo GitHub Issue trong phase này; chờ sinh viên review và yêu cầu riêng.
- Append AI audit entry.

Files/artifacts:

- `postman/hw06-fr03-reset-password.postman_collection.json`
- `postman/data/hw06-fr03-reset-password.data.json`
- `postman/hw06-local.postman_environment.json`
- `reports/newman/hw06-fr03-reset-password.html`
- `reports/newman/hw06-fr03-reset-password.json`
- `reports/bug-reports/BUG-FR03-*.md` nếu có bug thật

Kiểm tra trước commit:

- Newman command chạy được.
- Report có số iteration/case tương ứng.
- Có evidence đại diện cho `X-Student-Id` ở cấp collection/run.
- Failed cases được phân loại: expected bug hay test/script lỗi.
- Mỗi bug report, nếu có, nằm trong `reports/bug-reports`, bám template repo và có evidence thật.
- Chưa có GitHub Issue URL nếu sinh viên chưa approve.

Không làm trong phase này:

- Không tạo GitHub Issue.
- Không tạo bug report nếu failed case chỉ là lỗi setup/test script.

### Phase 05 - `test(hw06-fr09): generate apply-coupon API cases`

Mục tiêu: dùng AI sinh raw test cases cho FR-09.

Việc cần làm:

- Chuẩn bị prompt cho `POST /api/apply-coupon` với body `code`, `total_amount`, `user_id`.
- Đưa FR-09 coupon conditions C1-C5, công thức percent/fixed, sample coupons `SAVE10`, `BIGBUY`, `VIP100`, `EXPIRED`.
- Nêu rõ security expectation từ FR-09 C4: user phải có JWT token hợp lệ, dù API spec chưa ghi header rõ ở section coupon.
- Yêu cầu domain partitions cho code/amount/user_id; security cases cho auth, IDOR, SQLi/XSS; schema cases cho `discount_amount`, `final_amount`.
- Yêu cầu >=35 raw cases theo output columns chuẩn.
- Append AI audit entry.

Files/artifacts:

- Section FR-09 raw generation trong `reports/main-report.md`
- Raw FR-09 AI-generated test case table
- `reports/ai-audit-report.md`

Kiểm tra trước commit:

- Có coverage C1-C5.
- Có calculation cases percent/fixed.
- Có security cases auth/IDOR.
- AI assumptions được ghi rõ.

Không làm trong phase này:

- Chưa audit/execute FR-09.

### Phase 06 - `test(hw06-fr09): audit and extend apply-coupon cases`

Mục tiêu: review và hoàn thiện final cases FR-09.

Việc cần làm:

- Audit mọi FR-09 AI case với `VALID/INVALID/INCOMPLETE`.
- Sửa cases bị sai vì API spec/FR conflict, ví dụ auth behavior cần ghi assumption hoặc expected theo FR-09.
- Chuẩn hóa final TC IDs, ví dụ `FR09-AC-DOM-001`, `FR09-AC-SEC-001`, `FR09-AC-SCH-001`.
- Thêm >=5 human cases: `SAVE10` reuse, exactly at `min_order_amount`, `EXPIRED` with valid amount, user_id khác token, total_amount negative/string, XSS code.
- Ghi vì sao AI bỏ sót từng human case.

Files/artifacts:

- FR-09 audit table
- FR-09 final test case table
- FR-09 human extension table

Kiểm tra trước commit:

- Final FR-09 cases >=35.
- Có đủ C1-C5, security, schema, calculation.
- Mọi final expected result có rationale.

Không làm trong phase này:

- Chưa tạo Postman artifacts.

### Phase 07 - `test(hw06-fr09): implement run and report apply-coupon tests`

Mục tiêu: execute final FR-09 cases bằng Postman/Newman, phân loại failures ngay và tạo bug report Markdown cho bug thật nếu có.

Việc cần làm:

- Tạo collection/data cho `POST /api/apply-coupon`.
- Tạo hoặc reuse login request để lấy `userToken`.
- Dùng environment variables cho `userToken`, `studentId`, `baseUrl`.
- Viết data rows cho coupon codes, totals, expected discount/final amount, authMode.
- Viết assertions tính toán `discount_amount` và `final_amount` với percent/fixed coupons.
- Chạy Newman và lưu HTML/JSON.
- Review failed cases ngay sau Newman run.
- Phân loại từng failure: `SUT bug`, `test data issue`, `Postman script issue`, hoặc `environment issue`.
- Với `SUT bug`, tạo Markdown bug report trong `reports/bug-reports`.
- Dùng đúng template `.github/ISSUE_TEMPLATE/bug-report-template.md`.
- Link evidence thật: Newman HTML/JSON, console output, screenshot nếu có.
- Cập nhật `reports/main-report.md` và `reports/hw06-test-cases.md` với execution result và bug report path.
- Không tạo GitHub Issue trong phase này; chờ sinh viên review và yêu cầu riêng.
- Append AI audit entry.

Files/artifacts:

- `postman/hw06-fr09-apply-coupon.postman_collection.json`
- `postman/data/hw06-fr09-apply-coupon.data.json`
- `reports/newman/hw06-fr09-apply-coupon.html`
- `reports/newman/hw06-fr09-apply-coupon.json`
- `reports/bug-reports/BUG-FR09-*.md` nếu có bug thật

Kiểm tra trước commit:

- Newman run có host thật `localhost`/`127.0.0.1`.
- Có evidence đại diện cho `X-Student-Id` ở cấp collection/run.
- Calculated assertions đúng với coupon formula.
- Mỗi bug report, nếu có, bám template repo và có evidence thật.
- Chưa có GitHub Issue URL nếu sinh viên chưa approve.

Không làm trong phase này:

- Không sửa expected status chỉ để làm test pass nếu observed behavior trái spec; ghi bug candidate.
- Không tạo GitHub Issue.
- Không tạo bug report nếu failed case chỉ là lỗi test script/setup.

### Phase 08 - `test(hw06-fr17): generate admin coupon API cases`

Mục tiêu: dùng AI sinh raw test cases cho FR-17.

Việc cần làm:

- Chuẩn bị prompt cho `POST /api/admin/coupons` với fields `code`, `type`, `discount_value`, `min_order_amount`, `expired_at`, `max_uses_per_user`.
- Đưa FR-17 required/unique/type/range rules và SEC-02/SEC-03 admin access control.
- Yêu cầu domain partitions cho mọi field.
- Yêu cầu security cases: no token, malformed token, user token, admin token, SQLi/XSS in code.
- Yêu cầu lifecycle/workflow: create -> list verify -> duplicate rejected -> cleanup delete.
- Yêu cầu >=35 raw cases.
- Append AI audit entry.

Files/artifacts:

- Section FR-17 raw generation trong `reports/main-report.md`
- Raw FR-17 AI-generated test case table
- `reports/ai-audit-report.md`

Kiểm tra trước commit:

- Có cases cho từng field bắt buộc.
- Có admin RBAC cases.
- Có schema/error response cases.

Không làm trong phase này:

- Chưa audit/execute FR-17.

### Phase 09 - `test(hw06-fr17): audit and extend admin coupon cases`

Mục tiêu: review và hoàn thiện final cases FR-17.

Việc cần làm:

- Audit mọi AI case với `VALID/INVALID/INCOMPLETE`.
- Sửa cases thiếu admin token/setup/cleanup.
- Chuẩn hóa final TC IDs, ví dụ `FR17-CC-DOM-001`, `FR17-CC-SEC-001`, `FR17-CC-SCH-001`.
- Thêm >=5 human cases: user token returns 403, duplicate coupon code, invalid `type`, `max_uses_per_user = 0`, `min_order_amount = -1`, XSS in code, expired_at malformed.
- Xác định cleanup strategy cho created coupons bằng `DELETE /api/admin/coupons/:id`.

Files/artifacts:

- FR-17 audit table
- FR-17 final test case table
- FR-17 human extension table
- Cleanup notes

Kiểm tra trước commit:

- Final FR-17 cases >=35.
- Có >=5 human cases.
- Không có case phá dữ liệu lâu dài mà không cleanup.

Không làm trong phase này:

- Chưa execute Newman.

### Phase 10 - `test(hw06-fr17): implement run and report admin-coupon tests`

Mục tiêu: execute final FR-17 cases bằng Postman/Newman, cleanup dữ liệu tạo ra, phân loại failures ngay và tạo bug report Markdown cho bug thật nếu có.

Việc cần làm:

- Tạo collection/data cho `POST /api/admin/coupons`.
- Tạo login/setup requests để lấy `adminToken` và `userToken`.
- Thêm request verify bằng `GET /api/coupons` nếu cần.
- Thêm cleanup bằng `DELETE /api/admin/coupons/:id` cho coupon tạo trong test.
- Viết assertions: status, schema, no password/token leak, RBAC 401/403, no unexpected 500.
- Chạy Newman và lưu reports.
- Review failed cases ngay sau Newman run.
- Phân loại từng failure: `SUT bug`, `test data issue`, `Postman script issue`, hoặc `environment issue`.
- Với `SUT bug`, tạo Markdown bug report trong `reports/bug-reports`.
- Dùng đúng template `.github/ISSUE_TEMPLATE/bug-report-template.md`.
- Link evidence thật: Newman HTML/JSON, console output, screenshot nếu có.
- Cập nhật `reports/main-report.md` và `reports/hw06-test-cases.md` với execution result và bug report path.
- Không tạo GitHub Issue trong phase này; chờ sinh viên review và yêu cầu riêng.
- Append AI audit entry.

Files/artifacts:

- `postman/hw06-fr17-admin-coupons.postman_collection.json`
- `postman/data/hw06-fr17-admin-coupons.data.json`
- `reports/newman/hw06-fr17-admin-coupons.html`
- `reports/newman/hw06-fr17-admin-coupons.json`
- `reports/bug-reports/BUG-FR17-*.md` nếu có bug thật

Kiểm tra trước commit:

- Admin cases dùng admin token, wrong-role cases dùng user token.
- Created coupon IDs được capture/cleanup.
- Newman report và evidence đại diện cho `X-Student-Id` tồn tại.
- Mỗi bug report, nếu có, bám template repo và có evidence thật.
- Chưa có GitHub Issue URL nếu sinh viên chưa approve.

Không làm trong phase này:

- Không bỏ cleanup nếu test tạo coupon mới.
- Không tạo GitHub Issue.
- Không report bug nếu chỉ là lỗi test script/setup.

### Phase 11 - `ci(hw06): add Newman API test workflow passing run`

Mục tiêu: đưa API test suite vào CI/CD và có passing run thật.

Việc cần làm:

- Tạo `.github/workflows/newman-api-test.yml`.
- Workflow cần checkout, setup Node, install backend dependencies, install Newman/htmlextra, start backend, wait endpoint public, run Newman collections.
- Có thể chạy từng collection hoặc một combined collection; ghi rõ command trong report.
- Push commit và lưu GitHub Actions pass URL/screenshot.
- Update CI/CD section trong main report.
- Append AI audit entry.

Files/artifacts:

- `.github/workflows/newman-api-test.yml`
- `reports/main-report.md` CI section
- CI pass screenshot/link

Kiểm tra trước commit:

- Workflow path đúng.
- Local Newman command vẫn chạy được trước khi push.
- GitHub Actions pass thật, không dùng ảnh giả.

Không làm trong phase này:

- Không tạo intentional fail trong commit này.

### Phase 12 - `ci(hw06): capture intentional failing Newman run`

Mục tiêu: tạo evidence CI fail có chủ đích theo yêu cầu đề.

Việc cần làm:

- Chọn một data row ít rủi ro và đổi `expectedStatus` sang giá trị sai rõ ràng, ví dụ `999`.
- Commit thay đổi nhỏ này.
- Push để GitHub Actions fail.
- Lưu fail run URL/screenshot.
- Ghi trong report: file nào đổi, TC nào, expected cũ/mới, lý do fail là intentional.
- Append AI audit entry.

Files/artifacts:

- Data file bị đổi một dòng expected value
- CI fail screenshot/link
- Note trong CI/CD report

Kiểm tra trước commit:

- Chỉ có một thay đổi intentional fail, dễ restore.
- Fail run thật sự đỏ trên GitHub Actions.

Không làm trong phase này:

- Không để nhiều expected values bị đổi.
- Không sửa source code SUT để tạo fail.

### Phase 13 - `ci(hw06): restore Newman expectations after fail demo`

Mục tiêu: khôi phục test suite và final branch về passing.

Việc cần làm:

- Revert đúng expected value đã đổi ở Phase 12.
- Chạy Newman local nếu khả thi.
- Push để GitHub Actions pass lại.
- Lưu restored pass URL/screenshot.
- Update CI/CD report với đủ 3 trạng thái: pass, intentional fail, restored pass.
- Append AI audit entry.

Files/artifacts:

- Restored data file
- CI restored pass screenshot/link
- Updated CI/CD report section

Kiểm tra trước commit:

- Không còn expectedStatus cố ý sai.
- Final CI status pass.

Không làm trong phase này:

- Không thêm test case mới làm nhiễu bằng chứng restore.

### Phase 14 - `docs(hw06): create approved GitHub bug issues`

Mục tiêu: chỉ tạo GitHub Issues cho những bug reports đã được sinh viên review/approve.

Phase này là approval-gated, không tự chạy theo thứ tự cứng. Có thể thực hiện ngay sau Phase 04, Phase 07 hoặc Phase 10 nếu sinh viên đã review bug report của API vừa chạy và yêu cầu tạo issue; nếu chưa, thực hiện trước finalization.

Việc cần làm:

- Review các bug report Markdown đã tạo ở Phase 04/07/10.
- Chỉ xử lý bug report mà sinh viên đã xác nhận/ yêu cầu tạo GitHub Issue.
- Kiểm tra lại template `.github/ISSUE_TEMPLATE/bug-report-template.md`, evidence, severity/priority trước khi tạo issue.
- Dùng `$gh-create-bug-issues` hoặc `gh issue create` theo skill để tạo GitHub Issue.
- Cập nhật GitHub Issue URL vào bug report, `reports/main-report.md`, và `reports/hw06-test-cases.md`.
- Append AI audit entry.

Files/artifacts:

- Updated `reports/bug-reports/*.md`
- GitHub Issue URLs cho bug reports đã approve
- Updated `reports/main-report.md`
- Updated `reports/hw06-test-cases.md`

Kiểm tra trước commit:

- Mỗi GitHub Issue có bug report Markdown tương ứng.
- Không tạo issue cho bug report chưa được sinh viên approve.
- Không có GitHub Issue URL giả.

Không làm trong phase này:

- Không tạo bug report mới nếu chưa có evidence.
- Không tạo issue cho failed case chỉ là lỗi test script/setup.

### Phase 15 - `docs(hw06): finalize AI generator design and critique`

Mục tiêu: hoàn thiện phần Create level và AI critique.

Việc cần làm:

- Review `ai-test-generator-design.md` để đảm bảo blackbox: input là API spec, FR/SEC requirements, observed responses.
- Hoàn thiện pseudocode generator cho parser, endpoint classifier, domain builder, security builder, workflow/state builder, schema builder, human audit, export Postman.
- Chuẩn bị diagram do sinh viên tự author. Nếu dùng Mermaid trong file, tự chuyển/vẽ thành PNG nếu submission yêu cầu ảnh.
- Viết AI Critique 200-300 words: AI sai/incomplete ở đâu, vì sao fail, bài học khi collaborate với AI.
- Nếu có demo video, ghi link và nội dung demo.
- Append AI audit entry.

Files/artifacts:

- `ai-test-generator-design.md`
- Diagram PNG/Mermaid
- AI Critique section
- Optional demo video link

Kiểm tra trước commit:

- Diagram không phải ảnh AI-generated trực tiếp.
- Pseudocode không đọc source code.
- AI Critique đủ 200-300 words.

Không làm trong phase này:

- Không thay đổi kết quả Newman/test cases trừ khi phát hiện lỗi tài liệu rõ ràng.

### Phase 16 - `docs(hw06): finalize report, audit log, and submission package`

Mục tiêu: hoàn thiện toàn bộ bài nộp.

Việc cần làm:

- Review `reports/main-report.md`: đủ 3 API full pipeline, bug report links, Postman features, CI/CD, summary counts.
- Review `reports/ai-audit-report.md`: có entry cho các lượt AI quan trọng, đủ tool/timestamp/prompt/output.
- Tạo Git commit log text file.
- Tạo README self-assessment và test summary: số API, generated cases, added cases, executed cases, passed/failed cases, bugs.
- Export Markdown reports sang PDF nếu yêu cầu.
- Kiểm tra Postman collection/environment/data, Newman HTML reports, CI screenshots, bug screenshots, diagram/pseudocode.
- Chuẩn bị zip theo format `<StudentID>_HW06_AI_API_<SelfAssessedGrade>.zip`.
- Append final AI audit entry.

Files/artifacts:

- Final `reports/main-report.md` và PDF
- Final `reports/ai-audit-report.md` và PDF
- Git commit log text file
- README self-assessment
- Submission zip checklist

Kiểm tra trước commit:

- Không thiếu deliverable trong HW06 submission checklist.
- Final branch CI pass.
- Không có placeholder `TODO` quan trọng.
- Bug reports, nếu có, đều có evidence thật; GitHub Issue URL chỉ bắt buộc với bug reports đã được sinh viên approve tạo issue.

Không làm trong phase này:

- Không tạo thêm intentional fail.
- Không thay đổi API selection nếu không có lý do bắt buộc.

## 5. Coverage checklist per selected API

### FR-03: `POST /api/reset-password`

- Domain partitions: valid email, invalid email format, unknown email, missing email, missing resetToken, resetToken wrong length/type, weak `newPassword`, valid strong `newPassword`.
- State/workflow: resetToken issued by `POST /api/forgot-password`; wrong email-token pair; token reused after success; expired/invalid token where observable.
- Security: SEC-07 OTP entropy/one-time behavior, SQLi in email/resetToken, no sensitive token leakage beyond demo behavior, no unexpected 500.
- Schema: success body has expected message; error body has message/error; `Content-Type` JSON; response time.

### FR-09: `POST /api/apply-coupon`

- Domain partitions: valid `SAVE10`, `BIGBUY`, `VIP100`; nonexistent code; expired `EXPIRED`; lowercase/space code; negative/zero/string `total_amount`; missing fields; malformed `user_id`.
- State/workflow: coupon active vs expired; below/at/above `min_order_amount`; first use vs reuse over `max_uses_per_user`.
- Security: auth required per FR-09 C4 even if API spec is ambiguous, IDOR by changing `user_id`, SQLi/XSS in `code`, no unexpected 500.
- Schema: response has `discount_amount` and `final_amount`; calculation correct for percent/fixed; JSON content type.

### FR-17: `POST /api/admin/coupons`

- Domain partitions: required `code`, unique code, `type` only `percent/fixed`, positive `discount_value`, `min_order_amount >= 0`, `max_uses_per_user >= 1`, valid/invalid `expired_at`.
- State/workflow: create coupon -> appears in list; duplicate create rejected; created coupon can be cleaned up by `DELETE /api/admin/coupons/:id`.
- Security: no token -> 401, user token -> 403, admin token -> allowed, SQLi/XSS in `code`, SEC-03 admin role check.
- Schema: success response fields, error body fields, content type, response time.

## 6. Bug handling rule

Khi phát hiện bug thật:

1. Tạo Markdown bug report trong `reports/bug-reports`.
2. Dùng đúng template `.github/ISSUE_TEMPLATE/bug-report-template.md`.
3. Đính kèm evidence thật: screenshot, Newman report path, Postman Console, hoặc CI URL.
4. Cập nhật bug report path vào `reports/main-report.md` và `reports/hw06-test-cases.md`.
5. Chờ sinh viên review/approve bug report.
6. Chỉ khi sinh viên yêu cầu rõ, tạo GitHub Issue bằng `$gh-create-bug-issues` hoặc `gh issue create`.
7. Sau khi issue được tạo, cập nhật issue URL vào bug report, main report và test case master.

Không tạo bug report nếu chưa có evidence thật. Không tạo GitHub Issue nếu bug report chưa được sinh viên approve.
