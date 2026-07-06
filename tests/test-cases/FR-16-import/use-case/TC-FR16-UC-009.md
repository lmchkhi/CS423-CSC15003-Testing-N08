<!-- tests/test-cases/FR-16-import/use-case/TC-FR16-UC-009.md -->
# TC-FR16-UC-009: Lỗi bảo mật CSV Formula Injection (Use Case Testing)

## Requirement ID

FR-16

## Module / Test type / Technique

Quản lý Sản phẩm (Admin) / Security / Use Case Testing (UC)

## Use Case Analysis

### Actor(s)

Admin

### Flow Under Test

Exception Flow: EF7 - CSV Formula Injection

### Use Case Flow Table

| TC | Step | Actor Action | System Response | Diverges at Step | Expected |
| --- | --- | --- | --- | --- | --- |
| TC-FR16-UC-009 | 1 | Tải file CSV chứa chuỗi bắt đầu bằng `=` trong `name` | Nhận diện dữ liệu rủi ro | 5/6 | ✅ Phát hiện Formula Injection |
| TC-FR16-UC-009 | 2 | | Báo lỗi từ chối import, hoặc escape an toàn | N/A | ✅ Bảo vệ an toàn ứng dụng |

> **Ghi chú:** Đảm bảo hệ thống ngăn chặn rủi ro khi dữ liệu này sau đó bị export tải xuống và mở bằng Excel/bảng tính.

## Preconditions

- Hệ thống EShop đang hoạt động
- Admin đã đăng nhập thành công và đang ở trang quản lý sản phẩm
- Token JWT của admin đang còn hiệu lực

## Test data

| Field | Value |
| --- | --- |
| File | `formula_injection.csv` |
| Nội dung file | `name,price,description,imageUrl,category_id`<br>`=cmd\|' /C calc'!A0,1000,Desc,img.jpg,1` |

## Test steps

1. Đăng nhập vào hệ thống bằng tài khoản admin.
2. Điều hướng đến trang Quản lý Sản phẩm, chọn "Import từ CSV".
3. Chọn file `formula_injection.csv` và tải lên.
4. Quan sát hệ thống có bắt chẹt/báo lỗi hoặc escape ký tự an toàn hay không.

## Expected result

Hệ thống từ chối lưu và báo lỗi bảo mật, HOẶC lưu thành công bằng cách escape thêm ký tự nháy đơn (ví dụ `'=cmd...`) vào phía trước để chuỗi không bị bảng tính thực thi khi xuất file CSV trong tương lai. Postcondition: Không có rủi ro bảo mật về sau.

## Actual result

Hệ thống không phát hiện hay escape các ký tự đặc biệt ở đầu trường (như `=`) để chặn CSV Formula Injection. Chuỗi công thức lệnh độc hại vẫn được ghi nguyên văn vào cơ sở dữ liệu.

## Status

FAILED
