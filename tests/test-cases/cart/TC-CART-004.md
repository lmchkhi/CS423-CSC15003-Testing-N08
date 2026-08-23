# TC-CART-004: Thêm sản phẩm hợp lệ với quantity lớn hơn 1

## Requirement ID
FR-07

## Module / Test type / Technique
CART / Functional / Equivalence Partitioning

## Preconditions
- Backend khả dụng và userToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `2` |
| name | `Sản phẩm B` |
| price | `250000` |
| quantity | `2` |

## Test steps
1. Gửi POST /api/cart với header và body đã nêu.
2. Đối chiếu HTTP response với oracle.

## Expected result
- HTTP status: `200 hoặc 201`
- Content-Type: `application/json`

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-CART-004`
- Coverage: `domain-partition`
