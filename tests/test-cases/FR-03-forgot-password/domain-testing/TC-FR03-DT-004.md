# TC-FR03-DT-004: Lấy OTP với email sai định dạng (Domain Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Email | String | Invalid: sai định dạng email; trường Email phải dùng validation email |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User đang ở trang Quên mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Email | test-at-eshop |

## Test steps
1. Mở trang Quên mật khẩu (`/forgot-password`).
2. Nhập Email: `test-at-eshop`.
3. Bấm nút gửi/lấy mã OTP.

## Expected result
Hệ thống từ chối yêu cầu, không sinh OTP và hiển thị lỗi email không hợp lệ.

## Status / Related bugs
Failed / None
