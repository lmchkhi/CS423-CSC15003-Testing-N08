<!-- tests/test-cases/FR-16-import/use-case/TC-FR16-UC-004.md -->
# TC-FR16-UC-004: Lỗi sai cấu trúc header (Use Case Testing)

## Requirement ID

FR-16

## Module / Test type / Technique

Quản lý Sản phẩm (Admin) / Functional / Use Case Testing (UC)

## Use Case Analysis

### Actor(s)

Admin

### Flow Under Test

Exception Flow: EF2 - Sai cấu trúc header dòng đầu tiên

### Use Case Flow Table

| TC | Step | Actor Action | System Response | Diverges at Step | Expected |
| --- | --- | --- | --- | --- | --- |
| TC-FR16-UC-004 | 1 | Tải lên file `.csv` có header bị sai (ví dụ thiếu cột) | Đọc file và kiểm tra header | 4 | ✅ Phát hiện sai header |
| TC-FR16-UC-004 | 2 | | Từ chối import, báo lỗi cấu trúc file | N/A | ✅ Thông báo lỗi rõ ràng |

> **Ghi chú:** Exception Flow cô lập luật validation header của file CSV so với cấu trúc quy định.

## Preconditions

- Hệ thống EShop đang hoạt động
- Admin đã đăng nhập thành công và đang ở trang quản lý sản phẩm
- Token JWT của admin đang còn hiệu lực

## Test data

| Field | Value |
| --- | --- |
| File | `wrong_header.csv` |
| Nội dung file | `productName,cost,description,image,catId`<br>`Prod A,100,Desc A,a.jpg,1` |

> Header cố tình sai khác so với quy chuẩn `name,price,description,imageUrl,category_id`.

## Test steps

1. Đăng nhập vào hệ thống bằng tài khoản admin.
2. Điều hướng đến trang Quản lý Sản phẩm, chọn chức năng "Import từ CSV".
3. Chọn file `wrong_header.csv`.
4. Bấm nút Tải lên/Import.
5. Quan sát phản hồi của hệ thống.

## Expected result

Hệ thống từ chối import và hiển thị lỗi liên quan đến cấu trúc header không đúng. Postcondition: Không có bất kỳ dữ liệu nào được thêm vào.

## Actual result

Hệ thống không kiểm tra tính đúng đắn của dòng header đầu tiên. Nếu header sai định dạng, hệ thống vẫn parse tiếp và tự động gán giá trị mặc định cho các trường bị thiếu rồi lưu vào CSDL, không từ chối import ngay từ đầu.

## Status

FAILED
