# TC-CART-038: Admin đã xác thực có giỏ hàng riêng

## Requirement ID
FR-07, SEC-02

## Module / Test type / Technique
CART / Functional / Equivalence Partitioning

## Preconditions
- Backend khả dụng và userToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `32` |
| name | `Admin cart item` |
| price | `100000` |
| quantity | `1` |

## Test steps
1. Gửi POST /api/cart với header và body đã nêu.
2. Đối chiếu HTTP response với oracle.

## Expected result
- HTTP status: `200 hoặc 201`
- Content-Type: `application/json`

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-CART-038`
- Coverage: `domain-partition`, `security`
