# TC-FR14-DT-012: Admin cập nhật danh mục không tồn tại (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Assumptions
- Update được kiểm tra theo endpoint `PUT /api/categories/:id` trong `api_specification.md`.

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Role/session | Auth state | Admin hợp lệ |
| Category id | Route parameter | Invalid: id không tồn tại |
| Category name | String | Nominal valid để cô lập lỗi ở id |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Admin `admin@eshop.com` đăng nhập thành công.
- Xác định một id không tồn tại, ví dụ `999999`.

## Test data

| Field | Value |
| --- | --- |
| Category id | `999999` |
| Updated name | `FR14 Missing Category` |
| Endpoint | `PUT /api/categories/999999` |

## Test steps
1. Gọi `PUT /api/categories/999999` bằng admin token.
2. Gửi body `{"name":"FR14 Missing Category"}`.
3. Gọi `GET /api/categories` để kiểm tra danh sách.

## Expected result
API từ chối cập nhật vì category id không tồn tại; không tạo mới category ngầm và không thay đổi các danh mục hiện có.

## Status / Related bugs
Failed / BUG-FR14-003
