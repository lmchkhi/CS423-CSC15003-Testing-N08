<!-- tests/test-cases/FR-16-import/use-case/TC-FR16-UC-003.md -->
# TC-FR16-UC-003: Lỗi sai định dạng đuôi file (Use Case Testing)

## Requirement ID

FR-16

## Module / Test type / Technique

Quản lý Sản phẩm (Admin) / Functional / Use Case Testing (UC)

## Use Case Analysis

### Actor(s)

Admin

### Flow Under Test

Exception Flow: EF1 - Sai định dạng đuôi file

### Use Case Flow Table

| TC | Step | Actor Action | System Response | Diverges at Step | Expected |
| --- | --- | --- | --- | --- | --- |
| TC-FR16-UC-003 | 1 | Tải lên file không phải `.csv` (ví dụ `.txt`) | Hệ thống kiểm tra phần mở rộng file | 3 | ✅ Phát hiện sai định dạng |
| TC-FR16-UC-003 | 2 | | Từ chối xử lý, hiển thị lỗi file không được hỗ trợ | N/A | ✅ Thông báo lỗi rõ ràng |

> **Ghi chú:** Exception Flow nhằm đảm bảo hệ thống không nhận và parse các tập tin sai định dạng, tiết kiệm tài nguyên.

## Preconditions

- Hệ thống EShop đang hoạt động
- Admin đã đăng nhập thành công và đang ở trang quản lý sản phẩm
- Token JWT của admin đang còn hiệu lực

## Test data

| Field | Value |
| --- | --- |
| File | `products.txt` |
| Nội dung | (Văn bản bất kỳ hoặc chứa nội dung giống CSV nhưng đuôi `.txt`) |

> Nhằm kích hoạt chặn từ phía UI hoặc bước kiểm tra header sớm ở backend.

## Test steps

1. Đăng nhập vào hệ thống bằng tài khoản admin.
2. Điều hướng đến trang Quản lý Sản phẩm, chọn chức năng "Import từ CSV".
3. Chọn file `products.txt`.
4. Bấm nút Tải lên/Import (hoặc quan sát ngay khi chọn file).
5. Quan sát cảnh báo của hệ thống.

## Expected result

Hệ thống từ chối tải lên và hiển thị thông báo lỗi "Định dạng file không được hỗ trợ. Vui lòng chọn file .csv". Postcondition: Không có tiến trình import nào diễn ra.

## Actual result

Hệ thống không kiểm tra định dạng đuôi file trước khi tải lên và parse. Khi chọn file ".txt", hệ thống vẫn đọc và cố gắng xử lý như file CSV bình thường, không hiển thị cảnh báo lỗi đuôi file không hợp lệ.

## Status

FAILED
