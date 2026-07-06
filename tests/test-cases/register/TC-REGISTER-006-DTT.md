# TC-REGISTER-006: Reject registration when password is missing

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Decision Table Testing

## Decision Table Rule

R06 - Required password is missing.

## Preconditions

- Backend API is running at `http://localhost:3000`.
- Frontend Web is running at `http://localhost:5173`.
- Email `fr01.unique.006@example.com` does not exist in the system.

## Test data

| Field | Value |
| --- | --- |
| Họ Tên | Nguyen Van E |
| Email | fr01.unique.006@example.com |
| Mật khẩu | Empty |
| Xác nhận mật khẩu | Valid123! |

## Test steps

1. Open `http://localhost:5173/register`.
2. Enter the full name, email, and password confirmation.
3. Leave the `Mật khẩu` field empty.
4. Submit the registration form.

## Expected result

The system rejects the registration because `Mật khẩu` is required, no account is created, and the user remains on the registration form.

## Status / Related bugs

Passed
