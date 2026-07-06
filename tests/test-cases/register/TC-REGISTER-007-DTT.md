# TC-REGISTER-007: Reject registration when password is weak

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Decision Table Testing

## Decision Table Rule

R07 - Password is present but does not satisfy the strong password policy.

## Preconditions

- Backend API is running at `http://localhost:3000`.
- Frontend Web is running at `http://localhost:5173`.
- Email `fr01.unique.007@example.com` does not exist in the system.

## Test data

| Field | Value |
| --- | --- |
| Họ Tên | Nguyen Van F |
| Email | fr01.unique.007@example.com |
| Mật khẩu | password |
| Xác nhận mật khẩu | password |

## Test steps

1. Open `http://localhost:5173/register`.
2. Enter all test data.
3. Submit the registration form.

## Expected result

The system rejects the registration because the password does not contain at least 8 characters with uppercase, lowercase, digit, and allowed special character requirements, and no account is created.

## Status / Related bugs

Passed
