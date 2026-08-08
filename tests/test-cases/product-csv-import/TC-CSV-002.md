# TC-CSV-002: Import nhiều sản phẩm hợp lệ

## Requirement ID

FR-16

## Module / Test type / Technique

Import sản phẩm CSV / Functional positive / Equivalence Partitioning

## Preconditions

- Backend và Web Admin đang chạy; Admin đã được xác thực.
- Hai tên sản phẩm duy nhất chưa tồn tại.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/product-csv-import.json` |
| Case key | `TC-CSV-002` |

## Test steps

1. Tải lên CSV có hai dòng hợp lệ.
2. Bấm Import 2 sản phẩm.
3. Kiểm tra báo cáo, UI và API danh sách sản phẩm.

## Expected result

Báo cáo 2/2 thành công và cả hai sản phẩm được lưu đúng một lần.

## Status / Related bugs

Pass / None
