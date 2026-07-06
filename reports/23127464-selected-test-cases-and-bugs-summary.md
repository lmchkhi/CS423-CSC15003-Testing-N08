# Báo cáo tổng hợp test case và bug theo phạm vi chọn lọc

23127464 - Trần Minh Quang

## Tổng quan số lượng test case

Tổng cộng có **31 test case** được tạo trong phạm vi báo cáo.

| Nhóm test case | Requirement | Kỹ thuật thiết kế test |  Số TC |
| -------------- | ----------: | ---------------------- | -----: |
| `FR-05`        |       FR-05 | Domain Testing         |     10 |
| `FR-10`        |       FR-10 | Decision Table Testing |     12 |
| `FR-16-import` |       FR-16 | Use Case Testing       |      9 |
| **Tổng**       |        3 FR | 3 nhóm kỹ thuật        | **31** |

## Coverage của test case

Bộ test hiện bao phủ ba feature requirement chính:

- **FR-05 - Xem danh sách & Tìm kiếm sản phẩm (Domain Testing):** bao phủ hiển thị danh sách sản phẩm dạng lưới (grid layout) responsive trên các thiết bị mobile, tablet, desktop. Kiểm tra độ chuẩn xác của UI hiển thị (alt text của hình ảnh, định dạng giá tiền ₫ với phân cách hàng nghìn). Kiểm tra chức năng tìm kiếm sản phẩm theo tên (Happy path: từ khóa khớp kết quả; Edge cases: từ khóa rỗng, khoảng trắng, từ khóa không tồn tại). Bao phủ các trường hợp kiểm thử phi chức năng: hiệu năng hiển thị (loading state), trải nghiệm người dùng khi không có kết quả (empty state), cấu trúc SEO (chỉ có đúng 1 thẻ `<h1>`), và kiểm thử bảo mật (XSS qua thanh tìm kiếm/error rendering, SQL Injection ở backend khi gọi API tìm kiếm).
- **FR-10 - Trạng thái Đơn hàng (Decision Table Testing):** bao phủ các luồng chuyển đổi trạng thái hợp lệ trong State Machine (chuyển tiếp tuyến tính pending → confirmed → shipping → delivered, và luồng hủy đơn pending → canceled, confirmed → canceled, shipping → canceled). Bao phủ các ràng buộc trạng thái kết thúc (không cho phép chuyển tiếp khi đơn hàng đã ở trạng thái `delivered` hoặc `canceled`). Bao phủ các trường hợp chuyển đổi không hợp lệ như bỏ qua bước trung gian (pending → shipping), quay ngược trạng thái (confirmed → pending), và kiểm tra phân quyền (chỉ Admin mới có quyền hủy đơn `shipping`, User bị từ chối; User cố gọi API Admin để xác nhận đơn hàng).
- **FR-16 - Import sản phẩm từ CSV (Use Case Testing):** bao phủ luồng chính (Basic Flow: import thành công file CSV hợp lệ đầy đủ thông tin). Bao phủ dòng sự kiện thay thế (Alternate Flow: file chứa trường có dấu phẩy bọc trong nháy kép theo chuẩn RFC 4180). Bao phủ các dòng sự kiện ngoại lệ (Exception Flows: sai đuôi file không phải .csv, sai cấu trúc header, rỗng cột `name`, giá tiền `price` không hợp lệ (số âm), kiểm tra tính chất giao dịch nguyên tử rollback toàn bộ file khi có một dòng lỗi, payloads độc hại chứa mã độc XSS/SQL Injection, và lỗ hổng CSV Formula Injection).

## Trạng thái test case

| Nhóm test case | Passed | Failed | Blocked | Not Run |   Tổng |
| -------------- | -----: | -----: | ------: | ------: | -----: |
| `FR-05`        |      3 |      7 |       0 |       0 |     10 |
| `FR-10`        |      8 |      3 |       0 |       1 |     12 |
| `FR-16-import` |      3 |      6 |       0 |       0 |      9 |
| **Tổng**       | **14** | **16** |   **0** |   **1** | **31** |

Ghi chú:

