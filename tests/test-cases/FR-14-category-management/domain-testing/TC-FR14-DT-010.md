# TC-FR14-DT-010: Admin cập nhật tên danh mục tồn tại (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Assumptions
- SRS FR-14 đặt tên feature là Category CRUD nhưng bullet chi tiết chỉ nêu Thêm / Xem / Xóa; `api_specification.md` công khai endpoint `PUT /api/categories/:id`, nên test này kiểm tra phần Update ở mức API/Admin.

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Role/session | Auth state | Admin hợp lệ |
| Category id | Route parameter | Id danh mục tồn tại |
| Category name | String | Tên mới hợp lệ, khác rỗng |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Admin `admin@eshop.com` đăng nhập thành công.
- Có một danh mục test tồn tại, ví dụ `FR14 Update Source`.

## Test data

| Field | Value |
| --- | --- |
| Existing category | `FR14 Update Source` |
| Updated name | `FR14 Updated Category` |
| Endpoint | `PUT /api/categories/<category_id>` |

## Test steps
1. Tạo hoặc chọn danh mục test `FR14 Update Source`.
2. Gửi cập nhật tên thành `FR14 Updated Category` bằng UI Admin hoặc `PUT /api/categories/<category_id>`.
3. Làm mới danh sách hoặc gọi `GET /api/categories`.

## Expected result
Hệ thống cập nhật đúng danh mục được chọn; tên cũ được thay bằng `FR14 Updated Category` và các danh mục khác không bị thay đổi.

## Status / Related bugs
Passed / None
