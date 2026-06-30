# TC-FR14-DT-004: Guest không được thêm danh mục qua API (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Authorization header | Auth state | Thiếu `Authorization: Bearer <token>` |
| Category name | String | Nominal valid để cô lập lỗi ở quyền truy cập |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Không gửi token trong request API.

## Test data

| Field | Value |
| --- | --- |
| Endpoint | `POST /api/categories` |
| Body | `{"name":"FR14 Guest Create"}` |
| Authorization | None |

## Test steps
1. Gọi `POST /api/categories` không kèm header Authorization.
2. Gửi body có tên danh mục hợp lệ: `FR14 Guest Create`.
3. Gọi lại `GET /api/categories` để kiểm tra danh mục có được tạo không.

## Expected result
API từ chối request thiếu token bằng lỗi xác thực/phân quyền phù hợp; danh mục `FR14 Guest Create` không được tạo.

## Status / Related bugs
Passed / None
