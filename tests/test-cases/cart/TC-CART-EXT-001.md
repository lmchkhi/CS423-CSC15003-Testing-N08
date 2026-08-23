# TC-CART-EXT-001: Request bị từ chối không được làm thay đổi trạng thái giỏ

## Requirement ID
FR-06, FR-07

## Module / Test type / Technique
CART / State / State Transition / Atomicity

## Preconditions
- userToken hợp lệ đã được cấu hình.
- Các product ID 991001–991003 chưa được dùng.

## Test data
| Trường | Giá trị |
|---|---|
| validId | `991001` |
| invalidId | `991002` |
| invalidQuantity | `0` |

## Test steps
1. Thêm một item hợp lệ làm anchor.
2. Gửi item khác với quantity 0.
3. GET /api/cart và xác nhận anchor không đổi, item sai không tồn tại.
4. Gửi request chính với product ID riêng.

## Expected result
- HTTP status: `200 hoặc 201`
- Content-Type: `application/json`

## Status / Related bugs
Failed / #285

## Automation mapping
- Data row: `TC-CART-EXT-001`
- Coverage: `state-transition`, `schema-validation`
