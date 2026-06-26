<!-- tests/test-cases/FR-05-search/domain-testing/TC-FR05-DT-006.md -->

# TC-FR05-DT-006: Tìm kiếm với XSS Payload (Domain Testing)

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

| TC     | search_keyword                | Expected                                                                                    |
| ------ | ----------------------------- | ------------------------------------------------------------------------------------------- |
| DT-006 | EP6 — Malicious Payload (XSS) | ✅ Hệ thống hiển thị an toàn chuỗi dạng plain text, KHÔNG render HTML/JS. Liên quan SEC-04. |

## Preconditions

- Hệ thống EShop đang hoạt động
- Người dùng đã truy cập trang chủ EShop thành công
- Trình duyệt có Developer Tools (F12) sẵn sàng để kiểm tra DOM

## Test data

| Field          | Value                           |
| -------------- | ------------------------------- |
| search_keyword | `<script>alert('XSS')</script>` |

## Test steps

1. Mở trình duyệt và truy cập trang chủ EShop
2. Xác nhận trang chủ đã tải thành công và thanh tìm kiếm hiển thị
3. Mở Developer Tools (F12) → chuyển sang tab Console để theo dõi
4. Nhấn vào thanh tìm kiếm để focus
5. Nhập từ khóa `<script>alert('XSS')</script>` vào thanh tìm kiếm
6. Nhấn phím Enter hoặc nhấn nút tìm kiếm
7. Kiểm tra KHÔNG có hộp thoại alert popup xuất hiện trên trình duyệt
8. Kiểm tra từ khóa tìm kiếm hiển thị trên trang dưới dạng escaped/plain text (ví dụ: `&lt;script&gt;alert('XSS')&lt;/script&gt;`)
9. Mở tab Elements trong Developer Tools → tìm kiếm thẻ `<script>` bị inject → xác nhận không có thẻ script nào được render trong DOM
10. Kiểm tra tab Console không có lỗi JavaScript bất thường liên quan đến XSS

## Expected result

- Hệ thống hiển thị chuỗi `<script>alert('XSS')</script>` dưới dạng plain text (escaped), KHÔNG render thành HTML/JavaScript
- KHÔNG có hộp thoại alert popup xuất hiện
- DOM không chứa thẻ `<script>` nào được inject từ input người dùng
- Trang không bị crash, treo, hoặc redirect bất thường
- Hệ thống hoạt động bình thường, không có lỗi bảo mật XSS
- Liên quan: SEC-04

## Actual result

- KHÔNG có hộp thoại alert popup xuất hiện (Mã JS không bị thực thi trên trình duyệt).
- Tuy nhiên, hệ thống **bị crash** và phát sinh lỗi `500 (Internal Server Error)` khi gọi API `GET /api/products?search=...`.
- Giao diện web hiển thị trực tiếp lỗi từ cơ sở dữ liệu: `Database Error - SQLITE_ERROR: near "XSS": syntax error`.

## Status

FAILED
