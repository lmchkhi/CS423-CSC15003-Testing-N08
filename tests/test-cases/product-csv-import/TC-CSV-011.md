# TC-CSV-011: Rollback khi thiếu price

## Requirement ID

FR-16

## Module / Test type / Technique

Import sản phẩm CSV / Negative validation / Decision Table

## Preconditions

- Admin đã được xác thực.
- CSV gồm một dòng hợp lệ và một dòng để trống price.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/product-csv-import.json` |
| Case key | `TC-CSV-011` |

## Test steps

1. Tải lên file missing-price.csv.
2. Bấm Import.
3. Kiểm tra báo cáo và dữ liệu qua API.

## Expected result

Thiếu price bị báo lỗi; toàn bộ import rollback.

## Status / Related bugs

Fail / BUG-CSV-003 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/32
