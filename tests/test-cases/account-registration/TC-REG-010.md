# TC-REG-010: Từ chối mật khẩu không có chữ thường

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
| Case key | `TC-REG-010` |

## Test steps

1. Mở trang Đăng ký.
2. Nhập mật khẩu đủ độ dài nhưng không có chữ thường.
3. Bấm Đăng Ký.

## Expected result

Hệ thống từ chối và hiển thị thông báo mật khẩu yếu.

## Status / Related bugs

Pass / None
