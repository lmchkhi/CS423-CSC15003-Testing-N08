# [BUG][Registration] Hệ thống chấp nhận email sai định dạng

## Found by Test Case

TC-REG-006 (liên quan TC-REG-005)

## Requirement liên quan

FR-01

## Severity / Priority

Major / P1

## Environment

- Browser: Chromium 151.0.7922.34, Firefox 153.0, WebKit 26.5
- OS: macOS 26.5.2 (25F84)
- URL: `http://127.0.0.1:5175/register`
- Build/commit: `a934bf2d7871413aae4b6d46f820995e04170595`
- Run timestamp: `2026-08-05T09:16:18Z`

## Steps to reproduce

1. Mở trang Đăng ký.
2. Nhập Họ Tên, email `email-khong-hop-le` và mật khẩu đi qua validation hiện tại.
3. Bấm Đăng Ký và quan sát response `POST /api/register`.

## Expected result

Frontend hoặc backend từ chối email không có định dạng `user@domain.com`; API không tạo tài khoản.

## Actual result

Trường Email dùng `type="text"`; API trả HTTP 200 và tạo tài khoản với email sai định dạng. Kết quả lặp lại trên cả ba browser.

## Evidence

![TC-REG-006 failure on Chromium](../../evidence/account-registration/BUG-REG-002.png)

## GitHub Issue

Duplicate verified and reused: https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/3
