# TC-CART-026: quantity bằng null

## Requirement ID
FR-06, FR-07

## Module / Test type / Technique
CART / Contract / Negative Testing / Equivalence Partitioning

## Preconditions
- Backend khả dụng và userToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `22` |
| name | `Null quantity` |
| price | `100000` |
| quantity | null |

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
- Data row: `TC-CART-026`
- Coverage: `domain-partition`, `schema-validation`
