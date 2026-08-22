---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR-03][API] Forgot-password resetToken has only 4 digits instead of 6"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR03-API-SEC-008

## Requirement liên quan
FR-03, SEC-07

## Severity / Priority
Major / P1

## Environment
Backend API URL: `http://localhost:3000`

Tool: Newman `6.2.2`

Run date: 21/08/2026

## Steps to reproduce
1. Register or use a registered user.
2. Call `POST /api/forgot-password` with the registered email.
3. Inspect the `resetToken` field in the JSON response.

## Expected result
The reset OTP/token is a 6-digit value, matching FR-03 and SEC-07.

## Actual result
The API returns a 4-digit `resetToken`. In the Newman run, one observed token was `9154`.

## Evidence
- Newman HTML report: `reports/newman/hw06-fr03-reset-password.html`
- Newman JSON report: `reports/newman/hw06-fr03-reset-password.json`
- Newman CLI log: `reports/newman/hw06-fr03-reset-password-cli.txt`
- CLI failure: `TC-FR03-API-SEC-008 setup resetToken is six digits`: expected `'9154'` to match `/^\d{6}$/`.

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/269
