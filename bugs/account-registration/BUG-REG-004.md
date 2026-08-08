# [BUG][Registration] Form đăng ký thiếu trường Xác nhận mật khẩu

## Found by Test Case

TC-REG-014 (liên quan TC-REG-015)

## Requirement liên quan

FR-01

## Severity / Priority

Major / P1

## Environment

- Browser: Chromium 151.0.7922.34, Firefox 153.0, WebKit 26.5
- OS: macOS 26.5.2 (25F84)
- URL: `http://127.0.0.1:5173/register`
- Build/commit: `fc8cc4d0eb3263440e9e5b3c4fc2d076aea08b5c`
- Run timestamps: Chromium `2026-08-08T03:08:07Z`; Firefox `2026-08-08T02:59:44Z`; WebKit `2026-08-08T03:00:34Z`

## Steps to reproduce

1. Mở trang Đăng ký.
2. Quan sát các trường nhập liệu trong form.
3. Tìm trường Xác nhận mật khẩu và thử đăng ký với hai mật khẩu không khớp.

## Expected result

Form có trường Xác nhận mật khẩu bắt buộc và hệ thống từ chối khi giá trị không khớp Mật khẩu.

## Actual result

Form không có trường Xác nhận mật khẩu nên người dùng không thể nhập giá trị xác nhận và hệ thống không thể đối chiếu. Kết quả giống nhau trên cả ba browser.

## Evidence

![TC-REG-014 failure on Chromium](../../evidence/account-registration/BUG-REG-004.png)

- Current Chromium HTML report: [open report](../../reports/account-registration/chromium/index.html)
- The current run reproduced the missing-field failure on Chromium, Firefox, and WebKit.

## GitHub Issue

Duplicate verified and reused: https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/8
