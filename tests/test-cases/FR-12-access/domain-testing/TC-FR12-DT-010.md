<!-- tests/test-cases/FR-12-access/domain-testing/TC-FR12-DT-010.md -->

# TC-FR12-DT-010: Truy cập API danh sách đơn hàng (Admin) — Token admin (Domain Testing)

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
| API Endpoint | Fixed       | GET /api/admin/orders                                                                                                     |

### Domain Matrix

| TC     | Token                   | Role  | API Endpoint            | Expected                              |
| ------ | ----------------------- | ----- | ----------------------- | ------------------------------------- |
| DT-010 | Valid (admin@eshop.com) | admin | GET `/api/admin/orders` | ✅ 200 OK — trả về danh sách đơn hàng |

## Preconditions

- Hệ thống EShop đang hoạt động
- Tài khoản admin `admin@eshop.com` / `Admin123!` đã tồn tại

## Test data

| Field                | Value                                    |
| -------------------- | ---------------------------------------- |
| URL                  | `http://localhost:3000/api/admin/orders` |
| Method               | GET                                      |
| Header Authorization | `Bearer <admin_token>`                   |

## Test steps

1. Gửi `POST http://localhost:3000/api/login` với body `{"email": "admin@eshop.com", "password": "Admin123!"}`
2. Copy giá trị `token` từ response
3. Tạo request GET đến `http://localhost:3000/api/admin/orders`
4. Thêm header `Authorization: Bearer <admin_token>`
5. Gửi request
6. Kiểm tra HTTP response status code và response body

## Expected result

Hệ thống trả về HTTP 200 OK. Response body chứa danh sách đơn hàng.

## Actual result

Hệ thống trả về HTTP 200 OK. Response body chứa danh sách đơn hàng.

## Status

PASSED
