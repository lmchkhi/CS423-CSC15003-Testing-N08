# TC-CSV-009: Rollback khi price là số âm

## Requirement ID

FR-16

## Module / Test type / Technique

Import sản phẩm CSV / Negative validation / Boundary Value Analysis

## Preconditions

- Admin đã được xác thực.
- CSV chứa price ngay dưới biên hợp lệ: -1.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/product-csv-import.json` |
| Case key | `TC-CSV-009` |

## Test steps

1. Tải lên file negative-price.csv.
2. Bấm Import.
3. Kiểm tra lý do lỗi và dữ liệu sau import.

## Expected result

Price âm bị từ chối và toàn bộ import được rollback.

## Status / Related bugs

Fail / BUG-CSV-003 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/32
