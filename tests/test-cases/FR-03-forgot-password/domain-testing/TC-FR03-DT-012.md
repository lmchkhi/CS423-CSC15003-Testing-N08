# TC-FR03-DT-012: Đặt lại mật khẩu với mật khẩu mới rỗng (Domain Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Mật khẩu mới | String | Invalid: rỗng trong khi bắt buộc nhập |
| Xác nhận mật khẩu mới | String | Invalid: rỗng/không có giá trị để xác nhận |
| OTP | String | Valid: OTP 6 chữ số đúng cho email |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Đã lấy OTP thành công cho `test@eshop.com`.

## Test data

| Field | Value |
| --- | --- |
| Email | test@eshop.com |
| OTP | OTP 6 chữ số vừa hiển thị |
| Mật khẩu mới | *(để trống)* |
| Xác nhận mật khẩu mới | *(để trống)* |

## Test steps
1. Từ Bước 1, lấy OTP cho `test@eshop.com`.
2. Ở Bước 2, nhập OTP hợp lệ.
3. Để trống Mật khẩu mới.
4. Để trống Xác nhận mật khẩu mới.
5. Bấm nút đặt lại mật khẩu.

## Expected result
Hệ thống từ chối đặt lại mật khẩu và hiển thị lỗi yêu cầu nhập mật khẩu mới.

## Status / Related bugs
Passed / BUG-FR03-001, BUG-FR03-004 (observation)
