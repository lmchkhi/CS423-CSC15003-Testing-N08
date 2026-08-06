# TC-FR14-BVA-004: Danh sách có 0 danh mục (ON - min count) (Boundary Value Analysis)

## Requirement ID
FR-14

## Module / Test type / Technique
Category Management / Functional / Boundary Value Analysis (BVA)

## Assumptions
- SRS/API không nêu pagination hoặc page size cho danh mục; BVA chỉ áp dụng cho số lượng item trả về/hiển thị.
- Cần môi trường test có thể dọn dữ liệu danh mục hoặc database seed riêng để đạt trạng thái 0 danh mục.

## Boundary Analysis

| Variable | Constraint | Boundary Type | BVA Points |
| --- | --- | --- | --- |
| category list count | Số lượng danh mục có thể là 0 hoặc nhiều hơn | Minimum count | 0 (ON), 1 (ON+), nhiều danh mục (representative above min) |

## Preconditions
- Hệ thống EShop đang hoạt động.
- Admin `admin@eshop.com` đăng nhập thành công.
- Môi trường test đang có 0 danh mục.

## Test data

| Field | Value |
| --- | --- |
| Category count | 0 |
| API check | `GET /api/categories` |

## Test steps
1. Chuẩn bị môi trường test có 0 danh mục.
2. Đăng nhập Web Admin bằng admin.
3. Mở màn hình quản lý danh mục.
4. Gọi `GET /api/categories` để đối chiếu nếu cần.

## Expected result
Hệ thống xử lý đúng biên 0 danh mục: hiển thị danh sách rỗng hoặc empty state rõ ràng, không lỗi giao diện/API.

## Status / Related bugs
Passed / None
