# TC-CART-006: Giá sản phẩm có phần thập phân dương

## Requirement ID
FR-07

## Module / Test type / Technique
CART / Functional / Equivalence Partitioning

## Preconditions
- Backend khả dụng và userToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `4` |
| name | `Sản phẩm giá lẻ` |
| price | `99999.5` |
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
- Data row: `TC-CART-006`
- Coverage: `domain-partition`
