# TC-FR03-UC-003: Không lấy OTP khi email rỗng (Use Case Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Use Case Testing

## Assumptions
- Email là dữ liệu bắt buộc để bắt đầu use case lấy OTP.

## Test Design Reference
`tests/test-design/FR-03-forgot-password-use-case.md`

## Use Case Analysis

### Use Case Summary

| Field | Value |
| --- | --- |
| Use case ID | UC-FR03-01 |
| Use case name | Quên mật khẩu và đặt lại mật khẩu |
| Primary actor | Guest/user đã có tài khoản |
| Goal | Lấy OTP để reset password |
| Trigger | Actor submit bước lấy OTP |
| Preconditions | Actor ở bước lấy OTP |
| Success postconditions | Không áp dụng |
| Failure postconditions | Không sinh OTP; mật khẩu không đổi |

### Flow Coverage

| Flow ID | Flow type | Scenario | Expected postcondition |
| --- | --- | --- | --- |
| EF-01 | Exception | Email rỗng ở bước lấy OTP | Không sinh OTP; hiển thị lỗi bắt buộc nhập email |

### Covered Flow

| TC | Flow ID | Coverage reason |
| --- | --- | --- |
| UC-003 | EF-01 | Bao phủ exception thiếu email ở điểm bắt đầu use case |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User đang ở bước lấy OTP.

## Test data

| Field | Value |
| --- | --- |
| Email | Rỗng |

## Test steps
1. Mở trang Quên mật khẩu.
2. Để trống trường Email.
3. Bấm nút gửi/lấy OTP.
4. Quan sát message và trạng thái flow.

## Expected result
Hệ thống từ chối yêu cầu lấy OTP, không sinh OTP/reset token, hiển thị lỗi bắt buộc nhập email và vẫn giữ mật khẩu hiện tại.

## Status / Related bugs
Passed / None
