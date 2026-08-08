# TC-CSV-006: Rollback khi một dòng thiếu name

## Requirement ID

FR-16

## Module / Test type / Technique

Import sản phẩm CSV / Negative atomicity / Decision Table

## Preconditions

- Admin đã được xác thực.
- CSV gồm một dòng hợp lệ và một dòng thiếu name.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/product-csv-import.json` |
| Case key | `TC-CSV-006` |

## Test steps

1. Tải lên file missing-name.csv.
2. Bấm Import.
3. Kiểm tra lý do lỗi, số dòng và dữ liệu sản phẩm qua API.

## Expected result

Import báo lỗi name, 0 dòng thành công, 1 dòng lỗi và không dòng nào được lưu.

## Status / Related bugs

Fail / BUG-CSV-003 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/32
