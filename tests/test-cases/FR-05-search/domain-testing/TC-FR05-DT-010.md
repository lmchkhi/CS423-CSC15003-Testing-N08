<!-- tests/test-cases/FR-05-search/domain-testing/TC-FR05-DT-010.md -->

# TC-FR05-DT-010: UI-4: Trạng thái loading khi đang tải dữ liệu (Domain Testing)

## Requirement ID

FR-05

## Module / Test type / Technique

Xem danh sách & Tìm kiếm sản phẩm / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable      | Type     | Domain / Constraints                         |
| ------------- | -------- | -------------------------------------------- |
| loading_state | UI State | Hiển thị loading indicator khi fetch dữ liệu |

### Domain Matrix

| TC     | Yêu cầu kiểm tra                                              | Expected                                                                                                 |
| ------ | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| DT-010 | FR-05 - Khi đang tải dữ liệu phải hiển thị trạng thái loading | ✅ Có loading indicator (spinner, skeleton, hoặc text loading) xuất hiện trong lúc dữ liệu đang được tải |

## Preconditions

- Hệ thống EShop đang hoạt động
- Trình duyệt hỗ trợ DevTools với chức năng Network Throttling (Chrome, Edge)

## Test data

| Field            | Value                 |
| ---------------- | --------------------- |
| URL              | http://localhost:5173 |
| Network throttle | Slow 3G               |

## Test steps

1. Mở trình duyệt và truy cập trang chủ EShop tại địa chỉ `http://localhost:5173`
2. Nhấn F12 để mở DevTools
3. Chuyển sang tab **Network**
4. Trong dropdown **Throttling**, chọn **Slow 3G** để giả lập mạng chậm
5. Nhấn F5 hoặc Ctrl+R để refresh trang chủ
6. Quan sát giao diện ngay sau khi trang bắt đầu tải lại
7. Kiểm tra có loading indicator hiển thị (spinner quay, skeleton placeholder, hoặc text "Loading..." / "Đang tải...")
8. Chờ dữ liệu tải xong, xác nhận loading indicator biến mất và danh sách sản phẩm hiển thị thay thế
9. Lặp lại bước 5–8 thêm 1 lần để xác nhận tính nhất quán

## Expected result

- Khi dữ liệu đang được tải (API chưa trả về kết quả), giao diện hiển thị loading indicator rõ ràng (spinner, skeleton, hoặc text loading)
- Loading indicator xuất hiện trong khoảng thời gian chờ dữ liệu
- Sau khi dữ liệu tải xong, loading indicator biến mất và danh sách sản phẩm hiển thị đầy đủ
- Trang không hiển thị trắng hoặc không có phản hồi gì trong lúc chờ tải dữ liệu

## Actual result

- Khi dữ liệu đang được tải (API chưa trả về kết quả), giao diện không hiển thị hiển thị loading indicator rõ ràng
- Trang hiển thị trắng trong lúc chờ dữ liệu, không có phản hồi gì

## Status

FAILED
