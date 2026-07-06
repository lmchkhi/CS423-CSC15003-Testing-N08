<!-- tests/test-cases/FR-16-import/use-case/TC-FR16-UC-001.md -->
# TC-FR16-UC-001: Import hợp lệ (Use Case Testing)

## Requirement ID

FR-16

## Module / Test type / Technique

Quản lý Sản phẩm (Admin) / Functional / Use Case Testing (UC)

## Use Case Analysis

### Actor(s)

Admin

### Flow Under Test

Basic Flow

### Use Case Flow Table

| TC | Step | Actor Action | System Response | Diverges at Step | Expected |
| --- | --- | --- | --- | --- | --- |
| TC-FR16-UC-001 | 1 | Chọn file `.csv` hợp lệ và bấm tải lên | Kiểm tra đuôi file hợp lệ | N/A | ✅ Chấp nhận định dạng file |
| TC-FR16-UC-001 | 2 | Chờ hệ thống xử lý | Đọc file, kiểm tra header đúng chuẩn | N/A | ✅ Header hợp lệ |
| TC-FR16-UC-001 | 3 | | Kiểm tra `name` không rỗng, `price` > 0 trên tất cả các dòng | N/A | ✅ Dữ liệu hợp lệ |
| TC-FR16-UC-001 | 4 | | Import toàn bộ dữ liệu vào CSDL và hiển thị thông báo thành công | N/A | ✅ Báo cáo import thành công toàn bộ dòng |

> **Ghi chú:** Đây là Basic Flow kiểm tra trường hợp lý tưởng nhất khi toàn bộ dữ liệu trong file CSV đều đúng quy chuẩn.

## Preconditions

- Hệ thống EShop đang hoạt động
- Admin đã đăng nhập thành công và đang ở trang quản lý sản phẩm
- Token JWT của admin đang còn hiệu lực

## Test data

| Field | Value |
| --- | --- |
| File | `valid_products.csv` |
| Nội dung file | `name,price,description,imageUrl,category_id`<br>`Product A,10000,Desc A,img1.jpg,1`<br>`Product B,20000,Desc B,img2.jpg,1` |

> File chứa nhiều dòng sản phẩm có thông tin đầy đủ, không vi phạm ràng buộc nào.

## Test steps

1. Đăng nhập vào hệ thống bằng tài khoản admin.
2. Điều hướng đến trang Quản lý Sản phẩm, chọn chức năng "Import từ CSV".
3. Chọn file `valid_products.csv` có dữ liệu chuẩn bị sẵn.
4. Bấm nút Tải lên/Import và quan sát hệ thống phản hồi.
5. Kiểm tra cơ sở dữ liệu hoặc danh sách sản phẩm để xác nhận sản phẩm đã được thêm mới.

## Expected result

Hệ thống thông báo "Import thành công toàn bộ sản phẩm". Không có dòng nào bị lỗi. Sản phẩm A và B xuất hiện trong danh sách quản lý của admin. Trạng thái hậu điều kiện: Dữ liệu được lưu trữ an toàn vào DB.

## Actual result

Hệ thống import thành công toàn bộ sản phẩm trong file CSV mẫu, trả về thông báo: "Import hoàn tất: 2/2 sản phẩm được thêm" và không báo lỗi nào. Dữ liệu hiển thị chính xác trên danh sách admin.

## Status

PASSED
