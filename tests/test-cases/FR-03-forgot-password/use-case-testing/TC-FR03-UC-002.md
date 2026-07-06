# TC-FR03-UC-002: Quay lại đăng nhập từ luồng quên mật khẩu (Use Case Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Use Case Testing

## Assumptions
- Nút Quay lại đăng nhập là yêu cầu UI trong SRS FR-03.

## Test Design Reference
`tests/test-design/FR-03-forgot-password-use-case.md`

## Use Case Analysis

### Use Case Summary

| Field | Value |
| --- | --- |
| Use case ID | UC-FR03-01 |
| Use case name | Quên mật khẩu và đặt lại mật khẩu |
| Primary actor | Guest/user đã có tài khoản |
| Goal | Thoát flow quên mật khẩu và quay lại Login |
| Trigger | Actor đang ở bước lấy OTP |
| Preconditions | Actor đã mở trang Quên mật khẩu |
| Success postconditions | Actor được điều hướng về Login; mật khẩu không đổi |
| Failure postconditions | Actor mắc kẹt trong flow hoặc không có đường quay lại Login |

### Flow Coverage

| Flow ID | Flow type | Scenario | Expected postcondition |
| --- | --- | --- | --- |
| AF-01 | Alternative | Actor chọn nút Quay lại đăng nhập ở bước lấy OTP | Điều hướng về màn hình Đăng nhập; không sinh OTP mới |

### Covered Flow

| TC | Flow ID | Coverage reason |
| --- | --- | --- |
| UC-002 | AF-01 | Bao phủ alternative navigation của use case |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User đang ở bước lấy OTP của trang Quên mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Current screen | Forgot Password step 1 |

## Test steps
1. Mở trang Quên mật khẩu.
2. Kiểm tra nút Quay lại đăng nhập hiển thị.
3. Bấm nút Quay lại đăng nhập.
4. Quan sát màn hình/route sau thao tác.

## Expected result
Actor được điều hướng về màn hình Đăng nhập; hệ thống không sinh OTP mới và mật khẩu tài khoản không thay đổi.

## Status / Related bugs
Failed / BUG-FR03-UC-003
