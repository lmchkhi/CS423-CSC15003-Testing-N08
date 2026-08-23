# TC-CART-036: Từ chối JWT không hợp lệ

## Requirement ID
SEC-02

## Module / Test type / Technique
CART / Security / Negative Authentication

## Preconditions
- Backend khả dụng và userToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `30` |
| name | `Invalid token` |
| price | `100000` |
| quantity | `1` |

## Test steps
1. Gửi POST /api/cart với header và body đã nêu.
2. Đối chiếu HTTP response với oracle.

## Expected result
- HTTP status: `401 hoặc 403`
- Content-Type: `application/json`
- Response schema: `{"type":"object","required":["error"],"properties":{"error":{"type":"string"}}}`

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-CART-036`
- Coverage: `security`, `schema-validation`
