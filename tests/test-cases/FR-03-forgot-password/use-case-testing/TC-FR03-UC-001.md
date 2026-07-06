# TC-FR03-UC-001: Đặt lại mật khẩu thành công end-to-end (Use Case Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Use Case Testing

## Assumptions
- Email `test@eshop.com` đã đăng ký và tài khoản đang ở trạng thái có thể reset password.
- Demo hiển thị OTP trực tiếp trên màn hình; không ghi OTP thật còn hiệu lực vào report/log.

## Test Design Reference
`tests/test-design/FR-03-forgot-password-use-case.md`

## Use Case Analysis

### Use Case Summary

| Field | Value |
| --- | --- |
| Use case ID | UC-FR03-01 |
| Use case name | Quên mật khẩu và đặt lại mật khẩu |
| Primary actor | Guest/user đã có tài khoản |
| Goal | Lấy OTP và đặt lại mật khẩu để đăng nhập lại |
| Trigger | Actor chọn Quên mật khẩu từ màn hình Đăng nhập |
| Preconditions | Hệ thống hoạt động; email đã đăng ký |
| Success postconditions | Mật khẩu được đổi; actor về Login hoặc đăng nhập được bằng mật khẩu mới |
| Failure postconditions | Mật khẩu cũ không bị thay đổi nếu flow lỗi |

### Flow Coverage

| Flow ID | Flow type | Scenario | Expected postcondition |
| --- | --- | --- | --- |
| MF-01 | Main success | Lấy OTP bằng email đã đăng ký rồi reset bằng OTP, password và confirm hợp lệ | Mật khẩu được đổi thành công |

### Covered Flow

| TC | Flow ID | Coverage reason |
| --- | --- | --- |
| UC-001 | MF-01 | Bao phủ happy path end-to-end của use case |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User đang ở trang Quên mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Email | `test@eshop.com` |
| OTP | OTP 6 chữ số vừa hiển thị |
| Mật khẩu mới | `NewPass123!` |
| Xác nhận mật khẩu mới | `NewPass123!` |

## Test steps
1. Mở chức năng Quên mật khẩu từ màn hình Đăng nhập.
2. Kiểm tra bước lấy OTP có Step Indicator và nút Quay lại đăng nhập.
3. Nhập email `test@eshop.com` và gửi yêu cầu lấy OTP.
4. Chuyển sang bước đặt lại mật khẩu.
5. Nhập OTP vừa hiển thị, mật khẩu mới `NewPass123!` và xác nhận mật khẩu mới `NewPass123!`.
6. Submit đặt lại mật khẩu.
7. Thử đăng nhập lại bằng mật khẩu mới nếu cần xác nhận postcondition.

## Expected result
Hệ thống sinh OTP 6 chữ số, chấp nhận OTP/password/confirm hợp lệ, đổi mật khẩu thành công và điều hướng về Login hoặc cho phép đăng nhập bằng mật khẩu mới.

## Status / Related bugs
Failed / BUG-FR03-UC-001, BUG-FR03-UC-002, BUG-FR03-UC-003, BUG-FR03-UC-005, BUG-FR03-UC-006
