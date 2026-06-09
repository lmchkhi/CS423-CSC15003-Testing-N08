# TC-REGISTER-002: Đăng ký thất bại do để trống các trường bắt buộc

## Requirement ID
FR-01

## Module / Test type / Technique
Register / Functional / Error Guessing

## Preconditions
- Người dùng đang ở trang Đăng ký (Register).

## Test data
| Trường | Giá trị |
| :--- | :--- |
| Họ Tên | (Trống) |
| Email | (Trống) |
| Mật khẩu | (Trống) |
| Xác nhận mật khẩu | (Trống) |

## Test steps
1. Mở trang Đăng ký.
2. Để trống tất cả các trường thông tin.
3. Bấm nút "Đăng ký" (Register).

## Expected result
- Đăng ký không thành công.
- Hệ thống ngăn chặn việc gửi form và hiển thị các thông báo lỗi/yêu cầu nhập liệu bắt buộc (hoặc hiển thị dấu hoa thị `*` cảnh báo đỏ) tương ứng với từng trường.
- Người dùng vẫn ở lại trang Đăng ký, không bị chuyển hướng.

## Status / Related bugs
Passed / None
