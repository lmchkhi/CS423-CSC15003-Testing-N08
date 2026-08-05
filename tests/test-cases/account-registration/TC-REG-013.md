# TC-REG-013: Từ chối ký tự đặc biệt ngoài danh sách cho phép

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
| Case key | `TC-REG-013` |

## Test steps

1. Mở trang Đăng ký.
2. Nhập mật khẩu chỉ dùng `#` làm ký tự đặc biệt.
3. Bấm Đăng Ký.

## Expected result

Hệ thống từ chối vì `#` không thuộc tập `@ $ ! % * ? &`.

## Status / Related bugs

Pass / None
