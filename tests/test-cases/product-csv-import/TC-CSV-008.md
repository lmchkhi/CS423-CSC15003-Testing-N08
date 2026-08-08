# TC-CSV-008: Rollback khi price bằng 0

## Requirement ID

FR-16

## Module / Test type / Technique

Import sản phẩm CSV / Negative validation / Boundary Value Analysis

## Preconditions

- Admin đã được xác thực.
- CSV chứa một dòng hợp lệ và một dòng price = 0.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/product-csv-import.json` |
| Case key | `TC-CSV-008` |

## Test steps

1. Tải lên file zero-price.csv.
2. Bấm Import.
3. Kiểm tra báo cáo và toàn bộ tên thử qua API.

## Expected result

Price 0 bị từ chối; báo cáo 0 thành công, 1 lỗi và không sản phẩm nào được lưu.

## Status / Related bugs

Fail / BUG-CSV-003 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/32
