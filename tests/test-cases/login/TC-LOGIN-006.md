# TC-LOGIN-006: Đăng nhập khi tài khoản đang bị khóa (Dưới 30s)

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / Boundary Value Analysis (BVA)

## Preconditions
- User đã có tài khoản hợp lệ (`test@eshop.com`).
- Tài khoản vừa bị khóa do đăng nhập sai 3 lần.
- Thời gian trôi qua kể từ khi khóa là < 30 giây (ví dụ: 15s).

## Test data
| Email | test@eshop.com |
| Password | Test1234! (Mật khẩu đúng) |

## Test steps
1. Mở trang Login.
2. Đợi 15 giây sau khi tài khoản bị khóa.
3. Nhập Email: `test@eshop.com` và Password: `Test1234!` (đúng).
4. Bấm "Đăng nhập".

## Expected result
- Đăng nhập thất bại dù nhập đúng mật khẩu.
- Hệ thống thông báo tài khoản vẫn đang bị khóa.

## Status / Related bugs
Pass / None
