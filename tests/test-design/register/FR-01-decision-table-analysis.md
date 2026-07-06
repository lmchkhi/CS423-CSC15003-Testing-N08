# FR-01 Register Decision Table Test Design

## Requirement Source

FR-01 from `README.md`: users must provide full name, email, password, and confirm password. Email must be valid and unique. Password must be strong: minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 allowed special character from `@`, `$`, `!`, `%`, `*`, `?`, `&`. Password and confirmation must match. On successful registration, the user is redirected to Login.

## Decision

Can a user register a new EShop account?

## Normalized Conditions

| Condition | Domain | Notes |
| --- | --- | --- |
| Full name state | `present`, `missing` | Required input. |
| Email state | `missing`, `invalid_format`, `duplicate`, `valid_unique` | Combines presence, format, and uniqueness checks into one executable domain. |
| Password state | `missing`, `weak`, `strong` | `strong` means the full FR-01 password policy is satisfied. |
| Confirm password state | `missing`, `mismatch`, `match` | `match` means it matches the password value entered by the user. |

## Outcome Codes

| Code | Expected outcome |
| --- | --- |
| `SUCCESS` | Registration succeeds, account is created, and the user is redirected to Login. |
| `E_NAME` | Registration is rejected because full name is required. |
| `E_EMAIL_REQUIRED` | Registration is rejected because email is required. |
| `E_EMAIL_FORMAT` | Registration is rejected because email format is invalid. |
| `E_EMAIL_DUPLICATE` | Registration is rejected because email is already used. |
| `E_PASSWORD_REQUIRED` | Registration is rejected because password is required. |
| `E_PASSWORD_WEAK` | Registration is rejected because password does not satisfy the strong password policy. |
| `E_CONFIRM_REQUIRED` | Registration is rejected because confirm password is required. |
| `E_CONFIRM_MISMATCH` | Registration is rejected because password and confirmation do not match. |

## Assumptions

| ID | Assumption | Source/Reason |
| --- | --- | --- |
| A01 | When multiple inputs are invalid, the required outcome is rejection with no account creation. | FR-01 defines reject conditions but does not require all validation messages to be displayed at once. |
| A02 | `password = missing` and `confirm password = match` is excluded as impossible in the normalized full table. | A missing password has no entered password value to match. |
| A03 | Pairwise tests are supplemental and do not replace the minimized decision-table tests. | The minimized table covers each major outcome; pairwise improves interaction coverage. |

## Minimized Decision Table

| Rule | Full name | Email state | Password state | Confirm password state | Expected outcome | Test case |
| --- | --- | --- | --- | --- | --- | --- |
| R01 | present | valid_unique | strong | match | `SUCCESS` | TC-REGISTER-001 |
| R02 | missing | valid_unique | strong | match | `E_NAME` | TC-REGISTER-002 |
| R03 | present | missing | strong | match | `E_EMAIL_REQUIRED` | TC-REGISTER-003 |
| R04 | present | invalid_format | strong | match | `E_EMAIL_FORMAT` | TC-REGISTER-004 |
| R05 | present | duplicate | strong | match | `E_EMAIL_DUPLICATE` | TC-REGISTER-005 |
| R06 | present | valid_unique | missing | mismatch | `E_PASSWORD_REQUIRED` | TC-REGISTER-006 |
| R07 | present | valid_unique | weak | match | `E_PASSWORD_WEAK` | TC-REGISTER-007 |
| R08 | present | valid_unique | strong | missing | `E_CONFIRM_REQUIRED` | TC-REGISTER-008 |
| R09 | present | valid_unique | strong | mismatch | `E_CONFIRM_MISMATCH` | TC-REGISTER-009 |

## Full Normalized Decision Table

This is the full feasible normalized table for FR-01: `2 x 4 x 3 x 3 = 72` theoretical combinations, minus 8 impossible combinations where password is missing but confirmation matches, for 64 executable rules.

