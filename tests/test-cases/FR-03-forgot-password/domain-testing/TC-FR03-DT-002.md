# TC-FR03-DT-002: Kiểm tra nút Quay lại đăng nhập ở bước lấy OTP (Domain Testing)

## Requirement ID
FR-03

## Module / Test type / Technique
Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Navigation action | UI action | Nút Quay lại đăng nhập phải tồn tại trong luồng quên mật khẩu |
| UI step state | State | Người dùng đang ở Bước 1 của luồng 2 bước |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User đang ở trang Quên mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Action | Quay lại đăng nhập |

## Test steps
1. Mở trang Quên mật khẩu (`/forgot-password`).
2. Quan sát màn hình có nút Quay lại đăng nhập.
3. Bấm nút Quay lại đăng nhập.

## Expected result
Hệ thống điều hướng người dùng về trang Đăng nhập, không tạo OTP và không hiển thị lỗi.

## Status / Related bugs
Failed / BUG-FR03-002
