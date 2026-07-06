# TC-REGISTER-003: Reject registration when email is missing

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Decision Table Testing

## Decision Table Rule

R03 - Required email is missing.

## Preconditions

- Backend API is running at `http://localhost:3000`.
- Frontend Web is running at `http://localhost:5173`.

## Test data

| Field | Value |
| --- | --- |
| Họ Tên | Nguyen Van B |
| Email | Empty |
| Mật khẩu | Valid123! |
| Xác nhận mật khẩu | Valid123! |

## Test steps

1. Open `http://localhost:5173/register`.
2. Enter the full name, password, and password confirmation.
3. Leave the `Email` field empty.
4. Submit the registration form.

## Expected result

The system rejects the registration because `Email` is required, no account is created, and the user remains on the registration form.

## Status / Related bugs

Passed
