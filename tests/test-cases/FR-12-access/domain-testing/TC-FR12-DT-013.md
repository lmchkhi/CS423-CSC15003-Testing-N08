<!-- tests/test-cases/FR-12-access/domain-testing/TC-FR12-DT-013.md -->

# TC-FR12-DT-013: Cập nhật trạng thái đơn hàng (Admin) — Token admin (Domain Testing)

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
| API Endpoint | Fixed       | PUT /api/admin/orders/1/status                                                                                            |

### Domain Matrix

| TC     | Token                   | Role  | API Endpoint                     | Expected                                   |
| ------ | ----------------------- | ----- | -------------------------------- | ------------------------------------------ |
| DT-013 | Valid (admin@eshop.com) | admin | PUT `/api/admin/orders/1/status` | ✅ 200 OK — cập nhật trạng thái thành công |

## Preconditions

- Hệ thống EShop đang hoạt động
- Tài khoản admin `admin@eshop.com` / `Admin123!` đã tồn tại và có role `admin`
- Đơn hàng có ID = 1 tồn tại trong hệ thống

## Test data

| Field                | Value                                             |
| -------------------- | ------------------------------------------------- |
| URL                  | `http://localhost:3000/api/admin/orders/1/status` |
| Method               | PUT                                               |
| Header Authorization | Bearer `<admin_token>`                            |
| Body                 | `{"status": "confirmed"}`                         |

## Test steps

1. Gửi `POST http://localhost:3000/api/login` với body `{"email": "admin@eshop.com", "password": "Admin123!"}`
2. Copy giá trị `token` từ response
3. Tạo request PUT đến `http://localhost:3000/api/admin/orders/2/status`
4. Thêm header `Authorization: Bearer <admin_token>`
5. Thêm body JSON: `{"status": "confirmed"}`
6. Gửi request
7. Kiểm tra HTTP response status code và response body

## Expected result

Hệ thống trả về HTTP 200 OK. Trạng thái đơn hàng được cập nhật thành công sang "confirmed".

## Actual result

Hệ thống trả về HTTP 200 OK. Trạng thái đơn hàng được cập nhật thành công sang "confirmed".

## Status

PASSED
