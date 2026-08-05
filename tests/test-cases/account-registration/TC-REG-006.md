# TC-REG-006: Từ chối email sai định dạng

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
| Case key | `TC-REG-006` |

## Test steps

1. Mở trang Đăng ký.
2. Nhập email không có cấu trúc `user@domain.com` và các trường còn lại hợp lệ.
3. Bấm Đăng Ký.

## Expected result

Hệ thống giữ nguyên trang Đăng ký và hiển thị lỗi; tài khoản không được tạo.

## Status / Related bugs

Fail / BUG-REG-002 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/3
