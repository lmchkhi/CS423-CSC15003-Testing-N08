# TC-REGISTER-004: Đăng ký thất bại do Email đã tồn tại trong hệ thống

## Requirement ID
FR-01

## Module / Test type / Technique
Register / Functional / Equivalence Partitioning

## Preconditions
- Người dùng đang ở trang Đăng ký (Register).
- Tài khoản với email `test@eshop.com` đã được đăng ký và tồn tại trên hệ thống.

## Test data
| Trường | Giá trị |
| :--- | :--- |
| Họ Tên | Nguyễn Văn A |
| Email | test@eshop.com |
| Mật khẩu | Aa1@2345 |
| Xác nhận mật khẩu | Aa1@2345 |

## Test steps
1. Mở trang Đăng ký.
2. Nhập thông tin đăng ký với Email trùng lặp với tài khoản đã tồn tại.
3. Bấm nút "Đăng ký" (Register).

## Expected result
- Đăng ký không thành công.
- Hệ thống hiển thị thông báo lỗi báo rằng Email đã được đăng ký hoặc đã tồn tại (ví dụ: "Email đã tồn tại trên hệ thống").
- Người dùng vẫn ở lại trang Đăng ký, không bị chuyển hướng.

## Status / Related bugs
Not Run / None
