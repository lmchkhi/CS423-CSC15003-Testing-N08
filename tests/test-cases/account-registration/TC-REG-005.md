# TC-REG-005: Email dùng kiểu nhập email để hỗ trợ validation định dạng

## Requirement ID

FR-01

## Module / Test type / Technique

Đăng ký / Functional, GUI / Inspection

## Preconditions

- Frontend Web đang chạy ở URL mặc định.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/account-registration.json` |
| Case key | `TC-REG-005` |

## Test steps

1. Mở trang Đăng ký.
2. Xác định trường có nhãn Email.
3. Kiểm tra thuộc tính kiểu nhập.

## Expected result

Trường Email có `type="email"` để hỗ trợ kiểm tra định dạng chuẩn.

## Status / Related bugs

Fail / BUG-REG-002 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/3
