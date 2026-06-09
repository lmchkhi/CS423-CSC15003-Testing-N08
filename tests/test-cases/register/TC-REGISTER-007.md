# TC-REGISTER-007: Đăng ký thất bại do mật khẩu thiếu chữ thường

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
| Mật khẩu | AA1@2345 |
| Xác nhận mật khẩu | AA1@2345 |

## Test steps
1. Mở trang Đăng ký.
2. Nhập các thông tin đăng ký hợp lệ, ngoại trừ Mật khẩu và Xác nhận mật khẩu không chứa bất kỳ chữ thường nào.
3. Bấm nút "Đăng ký" (Register).

## Expected result
- Đăng ký không thành công.
- Hệ thống báo lỗi yêu cầu mật khẩu mạnh (ví dụ: "Mật khẩu phải chứa ít nhất 1 chữ thường").
- Người dùng vẫn ở lại trang Đăng ký, không bị chuyển hướng.

## Status / Related bugs
Not Run / None
