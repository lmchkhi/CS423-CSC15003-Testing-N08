# TC-CSV-003: Giữ nguyên trường có dấu phẩy theo RFC 4180

## Requirement ID

FR-16

## Module / Test type / Technique

Import sản phẩm CSV / Compatibility / Syntax-based Testing

## Preconditions

- Backend và Web Admin đang chạy; Admin đã được xác thực.
- File dùng dấu nháy kép bao quanh description có dấu phẩy.

## Test data

| Dataset | Value |
|---|---|
| Data source | `tests/data/product-csv-import.json` |
| Case key | `TC-CSV-003` |

## Test steps

1. Tải lên file quoted-comma.csv.
2. Bấm Import và ghi nhận payload gửi tới API.
3. Kiểm tra description và kết quả import.

## Expected result

Description được giữ nguyên là `Mỏng, nhẹ và bền`; sản phẩm được import thành công.

## Status / Related bugs

Fail / BUG-CSV-001 / https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/31
