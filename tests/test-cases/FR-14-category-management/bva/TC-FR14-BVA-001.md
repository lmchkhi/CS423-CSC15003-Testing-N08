# TC-FR14-BVA-001: Tên danh mục dài 0 ký tự (OFF- - min length) (Boundary Value Analysis)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Boundary Value Analysis (BVA)

## Assumptions
- SRS/API không nêu max length cho tên danh mục; chỉ có boundary có căn cứ là tên bắt buộc, tương đương min length 1 sau khi trim.

## Boundary Analysis

| Variable | Constraint | Boundary Type | BVA Points |
| --- | --- | --- | --- |
| category.name.length | Tên danh mục bắt buộc, min = 1 ký tự | Minimum length | 0 (OFF-), 1 (ON), 2 (ON+) |

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
4. Nếu kiểm tra API, gửi `{"name":""}` bằng admin token.

## Expected result
Hệ thống từ chối điểm OFF- vì tên danh mục có độ dài 0; không tạo danh mục rỗng.

## Status / Related bugs
Failed / BUG-FR14-002
