# FR-17 Admin Coupons - Raw AI-Generated Test Cases

Artifact type: Phase 08 raw AI-generated test cases.

Status: Raw, chưa human audit. Phase 09 sẽ gắn nhãn `VALID` / `INVALID` / `INCOMPLETE`, sửa case lỗi, thêm human cases, và tạo final per-test-case Markdown files.

API chính: `POST /api/admin/coupons`

Setup/verify/cleanup APIs dự kiến: `POST /api/login` để lấy admin/user token; `GET /api/coupons` để verify mã đã tạo; `DELETE /api/admin/coupons/:id` để cleanup coupon tạo trong test.

Blackbox basis:

- `README.md` FR-12: mọi API Admin phải yêu cầu JWT hợp lệ và `role = 'admin'` trong token.
- `README.md` FR-17: Admin có thể thêm/xem/xóa mã giảm giá.
- `README.md` FR-17: required fields gồm `code` duy nhất, `type` là `percent` hoặc `fixed`, `discount_value` dương, `expired_at`, `min_order_amount >= 0`, `max_uses_per_user >= 1`.
- `api_specification.md`: `POST /api/admin/coupons` body gồm `code`, `type`, `discount_value`, `min_order_amount`, `expired_at`, `max_uses_per_user`.
- `README.md` SEC-02/SEC-03/SEC-05: protected/admin APIs yêu cầu valid JWT, admin role, và input không được gây SQL injection leak/crash.
- Không dùng source code backend/frontend.

## Endpoint metadata extracted

```json
{
  "pool": "C",
  "feature": "FR-17",
  "method": "POST",
  "path": "/api/admin/coupons",
  "auth_required": true,
  "admin_required": true,
  "setup_endpoint": "POST /api/login",
  "verify_endpoint": "GET /api/coupons",
  "cleanup_endpoint": "DELETE /api/admin/coupons/:id",
  "body_fields": [
    "code",
    "type",
    "discount_value",
    "min_order_amount",
    "expired_at",
    "max_uses_per_user"
  ],
  "success_status": "200 or 201",
  "known_response_fields": [],
  "stateful": true,
  "workflow": "admin login -> create coupon -> list verify -> duplicate rejected -> cleanup delete",
  "security_rules": ["SEC-02", "SEC-03", "SEC-05"],
  "assumptions": [
    "API specification gives request body but does not define exact success status or response shape; Phase 09 must audit whether success is 200 or 201 and which fields are returned.",
    "Duplicate coupon code should be rejected because FR-17 says code is unique; exact status may be 400 or 409.",
    "Expired_at format is inferred from sample value YYYY-MM-DD; Phase 09 must audit accepted date format.",
    "FR-17 says discount_value must be positive but does not state an upper bound for percent coupons; cases with percent > 100 are useful but require Phase 09 audit.",
    "GET /api/coupons is described as admin in api_specification.md; Phase 09 must verify exact auth behavior before relying on it for list verification."
  ]
}
```

## Coverage matrix

| Group | Target coverage |
| --- | --- |
| Domain | Required/missing/null/empty/wrong-type/boundary partitions for `code`, `type`, `discount_value`, `min_order_amount`, `expired_at`, `max_uses_per_user`; uniqueness for `code`; valid percent/fixed create |
| Security | SEC-02 missing/malformed/invalid token; SEC-03 user token cannot call admin endpoint; SQLi/XSS in `code`; extra `role`; no sensitive data leak |
| Workflow | Admin create -> list verify -> duplicate reject -> cleanup delete; deleted coupon removed from list; failed create should not create partial coupon |
| Schema | JSON content type; success/error response shape; response field types if returned; malformed JSON; unsupported method/content type; response time |

## Raw test case table

