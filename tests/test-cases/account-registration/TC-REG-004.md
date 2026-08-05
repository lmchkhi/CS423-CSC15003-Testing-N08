# TC-REG-004: Từ chối khi thiếu Mật khẩu

## Requirement ID

FR-01

## Module / Test type / Technique

Đăng ký / Functional / Equivalence Partitioning

## Preconditions

- Backend và Frontend Web đang chạy ở URL mặc định.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/account-registration.json` |
| Case key | `TC-REG-004` |

## Test steps

1. Mở trang Đăng ký.
2. Để trống Mật khẩu, nhập hợp lệ các trường còn lại.
3. Bấm Đăng Ký.

## Expected result

Form không được gửi và trường Mật khẩu được báo bắt buộc.

## Status / Related bugs

Pass / None
