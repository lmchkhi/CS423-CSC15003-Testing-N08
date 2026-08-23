# TC-PRODUCT-UPDATE-040: Cập nhật một sản phẩm không làm đổi sản phẩm khác

## Requirement ID
FR-12, FR-15

## Module / Test type / Technique
PRODUCT-UPDATE / State / State Transition

## Preconditions
- Backend khả dụng.
- Sản phẩm ID 1 và danh mục ID 1 tồn tại.
- adminToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `1` |
| auth | `admin` |
| body | `{"name":"iPhone 15 Pro Max","price":30000000,"description":"Điện thoại cao cấp của Apple","imageUrl":"https://placehold.co/300x300/png?text=iPhone+15","category_id":1}` |

## Test steps
1. Gửi PUT /api/products/:id với path, header, quyền và body đã nêu.
2. Kiểm tra HTTP status, Content-Type và response body theo oracle.

## Expected result
- HTTP status: `200 hoặc 204`
- Đặc tả không chốt chính xác 200 hay 204 và schema response thành công.

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-PRODUCT-UPDATE-040`
- Coverage: `state-transition`
