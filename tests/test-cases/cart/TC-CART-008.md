# TC-CART-008: Field thừa không được làm thay đổi quyền sở hữu giỏ

## Requirement ID
FR-07, SEC-02

## Module / Test type / Technique
CART / Security / Mass Assignment

## Preconditions
- userToken và adminToken hợp lệ đã được cấu hình.
- Product id 990008 chưa được dùng trong suite.

## Test data
| Trường | Giá trị |
|---|---|
| id | `990008` |
| name | `Sản phẩm có field thừa` |
| price | `100000` |
| quantity | `1` |
| user_id | `1` |
| role | `admin` |

## Test steps
1. Trong workflow, user thêm item có user_id và role giả mạo.
2. Đọc giỏ user và xác nhận item thuộc giỏ user.
3. Đọc giỏ admin và xác nhận không có item đó.
4. Gửi request chính với một product ID riêng.

## Expected result
- HTTP status: `200 hoặc 201`
- Content-Type: `application/json`

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-CART-008`
- Coverage: `domain-partition`, `security`
