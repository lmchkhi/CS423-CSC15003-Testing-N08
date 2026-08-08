# TC-CSV-012: Từ chối header không đúng đặc tả

## Requirement ID

FR-16

## Module / Test type / Technique

Import sản phẩm CSV / Negative format validation / Equivalence Partitioning

## Preconditions

- Admin đã được xác thực.
- CSV có năm cột nhưng tên header đều sai.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/product-csv-import.json` |
| Case key | `TC-CSV-012` |

## Test steps

1. Tải lên file wrong-header.csv.
2. Bấm Import nếu UI cho phép.
3. Kiểm tra lý do từ chối và dữ liệu API.

## Expected result

Hệ thống từ chối file với lý do header/cột không đúng và không tạo sản phẩm.

## Status / Related bugs

Fail / BUG-CSV-004 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/25
