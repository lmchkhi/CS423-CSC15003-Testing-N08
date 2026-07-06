<!-- tests/test-cases/FR-16-import/use-case/TC-FR16-UC-008.md -->
# TC-FR16-UC-008: Lỗi bảo mật XSS / SQLi trong dữ liệu (Use Case Testing)

## Requirement ID

FR-16

## Module / Test type / Technique

Quản lý Sản phẩm (Admin) / Security / Use Case Testing (UC)

## Use Case Analysis

### Actor(s)

Admin

### Flow Under Test

Exception Flow: EF6 - Payload mã độc XSS / SQL Injection

### Use Case Flow Table

| TC | Step | Actor Action | System Response | Diverges at Step | Expected |
| --- | --- | --- | --- | --- | --- |
| TC-FR16-UC-008 | 1 | Tải file CSV chứa payload `script` hoặc dấu nháy đơn nhạy cảm | Nhận diện dữ liệu hoặc escape an toàn theo SEC-04, SEC-05 | 5/6 | ✅ Escape hoặc Reject |
| TC-FR16-UC-008 | 2 | | Nếu từ chối: Báo lỗi. Nếu import: Lưu chuỗi plain-text an toàn | N/A | ✅ Không thực thi mã độc |

> **Ghi chú:** Đảm bảo hệ thống không bị tấn công Stored XSS hoặc SQLi khi lấy dữ liệu ồ ạt từ file CSV.

## Preconditions

- Hệ thống EShop đang hoạt động
- Admin đã đăng nhập thành công và đang ở trang quản lý sản phẩm
- Token JWT của admin đang còn hiệu lực

## Test data

| Field | Value |
| --- | --- |
| File | `payload_test.csv` |
| Nội dung file | `name,price,description,imageUrl,category_id`<br>`<script>alert(1)</script>,1000,1'; DROP TABLE users;--,img.jpg,1` |

## Test steps

1. Đăng nhập vào hệ thống bằng tài khoản admin.
2. Điều hướng đến trang Quản lý Sản phẩm, chọn "Import từ CSV".
3. Chọn file `payload_test.csv` và tải lên.
4. Trường hợp hệ thống từ chối: Quan sát lỗi trả về.
5. Trường hợp hệ thống lưu thành công: Mở danh sách sản phẩm và xem chi tiết sản phẩm này.

## Expected result

Hệ thống KHÔNG thực thi alert hộp thoại trên UI (chặn XSS) và KHÔNG bị lỗi CSDL/mất dữ liệu (chặn SQLi). Dữ liệu payload hoặc bị từ chối báo lỗi rõ ràng, hoặc được lưu và hiển thị dưới dạng chuỗi thuần túy (encoded string) trên giao diện.

## Actual result

Hệ thống sử dụng Prepared Statement ở backend để ngăn chặn SQL Injection thành công. Payload XSS trong tên sản phẩm được lưu an toàn dưới dạng chuỗi thuần túy trong CSDL SQLite và hiển thị an toàn trên giao diện React (được escape tự động bởi React).

## Status

PASSED