| Full Rule | Full name | Email state | Password state | Confirm password state | Outcome code(s) | Representative test |
| --- | --- | --- | --- | --- | --- | --- |
| F01 | present | missing | missing | missing | E_EMAIL_REQUIRED, E_PASSWORD_REQUIRED, E_CONFIRM_REQUIRED | - |
| F02 | present | missing | missing | mismatch | E_EMAIL_REQUIRED, E_PASSWORD_REQUIRED, E_CONFIRM_MISMATCH | - |
| F03 | present | missing | weak | missing | E_EMAIL_REQUIRED, E_PASSWORD_WEAK, E_CONFIRM_REQUIRED | - |
| F04 | present | missing | weak | mismatch | E_EMAIL_REQUIRED, E_PASSWORD_WEAK, E_CONFIRM_MISMATCH | TC-REGISTER-013 |
| F05 | present | missing | weak | match | E_EMAIL_REQUIRED, E_PASSWORD_WEAK | - |
| F06 | present | missing | strong | missing | E_EMAIL_REQUIRED, E_CONFIRM_REQUIRED | - |
| F07 | present | missing | strong | mismatch | E_EMAIL_REQUIRED, E_CONFIRM_MISMATCH | - |
| F08 | present | missing | strong | match | E_EMAIL_REQUIRED | TC-REGISTER-003 |
| F09 | present | invalid_format | missing | missing | E_EMAIL_FORMAT, E_PASSWORD_REQUIRED, E_CONFIRM_REQUIRED | TC-REGISTER-014 |
| F10 | present | invalid_format | missing | mismatch | E_EMAIL_FORMAT, E_PASSWORD_REQUIRED, E_CONFIRM_MISMATCH | - |
| F11 | present | invalid_format | weak | missing | E_EMAIL_FORMAT, E_PASSWORD_WEAK, E_CONFIRM_REQUIRED | - |
| F12 | present | invalid_format | weak | mismatch | E_EMAIL_FORMAT, E_PASSWORD_WEAK, E_CONFIRM_MISMATCH | - |
| F13 | present | invalid_format | weak | match | E_EMAIL_FORMAT, E_PASSWORD_WEAK | - |
| F14 | present | invalid_format | strong | missing | E_EMAIL_FORMAT, E_CONFIRM_REQUIRED | - |
| F15 | present | invalid_format | strong | mismatch | E_EMAIL_FORMAT, E_CONFIRM_MISMATCH | - |
| F16 | present | invalid_format | strong | match | E_EMAIL_FORMAT | TC-REGISTER-004 |
| F17 | present | duplicate | missing | missing | E_EMAIL_DUPLICATE, E_PASSWORD_REQUIRED, E_CONFIRM_REQUIRED | - |
| F18 | present | duplicate | missing | mismatch | E_EMAIL_DUPLICATE, E_PASSWORD_REQUIRED, E_CONFIRM_MISMATCH | TC-REGISTER-015 |
| F19 | present | duplicate | weak | missing | E_EMAIL_DUPLICATE, E_PASSWORD_WEAK, E_CONFIRM_REQUIRED | - |
| F20 | present | duplicate | weak | mismatch | E_EMAIL_DUPLICATE, E_PASSWORD_WEAK, E_CONFIRM_MISMATCH | - |
| F21 | present | duplicate | weak | match | E_EMAIL_DUPLICATE, E_PASSWORD_WEAK | - |
| F22 | present | duplicate | strong | missing | E_EMAIL_DUPLICATE, E_CONFIRM_REQUIRED | - |
| F23 | present | duplicate | strong | mismatch | E_EMAIL_DUPLICATE, E_CONFIRM_MISMATCH | - |
| F24 | present | duplicate | strong | match | E_EMAIL_DUPLICATE | TC-REGISTER-005 |
| F25 | present | valid_unique | missing | missing | E_PASSWORD_REQUIRED, E_CONFIRM_REQUIRED | - |
| F26 | present | valid_unique | missing | mismatch | E_PASSWORD_REQUIRED, E_CONFIRM_MISMATCH | TC-REGISTER-006 |
| F27 | present | valid_unique | weak | missing | E_PASSWORD_WEAK, E_CONFIRM_REQUIRED | - |
| F28 | present | valid_unique | weak | mismatch | E_PASSWORD_WEAK, E_CONFIRM_MISMATCH | - |
| F29 | present | valid_unique | weak | match | E_PASSWORD_WEAK | TC-REGISTER-007 |
| F30 | present | valid_unique | strong | missing | E_CONFIRM_REQUIRED | TC-REGISTER-008 |
| F31 | present | valid_unique | strong | mismatch | E_CONFIRM_MISMATCH | TC-REGISTER-009 |
| F32 | present | valid_unique | strong | match | SUCCESS | TC-REGISTER-001 |
| F33 | missing | missing | missing | missing | E_NAME, E_EMAIL_REQUIRED, E_PASSWORD_REQUIRED, E_CONFIRM_REQUIRED | TC-REGISTER-010 |
| F34 | missing | missing | missing | mismatch | E_NAME, E_EMAIL_REQUIRED, E_PASSWORD_REQUIRED, E_CONFIRM_MISMATCH | - |
| F35 | missing | missing | weak | missing | E_NAME, E_EMAIL_REQUIRED, E_PASSWORD_WEAK, E_CONFIRM_REQUIRED | - |
| F36 | missing | missing | weak | mismatch | E_NAME, E_EMAIL_REQUIRED, E_PASSWORD_WEAK, E_CONFIRM_MISMATCH | - |
| F37 | missing | missing | weak | match | E_NAME, E_EMAIL_REQUIRED, E_PASSWORD_WEAK | - |
| F38 | missing | missing | strong | missing | E_NAME, E_EMAIL_REQUIRED, E_CONFIRM_REQUIRED | - |
| F39 | missing | missing | strong | mismatch | E_NAME, E_EMAIL_REQUIRED, E_CONFIRM_MISMATCH | - |
| F40 | missing | missing | strong | match | E_NAME, E_EMAIL_REQUIRED | - |
| F41 | missing | invalid_format | missing | missing | E_NAME, E_EMAIL_FORMAT, E_PASSWORD_REQUIRED, E_CONFIRM_REQUIRED | - |
| F42 | missing | invalid_format | missing | mismatch | E_NAME, E_EMAIL_FORMAT, E_PASSWORD_REQUIRED, E_CONFIRM_MISMATCH | - |
| F43 | missing | invalid_format | weak | missing | E_NAME, E_EMAIL_FORMAT, E_PASSWORD_WEAK, E_CONFIRM_REQUIRED | - |
| F44 | missing | invalid_format | weak | mismatch | E_NAME, E_EMAIL_FORMAT, E_PASSWORD_WEAK, E_CONFIRM_MISMATCH | TC-REGISTER-011 |
| F45 | missing | invalid_format | weak | match | E_NAME, E_EMAIL_FORMAT, E_PASSWORD_WEAK | - |
| F46 | missing | invalid_format | strong | missing | E_NAME, E_EMAIL_FORMAT, E_CONFIRM_REQUIRED | - |
| F47 | missing | invalid_format | strong | mismatch | E_NAME, E_EMAIL_FORMAT, E_CONFIRM_MISMATCH | - |
| F48 | missing | invalid_format | strong | match | E_NAME, E_EMAIL_FORMAT | - |
| F49 | missing | duplicate | missing | missing | E_NAME, E_EMAIL_DUPLICATE, E_PASSWORD_REQUIRED, E_CONFIRM_REQUIRED | - |
| F50 | missing | duplicate | missing | mismatch | E_NAME, E_EMAIL_DUPLICATE, E_PASSWORD_REQUIRED, E_CONFIRM_MISMATCH | - |
| F51 | missing | duplicate | weak | missing | E_NAME, E_EMAIL_DUPLICATE, E_PASSWORD_WEAK, E_CONFIRM_REQUIRED | TC-REGISTER-012 |
| F52 | missing | duplicate | weak | mismatch | E_NAME, E_EMAIL_DUPLICATE, E_PASSWORD_WEAK, E_CONFIRM_MISMATCH | - |
| F53 | missing | duplicate | weak | match | E_NAME, E_EMAIL_DUPLICATE, E_PASSWORD_WEAK | - |
| F54 | missing | duplicate | strong | missing | E_NAME, E_EMAIL_DUPLICATE, E_CONFIRM_REQUIRED | - |
| F55 | missing | duplicate | strong | mismatch | E_NAME, E_EMAIL_DUPLICATE, E_CONFIRM_MISMATCH | - |
| F56 | missing | duplicate | strong | match | E_NAME, E_EMAIL_DUPLICATE | - |
| F57 | missing | valid_unique | missing | missing | E_NAME, E_PASSWORD_REQUIRED, E_CONFIRM_REQUIRED | - |
| F58 | missing | valid_unique | missing | mismatch | E_NAME, E_PASSWORD_REQUIRED, E_CONFIRM_MISMATCH | - |
| F59 | missing | valid_unique | weak | missing | E_NAME, E_PASSWORD_WEAK, E_CONFIRM_REQUIRED | - |
| F60 | missing | valid_unique | weak | mismatch | E_NAME, E_PASSWORD_WEAK, E_CONFIRM_MISMATCH | - |
| F61 | missing | valid_unique | weak | match | E_NAME, E_PASSWORD_WEAK | - |
| F62 | missing | valid_unique | strong | missing | E_NAME, E_CONFIRM_REQUIRED | - |
| F63 | missing | valid_unique | strong | mismatch | E_NAME, E_CONFIRM_MISMATCH | - |
| F64 | missing | valid_unique | strong | match | E_NAME | TC-REGISTER-002 |