- Nhóm `FR-05`: 100% test case đã được thực thi, tỉ lệ lỗi là 7/10 TC Failed chủ yếu do các vấn đề về UX/SEO (thiếu loading, empty state, sai Semantic HTML) và các lỗ hổng bảo mật nghiêm trọng (XSS, SQL Injection).
- Nhóm `FR-10`: 1 TC (`TC-FR10-DTT-011` về luồng từ chối quay ngược trạng thái confirmed → pending) chưa được thực thi (Not Run).
- Nhóm `FR-16-import`: Không có test case nào bị Blocked hoặc chưa thực thi (Not Run). Tuy nhiên, tỉ lệ lỗi khá cao (6/9 TC Failed) do hệ thống thiếu kiểm tra validation ở cả frontend và backend, đồng thời thiếu cơ chế atomic transaction.

## Tổng quan bug

Trong phạm vi báo cáo có **17 bug** liên quan trực tiếp đến các test case đã chọn.

| Requirement | Nhóm chức năng      | Số bug | Severity                         |
| ----------- | ------------------- | -----: | -------------------------------- |
| FR-05       | Homepage & Search   |      8 | 3 Critical, 3 Major, 2 Minor     |
| FR-10       | Order State Machine |      3 | 2 Critical, 1 Major              |
| FR-16       | Import CSV          |      6 | 1 Critical, 4 Major, 1 Minor     |
| **Tổng**    |                     | **17** | **6 Critical, 8 Major, 3 Minor** |

## Bug coverage theo requirement

### FR-05 - Homepage & Search

Có **8 bug** với severity gồm **3 Critical**, **3 Major** và **2 Minor**:

- `BUG-HOME-001` - Critical: XSS qua thanh tìm kiếm (dangerouslySetInnerHTML). Trình duyệt thực thi mã JavaScript khi nhập payload XSS vào thanh tìm kiếm. Lỗi vi phạm tại `frontend-web/src/pages/Home.jsx` dòng 64 do sử dụng `dangerouslySetInnerHTML={{ __html: search }}` trực tiếp với input người dùng.
- `BUG-HOME-002` - Critical: XSS qua error HTML rendering. Lỗi từ backend trả về response chứa HTML được render bằng `dangerouslySetInnerHTML` ở frontend, tạo lỗ hổng XSS thông qua error message injection. Lỗi vi phạm tại `frontend-web/src/pages/Home.jsx` dòng 71.
- `BUG-HOME-003` - Minor: Ảnh sản phẩm thiếu alt text mô tả. Thuộc tính `alt` của ảnh sản phẩm được hardcode là chuỗi rỗng (`alt=""`), vi phạm tiêu chuẩn SEO và hỗ trợ người dùng khuyết tật (Accessibility - WCAG 2.1 Level A). Lỗi vi phạm tại `frontend-web/src/pages/Home.jsx` dòng 82, cần thay bằng `alt={product.name}`.
- `BUG-HOME-004` - Major: Hiển thị đơn vị tiền sai (VND thay vì ₫). Giá hiển thị sai định dạng: `1,500,000 VND` thay vì ký hiệu chuẩn `1.500.000 ₫`, không đúng chuẩn hiển thị tiền tệ và phân cách hàng nghìn của Việt Nam. Lỗi vi phạm tại `frontend-web/src/pages/Home.jsx` dòng 87.
- `BUG-HOME-005` - Major: Không có trạng thái loading khi tải dữ liệu. Trang hiển thị trống hoàn toàn (blank page) trong thời gian chờ gọi API khi giả lập mạng chậm, không hiển thị spinner hay skeleton placeholder. Component `Home` thiếu cơ chế quản lý loading state.
- `BUG-HOME-006` - Major: Không hiển thị empty state khi không có kết quả tìm kiếm. Khi tìm kiếm không có kết quả, giao diện hiển thị vùng trống hoàn toàn mà không có thông báo hay gợi ý tìm kiếm lại cho người dùng do thiếu conditional rendering kiểm tra `products.length === 0`.
- `BUG-HOME-007` - Minor: Trang có 2 thẻ `<h1>` (vi phạm chuẩn SEO). Cả heading chính "Danh sách sản phẩm" (dòng 43) và dòng text đếm số lượng sản phẩm "Hiển thị X sản phẩm" (dòng 110) đều dùng thẻ `<h1>`, vi phạm HTML semantics.
- `BUG-HOME-008` - Critical: SQL Injection trong API tìm kiếm sản phẩm. Backend sử dụng string concatenation trực tiếp input người dùng vào câu SQL truy vấn SQLite (`WHERE name LIKE '%${searchQuery}%'`), cho phép thực thi SQL Injection để lấy toàn bộ dữ liệu hoặc DROP bảng. Lỗi vi phạm tại `backend/server.js` dòng 144, cần sửa thành parameterized query.

