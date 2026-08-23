# TC-CART-041: Từ chối Content-Type text/plain

## Requirement ID
FR-07

## Module / Test type / Technique
CART / Contract / Content-Type Confusion

## Preconditions
- Backend khả dụng và userToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `35` |
| name | `Plain text` |
| price | `100000` |
| quantity | `1` |

## Test steps
1. Gửi POST /api/cart với header và body đã nêu.
2. Đối chiếu HTTP response với oracle.

## Expected result
- HTTP status: `400 hoặc 415 hoặc 422`
- Content-Type: `application/json`

## Status / Related bugs
Failed / #286

## Automation mapping
- Data row: `TC-CART-041`
- Coverage: `schema-validation`, `security`
