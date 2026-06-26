<!-- tests/test-cases/FR-05-search/domain-testing/TC-FR05-DT-007.md -->

# TC-FR05-DT-007: Tìm kiếm với SQL Injection Payload (Domain Testing)

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

| TC     | search_keyword                          | Expected                                                                               |
| ------ | --------------------------------------- | -------------------------------------------------------------------------------------- |
| DT-007 | EP7 — Malicious Payload (SQL Injection) | ✅ Hệ thống xử lý an toàn, KHÔNG trả về toàn bộ sản phẩm bất thường. Liên quan SEC-05. |

## Preconditions

- Hệ thống EShop đang hoạt động
- Người dùng đã truy cập trang chủ EShop thành công
- Biết trước số lượng sản phẩm trong hệ thống để so sánh (hoặc có thể ước lượng)

## Test data

| Field          | Value             |
| -------------- | ----------------- |
| search_keyword | `' OR '1'='1' --` |

## Test steps

1. Mở trình duyệt và truy cập trang chủ EShop
2. Xác nhận trang chủ đã tải thành công và thanh tìm kiếm hiển thị
3. Nhấn vào thanh tìm kiếm để focus
4. Nhập từ khóa `' OR '1'='1' --` vào thanh tìm kiếm
5. Nhấn phím Enter hoặc nhấn nút tìm kiếm
6. Quan sát kết quả trả về
7. Kiểm tra kết quả KHÔNG trả về toàn bộ danh sách sản phẩm trong cơ sở dữ liệu (dấu hiệu SQL Injection thành công)
8. Kiểm tra hệ thống không hiển thị lỗi 500, database error, hoặc SQL syntax error
9. Kiểm tra trang không bị crash hoặc treo
10. Kiểm tra URL và response không chứa thông tin nhạy cảm về cơ sở dữ liệu

## Expected result

- Hệ thống xử lý chuỗi SQL Injection payload một cách an toàn (parameterized query hoặc input sanitization)
- Kết quả tìm kiếm KHÔNG trả về toàn bộ sản phẩm trong cơ sở dữ liệu một cách bất thường
- Hệ thống trả về empty state hoặc kết quả rỗng (vì không có sản phẩm nào có tên khớp với chuỗi SQL injection)
- Không hiển thị lỗi hệ thống (error 500, database error, SQL syntax error, stack trace, v.v.)
- Trang không bị crash, treo, hoặc redirect bất thường
- Không có thông tin nhạy cảm về cơ sở dữ liệu bị lộ trong response
- Liên quan: SEC-05

## Actual result

- Hệ thống trả về danh sách toàn bộ sản phẩm trong cơ sở dữ liệu, cho thấy có khả năng SQL Injection thành công
- Không hiển thị lỗi hệ thống (error 500, database error, SQL syntax error, stack trace, v.v.)
- Trang không bị crash hoặc treo
- Không có thông tin nhạy cảm về cơ sở dữ liệu bị lộ trong response
- Hệ thống KHÔNG sử dụng Parameterized Query để xử lý an toàn input từ người dùng, vi phạm nghiêm trọng yêu cầu bảo mật SEC-05.

## Status

FAILED
