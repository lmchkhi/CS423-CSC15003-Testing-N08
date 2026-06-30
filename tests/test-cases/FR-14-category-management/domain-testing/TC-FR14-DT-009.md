# TC-FR14-DT-009: Admin thêm danh mục với tên Unicode tiếng Việt (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Role/session | Auth state | Admin hợp lệ |
| Category name | String | Special valid domain: Unicode tiếng Việt có dấu |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Admin `admin@eshop.com` đăng nhập thành công.
- Chưa có danh mục test trùng tên `Đồ gia dụng FR14`.

## Test data

| Field | Value |
| --- | --- |
| Category name | `Đồ gia dụng FR14` |
| Endpoint | `POST /api/categories` |

## Test steps
1. Mở màn hình quản lý danh mục bằng tài khoản admin.
2. Nhập tên danh mục `Đồ gia dụng FR14`.
3. Bấm nút thêm/lưu danh mục.
4. Làm mới danh sách hoặc gọi `GET /api/categories`.

## Expected result
Hệ thống tạo danh mục thành công và hiển thị đúng tên `Đồ gia dụng FR14`, không mất dấu hoặc lỗi encoding.

## Status / Related bugs
Passed / None
