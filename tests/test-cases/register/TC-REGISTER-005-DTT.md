# TC-REGISTER-005: Reject registration when email already exists

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Decision Table Testing

## Decision Table Rule

R05 - Email is valid but not unique.

## Preconditions

- Backend API is running at `http://localhost:3000`.
- Frontend Web is running at `http://localhost:5173`.
- Email `test@eshop.com` already exists in the system.

## Test data

| Field | Value |
| --- | --- |
| Họ Tên | Nguyen Van D |
| Email | test@eshop.com |
| Mật khẩu | Valid123! |
| Xác nhận mật khẩu | Valid123! |

## Test steps

1. Open `http://localhost:5173/register`.
2. Enter all test data using the existing email address.
3. Submit the registration form.

## Expected result

The system rejects the registration because the email is already used, does not create a duplicate account, and keeps the user on the registration form with a suitable error message.

## Status / Related bugs

Failed / BUG-REGISTER-003
