# TC-REG-015: Từ chối khi xác nhận mật khẩu không khớp

## Requirement ID

FR-01

## Module / Test type / Technique

Đăng ký / Functional / Decision Table

## Preconditions

- Backend và Frontend Web đang chạy ở URL mặc định.
- Email sinh theo `runId` chưa tồn tại.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/account-registration.json` |
| Case key | `TC-REG-015` |

## Test steps

1. Mở trang Đăng ký.
2. Nhập Mật khẩu và Xác nhận mật khẩu khác nhau.
3. Bấm Đăng Ký.

## Expected result

Hệ thống giữ nguyên trang Đăng ký, hiển thị lỗi không khớp và không tạo tài khoản.

## Status / Related bugs

Fail / BUG-REG-004 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/8
