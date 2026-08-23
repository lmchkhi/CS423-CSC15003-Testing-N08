# TC-CART-002: Thêm lại cùng sản phẩm phải cộng số lượng

## Requirement ID
FR-07

## Module / Test type / Technique
CART / State / State Transition

## Preconditions
- Giỏ user có đúng một dòng id 990001 từ TC-CART-001.
- userToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `990004` |
| name | `Sản phẩm sau kiểm tra` |
| price | `120000` |
| quantity | `1` |

## Test steps
1. Thêm id 990003 với quantity 1.
2. Thêm lại id 990003 với quantity 2.
3. GET /api/cart và xác nhận chỉ có một dòng id 990003 với quantity 3.
4. Gửi request chính để hoàn tất iteration.

## Expected result
- HTTP status: `200 hoặc 201`
- Content-Type: `application/json`

## Status / Related bugs
Failed / #151

## Automation mapping
- Data row: `TC-CART-002`
- Coverage: `state-transition`, `schema-validation`
