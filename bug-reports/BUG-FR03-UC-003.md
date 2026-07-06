# BUG-FR03-UC-003: Không có nút Quay lại đăng nhập ở bước lấy OTP của use case quên mật khẩu

## Found by Test Case
TC-FR03-UC-001, TC-FR03-UC-002

## Requirement liên quan
FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước)

## Severity / Priority
Major / P2

## Environment
**Browser**: Chrome 1xx  
**OS**: Ubuntu 22.04  
**Frontend URL**: http://localhost:5173  
**Build / Commit**: `d95418e`

## Steps to reproduce
1. Mở trang Quên mật khẩu từ màn hình Đăng nhập.
2. Quan sát bước lấy OTP.
3. Tìm nút hoặc liên kết Quay lại đăng nhập.
4. Sau khi sang bước reset, quan sát nút quay lại nếu có.

## Expected result
Ở bước lấy OTP phải có nút/liên kết Quay lại đăng nhập và khi bấm sẽ điều hướng actor về màn hình Login. Flow không sinh OTP mới và không đổi mật khẩu.

## Actual result
Bước lấy OTP không có nút/liên kết Quay lại đăng nhập. Ở bước reset chỉ có nút quay lại bước lấy OTP, không phải quay về Login.

## Evidence
Tester observation trong `tests/test-runs/FR-03-forgot-password-use-case-run.md`: UC-002 failed vì actor không có đường quay lại Login từ bước lấy OTP.

## Status
Open
