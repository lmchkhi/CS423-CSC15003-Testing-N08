<!-- tests/test-cases/FR-12-access/domain-testing/TC-FR12-DT-015.md -->

# TC-FR12-DT-015: Import sản phẩm CSV (Admin) — Token user thường (Domain Testing)

## Requirement ID

FR-12

## Module / Test type / Technique

Kiểm soát truy cập (Access Control) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable     | Type        | Domain / Constraints                                                                                                      |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| Token        | Categorical | JWT Token trong header `Authorization: Bearer <token>`. Partitions: Không gửi, Sai/hết hạn, Hợp lệ (user), Hợp lệ (admin) |
| Role         | Categorical | Giá trị `role` trong JWT payload. Partitions: N/A, user, admin                                                            |
| API Endpoint | Fixed       | POST /api/admin/import-products                                                                                           |

### Domain Matrix

| TC     | Token                  | Role | API Endpoint                      | Expected         |
| ------ | ---------------------- | ---- | --------------------------------- | ---------------- |
| DT-015 | Valid (test@eshop.com) | user | POST `/api/admin/import-products` | ❌ 403 Forbidden |

## Preconditions

- Hệ thống EShop đang hoạt động
- Tài khoản user `test@eshop.com` / `Test1234!` đã tồn tại và có role `user`

## Test data

| Field                | Value                                                                                                                |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| URL                  | `http://localhost:3000/api/admin/import-products`                                                                    |
| Method               | POST                                                                                                                 |
| Header Authorization | Bearer `<user_token>`                                                                                                |
| Body                 | `{"products": [{"name": "SP Test", "price": 10000, "description": "Mô tả test", "imageUrl": "", "category_id": 1}]}` |

## Test steps

1. Gửi `POST http://localhost:3000/api/login` với body `{"email": "test@eshop.com", "password": "Test1234!"}`
2. Copy giá trị `token` từ response
3. Tạo request POST đến `http://localhost:3000/api/admin/import-products`
4. Thêm header `Authorization: Bearer <user_token>`
5. Thêm body JSON: `{"products": [{"name": "SP Test", "price": 10000, "description": "Mô tả test", "imageUrl": "", "category_id": 1}]}`
6. Gửi request
7. Kiểm tra HTTP response status code và response body

## Expected result

Hệ thống trả về HTTP 403 Forbidden. Response body chứa thông báo lỗi không đủ quyền truy cập (SEC-03: phải kiểm tra role, không chỉ sự tồn tại của Token).

## Actual result

Hệ thống trả về HTTP 200 OK. Response thông báo thành công, sản phẩm được thêm vào cơ sở dữ liệu. Không kiểm tra role, chỉ kiểm tra sự tồn tại của Token.

## Status

FAILED
