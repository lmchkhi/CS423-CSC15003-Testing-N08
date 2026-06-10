# TC-REGISTER-003: Đăng ký thất bại do định dạng Email không hợp lệ

## Requirement ID
FR-01

## Module / Test type / Technique
Register / Functional / Equivalence Partitioning

## Preconditions
- Người dùng đang ở trang Đăng ký (Register).

## Test data
| Trường | Giá trị |
| :--- | :--- |
| Họ Tên | Nguyễn Văn A |
| Email | nguyenvanagmail.com |
| Mật khẩu | Aa1@2345 |
| Xác nhận mật khẩu | Aa1@2345 |

## Test steps
1. Mở trang Đăng ký.
2. Nhập thông tin với Email sai định dạng (thiếu ký tự `@`).
3. Bấm nút "Đăng ký" (Register).

## Expected result
- Đăng ký không thành công.
- Hệ thống ngăn chặn việc gửi form, báo lỗi định dạng Email không hợp lệ (ví dụ: "Email không đúng định dạng").
- Người dùng vẫn ở lại trang Đăng ký, không bị chuyển hướng.

## Status / Related bugs
Failed / Issue #3
