# TC-FR14-BVA-006: Danh sách có nhiều danh mục (representative above min count) (Boundary Value Analysis)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Boundary Value Analysis (BVA)

## Assumptions
- SRS/API không nêu max số lượng danh mục hoặc pagination; dùng trạng thái nhiều danh mục làm representative above min.

## Boundary Analysis

| Variable | Constraint | Boundary Type | BVA Points |
| --- | --- | --- | --- |
| category list count | Số lượng danh mục có thể là 0 hoặc nhiều hơn | Minimum count | 0 (ON), 1 (ON+), nhiều danh mục (representative above min) |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Admin `admin@eshop.com` đăng nhập thành công.
- Môi trường test có ít nhất 3 danh mục, ví dụ `FR14 Cat A`, `FR14 Cat B`, `FR14 Cat C`.

## Test data

| Field | Value |
| --- | --- |
| Category count | >= 3 |
| Category names | `FR14 Cat A`, `FR14 Cat B`, `FR14 Cat C` |

## Test steps
1. Chuẩn bị ít nhất 3 danh mục trong hệ thống.
2. Đăng nhập Web Admin bằng admin.
3. Mở màn hình quản lý danh mục.
4. Gọi `GET /api/categories` để đối chiếu nếu cần.

## Expected result
Hệ thống hiển thị được nhiều danh mục trong cùng danh sách, không mất/gộp sai bản ghi và không lỗi khi render nhiều item.

## Status / Related bugs
Passed / None
