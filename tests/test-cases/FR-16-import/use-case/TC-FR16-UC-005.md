<!-- tests/test-cases/FR-16-import/use-case/TC-FR16-UC-005.md -->
# TC-FR16-UC-005: Lỗi rỗng tên sản phẩm (Use Case Testing)

## Requirement ID

FR-16

## Module / Test type / Technique

Quản lý Sản phẩm (Admin) / Functional / Use Case Testing (UC)

## Use Case Analysis

### Actor(s)

Admin

### Flow Under Test

Exception Flow: EF3 - Có dòng bị rỗng cột `name`

### Use Case Flow Table

| TC | Step | Actor Action | System Response | Diverges at Step | Expected |
| --- | --- | --- | --- | --- | --- |
| TC-FR16-UC-005 | 1 | Tải file `.csv` chứa dòng có `name` rỗng | Quét validation trên từng dòng | 5 | ✅ Phát hiện dòng lỗi name rỗng |
| TC-FR16-UC-005 | 2 | | Dừng import, kích hoạt rollback và báo lỗi dòng tương ứng | N/A | ✅ Rollback toàn bộ |

> **Ghi chú:** Exception Flow nhằm cô lập ràng buộc bắt buộc (required) đối với trường name.

## Preconditions

- Hệ thống EShop đang hoạt động
- Admin đã đăng nhập thành công và đang ở trang quản lý sản phẩm
- Token JWT của admin đang còn hiệu lực

## Test data

| Field | Value |
| --- | --- |
| File | `empty_name.csv` |
| Nội dung file | `name,price,description,imageUrl,category_id`<br>`,50000,Desc,img.jpg,1` |

> Dòng dữ liệu đầu tiên cố tình để trống trường `name` ở đầu.

## Test steps

1. Đăng nhập vào hệ thống bằng tài khoản admin.
2. Điều hướng đến trang Quản lý Sản phẩm, chọn "Import từ CSV".
3. Chọn file `empty_name.csv`.
4. Bấm nút Tải lên/Import.
5. Quan sát báo cáo lỗi trả về.

## Expected result

Hệ thống hiển thị lỗi chỉ rõ dòng 1 có trường name bị trống. Không có sản phẩm nào được import. Postcondition: Rollback toàn bộ giao dịch thành công.

## Actual result

Hệ thống phát hiện hàng thứ 2 bị thiếu tên sản phẩm (name rỗng), trả về thông báo lỗi: "Hàng 2: Thiếu tên sản phẩm" và không import dòng này.

## Status

PASSED
