# TC-CSV-004: Từ chối file không có đuôi CSV

## Requirement ID

FR-16

## Module / Test type / Technique

Import sản phẩm CSV / Negative validation / Equivalence Partitioning

## Preconditions

- Web Admin đang mở tại tab Sản phẩm.
- File có nội dung CSV nhưng mang đuôi `.txt`.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/product-csv-import.json` |
| Case key | `TC-CSV-004` |

## Test steps

1. Chọn file products.txt.
2. Quan sát input, preview và nút Import.
3. Kiểm tra API không có sản phẩm từ file.

## Expected result

Hệ thống từ chối file, không preview, không cho import và không tạo sản phẩm.

## Status / Related bugs

Fail / BUG-CSV-002 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/24
