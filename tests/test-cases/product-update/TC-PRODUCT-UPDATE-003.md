# TC-PRODUCT-UPDATE-003: Từ chối JWT không hợp lệ

## Requirement ID
FR-12, FR-15

## Module / Test type / Technique
PRODUCT-UPDATE / Security / Negative Testing

## Preconditions
- Backend khả dụng.
- Sản phẩm ID 1 và danh mục ID 1 tồn tại.
- Dữ liệu xác thực đúng theo test case đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `1` |
| auth | `invalid` |
| body | `{"name":"Sản phẩm kiểm thử 23127062","price":123456,"description":"Dữ liệu kiểm thử PUT product","imageUrl":"https://example.test/product.png","category_id":1}` |

## Test steps
1. Gửi PUT /api/products/:id với path, header, quyền và body đã nêu.
2. Kiểm tra HTTP status, Content-Type và response body theo oracle.

## Expected result
- HTTP status: `403`
- Content-Type: `application/json`
- Response schema: `{"type":"object","required":["error"],"properties":{"error":{"type":"string"}}}`
- `error` phải có kiểu `string`

## Status / Related bugs
Failed / #234

## Automation mapping
- Data row: `TC-PRODUCT-UPDATE-003`
- Coverage: `security`
