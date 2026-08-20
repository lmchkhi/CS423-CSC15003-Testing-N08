# FR-03 Reset Password - Raw AI-Generated Test Cases

Artifact type: Phase 02 raw AI-generated test cases.

Status: Raw, chưa human audit. Phase 03 sẽ gắn nhãn `VALID` / `INVALID` / `INCOMPLETE`, sửa case lỗi, và thêm human cases.

API chính: `POST /api/reset-password`

Setup API: `POST /api/forgot-password` để lấy `resetToken` hợp lệ khi cần.

Blackbox basis:

- `api_specification.md`: `/api/reset-password` body gồm `email`, `resetToken`, `newPassword`.
- `README.md` FR-03: OTP 6 chữ số, gắn với email đã request, không dùng cho email khác.
- `README.md` FR-01: password mạnh tối thiểu 8 ký tự, có uppercase, lowercase, digit, special char.
- `README.md` SEC-05/SEC-07: SQLi không crash/leak data; OTP có entropy/expiration/one-time use.
- Không dùng source code backend/frontend.

## Endpoint metadata extracted

```json
{
  "pool": "A",
  "feature": "FR-03",
  "method": "POST",
  "path": "/api/reset-password",
  "auth_required": false,
  "admin_required": false,
  "setup_endpoint": "POST /api/forgot-password",
  "body_fields": ["email", "resetToken", "newPassword"],
  "success_status": 200,
  "known_response_fields": ["message"],
  "stateful": true,
  "workflow": "forgot-password token issued -> reset-password consumes token -> token invalid after use",
  "security_rules": ["SEC-05", "SEC-07"],
  "assumptions": [
    "API spec does not define confirmPassword in /api/reset-password body, so API test cases must not require confirmPassword.",
    "Negative validation errors are expected to return 400-style client errors unless the observed API proves otherwise.",
    "Unknown email may return 400 or 404 depending implementation; Phase 03 must audit expected status after observation/spec review.",
    "Token expiration behavior is required by SEC-07 but exact TTL is not specified; expiration tests may need time-control or be marked incomplete if not observable."
  ]
}
```

## Coverage matrix

| Group | Target coverage |
| --- | --- |
| Domain | `email`, `resetToken`, `newPassword` required/missing/null/empty/wrong-type/boundary/valid partitions |
| Security | SEC-05 SQLi/XSS safe handling, SEC-07 token email binding, one-time use, no sensitive leak |
| Workflow | forgot-password setup, valid reset, wrong email-token pair, token reuse, postcondition login |
| Schema | status, JSON content type, required message/error body, no unexpected fields, response time |

## Raw test case table

