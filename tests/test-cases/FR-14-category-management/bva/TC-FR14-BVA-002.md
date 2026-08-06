# TC-FR14-BVA-002: Tên danh mục dài 1 ký tự (ON - min length) (Boundary Value Analysis)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Boundary Value Analysis (BVA)

## Assumptions
- SRS/API không nêu max length cho tên danh mục; min length 1 được suy ra từ rule tên bắt buộc, sau khi loại trừ chuỗi rỗng.

## Boundary Analysis

| Variable | Constraint | Boundary Type | BVA Points |
| --- | --- | --- | --- |
| category.name.length | Tên danh mục bắt buộc, min = 1 ký tự | Minimum length | 0 (OFF-), 1 (ON), 2 (ON+) |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Admin `admin@eshop.com` đăng nhập thành công.
- Chưa có danh mục test trùng tên `A` hoặc đã xóa trước khi chạy.

## Test data

| Field | Value |
| --- | --- |
| Category name | `A` |
| Endpoint | `POST /api/categories` |

## Test steps
1. Mở màn hình quản lý danh mục bằng tài khoản admin.
2. Nhập tên danh mục `A`.
3. Bấm nút thêm/lưu danh mục.
4. Làm mới danh sách hoặc gọi `GET /api/categories`.

## Expected result
Hệ thống chấp nhận điểm ON của min length; danh mục `A` được tạo và hiển thị trong danh sách.

## Status / Related bugs
Passed / None
