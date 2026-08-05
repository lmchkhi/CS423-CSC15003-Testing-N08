# TC-REG-008: Từ chối mật khẩu ngắn hơn 8 ký tự

## Requirement ID

FR-01

## Module / Test type / Technique

Đăng ký / Functional / Boundary Value Analysis

## Preconditions

- Backend và Frontend Web đang chạy ở URL mặc định.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/account-registration.json` |
| Case key | `TC-REG-008` |

## Test steps

1. Mở trang Đăng ký.
2. Nhập mật khẩu mạnh nhưng chỉ có 7 ký tự.
3. Bấm Đăng Ký.

## Expected result

Hệ thống từ chối và hiển thị thông báo mật khẩu yếu.

## Status / Related bugs

Pass / None
