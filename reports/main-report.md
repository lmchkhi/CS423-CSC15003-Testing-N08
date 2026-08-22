# HW06 - API Testing

## Thông tin chung

| Mục            | Thông tin                                               |
| -------------- | ------------------------------------------------------- |
| Họ và tên      | Lâm Vĩ Khang                                            |
| MSSV           | 23127062                                                |
| Lớp            | 23KTPM3                                                 |
| Nhóm           | N08                                                     |
| Repository     | <https://github.com/lmchkhi/CS423-CSC15003-Testing-N08> |
| Ngày thực hiện | 18/08/2026 - 23/08/2026                                 |

## 1. Giới thiệu

### 1.1. Mục tiêu

Mục tiêu của bài tập là sử dụng AI theo từng bước để sinh test case từ API specification của SUT, sau đó thực hiện human review, hiệu chỉnh và bổ sung các trường hợp AI bỏ sót. Bộ kiểm thử cần bao phủ domain partition, state transition, security (SEC-01 đến SEC-07) và response schema validation; được thực thi bằng Postman/Newman với evidence thực tế và dùng để báo cáo các lỗi xác nhận được. Bài tập đồng thời yêu cầu tích hợp test suite vào CI/CD và thiết kế một AI-driven API test generator dưới dạng Agent Skill, qua đó thể hiện các năng lực Bloom-AI G9.2 đến G9.5.

### 1.2. System Under Test

| Mục                            | Thông tin                              |
| ------------------------------ | -------------------------------------- |
| Tên hệ thống                   | EShop                                  |
| Repository gốc                 | <https://github.com/ttbhanh/eshop-sut> |
| Phiên bản/commit được kiểm thử | `85af3ba875c88283615e22cb108f13e2fccaf0e9` |
| Base URL                       | `http://localhost:3000`                |
| Môi trường kiểm thử            | Local trên macOS 26.5.2; backend Node.js 24.18.0, Express 5.2.1 và SQLite 3 (package `sqlite3` 6.0.1); chạy API test bằng Newman 6.2.2 với `newman-reporter-htmlextra` 1.23.1. |

### 1.3. Công cụ sử dụng

| Công cụ      | Phiên bản       | Mục đích        |
| ------------ | --------------- | --------------- |
| `{{TOOL_1}}` | `{{VERSION_1}}` | `{{PURPOSE_1}}` |
| `{{TOOL_2}}` | `{{VERSION_2}}` | `{{PURPOSE_2}}` |
| `{{TOOL_3}}` | `{{VERSION_3}}` | `{{PURPOSE_3}}` |

## 2. Lựa chọn API

Ba API được chọn thuộc ba pool khác nhau và không trùng với lựa chọn của thành viên khác trong nhóm.

| API   | Pool   | Feature                           | Method và endpoint          | Lý do lựa chọn    |
| ----- | ------ | --------------------------------- | --------------------------- | ----------------- |
| API 1 | Pool A | FR-02 - Login and account lockout | `POST /api/login`           | `{{LY_DO_API_1}}` |
| API 2 | Pool B | FR-07 - Giỏ hàng (Shopping Cart)  | `{{METHOD_ENDPOINT_API_2}}` | `{{LY_DO_API_2}}` |
| API 3 | Pool C | FR-15 - Quản lý sản phẩm (Product CRUD) | `{{METHOD_ENDPOINT_API_3}}` | `{{LY_DO_API_3}}` |

## 3. API 1 - `POST /api/login`

### 3.1. Đặc tả và phạm vi kiểm thử

