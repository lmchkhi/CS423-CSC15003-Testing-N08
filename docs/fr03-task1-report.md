# FR-03 Task 1 Automation Report

## Requirement Ledger

| Feature | Source | Case IDs | Count | Data file | Spec file | Browsers | Reports |
| --- | --- | --- | ---: | --- | --- | --- | --- |
| FR-03 Forgot password and password reset | `SystemRequirementsSpecification.md`, `api_specification.md`, HW04 PDF | `FR03-TC-001` to `FR03-TC-015` | 15 | `playwright/test-data/fr03-forgot-reset-password.json` | `playwright/tests/fr03-forgot-reset-password.spec.ts` | Chromium, Firefox, WebKit | `playwright/reports/html/fr03-forgot-reset-password/<browser>/index.html` |

## Test Cases

| ID | Category | Purpose |
| --- | --- | --- |
| FR03-TC-001 | UI requirement | Step 1 shows a visible two-step indicator. |
| FR03-TC-002 | Navigation | Step 1 provides a Back to Login control. |
| FR03-TC-003 | HTML validation | Forgot-password email field uses `type="email"`. |
| FR03-TC-004 | Negative validation | Empty email cannot request an OTP. |
| FR03-TC-005 | Negative validation | Invalid email format cannot request an OTP. |
| FR03-TC-006 | Negative validation | Unregistered email cannot request an OTP. |
| FR03-TC-007 | Positive validation | Registered email receives a visible random 6-digit OTP. |
| FR03-TC-008 | UI requirement | Step 2 shows a visible two-step indicator. |
| FR03-TC-009 | UI requirement | Reset step contains OTP, new password, and confirm-new-password fields. |
| FR03-TC-010 | Negative validation | New password shorter than 8 characters is rejected. |
| FR03-TC-011 | Negative validation | New password without a special character is rejected. |
| FR03-TC-012 | Negative validation | Mismatched new password confirmation is rejected. |
| FR03-TC-013 | Negative validation | Wrong OTP cannot reset the password. |
| FR03-TC-014 | Security validation | OTP requested for one email cannot reset another email. |
| FR03-TC-015 | Positive end-to-end | Registered user can reset password and log in with the new password. |

## Assertion Patterns

- Visibility/text assertion: `toBeVisible`, `toContainText`
- Attribute/value assertion: `toHaveAttribute`, `toHaveValue`, `toHaveURL`, `toHaveCount`
- Plain/API assertion: `toBe`, `not.toBe`, `toMatch`, `toHaveProperty`, `toEqual`, `toBeGreaterThanOrEqual`

## Human Review Notes

- Avoided implementation-derived selectors because this is black-box testing.
- Added API seeding through documented public endpoints to keep test data independent of existing DB state.
- Kept test data in external JSON and dispatch by scenario `kind`, not by individual case IDs.
- Added a unique email per run so repeated browser executions do not collide.
- Added a matrix runner that executes Chromium, Firefox, and WebKit separately and verifies each HTML report contains `Run by: 23127475`.

## Execution

Run from `playwright/`:

```bash
npm install
export STUDENT_ID=23127475
export FRONTEND_URL=http://127.0.0.1:5173
export API_URL=http://localhost:3000
npm run test:list
npm run test:fr03:matrix
```

Expected reports:

```text
playwright/reports/html/fr03-forgot-reset-password/chromium/index.html
playwright/reports/html/fr03-forgot-reset-password/firefox/index.html
playwright/reports/html/fr03-forgot-reset-password/webkit/index.html
playwright/reports/fr03-forgot-reset-password-manifest.json
```

## Latest Run Result

Run date/time: `2026-07-27T08:31:44Z` according to the generated manifest.

| Browser | Executed | Passed | Failed | HTML report | `Run by` label |
| --- | ---: | ---: | ---: | --- | --- |
| Chromium | 15 | 5 | 10 | `playwright/reports/html/fr03-forgot-reset-password/chromium/index.html` | `Run by: 23127475` verified |
| Firefox | 15 | 5 | 10 | `playwright/reports/html/fr03-forgot-reset-password/firefox/index.html` | `Run by: 23127475` verified |
| WebKit | 15 | 5 | 10 | `playwright/reports/html/fr03-forgot-reset-password/webkit/index.html` | `Run by: 23127475` verified |
| Total | 45 | 15 | 30 | 3 HTML reports | verified |

Passing logical cases in all browsers: `FR03-TC-004`, `FR03-TC-005`, `FR03-TC-006`, `FR03-TC-013`, `FR03-TC-014`.

Failing logical cases in all browsers: `FR03-TC-001`, `FR03-TC-002`, `FR03-TC-003`, `FR03-TC-007`, `FR03-TC-008`, `FR03-TC-009`, `FR03-TC-010`, `FR03-TC-011`, `FR03-TC-012`, `FR03-TC-015`.

## Observed FR-03 Failures

- Step 1 does not display `Bước 1 / 2` or equivalent step indicator.
- Step 1 does not display the required `Quay lại đăng nhập` button.
- The forgot-password email input is `type="text"` instead of `type="email"`.
- Step 2 does not display `Bước 2 / 2` or equivalent step indicator.
- The generated OTP is 4 digits, while FR-03 requires a random 6-digit OTP.
- Reset step has only one password input and no confirm-new-password field.
- The successful reset flow does not prove that the password changes: login with the new password returns `401`.

## Bug Reports

- `docs/bug-reports/fr03-missing-step-indicators.md`
- `docs/bug-reports/fr03-missing-back-to-login.md`
- `docs/bug-reports/fr03-email-input-type-text.md`
- `docs/bug-reports/fr03-otp-four-digits.md`
- `docs/bug-reports/fr03-missing-confirm-password.md`
- `docs/bug-reports/fr03-reset-password-not-effective.md`
