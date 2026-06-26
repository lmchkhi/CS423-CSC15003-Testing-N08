<!-- tests/test-cases/FR-12-access/domain-testing/TC-FR12-DT-016.md -->

# TC-FR12-DT-016: Import sản phẩm CSV (Admin) — Token admin (Domain Testing)

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

| TC     | Token                   | Role  | API Endpoint                      | Expected                               |
| ------ | ----------------------- | ----- | --------------------------------- | -------------------------------------- |
| DT-016 | Valid (admin@eshop.com) | admin | POST `/api/admin/import-products` | ✅ 200 OK — import sản phẩm thành công |

## Preconditions

- Hệ thống EShop đang hoạt động
- Tài khoản admin `admin@eshop.com` / `Admin123!` đã tồn tại và có role `admin`
- Category có ID = 1 tồn tại trong hệ thống

## Test data

| Field                | Value                                                                                                                |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| URL                  | `http://localhost:3000/api/admin/import-products`                                                                    |
| Method               | POST                                                                                                                 |
| Header Authorization | Bearer `<admin_token>`                                                                                               |
| Body                 | `{"products": [{"name": "SP Test", "price": 10000, "description": "Mô tả test", "imageUrl": "", "category_id": 1}]}` |

## Test steps

1. Gửi `POST http://localhost:3000/api/login` với body `{"email": "admin@eshop.com", "password": "Admin123!"}`
2. Copy giá trị `token` từ response
3. Tạo request POST đến `http://localhost:3000/api/admin/import-products`
4. Thêm header `Authorization: Bearer <admin_token>`
5. Thêm body JSON: `{"products": [{"name": "SP Test", "price": 10000, "description": "Mô tả test", "imageUrl": "", "category_id": 1}]}`
6. Gửi request
7. Kiểm tra HTTP response status code và response body

## Expected result

Hệ thống trả về HTTP 200 OK. Sản phẩm được import thành công vào hệ thống.

## Actual result

Hệ thống trả về HTTP 200 OK. Sản phẩm được import thành công vào hệ thống.

## Status

PASSED
