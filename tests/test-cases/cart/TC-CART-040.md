# TC-CART-040: Payload HTML trong name không được thực thi tại API

## Requirement ID
FR-07, SEC-04

## Module / Test type / Technique
CART / Security / Stored XSS Probe

## Preconditions
- Backend khả dụng và userToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `34` |
| name | `<img src=x onerror=alert(1)>` |
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
- Data row: `TC-CART-040`
- Coverage: `security`, `domain-partition`
