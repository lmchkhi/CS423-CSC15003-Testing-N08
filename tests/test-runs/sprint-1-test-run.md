# Sprint 1 Test Run

## Scope

- Sprint/release: Sprint 1
- Build/commit: TBD
- Environment: Local EShop demo environment
- Execution date: 2026-06-29

## Results

| Test Case ID | Module | Tester | Result | Related Bug | Note |
| --- | --- | --- | --- | --- | --- |
| TC-REGISTER-001 | Register | User | Fail | BUG-REGISTER-001 | FR-01 R01/F32 |
| TC-REGISTER-002 | Register | User | Pass | None | FR-01 R02/F64 |
| TC-REGISTER-003 | Register | User | Pass | None | FR-01 R03/F08 |
| TC-REGISTER-004 | Register | User | Fail | BUG-REGISTER-002 | FR-01 R04/F16 |
| TC-REGISTER-005 | Register | User | Fail | BUG-REGISTER-003 | FR-01 R05/F24 |
| TC-REGISTER-006 | Register | User | Pass | None | FR-01 R06/F26 |
| TC-REGISTER-007 | Register | User | Pass | None | FR-01 R07/F29 |
| TC-REGISTER-008 | Register | User | Fail | BUG-REGISTER-004 | FR-01 R08/F30 |
| TC-REGISTER-009 | Register | User | Fail | BUG-REGISTER-005 | FR-01 R09/F31 |
| TC-REGISTER-010 | Register | User | Pass | None | FR-01 PW01/F33 |
| TC-REGISTER-011 | Register | User | Pass | None | FR-01 PW02/F44 |
| TC-REGISTER-012 | Register | User | Pass | None | FR-01 PW03/F51 |
| TC-REGISTER-013 | Register | User | Fail | BUG-REGISTER-006 | FR-01 PW04/F04 |
| TC-REGISTER-014 | Register | User | Pass | None | FR-01 PW05/F09 |
| TC-REGISTER-015 | Register | User | Pass | None | FR-01 PW06/F18 |

## Summary

| Result | Count |
| --- | --- |
| Pass | 9 |
| Fail | 6 |
| Blocked | 0 |
| Not Run | 0 |

## Retest Notes

- Bug reports were created for failed cases: BUG-REGISTER-001 through BUG-REGISTER-006.
- Retest failed cases after fixes are marked ready for retest.
