# TC-FR14-BVA-005: Danh sách có đúng 1 danh mục (ON+ - min count) (Boundary Value Analysis)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Boundary Value Analysis (BVA)

## Assumptions
- SRS/API không nêu max số lượng danh mục; điểm 1 danh mục được dùng là trạng thái ngay sau minimum count 0.

## Boundary Analysis

| Variable | Constraint | Boundary Type | BVA Points |
| --- | --- | --- | --- |
| category list count | Số lượng danh mục có thể là 0 hoặc nhiều hơn | Minimum count | 0 (ON), 1 (ON+), nhiều danh mục (representative above min) |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Admin `admin@eshop.com` đăng nhập thành công.
- Môi trường test đang có đúng 1 danh mục, ví dụ `FR14 Single Category`.

## Test data

| Field | Value |
| --- | --- |
| Category count | 1 |
| Category name | `FR14 Single Category` |

## Test steps
1. Chuẩn bị môi trường test có đúng 1 danh mục.
2. Đăng nhập Web Admin bằng admin.
3. Mở màn hình quản lý danh mục.
4. Gọi `GET /api/categories` để đối chiếu nếu cần.

## Expected result
Hệ thống hiển thị đúng một danh mục, không hiển thị empty state, không nhân bản hoặc làm mất dòng danh mục.

## Status / Related bugs
Passed / None
