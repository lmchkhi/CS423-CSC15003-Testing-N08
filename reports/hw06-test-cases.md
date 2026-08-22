# HW06 API Test Case Master

File này là bảng master/index để điền dần test cases qua các phase generate, audit, extend và execute. Tất cả test cases phải dựa trên blackbox inputs: `README.md`, `api_specification.md`, observed API responses và execution evidence.

Mỗi test case chi tiết nên có một file Markdown riêng trong `test-cases/hw06-api`. File master này chỉ giữ vai trò index/summary để report dễ tổng hợp.

## 0. Folder layout và naming convention

```text
test-cases/
  hw06-api/
    TEMPLATE-HW06-API-TEST-CASE.md
    fr03-reset-password/
      TC-FR03-API-DOM-001.md
      TC-FR03-API-SEC-001.md
      TC-FR03-API-WF-001.md
      TC-FR03-API-SCH-001.md
    fr09-apply-coupon/
      TC-FR09-API-DOM-001.md
      TC-FR09-API-SEC-001.md
      TC-FR09-API-WF-001.md
      TC-FR09-API-SCH-001.md
    fr17-admin-coupons/
      TC-FR17-API-DOM-001.md
      TC-FR17-API-SEC-001.md
      TC-FR17-API-WF-001.md
      TC-FR17-API-SCH-001.md
```

Quy ước đặt tên:

| Thành phần | Ý nghĩa |
| --- | --- |
| `TC` | Test case |
| `FR03`, `FR09`, `FR17` | Requirement được phân |
| `API` | Phân biệt với test case UI/domain cũ như `TC-FR03-DT-001.md` |
| `DOM` | Domain partition |
| `SEC` | Security |
| `WF` | Workflow/state/lifecycle |
| `SCH` | Schema/contract validation |
| `001` | Số thứ tự trong nhóm |

Template chi tiết: `test-cases/hw06-api/TEMPLATE-HW06-API-TEST-CASE.md`.

## 1. API selection

| API ID | FR | Endpoint | Method | Pool | Vai trò |
| --- | --- | --- | --- | --- | --- |
| API-1 | FR-03 | `/api/reset-password` | POST | Pool A | API chính |
| API-2 | FR-09 | `/api/apply-coupon` | POST | Pool B | API chính |
| API-3 | FR-17 | `/api/admin/coupons` | POST | Pool C | API chính |

## 2. Test case master table

Mỗi row trong bảng này là một final test case có thể map sang Postman/Newman ở Phase 04. File chi tiết của từng case nằm trong `test-cases/hw06-api/...`; bảng master giữ thông tin đủ để review nhanh, lọc theo source/group/audit label và cập nhật execution result sau khi chạy.

