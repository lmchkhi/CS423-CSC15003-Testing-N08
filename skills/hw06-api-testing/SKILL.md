---
name: hw06-api-testing
description: "Điều phối bài HW06 API Testing cho EShop SUT. Dùng khi cần lập kế hoạch hoặc tạo deliverables HW06: chọn 3 API từ Pool A/B/C, sinh và audit blackbox API test cases, bổ sung missed cases, chuẩn bị evidence Postman/Newman, CI/CD report, bug report, AI audit log, AI critique, self-assessment và checklist nộp bài."
---

# HW06 API Testing

## Tổng quan

Dùng skill này như bộ điều phối cấp bài tập cho HW06. Skill giúp bám rubric, tránh vô tình chuyển sang white-box testing, và điều hướng sang các skill chuyên biệt khi cần.

## Quy tắc bắt buộc

- Xem SUT là blackbox. Chỉ dùng API specification, README/FR/SEC requirements, API responses quan sát được, và evidence Postman/Newman. Không đọc source code backend/frontend để suy ra test cases hoặc expected behavior.
- Không bịa evidence. Newman reports, screenshots, GitHub Actions runs, GitHub Issues, và evidence `X-Student-Id` phải đến từ execution thật.
- Giữ AI audit trail cho mọi tương tác AI: tool name, date/time, prompt, và output summary hoặc full output.
- Mọi API request khi execute phải có `X-Student-Id: {StudentID}`.
- Với mỗi API được chọn, nhắm tối thiểu 35 final test cases, audit mọi AI-generated case, và thêm ít nhất 5 human-authored missed cases.

## Bắt đầu nhanh

1. Đọc `references/hw06-requirements.md` để nắm pipeline bài tập và grading checklist.
2. Đọc `references/eshop-blackbox-reference.md` để nắm pools, sample accounts, API catalog, FR rules, và SEC-01 đến SEC-07.
3. Khi sinh test cases, dùng `$eshop-api-test-generator`.
4. Khi tạo Postman/Newman/CI artifacts, dùng `$postman-newman-api-runner`.
5. Dùng `references/report-templates.md` cho Markdown report, AI audit, bug report, và self-assessment tables.

## Workflow

### 1. Chọn API

Chọn đúng 3 API, mỗi pool một API:

- Pool A: Authentication, categories, hoặc products.
- Pool B: Cart, checkout, coupons, orders, hoặc user order history.
- Pool C: Admin APIs, đặc biệt là admin product/order/coupon/user operations.

Xác nhận bộ 3 API không trùng với teammate. Ưu tiên API có nhiều validation và security/state behavior, ví dụ `POST /api/login`, `POST /api/checkout` hoặc `PUT /api/admin/orders/:id/status`, và `POST /api/products` hoặc `POST /api/admin/coupons`.

### 2. Generate

Với mỗi API, hướng dẫn AI theo từng bước:

- Chỉ đưa blackbox inputs: method, URL, headers, request/query/body samples, success/error response samples từ execution nếu có, FR rules, và SEC rules.
- Yêu cầu domain partitions cho mọi parameter.
- Yêu cầu state transitions khi API liên quan order/status behavior.
- Yêu cầu security cases: missing/invalid token, wrong role, IDOR, SQL injection, XSS/sanitization, role escalation khi phù hợp.
- Yêu cầu schema validation: exact fields, types, `Content-Type`, và response-time checks.
- Bắt buộc output columns: `tc_id`, `group`, `description`, `precondition`, `request`, `input`, `expected_status`, `expected_fields`, `rationale`.

### 3. Audit

Gắn nhãn mọi AI-generated test case:

- `VALID`: đúng spec và execute được.
- `INVALID`: trái spec, dùng field không tồn tại, expected status sai, setup bất khả thi, hoặc có white-box assumption.
- `INCOMPLETE`: ý tưởng hữu ích nhưng thiếu setup, expected result, assertion, data, hoặc role/token details.

Sửa invalid/incomplete cases trước khi execute. Không nộp raw AI output như final cases.

### 4. Extend

Thêm ít nhất 5 human-authored cases/API mà AI bỏ sót. Nguồn case tốt:

- 401 vs 403 distinction.
- IDOR across users.
- final-state order transitions.
- server recalculation of checkout total.
- coupon usage limits and expiration.
- field-level schema/type checks.
- `Content-Type`, response time, và không có unexpected 500 với benign injection payloads.

Giải thích vì sao AI bỏ sót từng case: prompt gap, model limitation, hidden setup complexity, hoặc API-specific state behavior.

### 5. Execute và evidence

Dùng Postman + Newman mặc định:

- Tạo collection, environment, và data files.
- Thêm collection-level hoặc request-level pre-request script để upsert `X-Student-Id`.
- Dùng environment variables cho `baseUrl`, `studentId`, `userToken`, `adminToken`, và IDs tạo trong setup.
- Chạy Newman bằng CLI và HTML/JSON reporters.
- Lưu evidence: Newman report, Postman Console hiển thị `X-Student-Id`, screenshots cho GitHub Issues, và CI pass/fail runs.

### 6. Report và package

Chuẩn bị:

- Main report dạng Markdown và PDF.
- Excel hoặc table-based test cases và test summary.
- Postman collection, environment, data files, và Newman HTML report.
- CI/CD report có pass run và intentional fail run.
- Bug reports dạng Markdown đặt trong `reports/bug-reports` theo template `.github/ISSUE_TEMPLATE/bug-report-template.md`, sau đó tạo GitHub Issues kèm screenshots.
- AI test-generator diagram và pseudocode. Diagram phải thể hiện design decisions của sinh viên và không được nộp ảnh do AI generate trực tiếp.
- AI Audit Report và AI Critique 200-300 words.
- Git commit log.
- Submission README có self-assessment và summary counts.

## References

- `references/hw06-requirements.md`: rubric, pipeline, evidence, và submission checklist.
- `references/eshop-blackbox-reference.md`: EShop pools, API catalog, accounts, FR/SEC rules.
- `references/report-templates.md`: Markdown tables tái dùng cho report sections.
