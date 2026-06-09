# TC-REGISTER-010: Đăng ký thất bại do xác nhận mật khẩu không khớp

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
| Email | nguyenvana@example.com |
| Mật khẩu | Aa1@2345 |
| Xác nhận mật khẩu | Aa1@23456 |

## Test steps
1. Mở trang Đăng ký.
2. Nhập đầy đủ thông tin đăng ký hợp lệ, ngoại trừ trường Xác nhận mật khẩu khác với trường Mật khẩu.
3. Bấm nút "Đăng ký" (Register).

## Expected result
- Đăng ký không thành công.
- Hệ thống báo lỗi xác nhận mật khẩu không khớp (ví dụ: "Xác nhận mật khẩu không khớp").
- Người dùng vẫn ở lại trang Đăng ký, không bị chuyển hướng.

## Status / Related bugs
Not Run / None
