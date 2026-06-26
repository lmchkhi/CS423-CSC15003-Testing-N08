<!-- tests/test-cases/FR-05-search/domain-testing/TC-FR05-DT-004.md -->

# TC-FR05-DT-004: Tìm kiếm từ khóa có ký tự đặc biệt (Domain Testing)

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

| TC     | search_keyword       | Expected                             |
| ------ | -------------------- | ------------------------------------ |
| DT-004 | EP4 — Ký tự đặc biệt | ✅ Hệ thống xử lý an toàn, không lỗi |

## Preconditions

- Hệ thống EShop đang hoạt động
- Người dùng đã truy cập trang chủ EShop thành công

## Test data

| Field          | Value       |
| -------------- | ----------- |
| search_keyword | `"Áo @#$%"` |

## Test steps

1. Mở trình duyệt và truy cập trang chủ EShop
2. Xác nhận trang chủ đã tải thành công và thanh tìm kiếm hiển thị
3. Nhấn vào thanh tìm kiếm để focus
4. Nhập từ khóa `Áo @#$%` vào thanh tìm kiếm
5. Nhấn phím Enter hoặc nhấn nút tìm kiếm
6. Quan sát kết quả hiển thị trên trang
7. Kiểm tra hệ thống không hiển thị lỗi 500 hoặc exception
8. Kiểm tra trang không bị crash hoặc treo

## Expected result

- Hệ thống xử lý từ khóa chứa ký tự đặc biệt một cách an toàn
- Hệ thống trả về kết quả tìm kiếm phù hợp hoặc hiển thị empty state (không tìm thấy sản phẩm)
- Không hiển thị lỗi hệ thống (error 500, unhandled exception, stack trace, v.v.)
- Trang không bị crash, treo, hoặc redirect bất thường
- Hệ thống hoạt động bình thường sau khi thực hiện tìm kiếm

## Actual result

- Hệ thống xử lý từ khóa chứa ký tự đặc biệt một cách an toàn
- Không hiển thị lỗi hệ thống (error 500, unhandled exception, stack trace, v.v.)
- Trang không bị crash, treo, hoặc redirect bất thường
- Hệ thống hoạt động bình thường sau khi thực hiện tìm kiếm
- Hệ thống không trả về kết quả tìm kiếm phù hợp hoặc hiển thị empty state (không tìm thấy sản phẩm)

## Status

FAILED
