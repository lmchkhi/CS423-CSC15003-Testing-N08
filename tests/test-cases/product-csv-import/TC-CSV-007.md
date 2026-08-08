# TC-CSV-007: Rollback khi name chỉ chứa khoảng trắng

## Requirement ID

FR-16

## Module / Test type / Technique

Import sản phẩm CSV / Negative validation / Boundary Value Analysis

## Preconditions

- Admin đã được xác thực.
- CSV gồm một dòng hợp lệ và một dòng có name chỉ là khoảng trắng.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/product-csv-import.json` |
| Case key | `TC-CSV-007` |

## Test steps

1. Tải lên file blank-name.csv.
2. Bấm Import.
3. Kiểm tra báo cáo và dữ liệu sau import.

## Expected result

Name trắng được coi là rỗng; toàn bộ import rollback với lý do rõ ràng.

## Status / Related bugs

Fail / BUG-CSV-003 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/32
