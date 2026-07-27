---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR03] Forgot password flow missing step indicators"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR03-TC-001, TC-FR03-TC-008

## Requirement liên quan
FR-03

## Severity / Priority
Major / P1

## Environment
Chromium, Firefox, WebKit; EShop web `http://127.0.0.1:5173`; API `http://localhost:3000`; run by `23127475`.

## Steps to reproduce
1. Open `/forgot-password`.
2. Observe the forgot-password Step 1 screen.
3. Submit a registered email to request OTP.
4. Observe the password reset Step 2 screen.

## Expected result
Step 1 displays a clear indicator such as `Bước 1 / 2`; Step 2 displays a clear indicator such as `Bước 2 / 2`.

## Actual result
No `Bước 1 / 2` or `Bước 2 / 2` indicator is visible. The screens only show `Quên Mật Khẩu`, email/OTP/password fields, and submit controls.

## Evidence
HTML reports:
- `playwright/reports/html/fr03-forgot-reset-password/chromium/index.html`
- `playwright/reports/html/fr03-forgot-reset-password/firefox/index.html`
- `playwright/reports/html/fr03-forgot-reset-password/webkit/index.html`
