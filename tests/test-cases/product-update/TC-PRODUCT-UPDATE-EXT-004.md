# TC-PRODUCT-UPDATE-EXT-004: Tên Unicode đúng biên 255 ký tự được lưu nguyên vẹn

## Requirement ID
FR-12, FR-15

## Module / Test type / Technique
PRODUCT-UPDATE / State / Boundary Value Analysis

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
1. Gửi update có name gồm 255 ký tự Unicode.
2. Đọc lại và xác nhận tên được lưu nguyên vẹn.
3. Gửi request chính để cleanup trạng thái.

## Expected result
- HTTP status: `200 hoặc 204`
- Đặc tả không chốt chính xác 200 hay 204 và schema response thành công.

## Status / Related bugs
Passed / None

## Automation mapping
- Data row: `TC-PRODUCT-UPDATE-EXT-004`
- Coverage: `domain-partition`, `state-transition`, `schema-validation`
