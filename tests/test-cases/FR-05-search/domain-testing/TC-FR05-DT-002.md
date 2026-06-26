<!-- tests/test-cases/FR-05-search/domain-testing/TC-FR05-DT-002.md -->

# TC-FR05-DT-002: Tìm kiếm từ khóa hợp lệ có kết quả (Domain Testing)

## Requirement ID

FR-05

## Module / Test type / Technique

Xem danh sách & Tìm kiếm sản phẩm / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable       | Type   | Domain / Constraints                                                      |
| -------------- | ------ | ------------------------------------------------------------------------- |
| search_keyword | String | Từ khóa tìm kiếm sản phẩm theo tên. API: GET /api/products?search=keyword |

### Domain Matrix

| TC     | search_keyword                        | Expected                                        |
| ------ | ------------------------------------- | ----------------------------------------------- |
| DT-002 | EP2 — Từ khóa hợp lệ, có kết quả khớp | ✅ Hiển thị danh sách sản phẩm có tên chứa "Áo" |

## Preconditions

- Hệ thống EShop đang hoạt động
- Có ít nhất một sản phẩm có tên chứa từ "Áo" trong cơ sở dữ liệu
- Người dùng đã truy cập trang chủ EShop thành công

## Test data

| Field          | Value  |
| -------------- | ------ |
| search_keyword | `"Áo"` |

## Test steps

1. Mở trình duyệt và truy cập trang chủ EShop
2. Xác nhận trang chủ đã tải thành công và thanh tìm kiếm hiển thị
3. Nhấn vào thanh tìm kiếm để focus
4. Nhập từ khóa `Iphone` vào thanh tìm kiếm
5. Nhấn phím Enter hoặc nhấn nút tìm kiếm
6. Quan sát danh sách sản phẩm trả về
7. Kiểm tra từng sản phẩm trong danh sách kết quả có tên chứa từ "Iphone"

## Expected result

- Hệ thống hiển thị danh sách sản phẩm có tên chứa từ khóa "Iphone"
- Mỗi sản phẩm trong kết quả đều có tên chứa chuỗi "Iphone" (không phân biệt hoa/thường nếu hệ thống hỗ trợ)
- Các sản phẩm không liên quan đến từ khóa "Iphone" không xuất hiện trong kết quả
- Trang không hiển thị thông báo lỗi
- Hệ thống hoạt động bình thường

## Actual result

- Hệ thống hiển thị danh sách sản phẩm có tên chứa từ khóa "Iphone"
- Mỗi sản phẩm trong kết quả đều có tên chứa chuỗi "Iphone" (không phân biệt hoa/thường nếu hệ thống hỗ trợ)
- Các sản phẩm không liên quan đến từ khóa "Iphone" không xuất hiện trong kết quả
- Trang không hiển thị thông báo lỗi
- Hệ thống hoạt động bình thường

## Status

PASSED
