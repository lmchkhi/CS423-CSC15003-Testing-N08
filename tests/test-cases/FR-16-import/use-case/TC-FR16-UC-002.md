<!-- tests/test-cases/FR-16-import/use-case/TC-FR16-UC-002.md -->
# TC-FR16-UC-002: Import hợp lệ với trường chứa dấu phẩy (Use Case Testing)

## Requirement ID

FR-16

## Module / Test type / Technique

Quản lý Sản phẩm (Admin) / Functional / Use Case Testing (UC)

## Use Case Analysis

### Actor(s)

Admin

### Flow Under Test

Alternate Flow: AF1 - Dữ liệu chứa dấu phẩy được bọc trong dấu nháy kép (RFC 4180)

### Use Case Flow Table

| TC | Step | Actor Action | System Response | Diverges at Step | Expected |
| --- | --- | --- | --- | --- | --- |
| TC-FR16-UC-002 | 1 | Tải lên file `.csv` chứa dấu phẩy trong nội dung bọc nháy kép | Parse dữ liệu CSV dựa theo chuẩn RFC 4180 | 5 | ✅ Cột không bị phân tách sai lệch |
| TC-FR16-UC-002 | 2 | | Import vào hệ thống và hiển thị báo cáo thành công | N/A | ✅ Dữ liệu có chứa dấu phẩy hiển thị đúng đắn |

> **Ghi chú:** Alternate Flow kiểm tra việc áp dụng đúng chuẩn RFC 4180 để chuỗi có dấu `,` không bị tách nhầm thành cột khác.

## Preconditions

- Hệ thống EShop đang hoạt động
- Admin đã đăng nhập thành công và đang ở trang quản lý sản phẩm
- Token JWT của admin đang còn hiệu lực

## Test data

| Field | Value |
| --- | --- |
| File | `rfc4180_products.csv` |
| Nội dung file | `name,price,description,imageUrl,category_id`<br>`"Áo thun nam, màu đỏ",150000,"Áo chất lượng, vải mát",img_red.jpg,2` |

> Test data cố tình chèn `,` vào `name` và `description` nhưng có bọc `""`.

## Test steps

1. Đăng nhập vào hệ thống bằng tài khoản admin.
2. Điều hướng đến trang Quản lý Sản phẩm, chọn chức năng "Import từ CSV".
3. Chọn file `rfc4180_products.csv`.
4. Bấm nút Tải lên/Import và quan sát hệ thống phản hồi.
5. Kiểm tra danh sách sản phẩm, xem chi tiết Tên và Mô tả có đúng dữ liệu gốc hay không.

## Expected result

Hệ thống thông báo import thành công toàn bộ dòng. Tên sản phẩm hiển thị đúng `Áo thun nam, màu đỏ` (bao gồm dấu phẩy), không bị vỡ cột dữ liệu (price vẫn là 150000). Trạng thái hậu điều kiện: Dữ liệu import thành công.

## Actual result

Hệ thống parse sai cột dữ liệu do sử dụng hàm split(",") đơn giản tại frontend-admin/src/App.jsx. Dấu phẩy trong dấu nháy kép bị hiểu lầm thành ký tự phân tách cột, làm lệch toàn bộ các trường (tên bị chia đôi, giá thành chuỗi không hợp lệ, category_id thành NaN).

## Status

FAILED
