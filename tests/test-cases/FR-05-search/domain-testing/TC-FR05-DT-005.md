<!-- tests/test-cases/FR-05-search/domain-testing/TC-FR05-DT-005.md -->

# TC-FR05-DT-005: Tìm kiếm chỉ khoảng trắng (Domain Testing)

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

| TC     | search_keyword        | Expected                                                         |
| ------ | --------------------- | ---------------------------------------------------------------- |
| DT-005 | EP5 — Whitespace-only | ✅ Xử lý tương tự chuỗi rỗng hoặc trả kết quả phù hợp, không lỗi |

## Preconditions

- Hệ thống EShop đang hoạt động
- Có ít nhất một sản phẩm tồn tại trong cơ sở dữ liệu
- Người dùng đã truy cập trang chủ EShop thành công

## Test data

| Field          | Value                                  |
| -------------- | -------------------------------------- |
| search_keyword | `"   "` (3 dấu cách / whitespace-only) |

## Test steps

1. Mở trình duyệt và truy cập trang chủ EShop
2. Xác nhận trang chủ đã tải thành công và thanh tìm kiếm hiển thị
3. Nhấn vào thanh tìm kiếm để focus
4. Nhập 3 dấu cách (spacebar × 3) vào thanh tìm kiếm
5. Nhấn phím Enter hoặc nhấn nút tìm kiếm
6. Quan sát kết quả hiển thị trên trang
7. Kiểm tra hệ thống xử lý whitespace-only input một cách hợp lý

## Expected result

- Hệ thống xử lý chuỗi chỉ chứa khoảng trắng tương tự chuỗi rỗng (trim whitespace) hoặc trả về kết quả phù hợp
- Có thể hiển thị toàn bộ danh sách sản phẩm (nếu hệ thống trim whitespace thành chuỗi rỗng)
- Không hiển thị lỗi hệ thống (error 500, unhandled exception, v.v.)
- Trang không bị crash hoặc treo
- Hệ thống hoạt động bình thường

## Actual result

- Trang không bị crash hoặc treo
- Hệ thống hoạt động bình thường
- Không hiển thị lỗi hệ thống (error 500, unhandled exception, v.v.)
- Hệ thống xử lý an toàn từ khóa chỉ chứa khoảng trắng, không xảy ra lỗi crash hay treo trang.
- Danh sách trả về toàn bộ các sản phẩm hiện có (tương đương với tìm kiếm chuỗi rỗng).

## Status / Related bugs

PASSED
