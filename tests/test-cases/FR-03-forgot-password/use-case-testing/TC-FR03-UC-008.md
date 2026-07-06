# TC-FR03-UC-008: Không dùng OTP của email khác để reset mật khẩu (Use Case Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Use Case Testing

## Assumptions
- Có tài khoản phụ `fr03.other@example.com` hoặc email đã đăng ký tương đương để lấy OTP khác.
- Không ghi OTP thật còn hiệu lực vào report/log.

## Test Design Reference
`tests/test-design/FR-03-forgot-password-use-case.md`

## Use Case Analysis

### Use Case Summary

| Field | Value |
| --- | --- |
| Use case ID | UC-FR03-01 |
| Use case name | Quên mật khẩu và đặt lại mật khẩu |
| Primary actor | Guest/user đã có tài khoản |
| Goal | Reset password đúng email |
| Trigger | Actor submit OTP thuộc email khác |
| Preconditions | Có OTP được sinh cho email khác |
| Success postconditions | Không áp dụng |
| Failure postconditions | Reset bị từ chối; mật khẩu của cả hai tài khoản không đổi |

### Flow Coverage

| Flow ID | Flow type | Scenario | Expected postcondition |
| --- | --- | --- | --- |
| EF-06 | Exception | OTP được lấy cho email khác rồi dùng để reset `test@eshop.com` | Reset bị từ chối; OTP không dùng chéo tài khoản |

### Covered Flow

| TC | Flow ID | Coverage reason |
| --- | --- | --- |
| UC-008 | EF-06 | Bao phủ ràng buộc liên actor/data email-OTP |

## Preconditions
- Hệ thống EShop đang hoạt động.
- `test@eshop.com` và `fr03.other@example.com` đều là email đã đăng ký.

## Test data

| Field | Value |
| --- | --- |
| Email cần reset | `test@eshop.com` |
| Email lấy OTP | `fr03.other@example.com` |
| OTP | OTP vừa sinh cho email phụ |
| Mật khẩu mới | `NewPass123!` |
| Xác nhận mật khẩu mới | `NewPass123!` |

## Test steps
1. Lấy OTP cho `fr03.other@example.com`.
2. Mở/gửi bước reset cho email `test@eshop.com`.
3. Nhập OTP của `fr03.other@example.com`.
4. Nhập mật khẩu mới `NewPass123!` và xác nhận `NewPass123!`.
5. Submit đặt lại mật khẩu.

## Expected result
Hệ thống từ chối reset vì OTP không thuộc email `test@eshop.com`; mật khẩu của cả hai tài khoản không bị thay đổi.

## Status / Related bugs
Passed / None
