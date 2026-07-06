# BUG-FR03-UC-002: Luồng quên mật khẩu 2 bước không hiển thị Step Indicator

## Found by Test Case
TC-FR03-UC-001

## Requirement liên quan
FR-03, GUI-02

## Severity / Priority
Major / P2

## Environment
**Browser**: Chrome 1xx  
**OS**: Ubuntu 22.04  
**Frontend URL**: http://localhost:5173  
**Build / Commit**: `d95418e`

## Steps to reproduce
1. Mở trang Quên mật khẩu.
2. Quan sát bước lấy OTP.
3. Nhập email đã đăng ký và chuyển sang bước đặt lại mật khẩu.
4. Quan sát chỉ báo bước trên cả hai bước.

## Expected result
Giao diện phải hiển thị Step Indicator rõ ràng, ví dụ `Bước 1 / 2` và `Bước 2 / 2`, để người dùng biết mình đang ở đâu trong flow 2 bước.

## Actual result
Không thấy Step Indicator ở bước lấy OTP hoặc bước đặt lại mật khẩu.

## Evidence
Tester observation trong `tests/test-runs/FR-03-forgot-password-use-case-run.md`: happy path UC-001 không đạt vì không thấy Step Indicator theo FR-03.

## Status
Open
