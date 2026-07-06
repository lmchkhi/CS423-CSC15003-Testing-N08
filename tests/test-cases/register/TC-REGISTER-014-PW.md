# TC-REGISTER-014: Reject invalid email with missing password and missing confirmation

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Pairwise + Decision Table Testing

## Decision Table Rule

PW05 / F09 - Full name is present, email format is invalid, password is missing, and confirmation is missing.

## Preconditions

- Backend API is running at `http://localhost:3000`.
- Frontend Web is running at `http://localhost:5173`.

## Test data

| Field | Value |
| --- | --- |
| Họ Tên | Nguyen Van J |
| Email | invalid-email |
| Mật khẩu | Empty |
| Xác nhận mật khẩu | Empty |

## Test steps

1. Open `http://localhost:5173/register`.
2. Enter the full name and invalid email.
3. Leave the password and confirmation fields empty.
4. Submit the registration form.

## Expected result

The system rejects the registration, does not create an account, and keeps the user on the registration form because the input combination violates FR-01 validation rules.

## Status / Related bugs

Passed
