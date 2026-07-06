<!-- tests/test-design/FR-16-import-design.md -->

# Test Case Design Analysis: FR-16 Import Sản phẩm từ CSV (Use Case Testing)

## 1. Actor(s)
- **Admin**: Người dùng có quyền quản trị (`role = 'admin'`) đã đăng nhập vào phân hệ Web Admin.

## 2. Preconditions (Điều kiện tiên quyết)
- Hệ thống EShop (backend và frontend) đang hoạt động bình thường.
- Admin đã đăng nhập thành công bằng tài khoản hợp lệ có quyền admin và đang ở trang quản lý/import sản phẩm.
- Token JWT của admin đang còn hiệu lực (chưa hết hạn).

## 3. Main Success Scenario (Basic Flow - Dòng sự kiện cơ bản)
1. Admin chọn chức năng Import Sản phẩm từ CSV.
2. Admin chọn tải lên một file đúng định dạng `.csv`.
3. Hệ thống kiểm tra đuôi file là `.csv` và cho phép xử lý tiếp.
4. Hệ thống đọc file và kiểm tra dòng đầu tiên đúng chuẩn header: `name,price,description,imageUrl,category_id`.
5. Hệ thống duyệt qua tất cả các dòng dữ liệu (record), xác nhận rằng:
   - Cột `name` của mọi dòng không bị rỗng.
   - Cột `price` của mọi dòng đều là số dương (> 0).
6. Hệ thống thực hiện import thành công toàn bộ dữ liệu vào CSDL.
7. Hệ thống hiển thị báo cáo: thông báo import thành công toàn bộ số dòng sản phẩm hợp lệ, không có lỗi.

## 4. Alternate Flows (Dòng sự kiện thay thế)
- **AF1: File CSV chứa trường có dấu phẩy được bọc trong dấu nháy kép (Chuẩn RFC 4180)**
  - Tách từ **Bước 5** của Basic Flow.
  - File dữ liệu có chứa nội dung ở một số cột (ví dụ `description` hoặc `name`) có ký tự dấu phẩy `,` nhưng được bao bọc đúng chuẩn trong dấu nháy kép `""` (VD: `"Áo thun nam, màu đỏ"`).
  - Hệ thống parse dữ liệu thành công mà không bị sai cột.
  - Hệ thống tiếp tục Bước 6, 7 (Import thành công trọn vẹn).

## 5. Exception Flows (Dòng sự kiện ngoại lệ)
- **EF1: Sai định dạng đuôi file**
  - Dừng tại **Bước 3** của Basic Flow. Admin tải lên file không có đuôi `.csv` (VD: `.xlsx`, `.txt`).
  - Hệ thống từ chối tải lên/xử lý, hiển thị lỗi định dạng file không được hỗ trợ.
- **EF2: Sai cấu trúc header dòng đầu tiên**
  - Dừng tại **Bước 4** của Basic Flow. Dòng đầu tiên của file CSV không đúng chuẩn (thiếu cột, sai tên cột, sai thứ tự).
  - Hệ thống từ chối import, hiển thị lỗi cấu trúc file không đúng.
- **EF3: Có dòng bị rỗng cột `name`**
  - Dừng tại **Bước 5** của Basic Flow. File có ít nhất 1 dòng mà trường `name` bị rỗng.
  - Hệ thống dừng tiến trình import, thực hiện rollback toàn bộ. Hiển thị báo cáo lỗi chỉ rõ dòng nào bị lỗi và lý do thiếu tên sản phẩm.
- **EF4: Có dòng chứa `price` không hợp lệ**
  - Dừng tại **Bước 5** của Basic Flow. File có ít nhất 1 dòng mà trường `price` không phải là số dương (VD: `-1000`, `0`, hoặc chuỗi `abc`).
  - Hệ thống dừng tiến trình import, thực hiện rollback toàn bộ. Hiển thị báo cáo lỗi chỉ rõ dòng nào bị lỗi và lý do giá không hợp lệ.
- **EF5: Lỗi tại một dòng bất kỳ (All-or-nothing Rollback check)**
  - Dừng tại **Bước 5/6** của Basic Flow. File có nhiều dòng hợp lệ ở đầu, nhưng dòng cuối cùng/ở giữa bị lỗi (thiếu name hoặc sai price).
  - Hệ thống từ chối lưu toàn bộ, kích hoạt tính năng **giao dịch nguyên tử (atomic transaction)** để rollback. Không có bất kỳ dòng nào được lưu. Hệ thống báo lỗi rõ ràng dòng nào bị lỗi, lý do lỗi.
- **EF6: Input chứa mã độc Payload XSS / SQL Injection**
  - Dừng tại **Bước 5/6** của Basic Flow. File CSV có cấu trúc hợp lệ, nhưng chứa dữ liệu độc hại trong trường `name` hoặc `description` (VD: `<script>alert(1)</script>`, `1'; DROP TABLE products;--`).
  - Hệ thống validation bắt được mã độc và từ chối import (báo lỗi dòng tương ứng và rollback toàn bộ). (Nếu hệ thống escape đúng và coi là văn bản bình thường, file vẫn được import nhưng không thực thi mã độc).
- **EF7: CSV Formula Injection**
  - Dừng tại **Bước 5/6** của Basic Flow. File CSV có trường bắt đầu bằng `=`, `+`, `-`, `@` (VD: `=cmd|' /C calc'!A0`).
  - Hệ thống phát hiện công thức bảng tính độc hại và từ chối import để ngăn ngừa rủi ro, thực hiện rollback toàn bộ và báo lỗi dòng tương ứng.

## 6. Postconditions (Trạng thái hậu điều kiện)
- **Trường hợp thành công (Basic Flow & Alternate Flow)**: Tất cả các sản phẩm trong file CSV được lưu vào cơ sở dữ liệu thành công. Không có giao dịch nào bị hủy. Trạng thái dữ liệu hệ thống được cập nhật với số lượng sản phẩm mới.
- **Trường hợp lỗi (Tất cả Exception Flows)**: Kích hoạt nguyên tắc transaction rollback (all-or-nothing). **KHÔNG có bất kỳ sản phẩm nào từ file CSV được import vào CSDL**, kể cả các dòng hợp lệ trước khi gặp dòng lỗi. Hệ thống không bị thay đổi trạng thái dữ liệu (bảo toàn tính nguyên vẹn).