- Feature/requirement: FR-02 - Login and account lockout
- Tham số path: Không có; endpoint cố định là `/api/login`.
- Tham số query: Đặc tả không định nghĩa query parameter. Suite có một negative test với query thừa `debug=true` để kiểm tra tham số không được hỗ trợ không làm thay đổi hành vi đăng nhập.
- Headers: `Content-Type: application/json` và `X-Student-Id: 23127062` theo yêu cầu bài tập. API đăng nhập là public nên không yêu cầu `Authorization`; suite cũng kiểm tra bearer token thừa/không hợp lệ không được bypass credentials.
- Request body: JSON object gồm hai trường `email` và `password`. Coverage bao gồm credentials hợp lệ, sai, thiếu trường, `null`, chuỗi rỗng, whitespace, sai kiểu dữ liệu, body không phải object, body bị bỏ qua và các tổ hợp tương tác.
- Response schema: Khi thành công, API trả HTTP `200` và JSON object chứa `token` dạng JWT cùng object `user`; `user` phải có `id`, `email`, `role` và không được chứa `password`. Đặc tả chưa quy định chính xác status/schema cho nhiều response lỗi, vì vậy các oracle tương ứng được đánh dấu `INCOMPLETE` thay vì tự kết luận là product defect.
- Yêu cầu bảo mật áp dụng: SEC-01 (không lưu hoặc trả mật khẩu plaintext), SEC-05 (Parameterized Query/chống SQL injection), và kiểm tra liên quan SEC-04 tại biên dữ liệu hiển thị. Suite còn bao phủ information leakage, user enumeration, XSS/CRLF/NoSQL-style injection, unknown field `role`, oversized input và Content-Type confusion.
- Trạng thái và transition liên quan: tài khoản ban đầu ở trạng thái không khóa; mỗi lần sai tăng bộ đếm đúng một; sau hai lần sai vẫn chưa khóa; từ lần sai thứ ba tài khoản bị khóa 30 giây; đăng nhập đúng trước ngưỡng phải thành công và reset chuỗi sai; đăng nhập khi đang khóa phải bị từ chối; sau thời hạn khóa phải đăng nhập lại được.

Nguồn thiết kế phạm vi: [API specification](../api_specification.md), [FR-02 và security requirements](../README.md), [coverage matrix](../tests/api/login/coverage-matrix.md).

### 3.2. Generate with AI

Yêu cầu ban đầu cung cấp endpoint `POST /api/login` và MSSV `23127062`, sau đó reusable skill `api-testing` chia quy trình sinh test thành các bước có kiểm soát:

1. Đọc API specification để xác nhận method, route, request body và success response; đọc FR-02 cùng SEC-01 đến SEC-07 để xác lập oracle.
2. Lập coverage matrix cho path, query, headers, từng trường body, top-level body, response schema và trạng thái khóa tài khoản.
3. Phân hoạch dữ liệu thành valid, invalid, missing, `null`, empty, whitespace, type confusion, boundary và interaction; bổ sung các nhóm security và schema validation.
4. Không tự đặt expected behavior cho phần đặc tả còn mơ hồ. Những ca thiếu status/schema lỗi chính xác được gắn agent audit `INCOMPLETE` và chờ human review.
5. Materialize 37 test case gắn nguồn `ai-generated` thành suite manifest và các file Markdown riêng, sau đó validate cấu trúc suite và sinh collection/data-driven artifacts. Skill không sinh trước phần Extend; các case do sinh viên bổ sung chỉ được thêm sau khi sinh viên tự viết và cung cấp nội dung.

Danh sách và metadata đầy đủ được lưu trong [suite manifest](../tests/api/login/suite.manifest.json) và [thư mục test case Login](../tests/test-cases/login/).

| Nhóm coverage     |                        Số test case | Ghi chú                                |
| ----------------- | ----------------------------------: | -------------------------------------- |
| Domain partition  | 31 | Bao phủ credentials, missing/null/empty/whitespace, type confusion, body shape, boundary và query/header interaction. |
| State transition  | 1 | TC-LOGIN-001 kiểm tra transition từ chưa xác thực/tài khoản không khóa sang đã xác thực bằng JWT. Các transition lockout sâu hơn được để lại cho phần Extend do sinh viên tự thiết kế. |
| Security          | 17 | Bao phủ SEC-01, SEC-04/SEC-05 và các nguy cơ injection, leakage, mass assignment, oversized input, Content-Type confusion. |
| Schema validation | 5 | Kiểm tra JWT, object `user`, các trường bắt buộc và cấm lộ `password`. |
| Tổng AI-generated | 37 | Các coverage family có thể chồng lấp; một test case có thể thuộc nhiều nhóm. |

