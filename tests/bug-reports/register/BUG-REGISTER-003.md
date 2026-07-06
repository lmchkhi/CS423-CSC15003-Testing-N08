# [BUG][Register] Duplicate email is not prevented during registration

Labels: `type: bug`, `module: register`, `severity: major`, `priority: P1`, `status: new`, `found-by: test-case`

## Found by Test Case

TC-REGISTER-005

## Requirement liên quan

FR-01

## Severity / Priority

Major / P1

## Environment

Browser, OS, URL, build/commit: Local EShop demo environment, `http://localhost:5173/register`, build/commit TBD.

## Steps to reproduce

1. Open `http://localhost:5173/register`.
2. Enter `Nguyen Van D` in `Họ Tên`.
3. Enter existing email `test@eshop.com`.
4. Enter `Valid123!` in `Mật khẩu`.
5. Enter `Valid123!` in `Xác nhận mật khẩu`.
6. Submit the registration form.

## Expected result

The system rejects the registration because the email is already used, does not create a duplicate account, and keeps the user on the registration form with a suitable error message.

## Actual result

The test case failed. The registration implementation does not reliably enforce email uniqueness for an already registered email address.

## Evidence

- `tests/test-cases/register/TC-REGISTER-005-DTT.md` is marked `Failed`.
- `backend/database.js` defines `users.email` without a `UNIQUE` constraint.
- `backend/server.js` inserts a user without checking whether the email already exists.