## Pairwise Supplemental Design

The minimized table covers every single validation outcome but mostly combines one invalid input with otherwise valid inputs. The supplemental pairwise cases below cover the remaining 2-way interactions among the normalized conditions.

| Pairwise rule | Full name | Email state | Password state | Confirm password state | Full rule | Test case |
| --- | --- | --- | --- | --- | --- | --- |
| PW01 | missing | missing | missing | missing | F33 | TC-REGISTER-010 |
| PW02 | missing | invalid_format | weak | mismatch | F44 | TC-REGISTER-011 |
| PW03 | missing | duplicate | weak | missing | F51 | TC-REGISTER-012 |
| PW04 | present | missing | weak | mismatch | F04 | TC-REGISTER-013 |
| PW05 | present | invalid_format | missing | missing | F09 | TC-REGISTER-014 |
| PW06 | present | duplicate | missing | mismatch | F18 | TC-REGISTER-015 |

## Repository Test Case Mapping

| Test Case ID | File path | Rule(s) | Requirement ID | Module | Test type | Technique | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-REGISTER-001 | `tests/test-cases/register/TC-REGISTER-001-DTT.md` | R01, F32 | FR-01 | Register | Functional | Decision Table Testing | High |
| TC-REGISTER-002 | `tests/test-cases/register/TC-REGISTER-002-DTT.md` | R02, F64 | FR-01 | Register | Functional | Decision Table Testing | High |
| TC-REGISTER-003 | `tests/test-cases/register/TC-REGISTER-003-DTT.md` | R03, F08 | FR-01 | Register | Functional | Decision Table Testing | High |
| TC-REGISTER-004 | `tests/test-cases/register/TC-REGISTER-004-DTT.md` | R04, F16 | FR-01 | Register | Functional | Decision Table Testing | High |
| TC-REGISTER-005 | `tests/test-cases/register/TC-REGISTER-005-DTT.md` | R05, F24 | FR-01 | Register | Functional | Decision Table Testing | High |
| TC-REGISTER-006 | `tests/test-cases/register/TC-REGISTER-006-DTT.md` | R06, F26 | FR-01 | Register | Functional | Decision Table Testing | High |
| TC-REGISTER-007 | `tests/test-cases/register/TC-REGISTER-007-DTT.md` | R07, F29 | FR-01 | Register | Functional | Decision Table Testing | High |
| TC-REGISTER-008 | `tests/test-cases/register/TC-REGISTER-008-DTT.md` | R08, F30 | FR-01 | Register | Functional | Decision Table Testing | High |
| TC-REGISTER-009 | `tests/test-cases/register/TC-REGISTER-009-DTT.md` | R09, F31 | FR-01 | Register | Functional | Decision Table Testing | High |
| TC-REGISTER-010 | `tests/test-cases/register/TC-REGISTER-010-PW.md` | PW01, F33 | FR-01 | Register | Functional | Pairwise + Decision Table Testing | Medium |
| TC-REGISTER-011 | `tests/test-cases/register/TC-REGISTER-011-PW.md` | PW02, F44 | FR-01 | Register | Functional | Pairwise + Decision Table Testing | Medium |
| TC-REGISTER-012 | `tests/test-cases/register/TC-REGISTER-012-PW.md` | PW03, F51 | FR-01 | Register | Functional | Pairwise + Decision Table Testing | Medium |
| TC-REGISTER-013 | `tests/test-cases/register/TC-REGISTER-013-PW.md` | PW04, F04 | FR-01 | Register | Functional | Pairwise + Decision Table Testing | Medium |
| TC-REGISTER-014 | `tests/test-cases/register/TC-REGISTER-014-PW.md` | PW05, F09 | FR-01 | Register | Functional | Pairwise + Decision Table Testing | Medium |
| TC-REGISTER-015 | `tests/test-cases/register/TC-REGISTER-015-PW.md` | PW06, F18 | FR-01 | Register | Functional | Pairwise + Decision Table Testing | Medium |

