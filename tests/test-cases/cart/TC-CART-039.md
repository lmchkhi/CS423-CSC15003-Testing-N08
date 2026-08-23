# TC-CART-039: Chuỗi ký tự đặc biệt trong name được xử lý như dữ liệu

## Requirement ID
FR-07

## Module / Test type / Technique
CART / Functional / Robustness / Special-character Partition

## Preconditions
- userToken hợp lệ đã được cấu hình.
- Product id 990039 chưa được dùng trong suite.

## Test data
| Trường | Giá trị |
|---|---|
| id | `990039` |
| name | `x); DROP TABLE products; --` |
| price | `100000` |
| quantity | `1` |

## Test steps
1. Thêm item có chuỗi ký tự đặc biệt trong name.
2. Đọc lại giỏ và xác nhận chuỗi được giữ như dữ liệu.
3. Gửi request chính với product ID riêng.

## Expected result
- HTTP status: `200 hoặc 201`
- Content-Type: `application/json`

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-CART-039`
- Coverage: `domain-partition`, `schema-validation`