| tc_id | group | description | precondition | request | input | expected_status | expected_fields | rationale |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR03-RP-DOM-001 | Domain | Reset password thành công với registered email, valid resetToken, valid strong password | `POST /api/forgot-password` đã tạo `resetToken` cho `test@eshop.com` | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 200 | `message` | Happy path theo FR-03; newPassword thỏa password rule FR-01. |
| FR03-RP-DOM-002 | Domain | Thiếu `email` | Có valid resetToken từ setup | `POST /api/reset-password` | `{"resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 400 | `message` hoặc `error` | `email` là field cần để gắn token với account. |
| FR03-RP-DOM-003 | Domain | `email` là `null` | Có valid resetToken từ setup | `POST /api/reset-password` | `{"email":null,"resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 400 | `message` hoặc `error` | Null email phải bị reject. |
| FR03-RP-DOM-004 | Domain | `email` là empty string | Có valid resetToken từ setup | `POST /api/reset-password` | `{"email":"","resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 400 | `message` hoặc `error` | Empty email không hợp lệ. |
| FR03-RP-DOM-005 | Domain | `email` sai format | Có valid resetToken từ setup | `POST /api/reset-password` | `{"email":"not-an-email","resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 400 | `message` hoặc `error` | Email format phải hợp lệ. |
| FR03-RP-DOM-006 | Domain | `email` unknown/unregistered | Không có user với email này theo test data | `POST /api/reset-password` | `{"email":"unknown-{{timestamp}}@eshop.test","resetToken":"123456","newPassword":"NewPass123!"}` | 400 hoặc 404 | `message` hoặc `error` | Unknown email không được reset password; expected status cần audit theo observed behavior. |
| FR03-RP-DOM-007 | Domain | `email` là wrong type number | Có valid resetToken từ setup | `POST /api/reset-password` | `{"email":12345,"resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 400 | `message` hoặc `error` | Sai kiểu dữ liệu cho email. |
| FR03-RP-DOM-008 | Domain | `email` có whitespace đầu/cuối | Có valid resetToken từ setup | `POST /api/reset-password` | `{"email":" test@eshop.com ","resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 400 hoặc 200 | `message` hoặc `error` | Cần audit behavior trim; raw case kiểm tra boundary whitespace. |
| FR03-RP-DOM-009 | Domain | Thiếu `resetToken` | Có setup forgot-password trước đó | `POST /api/reset-password` | `{"email":"test@eshop.com","newPassword":"NewPass123!"}` | 400 | `message` hoặc `error` | OTP/resetToken là field bắt buộc. |
| FR03-RP-DOM-010 | Domain | `resetToken` là `null` | Có setup forgot-password trước đó | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":null,"newPassword":"NewPass123!"}` | 400 | `message` hoặc `error` | Null token phải bị reject. |
| FR03-RP-DOM-011 | Domain | `resetToken` empty string | Có setup forgot-password trước đó | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"","newPassword":"NewPass123!"}` | 400 | `message` hoặc `error` | Empty token không hợp lệ. |
| FR03-RP-DOM-012 | Domain | `resetToken` chỉ 5 digits | Có setup forgot-password trước đó | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"12345","newPassword":"NewPass123!"}` | 400 | `message` hoặc `error` | FR-03/SEC-07 yêu cầu OTP 6 digits. |
| FR03-RP-DOM-013 | Domain | `resetToken` 7 digits | Có setup forgot-password trước đó | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"1234567","newPassword":"NewPass123!"}` | 400 | `message` hoặc `error` | Boundary trên độ dài OTP 6 digits. |
| FR03-RP-DOM-014 | Domain | `resetToken` có chữ cái | Có setup forgot-password trước đó | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"12ab56","newPassword":"NewPass123!"}` | 400 | `message` hoặc `error` | OTP phải là 6 chữ số. |
| FR03-RP-DOM-015 | Domain | Thiếu `newPassword` | Có valid resetToken từ setup | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}"}` | 400 | `message` hoặc `error` | Password mới là field bắt buộc. |
| FR03-RP-DOM-016 | Domain | `newPassword` là `null` | Có valid resetToken từ setup | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":null}` | 400 | `message` hoặc `error` | Null password phải bị reject. |
| FR03-RP-DOM-017 | Domain | `newPassword` quá ngắn | Có valid resetToken từ setup | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":"Aa1!"}` | 400 | `message` hoặc `error` | Password phải >=8 ký tự. |
| FR03-RP-DOM-018 | Domain | `newPassword` thiếu uppercase | Có valid resetToken từ setup | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":"newpass123!"}` | 400 | `message` hoặc `error` | Password rule yêu cầu uppercase. |
| FR03-RP-DOM-019 | Domain | `newPassword` thiếu lowercase | Có valid resetToken từ setup | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":"NEWPASS123!"}` | 400 | `message` hoặc `error` | Password rule yêu cầu lowercase. |
| FR03-RP-DOM-020 | Domain | `newPassword` thiếu digit | Có valid resetToken từ setup | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":"NewPassword!"}` | 400 | `message` hoặc `error` | Password rule yêu cầu digit. |
| FR03-RP-DOM-021 | Domain | `newPassword` thiếu special char | Có valid resetToken từ setup | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":"NewPass123"}` | 400 | `message` hoặc `error` | Password rule yêu cầu special char. |
| FR03-RP-DOM-022 | Domain | `newPassword` wrong type number | Có valid resetToken từ setup | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":12345678}` | 400 | `message` hoặc `error` | Sai kiểu dữ liệu cho password. |
| FR03-RP-SEC-001 | Security | SQL injection payload trong `email` không được gây 500/leak | Không cần token hợp lệ | `POST /api/reset-password` | `{"email":"' OR '1'='1","resetToken":"123456","newPassword":"NewPass123!"}` | 400 | `message` hoặc `error`, no stack trace | SEC-05: API phải xử lý input an toàn, không crash/leak. |
| FR03-RP-SEC-002 | Security | SQL injection payload trong `resetToken` không được gây 500/leak | Có registered email | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"'; SELECT 1; --","newPassword":"NewPass123!"}` | 400 | `message` hoặc `error`, no stack trace | SEC-05 với token field. |
| FR03-RP-SEC-003 | Security | XSS payload trong `email` bị reject hoặc xử lý an toàn | Không cần token hợp lệ | `POST /api/reset-password` | `{"email":"<script>alert(1)</script>@x.test","resetToken":"123456","newPassword":"NewPass123!"}` | 400 | `message` hoặc `error`, no reflected executable HTML | SEC-04-inspired reflected input safety. |
| FR03-RP-SEC-004 | Security | XSS payload trong `newPassword` không được reflect/leak | Có valid resetToken từ setup | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":"<script>alert(1)</script>Aa1!"}` | 400 | `message` hoặc `error`, no reflected password | Password input không được leak/reflected executable payload. |
| FR03-RP-SEC-005 | Security | Token của email A không reset được email B | Có `resetToken` được tạo cho `test@eshop.com`; có hoặc giả định email B tồn tại | `POST /api/reset-password` | `{"email":"other@eshop.com","resetToken":"{{tokenForTestEmail}}","newPassword":"NewPass123!"}` | 400 hoặc 403 | `message` hoặc `error` | FR-03: OTP chỉ hợp lệ cho email đã yêu cầu. |
| FR03-RP-SEC-006 | Security | Reuse resetToken sau khi reset thành công phải bị reject | Đã dùng `{{validResetToken}}` một lần thành công | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"{{usedResetToken}}","newPassword":"Another123!"}` | 400 | `message` hoặc `error` | SEC-07 yêu cầu OTP vô hiệu hóa sau khi dùng. |
| FR03-RP-SEC-007 | Security | Reset response không được trả password/password hash | Có valid resetToken từ setup | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 200 | `message`; not `password`, not `password_hash` | Sensitive data exposure check. |
| FR03-RP-SEC-008 | Security | Forgot-password setup token phải có 6 digits trước khi dùng reset | Registered email tồn tại | `POST /api/forgot-password` rồi dùng token cho reset | `{"email":"test@eshop.com"}` setup response token | 200 setup, 200 reset | setup `resetToken` matches `^[0-9]{6}$` | SEC-07 entropy/format observable qua setup API. |
| FR03-RP-WF-001 | Workflow | Full valid workflow forgot-password -> reset-password | User `test@eshop.com` tồn tại | `POST /api/forgot-password`; `POST /api/reset-password` | setup email then reset with returned token and `NewPass123!` | 200 then 200 | `message`, setup `resetToken` | Valid lifecycle FR-03. |
| FR03-RP-WF-002 | Workflow | Reset without prior forgot-password request | Không gọi setup trong test run hiện tại | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"123456","newPassword":"NewPass123!"}` | 400 | `message` hoặc `error` | Token phải được hệ thống issue trước. |
| FR03-RP-WF-003 | Workflow | Request two resetTokens, old token should not be accepted if latest-token policy applies | Gọi forgot-password hai lần cho cùng email | `POST /api/reset-password` | dùng token đầu tiên với `NewPass123!` | 400 hoặc 200 | `message` hoặc `error` | Raw assumption cần audit: spec không nói multiple-token policy. |
| FR03-RP-WF-004 | Workflow | Request two resetTokens, latest token resets successfully | Gọi forgot-password hai lần cho cùng email | `POST /api/reset-password` | dùng token thứ hai với `NewPass123!` | 200 | `message` | Latest issued token nên hợp lệ nếu multiple-token policy invalidates old token. |
| FR03-RP-WF-005 | Workflow | Sau reset thành công, login bằng old password thất bại | Reset password thành công sang `NewPass123!` | `POST /api/login` | `{"email":"test@eshop.com","password":"Test1234!"}` | 400 hoặc 401 | `message` hoặc `error` | Postcondition: old password không còn hợp lệ. |
| FR03-RP-WF-006 | Workflow | Sau reset thành công, login bằng new password thành công | Reset password thành công sang `NewPass123!` | `POST /api/login` | `{"email":"test@eshop.com","password":"NewPass123!"}` | 200 | `token`, `user` | Postcondition: password mới có hiệu lực. |
| FR03-RP-WF-007 | Workflow | ResetToken expired bị reject | Có token đã quá TTL hoặc giả lập chờ quá hạn nếu feasible | `POST /api/reset-password` | `{"email":"test@eshop.com","resetToken":"{{expiredResetToken}}","newPassword":"NewPass123!"}` | 400 | `message` hoặc `error` | SEC-07 yêu cầu OTP có thời hạn; may need Phase 03 mark INCOMPLETE nếu TTL không observable. |
| FR03-RP-WF-008 | Workflow | Repeated invalid reset attempts không làm token hợp lệ bị consume | Có valid token; trước đó gửi một request sai password weak với cùng token | `POST /api/reset-password` | lần sau dùng cùng token với `NewPass123!` | 200 | `message` | Token không nên bị consume khi reset failed do invalid password; expected cần audit. |
| FR03-RP-SCH-001 | Schema | Success response là JSON | Có valid resetToken từ setup | `POST /api/reset-password` | valid body | 200 | `Content-Type: application/json` | API response phải là JSON. |
| FR03-RP-SCH-002 | Schema | Success response có `message` dạng string | Có valid resetToken từ setup | `POST /api/reset-password` | valid body | 200 | `message:string` | API spec patterns trả message cho auth flows. |
| FR03-RP-SCH-003 | Schema | Error response cho missing email có message/error | Missing email case | `POST /api/reset-password` | body thiếu `email` | 400 | `message` hoặc `error` | Negative response cần shape nhất quán. |
| FR03-RP-SCH-004 | Schema | Error response cho invalid token không expose stack trace | Invalid token case | `POST /api/reset-password` | token invalid | 400 | `message` hoặc `error`; not `stack`, not `trace` | Security/schema: no internal details. |
| FR03-RP-SCH-005 | Schema | Response time dưới 1000ms cho happy path | Có valid resetToken từ setup | `POST /api/reset-password` | valid body | 200 | response time `<1000ms` | Basic performance assertion theo Postman/Newman guide. |
| FR03-RP-SCH-006 | Schema | Response không trả `resetToken` trong reset-password success | Có valid resetToken từ setup | `POST /api/reset-password` | valid body | 200 | not `resetToken` | Reset endpoint không nên trả lại token đã consume. |
| FR03-RP-SCH-007 | Schema | Response không trả `newPassword` hoặc password plaintext | Có valid resetToken từ setup | `POST /api/reset-password` | valid body | 200 | not `newPassword`, not `password` | Sensitive field không xuất hiện trong response. |
| FR03-RP-SCH-008 | Schema | Unknown route/method contract: GET reset-password không được thành công | Backend running | `GET /api/reset-password` | no body | 404 hoặc 405 | `message` hoặc empty body | Endpoint chỉ được spec là POST; GET không nên thành công. |

## Notes for Phase 03 audit

- `FR03-RP-DOM-006`, `FR03-RP-WF-003`, `FR03-RP-WF-007`, `FR03-RP-WF-008`, `FR03-RP-SCH-008` có assumption cần audit kỹ sau khi observe API behavior.
- Các case có thể đổi password của sample user phải có cleanup/reset-back strategy ở Phase 04 để tránh ảnh hưởng các API sau.
- API spec không có `confirmPassword`; mọi case yêu cầu field này ở API level phải bị đánh `INVALID` nếu AI sinh ra ở phase sau.
