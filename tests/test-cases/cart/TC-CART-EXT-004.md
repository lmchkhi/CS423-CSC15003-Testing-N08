# TC-CART-EXT-004: Cô lập giỏ giữa hai tài khoản user có cùng product id

## Requirement ID
FR-07, SEC-02

## Module / Test type / Technique
CART / Security / Multi-user State Transition / Authorization Isolation

## Preconditions
- userToken và altUserToken hợp lệ đã được cấu hình.
- Product id 991030 chưa được dùng.

## Test data
| Trường | Giá trị |
|---|---|
| id | `991030` |
| userAName | `Item user A` |
| userBName | `Item user B` |

## Test steps
1. User A thêm product.
2. User B thêm cùng id nhưng name khác.
3. Đọc hai giỏ và xác nhận mỗi tài khoản chỉ thấy dữ liệu của mình.
4. Gửi request chính với product ID riêng.

## Expected result
- HTTP status: `200 hoặc 201`
- Content-Type: `application/json`

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-CART-EXT-004`
- Coverage: `security`, `state-transition`, `schema-validation`
