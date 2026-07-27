---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR03] Forgot password email input uses type text"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR03-TC-003

## Requirement liên quan
FR-03, FR-22

## Severity / Priority
Minor / P2

## Environment
Chromium, Firefox, WebKit; EShop web `http://127.0.0.1:5173`; API `http://localhost:3000`; run by `23127475`.

## Steps to reproduce
1. Open `/forgot-password`.
2. Inspect the email input on the forgot-password form.

## Expected result
The email input uses `type="email"` so the browser applies HTML5 email validation.

## Actual result
The email input uses `type="text"`.

## Evidence
HTML reports:
- `playwright/reports/html/fr03-forgot-reset-password/chromium/index.html`
- `playwright/reports/html/fr03-forgot-reset-password/firefox/index.html`
- `playwright/reports/html/fr03-forgot-reset-password/webkit/index.html`
