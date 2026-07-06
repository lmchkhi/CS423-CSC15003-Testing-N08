# TC-FR03-UC-007: Không reset với OTP sai (Use Case Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Use Case Testing

## Assumptions
- Đã lấy OTP hợp lệ cho `test@eshop.com`, nhưng tester dùng một OTP khác OTP vừa được sinh.

## Test Design Reference
`tests/test-design/FR-03-forgot-password-use-case.md`

## Use Case Analysis

### Use Case Summary

| Field | Value |
| --- | --- |
| Use case ID | UC-FR03-01 |
| Use case name | Quên mật khẩu và đặt lại mật khẩu |
| Primary actor | Guest/user đã có tài khoản |
| Goal | Reset password bằng OTP |
| Trigger | Actor submit OTP sai |
| Preconditions | Đã request OTP cho email cần reset |
| Success postconditions | Không áp dụng |
| Failure postconditions | Reset bị từ chối; mật khẩu không đổi |

### Flow Coverage

| Flow ID | Flow type | Scenario | Expected postcondition |
| --- | --- | --- | --- |
| EF-05 | Exception | OTP sai hoặc không khớp email đã yêu cầu | Reset bị từ chối; mật khẩu không đổi |

### Covered Flow

| TC | Flow ID | Coverage reason |
| --- | --- | --- |
| UC-007 | EF-05 | Bao phủ lỗi OTP sai trong bước reset |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Đã lấy OTP thành công cho `test@eshop.com`.

## Test data

| Field | Value |
| --- | --- |
| Email | `test@eshop.com` |
| OTP | Một OTP sai, không phải OTP vừa hiển thị |
| Mật khẩu mới | `NewPass123!` |
| Xác nhận mật khẩu mới | `NewPass123!` |

## Test steps
1. Lấy OTP cho `test@eshop.com`.
2. Ở bước reset, nhập một OTP sai.
3. Nhập mật khẩu mới `NewPass123!` và xác nhận `NewPass123!`.
4. Submit đặt lại mật khẩu.
5. Quan sát response/message.

## Expected result
Hệ thống từ chối reset vì OTP sai, không đổi mật khẩu và hiển thị lỗi OTP/email không hợp lệ.

## Status / Related bugs
Failed / BUG-FR03-UC-005, BUG-FR03-UC-006
