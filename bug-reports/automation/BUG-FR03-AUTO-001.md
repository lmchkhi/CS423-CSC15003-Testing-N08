---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR-03] OTP quên mật khẩu được sinh 4 chữ số thay vì 6 chữ số"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR03-DT-001, TC-FR03-DT-006, TC-FR03-BVA-001

## Requirement liên quan
FR-03: Quên mật khẩu & Đặt lại mật khẩu

## Severity / Priority
Major / P1

## Environment
Browser: Chromium, Firefox, WebKit  
OS: macOS Darwin 25.5.0 arm64  
Frontend URL: http://localhost:5173  
API URL: http://localhost:3000  
Playwright: 1.62.1  
Build / Commit: `c3adcdd`

## Steps to reproduce
1. Mở trang `/forgot-password`.
2. Nhập email đã đăng ký, ví dụ `test@eshop.com` hoặc email test được tạo tự động.
3. Bấm nút `Lấy mã OTP`.
4. Quan sát OTP hiển thị trên giao diện.
5. Gọi lại API `POST /api/forgot-password` với email đã đăng ký để kiểm tra `resetToken`.

## Expected result
Hệ thống sinh OTP đúng 6 chữ số và UI/API đều thể hiện đúng định dạng `^\d{6}$`.

## Actual result
UI hiển thị OTP 4 chữ số, ví dụ `6620`, `7009`. API cũng trả `resetToken` 4 chữ số, ví dụ `3930`, `1598`.

## Evidence
- Playwright HTML report: `reports/html/fr03-forgot-password/chromium/hw04-report.html`
- Cross-browser HTML reports: `reports/html/fr03-forgot-password/{chromium,firefox,webkit}/hw04-report.html`
- JSON result: `reports/results/fr03-forgot-password/chromium/results.json`
- Screenshot: `test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-51943-h-công-với-email-đã-đăng-ký-chromium/test-failed-1.png`
- Error context: `test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-add0a-g-6-chữ-số-ON---độ-dài-OTP--chromium/error-context.md`
