# TC-CART-029: quantity là số thập phân

## Requirement ID
FR-06, FR-07

## Module / Test type / Technique
CART / Contract / Boundary Value Analysis

## Preconditions
- Backend khả dụng và userToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `25` |
| name | `Decimal quantity` |
| price | `100000` |
| quantity | `1.5` |

## Test steps
1. Gửi POST /api/cart với header và body đã nêu.
2. Đối chiếu HTTP response với oracle.

## Expected result
- HTTP status: `400 hoặc 422`
- Content-Type: `application/json`
- `message` không được xuất hiện

## Status / Related bugs
Failed / #285

## Automation mapping
- Data row: `TC-CART-029`
- Coverage: `domain-partition`, `schema-validation`
