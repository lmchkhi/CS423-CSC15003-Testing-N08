# TC-FR14-DT-011: Admin cập nhật danh mục với tên rỗng (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Assumptions
- Update được kiểm tra theo endpoint `PUT /api/categories/:id` trong `api_specification.md`; rule tên danh mục bắt buộc vẫn áp dụng khi sửa.

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Role/session | Auth state | Admin hợp lệ |
| Category id | Route parameter | Id danh mục tồn tại |
| Category name | String | Invalid: rỗng |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Admin `admin@eshop.com` đăng nhập thành công.
- Có danh mục test tồn tại, ví dụ `FR14 Cannot Empty`.

## Test data

| Field | Value |
| --- | --- |
| Existing category | `FR14 Cannot Empty` |
| Updated name | Empty string |
| Endpoint | `PUT /api/categories/<category_id>` |

## Test steps
1. Tạo hoặc chọn danh mục test `FR14 Cannot Empty`.
2. Thử cập nhật tên danh mục thành rỗng bằng UI Admin hoặc API.
3. Làm mới danh sách danh mục.

## Expected result
Hệ thống từ chối cập nhật vì tên danh mục là bắt buộc; tên cũ của danh mục vẫn được giữ nguyên.

## Status / Related bugs
Failed / BUG-FR14-002
