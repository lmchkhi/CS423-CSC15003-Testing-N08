# [BUG][Registration] Hệ thống cho phép đăng ký trùng email

## Found by Test Case

TC-REG-007

## Requirement liên quan

FR-01

## Severity / Priority

Major / P1

## Environment

- Browser: Chromium 151.0.7922.34, Firefox 153.0, WebKit 26.5
- OS: macOS 26.5.2 (25F84)
- URL: `http://127.0.0.1:3000/api/register`
- Build/commit: `fc8cc4d0eb3263440e9e5b3c4fc2d076aea08b5c`
- Run timestamps: Chromium `2026-08-08T03:08:07Z`; Firefox `2026-08-08T02:59:44Z`; WebKit `2026-08-08T03:00:34Z`

## Steps to reproduce

1. Xác nhận tài khoản seed `test@eshop.com` đã tồn tại.
2. Gửi `POST /api/register` với tên hợp lệ, email `test@eshop.com` và mật khẩu `Valid1!a`.
3. Ghi nhận mã trạng thái và nội dung phản hồi.

## Expected result

API trả `409 Conflict`, thông báo email đã tồn tại và không tạo thêm bản ghi.

## Actual result

API trả HTTP 200 thay vì `409 Conflict` và tạo thêm người dùng có cùng email. Kết quả lặp lại trong ba project browser; schema không có ràng buộc UNIQUE cho `users.email`.

## Evidence

![TC-REG-007 failure on Chromium](../../evidence/account-registration/BUG-REG-003.png)

- Current Chromium HTML report: [open report](../../reports/account-registration/chromium/index.html)
- The embedded screenshot records the initial UI reproduction. TC-REG-007 now verifies the same uniqueness defect directly at API level; its generated page screenshot is intentionally not used because an API-only test has no meaningful page state.

## GitHub Issue

Duplicate verified and reused: https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/7
