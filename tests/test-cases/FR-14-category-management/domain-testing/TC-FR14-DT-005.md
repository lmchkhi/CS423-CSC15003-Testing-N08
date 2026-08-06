# TC-FR14-DT-005: User thường không được thêm danh mục qua API (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Role/session | Auth state | JWT hợp lệ nhưng `role = 'user'` |
| Category name | String | Nominal valid để cô lập lỗi ở role |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `test@eshop.com` đăng nhập thành công và có token user thường.

## Test data

| Field | Value |
| --- | --- |
| Endpoint | `POST /api/categories` |
| Body | `{"name":"FR14 User Create"}` |
| Token role | `user` |

## Test steps
1. Đăng nhập API bằng `test@eshop.com` để lấy user token.
2. Gọi `POST /api/categories` với user token.
3. Gửi body có tên danh mục hợp lệ: `FR14 User Create`.
4. Gọi `GET /api/categories` để kiểm tra danh mục có được tạo không.

## Expected result
API từ chối vì token không có `role = 'admin'`; danh mục `FR14 User Create` không được tạo.

## Status / Related bugs
Failed / BUG-FR14-001
