# BUG-FR03-UC-005: Bước reset password thiếu trường Xác nhận mật khẩu mới

## Found by Test Case
TC-FR03-UC-001, TC-FR03-UC-007, TC-FR03-UC-010

## Requirement liên quan
FR-03, GUI-02

## Severity / Priority
Major / P1

## Environment
**Browser**: Chrome 1xx  
**OS**: Ubuntu 22.04  
**Frontend URL**: http://localhost:5173  
**Build / Commit**: `d95418e`

## Steps to reproduce
1. Mở trang Quên mật khẩu.
2. Nhập email đã đăng ký và lấy OTP.
3. Chuyển sang bước đặt lại mật khẩu.
4. Quan sát các trường nhập liệu trên form reset.
5. Thử thực hiện flow confirm password mismatch.

## Expected result
Bước reset phải có đủ 3 trường: OTP, Mật khẩu mới và Xác nhận mật khẩu mới. Nếu mật khẩu mới và xác nhận mật khẩu mới không khớp, hệ thống phải từ chối reset và hiển thị lỗi confirm mismatch.

## Actual result
Bước reset không có trường Xác nhận mật khẩu mới, nên actor không thể thực hiện hoặc kiểm tra flow confirm password mismatch.

## Evidence
Tester observation trong `tests/test-runs/FR-03-forgot-password-use-case-run.md`: UC-010 failed vì không thể nhập xác nhận mật khẩu mới không khớp.

## Status
Open
