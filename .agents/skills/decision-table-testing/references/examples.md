# Examples

## Example: Login Risk Decision

Rules:

- Active users with a valid password can sign in.
- Suspended users cannot sign in.
- If multi-factor authentication is required and not completed, challenge the user.
- Locked accounts are denied even if the password is valid.

Decision table:

| Rule | Account state | Password | MFA required | MFA completed | Expected outcome | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| R1 | locked | ANY | ANY | ANY | deny | Highest priority |
| R2 | suspended | ANY | ANY | ANY | deny |  |
| R3 | active | invalid | ANY | ANY | deny |  |
| R4 | active | valid | Y | N | challenge_mfa |  |
| R5 | active | valid | Y | Y | allow |  |
| R6 | active | valid | N | ANY | allow |  |

Repository test cases:

| Test Case ID | File path | Rule(s) | Requirement ID | Module | Test type | Technique | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-LOGIN-001 | `tests/test-cases/login/TC-LOGIN-001.md` | R1 | FR-LOGIN-01 | Login | Functional | Decision Table Testing | High |
| TC-LOGIN-002 | `tests/test-cases/login/TC-LOGIN-002.md` | R2 | FR-LOGIN-01 | Login | Functional | Decision Table Testing | High |
| TC-LOGIN-003 | `tests/test-cases/login/TC-LOGIN-003.md` | R3 | FR-LOGIN-02 | Login | Functional | Decision Table Testing | High |
| TC-LOGIN-004 | `tests/test-cases/login/TC-LOGIN-004.md` | R4 | FR-LOGIN-03 | Login | Functional | Decision Table Testing | High |
| TC-LOGIN-005 | `tests/test-cases/login/TC-LOGIN-005.md` | R5 | FR-LOGIN-03 | Login | Functional | Decision Table Testing | Medium |
| TC-LOGIN-006 | `tests/test-cases/login/TC-LOGIN-006.md` | R6 | FR-LOGIN-03 | Login | Functional | Decision Table Testing | Medium |

## Example: API Validation Decision

Rules:

- Requests without an auth token return `401`.
- Authenticated requests missing required fields return `400`.
- Authenticated requests with malformed field values return `422`.
- Valid authenticated requests create the resource and return `201`.

Decision table:

| Rule | Auth token | Required fields | Field format | Expected outcome |
| --- | --- | --- | --- | --- |
| R1 | missing | ANY | ANY | 401 Unauthorized |
| R2 | invalid | ANY | ANY | 401 Unauthorized |
| R3 | valid | missing | ANY | 400 Bad Request |
| R4 | valid | present | malformed | 422 Unprocessable Entity |
| R5 | valid | present | valid | 201 Created |

Notes:

- Store generated cases under `tests/test-cases/api/` using IDs such as `TC-API-001`.
- Add separate tests for each required field if the API reports field-specific errors.
- Add boundary tests for fields with min/max length, numeric ranges, dates, or enum values.
- Add precedence tests if malformed JSON, bad content type, and auth errors can happen together.
- Record execution in `tests/test-runs/sprint-N-test-run.md`; failed or blocked rows need `Related Bug`.

## Example Prompts

- "Use this requirements text to build a minimized decision table and test cases."
- "Review this decision table for gaps, overlaps, and unclear outcomes."
- "Generate API validation tests from these rules using decision table testing."
- "Convert this pricing policy into a decision table with high-priority test cases."
- "Create repository-ready Markdown test case files using the GitHub test case management structure."
