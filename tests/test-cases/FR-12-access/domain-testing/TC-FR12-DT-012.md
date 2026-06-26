<!-- tests/test-cases/FR-12-access/domain-testing/TC-FR12-DT-012.md -->

# TC-FR12-DT-012: Cập nhật trạng thái đơn hàng (Admin) — Token user thường (Domain Testing)

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

| TC     | Token                  | Role | API Endpoint                     | Expected         |
| ------ | ---------------------- | ---- | -------------------------------- | ---------------- |
| DT-012 | Valid (test@eshop.com) | user | PUT `/api/admin/orders/1/status` | ❌ 403 Forbidden |

## Preconditions

- Hệ thống EShop đang hoạt động
- Tài khoản user `test@eshop.com` / `Test1234!` đã tồn tại và có role `user`

## Test data

| Field                | Value                                             |
| -------------------- | ------------------------------------------------- |
| URL                  | `http://localhost:3000/api/admin/orders/1/status` |
| Method               | PUT                                               |
| Header Authorization | Bearer `<user_token>`                             |
| Body                 | `{"status": "confirmed"}`                         |

## Test steps

1. Gửi `POST http://localhost:3000/api/login` với body `{"email": "test@eshop.com", "password": "Test1234!"}`
2. Copy giá trị `token` từ response
3. Tạo request PUT đến `http://localhost:3000/api/admin/orders/1/status`
4. Thêm header `Authorization: Bearer <user_token>`
5. Thêm body JSON: `{"status": "confirmed"}`
6. Gửi request
7. Kiểm tra HTTP response status code và response body

## Expected result

Hệ thống trả về HTTP 403 Forbidden. Response body chứa thông báo lỗi không đủ quyền truy cập (SEC-03: phải kiểm tra role, không chỉ sự tồn tại của Token).

## Actual result

Hệ thống trả về HTTP 200 OK. Response body chứa thông báo cập nhật trạng thái đơn hàng thành công. Không có kiểm tra role, chỉ cần Token hợp lệ là được truy cập tài nguyên.

## Status

FAILED
