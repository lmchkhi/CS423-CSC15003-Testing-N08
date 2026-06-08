# TC-LOGIN-003: Đăng nhập thất bại do Email chưa đăng ký

## Requirement ID
FR-02

## Module / Test type / Technique
Login / Functional / Domain Testing

## Preconditions
- User đang ở trang Login.

## Test data
| Email | unregistered@eshop.com |
| Password | Test1234! |

## Test steps
1. Mở trang Login.
2. Nhập Email: `unregistered@eshop.com`
3. Nhập Password: `Test1234!`
4. Bấm nút "Đăng nhập".

## Expected result
- Đăng nhập thất bại.
- Hệ thống hiển thị thông báo lỗi phù hợp (ví dụ: "Email hoặc mật khẩu không đúng") mà không tiết lộ chi tiết nguyên nhân.
- Bộ đếm đăng nhập sai không cần tăng cho tài khoản không tồn tại (hoặc có thể tăng ảo tùy logic bảo mật).

## Status / Related bugs
Pass / None
