# FR-09 Apply Coupon - Raw AI-Generated Test Cases

Artifact type: Phase 05 raw AI-generated test cases.

Status: Raw, chưa human audit. Phase 06 sẽ gắn nhãn `VALID` / `INVALID` / `INCOMPLETE`, sửa case lỗi, và thêm human cases.

API chính: `POST /api/apply-coupon`

Setup/verify APIs dự kiến: `POST /api/login` để lấy JWT user token; có thể cần user thứ hai để kiểm tra `user_id` ownership/IDOR.

Blackbox basis:

- `api_specification.md`: `/api/apply-coupon` body gồm `code`, `total_amount`, `user_id`; success response chứa `discount_amount` và `final_amount`.
- `README.md` FR-09: coupon chỉ hợp lệ khi thỏa C1-C5: code tồn tại/active, chưa hết hạn, đủ `min_order_amount`, user có JWT hợp lệ, chưa dùng hết lượt.
- `README.md` FR-09: công thức `percent`, `fixed`, `final_amount = total - discount_amount`.
- Sample coupons: `SAVE10`, `BIGBUY`, `VIP100`, `EXPIRED`.
- `README.md` SEC-02/SEC-05: API có tính bảo mật yêu cầu JWT hợp lệ; SQLi không crash/leak data.
- Không dùng source code backend/frontend.

## Endpoint metadata extracted

```json
{
  "pool": "B",
  "feature": "FR-09",
  "method": "POST",
  "path": "/api/apply-coupon",
  "auth_required": true,
  "admin_required": false,
  "setup_endpoint": "POST /api/login",
  "body_fields": ["code", "total_amount", "user_id"],
  "success_status": 200,
  "known_response_fields": ["discount_amount", "final_amount"],
  "stateful": true,
  "workflow": "coupon eligibility check -> discount calculation -> per-user usage-limit behavior",
  "security_rules": ["SEC-02", "SEC-05"],
  "assumptions": [
    "API specification lists body user_id, while FR-09 C4 requires a valid JWT token; Phase 06 must audit whether user_id must match the authenticated user.",
    "Negative validation errors are expected to return 400-style client errors unless observed API behavior proves otherwise.",
    "Auth failures should return 401; ownership/IDOR failures may return 403 or 400 depending API convention and need audit.",
    "Coupon usage-limit tests assume applying a coupon increments or reserves usage for the user; Phase 06 must verify whether usage is counted at apply-coupon or checkout.",
    "Response body exactness is based on api_specification.md saying the JSON contains discount_amount and final_amount; Phase 06 should confirm whether message/code fields are also allowed."
  ]
}
```

## Coverage matrix

| Group | Target coverage |
| --- | --- |
| Domain | `code`, `total_amount`, `user_id` required/missing/null/empty/wrong-type/boundary/valid partitions; sample coupon min-order and expiry conditions C1-C3 |
| Security | SEC-02 missing/malformed/invalid token, C4 auth, IDOR/body `user_id` mismatch, SQLi/XSS safe handling, no sensitive leak |
| Workflow | C5 per-user usage limit, repeated use, per-user separation, failed apply should not consume usage |
| Schema | `discount_amount`/`final_amount` exact calculation, JSON content type, error shape, no unexpected 500, response time |

## Raw test case table