## Coverage Notes

- The minimized decision table is the primary executable suite for the individual FR-01 outcomes.
- The full normalized table documents all feasible condition combinations for review and traceability.
- The pairwise supplement raises interaction coverage without requiring all 64 full-table cases as separate test files.

## Execution Summary

| Result | Count | Test cases |
| --- | --- | --- |
| Pass | 9 | TC-REGISTER-002, TC-REGISTER-003, TC-REGISTER-006, TC-REGISTER-007, TC-REGISTER-010, TC-REGISTER-011, TC-REGISTER-012, TC-REGISTER-014, TC-REGISTER-015 |
| Fail | 6 | TC-REGISTER-001, TC-REGISTER-004, TC-REGISTER-005, TC-REGISTER-008, TC-REGISTER-009, TC-REGISTER-013 |
| Blocked | 0 | - |
| Not Run | 0 | - |

Bug reports are stored under `tests/bug-reports/register/`:

| Bug report | Found by test case | Summary |
| --- | --- | --- |
| BUG-REGISTER-001 | TC-REGISTER-001 | Valid FR-01 password is rejected during successful registration. |
| BUG-REGISTER-002 | TC-REGISTER-004 | Invalid email format is not validated according to FR-01. |
| BUG-REGISTER-003 | TC-REGISTER-005 | Duplicate email is not prevented during registration. |
| BUG-REGISTER-004 | TC-REGISTER-008 | Confirm password field is missing from registration form. |
| BUG-REGISTER-005 | TC-REGISTER-009 | Password confirmation mismatch is not validated. |
| BUG-REGISTER-006 | TC-REGISTER-013 | Pairwise invalid registration case is not validated consistently. |
