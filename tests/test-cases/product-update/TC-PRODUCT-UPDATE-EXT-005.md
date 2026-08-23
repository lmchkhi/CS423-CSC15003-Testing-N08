# TC-PRODUCT-UPDATE-EXT-005: Content-Type sai bị từ chối mà không làm thay đổi state

## Requirement ID
FR-12, FR-15

## Module / Test type / Technique
PRODUCT-UPDATE / Contract / Content-Type Atomicity Testing

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
1. Khôi phục sản phẩm ID 1 về baseline.
2. Gửi JSON-looking payload với Content-Type text/plain.
3. Đọc lại và xác nhận sản phẩm không đổi.
4. Gửi request chính để cleanup trạng thái.

## Expected result
- HTTP status: `200 hoặc 204`
- Đặc tả không chốt chính xác 200 hay 204 và schema response thành công.

## Status / Related bugs
Failed / #288

## Automation mapping
- Data row: `TC-PRODUCT-UPDATE-EXT-005`
- Coverage: `security`, `state-transition`, `schema-validation`
