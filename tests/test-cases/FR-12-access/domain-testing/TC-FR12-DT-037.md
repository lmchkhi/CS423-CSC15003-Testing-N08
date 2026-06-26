<!-- tests/test-cases/FR-12-access/domain-testing/TC-FR12-DT-037.md -->

# TC-FR12-DT-037: Cập nhật danh mục — Token admin (Domain Testing)

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
| API Endpoint | Fixed       | PUT /api/categories/1                                                                                                     |

### Domain Matrix

| TC     | Token                   | Role  | API Endpoint            | Expected  |
| ------ | ----------------------- | ----- | ----------------------- | --------- |
| DT-037 | Valid (admin@eshop.com) | admin | PUT `/api/categories/1` | ✅ 200 OK |

## Preconditions

- Hệ thống EShop đang hoạt động
- Tài khoản admin `admin@eshop.com` / `Admin123!` đã tồn tại
- Tồn tại ít nhất 1 danh mục trong hệ thống

## Test data

| Field                | Value                                    |
| -------------------- | ---------------------------------------- |
| URL                  | `http://localhost:3000/api/categories/1` |
| Method               | PUT                                      |
| Header Authorization | Bearer `<admin_token>`                   |
| Body                 | `{"name": "Danh mục updated"}`           |

## Test steps

1. Gửi `POST http://localhost:3000/api/login` với body `{"email": "admin@eshop.com", "password": "Admin123!"}`
2. Copy giá trị `token` từ response
3. Tạo request PUT đến `http://localhost:3000/api/categories/1`
4. Thêm header `Authorization: Bearer <admin_token>`
5. Thêm body JSON: `{"name": "Danh mục updated"}`
6. Gửi request
7. Kiểm tra HTTP response status code và response body

## Expected result

Hệ thống trả về HTTP 200 OK. Danh mục được cập nhật thành công. Response body chứa thông tin danh mục đã cập nhật.

## Actual result

Hệ thống trả về HTTP 200 OK. Danh mục được cập nhật thành công. Response body chứa thông tin danh mục đã cập nhật.

## Status

PASSED