### 3.3. Audit - Human review

| Kết quả audit |                     Số lượng | Các test case tiêu biểu      | Lý do/điều chỉnh                   |
| ------------- | ---------------------------: | ---------------------------- | ---------------------------------- |
| VALID         |      `{{VALID_COUNT_API_1}}` | `{{VALID_CASES_API_1}}`      | `{{VALID_REASON_API_1}}`           |
| INVALID       |    `{{INVALID_COUNT_API_1}}` | `{{INVALID_CASES_API_1}}`    | `{{INVALID_CORRECTIONS_API_1}}`    |
| INCOMPLETE    | `{{INCOMPLETE_COUNT_API_1}}` | `{{INCOMPLETE_CASES_API_1}}` | `{{INCOMPLETE_CORRECTIONS_API_1}}` |

`{{NHAN_XET_AUDIT_API_1}}`

### 3.4. Extend - Test case do sinh viên bổ sung

| Test case ID                  | Mô tả                               | Coverage                         | Vì sao AI bỏ sót            |
| ----------------------------- | ----------------------------------- | -------------------------------- | --------------------------- |
| `{{EXTENSION_TC_ID_API_1_1}}` | `{{EXTENSION_DESCRIPTION_API_1_1}}` | `{{EXTENSION_COVERAGE_API_1_1}}` | `{{WHY_AI_MISSED_API_1_1}}` |
| `{{EXTENSION_TC_ID_API_1_2}}` | `{{EXTENSION_DESCRIPTION_API_1_2}}` | `{{EXTENSION_COVERAGE_API_1_2}}` | `{{WHY_AI_MISSED_API_1_2}}` |
| `{{EXTENSION_TC_ID_API_1_3}}` | `{{EXTENSION_DESCRIPTION_API_1_3}}` | `{{EXTENSION_COVERAGE_API_1_3}}` | `{{WHY_AI_MISSED_API_1_3}}` |
| `{{EXTENSION_TC_ID_API_1_4}}` | `{{EXTENSION_DESCRIPTION_API_1_4}}` | `{{EXTENSION_COVERAGE_API_1_4}}` | `{{WHY_AI_MISSED_API_1_4}}` |
| `{{EXTENSION_TC_ID_API_1_5}}` | `{{EXTENSION_DESCRIPTION_API_1_5}}` | `{{EXTENSION_COVERAGE_API_1_5}}` | `{{WHY_AI_MISSED_API_1_5}}` |

### 3.5. Execute

- Công cụ chạy: Newman 6.2.2 và `newman-reporter-htmlextra` 1.23.1.
- Collection/data/environment: [Postman collection](../tests/api/login/login.postman_collection.json), [data file](../tests/api/login/login.test-data.json); runtime environment chứa credentials được tạo tạm với permission `0600` và đã xóa sau khi chạy.
- Run ID: `20260822T130751+0700`
- Thời gian chạy và múi giờ: `2026-08-22T13:07:51+07:00` (Asia/Ho_Chi_Minh).
- Header `X-Student-Id`: 37/37 request pass assertion `X-Student-Id: 23127062`; xem [CLI log](../test-reports/newman/login-20260822T130751+0700/cli.log).
- Newman/HTML report: [newman-report.html](../test-reports/newman/login-20260822T130751+0700/newman-report.html) và [newman-report.json](../test-reports/newman/login-20260822T130751+0700/newman-report.json).
- Screenshot evidence: [evidence.png](../test-reports/evidence/login/plaintext-password/evidence.png) — output Newman trong terminal VS Code cho thấy các assertion `user.password absent` thất bại.

