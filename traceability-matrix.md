# Traceability Matrix

| Requirement | Test Case | Result | Bug Issue | Status |
| --- | --- | --- | --- | --- |
| FR-01 | TC-REGISTER-001 | Fail | BUG-REGISTER-001 | Needs Fix |
| FR-01 | TC-REGISTER-002 | Pass | None | Verified |
| FR-01 | TC-REGISTER-003 | Pass | None | Verified |
| FR-01 | TC-REGISTER-004 | Fail | BUG-REGISTER-002 | Needs Fix |
| FR-01 | TC-REGISTER-005 | Fail | BUG-REGISTER-003 | Needs Fix |
| FR-01 | TC-REGISTER-006 | Pass | None | Verified |
| FR-01 | TC-REGISTER-007 | Pass | None | Verified |
| FR-01 | TC-REGISTER-008 | Fail | BUG-REGISTER-004 | Needs Fix |
| FR-01 | TC-REGISTER-009 | Fail | BUG-REGISTER-005 | Needs Fix |
| FR-01 | TC-REGISTER-010 | Pass | None | Verified |
| FR-01 | TC-REGISTER-011 | Pass | None | Verified |
| FR-01 | TC-REGISTER-012 | Pass | None | Verified |
| FR-01 | TC-REGISTER-013 | Fail | BUG-REGISTER-006 | Needs Fix |
| FR-01 | TC-REGISTER-014 | Pass | None | Verified |
| FR-01 | TC-REGISTER-015 | Pass | None | Verified |

## FR-01 Minimized Decision Table

| Rule | Full name present | Email present | Email format valid | Email unique | Password present | Password strong | Confirm password present | Passwords match | Expected outcome |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R01 | Y | Y | Y | Y | Y | Y | Y | Y | Registration succeeds and redirects to Login |
| R02 | N | Y | Y | Y | Y | Y | Y | Y | Reject: full name is required |
| R03 | Y | N | ANY | ANY | Y | Y | Y | Y | Reject: email is required |
| R04 | Y | Y | N | ANY | Y | Y | Y | Y | Reject: invalid email format |
| R05 | Y | Y | Y | N | Y | Y | Y | Y | Reject: email must be unique |
| R06 | Y | Y | Y | Y | N | ANY | Y | ANY | Reject: password is required |
| R07 | Y | Y | Y | Y | Y | N | Y | Y | Reject: password is weak |
| R08 | Y | Y | Y | Y | Y | Y | N | ANY | Reject: confirm password is required |
| R09 | Y | Y | Y | Y | Y | Y | Y | N | Reject: passwords must match |

## Coverage Notes

- Requirement coverage: FR-01 is covered by one success path, eight rejection paths from the minimized decision table, and six supplemental pairwise interaction cases.
- Test design: Full normalized decision table and pairwise analysis are documented in `tests/test-design/register/FR-01-decision-table-analysis.md`.
- Execution summary: 15 cases executed; 9 passed and 6 failed.
- Defect traceability: Failed cases are linked to BUG-REGISTER-001 through BUG-REGISTER-006 under `tests/bug-reports/register/`.
- Regression candidates: Failed cases plus core success/validation paths should be included in registration regression runs.
| Requirement | Test Case | Kỹ thuật | Result | Bug Issue | Status |
| --- | --- | --- | --- | --- | --- |
| FR-10 | TC-ORDER-STT-001 | State Transition Testing | Not Run | None | Designed |
| FR-10 | TC-ORDER-STT-002 | State Transition Testing | Not Run | None | Designed |
| FR-10 | TC-ORDER-STT-003 | State Transition Testing | Not Run | None | Designed |
| FR-10 | TC-ORDER-STT-004 | State Transition Testing | Not Run | None | Designed |
| FR-10 | TC-ORDER-STT-005 | State Transition Testing | Not Run | None | Designed |
| FR-10 | TC-ORDER-STT-006 | State Transition Testing | Not Run | None | Designed |
| FR-10 | TC-ORDER-STT-007 | State Transition Testing | Not Run | None | Designed |
| FR-10 | TC-ORDER-STT-008 | State Transition Testing | Not Run | None | Designed |
| FR-10 | TC-ORDER-STT-009 | State Transition Testing | Fail | BUG-ORDER-STT-001 | Open |
| FR-10 | TC-ORDER-STT-010 | State Transition Testing | Not Run | None | Designed |
| FR-10 | TC-ORDER-STT-011 | State Transition Testing | Not Run | None | Designed |
| FR-10 | TC-ORDER-STT-012 | State Transition Testing | Not Run | None | Designed |
| FR-10 | TC-ORDER-STT-013 | State Transition Testing | Not Run | None | Designed |
| FR-10 | TC-ORDER-STT-014 | State Transition Testing | Fail | BUG-ORDER-STT-002 | Open |
