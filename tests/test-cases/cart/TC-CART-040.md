# TC-CART-040: Chuỗi HTML trong name được lưu như dữ liệu ở API boundary

## Requirement ID
FR-07

## Module / Test type / Technique
CART / Functional / Robustness / Data Preservation

## Preconditions
- userToken hợp lệ đã được cấu hình.
- Product id 990040 chưa được dùng trong suite.

## Test data
| Trường | Giá trị |
|---|---|
| id | `990040` |
| name | `<img src=x onerror=alert(1)>` |
| price | `100000` |
| quantity | `1` |

## Test steps
1. Thêm item có chuỗi HTML trong name.
2. Đọc lại giỏ và xác nhận API giữ chuỗi dưới dạng dữ liệu.
3. Không dùng kết quả API để kết luận hành vi escape tại UI.
4. Gửi request chính với product ID riêng.

## Expected result
- HTTP status: `200 hoặc 201`
- Content-Type: `application/json`

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-CART-040`
- Coverage: `domain-partition`, `schema-validation`
