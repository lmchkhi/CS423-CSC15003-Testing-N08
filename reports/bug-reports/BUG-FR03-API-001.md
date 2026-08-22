---
name: Bug report template
about: Bug report use in CS423/CSC15003
title: "[BUG][FR-03][API] Reset password accepts missing, weak, or non-string newPassword"
labels: '["Type: Bug", "Status: New"]'
assignees: ''

---

## Found by Test Case
TC-FR03-API-DOM-015, TC-FR03-API-DOM-016, TC-FR03-API-DOM-017, TC-FR03-API-DOM-018, TC-FR03-API-DOM-019, TC-FR03-API-DOM-020, TC-FR03-API-DOM-021, TC-FR03-API-DOM-022, TC-FR03-API-DOM-023, TC-FR03-API-SEC-004, TC-FR03-API-WF-006, TC-FR03-API-WF-007

## Requirement liên quan
FR-03, FR-01, SEC-07

## Severity / Priority
Major / P1

## Environment
Backend API URL: `http://localhost:3000`

Tool: Newman `6.2.2`

Run date: 21/08/2026

## Steps to reproduce
1. Register a test user through `POST /api/register`.
2. Request a reset token through `POST /api/forgot-password`.
3. Call `POST /api/reset-password` with the registered email and valid reset token.
4. Use an invalid `newPassword`, for example missing field, `null`, too short, missing uppercase/lowercase/digit/special char, number, empty string, or script-like payload.

## Expected result
`POST /api/reset-password` rejects invalid `newPassword` values with a client error, because FR-03 says the new password must follow the FR-01 password strength rule.

## Actual result
The API returns `200 OK` for invalid `newPassword` inputs. In workflow cases, a weak password reset is accepted and changes the user's password, causing later assertions about token/password state to fail.

## Evidence
- Newman HTML report: `reports/newman/hw06-fr03-reset-password.html`
- Newman JSON report: `reports/newman/hw06-fr03-reset-password.json`
- Newman CLI log: `reports/newman/hw06-fr03-reset-password-cli.txt`
- Example failures in CLI log:
  - `TC-FR03-API-DOM-017 status matches expected`: expected `400`, got `200`.
  - `TC-FR03-API-DOM-023 status matches expected`: expected `400`, got `200`.
  - `TC-FR03-API-WF-007 first weak reset was rejected`: expected weak reset status `400`, got `200`.

## GitHub Issue
https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/268
