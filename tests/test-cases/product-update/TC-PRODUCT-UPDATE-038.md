# TC-PRODUCT-UPDATE-038: Bỏ qua unknown field role, không mass assignment

## Requirement ID
FR-12, FR-15, SEC-03

## Module / Test type / Technique
PRODUCT-UPDATE / Security / Mass Assignment

## Preconditions
- Backend khả dụng.
- Sản phẩm ID 1 và danh mục ID 1 tồn tại.
- adminToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `1` |
| auth | `admin` |
| body | `{"name":"Sản phẩm kiểm thử 23127062","price":123456,"description":"Dữ liệu kiểm thử PUT product","imageUrl":"https://example.test/product.png","category_id":1,"role":"admin"}` |

## Test steps
1. Gửi PUT /api/products/:id với path, header, quyền và body đã nêu.
2. Kiểm tra HTTP status, Content-Type và response body theo oracle.

## Expected result
- HTTP status: `200 hoặc 204`
- Đặc tả không chốt chính xác 200 hay 204 và schema response thành công.

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-PRODUCT-UPDATE-038`
- Coverage: `security`, `state-transition`
