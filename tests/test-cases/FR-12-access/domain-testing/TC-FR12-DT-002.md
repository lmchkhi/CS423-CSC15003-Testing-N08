<!-- tests/test-cases/FR-12-access/domain-testing/TC-FR12-DT-002.md -->

# TC-FR12-DT-002: Truy cập API danh sách người dùng — Token không hợp lệ (Domain Testing)

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
| API Endpoint | Fixed       | GET /api/admin/users                                                                                                      |

### Domain Matrix

| TC     | Token                | Role | API Endpoint           | Expected                                 |
| ------ | -------------------- | ---- | ---------------------- | ---------------------------------------- |
| DT-002 | invalid_token_xyz123 | N/A  | GET `/api/admin/users` | ❌ 401 Unauthorized — token không hợp lệ |

## Preconditions

- Hệ thống EShop đang hoạt động

## Test data

| Field                | Value                                   |
| -------------------- | --------------------------------------- |
| URL                  | `http://localhost:3000/api/admin/users` |
| Method               | GET                                     |
| Header Authorization | `Bearer invalid_token_xyz123`           |

## Test steps

1. Mở công cụ API testing (Postman hoặc cURL)
2. Tạo request GET đến `http://localhost:3000/api/admin/users`
3. Thêm header `Authorization: Bearer invalid_token_xyz123`
4. Gửi request
5. Kiểm tra HTTP response status code và response body

## Expected result

Hệ thống trả về HTTP 401 Unauthorized. Response body chứa thông báo lỗi yêu cầu xác thực. Không được truy cập tài nguyên.

## Actual result

Hệ thống trả về HTTP 403 Forbidden. Response body chứa thông báo lỗi token không hợp lệ. Không được truy cập tài nguyên.

## Status

FAILED
