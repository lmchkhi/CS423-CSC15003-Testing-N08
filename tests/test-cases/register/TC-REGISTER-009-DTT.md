# TC-REGISTER-009: Reject registration when password confirmation does not match

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Decision Table Testing

## Decision Table Rule

R09 - Password and confirm password are both present but do not match.

## Preconditions

- Backend API is running at `http://localhost:3000`.
- Frontend Web is running at `http://localhost:5173`.
- Email `fr01.unique.009@example.com` does not exist in the system.

## Test data

| Field | Value |
| --- | --- |
| Họ Tên | Nguyen Van H |
| Email | fr01.unique.009@example.com |
| Mật khẩu | Valid123! |
| Xác nhận mật khẩu | Valid123? |

## Test steps

1. Open `http://localhost:5173/register`.
2. Verify that the form contains a `Xác nhận mật khẩu` field.
3. Enter all test data.
4. Submit the registration form.

## Expected result

The system rejects the registration because the password and confirmation do not match, no account is created, and the user remains on the registration form with a suitable error message.

## Status / Related bugs

Failed / BUG-REGISTER-005
