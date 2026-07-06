# TC-REGISTER-002: Reject registration when full name is missing

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Decision Table Testing

## Decision Table Rule

R02 - Required full name is missing.

## Preconditions

- Backend API is running at `http://localhost:3000`.
- Frontend Web is running at `http://localhost:5173`.
- Email `fr01.unique.002@example.com` does not exist in the system.

## Test data

| Field | Value |
| --- | --- |
| Họ Tên | Empty |
| Email | fr01.unique.002@example.com |
| Mật khẩu | Valid123! |
| Xác nhận mật khẩu | Valid123! |

## Test steps

1. Open `http://localhost:5173/register`.
2. Leave the `Họ Tên` field empty.
3. Enter the remaining test data.
4. Submit the registration form.

## Expected result

The system rejects the registration because `Họ Tên` is required, no account is created, and the user remains on the registration form.

## Status / Related bugs

Passed
