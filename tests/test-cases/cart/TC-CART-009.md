# TC-CART-009: Thiếu id

## Requirement ID
FR-07

## Module / Test type / Technique
CART / Contract / Negative Testing / Equivalence Partitioning

## Preconditions
- Backend khả dụng và userToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| name | `Thiếu id` |
| price | `100000` |
| quantity | `1` |

## Test steps
1. Gửi POST /api/cart với header và body đã nêu.
2. Đối chiếu HTTP response với oracle.

## Expected result
- HTTP status: `400 hoặc 422`
- Content-Type: `application/json`
- `message` không được xuất hiện

## Status / Related bugs
Failed / None

## Automation mapping
- Data row: `TC-CART-009`
- Coverage: `domain-partition`, `schema-validation`
