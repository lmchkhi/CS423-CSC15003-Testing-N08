# TC-FR03-UC-005: Không lấy OTP cho email chưa đăng ký (Use Case Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Use Case Testing

## Assumptions
- Email `fr03.unregistered@example.com` chưa tồn tại trong hệ thống.

## Test Design Reference
`tests/test-design/FR-03-forgot-password-use-case.md`

## Use Case Analysis

### Use Case Summary

| Field | Value |
| --- | --- |
| Use case ID | UC-FR03-01 |
| Use case name | Quên mật khẩu và đặt lại mật khẩu |
| Primary actor | Guest/user chưa có email đăng ký tương ứng |
| Goal | Lấy OTP để reset password |
| Trigger | Actor submit email chưa đăng ký |
| Preconditions | Actor ở bước lấy OTP |
| Success postconditions | Không áp dụng |
| Failure postconditions | Không sinh OTP; không tạo reset flow thành công |

### Flow Coverage

| Flow ID | Flow type | Scenario | Expected postcondition |
| --- | --- | --- | --- |
| EF-03 | Exception | Email đúng định dạng nhưng chưa đăng ký | Không sinh OTP cho tài khoản không tồn tại; hiển thị lỗi phù hợp |

### Covered Flow

| TC | Flow ID | Coverage reason |
| --- | --- | --- |
| UC-005 | EF-03 | Bao phủ business exception của use case |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Email `fr03.unregistered@example.com` chưa được đăng ký.

## Test data

| Field | Value |
| --- | --- |
| Email | `fr03.unregistered@example.com` |

## Test steps
1. Mở trang Quên mật khẩu.
2. Nhập Email `fr03.unregistered@example.com`.
3. Bấm nút gửi/lấy OTP.
4. Quan sát message và trạng thái flow.

## Expected result
Hệ thống không sinh OTP/reset token, không chuyển sang reset thành công, hiển thị lỗi phù hợp và không thay đổi mật khẩu của bất kỳ tài khoản nào.

## Status / Related bugs
Passed / None
