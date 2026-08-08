# TC-CSV-015: Báo cáo đủ số dòng thành công lỗi và lý do

## Requirement ID

FR-16

## Module / Test type / Technique

Import sản phẩm CSV / Functional reporting / Decision Table

## Preconditions

- Admin đã được xác thực.
- CSV có đúng một dòng lỗi do thiếu name.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/product-csv-import.json` |
| Case key | `TC-CSV-015` |

## Test steps

1. Tải lên error-report.csv.
2. Bấm Import.
3. Quan sát tổng số thành công, tổng số lỗi và lý do theo dòng.

## Expected result

Báo cáo hiển thị 0/1 thành công, đúng 1 dòng lỗi và lý do chỉ rõ hàng 2 thiếu tên.

## Status / Related bugs

Pass / None
