<!-- tests/test-cases/FR-16-import/use-case/TC-FR16-UC-007.md -->
# TC-FR16-UC-007: Rollback toàn bộ khi có 1 dòng lỗi (Use Case Testing)

## Requirement ID

FR-16

## Module / Test type / Technique

Quản lý Sản phẩm (Admin) / Functional / Use Case Testing (UC)

## Use Case Analysis

### Actor(s)

Admin

### Flow Under Test

Exception Flow: EF5 - All-or-nothing Rollback check

### Use Case Flow Table

| TC | Step | Actor Action | System Response | Diverges at Step | Expected |
| --- | --- | --- | --- | --- | --- |
| TC-FR16-UC-007 | 1 | Tải file CSV có n dòng hợp lệ đầu tiên, 1 dòng lỗi ở cuối | Quét validation và phát hiện lỗi ở dòng n+1 | 5/6 | ✅ Phát hiện dòng lỗi |
| TC-FR16-UC-007 | 2 | | Kích hoạt transaction rollback, không lưu n dòng đầu | N/A | ✅ Bảo toàn tính toàn vẹn (rollback all) |

> **Ghi chú:** Exception Flow quan trọng nhất để chứng minh tính chất All-or-Nothing (Atomic Transaction) của chức năng import.

## Preconditions

- Hệ thống EShop đang hoạt động
- Admin đã đăng nhập thành công và đang ở trang quản lý sản phẩm
- Token JWT của admin đang còn hiệu lực

## Test data

| Field | Value |
| --- | --- |
| File | `atomic_check.csv` |
| Nội dung file | `name,price,description,imageUrl,category_id`<br>`Valid 1,1000,Desc 1,img1.jpg,1`<br>`Valid 2,2000,Desc 2,img2.jpg,1`<br>`,3000,Error line,img3.jpg,1` |

> Hai dòng đầu hợp lệ, dòng số 3 cố tình để rỗng trường name.

## Test steps

1. Kiểm tra danh sách sản phẩm hiện tại, ghi nhận chưa có sản phẩm `Valid 1`, `Valid 2`.
2. Đăng nhập vào hệ thống bằng tài khoản admin.
3. Điều hướng đến trang Quản lý Sản phẩm, chọn "Import từ CSV".
4. Chọn file `atomic_check.csv`.
5. Bấm nút Tải lên/Import.
6. Quan sát báo cáo lỗi (phải báo lỗi ở dòng 3).
7. Quay lại danh sách sản phẩm, làm mới trang, tìm kiếm `Valid 1` và `Valid 2`.

## Expected result

Hệ thống thông báo lỗi ở dòng thứ 3 do thiếu tên sản phẩm. Khi tải lại danh sách sản phẩm, **KHÔNG** có sản phẩm `Valid 1` hay `Valid 2` được tạo ra. Postcondition: Rollback thành công, không có sản phẩm nào lọt vào DB.

## Actual result

Hệ thống không thực hiện cơ chế all-or-nothing (transaction rollback). Khi file có dòng hợp lệ ở đầu và dòng lỗi ở cuối, hệ thống vẫn import thành công các dòng hợp lệ đầu tiên vào DB và chỉ bỏ qua dòng lỗi cuối cùng.

## Status

FAILED
