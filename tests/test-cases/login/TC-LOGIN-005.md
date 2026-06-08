# TC-LOGIN-005: Khóa tài khoản sau 3 lần đăng nhập sai

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / Boundary Value Analysis (BVA)

## Preconditions
- User đã có tài khoản hợp lệ (`test@eshop.com`).
- Tài khoản đã bị sai mật khẩu 2 lần trước đó (Bộ đếm = 2).
- User đang ở trang Login.

## Test data
| Email | test@eshop.com |
| Password | WrongPass123! |

## Test steps
1. Mở trang Login.
2. Nhập Email: `test@eshop.com`, Password: `WrongPass123!`.
3. Bấm "Đăng nhập" (Đây là lần sai thứ 3).

## Expected result
- Đăng nhập thất bại.
- Hệ thống tăng bộ đếm lên 3 và tạm khóa tài khoản trong 30 giây.
- Hiển thị thông báo tài khoản bị khóa tạm thời mà không tiết lộ chi tiết nội bộ.

## Status / Related bugs
Pass / None
