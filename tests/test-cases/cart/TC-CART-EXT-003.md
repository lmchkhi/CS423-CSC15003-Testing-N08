# TC-CART-EXT-003: Concurrent add cùng product không làm mất cập nhật

## Requirement ID
FR-07

## Module / Test type / Technique
CART / State / Concurrency / Race Condition

## Preconditions
- userToken hợp lệ đã được cấu hình.
- Product id 991020 chưa được dùng.

## Test data
| Trường | Giá trị |
|---|---|
| id | `991020` |
| quantities | `[1,2]` |
| expectedQuantity | `3` |

## Test steps
1. Gửi đồng thời hai request thêm cùng id với quantity 1 và 2.
2. GET /api/cart và xác nhận một dòng có quantity bằng 3.
3. Gửi request chính với product ID riêng.

## Expected result
- HTTP status: `200 hoặc 201`
- Content-Type: `application/json`

## Status / Related bugs
Failed / #151

## Automation mapping
- Data row: `TC-CART-EXT-003`
- Coverage: `state-transition`, `schema-validation`
