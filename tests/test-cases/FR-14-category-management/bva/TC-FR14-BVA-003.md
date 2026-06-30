# TC-FR14-BVA-003: Tên danh mục dài 2 ký tự (ON+ - min length) (Boundary Value Analysis)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Boundary Value Analysis (BVA)

## Assumptions
- SRS/API không nêu max length cho tên danh mục; điểm 2 ký tự được dùng là giá trị ngay sau min boundary.

## Boundary Analysis

| Variable | Constraint | Boundary Type | BVA Points |
| --- | --- | --- | --- |
| category.name.length | Tên danh mục bắt buộc, min = 1 ký tự | Minimum length | 0 (OFF-), 1 (ON), 2 (ON+) |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Admin `admin@eshop.com` đăng nhập thành công.
- Chưa có danh mục test trùng tên `AB` hoặc đã xóa trước khi chạy.

## Test data

| Field | Value |
| --- | --- |
| Category name | `AB` |
| Endpoint | `POST /api/categories` |

## Test steps
1. Mở màn hình quản lý danh mục bằng tài khoản admin.
2. Nhập tên danh mục `AB`.
3. Bấm nút thêm/lưu danh mục.
4. Làm mới danh sách hoặc gọi `GET /api/categories`.

## Expected result
Hệ thống chấp nhận điểm ON+ của min length; danh mục `AB` được tạo và hiển thị trong danh sách.

## Status / Related bugs
Passed / None
