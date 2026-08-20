# Case Patterns và Prompt Templates

## Coverage Checklist

Domain partitions:

- Happy path với typical valid input.
- Thiếu từng required field.
- `null` cho từng required field.
- Empty string cho string fields.
- Wrong type cho từng field.
- Minimum valid boundary.
- Ngay dưới minimum boundary.
- Maximum valid boundary.
- Ngay trên maximum boundary.
- Duplicate hoặc uniqueness conflict.
- Nonexistent ID và malformed ID.
- Special characters, Unicode, whitespace-only.

Security:

- Missing `Authorization`.
- Malformed `Authorization`, ví dụ `Bearer` không có token.
- Expired token dùng `{{expiredToken}}`.
- User token gọi admin endpoint; expect 403, không phải 401.
- Admin token gọi user-owned endpoint khi relevant.
- IDOR: user thử order/profile/resource ID của user khác.
- Role escalation: body có `role: "admin"` ở nơi client không được control role.
- Benign SQLi payload, ví dụ `' OR '1'='1` hoặc `'; SELECT 1; --`.
- Benign XSS payload, ví dụ `<script>alert(1)</script>`.
- Sensitive data exposure: password hash/plaintext không được xuất hiện.

State transitions:

- Mọi valid transition.
- Mọi invalid jump.
- Final states không được transition.
- Same-state update nên bị reject hoặc no-op theo spec; nếu spec im lặng, mark assumption.
- Khác biệt user/admin role.
- Repeated action, ví dụ cancel twice.

Schema validation:

- Expected status code.
- `Content-Type` chứa `application/json`.
- Required fields tồn tại.
- Field types khớp.
- Arrays chứa objects đúng shape.
- Error responses có message/error field.
- Response time dưới threshold đã chọn, ví dụ 1000ms.
- Không có unexpected 500 với negative input.

## Stepwise Prompt Skeleton

Dùng cấu trúc này trong các AI interactions riêng.

### Prompt 1: Extract Endpoint Metadata

```text
I am doing blackbox API testing for EShop HW06.

Endpoint:
- Method: <METHOD>
- URL: <PATH>
- Pool/FR: <POOL + FR>
- Auth requirement: <none/user/admin>
- Request/query/path/body fields: <LIST>
- Success response sample: <JSON or unknown>
- Relevant requirements: <FR/SEC snippets>

Task:
Extract endpoint metadata và liệt kê chỉ các explicit assumptions. Không invent fields không có trong spec. Return JSON với method, path, auth_required, admin_required, params, body_fields, expected_success_status, known_response_fields, stateful, security_rules, và assumptions.
```

### Prompt 2: Domain Partitions

```text
Dựa trên endpoint metadata ở trên, chỉ đề xuất domain-partition test cases.

Cover valid, invalid, missing required, null, empty, wrong type, boundary, duplicate/unique, nonexistent ID, malformed ID, long string, whitespace-only, và special-character partitions khi phù hợp.

Return table columns:
tc_id | group | description | precondition | request | input | expected_status | expected_fields | rationale

Chưa include security hoặc schema-only tests.
```

### Prompt 3: Security

```text
Dựa trên cùng endpoint, chỉ đề xuất security test cases.

Cover các rule SEC-01 đến SEC-07 liên quan:
- no token / malformed token / expired token
- wrong role, phân biệt rõ 403 và 401
- IDOR
- SQL injection payload không được tạo 500 hoặc leak data
- XSS/sanitization cho reflected input
- role escalation where relevant
- sensitive data exposure

Return cùng table columns. Không invent database internals.
```

### Prompt 4: State hoặc workflow

```text
Nếu endpoint liên quan orders/cart/checkout/coupons, đề xuất workflow hoặc state-transition cases.

Với order state, dùng:
pending -> confirmed -> shipping -> delivered
pending -> canceled
confirmed -> canceled
delivered và canceled là final states
user không được cancel khi order đã shipping

Return valid transitions, invalid transitions, final-state cases, repeated action cases, và role-specific cases khi liên quan.
```

### Prompt 5: Schema And Merge

```text
Bây giờ đề xuất schema/contract assertions và merge tất cả cases.

Requirements:
- total >= 35 cases
- de-duplicate overlapping cases
- giữ group labels
- include expected status và expected response fields/assertions
- flag rõ mọi assumption

Return final table:
tc_id | group | description | precondition | request | input | expected_status | expected_fields | rationale
```

## Audit Heuristics

Mark `INVALID` khi:

- Case expect behavior trái FR/SEC requirements.
- Case dùng fields không có trong API spec, trừ khi mark rõ là UI-only và exclude khỏi API execution.
- Case dựa vào implementation details từ source code.
- Status expectation nhầm authentication với authorization.
- Setup không thể thực hiện blackbox.

Mark `INCOMPLETE` khi:

- Thiếu token role.
- Required prior state chưa mô tả.
- Expected response fields mơ hồ.
- Cleanup hoặc created IDs chưa capture.
- Không thể chuyển thành Postman data nếu thiếu thêm thông tin.

## Human extensions giá trị cao thường gặp

- Checkout ignore manipulated `total_amount` và recalculate từ cart.
- Coupon `SAVE10` không dùng được hai lần bởi cùng user.
- `EXPIRED` coupon bị reject dù order total đủ cao.
- `PUT /api/users/me` ignore hoặc reject `role: "admin"`.
- `GET /api/orders/:id` reject order ID của user khác.
- Admin endpoint với user token trả 403.
- Delivered order không thể thành canceled.
- Canceled order không thể thành confirmed.
- `GET /api/admin/users` response exclude password và password hash fields.
- SQLi/XSS payloads không bao giờ trả 500 và không leak stack traces.
