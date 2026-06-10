# TC-REGISTER-009: Đăng ký thất bại do mật khẩu thiếu ký tự đặc biệt

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
| Mật khẩu | Aa123456 |
| Xác nhận mật khẩu | Aa123456 |

## Test steps
1. Mở trang Đăng ký.
2. Nhập các thông tin đăng ký hợp lệ, ngoại trừ Mật khẩu và Xác nhận mật khẩu không chứa bất kỳ ký tự đặc biệt nào (ví dụ: `@`, `$`, `!`, `%`, `*`, `?`, `&`).
3. Bấm nút "Đăng ký" (Register).

## Expected result
- Đăng ký không thành công.
- Hệ thống báo lỗi yêu cầu mật khẩu mạnh (ví dụ: "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt").
- Người dùng vẫn ở lại trang Đăng ký, không bị chuyển hướng.

## Status / Related bugs
Passed / None
