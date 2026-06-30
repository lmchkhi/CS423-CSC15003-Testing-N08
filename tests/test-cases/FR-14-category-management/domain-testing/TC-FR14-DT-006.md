# TC-FR14-DT-006: Admin thêm danh mục với tên hợp lệ (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Role/session | Auth state | Admin có JWT hợp lệ và `role = 'admin'` |
| Category name | String | Bắt buộc, khác rỗng, đại diện lớp hợp lệ |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Admin `admin@eshop.com` đăng nhập thành công.
- Chưa có danh mục test trùng tên `FR14 Test Accessories` hoặc đã xóa trước khi chạy.

## Test data

| Field | Value |
| --- | --- |
| Category name | `FR14 Test Accessories` |
| Endpoint | `POST /api/categories` |

## Test steps
1. Đăng nhập Web Admin bằng admin.
2. Mở màn hình quản lý danh mục.
3. Nhập tên danh mục `FR14 Test Accessories`.
4. Bấm nút thêm/lưu danh mục.
5. Gọi `GET /api/categories` hoặc làm mới danh sách để đối chiếu.

## Expected result
Hệ thống tạo danh mục thành công; danh mục `FR14 Test Accessories` xuất hiện trong danh sách và có id/category record riêng.

## Status / Related bugs
Passed / None
