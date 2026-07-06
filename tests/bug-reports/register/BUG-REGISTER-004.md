# [BUG][Register] Confirm password field is missing from registration form

Labels: `type: bug`, `module: register`, `severity: major`, `priority: P1`, `status: new`, `found-by: test-case`

## Found by Test Case

TC-REGISTER-008

## Requirement liên quan

FR-01

## Severity / Priority

Major / P1

## Environment

Browser, OS, URL, build/commit: Local EShop demo environment, `http://localhost:5173/register`, build/commit TBD.

## Steps to reproduce

1. Open `http://localhost:5173/register`.
2. Verify that the form contains a `Xác nhận mật khẩu` field.
3. Enter `Nguyen Van G` in `Họ Tên`.
4. Enter `fr01.unique.008@example.com` in `Email`.
5. Enter `Valid123!` in `Mật khẩu`.
6. Leave `Xác nhận mật khẩu` empty.
7. Submit the registration form.

## Expected result

The system rejects the registration because `Xác nhận mật khẩu` is required, no account is created, and the user remains on the registration form.

## Actual result

The test case failed. The web registration form does not provide the required `Xác nhận mật khẩu` field, so the missing-confirm-password validation cannot be executed correctly.

## Evidence

- `tests/test-cases/register/TC-REGISTER-008-DTT.md` is marked `Failed`.
- `frontend-web/src/pages/Register.jsx` has state and input fields for `name`, `email`, and `password`, but no confirm-password state or input.
