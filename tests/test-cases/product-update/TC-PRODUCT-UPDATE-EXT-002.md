# TC-PRODUCT-UPDATE-EXT-002: User thường bị từ chối và không làm thay đổi sản phẩm

## Requirement ID
FR-12, FR-15, SEC-02, SEC-03

## Module / Test type / Technique
PRODUCT-UPDATE / Security / Authorization State Transition

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
1. Khôi phục sản phẩm ID 1 về baseline bằng admin.
2. Dùng userToken gửi payload thay đổi toàn bộ trường.
3. Đọc lại và xác nhận sản phẩm không đổi.
4. Gửi request chính để cleanup trạng thái.

## Expected result
- HTTP status: `200 hoặc 204`
- Đặc tả không chốt chính xác 200 hay 204 và schema response thành công.

## Status / Related bugs
Failed / #234

## Automation mapping
- Data row: `TC-PRODUCT-UPDATE-EXT-002`
- Coverage: `security`, `state-transition`