| API ID | TC ID | File | Source | Group | Description | Preconditions | Request/Input | Expected Status | Expected Fields/Assertions | Audit Label | Execution Result | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| API-1 | TC-FR03-API-DOM-001 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-001.md` | AI | Domain | Reset password thành công với registered email, valid resetToken và valid strong password | POST /api/forgot-password tạo resetToken cho registered test user. | `{"email":"{{fr03Email}}","resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 200 | JSON body có `message:string`; không có `password`, `newPassword`, `resetToken`. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-DOM-002 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-002.md` | AI | Domain | Thiếu field `email` | Có valid resetToken từ setup. | `{"resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-DOM-003 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-003.md` | AI | Domain | `email` là null | Có valid resetToken từ setup. | `{"email":null,"resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-DOM-004 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-004.md` | AI | Domain | `email` là empty string | Có valid resetToken từ setup. | `{"email":"","resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-DOM-005 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-005.md` | AI | Domain | `email` sai format | Có valid resetToken từ setup. | `{"email":"not-an-email","resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-DOM-006 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-006.md` | AI | Domain | Unknown/unregistered email không được reset password | Không có account với `unknown-{{runId}}@eshop.test`. | `{"email":"unknown-{{runId}}@eshop.test","resetToken":"123456","newPassword":"NewPass123!"}` | 4xx | Response không thành công; có `message` hoặc `error`; không trả `resetToken`/password. | INCOMPLETE | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-DOM-007 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-007.md` | AI | Domain | `email` là number | Có valid resetToken từ setup. | `{"email":12345,"resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-DOM-008 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-008.md` | AI | Domain | `email` có whitespace đầu/cuối | Có valid resetToken từ setup cho `test@eshop.com`. | `{"email":" test@eshop.com ","resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 4xx | Không reset thành công cho email có whitespace; không 5xx. | INCOMPLETE | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-DOM-009 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-009.md` | AI | Domain | Thiếu field `resetToken` | Có setup forgot-password trước đó. | `{"email":"test@eshop.com","newPassword":"NewPass123!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-DOM-010 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-010.md` | AI | Domain | `resetToken` là null | Có setup forgot-password trước đó. | `{"email":"test@eshop.com","resetToken":null,"newPassword":"NewPass123!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-DOM-011 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-011.md` | AI | Domain | `resetToken` là empty string | Có setup forgot-password trước đó. | `{"email":"test@eshop.com","resetToken":"","newPassword":"NewPass123!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-DOM-012 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-012.md` | AI | Domain | `resetToken` chỉ 5 digits | Có setup forgot-password trước đó. | `{"email":"test@eshop.com","resetToken":"12345","newPassword":"NewPass123!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-DOM-013 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-013.md` | AI | Domain | `resetToken` dài 7 digits | Có setup forgot-password trước đó. | `{"email":"test@eshop.com","resetToken":"1234567","newPassword":"NewPass123!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-DOM-014 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-014.md` | AI | Domain | `resetToken` chứa chữ cái | Có setup forgot-password trước đó. | `{"email":"test@eshop.com","resetToken":"12ab56","newPassword":"NewPass123!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-DOM-015 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-015.md` | AI | Domain | Thiếu field `newPassword` | Có valid resetToken từ setup. | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Failed | Newman: `reports/newman/hw06-fr03-reset-password.html`; Bug: `reports/bug-reports/BUG-FR03-API-001.md` |
| API-1 | TC-FR03-API-DOM-016 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-016.md` | AI | Domain | `newPassword` là null | Có valid resetToken từ setup. | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":null}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Failed | Newman: `reports/newman/hw06-fr03-reset-password.html`; Bug: `reports/bug-reports/BUG-FR03-API-001.md` |
| API-1 | TC-FR03-API-DOM-017 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-017.md` | AI | Domain | `newPassword` quá ngắn | Có valid resetToken từ setup. | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":"Aa1!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Failed | Newman: `reports/newman/hw06-fr03-reset-password.html`; Bug: `reports/bug-reports/BUG-FR03-API-001.md` |
| API-1 | TC-FR03-API-DOM-018 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-018.md` | AI | Domain | `newPassword` thiếu uppercase | Có valid resetToken từ setup. | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":"newpass123!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Failed | Newman: `reports/newman/hw06-fr03-reset-password.html`; Bug: `reports/bug-reports/BUG-FR03-API-001.md` |
| API-1 | TC-FR03-API-DOM-019 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-019.md` | AI | Domain | `newPassword` thiếu lowercase | Có valid resetToken từ setup. | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":"NEWPASS123!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Failed | Newman: `reports/newman/hw06-fr03-reset-password.html`; Bug: `reports/bug-reports/BUG-FR03-API-001.md` |
| API-1 | TC-FR03-API-DOM-020 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-020.md` | AI | Domain | `newPassword` thiếu digit | Có valid resetToken từ setup. | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":"NewPassword!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Failed | Newman: `reports/newman/hw06-fr03-reset-password.html`; Bug: `reports/bug-reports/BUG-FR03-API-001.md` |
| API-1 | TC-FR03-API-DOM-021 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-021.md` | AI | Domain | `newPassword` thiếu special char | Có valid resetToken từ setup. | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":"NewPass123"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Failed | Newman: `reports/newman/hw06-fr03-reset-password.html`; Bug: `reports/bug-reports/BUG-FR03-API-001.md` |
| API-1 | TC-FR03-API-DOM-022 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-022.md` | AI | Domain | `newPassword` là number | Có valid resetToken từ setup. | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":12345678}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | VALID | Failed | Newman: `reports/newman/hw06-fr03-reset-password.html`; Bug: `reports/bug-reports/BUG-FR03-API-001.md` |
| API-1 | TC-FR03-API-DOM-023 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-023.md` | Human | Domain | `newPassword` là empty string | Có valid resetToken từ setup. | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":""}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | HUMAN_ADDED | Failed | Newman: `reports/newman/hw06-fr03-reset-password.html`; Bug: `reports/bug-reports/BUG-FR03-API-001.md` |
| API-1 | TC-FR03-API-DOM-024 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-024.md` | Human | Domain | `newPassword` đúng boundary tối thiểu 8 ký tự và đủ complexity | Có valid resetToken từ setup. | `{"email":"{{fr03Email}}","resetToken":"{{validResetToken}}","newPassword":"Aa12345!"}` | 200 | JSON body có `message:string`; không có password/token. | HUMAN_ADDED | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-DOM-025 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-DOM-025.md` | Human | Domain | `resetToken` 6 digits nhưng có whitespace đầu/cuối | Có valid resetToken từ setup. | `{"email":"test@eshop.com","resetToken":" {{validResetToken}} ","newPassword":"NewPass123!"}` | 400 | JSON body có `message` hoặc `error`; không 5xx. | HUMAN_ADDED | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SEC-001 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SEC-001.md` | AI | Security | SQL injection payload trong `email` không gây 500/leak | Không cần token hợp lệ. | `{"email":"' OR '1'='1","resetToken":"123456","newPassword":"NewPass123!"}` | 400 | Có `message` hoặc `error`; không có `stack`, `trace`, SQL error. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SEC-002 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SEC-002.md` | AI | Security | SQL injection payload trong `resetToken` không gây 500/leak | Có registered email. | `{"email":"test@eshop.com","resetToken":"'; SELECT 1; --","newPassword":"NewPass123!"}` | 400 | Có `message` hoặc `error`; không có `stack`, `trace`, SQL error. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SEC-003 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SEC-003.md` | AI | Security | XSS-like payload trong `email` bị xử lý an toàn | Không cần token hợp lệ. | `{"email":"<script>alert(1)</script>@x.test","resetToken":"123456","newPassword":"NewPass123!"}` | 400 | Không reflect executable HTML/script; không 5xx. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SEC-004 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SEC-004.md` | AI | Security | XSS-like payload trong `newPassword` không bị reflect/leak | Có valid resetToken từ setup. | `{"email":"test@eshop.com","resetToken":"{{validResetToken}}","newPassword":"<script>alert(1)</script>Aa1!"}` | 400 | Không reflect `newPassword`; không 5xx. | VALID | Failed | Newman: `reports/newman/hw06-fr03-reset-password.html`; Bug: `reports/bug-reports/BUG-FR03-API-001.md` |
| API-1 | TC-FR03-API-SEC-005 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SEC-005.md` | AI | Security | Token của email A không reset được email B | Tạo/đảm bảo account A và account B; lấy token cho A. | `{"email":"{{fr03EmailB}}","resetToken":"{{tokenForEmailA}}","newPassword":"NewPass123!"}` | 4xx | Không reset email B; có `message` hoặc `error`; không 5xx. | INCOMPLETE | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SEC-006 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SEC-006.md` | AI | Security | Reuse resetToken sau reset thành công bị reject | Đã dùng token một lần thành công. | `{"email":"{{fr03Email}}","resetToken":"{{usedResetToken}}","newPassword":"Another123!"}` | 400 | Có `message` hoặc `error`; không 5xx. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SEC-007 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SEC-007.md` | AI | Security | Reset success response không trả password/password hash | Có valid resetToken từ setup. | `{"email":"{{fr03Email}}","resetToken":"{{validResetToken}}","newPassword":"NewPass123!"}` | 200 | Response không có `password`, `password_hash`, `newPassword`. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SEC-008 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SEC-008.md` | AI | Security | Forgot-password setup trả OTP 6 digits trước khi reset | Registered email tồn tại. | `setup POST /api/forgot-password, sau đó reset với token trả về` | 200 setup, 200 reset | Setup response có `resetToken` match `^[0-9]{6}$`; reset success có `message`. | VALID | Failed | Newman: `reports/newman/hw06-fr03-reset-password.html`; Bug: `reports/bug-reports/BUG-FR03-API-002.md` |
| API-1 | TC-FR03-API-WF-001 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-WF-001.md` | AI | Workflow/State | Full workflow forgot-password -> reset-password | Registered user tồn tại hoặc được tạo bằng register API. | `1) forgot-password email; 2) reset-password với returned token` | 200 then 200 | Setup có `resetToken`; reset có `message`. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-WF-002 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-WF-002.md` | AI | Workflow/State | Reset without prior forgot-password request | Không gọi setup trong test run hiện tại. | `{"email":"test@eshop.com","resetToken":"123456","newPassword":"NewPass123!"}` | 400 | Có `message` hoặc `error`; không 5xx. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-WF-003 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-WF-003.md` | AI | Workflow/State | Token mới nhất được issue có thể reset password thành công | Gọi forgot-password hai lần cho cùng email và dùng token response của lần 2. | `{"email":"{{fr03Email}}","resetToken":"{{secondResetToken}}","newPassword":"NewPass123!"}` | 200 | Reset response có `message`. | INCOMPLETE | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-WF-004 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-WF-004.md` | AI | Workflow/State | Sau reset thành công, old password không login được | Tạo user với `OldPass123!`, reset sang `NewPass123!`. | `POST /api/login với old password` | 400 hoặc 401 | Login old password thất bại; có `message` hoặc `error`. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-WF-005 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-WF-005.md` | AI | Workflow/State | Sau reset thành công, new password login được | Tạo user với `OldPass123!`, reset sang `NewPass123!`. | `POST /api/login với new password` | 200 | Response có `token` và `user`. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-WF-006 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-WF-006.md` | AI | Workflow/State | Failed reset do weak password không consume valid token | Có valid token từ setup. | `1) reset với weak password; 2) reset lại cùng token với strong password` | 400 then 200 | Lần 1 có error; lần 2 có `message` success. | INCOMPLETE | Failed | Newman: `reports/newman/hw06-fr03-reset-password.html`; Bug: `reports/bug-reports/BUG-FR03-API-001.md` |
| API-1 | TC-FR03-API-WF-007 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-WF-007.md` | Human | Workflow/State | Failed reset do weak password không đổi password hiện tại | Tạo user với `OldPass123!`; có valid token. | `1) reset weak password; 2) login old password` | 400 then 200 | Old password vẫn login được sau failed reset. | HUMAN_ADDED | Failed | Newman: `reports/newman/hw06-fr03-reset-password.html`; Bug: `reports/bug-reports/BUG-FR03-API-001.md` |
| API-1 | TC-FR03-API-SCH-001 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SCH-001.md` | AI | Schema Validation | Success response có Content-Type JSON | Có valid resetToken từ setup. | `Valid reset body` | 200 | Header `Content-Type` chứa `application/json`. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SCH-002 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SCH-002.md` | AI | Schema Validation | Success response có `message` dạng string | Có valid resetToken từ setup. | `Valid reset body` | 200 | Body có `message:string`; chỉ chứa field public expected. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SCH-003 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SCH-003.md` | AI | Schema Validation | Error response cho missing email có message/error | Missing email case. | `{"resetToken":"123456","newPassword":"NewPass123!"}` | 400 | Body có `message` hoặc `error` dạng string. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SCH-004 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SCH-004.md` | AI | Schema Validation | Invalid token error không expose stack trace | Registered email tồn tại. | `{"email":"test@eshop.com","resetToken":"000000","newPassword":"NewPass123!"}` | 400 | Không có `stack`, `trace`, `sql`, `exception`. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SCH-005 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SCH-005.md` | AI | Schema Validation | Happy path response time dưới 1000ms | Có valid resetToken từ setup. | `Valid reset body` | 200 | Response time `< 1000ms`. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SCH-006 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SCH-006.md` | AI | Schema Validation | Reset success không trả lại `resetToken` | Có valid resetToken từ setup. | `Valid reset body` | 200 | Response không có `resetToken`. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SCH-007 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SCH-007.md` | AI | Schema Validation | Reset response không trả `newPassword` hoặc password plaintext | Có valid resetToken từ setup. | `Valid reset body` | 200 | Response không có `newPassword`, `password`, `password_hash`. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SCH-008 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SCH-008.md` | AI | Schema Validation | GET /api/reset-password không được thành công | Backend running. | `GET /api/reset-password` | 404 hoặc 405 | Không trả success schema của POST reset-password. | VALID | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SCH-009 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SCH-009.md` | Human | Schema Validation | Malformed JSON body trả client error và không leak stack | Backend running. | `Body raw: { "email": "test@eshop.com",` | 400 | Có error/message hoặc body lỗi an toàn; không stack trace. | HUMAN_ADDED | Passed | Newman: `reports/newman/hw06-fr03-reset-password.html`, JSON: `reports/newman/hw06-fr03-reset-password.json` |
| API-1 | TC-FR03-API-SCH-010 | `test-cases/hw06-api/fr03-reset-password/TC-FR03-API-SCH-010.md` | Human | Schema Validation | Content-Type text/plain cho JSON body không được xử lý như success | Backend running. | `Header Content-Type: text/plain, body JSON string valid` | 400 hoặc 415 | Không success; không 5xx; có message/error nếu JSON. | HUMAN_ADDED | Failed | Newman: `reports/newman/hw06-fr03-reset-password.html`; Bug: `reports/bug-reports/BUG-FR03-API-003.md` |
| API-2 | Chưa có | `test-cases/hw06-api/fr09-apply-coupon/` | AI/Human | Domain/Security/Workflow/Schema | Chưa generate | Chưa có | Chưa có | Chưa có | Chưa có | Chưa audit | Chưa chạy | Chưa có |
| API-3 | Chưa có | `test-cases/hw06-api/fr17-admin-coupons/` | AI/Human | Domain/Security/Workflow/Schema | Chưa generate | Chưa có | Chưa có | Chưa có | Chưa có | Chưa audit | Chưa chạy | Chưa có |

FR-03 raw AI output đã được lưu ở `reports/ai-generated/fr03-reset-password-raw-test-cases.md`. Phase 03 audit/final suite được tổng hợp ngay trong file master này; 50 per-test-case Markdown files nằm trong `test-cases/hw06-api/fr03-reset-password/`.

## 3. FR-03 AI audit summary

| Tổng raw AI cases | VALID | INVALID | INCOMPLETE | Corrected final AI cases | Human added | Final FR-03 cases |
| --- | --- | --- | --- | --- | --- | --- |
| 46 | 39 | 1 | 6 | 44 | 6 | 50 |

Notes:

- `INVALID` case bị loại khỏi final suite vì expected result dựa trên policy không có trong blackbox spec.
- `INCOMPLETE` case được sửa nếu có thể execute bằng setup/assertion rõ ràng; case expiration TTL bị loại khỏi final execution vì spec không nêu TTL/time-control.
- Phase 04 đã execute toàn bộ 50 final FR-03 cases bằng Postman/Newman; kết quả được cập nhật trong master table, execution summary và bug reports.

### 3.1 Raw AI case audit table

| Raw TC ID | Audit label | Final TC ID / Action | Human reasoning |
| --- | --- | --- | --- |
| FR03-RP-DOM-001 | VALID | TC-FR03-API-DOM-001 | Đúng spec: registered email, valid OTP và password mạnh. |
| FR03-RP-DOM-002 | VALID | TC-FR03-API-DOM-002 | email là field bắt buộc theo API spec. |
| FR03-RP-DOM-003 | VALID | TC-FR03-API-DOM-003 | null email là partition invalid hợp lệ. |
| FR03-RP-DOM-004 | VALID | TC-FR03-API-DOM-004 | empty email là partition invalid hợp lệ. |
| FR03-RP-DOM-005 | VALID | TC-FR03-API-DOM-005 | invalid email format là partition bắt buộc cho email. |
| FR03-RP-DOM-006 | INCOMPLETE | TC-FR03-API-DOM-006 | Expected 400 hoặc 404 chưa đủ rõ; sửa thành client error 4xx và assert không reset/không leak token. |
| FR03-RP-DOM-007 | VALID | TC-FR03-API-DOM-007 | wrong type cho email là domain partition hợp lệ. |
| FR03-RP-DOM-008 | INCOMPLETE | TC-FR03-API-DOM-008 | Whitespace behavior không có trong spec; giữ làm boundary, expected là client error/no account mismatch observable. |
| FR03-RP-DOM-009 | VALID | TC-FR03-API-DOM-009 | resetToken là field bắt buộc theo API spec. |
| FR03-RP-DOM-010 | VALID | TC-FR03-API-DOM-010 | null resetToken là partition invalid hợp lệ. |
| FR03-RP-DOM-011 | VALID | TC-FR03-API-DOM-011 | empty resetToken là partition invalid hợp lệ. |
| FR03-RP-DOM-012 | VALID | TC-FR03-API-DOM-012 | OTP phải có tối thiểu/đúng 6 chữ số theo FR-03/SEC-07. |
| FR03-RP-DOM-013 | VALID | TC-FR03-API-DOM-013 | Boundary trên độ dài OTP 6 chữ số. |
| FR03-RP-DOM-014 | VALID | TC-FR03-API-DOM-014 | OTP chứa chữ cái vi phạm format 6 digits. |
| FR03-RP-DOM-015 | VALID | TC-FR03-API-DOM-015 | newPassword là field bắt buộc theo API spec. |
| FR03-RP-DOM-016 | VALID | TC-FR03-API-DOM-016 | null newPassword là partition invalid hợp lệ. |
| FR03-RP-DOM-017 | VALID | TC-FR03-API-DOM-017 | Password quá ngắn vi phạm rule FR-01. |
| FR03-RP-DOM-018 | VALID | TC-FR03-API-DOM-018 | Password thiếu uppercase vi phạm rule FR-01. |
| FR03-RP-DOM-019 | VALID | TC-FR03-API-DOM-019 | Password thiếu lowercase vi phạm rule FR-01. |
| FR03-RP-DOM-020 | VALID | TC-FR03-API-DOM-020 | Password thiếu digit vi phạm rule FR-01. |
| FR03-RP-DOM-021 | VALID | TC-FR03-API-DOM-021 | Password thiếu special char vi phạm rule FR-01. |
| FR03-RP-DOM-022 | VALID | TC-FR03-API-DOM-022 | Wrong type cho newPassword là domain partition hợp lệ. |
| FR03-RP-SEC-001 | VALID | TC-FR03-API-SEC-001 | SQLi trong email phải bị xử lý an toàn theo SEC-05. |
| FR03-RP-SEC-002 | VALID | TC-FR03-API-SEC-002 | SQLi trong resetToken phải bị xử lý an toàn theo SEC-05. |
| FR03-RP-SEC-003 | VALID | TC-FR03-API-SEC-003 | Payload HTML/script trong email không được gây leak/reflection nguy hiểm. |
| FR03-RP-SEC-004 | VALID | TC-FR03-API-SEC-004 | Password input không được reflect/leak trong response. |
| FR03-RP-SEC-005 | INCOMPLETE | TC-FR03-API-SEC-005 | Thiếu setup email B; sửa bằng cách tạo/đảm bảo account B trước khi dùng token của account A. |
| FR03-RP-SEC-006 | VALID | TC-FR03-API-SEC-006 | Token one-time use là yêu cầu SEC-07. |
| FR03-RP-SEC-007 | VALID | TC-FR03-API-SEC-007 | Response không được trả password/hash là security assertion hợp lệ. |
| FR03-RP-SEC-008 | VALID | TC-FR03-API-SEC-008 | Token 6 digits observable qua setup API, đúng FR-03/SEC-07. |
| FR03-RP-WF-001 | VALID | TC-FR03-API-WF-001 | Workflow forgot-password -> reset-password hợp lệ. |
| FR03-RP-WF-002 | VALID | TC-FR03-API-WF-002 | Reset khi chưa có token được issue phải bị reject. |
| FR03-RP-WF-003 | INVALID | Excluded | Spec không quy định old token bị vô hiệu khi phát token mới; expected phụ thuộc implementation policy. |
| FR03-RP-WF-004 | INCOMPLETE | TC-FR03-API-WF-003 | Giữ ý tưởng token mới reset thành công, bỏ assumption latest-token invalidates old token. |
| FR03-RP-WF-005 | VALID | TC-FR03-API-WF-004 | Postcondition old password không còn đăng nhập được sau reset thành công. |
| FR03-RP-WF-006 | VALID | TC-FR03-API-WF-005 | Postcondition new password đăng nhập được sau reset thành công. |
| FR03-RP-WF-007 | INCOMPLETE | Excluded | SEC-07 yêu cầu expiration nhưng TTL/time-control không được spec mô tả; chưa thể execute đáng tin ở Phase 04. |
| FR03-RP-WF-008 | INCOMPLETE | TC-FR03-API-WF-006 | Cần tách thành workflow 2 request: failed weak password không consume token, sau đó valid reset thành công. |
| FR03-RP-SCH-001 | VALID | TC-FR03-API-SCH-001 | Success response phải là JSON. |
| FR03-RP-SCH-002 | VALID | TC-FR03-API-SCH-002 | Success response có message string theo pattern auth API. |
| FR03-RP-SCH-003 | VALID | TC-FR03-API-SCH-003 | Error response cho missing email cần có message/error. |
| FR03-RP-SCH-004 | VALID | TC-FR03-API-SCH-004 | Invalid token không được expose stack trace/internal detail. |
| FR03-RP-SCH-005 | VALID | TC-FR03-API-SCH-005 | Response time assertion hữu ích khi execute bằng Newman. |
| FR03-RP-SCH-006 | VALID | TC-FR03-API-SCH-006 | Reset success không nên trả lại resetToken đã dùng. |
| FR03-RP-SCH-007 | VALID | TC-FR03-API-SCH-007 | Response không được trả password/newPassword plaintext. |
| FR03-RP-SCH-008 | VALID | TC-FR03-API-SCH-008 | Method contract: endpoint chỉ được spec là POST, GET không được thành công. |

## 4. Human extension tracking

Mỗi row trong bảng này là một human-authored test case mà AI bỏ sót. Các case này cũng đã xuất hiện trong master table ở section 2 với `Source = Human` và `Audit Label = HUMAN_ADDED`.

| TC ID | Group | Missed case | Expected result | Vì sao AI bỏ sót |
| --- | --- | --- | --- | --- |
| TC-FR03-API-DOM-023 | Domain | `newPassword` là empty string | 400; JSON body có `message` hoặc `error`; không 5xx. | AI thường gộp empty password với too-short password nên bỏ sót partition rỗng. |
| TC-FR03-API-DOM-024 | Domain | `newPassword` đúng boundary tối thiểu 8 ký tự và đủ complexity | 200; JSON body có `message:string`; không có password/token. | AI sinh too-short và long valid password nhưng bỏ sót exact lower boundary 8 ký tự. |
| TC-FR03-API-DOM-025 | Domain | `resetToken` 6 digits nhưng có whitespace đầu/cuối | 400; JSON body có `message` hoặc `error`; không 5xx. | AI kiểm tra whitespace email nhưng bỏ sót whitespace token. |
| TC-FR03-API-WF-007 | Workflow/State | Failed reset do weak password không đổi password hiện tại | 400 then 200; Old password vẫn login được sau failed reset. | AI tập trung token consumption, bỏ sót postcondition password hiện tại. |
| TC-FR03-API-SCH-009 | Schema Validation | Malformed JSON body trả client error và không leak stack | 400; Có error/message hoặc body lỗi an toàn; không stack trace. | AI chủ yếu sinh JSON hợp lệ về mặt syntax nên bỏ sót parser-level schema case. |
| TC-FR03-API-SCH-010 | Schema Validation | Content-Type text/plain cho JSON body không được xử lý như success | 400 hoặc 415; Không success; không 5xx; có message/error nếu JSON. | AI kiểm tra success Content-Type nhưng bỏ sót invalid request Content-Type. |
| API-2 | Chưa có | Chưa có | Chưa có | Chưa có |
| API-3 | Chưa có | Chưa có | Chưa có | Chưa có |

## 5. Audit labels

| Label | Ý nghĩa | Khi dùng |
| --- | --- | --- |
| `VALID` | Case đúng spec và execute được | Giữ lại trong final suite |
| `INVALID` | Case trái spec, invent field, expected sai, hoặc dựa vào white-box assumption | Ghi lý do và sửa hoặc loại khỏi final suite |
| `INCOMPLETE` | Case có ý tưởng hợp lý nhưng thiếu setup/assertion/expected data | Bổ sung rồi mới đưa vào final suite |
| `HUMAN_ADDED` | Case do sinh viên thêm sau audit | Dùng cho >=5 cases AI bỏ sót |

## 6. Execution summary

| API ID | Final cases | Executed | Passed | Failed | Bugs confirmed |
| --- | --- | --- | --- | --- | --- |
| API-1 | 50 | 50 | 36 | 14 | 3 |
| API-2 | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |
| API-3 | Chưa có | Chưa có | Chưa có | Chưa có | Chưa có |
| Total | 50 | 50 | 36 | 14 | 3 |
