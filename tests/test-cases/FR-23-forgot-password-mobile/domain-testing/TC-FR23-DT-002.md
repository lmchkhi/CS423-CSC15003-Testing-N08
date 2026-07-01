# TC-FR23-DT-002: Mobile có nút Quay lại đăng nhập ở bước lấy OTP (Domain Testing)

## Requirement ID
FR-23

## Module / Test type / Technique
Mobile Forgot Password / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Nút Quay lại đăng nhập | UI control | Phải tồn tại trên màn hình mobile và điều hướng về màn hình Đăng nhập |

## Preconditions
- Ứng dụng mobile đã mở ở màn hình Quên mật khẩu.

## Test data

| Field | Value |
| --- | --- |
| Control | Nút Quay lại đăng nhập |

## Test steps
1. Mở ứng dụng mobile.
2. Từ màn hình Đăng nhập, chọn Quên mật khẩu.
3. Quan sát màn hình lấy OTP.
4. Bấm nút Quay lại đăng nhập.

## Expected result
Màn hình lấy OTP có nút Quay lại đăng nhập; khi bấm, ứng dụng điều hướng về màn hình Đăng nhập.

## Status / Related bugs
Failed / BUG-FR23-002
