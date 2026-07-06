# BUG-FR03-UC-006: Frontend chặn mật khẩu mạnh hợp lệ trong use case reset password

## Found by Test Case
TC-FR03-UC-001, TC-FR03-UC-007

## Requirement liên quan
FR-03, FR-01

## Severity / Priority
Critical / P1

## Environment
**Browser**: Chrome 1xx  
**OS**: Ubuntu 22.04  
**Frontend URL**: http://localhost:5173  
**API URL**: http://localhost:3000  
**Build / Commit**: `d95418e`

## Steps to reproduce
1. Mở trang Quên mật khẩu.
2. Lấy OTP cho email đã đăng ký.
3. Ở bước reset, nhập OTP hợp lệ.
4. Nhập mật khẩu mới hợp lệ theo FR-01, ví dụ `NewPass123!`.
5. Submit đặt lại mật khẩu.
6. Kiểm tra lại bằng API `POST /api/reset-password` với OTP hợp lệ và mật khẩu mạnh tương tự.

## Expected result
Frontend chấp nhận mật khẩu mạnh hợp lệ, gửi request reset tới backend và hệ thống hoàn tất use case nếu OTP đúng.

## Actual result
Frontend báo mật khẩu mạnh là yếu và không đi tiếp flow reset. API kiểm tra riêng có thể reset thành công với mật khẩu mạnh hợp lệ, cho thấy lỗi nằm ở validation/frontend flow.

## Evidence
- Tester observation trong `tests/test-runs/FR-03-forgot-password-use-case-run.md`: `NewPass123!` bị frontend báo yếu.
- API verification ngày 06/07/2026: reset bằng mật khẩu mạnh trả `200 Password reset successfully`.
- Sau kiểm tra API, mật khẩu `test@eshop.com` đã được khôi phục về `Test1234!`.
- Bug tương tự đã được ghi nhận ở `BUG-FR03-005`; file này ghi nhận riêng cho Use Case Testing.

## Status
Open
