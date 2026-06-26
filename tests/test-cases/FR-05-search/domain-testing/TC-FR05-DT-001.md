<!-- tests/test-cases/FR-05-search/domain-testing/TC-FR05-DT-001.md -->

# TC-FR05-DT-001: Tìm kiếm với từ khóa rỗng (Domain Testing)

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

| TC     | search_keyword           | Expected                               |
| ------ | ------------------------ | -------------------------------------- |
| DT-001 | EP1 — Rỗng (Empty/Blank) | ✅ Hiển thị toàn bộ danh sách sản phẩm |

## Preconditions

- Hệ thống EShop đang hoạt động
- Có ít nhất một sản phẩm tồn tại trong cơ sở dữ liệu
- Người dùng đã truy cập trang chủ EShop thành công

## Test data

| Field          | Value                             |
| -------------- | --------------------------------- |
| search_keyword | `""` (chuỗi rỗng / không nhập gì) |

## Test steps

1. Mở trình duyệt và truy cập trang chủ EShop
2. Xác nhận trang chủ đã tải thành công và thanh tìm kiếm hiển thị
3. Không nhập bất kỳ ký tự nào vào thanh tìm kiếm (hoặc xóa trắng nếu có nội dung sẵn)
4. Nhấn phím Enter hoặc nhấn nút tìm kiếm (nếu có)
5. Quan sát danh sách sản phẩm hiển thị trên trang

## Expected result

- Hệ thống hiển thị toàn bộ danh sách sản phẩm có trong cơ sở dữ liệu
- Danh sách sản phẩm không bị lọc hay giới hạn bởi bất kỳ từ khóa nào
- Trang không hiển thị thông báo lỗi
- Hệ thống hoạt động bình thường, không bị crash

## Actual result

- Hệ thống hiển thị toàn bộ danh sách sản phẩm có trong cơ sở dữ liệu
- Danh sách sản phẩm không bị lọc hay giới hạn bởi bất kỳ từ khóa nào
- Trang không hiển thị thông báo lỗi
- Hệ thống hoạt động bình thường, không bị crash

## Status

PASSED
