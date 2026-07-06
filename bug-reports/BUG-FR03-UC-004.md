# BUG-FR03-UC-004: Email sai định dạng trong use case quên mật khẩu báo lỗi User not found

## Found by Test Case
TC-FR03-UC-004

## Requirement liên quan
FR-03, GUI-02

## Severity / Priority
Major / P2

## Environment
**Browser**: Chrome 1xx  
**OS**: Ubuntu 22.04  
**Frontend URL**: http://localhost:5173  
**API URL**: http://localhost:3000  
**Build / Commit**: `d95418e`

## Steps to reproduce
1. Mở trang Quên mật khẩu.
2. Nhập email sai định dạng, ví dụ `invalid-email`.
3. Gửi yêu cầu lấy OTP.
4. Kiểm tra lại bằng API `POST /api/forgot-password` với body chứa email sai định dạng.

## Expected result
Hệ thống từ chối input và hiển thị lỗi định dạng email phù hợp; không xử lý như một email hợp lệ chưa tồn tại.

## Actual result
Hệ thống báo `User not found`. API kiểm tra lại trả `404 Not Found` với `{"error":"User not found"}`.

## Evidence
- API verification ngày 06/07/2026: `POST /api/forgot-password` với `invalid-email` trả `404 User not found`.
- Bug tương tự đã được ghi nhận ở `BUG-FR03-003`; file này ghi nhận riêng cho Use Case Testing.

## Status
Open