| tc_id | group | description | precondition | request | input | expected_status | expected_fields | rationale |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR09-AC-DOM-001 | Domain | Apply `SAVE10` percent coupon with valid total above min | User logged in; body `user_id` belongs to token user; `SAVE10` not used by this user | `POST /api/apply-coupon` with `Authorization: Bearer {{userToken}}` | `{"code":"SAVE10","total_amount":500000,"user_id":{{userId}}}` | 200 | `discount_amount=50000`, `final_amount=450000` | Happy path for percent coupon: 10% of 500000. |
| FR09-AC-DOM-002 | Domain | Apply `BIGBUY` fixed coupon at exact min amount | User logged in; `BIGBUY` not used by this user | `POST /api/apply-coupon` | `{"code":"BIGBUY","total_amount":500000,"user_id":{{userId}}}` | 200 | `discount_amount=50000`, `final_amount=450000` | Happy path for fixed coupon and exact C3 boundary. |
| FR09-AC-DOM-003 | Domain | Apply `VIP100` fixed coupon at exact min amount | User logged in; `VIP100` usage count below 2 | `POST /api/apply-coupon` | `{"code":"VIP100","total_amount":300000,"user_id":{{userId}}}` | 200 | `discount_amount=100000`, `final_amount=200000` | Tests fixed formula and min-order inclusive boundary. |
| FR09-AC-DOM-004 | Domain | `SAVE10` with exact min amount | User logged in; `SAVE10` unused | `POST /api/apply-coupon` | `{"code":"SAVE10","total_amount":300000,"user_id":{{userId}}}` | 200 | `discount_amount=30000`, `final_amount=270000` | C3 says total must be `>= min_order_amount`. |
| FR09-AC-DOM-005 | Domain | `SAVE10` just below min amount | User logged in | `POST /api/apply-coupon` | `{"code":"SAVE10","total_amount":299999,"user_id":{{userId}}}` | 400 | `message` hoặc `error`; no discount fields | Boundary just below C3 must be rejected. |
| FR09-AC-DOM-006 | Domain | `BIGBUY` just below min amount | User logged in | `POST /api/apply-coupon` | `{"code":"BIGBUY","total_amount":499999,"user_id":{{userId}}}` | 400 | `message` hoặc `error`; no discount fields | Fixed coupon still requires C3 min order. |
| FR09-AC-DOM-007 | Domain | `EXPIRED` coupon with sufficient total | User logged in | `POST /api/apply-coupon` | `{"code":"EXPIRED","total_amount":200000,"user_id":{{userId}}}` | 400 | `message` hoặc `error` | C2 expired coupon must be rejected even if C3 is satisfied. |
| FR09-AC-DOM-008 | Domain | Unknown coupon code | User logged in | `POST /api/apply-coupon` | `{"code":"NOTREAL","total_amount":500000,"user_id":{{userId}}}` | 400 hoặc 404 | `message` hoặc `error`; no discount fields | C1 requires code exists and active; exact status needs audit. |
| FR09-AC-DOM-009 | Domain | Missing `code` | User logged in | `POST /api/apply-coupon` | `{"total_amount":500000,"user_id":{{userId}}}` | 400 | `message` hoặc `error` | `code` is required by API spec. |
| FR09-AC-DOM-010 | Domain | `code` is `null` | User logged in | `POST /api/apply-coupon` | `{"code":null,"total_amount":500000,"user_id":{{userId}}}` | 400 | `message` hoặc `error` | Null code is invalid. |
| FR09-AC-DOM-011 | Domain | `code` is empty string | User logged in | `POST /api/apply-coupon` | `{"code":"","total_amount":500000,"user_id":{{userId}}}` | 400 | `message` hoặc `error` | Empty code cannot satisfy C1. |
| FR09-AC-DOM-012 | Domain | `code` is whitespace-only | User logged in | `POST /api/apply-coupon` | `{"code":"   ","total_amount":500000,"user_id":{{userId}}}` | 400 | `message` hoặc `error` | Whitespace-only code should not match coupon. |
| FR09-AC-DOM-013 | Domain | Lowercase coupon code `save10` | User logged in; `SAVE10` exists | `POST /api/apply-coupon` | `{"code":"save10","total_amount":500000,"user_id":{{userId}}}` | 400 hoặc 200 | If accepted, correct SAVE10 calculation; otherwise error shape | Case sensitivity is not specified; Phase 06 must audit expected behavior. |
| FR09-AC-DOM-014 | Domain | `code` wrong type number | User logged in | `POST /api/apply-coupon` | `{"code":12345,"total_amount":500000,"user_id":{{userId}}}` | 400 | `message` hoặc `error` | Wrong type for string field. |
| FR09-AC-DOM-015 | Domain | Missing `total_amount` | User logged in | `POST /api/apply-coupon` | `{"code":"SAVE10","user_id":{{userId}}}` | 400 | `message` hoặc `error` | API needs total to check C3 and calculate discount. |
| FR09-AC-DOM-016 | Domain | `total_amount` is `null` | User logged in | `POST /api/apply-coupon` | `{"code":"SAVE10","total_amount":null,"user_id":{{userId}}}` | 400 | `message` hoặc `error` | Null amount cannot be calculated. |
| FR09-AC-DOM-017 | Domain | `total_amount` is zero | User logged in | `POST /api/apply-coupon` | `{"code":"SAVE10","total_amount":0,"user_id":{{userId}}}` | 400 | `message` hoặc `error` | Amount zero fails C3 and should not calculate discount. |
| FR09-AC-DOM-018 | Domain | `total_amount` is negative | User logged in | `POST /api/apply-coupon` | `{"code":"SAVE10","total_amount":-1,"user_id":{{userId}}}` | 400 | `message` hoặc `error`; no negative final amount | Negative amount is invalid domain input. |
| FR09-AC-DOM-019 | Domain | `total_amount` wrong type string | User logged in | `POST /api/apply-coupon` | `{"code":"SAVE10","total_amount":"500000","user_id":{{userId}}}` | 400 | `message` hoặc `error` | Wrong type should not be coerced silently. |
| FR09-AC-DOM-020 | Domain | Missing `user_id` | User logged in | `POST /api/apply-coupon` | `{"code":"SAVE10","total_amount":500000}` | 400 | `message` hoặc `error` | API spec includes `user_id`; Phase 06 must audit if token alone is accepted. |
| FR09-AC-SEC-001 | Security | Missing Authorization header | No token sent | `POST /api/apply-coupon` | `{"code":"SAVE10","total_amount":500000,"user_id":{{userId}}}` | 401 | `message` hoặc `error`; no discount fields | FR-09 C4 and SEC-02 require valid JWT. |
| FR09-AC-SEC-002 | Security | Malformed Authorization header | Header `Authorization: Bearer` without token | `POST /api/apply-coupon` | Valid SAVE10 body | 401 | `message` hoặc `error` | Malformed token is not valid JWT. |
| FR09-AC-SEC-003 | Security | Invalid JWT token | Header `Authorization: Bearer invalid.token.value` | `POST /api/apply-coupon` | Valid SAVE10 body | 401 | `message` hoặc `error` | Invalid JWT must be rejected. |
| FR09-AC-SEC-004 | Security | Expired JWT token | Have an expired token fixture if available | `POST /api/apply-coupon` | Valid SAVE10 body | 401 | `message` hoặc `error` | SEC-02 implies token validity, including expiration. |
| FR09-AC-SEC-005 | Security | Body `user_id` belongs to another user | Login as user A; know user B id | `POST /api/apply-coupon` | `{"code":"SAVE10","total_amount":500000,"user_id":{{otherUserId}}}` | 403 hoặc 400 | Error body; no discount; no usage consumed for B | IDOR: client must not apply coupon for another user. |
| FR09-AC-SEC-006 | Security | SQL injection payload in `code` | User logged in | `POST /api/apply-coupon` | `{"code":"' OR '1'='1","total_amount":500000,"user_id":{{userId}}}` | 400 | `message` hoặc `error`; no stack/sql leak; no 5xx | SEC-05 requires parameterized query behavior. |
| FR09-AC-SEC-007 | Security | SQL injection-like payload in `user_id` | User logged in | `POST /api/apply-coupon` | `{"code":"SAVE10","total_amount":500000,"user_id":"1 OR 1=1"}` | 400 | `message` hoặc `error`; no stack/sql leak; no 5xx | Wrong type plus SQLi should not crash/leak. |
| FR09-AC-SEC-008 | Security | XSS-like payload in `code` | User logged in | `POST /api/apply-coupon` | `{"code":"<script>alert(1)</script>","total_amount":500000,"user_id":{{userId}}}` | 400 | Does not reflect executable HTML/script; no 5xx | User input should be handled safely. |
| FR09-AC-SEC-009 | Security | Extra `role` field in body cannot escalate privilege | User logged in as normal user | `POST /api/apply-coupon` | `{"code":"SAVE10","total_amount":500000,"user_id":{{userId}},"role":"admin"}` | 200 hoặc 400 | If accepted, same discount as normal; role ignored; no admin-only data | Extra client-controlled role must not change authorization. |
| FR09-AC-SEC-010 | Security | Success response does not leak user token/password fields | User logged in; valid coupon | `POST /api/apply-coupon` | Valid SAVE10 body | 200 | No `password`, `password_hash`, `token`, `role` fields | API should return only discount calculation public fields. |
| FR09-AC-WF-001 | Workflow/State | `SAVE10` cannot be reused by the same user after successful use | User logged in; first apply SAVE10 succeeds | `POST /api/apply-coupon` twice | Second request same body as first | 400 | `message` hoặc `error`; no discount fields | C5: uses by user must be `< max_uses_per_user`, `SAVE10` max is 1. |
| FR09-AC-WF-002 | Workflow/State | `VIP100` first use succeeds | User logged in; `VIP100` usage count 0 | `POST /api/apply-coupon` | `{"code":"VIP100","total_amount":500000,"user_id":{{userId}}}` | 200 | `discount_amount=100000`, `final_amount=400000` | C5 allows up to 2 uses for VIP100. |
| FR09-AC-WF-003 | Workflow/State | `VIP100` second use by same user still succeeds | Same user has used VIP100 once | `POST /api/apply-coupon` | Same VIP100 body | 200 | `discount_amount=100000`, `final_amount=400000` | C5 says usage count must be less than max; second use is still valid when max is 2. |
| FR09-AC-WF-004 | Workflow/State | `VIP100` third use by same user is rejected | Same user has used VIP100 twice | `POST /api/apply-coupon` | Same VIP100 body | 400 | `message` hoặc `error` | Third use violates `max_uses_per_user=2`. |
| FR09-AC-WF-005 | Workflow/State | Coupon usage limit is per-user, not global | User A already used SAVE10 once; login as user B | `POST /api/apply-coupon` | User B applies SAVE10 with valid total and own user_id | 200 | `discount_amount=50000`, `final_amount=450000` | C5 wording is per user, so another user should still be eligible. |
| FR09-AC-WF-006 | Workflow/State | Failed below-min attempt does not consume coupon usage | User has not used SAVE10 | `POST /api/apply-coupon` twice | First total `299999`, then total `500000` | 400 then 200 | Second response has correct SAVE10 discount | Invalid attempt should not count as a successful use. |
| FR09-AC-WF-007 | Workflow/State | Failed unknown-code attempt does not affect valid coupon use | User logged in | `POST /api/apply-coupon` twice | First `NOTREAL`, then `SAVE10` valid body | 400/404 then 200 | Second response has correct SAVE10 discount | Failed C1 should not consume another coupon or corrupt state. |
| FR09-AC-WF-008 | Workflow/State | IDOR rejection does not consume real owner usage | Login as user A; send body `user_id` of user B | `POST /api/apply-coupon` then login/apply as user B | First mismatched request; second valid request as B | 403/400 then 200 | User B can still apply valid coupon | Security failure should not consume B's coupon quota. |
| FR09-AC-SCH-001 | Schema Validation | Success response has JSON Content-Type | User logged in; valid SAVE10 body | `POST /api/apply-coupon` | Valid SAVE10 body | 200 | Header `Content-Type` contains `application/json` | Contract should return JSON. |
| FR09-AC-SCH-002 | Schema Validation | Success response fields have exact numeric types | User logged in; valid BIGBUY body | `POST /api/apply-coupon` | Valid BIGBUY body | 200 | `discount_amount:number`, `final_amount:number` | API spec names both fields as calculation output. |
| FR09-AC-SCH-003 | Schema Validation | Percent coupon calculation is exact | User logged in; SAVE10 unused | `POST /api/apply-coupon` | `{"code":"SAVE10","total_amount":333333,"user_id":{{userId}}}` | 200 | `discount_amount=33333.3` or documented rounding; `final_amount=299999.7` or documented rounding | Percent calculation/rounding needs Phase 06 audit because spec does not define rounding. |
| FR09-AC-SCH-004 | Schema Validation | Fixed coupon calculation is exact | User logged in; BIGBUY unused | `POST /api/apply-coupon` | `{"code":"BIGBUY","total_amount":600000,"user_id":{{userId}}}` | 200 | `discount_amount=50000`, `final_amount=550000` | Fixed coupon should not depend on total beyond min threshold. |
| FR09-AC-SCH-005 | Schema Validation | Error response for missing code has safe shape | User logged in | `POST /api/apply-coupon` | Missing `code` body | 400 | `message` hoặc `error` string; no stack/sql trace | Negative response schema should be stable and safe. |
| FR09-AC-SCH-006 | Schema Validation | `GET /api/apply-coupon` is not successful | Backend running | `GET /api/apply-coupon` | No body | 404 hoặc 405 | Does not return discount success schema | Method contract lists only POST. |
| FR09-AC-SCH-007 | Schema Validation | Malformed JSON body returns client error and no stack trace | User logged in | `POST /api/apply-coupon` | Raw body `{ "code": "SAVE10",` | 400 | Error response is safe; no stack/sql leak | Parser-level schema case. |
| FR09-AC-SCH-008 | Schema Validation | Response time for valid coupon is below 1000ms | User logged in; valid coupon | `POST /api/apply-coupon` | Valid SAVE10 or BIGBUY body | 200 | Response time `< 1000ms`; correct calculation | Basic API performance/contract assertion for Newman. |

## AI assumptions requiring Phase 06 audit

- Exact status for unknown coupon may be `400` or `404`.
- Lowercase coupon behavior is unspecified; Phase 06 should decide whether to keep as executable boundary or mark incomplete.
- Percent rounding is unspecified for non-integer discount amounts.
- Usage count timing is unclear: applying a coupon may or may not persist usage before checkout. C5 cases should be audited with observed behavior before final execution.
- API spec body includes `user_id`, but FR-09 C4 requires JWT. Ownership/IDOR cases need observed token/user setup before finalizing expected status.
