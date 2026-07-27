---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR03] Reset password step missing confirm-new-password field"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR03-TC-009, TC-FR03-TC-010, TC-FR03-TC-011, TC-FR03-TC-012, TC-FR03-TC-015

## Requirement liên quan
FR-03

## Severity / Priority
Major / P1

## Environment
Chromium, Firefox, WebKit; EShop web `http://127.0.0.1:5173`; API `http://localhost:3000`; run by `23127475`.

## Steps to reproduce
1. Register or use an existing registered user.
2. Open `/forgot-password`.
3. Submit the registered email to request OTP.
4. Observe the reset-password step.

## Expected result
The reset step contains fields for OTP, new password, and confirm new password.

## Actual result
The reset step contains only one password input. There is no confirm-new-password field, so the system cannot verify whether the two password entries match.

## Evidence
HTML reports:
- `playwright/reports/html/fr03-forgot-reset-password/chromium/index.html`
- `playwright/reports/html/fr03-forgot-reset-password/firefox/index.html`
- `playwright/reports/html/fr03-forgot-reset-password/webkit/index.html`
