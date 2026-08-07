---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR-03] Bước đặt lại mật khẩu thiếu ô Xác nhận mật khẩu mới"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR03-DT-011

## Requirement liên quan
FR-03: Quên mật khẩu & Đặt lại mật khẩu, GUI-02

## Severity / Priority
Major / P1

## Environment
Browser: Chromium, Firefox, WebKit  
OS: macOS Darwin 25.5.0 arm64  
Frontend URL: http://localhost:5173  
Playwright: 1.62.1  
Build / Commit: `c3adcdd`

## Steps to reproduce
1. Mở trang `/forgot-password`.
2. Nhập email đã đăng ký và lấy OTP.
3. Quan sát form đặt lại mật khẩu sau khi hệ thống chuyển sang bước nhập OTP.

## Expected result
Form đặt lại mật khẩu có 3 trường nhập liệu: OTP, mật khẩu mới và xác nhận mật khẩu mới. Khi hai mật khẩu không khớp, hệ thống phải hiển thị lỗi.

## Actual result
Form chỉ có 2 textbox: OTP và mật khẩu mới. Không có ô xác nhận mật khẩu mới, nên không thể kiểm tra lỗi mật khẩu xác nhận không khớp.

## Evidence
- Playwright HTML report: `reports/html/fr03-forgot-password/chromium/hw04-report.html`
- Cross-browser HTML reports: `reports/html/fr03-forgot-password/{chromium,firefox,webkit}/hw04-report.html`
- JSON result: `reports/results/fr03-forgot-password/chromium/results.json`
- Screenshot: `test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-79e66-ác-nhận-mật-khẩu-không-khớp-chromium/test-failed-1.png`
- Error context: `test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-79e66-ác-nhận-mật-khẩu-không-khớp-chromium/error-context.md`
