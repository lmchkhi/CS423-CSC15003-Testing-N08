# TC-CART-EXT-005: JWT hết hạn bị từ chối và không làm thay đổi giỏ

## Requirement ID
SEC-02, FR-07

## Module / Test type / Technique
CART / Security / Authentication State / Expiry

## Preconditions
- userToken và expiredUserToken đã được cấu hình.
- Product id 991040 chưa được dùng.

## Test data
| Trường | Giá trị |
|---|---|
| id | `991040` |
| auth | `expired JWT` |

## Test steps
1. Gửi item bằng JWT hợp lệ về chữ ký nhưng đã hết hạn.
2. GET giỏ bằng userToken còn hiệu lực và xác nhận item không tồn tại.
3. Gửi request chính với product ID riêng.

## Expected result
- HTTP status: `200 hoặc 201`
- Content-Type: `application/json`

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-CART-EXT-005`
- Coverage: `security`, `state-transition`, `schema-validation`
