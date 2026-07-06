# BUG-FR03-UC-007: Backend reset-password chấp nhận mật khẩu yếu hoặc rỗng

## Found by Test Case
TC-FR03-UC-009, TC-FR03-UC-011

## Requirement liên quan
FR-03, FR-01

## Severity / Priority
Critical / P1

## Environment
**Browser**: Chrome 1xx  
**OS**: Ubuntu 22.04  
**API URL**: http://localhost:3000  
**Build / Commit**: `d95418e`

## Steps to reproduce
1. Gọi `POST /api/forgot-password` với email đã đăng ký để lấy reset token hợp lệ.
2. Gọi `POST /api/reset-password` với email đó, reset token hợp lệ và `newPassword` là `weakpass`.
3. Lặp lại với một reset token hợp lệ khác và `newPassword` là chuỗi rỗng.
4. Đăng nhập/khôi phục mật khẩu test nếu mật khẩu đã bị thay đổi.

## Expected result
Backend phải từ chối mật khẩu yếu hoặc rỗng, trả lỗi password strength/required và không đổi mật khẩu tài khoản.

## Actual result
Backend trả `200 Password reset successfully` cho cả `weakpass` và `newPassword` rỗng, làm đổi mật khẩu tài khoản qua API.

## Evidence
- API verification ngày 06/07/2026: `POST /api/reset-password` với `weakpass` trả `200 Password reset successfully`.
- API verification ngày 06/07/2026: `POST /api/reset-password` với `newPassword` rỗng trả `200 Password reset successfully`.
- Sau mỗi lần kiểm tra làm thay đổi mật khẩu, `test@eshop.com` đã được khôi phục về `Test1234!` và login kiểm tra thành công.

## Status
Open
