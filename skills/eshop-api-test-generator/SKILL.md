---
name: eshop-api-test-generator
description: "Sinh, cấu trúc hoá và audit blackbox API test cases cho bài EShop HW06. Dùng khi tạo AI-driven test cases từ EShop API specification, FR/SEC requirements và observed responses; khi thiết kế AI test generator; hoặc khi xây coverage cho domain partitions, state transitions, security và schema validation mà không đọc source code."
---

# EShop API Test Generator

## Tổng quan

Dùng skill này để biến một EShop endpoint đã chọn thành API test suite đã review. Skill tạo structured prompts, coverage matrices, AI-generated cases, audit labels, và human extension ideas cho HW06.

## Inputs

Chỉ dùng blackbox inputs:

- `api_specification.md` hoặc `references/eshop-api-catalog.md`.
- EShop FR/SEC rules từ README hoặc `references/eshop-api-catalog.md`.
- Observed request/response samples thu bằng Postman/cURL/Newman.
- API pool và endpoint do sinh viên chọn.

Không đọc source code backend/frontend, database implementation, hoặc route handlers để suy ra expected behavior.

## Workflow

### 1. Load reference phù hợp

- Đọc `references/eshop-api-catalog.md` để nắm endpoints, pools, FR rules, SEC rules, sample accounts, và state machine.
- Đọc `references/case-patterns.md` để nắm case generation checklists và prompt skeletons.
- Đọc `references/generator-design.md` khi làm AI-driven generator design, diagram, hoặc pseudocode.

### 2. Chuẩn hoá endpoint metadata

Với API đã chọn, tạo endpoint object:

```json
{
  "pool": "A/B/C",
  "feature": "FR-xx",
  "method": "POST",
  "path": "/api/login",
  "auth_required": false,
  "admin_required": false,
  "path_params": [],
  "query_params": [],
  "body_fields": [],
  "success_status": 200,
  "known_response_fields": [],
  "stateful": false,
  "security_rules": ["SEC-02", "SEC-05"]
}
```

Nếu spec thiếu field hoặc response shape, đánh dấu là assumption hoặc yêu cầu observed sample. Không tự bịa hidden fields.

### 3. Xây coverage matrix

Tạo matrix gồm các nhóm:

- Domain partitions: valid, missing required, null, empty string, wrong type, boundary values, duplicate values, nonexistent IDs, very long strings, special characters.
- Security: no token, malformed token, expired token, wrong role, IDOR, SQL injection payloads không được crash/leak, XSS/sanitization, role escalation.
- State transitions: valid transitions, invalid jumps, no-op transitions, final states, khác biệt user/admin.
- Schema validation: status code, `Content-Type`, required fields, field types, array item shape, error body shape, response time.
- Workflow/E2E setup cases khi endpoint behavior phụ thuộc login, cart, checkout, hoặc order status trước đó.

Nhắm tối thiểu 35 final cases/API. Tỉ lệ cân bằng: 12-16 domain, 8-12 security, 6-12 state/workflow nếu liên quan, và 5-8 schema/performance cases. Với API không có state behavior, phân bổ lại sang domain/security/schema.

### 4. Soạn stepwise AI prompts

Prompt theo nhiều lượt nhỏ:

1. Yêu cầu AI extract endpoint parameters và assumptions.
2. Yêu cầu AI đề xuất domain partitions.
3. Yêu cầu AI đề xuất security cases.
4. Yêu cầu AI đề xuất state/workflow cases nếu liên quan.
5. Yêu cầu AI đề xuất schema assertions.
6. Yêu cầu AI merge, de-duplicate, và format cases.

Bắt buộc output schema:

| tc_id | group | description | precondition | request | input | expected_status | expected_fields | rationale |
| --- | --- | --- | --- | --- | --- | --- | --- |

### 5. Audit và sửa

Với từng AI case:

- Gắn `VALID` nếu case đúng spec và execute được.
- Gắn `INVALID` nếu case trái spec, giả định implementation internals, expect field không tồn tại, hoặc nhầm auth/authorization status.
- Gắn `INCOMPLETE` nếu setup, token role, data fixture, assertion, expected body, hoặc cleanup chưa rõ.

Sửa case sau khi gắn nhãn. Giữ label trong audit table để thể hiện human review.

### 6. Thêm human cases

Thêm ít nhất 5 missed cases/API. Ưu tiên các gap giá trị cao:

- 401 vs 403 separation for admin endpoints.
- User token attempts on admin APIs.
- IDOR with another user's order/user ID.
- Checkout total manipulation.
- Coupon reuse limit and expiration.
- Final-state order transition from `delivered` or `canceled`.
- Role escalation through `PUT /api/users/me`.
- Không có unexpected 500 với benign SQLi/XSS payloads.

## Output

Tạo:

- Endpoint metadata.
- Coverage matrix.
- AI prompt sequence.
- AI-generated test table.
- Audit table.
- Corrected final test suite.
- Human extension table.
- Notes cho Postman data fields và variables.

## References

- `references/eshop-api-catalog.md`: endpoint catalog và blackbox requirements.
- `references/case-patterns.md`: coverage heuristics và prompt templates.
- `references/generator-design.md`: architecture, pseudocode, và generator design notes.
