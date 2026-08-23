# TC-CART-EXT-002: Thêm lại cùng id không được làm sai dữ liệu sản phẩm

## Requirement ID
FR-07

## Module / Test type / Technique
CART / State / State Transition / Data Integrity

## Preconditions
- userToken hợp lệ đã được cấu hình.
- Product id 991010 chưa được dùng.

## Test data
| Trường | Giá trị |
|---|---|
| id | `991010` |
| firstQuantity | `1` |
| secondQuantity | `2` |

## Test steps
1. Thêm product với dữ liệu chuẩn.
2. Thêm lại cùng id nhưng name và price khác.
3. GET /api/cart và xác nhận một dòng, quantity bằng 3, name và price ban đầu không đổi.
4. Gửi request chính với product ID riêng.

## Expected result
- HTTP status: `200 hoặc 201`
- Content-Type: `application/json`

## Status / Related bugs
Failed / #151

## Automation mapping
- Data row: `TC-CART-EXT-002`
- Coverage: `state-transition`, `schema-validation`
