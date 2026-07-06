# TC-REGISTER-013: Reject missing email with weak password and mismatched confirmation

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Pairwise + Decision Table Testing

## Decision Table Rule

PW04 / F04 - Full name is present, email is missing, password is weak, and confirmation does not match.

## Preconditions

- Backend API is running at `http://localhost:3000`.
- Frontend Web is running at `http://localhost:5173`.

## Test data

| Field | Value |
| --- | --- |
| Họ Tên | Nguyen Van I |
| Email | Empty |
| Mật khẩu | password |
| Xác nhận mật khẩu | Password1? |

## Test steps

1. Open `http://localhost:5173/register`.
2. Enter the full name, weak password, and mismatched confirmation.
3. Leave `Email` empty.
4. Submit the registration form.

## Expected result

The system rejects the registration, does not create an account, and keeps the user on the registration form because the input combination violates FR-01 validation rules.

## Status / Related bugs

Failed / BUG-REGISTER-006
