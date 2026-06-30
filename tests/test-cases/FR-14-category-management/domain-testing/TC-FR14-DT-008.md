# TC-FR14-DT-008: Admin thêm danh mục với tên chỉ gồm khoảng trắng (Domain Testing)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Domain Testing

## Domain Analysis

| Variable | Type | Domain / Constraints |
| --- | --- | --- |
| Role/session | Auth state | Admin hợp lệ |
| Category name | String | Invalid special domain: chỉ có whitespace, sau trim tương đương rỗng |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Admin `admin@eshop.com` đăng nhập thành công.

## Test data

| Field | Value |
| --- | --- |
| Category name | `"   "` |
| Endpoint | `POST /api/categories` |

## Test steps
1. Mở màn hình quản lý danh mục bằng tài khoản admin.
2. Nhập ba dấu cách vào ô tên danh mục.
3. Bấm nút thêm/lưu danh mục.
4. Nếu kiểm tra API, gửi body `{"name":"   "}` bằng admin token.

## Expected result
Hệ thống trim/validate và từ chối tên chỉ gồm khoảng trắng; không tạo danh mục có tên trống hoặc khó nhìn trong danh sách.

## Status / Related bugs
Failed / BUG-FR14-002
