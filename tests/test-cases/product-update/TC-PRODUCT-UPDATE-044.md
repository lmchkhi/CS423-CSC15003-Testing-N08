# TC-PRODUCT-UPDATE-044: Từ chối body top-level string

## Requirement ID
FR-12, FR-15

## Module / Test type / Technique
PRODUCT-UPDATE / Contract / Schema Validation

## Preconditions
- Backend khả dụng.
- Sản phẩm ID 1 và danh mục ID 1 tồn tại.
- adminToken hợp lệ đã được cấu hình.

## Test data
| Trường | Giá trị |
|---|---|
| id | `1` |
| auth | `admin` |
| body | `invalid-body` |

## Test steps
1. Gửi PUT /api/products/:id với path, header, quyền và body đã nêu.
2. Kiểm tra HTTP status, Content-Type và response body theo oracle.

## Expected result
- HTTP status: `400 hoặc 422`
- Content-Type: `application/json`
- Response schema: `{"type":"object","required":["error"],"properties":{"error":{"type":"string"}}}`
- `error` phải có kiểu `string`

## Status / Related bugs
Failed / #287

## Automation mapping
- Data row: `TC-PRODUCT-UPDATE-044`
- Coverage: `schema-validation`, `domain-partition`
