# TC-REGISTER-015: Reject duplicate email with missing password and mismatched confirmation

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Pairwise + Decision Table Testing

## Decision Table Rule

PW06 / F18 - Full name is present, email is duplicate, password is missing, and confirmation does not match.

## Preconditions

- Backend API is running at `http://localhost:3000`.
- Frontend Web is running at `http://localhost:5173`.
- Email `test@eshop.com` already exists in the system.

## Test data

| Field | Value |
| --- | --- |
| Họ Tên | Nguyen Van K |
| Email | test@eshop.com |
| Mật khẩu | Empty |
| Xác nhận mật khẩu | Valid123! |

## Test steps

1. Open `http://localhost:5173/register`.
2. Enter the full name, existing email, and password confirmation.
3. Leave `Mật khẩu` empty.
4. Submit the registration form.

## Expected result

The system rejects the registration, does not create a duplicate account, and keeps the user on the registration form because the input combination violates FR-01 validation rules.

## Status / Related bugs

Passed
