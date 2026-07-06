# TC-REGISTER-012: Reject missing name with duplicate email, weak password, and missing confirmation

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Pairwise + Decision Table Testing

## Decision Table Rule

PW03 / F51 - Missing full name, duplicate email, weak password, and missing confirmation.

## Preconditions

- Backend API is running at `http://localhost:3000`.
- Frontend Web is running at `http://localhost:5173`.
- Email `test@eshop.com` already exists in the system.

## Test data

| Field | Value |
| --- | --- |
| Họ Tên | Empty |
| Email | test@eshop.com |
| Mật khẩu | password |
| Xác nhận mật khẩu | Empty |

## Test steps

1. Open `http://localhost:5173/register`.
2. Leave `Họ Tên` and `Xác nhận mật khẩu` empty.
3. Enter the existing email and weak password.
4. Submit the registration form.

## Expected result

The system rejects the registration, does not create a duplicate account, and keeps the user on the registration form because the input combination violates FR-01 validation rules.

## Status / Related bugs

Passed