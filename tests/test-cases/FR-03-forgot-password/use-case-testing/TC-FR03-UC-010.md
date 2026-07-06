# TC-FR03-UC-010: Không reset khi xác nhận mật khẩu mới không khớp (Use Case Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Use Case Testing

## Assumptions
- Test này kiểm tra UI/use case vì SRS yêu cầu trường Xác nhận mật khẩu mới, dù API spec chỉ nêu `newPassword`.

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
| Trigger | Actor submit confirm password không khớp |
| Preconditions | Đã lấy OTP hợp lệ |
| Success postconditions | Không áp dụng |
| Failure postconditions | Reset bị từ chối; mật khẩu không đổi |

### Flow Coverage

| Flow ID | Flow type | Scenario | Expected postcondition |
| --- | --- | --- | --- |
| EF-08 | Exception | Xác nhận mật khẩu mới không khớp mật khẩu mới | Reset bị từ chối; mật khẩu không đổi |

### Covered Flow

| TC | Flow ID | Coverage reason |
| --- | --- | --- |
| UC-010 | EF-08 | Bao phủ exception confirm mismatch |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Đã lấy OTP thành công cho `test@eshop.com`.

## Test data

| Field | Value |
| --- | --- |
| Email | `test@eshop.com` |
| OTP | OTP hợp lệ vừa hiển thị |
| Mật khẩu mới | `NewPass123!` |
| Xác nhận mật khẩu mới | `Different123!` |

## Test steps
1. Lấy OTP cho `test@eshop.com`.
2. Ở bước reset, nhập OTP hợp lệ.
3. Nhập mật khẩu mới `NewPass123!`.
4. Nhập xác nhận mật khẩu mới `Different123!`.
5. Submit đặt lại mật khẩu.

## Expected result
Hệ thống từ chối reset do xác nhận mật khẩu mới không khớp, hiển thị lỗi confirm mismatch và không đổi mật khẩu.

## Status / Related bugs
Failed / BUG-FR03-UC-005
