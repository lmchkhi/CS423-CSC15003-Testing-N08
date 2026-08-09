---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR-03] API reset password chấp nhận mật khẩu mới không đạt rule"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR03-DT-010, TC-FR03-DT-012, TC-FR03-BVA-004

## Requirement liên quan
FR-03: Quên mật khẩu & Đặt lại mật khẩu, FR-01: quy tắc mật khẩu

## Severity / Priority
Critical / P1

## Environment
Browser: Chromium, Firefox, WebKit  
OS: macOS Darwin 25.5.0 arm64  
Frontend URL: http://localhost:5173  
API URL: http://localhost:3000  
Playwright: 1.62.1  
Build / Commit: `c3adcdd`

## Steps to reproduce
1. Tạo user test qua API hoặc dùng user đã đăng ký.
2. Gọi `POST /api/forgot-password` để lấy OTP hợp lệ.
3. Gọi `POST /api/reset-password` với OTP hợp lệ và `newPassword` yếu, rỗng hoặc chỉ 7 ký tự.
4. Kiểm tra HTTP status và body response.

## Expected result
API từ chối mật khẩu mới không đạt rule bằng status `400` và trả thông báo validation phù hợp.

## Actual result
API trả `200` cho các mật khẩu không hợp lệ như `password`, chuỗi rỗng và `Ab1!abc`.

## Evidence
- Playwright HTML report: [`reports/html/fr03-forgot-password/chromium/hw04-report.html`](../../reports/html/fr03-forgot-password/chromium/hw04-report.html)
- Cross-browser HTML reports:
  - [`reports/html/fr03-forgot-password/chromium/hw04-report.html`](../../reports/html/fr03-forgot-password/chromium/hw04-report.html)
  - [`reports/html/fr03-forgot-password/firefox/hw04-report.html`](../../reports/html/fr03-forgot-password/firefox/hw04-report.html)
  - [`reports/html/fr03-forgot-password/webkit/hw04-report.html`](../../reports/html/fr03-forgot-password/webkit/hw04-report.html)
- JSON result: [`reports/results/fr03-forgot-password/chromium/results.json`](../../reports/results/fr03-forgot-password/chromium/results.json)
- Screenshot Evidence:
  - [`test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-0287f-t-khẩu-với-mật-khẩu-mới-yếu-chromium/test-failed-1.png`](../../test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-0287f-t-khẩu-với-mật-khẩu-mới-yếu-chromium/test-failed-1.png)
  - [`test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-34fb7--khẩu-với-mật-khẩu-mới-rỗng-chromium/test-failed-1.png`](../../test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-34fb7--khẩu-với-mật-khẩu-mới-rỗng-chromium/test-failed-1.png)
  - [`test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-d75e8--7-ký-tự-OFF----min-length--chromium/test-failed-1.png`](../../test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-d75e8--7-ký-tự-OFF----min-length--chromium/test-failed-1.png)

![Screenshot Evidence - mật khẩu yếu](../../test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-0287f-t-khẩu-với-mật-khẩu-mới-yếu-chromium/test-failed-1.png)

![Screenshot Evidence - mật khẩu rỗng](../../test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-34fb7--khẩu-với-mật-khẩu-mới-rỗng-chromium/test-failed-1.png)

![Screenshot Evidence - mật khẩu 7 ký tự](../../test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-d75e8--7-ký-tự-OFF----min-length--chromium/test-failed-1.png)

- Error context mật khẩu yếu: [`test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-0287f-t-khẩu-với-mật-khẩu-mới-yếu-chromium/error-context.md`](../../test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-0287f-t-khẩu-với-mật-khẩu-mới-yếu-chromium/error-context.md)
- Error context mật khẩu rỗng: [`test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-34fb7--khẩu-với-mật-khẩu-mới-rỗng-chromium/error-context.md`](../../test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-34fb7--khẩu-với-mật-khẩu-mới-rỗng-chromium/error-context.md)
- Error context mật khẩu 7 ký tự: [`test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-d75e8--7-ký-tự-OFF----min-length--chromium/error-context.md`](../../test-results/fr03-forgot-password/chromium/fr03-forgot-password-Run-b-d75e8--7-ký-tự-OFF----min-length--chromium/error-context.md)
