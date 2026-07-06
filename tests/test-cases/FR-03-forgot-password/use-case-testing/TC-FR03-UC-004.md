# TC-FR03-UC-004: Không lấy OTP khi email sai định dạng (Use Case Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Use Case Testing

## Assumptions
- UI hoặc API phải xử lý email sai định dạng như lỗi validation trước khi sinh OTP.

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
| Trigger | Actor submit email sai định dạng |
| Preconditions | Actor ở bước lấy OTP |
| Success postconditions | Không áp dụng |
| Failure postconditions | Không sinh OTP; mật khẩu không đổi |

### Flow Coverage

| Flow ID | Flow type | Scenario | Expected postcondition |
| --- | --- | --- | --- |
| EF-02 | Exception | Email sai định dạng ở bước lấy OTP | Không sinh OTP; hiển thị lỗi định dạng email phù hợp |

### Covered Flow

| TC | Flow ID | Coverage reason |
| --- | --- | --- |
| UC-004 | EF-02 | Bao phủ validation exception của use case |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User đang ở bước lấy OTP.

## Test data

| Field | Value |
| --- | --- |
| Email | `invalid-email` |

## Test steps
1. Mở trang Quên mật khẩu.
2. Nhập Email `invalid-email`.
3. Bấm nút gửi/lấy OTP.
4. Quan sát message và trạng thái flow.

## Expected result
Hệ thống không sinh OTP/reset token, không chuyển sang reset thành công, hiển thị lỗi định dạng email phù hợp và mật khẩu không thay đổi.

## Status / Related bugs
Failed / BUG-FR03-UC-004
