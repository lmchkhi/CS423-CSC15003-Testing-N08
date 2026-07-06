# BUG-FR03-UC-001: OTP quên mật khẩu trong use case reset chỉ có 4 chữ số thay vì 6 chữ số

## Found by Test Case
TC-FR03-UC-001, TC-FR03-UC-012

## Requirement liên quan
FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước)

## Severity / Priority
Major / P1

## Environment
**Browser**: Chrome 1xx  
**OS**: Ubuntu 22.04  
**Frontend URL**: http://localhost:5173  
**API URL**: http://localhost:3000  
**Build / Commit**: `d95418e`

## Steps to reproduce
1. Mở trang Quên mật khẩu.
2. Nhập email đã đăng ký, ví dụ `test@eshop.com`.
3. Gửi yêu cầu lấy OTP.
4. Quan sát OTP hiển thị trên UI demo.
5. Kiểm tra lại bằng API `POST /api/forgot-password` với email đã đăng ký.
6. Request OTP lại cho cùng email để kiểm tra retry flow.

## Expected result
Hệ thống sinh và hiển thị OTP gồm đúng 6 chữ số theo FR-03 và API specification.

## Actual result
Hệ thống sinh reset token/OTP 4 chữ số. Các lần request lại cho cùng email cũng trả token 4 chữ số.

## Evidence
- API verification ngày 06/07/2026: `POST /api/forgot-password` trả `200 OK` với `resetToken` dạng số, độ dài 4.
- OTP thật đã được redacted/không ghi vào report.
- Bug tương tự đã được ghi nhận ở `BUG-FR03-001`; file này ghi nhận riêng cho Use Case Testing.

## Status
Open
