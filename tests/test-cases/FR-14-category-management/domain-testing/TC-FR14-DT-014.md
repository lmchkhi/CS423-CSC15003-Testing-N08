# TC-FR14-DT-014: Admin xóa danh mục tồn tại (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Role/session | Auth state | Admin hợp lệ |
| Category id | Route parameter | Id danh mục tồn tại |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Admin `admin@eshop.com` đăng nhập thành công.
- Có danh mục test có thể xóa, ví dụ `FR14 Delete Target`.

## Test data

| Field | Value |
| --- | --- |
| Category name | `FR14 Delete Target` |
| Endpoint | `DELETE /api/categories/<category_id>` |

## Test steps
1. Tạo hoặc chọn danh mục test `FR14 Delete Target`.
2. Xóa danh mục bằng UI Admin hoặc gọi `DELETE /api/categories/<category_id>` bằng admin token.
3. Làm mới danh sách hoặc gọi `GET /api/categories`.

## Expected result
Hệ thống xóa đúng danh mục được chọn; `FR14 Delete Target` không còn xuất hiện trong danh sách danh mục.

## Status / Related bugs
Passed / None
