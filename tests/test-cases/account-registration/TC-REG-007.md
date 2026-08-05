# TC-REG-007: Từ chối email đã tồn tại

## Requirement ID

FR-01

## Module / Test type / Technique

Đăng ký / Functional / Equivalence Partitioning

## Preconditions

- Tài khoản `test@eshop.com` đã tồn tại từ dữ liệu seed.
- Backend và Frontend Web đang chạy ở URL mặc định.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/account-registration.json` |
| Case key | `TC-REG-007` |

## Test steps

1. Mở trang Đăng ký.
2. Nhập email `test@eshop.com` và các trường còn lại hợp lệ.
3. Bấm Đăng Ký.

## Expected result

Hệ thống giữ nguyên trang Đăng ký, báo email đã tồn tại và không tạo bản ghi trùng.

## Status / Related bugs

Fail / BUG-REG-003 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/7
