# TC-REGISTER-011: Reject missing name with invalid email, weak password, and mismatched confirmation

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Pairwise + Decision Table Testing

## Decision Table Rule

PW02 / F44 - Missing full name, invalid email format, weak password, and mismatched confirmation.

## Preconditions

- Backend API is running at `http://localhost:3000`.
- Frontend Web is running at `http://localhost:5173`.

## Test data

| Field | Value |
| --- | --- |
| Họ Tên | Empty |
| Email | invalid-email |
| Mật khẩu | password |
| Xác nhận mật khẩu | Password1? |

## Test steps

1. Open `http://localhost:5173/register`.
2. Leave `Họ Tên` empty.
3. Enter the email, password, and confirmation from the test data.
4. Submit the registration form.

## Expected result

The system rejects the registration, does not create an account, and keeps the user on the registration form because the input combination violates FR-01 validation rules.

## Status / Related bugs

Passed
