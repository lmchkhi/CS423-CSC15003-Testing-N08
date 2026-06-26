<!-- tests/test-cases/FR-05-search/domain-testing/TC-FR05-DT-014.md -->

# TC-FR05-DT-014: UI-8: Giá hiển thị đúng format ₫ + phân cách hàng nghìn (Domain Testing)

## Requirement ID

FR-05

## Module / Test type / Technique

Xem danh sách & Tìm kiếm sản phẩm / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable     | Type   | Domain / Constraints             |
| ------------ | ------ | -------------------------------- |
| price_format | Format | Ký hiệu ₫ + phân cách hàng nghìn |

### Domain Matrix

| TC     | Yêu cầu kiểm tra                                                      | Expected                                                                           |
| ------ | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| DT-014 | FR-05 + FR-21 - Giá hiển thị đơn vị ₫, định dạng phân cách hàng nghìn | ✅ Giá hiển thị có ký hiệu ₫ và phân cách hàng nghìn (vd: 100.000 ₫ hoặc 100,000₫) |

## Preconditions

- Hệ thống EShop đang hoạt động
- Có ít nhất 1 sản phẩm có giá >= 1.000 (để kiểm tra phân cách hàng nghìn)

## Test data

| Field | Value                 |
| ----- | --------------------- |
| URL   | http://localhost:5173 |

## Test steps

1. Mở trình duyệt và truy cập trang chủ EShop tại địa chỉ `http://localhost:5173`
2. Chờ trang tải hoàn tất và danh sách sản phẩm hiển thị đầy đủ
3. Quan sát giá hiển thị trên các product card
4. Kiểm tra mỗi giá sản phẩm có chứa ký hiệu tiền tệ `₫` (đồng Việt Nam)
5. Kiểm tra giá có phân cách hàng nghìn bằng dấu `.` hoặc dấu `,` (ví dụ: `150.000 ₫` hoặc `150,000₫`)
6. Xác nhận giá không hiển thị dạng số nguyên liền (ví dụ: `150000` là SAI, phải là `150.000` hoặc `150,000`)
7. Kiểm tra ít nhất 3 product card khác nhau để đảm bảo tính nhất quán định dạng giá
8. Nhấn F12 mở DevTools → tab Elements → Inspect phần tử hiển thị giá để xác nhận nội dung text hiển thị đúng format
9. Kiểm tra các mức giá khác nhau (nếu có): giá < 1.000, giá hàng nghìn, giá hàng triệu để đảm bảo format đúng ở mọi mức

## Expected result

- Tất cả giá sản phẩm trên product card đều hiển thị có ký hiệu `₫`
- Giá có phân cách hàng nghìn rõ ràng (dấu `.` hoặc `,`)
- Ví dụ đúng: `150.000 ₫`, `1.200.000 ₫`, `99.000₫`
- Ví dụ sai: `150000`, `1200000₫` (thiếu phân cách hàng nghìn)
- Định dạng giá nhất quán trên tất cả các product card

## Actual result

- Tất cả giá sản phẩm trên product card đều hiển thị có ký hiệu `VND` thay vì `₫`
- Giá có phân cách hàng nghìn rõ ràng (dấu `.` hoặc `,`)
- Định dạng giá nhất quán trên tất cả các product card

## Status / Related bugs

FAILED
