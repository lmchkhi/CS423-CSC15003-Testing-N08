# TC-FR14-DT-007: Admin thêm danh mục với tên rỗng (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Role/session | Auth state | Admin hợp lệ |
| Category name | String | Invalid: rỗng, vi phạm rule tên danh mục bắt buộc |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Admin `admin@eshop.com` đăng nhập thành công.

## Test data

| Field | Value |
| --- | --- |
| Category name | Empty string |
| Endpoint | `POST /api/categories` |

## Test steps
1. Mở màn hình quản lý danh mục bằng tài khoản admin.
2. Để trống ô tên danh mục.
3. Bấm nút thêm/lưu danh mục.
4. Nếu kiểm tra API, gửi body `{"name":""}` bằng admin token.

## Expected result
Hệ thống từ chối tạo danh mục, hiển thị thông báo tên danh mục là bắt buộc và không thêm record rỗng vào danh sách.

## Status / Related bugs
Failed / BUG-FR14-002
