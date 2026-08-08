# TC-CSV-005: Chấp nhận đúng header bắt buộc

## Requirement ID

FR-16

## Module / Test type / Technique

Import sản phẩm CSV / Functional positive / Decision Table

## Preconditions

- Admin đã được xác thực.
- Header là `name,price,description,imageUrl,category_id`.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/product-csv-import.json` |
| Case key | `TC-CSV-005` |

## Test steps

1. Tải lên file có đúng header bắt buộc và một dòng hợp lệ.
2. Bấm Import.
3. Kiểm tra báo cáo và sản phẩm mới.

## Expected result

File được chấp nhận, báo cáo 1/1 và sản phẩm được lưu.

## Status / Related bugs

Pass / None
