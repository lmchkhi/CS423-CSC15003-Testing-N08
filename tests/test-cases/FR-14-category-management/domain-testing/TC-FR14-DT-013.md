# TC-FR14-DT-013: User thường không được cập nhật danh mục qua API (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Role/session | Auth state | JWT hợp lệ nhưng `role = 'user'` |
| Category id | Route parameter | Id danh mục tồn tại |
| Category name | String | Nominal valid để cô lập lỗi ở role |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `test@eshop.com` đăng nhập thành công và có token user thường.
- Có một danh mục tồn tại để thử cập nhật.

## Test data

| Field | Value |
| --- | --- |
| Token role | `user` |
| Updated name | `FR14 User Updated` |
| Endpoint | `PUT /api/categories/<category_id>` |

## Test steps
1. Đăng nhập API bằng `test@eshop.com` để lấy user token.
2. Gọi `PUT /api/categories/<category_id>` với user token.
3. Gửi body `{"name":"FR14 User Updated"}`.
4. Gọi `GET /api/categories` để đối chiếu tên danh mục.

## Expected result
API từ chối vì token không có `role = 'admin'`; danh mục mục tiêu không bị cập nhật.

## Status / Related bugs
Failed / BUG-FR14-001
