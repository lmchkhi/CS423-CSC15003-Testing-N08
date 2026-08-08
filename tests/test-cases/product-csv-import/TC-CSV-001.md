# TC-CSV-001: Import một sản phẩm hợp lệ

## Requirement ID

FR-16

## Module / Test type / Technique

Import sản phẩm CSV / Functional positive / Equivalence Partitioning

## Preconditions

- Backend và Web Admin đang chạy; đăng nhập bằng tài khoản Admin hợp lệ.
- Sản phẩm mang tên duy nhất của lần chạy chưa tồn tại.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/product-csv-import.json` |
| Case key | `TC-CSV-001` |

## Test steps

1. Mở tab Sản phẩm và chọn file CSV hợp lệ có một dòng dữ liệu.
2. Kiểm tra preview rồi bấm nút Import.
3. Quan sát báo cáo và danh sách sản phẩm.

## Expected result

Báo cáo 1/1 sản phẩm được thêm và sản phẩm mới xuất hiện trong danh sách.

## Status / Related bugs

Pass / None
