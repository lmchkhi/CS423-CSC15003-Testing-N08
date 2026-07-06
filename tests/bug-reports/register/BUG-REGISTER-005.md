# [BUG][Register] Password confirmation mismatch is not validated

Labels: `type: bug`, `module: register`, `severity: major`, `priority: P1`, `status: new`, `found-by: test-case`

## Found by Test Case

TC-REGISTER-009

## Requirement liên quan

FR-01

## Severity / Priority

Major / P1

## Environment

Browser, OS, URL, build/commit: Local EShop demo environment, `http://localhost:5173/register`, build/commit TBD.

## Steps to reproduce

1. Open `http://localhost:5173/register`.
2. Verify that the form contains a `Xác nhận mật khẩu` field.
3. Enter `Nguyen Van H` in `Họ Tên`.
4. Enter `fr01.unique.009@example.com` in `Email`.
5. Enter `Valid123!` in `Mật khẩu`.
6. Enter `Valid123?` in `Xác nhận mật khẩu`.
7. Submit the registration form.

## Expected result

The system rejects the registration because the password and confirmation do not match, no account is created, and the user remains on the registration form with a suitable error message.

## Actual result

The test case failed. The registration implementation does not validate a password-confirmation mismatch as required by FR-01.

## Evidence

- `tests/test-cases/register/TC-REGISTER-009-DTT.md` is marked `Failed`.
- `frontend-web/src/pages/Register.jsx` has no confirm-password field or mismatch check.
- `backend/server.js` accepts only `name`, `email`, and `password` for `POST /api/register`.
