# [BUG][Register] Pairwise invalid registration case is not validated consistently

Labels: `type: bug`, `module: register`, `severity: major`, `priority: P1`, `status: new`, `found-by: test-case`

## Found by Test Case

TC-REGISTER-013

## Requirement liên quan

FR-01

## Severity / Priority

Major / P1

## Environment

Browser, OS, URL, build/commit: Local EShop demo environment, `http://localhost:5173/register`, build/commit TBD.

## Steps to reproduce

1. Open `http://localhost:5173/register`.
2. Enter `Nguyen Van I` in `Họ Tên`.
3. Leave `Email` empty.
4. Enter weak password `password`.
5. Enter mismatched confirmation `Password1?`.
6. Submit the registration form.

## Expected result

The system rejects the registration, does not create an account, and keeps the user on the registration form because the input combination violates FR-01 validation rules.

## Actual result

The test case failed. The registration implementation does not consistently validate the combined missing-email, weak-password, and mismatched-confirmation conditions from FR-01.

## Evidence

- `tests/test-cases/register/TC-REGISTER-013-PW.md` is marked `Failed`.
- `frontend-web/src/pages/Register.jsx` has no confirm-password field or mismatch check.
- The current frontend password validation does not match the FR-01 strong-password rule.
