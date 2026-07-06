# TC-REGISTER-010: Reject registration when all required fields are missing

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Pairwise + Decision Table Testing

## Decision Table Rule

PW01 / F33 - Full name, email, password, and confirm password are missing.

## Preconditions

- Backend API is running at `http://localhost:3000`.
- Frontend Web is running at `http://localhost:5173`.

## Test data

| Field | Value |
| --- | --- |
| Họ Tên | Empty |
| Email | Empty |
| Mật khẩu | Empty |
| Xác nhận mật khẩu | Empty |

## Test steps

1. Open `http://localhost:5173/register`.
2. Leave all registration fields empty.
3. Submit the registration form.

## Expected result

The system rejects the registration, does not create an account, and keeps the user on the registration form with required-field validation for the missing inputs.

## Status / Related bugs

Passed
