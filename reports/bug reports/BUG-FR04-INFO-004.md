# BUG-FR04-INFO-004: Người dùng có thể tự nâng role của chính mình qua API

## Found by Test Case

TC-FR04-INFO-004

## Requirement liên quan

FR-04 Personal profile management

## Severity / Priority

## Environment

- Windows 10
- Postman Version 12.15.5

## Steps to reproduce

1. Chạy chương trình backend, frontend web, frontend admin
2. Dùng Postman gửi đến [http://localhost:3000/api/login](http://localhost:3000/api/login) bằng phương thức POST và thân thông điệp gửi dưới dạng RAW JSON:

    ```json
    {
    "email": "test@eshop.com",
    "password": "Test1234!"
    }
    ```

3. Dùng Postman gửi đến [http://localhost:3000/api/users/me](http://localhost:3000/api/users/me) bằng phương thức PUT và thân thông điệp gửi dưới dạng RAW JSON:

    ```json
    {
    "name": "Test User",
    "role": "admin"
    }
    ```

4. Dùng Postman gửi đến [http://localhost:3000/api/users/me](http://localhost:3000/api/users/me) bằng phương thức GET

## Expected result

Kết quả nhận được ở bước 3 là role vẫn là user

## Actual result

## Evidence

Kết quả nhận được ở bước 3 là:

```json
{
    "id": 2,
    "name": "Test User",
    "email": "test@eshop.com",
    "password": "Test1234!",
    "role": "admin",
    "login_attempts": 0,
    "locked_until": null,
    "reset_token": null,
    "shipping_address": null,
    "phone": null
}
```
