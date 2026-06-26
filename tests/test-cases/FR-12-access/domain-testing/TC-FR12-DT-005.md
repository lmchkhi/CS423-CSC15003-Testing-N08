<!-- tests/test-cases/FR-12-access/domain-testing/TC-FR12-DT-005.md -->

# TC-FR12-DT-005: Xóa người dùng (Admin) — Không có Token (Domain Testing)

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
| API Endpoint | Fixed       | DELETE /api/admin/users/2                                                                                                 |

### Domain Matrix

| TC     | Token     | Role | API Endpoint                | Expected                               |
| ------ | --------- | ---- | --------------------------- | -------------------------------------- |
| DT-005 | Không gửi | N/A  | DELETE `/api/admin/users/2` | ❌ 401 Unauthorized — yêu cầu xác thực |

## Preconditions

- Hệ thống EShop đang hoạt động
- Tồn tại ít nhất 1 user có thể thao tác

## Test data

| Field                | Value                                     |
| -------------------- | ----------------------------------------- |
| URL                  | `http://localhost:3000/api/admin/users/2` |
| Method               | DELETE                                    |
| Header Authorization | (không gửi)                               |

## Test steps

1. Mở công cụ API testing (Postman hoặc cURL)
2. Tạo request DELETE đến `http://localhost:3000/api/admin/users/2`
3. KHÔNG thêm header `Authorization`
4. Gửi request
5. Kiểm tra HTTP response status code và response body

## Expected result

Hệ thống trả về HTTP 401 Unauthorized. Response body chứa thông báo lỗi yêu cầu xác thực. Không được truy cập tài nguyên.

## Actual result

Hệ thống trả về HTTP 401 Unauthorized. Response body chứa thông báo lỗi yêu cầu xác thực. Không được truy cập tài nguyên.

## Status

PASSED
