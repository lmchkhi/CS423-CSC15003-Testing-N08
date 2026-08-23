# TC-CART-039: Payload SQL injection trong name không gây lỗi server

## Requirement ID
FR-07, SEC-05

## Module / Test type / Technique
CART / Security / Injection

## Preconditions
- Backend khả dụng và userToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `33` |
| name | `x'); DROP TABLE products; --` |
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
- Data row: `TC-CART-039`
- Coverage: `security`, `domain-partition`
