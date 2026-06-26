<!-- tests/test-cases/FR-12-access/domain-testing/TC-FR12-DT-030.md -->

# TC-FR12-DT-030: Xóa sản phẩm — Token user thường (Domain Testing)

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
| API Endpoint | Fixed       | DELETE /api/products/1                                                                                                    |

### Domain Matrix

| TC     | Token                   | Role | API Endpoint             | Expected         |
| ------ | ----------------------- | ---- | ------------------------ | ---------------- |
| DT-030 | Hợp lệ (test@eshop.com) | user | DELETE `/api/products/1` | ❌ 403 Forbidden |

## Preconditions

- Hệ thống EShop đang hoạt động
- Tài khoản user thường `test@eshop.com` / `Test1234!` đã tồn tại

## Test data

| Field                | Value                                  |
| -------------------- | -------------------------------------- |
| URL                  | `http://localhost:3000/api/products/1` |
| Method               | DELETE                                 |
| Header Authorization | `Bearer <user_token>`                  |

## Test steps

1. Gửi `POST http://localhost:3000/api/login` với body `{"email": "test@eshop.com", "password": "Test1234!"}`
2. Copy giá trị `token` từ response
3. Tạo request DELETE đến `http://localhost:3000/api/products/1`
4. Thêm header `Authorization: Bearer <user_token>`
5. Gửi request
6. Kiểm tra HTTP response status code và response body

## Expected result

Hệ thống trả về HTTP 403 Forbidden. Response body chứa thông báo lỗi không đủ quyền truy cập (SEC-03: phải kiểm tra role, không chỉ sự tồn tại của Token).

## Actual result

hệ thống trả về HTTP 200 OK. Response thông báo thành công, sản phẩm được xóa khỏi cơ sở dữ liệu. Không kiểm tra role, chỉ kiểm tra sự tồn tại của Token.

## Status

FAILED
