# TC-FR03-UC-011: Không reset khi mật khẩu mới rỗng (Use Case Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Use Case Testing

## Assumptions
- Đã có OTP hợp lệ để lỗi được cô lập ở mật khẩu mới rỗng.

## Test Design Reference
`tests/test-design/FR-03-forgot-password-use-case.md`

## Use Case Analysis

### Use Case Summary

| Field | Value |
| --- | --- |
| Use case ID | UC-FR03-01 |
| Use case name | Quên mật khẩu và đặt lại mật khẩu |
| Primary actor | Guest/user đã có tài khoản |
| Goal | Reset password |
| Trigger | Actor submit mật khẩu mới rỗng |
| Preconditions | Đã lấy OTP hợp lệ |
| Success postconditions | Không áp dụng |
| Failure postconditions | Reset bị từ chối; mật khẩu không đổi |

### Flow Coverage

| Flow ID | Flow type | Scenario | Expected postcondition |
| --- | --- | --- | --- |
| EF-09 | Exception | Mật khẩu mới rỗng | Reset bị từ chối; mật khẩu không đổi |

### Covered Flow

| TC | Flow ID | Coverage reason |
| --- | --- | --- |
| UC-011 | EF-09 | Bao phủ exception missing password |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Đã lấy OTP thành công cho `test@eshop.com`.

## Test data

| Field | Value |
| --- | --- |
| Email | `test@eshop.com` |
| OTP | OTP hợp lệ vừa hiển thị |
| Mật khẩu mới | Rỗng |
| Xác nhận mật khẩu mới | Rỗng hoặc theo UI yêu cầu |

## Test steps
1. Lấy OTP cho `test@eshop.com`.
2. Ở bước reset, nhập OTP hợp lệ.
3. Để trống trường mật khẩu mới.
4. Để trống hoặc nhập xác nhận theo UI yêu cầu để kiểm tra lỗi mật khẩu mới rỗng.
5. Submit đặt lại mật khẩu.

## Expected result
Hệ thống từ chối reset, hiển thị lỗi bắt buộc nhập mật khẩu mới và không đổi mật khẩu.

## Status / Related bugs
Failed / BUG-FR03-UC-007
