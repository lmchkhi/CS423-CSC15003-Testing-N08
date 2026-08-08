# TC-CSV-010: Rollback khi price không phải số

## Requirement ID

FR-16

## Module / Test type / Technique

Import sản phẩm CSV / Negative type validation / Equivalence Partitioning

## Preconditions

- Admin đã được xác thực.
- Một dòng có price là chuỗi `abc`.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/product-csv-import.json` |
| Case key | `TC-CSV-010` |

## Test steps

1. Tải lên file nonnumeric-price.csv.
2. Bấm Import.
3. Kiểm tra báo cáo lỗi và API sản phẩm.

## Expected result

Price không phải số bị từ chối và không dòng nào trong file được lưu.

## Status / Related bugs

Fail / BUG-CSV-003 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/32