|                       Tổng |                   Passed |                   Failed |                   Blocked |
| -------------------------: | -----------------------: | -----------------------: | ------------------------: |
| 37 | 6 | 31 | 0 |

Newman thực thi đủ 37 request với 304 assertions, trong đó 44 assertions thất bại. Sáu testcase fail do cùng một SUT defect vi phạm SEC-01: response đăng nhập thành công trả `user.password` plaintext. Hai mươi lăm testcase còn lại fail do oracle bảo thủ ở các vùng đặc tả chưa quy định chính xác status/schema lỗi; chúng được phân loại là specification gap/`INCOMPLETE`, không tự động xem là product bug. Không phát hiện credentials hoặc JWT chưa redaction trong các artifacts được giữ lại.

### 3.6. Bug reports

| Bug ID             | Mô tả                       | Test case phát hiện      | Evidence                 | GitHub Issue             |
| ------------------ | --------------------------- | ------------------------ | ------------------------ | ------------------------ |
| BUG-LOGIN-001 | Response đăng nhập trả plaintext `user.password` | TC-LOGIN-001; đồng thời TC-LOGIN-002, 027, 035, 036, 037 | [Bug report và raw evidence](../bugs/login/BUG-LOGIN-001.md) | [Issue #69](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/69) |

Không tạo GitHub Issue mới vì defect trùng root cause với issue #69 đã tồn tại.

## 4. API 2 - `{{METHOD_ENDPOINT_API_2}}`

### 4.1. Đặc tả và phạm vi kiểm thử

- Feature/requirement: FR-07 - Giỏ hàng (Shopping Cart)
- Tham số path: `{{PATH_PARAMETERS_API_2}}`
- Tham số query: `{{QUERY_PARAMETERS_API_2}}`
- Headers: `{{HEADERS_API_2}}`
- Request body: `{{REQUEST_BODY_API_2}}`
- Response schema: `{{RESPONSE_SCHEMA_API_2}}`
- Yêu cầu bảo mật áp dụng: `{{SECURITY_REQUIREMENTS_API_2}}`
- Trạng thái và transition liên quan: `{{STATE_TRANSITIONS_API_2}}`

### 4.2. Generate with AI

`{{MO_TA_QUY_TRINH_PROMPT_TUNG_BUOC_API_2}}`

| Nhóm coverage     |                        Số test case | Ghi chú                                |
| ----------------- | ----------------------------------: | -------------------------------------- |
| Domain partition  |  `{{DOMAIN_PARTITION_COUNT_API_2}}` | `{{DOMAIN_PARTITION_NOTE_API_2}}`      |
| State transition  |  `{{STATE_TRANSITION_COUNT_API_2}}` | `{{STATE_TRANSITION_NOTE_API_2}}`      |
| Security          |          `{{SECURITY_COUNT_API_2}}` | `{{SECURITY_NOTE_API_2}}`              |
| Schema validation | `{{SCHEMA_VALIDATION_COUNT_API_2}}` | `{{SCHEMA_VALIDATION_NOTE_API_2}}`     |
| Tổng AI-generated |      `{{AI_GENERATED_COUNT_API_2}}` | `{{AI_GENERATED_ARTIFACT_LINK_API_2}}` |

### 4.3. Audit - Human review

| Kết quả audit |                     Số lượng | Các test case tiêu biểu      | Lý do/điều chỉnh                   |
| ------------- | ---------------------------: | ---------------------------- | ---------------------------------- |
| VALID         |      `{{VALID_COUNT_API_2}}` | `{{VALID_CASES_API_2}}`      | `{{VALID_REASON_API_2}}`           |
| INVALID       |    `{{INVALID_COUNT_API_2}}` | `{{INVALID_CASES_API_2}}`    | `{{INVALID_CORRECTIONS_API_2}}`    |
| INCOMPLETE    | `{{INCOMPLETE_COUNT_API_2}}` | `{{INCOMPLETE_CASES_API_2}}` | `{{INCOMPLETE_CORRECTIONS_API_2}}` |

`{{NHAN_XET_AUDIT_API_2}}`

### 4.4. Extend - Test case do sinh viên bổ sung

| Test case ID                  | Mô tả                               | Coverage                         | Vì sao AI bỏ sót            |
| ----------------------------- | ----------------------------------- | -------------------------------- | --------------------------- |
| `{{EXTENSION_TC_ID_API_2_1}}` | `{{EXTENSION_DESCRIPTION_API_2_1}}` | `{{EXTENSION_COVERAGE_API_2_1}}` | `{{WHY_AI_MISSED_API_2_1}}` |
| `{{EXTENSION_TC_ID_API_2_2}}` | `{{EXTENSION_DESCRIPTION_API_2_2}}` | `{{EXTENSION_COVERAGE_API_2_2}}` | `{{WHY_AI_MISSED_API_2_2}}` |
| `{{EXTENSION_TC_ID_API_2_3}}` | `{{EXTENSION_DESCRIPTION_API_2_3}}` | `{{EXTENSION_COVERAGE_API_2_3}}` | `{{WHY_AI_MISSED_API_2_3}}` |
| `{{EXTENSION_TC_ID_API_2_4}}` | `{{EXTENSION_DESCRIPTION_API_2_4}}` | `{{EXTENSION_COVERAGE_API_2_4}}` | `{{WHY_AI_MISSED_API_2_4}}` |
| `{{EXTENSION_TC_ID_API_2_5}}` | `{{EXTENSION_DESCRIPTION_API_2_5}}` | `{{EXTENSION_COVERAGE_API_2_5}}` | `{{WHY_AI_MISSED_API_2_5}}` |

### 4.5. Execute

- Công cụ chạy: `{{EXECUTION_TOOL_API_2}}`
- Collection/data/environment: `{{EXECUTION_ARTIFACTS_API_2}}`
- Run ID: `{{RUN_ID_API_2}}`
- Thời gian chạy và múi giờ: `{{RUN_TIMESTAMP_TIMEZONE_API_2}}`
- Header `X-Student-Id`: `{{X_STUDENT_ID_EVIDENCE_API_2}}`
- Newman/HTML report: `{{NEWMAN_HTML_REPORT_LINK_API_2}}`
- Console screenshot: `{{CONSOLE_SCREENSHOT_LINK_API_2}}`

|                       Tổng |                   Passed |                   Failed |                   Blocked |
| -------------------------: | -----------------------: | -----------------------: | ------------------------: |
| `{{EXECUTED_COUNT_API_2}}` | `{{PASSED_COUNT_API_2}}` | `{{FAILED_COUNT_API_2}}` | `{{BLOCKED_COUNT_API_2}}` |

`{{NHAN_XET_KET_QUA_CHAY_API_2}}`

### 4.6. Bug reports

| Bug ID             | Mô tả                       | Test case phát hiện      | Evidence                 | GitHub Issue             |
| ------------------ | --------------------------- | ------------------------ | ------------------------ | ------------------------ |
| `{{BUG_ID_API_2}}` | `{{BUG_DESCRIPTION_API_2}}` | `{{BUG_FOUND_BY_API_2}}` | `{{BUG_EVIDENCE_API_2}}` | `{{GITHUB_ISSUE_API_2}}` |

`{{GHI_CHU_NEU_KHONG_CO_BUG_API_2}}`

## 5. API 3 - `{{METHOD_ENDPOINT_API_3}}`

### 5.1. Đặc tả và phạm vi kiểm thử

- Feature/requirement: FR-15 - Quản lý sản phẩm (Product CRUD)
- Tham số path: `{{PATH_PARAMETERS_API_3}}`
- Tham số query: `{{QUERY_PARAMETERS_API_3}}`
- Headers: `{{HEADERS_API_3}}`
- Request body: `{{REQUEST_BODY_API_3}}`
- Response schema: `{{RESPONSE_SCHEMA_API_3}}`
- Yêu cầu bảo mật áp dụng: `{{SECURITY_REQUIREMENTS_API_3}}`
- Trạng thái và transition liên quan: `{{STATE_TRANSITIONS_API_3}}`

### 5.2. Generate with AI

`{{MO_TA_QUY_TRINH_PROMPT_TUNG_BUOC_API_3}}`

| Nhóm coverage     |                        Số test case | Ghi chú                                |
| ----------------- | ----------------------------------: | -------------------------------------- |
| Domain partition  |  `{{DOMAIN_PARTITION_COUNT_API_3}}` | `{{DOMAIN_PARTITION_NOTE_API_3}}`      |
| State transition  |  `{{STATE_TRANSITION_COUNT_API_3}}` | `{{STATE_TRANSITION_NOTE_API_3}}`      |
| Security          |          `{{SECURITY_COUNT_API_3}}` | `{{SECURITY_NOTE_API_3}}`              |
| Schema validation | `{{SCHEMA_VALIDATION_COUNT_API_3}}` | `{{SCHEMA_VALIDATION_NOTE_API_3}}`     |
| Tổng AI-generated |      `{{AI_GENERATED_COUNT_API_3}}` | `{{AI_GENERATED_ARTIFACT_LINK_API_3}}` |

### 5.3. Audit - Human review

| Kết quả audit |                     Số lượng | Các test case tiêu biểu      | Lý do/điều chỉnh                   |
| ------------- | ---------------------------: | ---------------------------- | ---------------------------------- |
| VALID         |      `{{VALID_COUNT_API_3}}` | `{{VALID_CASES_API_3}}`      | `{{VALID_REASON_API_3}}`           |
| INVALID       |    `{{INVALID_COUNT_API_3}}` | `{{INVALID_CASES_API_3}}`    | `{{INVALID_CORRECTIONS_API_3}}`    |
| INCOMPLETE    | `{{INCOMPLETE_COUNT_API_3}}` | `{{INCOMPLETE_CASES_API_3}}` | `{{INCOMPLETE_CORRECTIONS_API_3}}` |

`{{NHAN_XET_AUDIT_API_3}}`

### 5.4. Extend - Test case do sinh viên bổ sung

| Test case ID                  | Mô tả                               | Coverage                         | Vì sao AI bỏ sót            |
| ----------------------------- | ----------------------------------- | -------------------------------- | --------------------------- |
| `{{EXTENSION_TC_ID_API_3_1}}` | `{{EXTENSION_DESCRIPTION_API_3_1}}` | `{{EXTENSION_COVERAGE_API_3_1}}` | `{{WHY_AI_MISSED_API_3_1}}` |
| `{{EXTENSION_TC_ID_API_3_2}}` | `{{EXTENSION_DESCRIPTION_API_3_2}}` | `{{EXTENSION_COVERAGE_API_3_2}}` | `{{WHY_AI_MISSED_API_3_2}}` |
| `{{EXTENSION_TC_ID_API_3_3}}` | `{{EXTENSION_DESCRIPTION_API_3_3}}` | `{{EXTENSION_COVERAGE_API_3_3}}` | `{{WHY_AI_MISSED_API_3_3}}` |
| `{{EXTENSION_TC_ID_API_3_4}}` | `{{EXTENSION_DESCRIPTION_API_3_4}}` | `{{EXTENSION_COVERAGE_API_3_4}}` | `{{WHY_AI_MISSED_API_3_4}}` |
| `{{EXTENSION_TC_ID_API_3_5}}` | `{{EXTENSION_DESCRIPTION_API_3_5}}` | `{{EXTENSION_COVERAGE_API_3_5}}` | `{{WHY_AI_MISSED_API_3_5}}` |

### 5.5. Execute

- Công cụ chạy: `{{EXECUTION_TOOL_API_3}}`
- Collection/data/environment: `{{EXECUTION_ARTIFACTS_API_3}}`
- Run ID: `{{RUN_ID_API_3}}`
- Thời gian chạy và múi giờ: `{{RUN_TIMESTAMP_TIMEZONE_API_3}}`
- Header `X-Student-Id`: `{{X_STUDENT_ID_EVIDENCE_API_3}}`
- Newman/HTML report: `{{NEWMAN_HTML_REPORT_LINK_API_3}}`
- Console screenshot: `{{CONSOLE_SCREENSHOT_LINK_API_3}}`

|                       Tổng |                   Passed |                   Failed |                   Blocked |
| -------------------------: | -----------------------: | -----------------------: | ------------------------: |
| `{{EXECUTED_COUNT_API_3}}` | `{{PASSED_COUNT_API_3}}` | `{{FAILED_COUNT_API_3}}` | `{{BLOCKED_COUNT_API_3}}` |

`{{NHAN_XET_KET_QUA_CHAY_API_3}}`

### 5.6. Bug reports

| Bug ID             | Mô tả                       | Test case phát hiện      | Evidence                 | GitHub Issue             |
| ------------------ | --------------------------- | ------------------------ | ------------------------ | ------------------------ |
| `{{BUG_ID_API_3}}` | `{{BUG_DESCRIPTION_API_3}}` | `{{BUG_FOUND_BY_API_3}}` | `{{BUG_EVIDENCE_API_3}}` | `{{GITHUB_ISSUE_API_3}}` |

`{{GHI_CHU_NEU_KHONG_CO_BUG_API_3}}`

## 6. Postman/Newman features đã sử dụng

| Feature              | Cách sử dụng                      | Evidence/artifact                    |
| -------------------- | --------------------------------- | ------------------------------------ |
| Workspace            | `{{POSTMAN_WORKSPACE_USAGE}}`     | `{{POSTMAN_WORKSPACE_EVIDENCE}}`     |
| Collection           | `{{POSTMAN_COLLECTION_USAGE}}`    | `{{POSTMAN_COLLECTION_EVIDENCE}}`    |
| Variables            | `{{POSTMAN_VARIABLES_USAGE}}`     | `{{POSTMAN_VARIABLES_EVIDENCE}}`     |
| Environment          | `{{POSTMAN_ENVIRONMENT_USAGE}}`   | `{{POSTMAN_ENVIRONMENT_EVIDENCE}}`   |
| Data-driven run      | `{{POSTMAN_DATA_DRIVEN_USAGE}}`   | `{{POSTMAN_DATA_DRIVEN_EVIDENCE}}`   |
| Pre-request script   | `{{POSTMAN_PRE_REQUEST_USAGE}}`   | `{{POSTMAN_PRE_REQUEST_EVIDENCE}}`   |
| Test script          | `{{POSTMAN_TEST_SCRIPT_USAGE}}`   | `{{POSTMAN_TEST_SCRIPT_EVIDENCE}}`   |
| Newman/HTML reporter | `{{NEWMAN_REPORTER_USAGE}}`       | `{{NEWMAN_REPORTER_EVIDENCE}}`       |
| Monitor              | `{{POSTMAN_MONITOR_USAGE_OR_NA}}` | `{{POSTMAN_MONITOR_EVIDENCE_OR_NA}}` |
| Mock server          | `{{POSTMAN_MOCK_USAGE_OR_NA}}`    | `{{POSTMAN_MOCK_EVIDENCE_OR_NA}}`    |

## 7. Báo cáo tích hợp CI/CD

### 7.1. Cấu hình pipeline

- Nền tảng CI/CD: `{{CICD_PLATFORM}}`
- File cấu hình: `{{CICD_CONFIG_FILE_LINK}}`
- Trigger: `{{CICD_TRIGGERS}}`
- Các bước chính: `{{CICD_PIPELINE_STEPS}}`
- Cách quản lý environment/secrets: `{{CICD_ENVIRONMENT_AND_SECRETS}}`
- Cách xuất và lưu test report: `{{CICD_REPORT_ARTIFACT_CONFIG}}`

### 7.2. Sample run - tất cả test case pass

| Mục          | Thông tin                         |
| ------------ | --------------------------------- |
| Commit       | `{{ALL_PASS_COMMIT_SHA_AND_URL}}` |
| Pipeline run | `{{ALL_PASS_PIPELINE_RUN_URL}}`   |
| Kết quả      | `{{ALL_PASS_RESULT}}`             |
| Screenshot   | `{{ALL_PASS_SCREENSHOT_LINK}}`    |

### 7.3. Sample run - có một test case fail

| Mục            | Thông tin                         |
| -------------- | --------------------------------- |
| Commit         | `{{ONE_FAIL_COMMIT_SHA_AND_URL}}` |
| Pipeline run   | `{{ONE_FAIL_PIPELINE_RUN_URL}}`   |
| Test case fail | `{{ONE_FAIL_TEST_CASE_ID}}`       |
| Kết quả        | `{{ONE_FAIL_RESULT}}`             |
| Screenshot     | `{{ONE_FAIL_SCREENSHOT_LINK}}`    |

### 7.4. Nhận xét

`{{CICD_REPORT_DISCUSSION}}`

## 8. AI-driven API Test Generator - Agent Skill

### 8.1. Mục tiêu và input/output

- Mục tiêu: `{{AGENT_SKILL_OBJECTIVE}}`
- Input: `{{AGENT_SKILL_INPUTS}}`
- Output: `{{AGENT_SKILL_OUTPUTS}}`
- Giới hạn: `{{AGENT_SKILL_LIMITATIONS}}`

### 8.2. Thiết kế

`{{MO_TA_THIET_KE_AGENT_SKILL}}`

### 8.3. Sơ đồ tự vẽ

> Sơ đồ phải do sinh viên tự thiết kế và không được AI tạo trực tiếp.

`{{SELF_DRAWN_DIAGRAM_LINK}}`

### 8.4. Pseudocode

```text
{{AGENT_SKILL_PSEUDOCODE}}
```

### 8.5. Agent Skill và video demo

- Source/Skill: `{{AGENT_SKILL_SOURCE_LINK}}`
- Video demonstration: `{{AGENT_SKILL_DEMO_VIDEO_URL}}`

## 9. Test summary

| Chỉ số            |                            API 1 |                            API 2 |                            API 3 |                             Tổng |
| ----------------- | -------------------------------: | -------------------------------: | -------------------------------: | -------------------------------: |
| AI-generated      | 37 | `{{SUMMARY_AI_GENERATED_API_2}}` | `{{SUMMARY_AI_GENERATED_API_3}}` | `{{SUMMARY_AI_GENERATED_TOTAL}}` |
| Sinh viên bổ sung | 0 | `{{SUMMARY_EXTENDED_API_2}}` | `{{SUMMARY_EXTENDED_API_3}}` | `{{SUMMARY_EXTENDED_TOTAL}}` |
| Executed          | 37 | `{{SUMMARY_EXECUTED_API_2}}` | `{{SUMMARY_EXECUTED_API_3}}` | `{{SUMMARY_EXECUTED_TOTAL}}` |
| Passed            | 6 | `{{SUMMARY_PASSED_API_2}}` | `{{SUMMARY_PASSED_API_3}}` | `{{SUMMARY_PASSED_TOTAL}}` |
| Failed            | 31 | `{{SUMMARY_FAILED_API_2}}` | `{{SUMMARY_FAILED_API_3}}` | `{{SUMMARY_FAILED_TOTAL}}` |
| Blocked           | 0 | `{{SUMMARY_BLOCKED_API_2}}` | `{{SUMMARY_BLOCKED_API_3}}` | `{{SUMMARY_BLOCKED_TOTAL}}` |
| Bugs              | 1 | `{{SUMMARY_BUGS_API_2}}` | `{{SUMMARY_BUGS_API_3}}` | `{{SUMMARY_BUGS_TOTAL}}` |

`{{TEST_SUMMARY_DISCUSSION}}`
