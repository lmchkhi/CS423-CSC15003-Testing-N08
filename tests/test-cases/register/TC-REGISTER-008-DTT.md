# TC-REGISTER-008: Reject registration when confirm password is missing

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Decision Table Testing

## Decision Table Rule

R08 - Confirm password is required but missing.

## Preconditions

- Backend API is running at `http://localhost:3000`.
- Frontend Web is running at `http://localhost:5173`.
- Email `fr01.unique.008@example.com` does not exist in the system.

## Test data

| Field | Value |
| --- | --- |
| Họ Tên | Nguyen Van G |
| Email | fr01.unique.008@example.com |
| Mật khẩu | Valid123! |
| Xác nhận mật khẩu | Empty |

## Test steps

1. Open `http://localhost:5173/register`.
2. Verify that the form contains a `Xác nhận mật khẩu` field.
3. Enter the full name, email, and password.
4. Leave the `Xác nhận mật khẩu` field empty.
5. Submit the registration form.

## Expected result

The system rejects the registration because `Xác nhận mật khẩu` is required, no account is created, and the user remains on the registration form.

## Status / Related bugs

Failed / BUG-REGISTER-004
