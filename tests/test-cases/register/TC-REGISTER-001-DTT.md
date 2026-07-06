# TC-REGISTER-001: Register with valid account information

## Requirement ID

FR-01

## Module / Test type / Technique

Register / Functional / Decision Table Testing

## Decision Table Rule

R01 - All required registration conditions are valid.

## Preconditions

- Backend API is running at `http://localhost:3000`.
- Frontend Web is running at `http://localhost:5173`.
- Email `fr01.unique.001@example.com` does not exist in the system.

## Test data

| Field | Value |
| --- | --- |
| Họ Tên | Nguyen Van A |
| Email | fr01.unique.001@example.com |
| Mật khẩu | Valid123! |
| Xác nhận mật khẩu | Valid123! |

## Test steps

1. Open `http://localhost:5173/register`.
2. Enter all test data.
3. Submit the registration form.

## Expected result

The account is created successfully, the system does not show a validation error, and the user is redirected to the Login page.

## Status / Related bugs

Failed / BUG-REGISTER-001
