# TC-CART-037: Từ chối Bearer token rỗng

## Requirement ID
SEC-02

## Module / Test type / Technique
CART / Security / Malformed Authentication

## Preconditions
- Backend khả dụng và userToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `31` |
| name | `Empty token` |
| price | `100000` |
| quantity | `1` |

## Test steps
1. Gửi POST /api/cart với header và body đã nêu.
2. Đối chiếu HTTP response với oracle.

## Expected result
- HTTP status: `401 hoặc 403`
- Content-Type: `application/json`

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-CART-037`
- Coverage: `security`
