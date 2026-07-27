---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR03] Forgot password OTP has only 4 digits"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR03-TC-007, TC-FR03-TC-015

## Requirement liên quan
FR-03

## Severity / Priority
Major / P1

## Environment
Chromium, Firefox, WebKit; EShop web `http://127.0.0.1:5173`; API `http://localhost:3000`; run by `23127475`.

## Steps to reproduce
1. Register or use an existing registered user.
2. Open `/forgot-password`.
3. Enter the registered email and click `Lấy mã OTP`.
4. Observe the OTP displayed in demo mode.

## Expected result
The system generates and displays a random OTP with exactly 6 digits.

## Actual result
The displayed OTP has only 4 digits, for example `8881`, `2794`, or `9816`.

## Evidence
HTML reports:
- `playwright/reports/html/fr03-forgot-reset-password/chromium/index.html`
- `playwright/reports/html/fr03-forgot-reset-password/firefox/index.html`
- `playwright/reports/html/fr03-forgot-reset-password/webkit/index.html`
