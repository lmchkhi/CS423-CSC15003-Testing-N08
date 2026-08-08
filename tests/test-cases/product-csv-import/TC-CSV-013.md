# TC-CSV-013: Không import file CSV rỗng

## Requirement ID

FR-16

## Module / Test type / Technique

Import sản phẩm CSV / Negative boundary / Boundary Value Analysis

## Preconditions

- Admin đã được xác thực.
- File empty.csv có kích thước nội dung bằng 0.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/product-csv-import.json` |
| Case key | `TC-CSV-013` |

## Test steps

1. Chọn empty.csv.
2. Quan sát preview.
3. Kiểm tra trạng thái nút Import.

## Expected result

Không có dòng preview và không có nút import khả dụng.

## Status / Related bugs

Pass / None
