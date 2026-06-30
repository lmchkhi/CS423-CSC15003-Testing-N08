# TC-FR14-DT-015: Admin xóa danh mục không tồn tại hoặc đã bị xóa (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Role/session | Auth state | Admin hợp lệ |
| Category id | Route parameter | Invalid: id không tồn tại hoặc đã bị xóa trước đó |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Admin `admin@eshop.com` đăng nhập thành công.
- Xác định một id không tồn tại, ví dụ `999999`, hoặc dùng lại id của danh mục vừa xóa.

## Test data

| Field | Value |
| --- | --- |
| Category id | `999999` hoặc `<deleted_category_id>` |
| Endpoint | `DELETE /api/categories/<category_id>` |

## Test steps
1. Gọi `DELETE /api/categories/999999` bằng admin token.
2. Nếu dùng case xóa lặp, xóa một danh mục test hợp lệ rồi gọi lại `DELETE` cùng id lần thứ hai.
3. Gọi `GET /api/categories` để kiểm tra danh sách còn nhất quán.

## Expected result
API từ chối thao tác vì category id không tồn tại hoặc đã bị xóa; hệ thống không báo xóa thành công giả và danh sách danh mục không bị ảnh hưởng ngoài thao tác xóa hợp lệ ban đầu.

## Status / Related bugs
Failed / BUG-FR14-003
