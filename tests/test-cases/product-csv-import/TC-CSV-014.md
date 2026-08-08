# TC-CSV-014: Không import file chỉ có header

## Requirement ID

FR-16

## Module / Test type / Technique

Import sản phẩm CSV / Negative boundary / Boundary Value Analysis

## Preconditions

- Admin đã được xác thực.
- CSV chỉ chứa đúng header, không có dòng dữ liệu.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/product-csv-import.json` |
| Case key | `TC-CSV-014` |

## Test steps

1. Chọn header-only.csv.
2. Quan sát số dòng preview.
3. Kiểm tra nút Import.

## Expected result

Không có preview dữ liệu và không thể gửi yêu cầu import.

## Status / Related bugs

Pass / None
