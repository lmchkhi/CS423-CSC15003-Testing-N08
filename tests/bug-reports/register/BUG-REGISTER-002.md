# [BUG][Register] Invalid email format is not validated according to FR-01

Labels: `type: bug`, `module: register`, `severity: major`, `priority: P1`, `status: new`, `found-by: test-case`

## Found by Test Case

TC-REGISTER-004

## Requirement liên quan

FR-01

## Severity / Priority

Major / P1

## Environment

Browser, OS, URL, build/commit: Local EShop demo environment, `http://localhost:5173/register`, build/commit TBD.

## Steps to reproduce

1. Open `http://localhost:5173/register`.
2. Enter `Nguyen Van C` in `Họ Tên`.
3. Enter `invalid-email` in `Email`.
4. Enter `Valid123!` in `Mật khẩu`.
5. Enter `Valid123!` in `Xác nhận mật khẩu`.
6. Submit the registration form.

## Expected result

The system rejects the registration because the email format is invalid, no account is created, and the user remains on the registration form.

## Actual result

The test case failed. The registration implementation does not provide reliable FR-01 email-format validation for the invalid email input.

## Evidence

- `tests/test-cases/register/TC-REGISTER-004-DTT.md` is marked `Failed`.
- `frontend-web/src/pages/Register.jsx` renders the email input as `type="text"`.
- `backend/server.js` inserts the submitted email without validating its format.
