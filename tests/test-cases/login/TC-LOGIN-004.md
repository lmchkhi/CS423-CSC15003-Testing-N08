# TC-LOGIN-004: Đăng nhập sai mật khẩu (Lần 1 và Lần 2)

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / Boundary Value Analysis (BVA)

## Preconditions
- User đã có tài khoản hợp lệ (`test@eshop.com`).
- Tài khoản chưa bị khóa (Bộ đếm = 0).
- User đang ở trang Login.

## Test data
| Email | test@eshop.com |
| Password | WrongPass123! |

## Test steps
1. Mở trang Login.
2. Nhập Email: `test@eshop.com`, Password: `WrongPass123!`.
3. Bấm "Đăng nhập" (Lần 1). Kiểm tra thông báo lỗi.
4. Bấm "Đăng nhập" (Lần 2). Kiểm tra thông báo lỗi.

## Expected result
- Sau lần 1: Đăng nhập thất bại, hiện thông báo lỗi chung, bộ đếm = 1. Tài khoản vẫn chưa bị khóa.
- Sau lần 2: Đăng nhập thất bại, hiện thông báo lỗi chung, bộ đếm = 2. Tài khoản vẫn chưa bị khóa.

## Status / Related bugs
Pass / None
