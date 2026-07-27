---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR03] Forgot password Step 1 missing Back to Login control"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR03-TC-002

## Requirement liên quan
FR-03

## Severity / Priority
Minor / P2

## Environment
Chromium, Firefox, WebKit; EShop web `http://127.0.0.1:5173`; API `http://localhost:3000`; run by `23127475`.

## Steps to reproduce
1. Open `/forgot-password`.
2. Observe the Step 1 forgot-password screen.

## Expected result
The page shows a visible `Quay lại đăng nhập` control that navigates back to the login page.

## Actual result
No `Quay lại đăng nhập` or equivalent Back to Login control is visible on Step 1.

## Evidence
HTML reports:
- `playwright/reports/html/fr03-forgot-reset-password/chromium/index.html`
- `playwright/reports/html/fr03-forgot-reset-password/firefox/index.html`
- `playwright/reports/html/fr03-forgot-reset-password/webkit/index.html`
