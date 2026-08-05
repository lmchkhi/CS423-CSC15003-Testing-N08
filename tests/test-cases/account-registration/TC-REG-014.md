# TC-REG-014: Hiển thị trường Xác nhận mật khẩu bắt buộc

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
| Case key | `TC-REG-014` |

## Test steps

1. Mở trang Đăng ký.
2. Xác định trường có nhãn Xác nhận mật khẩu.
3. Kiểm tra kiểu và trạng thái bắt buộc của trường.

## Expected result

Có đúng một trường Xác nhận mật khẩu, dùng `type="password"` và bắt buộc nhập.

## Status / Related bugs

Fail / BUG-REG-004 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/8
