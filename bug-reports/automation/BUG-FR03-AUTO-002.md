---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR-03] Bước 1 của luồng quên mật khẩu không hiển thị chỉ báo bước"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR03-DT-001

## Requirement liên quan
FR-03: Quên mật khẩu & Đặt lại mật khẩu

## Severity / Priority
Minor / P3

## Environment
Browser: Chromium, Firefox, WebKit  
OS: macOS Darwin 25.5.0 arm64  
Frontend URL: http://localhost:5173  
Playwright: 1.62.1  
Build / Commit: `c3adcdd`

## Steps to reproduce
1. Mở trang `/forgot-password`.
2. Quan sát phần đầu form quên mật khẩu trước khi nhập email.

## Expected result
Giao diện cho biết người dùng đang ở Bước 1/2 hoặc một chỉ báo tương đương của luồng quên mật khẩu hai bước.

## Actual result
Giao diện chỉ hiển thị tiêu đề `Quên Mật Khẩu`, ô email và nút `Lấy mã OTP`; không có chỉ báo bước.

## Evidence
- Playwright HTML report: `reports/html/fr03-forgot-password/chromium/hw04-report.html`
- Cross-browser HTML reports: `reports/html/fr03-forgot-password/{chromium,firefox,webkit}/hw04-report.html`
- JSON result: `reports/results/fr03-forgot-password/chromium/results.json`
- Screenshot: `test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-51943-h-công-với-email-đã-đăng-ký-chromium/test-failed-1.png`
- Error context: `test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-51943-h-công-với-email-đã-đăng-ký-chromium/error-context.md`
