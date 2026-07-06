# [BUG][Register] Valid FR-01 password is rejected during successful registration

Labels: `type: bug`, `module: register`, `severity: major`, `priority: P1`, `status: new`, `found-by: test-case`

## Found by Test Case

TC-REGISTER-001

## Requirement liên quan

FR-01

## Severity / Priority

Major / P1

## Environment

Browser, OS, URL, build/commit: Local EShop demo environment, `http://localhost:5173/register`, build/commit TBD.

## Steps to reproduce

1. Open `http://localhost:5173/register`.
2. Enter `Nguyen Van A` in `Họ Tên`.
3. Enter `fr01.unique.001@example.com` in `Email`.
4. Enter `Valid123!` in `Mật khẩu`.
5. Enter `Valid123!` in `Xác nhận mật khẩu`.
6. Submit the registration form.

## Expected result

The account is created successfully, the system does not show a validation error, and the user is redirected to the Login page.

## Actual result

The test case failed. The registration flow does not complete successfully for password `Valid123!`, even though this password satisfies FR-01.

## Evidence

- `tests/test-cases/register/TC-REGISTER-001-DTT.md` is marked `Failed`.
- `frontend-web/src/pages/Register.jsx` uses a password regex that requires whitespace and excludes the allowed special characters from FR-01.
