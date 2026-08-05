# TC-REG-001: Đăng ký thành công với dữ liệu hợp lệ ở biên 8 ký tự

## Requirement ID

FR-01

## Module / Test type / Technique

Đăng ký / Functional / BVA, Equivalence Partitioning

## Preconditions

- Backend và Frontend Web đang chạy ở URL mặc định.
- Email sinh theo `runId` chưa tồn tại.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/account-registration.json` |
| Case key | `TC-REG-001` |

## Test steps

1. Mở trang Đăng ký.
2. Nhập Họ Tên, email duy nhất, mật khẩu mạnh đúng 8 ký tự và xác nhận khớp.
3. Bấm Đăng Ký.

## Expected result

Tài khoản được tạo và trình duyệt chuyển tới trang Đăng nhập.

## Status / Related bugs

Fail / BUG-REG-001 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/2
