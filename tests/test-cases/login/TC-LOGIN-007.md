# TC-LOGIN-007: Đăng nhập sau khi hết thời gian khóa (Từ 30s trở lên)

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / Boundary Value Analysis (BVA)

## Preconditions
- User đã có tài khoản hợp lệ (`test@eshop.com`).
- Tài khoản bị khóa do đăng nhập sai 3 lần.
- Thời gian trôi qua kể từ khi khóa là >= 30 giây (ví dụ: 31s).

## Test data
| Email | test@eshop.com |
| Password | Test1234! (Mật khẩu đúng) |

## Test steps
1. Mở trang Login.
2. Đợi 31 giây sau khi tài khoản bị khóa.
3. Nhập Email: `test@eshop.com` và Password: `Test1234!` (đúng).
4. Bấm "Đăng nhập".

## Expected result
- Đăng nhập thành công.
- Bộ đếm đăng nhập sai được reset về 0.
- Trả về JWT Token và điều hướng người dùng tới trang chủ.

## Status / Related bugs
Pass / None
