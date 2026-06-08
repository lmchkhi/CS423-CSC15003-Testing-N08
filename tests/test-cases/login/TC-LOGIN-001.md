# TC-LOGIN-001: Đăng nhập thành công

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / Domain Testing

## Preconditions
- User đã có tài khoản hợp lệ (`test@eshop.com` / `Test1234!`).
- Tài khoản chưa bị khóa.
- User đang ở trang Login.

## Test data
| Email | test@eshop.com |
| Password | Test1234! |

## Test steps
1. Mở trang Login.
2. Nhập Email: `test@eshop.com`
3. Nhập Password: `Test1234!`
4. Bấm nút "Đăng nhập".

## Expected result
- Đăng nhập thành công.
- Hệ thống trả về JWT Token và lưu ở phía client.
- Điều hướng người dùng tới trang chủ.

## Status / Related bugs
Pass / None
