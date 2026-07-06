<!-- tests/test-cases/FR-16-import/use-case/TC-FR16-UC-006.md -->
# TC-FR16-UC-006: Lỗi giá trị price không hợp lệ (Use Case Testing)

## Requirement ID

FR-16

## Module / Test type / Technique

Quản lý Sản phẩm (Admin) / Functional / Use Case Testing (UC)

## Use Case Analysis

### Actor(s)

Admin

### Flow Under Test

Exception Flow: EF4 - Có dòng chứa `price` không hợp lệ (âm, 0, chữ)

### Use Case Flow Table

| TC | Step | Actor Action | System Response | Diverges at Step | Expected |
| --- | --- | --- | --- | --- | --- |
| TC-FR16-UC-006 | 1 | Tải file `.csv` chứa dòng có `price` <= 0 hoặc không phải số | Quét validation trên từng dòng | 5 | ✅ Phát hiện dòng lỗi price |
| TC-FR16-UC-006 | 2 | | Dừng import, kích hoạt rollback và báo lỗi dòng tương ứng | N/A | ✅ Rollback toàn bộ |

> **Ghi chú:** Exception Flow nhằm cô lập ràng buộc số nguyên dương đối với giá tiền (price > 0).

## Preconditions

- Hệ thống EShop đang hoạt động
- Admin đã đăng nhập thành công và đang ở trang quản lý sản phẩm
- Token JWT của admin đang còn hiệu lực

## Test data

| Field | Value |
| --- | --- |
| File | `invalid_price.csv` |
| Nội dung file | `name,price,description,imageUrl,category_id`<br>`Product Z,-1000,Desc,img.jpg,1` |

> Cố tình tạo một dữ liệu có price là âm (-1000) để kích hoạt luật validation.

## Test steps

1. Đăng nhập vào hệ thống bằng tài khoản admin.
2. Điều hướng đến trang Quản lý Sản phẩm, chọn "Import từ CSV".
3. Chọn file `invalid_price.csv`.
4. Bấm nút Tải lên/Import.
5. Quan sát báo cáo lỗi trả về.

## Expected result

Hệ thống hiển thị lỗi chỉ rõ dòng 1 có price không hợp lệ (phải là số dương). Không có sản phẩm nào được import. Postcondition: Rollback toàn bộ giao dịch thành công.

## Actual result

Hệ thống không kiểm tra giá trị của price phải là số dương ở cả backend và frontend. Dữ liệu có price âm (ví dụ -1000) vẫn được lưu thành công vào CSDL SQLite mà không bị chặn lại.

## Status

FAILED
