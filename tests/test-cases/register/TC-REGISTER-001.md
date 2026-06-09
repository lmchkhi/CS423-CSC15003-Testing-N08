# TC-REGISTER-001: Đăng ký thành công với thông tin hợp lệ

## Requirement ID
FR-01

## Module / Test type / Technique
Register / Functional / Equivalence Partitioning

## Preconditions
- Người dùng đang ở trang Đăng ký (Register).
- Địa chỉ Email dùng để đăng ký chưa từng tồn tại trên hệ thống.

## Test data
| Trường | Giá trị |
| :--- | :--- |
| Họ Tên | Nguyễn Văn A |
| Email | nguyenvana@example.com |
| Mật khẩu | Aa1@2345 |
| Xác nhận mật khẩu | Aa1@2345 |

## Test steps
1. Mở trang Đăng ký.
2. Nhập đầy đủ thông tin hợp lệ từ Test data vào các ô nhập liệu tương ứng.
3. Bấm nút "Đăng ký" (Register).

## Expected result
- Đăng ký tài khoản thành công.
- Hệ thống hiển thị thông báo đăng ký thành công.
- Người dùng được tự động chuyển hướng tới trang Đăng nhập (Login).

## Status / Related bugs
Failed / Issue #2
