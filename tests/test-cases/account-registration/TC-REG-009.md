# TC-REG-009: Từ chối mật khẩu không có chữ hoa

## Requirement ID

FR-01

## Module / Test type / Technique

Đăng ký / Functional / Decision Table

## Preconditions

- Backend và Frontend Web đang chạy ở URL mặc định.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/account-registration.json` |
| Case key | `TC-REG-009` |

## Test steps

1. Mở trang Đăng ký.
2. Nhập mật khẩu đủ độ dài nhưng không có chữ hoa.
3. Bấm Đăng Ký.

## Expected result

Hệ thống từ chối và hiển thị thông báo mật khẩu yếu.

## Status / Related bugs

Pass / None
