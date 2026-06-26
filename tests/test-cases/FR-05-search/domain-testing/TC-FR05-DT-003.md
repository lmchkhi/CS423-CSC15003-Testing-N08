<!-- tests/test-cases/FR-05-search/domain-testing/TC-FR05-DT-003.md -->

# TC-FR05-DT-003: Tìm kiếm từ khóa không có kết quả (Domain Testing)

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

| TC     | search_keyword                              | Expected                                  |
| ------ | ------------------------------------------- | ----------------------------------------- |
| DT-003 | EP3 — Từ khóa hợp lệ, không có kết quả khớp | ✅ Hiển thị thông báo empty state phù hợp |

## Preconditions

- Hệ thống EShop đang hoạt động
- Không có sản phẩm nào trong cơ sở dữ liệu có tên chứa chuỗi "xyznoexist123"
- Người dùng đã truy cập trang chủ EShop thành công

## Test data

| Field          | Value             |
| -------------- | ----------------- |
| search_keyword | `"xyznoexist123"` |

## Test steps

1. Mở trình duyệt và truy cập trang chủ EShop
2. Xác nhận trang chủ đã tải thành công và thanh tìm kiếm hiển thị
3. Nhấn vào thanh tìm kiếm để focus
4. Nhập từ khóa `xyznoexist123` vào thanh tìm kiếm
5. Nhấn phím Enter hoặc nhấn nút tìm kiếm
6. Quan sát kết quả hiển thị trên trang
7. Kiểm tra thông báo empty state (ví dụ: "Không tìm thấy sản phẩm nào")

## Expected result

- Hệ thống hiển thị thông báo empty state phù hợp (ví dụ: "Không tìm thấy sản phẩm nào" hoặc tương tự)
- Danh sách sản phẩm trống, không hiển thị bất kỳ sản phẩm nào
- Trang không hiển thị thông báo lỗi hệ thống (error 500, exception, v.v.)
- Hệ thống hoạt động bình thường, không bị crash

## Actual result

- Danh sách sản phẩm trống, không hiển thị bất kỳ sản phẩm nào
- Trang không hiển thị thông báo lỗi hệ thống (error 500, exception, v.v.)
- Hệ thống hoạt động bình thường, không bị crash
- Hệ thống không hiển thị thông báo empty state phù hợp (ví dụ: "Không tìm thấy sản phẩm nào" hoặc tương tự)

## Status

FAILED
