<!-- tests/test-cases/FR-05-search/domain-testing/TC-FR05-DT-008.md -->

# TC-FR05-DT-008: UI-1: Danh sách sản phẩm hiển thị dạng grid (Domain Testing)

## Requirement ID

FR-05

## Module / Test type / Technique

Xem danh sách & Tìm kiếm sản phẩm / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable            | Type      | Domain / Constraints      |
| ------------------- | --------- | ------------------------- |
| product_list_layout | UI Layout | Hiển thị dạng grid (lưới) |

### Domain Matrix

| TC     | Yêu cầu kiểm tra                                                      | Expected                                                                                               |
| ------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| DT-008 | FR-05 - Trang chủ hiển thị danh sách tất cả sản phẩm dạng lưới (grid) | ✅ Sản phẩm được hiển thị dạng grid (CSS grid hoặc flexbox wrap), không phải dạng danh sách dọc (list) |

## Preconditions

- Hệ thống EShop đang hoạt động
- Có ít nhất 2 sản phẩm trong hệ thống để quan sát bố cục lưới
- Trình duyệt hỗ trợ CSS Grid và Flexbox (Chrome, Firefox, Edge phiên bản mới)

## Test data

| Field | Value                 |
| ----- | --------------------- |
| URL   | http://localhost:5173 |

## Test steps

1. Mở trình duyệt và truy cập trang chủ EShop tại địa chỉ `http://localhost:5173`
2. Chờ trang tải hoàn tất và danh sách sản phẩm hiển thị đầy đủ
3. Quan sát bố cục hiển thị danh sách sản phẩm trên trang chủ
4. Kiểm tra các sản phẩm được sắp xếp dạng lưới nhiều cột (không phải chỉ 1 cột dọc)
5. Nhấn F12 để mở DevTools → chọn tab Elements
6. Chọn phần tử cha (container) chứa danh sách sản phẩm
7. Kiểm tra thuộc tính CSS: xác nhận có `display: grid` hoặc `display: flex` với `flex-wrap: wrap`
8. Thu nhỏ cửa sổ trình duyệt và kiểm tra bố cục grid có responsive (số cột thay đổi theo kích thước màn hình)

## Expected result

- Danh sách sản phẩm trên trang chủ được hiển thị dạng lưới (grid) với nhiều cột
- Container chứa danh sách sản phẩm có CSS `display: grid` hoặc `display: flex` kết hợp `flex-wrap: wrap`
- Các sản phẩm không hiển thị dạng danh sách dọc (list) chỉ có 1 cột
- Bố cục grid responsive theo kích thước màn hình

## Actual result

- Danh sách sản phẩm trên trang chủ được hiển thị dạng lưới (grid) với nhiều cột
- Container chứa danh sách sản phẩm có CSS `display: grid` hoặc `display: flex` kết hợp `flex-wrap: wrap`
- Các sản phẩm không hiển thị dạng danh sách dọc (list) chỉ có 1 cột
- Bố cục grid responsive theo kích thước màn hình

## Status

PASSED