### FR-10 - Order State Machine

Có **3 bug** với severity gồm **2 Critical** và **1 Major**:

- `BUG-FR10-001` - Major: Admin hủy đơn hàng shipping — hành vi không nhất quán giữa API và giao diện. Hệ thống cho phép API hủy đơn hàng shipping thành công nhưng giao diện Admin có thể không hiển thị tùy chọn hủy rõ ràng cho đơn hàng shipping, hoặc luồng hủy không nhất quán giữa API và UI.
- `BUG-FR10-002` - Critical: User có thể hủy đơn hàng đang shipping — vi phạm ràng buộc State Machine FR-10. API endpoint `PUT /api/orders/:id/cancel` không kiểm tra trạng thái hiện tại của đơn hàng trước khi cho phép hủy, dẫn đến việc User có thể tự hủy đơn hàng đang giao, gây tổn thất về mặt vận chuyển (logistics).
- `BUG-FR10-003` - Critical: User có thể gọi API Admin để xác nhận đơn hàng — thiếu kiểm tra role trên API Admin orders. API `PUT /api/admin/orders/:id/status` không kiểm tra vai trò admin của token JWT gửi lên, cho phép tài khoản người dùng bình thường tự xác nhận đơn hàng từ pending sang confirmed.

### FR-16 - Import CSV

Có **6 bug** với severity gồm **1 Critical**, **4 Major** và **1 Minor**:

- `BUG-FR16-001` - Major: Lỗi parse dấu phẩy trong nháy kép (RFC 4180) khiến lệch cột dữ liệu. Hệ thống sử dụng hàm `split(",")` tại frontend nên tách nhầm dấu phẩy nằm trong dấu nháy kép của tên/mô tả sản phẩm thành cột mới, gây lệch cột và gán nhầm giá trị giá tiền thành chuỗi ký tự.
- `BUG-FR16-002` - Minor: Thiếu validation đuôi file tại Import CSV. Hệ thống không kiểm tra định dạng đuôi file ở cả frontend và backend, cố gắng đọc bất kỳ file nào (như `.txt`, `.xlsx`) được tải lên bằng `readAsText` và gửi dữ liệu lỗi lên backend.
- `BUG-FR16-003` - Major: Thiếu validation cấu trúc dòng header đầu tiên của file CSV. Hệ thống không kiểm tra cấu trúc dòng header đầu tiên, tự động parse các dòng tiếp theo và chèn giá trị mặc định/undefined/0 cho các cột bị thiếu vào cơ sở dữ liệu.
- `BUG-FR16-004` - Major: Cho phép import sản phẩm có giá tiền không phải số dương. Cả frontend và backend đều không kiểm tra ràng buộc giá tiền lớn hơn 0, đồng thời SQLite không có constraint `CHECK(price > 0)` khiến sản phẩm có giá âm hoặc bằng 0 vẫn được import thành công.
- `BUG-FR16-005` - Critical: Thiếu tính chất giao dịch nguyên tử (Atomic transaction) khi import. Backend thực hiện các câu lệnh chèn không đồng bộ bằng `stmt.run()` riêng lẻ mà không bọc trong Transaction, dẫn đến việc các dòng hợp lệ ở đầu file vẫn được chèn vào database dù dòng sau bị lỗi, vi phạm cơ chế rollback toàn bộ (All-or-nothing).
- `BUG-FR16-006` - Major: Lỗ hổng bảo mật CSV Formula Injection khi import. Hệ thống lưu nguyên văn chuỗi bắt đầu bằng các ký tự công thức (`=`, `+`, `-`, `@`) vào cơ sở dữ liệu mà không thực hiện xử lý hoặc escape, dẫn đến rủi ro thực thi mã độc trên máy tính của quản trị viên khi xuất/tải file báo cáo CSV sau này và mở bằng Excel.
