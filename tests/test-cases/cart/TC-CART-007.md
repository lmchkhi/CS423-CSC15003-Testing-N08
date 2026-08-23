# TC-CART-007: Giá trị số lớn nhưng an toàn

## Requirement ID
FR-07

## Module / Test type / Technique
CART / Functional / Equivalence Partitioning

## Preconditions
- Backend khả dụng và userToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `2147483647` |
| name | `Sản phẩm giá trị lớn` |
| price | `9007199254740` |
| quantity | `1000` |

## Test steps
1. Gửi POST /api/cart với header và body đã nêu.
2. Đối chiếu HTTP response với oracle.

## Expected result
- HTTP status: `200 hoặc 201`
- Content-Type: `application/json`

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-CART-007`
- Coverage: `domain-partition`