| tc_id | group | description | precondition | request | input | expected_status | expected_fields | rationale |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR17-CC-DOM-001 | Domain | Create valid percent coupon with typical values | Admin logged in; generated unique code `HW06PCT{{runId}}` does not exist | `POST /api/admin/coupons` with `Authorization: Bearer {{adminToken}}` | `{"code":"HW06PCT{{runId}}","type":"percent","discount_value":15,"min_order_amount":200000,"expired_at":"2099-12-31","max_uses_per_user":1}` | 200 hoặc 201 | JSON success; created coupon has/code references `HW06PCT{{runId}}` or returns success message/id | Happy path for required fields and percent type. |
| FR17-CC-DOM-002 | Domain | Create valid fixed coupon with typical values | Admin logged in; unique code `HW06FIX{{runId}}` | `POST /api/admin/coupons` | `{"code":"HW06FIX{{runId}}","type":"fixed","discount_value":50000,"min_order_amount":300000,"expired_at":"2099-12-31","max_uses_per_user":2}` | 200 hoặc 201 | JSON success; created coupon code/id/message | Happy path for fixed type. |
| FR17-CC-DOM-003 | Domain | Missing `code` | Admin logged in | `POST /api/admin/coupons` | Body without `code` | 400 | `message` hoặc `error`; no coupon created | FR-17 requires `code`. |
| FR17-CC-DOM-004 | Domain | `code` is `null` | Admin logged in | `POST /api/admin/coupons` | `{"code":null,"type":"percent","discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 400 | `message` hoặc `error` | Null code is invalid. |
| FR17-CC-DOM-005 | Domain | `code` is empty string | Admin logged in | `POST /api/admin/coupons` | `{"code":"","type":"percent","discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 400 | `message` hoặc `error` | Empty code cannot satisfy required unique code. |
| FR17-CC-DOM-006 | Domain | `code` is whitespace-only | Admin logged in | `POST /api/admin/coupons` | `{"code":"   ","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 400 | `message` hoặc `error`; no coupon created | Whitespace-only code should not be accepted as meaningful unique code. |
| FR17-CC-DOM-007 | Domain | `code` wrong type number | Admin logged in | `POST /api/admin/coupons` | `{"code":12345,"type":"percent","discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 400 | `message` hoặc `error` | Wrong type for string field. |
| FR17-CC-DOM-008 | Domain | Duplicate `code` is rejected | A coupon with code `HW06DUP{{runId}}` already created | `POST /api/admin/coupons` | Same valid body/code as previous create | 400 hoặc 409 | `message` hoặc `error`; only one coupon with that code exists | FR-17 says `code` must be unique. |
| FR17-CC-DOM-009 | Domain | Very long `code` is rejected or handled safely | Admin logged in | `POST /api/admin/coupons` | `code` = 256 `A` characters, other fields valid | 400 | `message` hoặc `error`; no 5xx | Long input boundary should be validated or safely rejected. |
| FR17-CC-DOM-010 | Domain | Unicode coupon code is handled consistently | Admin logged in; unique code `TẾT{{runId}}` | `POST /api/admin/coupons` | Valid body with `code:"TẾT{{runId}}"` | 200/201 hoặc 400 | If accepted, code preserved safely; if rejected, safe error | Spec does not define allowed code charset; Phase 09 must audit. |
| FR17-CC-DOM-011 | Domain | Missing `type` | Admin logged in | `POST /api/admin/coupons` | Body without `type` | 400 | `message` hoặc `error` | FR-17 requires `type`. |
| FR17-CC-DOM-012 | Domain | `type` is `null` | Admin logged in | `POST /api/admin/coupons` | `{"code":"HW06NULLTYPE{{runId}}","type":null,"discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 400 | `message` hoặc `error` | Null type is invalid. |
| FR17-CC-DOM-013 | Domain | `type` unsupported value | Admin logged in | `POST /api/admin/coupons` | `{"code":"HW06FREESHIP{{runId}}","type":"free_shipping","discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 400 | `message` hoặc `error` | FR-17 only allows `percent` or `fixed`. |
| FR17-CC-DOM-014 | Domain | `type` wrong case `Percent` | Admin logged in | `POST /api/admin/coupons` | `{"code":"HW06TYPECASE{{runId}}","type":"Percent","discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 400 hoặc 200/201 | If accepted, normalized behavior documented; otherwise safe error | Case sensitivity unspecified; Phase 09 must audit. |
| FR17-CC-DOM-015 | Domain | Missing `discount_value` | Admin logged in | `POST /api/admin/coupons` | Body without `discount_value` | 400 | `message` hoặc `error` | FR-17 requires positive discount value. |
| FR17-CC-DOM-016 | Domain | `discount_value` is zero | Admin logged in | `POST /api/admin/coupons` | `{"code":"HW06DISC0{{runId}}","type":"fixed","discount_value":0,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 400 | `message` hoặc `error` | Discount value must be positive. |
| FR17-CC-DOM-017 | Domain | `discount_value` is negative | Admin logged in | `POST /api/admin/coupons` | `{"code":"HW06DISCNEG{{runId}}","type":"percent","discount_value":-1,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 400 | `message` hoặc `error` | Negative discount violates positive constraint. |
| FR17-CC-DOM-018 | Domain | `discount_value` wrong type string | Admin logged in | `POST /api/admin/coupons` | `{"code":"HW06DISCSTR{{runId}}","type":"fixed","discount_value":"50000","min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 400 | `message` hoặc `error` | Numeric value should not be silently coerced. |
| FR17-CC-DOM-019 | Domain | Percent `discount_value` greater than 100 | Admin logged in | `POST /api/admin/coupons` | `{"code":"HW06PCT150{{runId}}","type":"percent","discount_value":150,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 400 hoặc 200/201 | If accepted, document assumption; if rejected, safe error | Spec says positive only, but percent >100 is risky and needs audit. |
| FR17-CC-DOM-020 | Domain | Missing `min_order_amount` | Admin logged in | `POST /api/admin/coupons` | Body without `min_order_amount` | 400 | `message` hoặc `error` | FR-17 requires min order amount. |
| FR17-CC-DOM-021 | Domain | `min_order_amount` is zero boundary | Admin logged in; unique code | `POST /api/admin/coupons` | `{"code":"HW06MIN0{{runId}}","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 200 hoặc 201 | JSON success; created coupon code/id/message | FR-17 allows `min_order_amount >= 0`; zero is valid lower boundary. |
| FR17-CC-DOM-022 | Domain | `min_order_amount` is negative | Admin logged in | `POST /api/admin/coupons` | `{"code":"HW06MINNEG{{runId}}","type":"fixed","discount_value":10000,"min_order_amount":-1,"expired_at":"2099-12-31","max_uses_per_user":1}` | 400 | `message` hoặc `error` | Negative min order violates `>= 0`. |
| FR17-CC-DOM-023 | Domain | `min_order_amount` wrong type string | Admin logged in | `POST /api/admin/coupons` | `{"code":"HW06MINSTR{{runId}}","type":"fixed","discount_value":10000,"min_order_amount":"200000","expired_at":"2099-12-31","max_uses_per_user":1}` | 400 | `message` hoặc `error` | Numeric field should validate type. |
| FR17-CC-DOM-024 | Domain | Missing `expired_at` | Admin logged in | `POST /api/admin/coupons` | Body without `expired_at` | 400 | `message` hoặc `error` | FR-17 requires expiration date. |
| FR17-CC-DOM-025 | Domain | `expired_at` is malformed date | Admin logged in | `POST /api/admin/coupons` | `{"code":"HW06BADDATE{{runId}}","type":"percent","discount_value":10,"min_order_amount":0,"expired_at":"31-12-2099","max_uses_per_user":1}` | 400 | `message` hoặc `error` | Sample format is `YYYY-MM-DD`; malformed date should be rejected. |
| FR17-CC-DOM-026 | Domain | `expired_at` in the past | Admin logged in | `POST /api/admin/coupons` | `{"code":"HW06PAST{{runId}}","type":"percent","discount_value":10,"min_order_amount":0,"expired_at":"2020-01-01","max_uses_per_user":1}` | 400 hoặc 200/201 | If accepted, created coupon should later be expired; if rejected, safe error | FR-17 does not explicitly ban past expiration; Phase 09 must audit. |
| FR17-CC-DOM-027 | Domain | Missing `max_uses_per_user` | Admin logged in | `POST /api/admin/coupons` | Body without `max_uses_per_user` | 400 | `message` hoặc `error` | FR-17 requires max uses per user. |
| FR17-CC-DOM-028 | Domain | `max_uses_per_user` equals 1 boundary | Admin logged in; unique code | `POST /api/admin/coupons` | `{"code":"HW06MAX1{{runId}}","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 200 hoặc 201 | JSON success; created coupon code/id/message | FR-17 allows `max_uses_per_user >= 1`; 1 is valid lower boundary. |
| FR17-CC-DOM-029 | Domain | `max_uses_per_user` equals 0 | Admin logged in | `POST /api/admin/coupons` | `{"code":"HW06MAX0{{runId}}","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":0}` | 400 | `message` hoặc `error` | Zero violates `>= 1`. |
| FR17-CC-DOM-030 | Domain | `max_uses_per_user` wrong type string | Admin logged in | `POST /api/admin/coupons` | `{"code":"HW06MAXSTR{{runId}}","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":"1"}` | 400 | `message` hoặc `error` | Numeric field should validate type. |
| FR17-CC-SEC-001 | Security | Missing Authorization header | No token sent | `POST /api/admin/coupons` | Valid coupon body | 401 | `message` hoặc `error`; no coupon created | SEC-02 requires valid JWT for protected admin API. |
| FR17-CC-SEC-002 | Security | Malformed Authorization header | Header `Authorization: Bearer` without token | `POST /api/admin/coupons` | Valid coupon body | 401 | `message` hoặc `error`; no coupon created | Malformed token is not valid JWT. |
| FR17-CC-SEC-003 | Security | Invalid JWT token | Header `Authorization: Bearer invalid.token.value` | `POST /api/admin/coupons` | Valid coupon body | 401 | `message` hoặc `error`; no coupon created | Invalid JWT must be rejected. |
| FR17-CC-SEC-004 | Security | Normal user token cannot create admin coupon | Login as `test@eshop.com` | `POST /api/admin/coupons` with `Authorization: Bearer {{userToken}}` | Valid coupon body | 403 | `message` hoặc `error`; no coupon created | SEC-03 requires admin role, not just token presence. |
| FR17-CC-SEC-005 | Security | Expired JWT token cannot create coupon | Expired token fixture available if reliable | `POST /api/admin/coupons` | Valid coupon body | 401 | `message` hoặc `error`; no coupon created | SEC-02 requires valid token; Phase 09 must audit fixture availability. |
| FR17-CC-SEC-006 | Security | SQL injection payload in `code` does not create coupon or leak SQL | Admin logged in | `POST /api/admin/coupons` | `{"code":"' OR '1'='1","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 400 | `message` hoặc `error`; no stack/sql leak; no 5xx | SEC-05 requires safe query handling. |
| FR17-CC-SEC-007 | Security | SQL injection payload in `type` does not bypass enum | Admin logged in | `POST /api/admin/coupons` | `{"code":"HW06SQLTYPE{{runId}}","type":"percent' OR '1'='1","discount_value":10,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 400 | `message` hoặc `error`; no stack/sql leak; no 5xx | Type enum must not be bypassed by injection-like string. |
| FR17-CC-SEC-008 | Security | XSS-like payload in `code` is rejected or safely stored | Admin logged in | `POST /api/admin/coupons` | `{"code":"<script>alert(1)</script>","type":"fixed","discount_value":10000,"min_order_amount":0,"expired_at":"2099-12-31","max_uses_per_user":1}` | 400 hoặc 200/201 | No executable reflection; no 5xx; if stored, list response must escape/safely encode | SEC-04/SEC-05 safe input handling for UI-visible coupon code. |
| FR17-CC-SEC-009 | Security | Extra `role:"admin"` field does not let user token create coupon | Login as normal user | `POST /api/admin/coupons` with user token | Valid coupon body plus `"role":"admin"` | 403 | `message` hoặc `error`; no coupon created | Client-controlled role must not affect SEC-03 authorization. |
| FR17-CC-SEC-010 | Security | Success/error response does not leak token/password fields | Admin logged in | `POST /api/admin/coupons` | Valid coupon body | 200 hoặc 201 | No `password`, `password_hash`, `token`, `jwt`, or user credential fields | Coupon create response should not expose sensitive account data. |
| FR17-CC-WF-001 | Workflow/State | Create coupon then verify it appears in coupon list | Admin logged in; unique code | `POST /api/admin/coupons`, then `GET /api/coupons` | Valid fixed coupon body | 200/201 then 200 | List contains created code with matching main fields | FR-17 includes Add and View coupon behavior. |
| FR17-CC-WF-002 | Workflow/State | Duplicate create after first success is rejected | First create succeeded | `POST /api/admin/coupons` twice with same code | Same valid body/code | 400 hoặc 409 | Error body; list still has only one coupon with that code | Enforces `code` uniqueness across lifecycle. |
| FR17-CC-WF-003 | Workflow/State | Created coupon can be cleaned up by DELETE | Admin created coupon and captured id | `DELETE /api/admin/coupons/:id` | Path `id={{createdCouponId}}` | 200 hoặc 204 | Delete success; no unexpected 5xx | Phase 10 cleanup strategy for stateful tests. |
| FR17-CC-WF-004 | Workflow/State | Deleted coupon no longer appears in list | Created coupon was deleted | `GET /api/coupons` after delete | No body | 200 | Deleted code absent from list | Verifies cleanup and delete lifecycle. |
| FR17-CC-WF-005 | Workflow/State | Failed validation create does not create partial coupon | Admin logged in | Invalid create, then list verify | Missing `discount_value` with unique code, then `GET /api/coupons` | 400 then 200 | Invalid code is absent from list | Failed create should be atomic/no partial record. |
| FR17-CC-WF-006 | Workflow/State | User token cannot create and cannot pollute coupon list | Login as normal user; unique code | `POST /api/admin/coupons` with user token, then admin `GET /api/coupons` | Valid coupon body using user token | 403 then 200 | Code absent from list | SEC-03 failure must not mutate state. |
| FR17-CC-WF-007 | Workflow/State | Duplicate rejection should not overwrite original coupon values | Original coupon created with fixed discount | Duplicate create with same code but different fields | Second `POST /api/admin/coupons`, then list | 400/409 then 200 | Original fields unchanged | Uniqueness conflict must not mutate existing coupon. |
| FR17-CC-SCH-001 | Schema Validation | Success response has JSON Content-Type | Admin logged in; valid create body | `POST /api/admin/coupons` | Valid coupon body | 200 hoặc 201 | Header `Content-Type` contains `application/json` if body is returned | API create response should be JSON when returning body. |
| FR17-CC-SCH-002 | Schema Validation | Success response contains stable created coupon identity or message | Admin logged in; valid create body | `POST /api/admin/coupons` | Valid coupon body | 200 hoặc 201 | Has created `id`/`coupon_id` or `message`; no ambiguous empty body unless status 204 is documented | Needed to map cleanup and report evidence; Phase 09 must audit exact shape. |
| FR17-CC-SCH-003 | Schema Validation | Error response for missing required field has safe shape | Admin logged in | `POST /api/admin/coupons` | Missing `code` | 400 | JSON body has `message` or `error` string; no stack/sql trace | Negative schema contract for validation errors. |
| FR17-CC-SCH-004 | Schema Validation | Malformed JSON body returns client error and no stack trace | Admin logged in | `POST /api/admin/coupons` | Raw body `{ "code": "HW06BAD",` | 400 | Safe error response; no stack/sql leak | Parser-level schema case. |
| FR17-CC-SCH-005 | Schema Validation | Unsupported `Content-Type: text/plain` is not processed as success | Admin logged in | `POST /api/admin/coupons` with `Content-Type: text/plain` | JSON-looking coupon body as text | 400 hoặc 415 | No coupon created; no 5xx; error safe | Request content-type negative case. |
| FR17-CC-SCH-006 | Schema Validation | GET on create endpoint is not successful | Backend running | `GET /api/admin/coupons` | No body | 404 hoặc 405 | Does not create coupon; no create success schema | Method contract lists POST for create endpoint. |
| FR17-CC-SCH-007 | Schema Validation | Response time for valid create is below 1000ms | Admin logged in; unique valid body | `POST /api/admin/coupons` | Valid fixed or percent coupon body | 200 hoặc 201 | Response time `< 1000ms`; no unexpected 5xx | Basic API performance/contract assertion for Newman. |

## AI assumptions requiring Phase 09 audit

- Exact success status and success response shape for `POST /api/admin/coupons` are not specified in `api_specification.md`.
- `GET /api/coupons` is documented as admin; Phase 09 should verify whether it requires admin token and what list item shape it returns before using it as a hard assertion.
- `DELETE /api/admin/coupons/:id` is needed for cleanup but exact success status is not specified.
- Percent coupons with `discount_value > 100`, past `expired_at`, Unicode code, and case-variant `type` are useful raw cases but may need to be marked `INCOMPLETE` or refined during audit.
- Expired JWT testing should be excluded or replaced with invalid-token testing if no reliable blackbox expired token fixture exists.
