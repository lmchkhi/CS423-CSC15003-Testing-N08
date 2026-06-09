# TC-REGISTER-005: Đăng ký thất bại do mật khẩu ngắn hơn 8 ký tự

## Requirement ID
FR-01

## Module / Test type / Technique
Register / Functional / Boundary Value Analysis (BVA)

## Preconditions
- Người dùng đang ở trang Đăng ký (Register).

## Test data
| Trường | Giá trị |
| :--- | :--- |
| Họ Tên | Nguyễn Văn A |
| Email | nguyenvana@example.com |
| Mật khẩu | Aa1@234 |
| Xác nhận mật khẩu | Aa1@234 |

## Test steps
1. Mở trang Đăng ký.
2. Nhập các thông tin đăng ký hợp lệ, ngoại trừ Mật khẩu và Xác nhận mật khẩu chỉ chứa 7 ký tự (dưới độ dài tối thiểu 8 ký tự).
3. Bấm nút "Đăng ký" (Register).

## Expected result
- Đăng ký không thành công.
- Hệ thống báo lỗi độ dài mật khẩu (ví dụ: "Mật khẩu phải tối thiểu 8 ký tự").
- Người dùng vẫn ở lại trang Đăng ký, không bị chuyển hướng.

## Status / Related bugs
Not Run / None
