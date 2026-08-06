# TC-FR14-DT-016: User thường không được xóa danh mục qua API (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Role/session | Auth state | JWT hợp lệ nhưng `role = 'user'` |
| Category id | Route parameter | Id danh mục tồn tại để cô lập lỗi ở role |

## Preconditions
- Hệ thống EShop đang hoạt động.
- User `test@eshop.com` đăng nhập thành công và có token user thường.
- Có danh mục test tồn tại, ví dụ `FR14 User Delete Target`.

## Test data

| Field | Value |
| --- | --- |
| Token role | `user` |
| Category name | `FR14 User Delete Target` |
| Endpoint | `DELETE /api/categories/<category_id>` |

## Test steps
1. Đăng nhập API bằng `test@eshop.com` để lấy user token.
2. Gọi `DELETE /api/categories/<category_id>` với user token.
3. Gọi `GET /api/categories` để kiểm tra danh mục mục tiêu.

## Expected result
API từ chối vì token không có `role = 'admin'`; danh mục mục tiêu vẫn tồn tại sau request.

## Status / Related bugs
Failed / BUG-FR14-001
