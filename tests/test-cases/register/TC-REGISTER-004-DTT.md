# TC-REGISTER-004: Reject registration when email format is invalid

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Decision Table Testing

## Decision Table Rule

R04 - Email is present but does not match a valid `user@domain.com` format.

## Preconditions

- Backend API is running at `http://localhost:3000`.
- Frontend Web is running at `http://localhost:5173`.

## Test data

| Field | Value |
| --- | --- |
| Họ Tên | Nguyen Van C |
| Email | invalid-email |
| Mật khẩu | Valid123! |
| Xác nhận mật khẩu | Valid123! |

## Test steps

1. Open `http://localhost:5173/register`.
2. Enter all test data.
3. Submit the registration form.

## Expected result

The system rejects the registration because the email format is invalid, no account is created, and the user remains on the registration form.

## Status / Related bugs

Failed / BUG-REGISTER-002
