# TC-CART-001: Cô lập giỏ hàng giữa hai tài khoản

## Requirement ID
FR-07, SEC-02

## Module / Test type / Technique
CART / Security / State Transition / Authorization Isolation

## Preconditions
- userToken và adminToken hợp lệ đã được cấu hình.
- Dùng product ID riêng cho hai tài khoản.

## Test data
| Trường | Giá trị |
|---|---|
| id | `990001` |
| name | `Sản phẩm user` |
| price | `100000` |
| quantity | `1` |

## Test steps
1. Thêm product id 990002 vào giỏ admin.
2. Đọc giỏ user và xác nhận không có product id 990002.
3. Gửi request chính để thêm product id 990001 vào giỏ user.

## Expected result
- HTTP status: `200 hoặc 201`
- Content-Type: `application/json`

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-CART-001`
- Coverage: `state-transition`, `security`, `schema-validation`
