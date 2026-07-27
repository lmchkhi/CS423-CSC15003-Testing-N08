---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR03] Password reset flow does not allow login with new password"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR03-TC-015

## Requirement liên quan
FR-03

## Severity / Priority
Critical / P1

## Environment
Chromium, Firefox, WebKit; EShop web `http://127.0.0.1:5173`; API `http://localhost:3000`; run by `23127475`.

## Steps to reproduce
1. Register a user through the documented public API.
2. Open `/forgot-password`.
3. Request OTP for the registered email.
4. Enter the visible OTP and a strong new password such as `NewPass123!`.
5. Submit the reset form.
6. Attempt login with the registered email and the new password.

## Expected result
Password reset succeeds and login with the new password returns `200` with a JWT token.

## Actual result
The successful reset flow is not completed. Login with the new password returns `401`.

## Evidence
HTML reports:
- `playwright/reports/html/fr03-forgot-reset-password/chromium/index.html`
- `playwright/reports/html/fr03-forgot-reset-password/firefox/index.html`
- `playwright/reports/html/fr03-forgot-reset-password/webkit/index.html`
