# Test Summary Report

## Thông tin nhóm

| ID nhóm | MSSV | Họ tên |
|---|---:|---|
| N08 | 23127062 | Lâm Vĩ Khang |
| N08 | 23127300 | Hà Bảo Ngọc |
| N08 | 23127381 | Lâm Chí Khải |
| N08 | 23127464 | Trần Minh Quang |
| N08 | 23127475 | Ngô Hồng Thanh |

## 23127062 - Lâm Vĩ Khang

### Tổng quan test case

Tổng cộng có **53 test case**.

| Chức năng | Requirement | Kỹ thuật thiết kế test | Số TC |
|---|---:|---|---:|
| Đăng ký tài khoản | FR-01 | Domain Testing, Boundary Value Analysis | 16 |
| Đăng nhập và khóa tài khoản | FR-02 | Decision Table Testing | 13 |
| Thanh toán | FR-08 | State Transition Testing | 12 |
| Mã giảm giá | FR-09 | Use Case Testing | 12 |
| **Tổng** | 4 FR | 4 nhóm kỹ thuật | **53** |

### Coverage của test case

- **FR-01 - Đăng ký tài khoản:** bao phủ luồng đăng ký thành công, các miền dữ liệu của Họ Tên, Email, Mật khẩu và Xác nhận mật khẩu; đồng thời kiểm tra biên độ dài mật khẩu 7, 8 và 9 ký tự.
- **FR-02 - Đăng nhập và khóa tài khoản:** bao phủ validation email, đăng nhập thành công, lưu/gắn JWT token, các lần đăng nhập sai trước và tại ngưỡng khóa, trạng thái khóa trước/sau mốc 30 giây, và việc đăng nhập thành công kết thúc chuỗi sai liên tiếp.
- **FR-08 - Thanh toán:** bao phủ các trạng thái từ chưa đăng nhập, đã đăng nhập, giỏ hàng có sản phẩm đến thanh toán thành công; kiểm tra tự tính tổng tiền, chống sửa `total_amount`, xóa giỏ hàng sau thanh toán, lỗi khi giỏ trống/chưa đăng nhập, và gửi lại sau thanh toán.
- **FR-09 - Mã giảm giá:** bao phủ luồng áp dụng mã thành công, mã phần trăm, mã cố định, tổng đơn đúng ngưỡng tối thiểu, mã dùng nhiều lượt, cùng các luồng lỗi như mã không tồn tại, mã hết hạn, thiếu/sai JWT, hết lượt sử dụng và sai chữ hoa/thường.

### Trạng thái test case

| Chức năng | Passed | Failed | Blocked | Not Run | Tổng |
|---|---:|---:|---:|---:|---:|
| Đăng ký tài khoản | 0 | 0 | 16 | 0 | 16 |
| Đăng nhập và khóa tài khoản | 2 | 2 | 0 | 9 | 13 |
| Thanh toán | 4 | 7 | 1 | 0 | 12 |
| Mã giảm giá | 1 | 11 | 0 | 0 | 12 |
| **Tổng** | **7** | **20** | **17** | **9** | **53** |

Ghi chú:

- Toàn bộ 16 TC của chức năng đăng ký tài khoản bị **Blocked** vì trang đăng ký thiếu trường **Xác nhận mật khẩu**, nên không thể thực thi đúng flow.
- 9 TC của chức năng đăng nhập và khóa tài khoản vẫn ở trạng thái **Not Run**, chủ yếu thuộc luồng khóa tài khoản và Bearer token.

### Tổng quan bug

Có **11 bug** liên quan trực tiếp đến các test case trong phạm vi của người thực hiện này.

| Requirement | Chức năng | Số bug | Severity |
|---|---|---:|---|
| FR-01 | Đăng ký tài khoản | 1 | 1 Critical |
| FR-02 | Đăng nhập và khóa tài khoản | 0 | - |
| FR-08 | Thanh toán | 3 | 2 Critical, 1 Major |
| FR-09 | Mã giảm giá | 7 | 1 Critical, 2 Major, 4 Minor |
| **Tổng** |  | **11** | **4 Critical, 3 Major, 4 Minor** |

### Bug coverage theo requirement

**FR-01 - Đăng ký tài khoản:** có **1 bug Critical**.

- `BUG-FR-01-001`: trang đăng ký thiếu trường **Xác nhận mật khẩu**, khiến toàn bộ test case đăng ký bị blocked.

**FR-02 - Đăng nhập và khóa tài khoản:** chưa có bug report riêng trong phạm vi đã ghi nhận, dù có 2 TC Failed và 9 TC Not Run.

**FR-08 - Thanh toán:** có **3 bug**, gồm **2 Critical** và **1 Major**.

- `BUG-FR08-001` - Critical: client có thể sửa và quyết định tổng tiền đơn hàng; backend chấp nhận `total_amount` từ client.
- `BUG-FR08-002` - Major: thanh toán thành công nhưng giỏ hàng không được xóa.
- `BUG-FR08-003` - Critical: backend tạo đơn khi giỏ hàng trống hoặc khi gửi lại yêu cầu thanh toán.

**FR-09 - Mã giảm giá:** có **7 bug**, gồm **1 Critical**, **2 Major** và **4 Minor**.

- `BUG-COUPON-001` - Critical: công thức mã phần trăm tạo số tiền giảm âm và làm tổng tiền tăng.
- `BUG-COUPON-002` - Major: không tăng lượt sử dụng sau khi áp dụng mã thành công.
- `BUG-COUPON-003` - Major: từ chối mã khi tổng đơn hàng đúng bằng ngưỡng tối thiểu.
- `BUG-COUPON-004` - Minor: thông báo không phân biệt mã không tồn tại và mã bị vô hiệu hóa.
- `BUG-COUPON-005` - Minor: thông báo đơn hàng dưới ngưỡng không đúng nội dung kỳ vọng.
- `BUG-COUPON-006` - Critical: API cho phép áp dụng mã khi thiếu hoặc sai JWT token.
- `BUG-COUPON-007` - Minor: thông báo hết lượt sử dụng không đúng nội dung kỳ vọng.

---

## 23127300 - Hà Bảo Ngọc

### Tổng quan test case

Tổng cộng có **50 test case**.

| Chức năng | Requirement | Kỹ thuật thiết kế test | Số TC |
|---|---:|---|---:|
| Đăng ký tài khoản | FR-01 | Decision Table Testing, Pairwise + Decision Table Testing | 15 |
| Đăng nhập và khóa tài khoản | FR-02 | Domain Testing, Boundary Value Analysis | 15 |
| Thanh toán | FR-08 | Use Case Testing | 6 |
| Trạng thái đơn hàng | FR-10 | State Transition Testing | 14 |
| **Tổng** | 4 FR | 5 nhóm kỹ thuật | **50** |

### Coverage của test case

- **FR-01 - Đăng ký tài khoản:** bao phủ luồng đăng ký thành công, thiếu họ tên, thiếu email, email sai định dạng, email trùng, thiếu mật khẩu, mật khẩu yếu, thiếu xác nhận mật khẩu và xác nhận mật khẩu không khớp; có thêm nhóm pairwise để kiểm tra các tổ hợp lỗi đầu vào.
- **FR-02 - Đăng nhập và khóa tài khoản:** bao phủ đăng nhập hợp lệ, email sai định dạng hoặc không tồn tại, thiếu email/mật khẩu, đăng nhập sai dưới ngưỡng khóa, khóa tài khoản tại/vượt ngưỡng 3 lần sai, đăng nhập khi đang bị khóa, và các mốc biên thời gian 29/30/31 giây.
- **FR-08 - Thanh toán:** bao phủ yêu cầu đăng nhập, API thanh toán cần token hợp lệ, hiển thị đủ sản phẩm, tổng tiền tự tính và không cho chỉnh sửa trực tiếp, backend không được tin `total_amount` từ client, và xóa giỏ hàng sau thanh toán thành công.
- **FR-10 - Trạng thái đơn hàng:** bao phủ trạng thái khởi đầu `pending`, các chuyển đổi hợp lệ, các nhánh hủy hợp lệ, chuyển tắt không hợp lệ, ràng buộc user không được hủy đơn khi đang `shipping`, và hai trạng thái kết thúc `delivered`/`canceled`.

### Trạng thái test case

| Chức năng | Passed | Failed | Blocked | Not Run | Tổng |
|---|---:|---:|---:|---:|---:|
| Đăng ký tài khoản | 9 | 6 | 0 | 0 | 15 |
| Đăng nhập và khóa tài khoản | 6 | 9 | 0 | 0 | 15 |
| Thanh toán | 0 | 0 | 0 | 6 | 6 |
| Trạng thái đơn hàng | 0 | 2 | 0 | 12 | 14 |
| **Tổng** | **15** | **17** | **0** | **18** | **50** |

Ghi chú: với chức năng thanh toán, trạng thái trong test case hiện vẫn là `Not Run / None`. Tuy nhiên, đã có 3 bug report liên kết với `TC-CHECKOUT-UCT-004`, `TC-CHECKOUT-UCT-005` và `TC-CHECKOUT-UCT-006`, nên phần bug bên dưới vẫn ghi nhận các bug thanh toán đã được tạo.

### Tổng quan bug

Có **16 bug** liên quan trực tiếp đến các test case trong phạm vi của người thực hiện này.

| Requirement | Chức năng | Số bug | Severity |
|---|---|---:|---|
| FR-01 | Đăng ký tài khoản | 6 | 6 Major |
| FR-02 | Đăng nhập và khóa tài khoản | 5 | 1 Critical, 3 High, 1 Low |
| FR-08 | Thanh toán | 3 | 1 Critical, 2 Major |
| FR-10 | Trạng thái đơn hàng | 2 | 2 Major |
| **Tổng** |  | **16** | **2 Critical, 3 High, 10 Major, 1 Low** |

### Bug coverage theo requirement

**FR-01 - Đăng ký tài khoản:** có **6 bug Major**.

- `BUG-REGISTER-001`: mật khẩu hợp lệ theo FR-01 vẫn bị từ chối khi đăng ký thành công.
- `BUG-REGISTER-002`: email sai định dạng không được validate đúng theo FR-01.
- `BUG-REGISTER-003`: hệ thống không ngăn đăng ký bằng email đã tồn tại.
- `BUG-REGISTER-004`: form đăng ký thiếu trường xác nhận mật khẩu.
- `BUG-REGISTER-005`: hệ thống không validate trường hợp xác nhận mật khẩu không khớp.
- `BUG-REGISTER-006`: một tổ hợp pairwise invalid không được validate nhất quán.

**FR-02 - Đăng nhập và khóa tài khoản:** có **5 bug**, gồm **1 Critical**, **3 High** và **1 Low**.

- `BUG-FR02-001` - Critical: API đăng nhập trả về mật khẩu người dùng ở dạng không mã hóa.
- `BUG-FR02-002` - High: form đăng nhập dùng sai input type cho email và mật khẩu.
- `BUG-FR02-003` - High: tài khoản bị khóa sau 2 lần nhập sai mật khẩu, sớm hơn ngưỡng yêu cầu.
- `BUG-FR02-004` - Low: frontend không hiển thị đúng thông báo tài khoản bị khóa từ backend.
- `BUG-FR02-005` - High: thời gian khóa kéo dài khoảng 180 giây thay vì 30 giây.

**FR-08 - Thanh toán:** có **3 bug**, gồm **1 Critical** và **2 Major**.

- `BUG-CHECKOUT-001` - Major: tổng tiền thanh toán có thể chỉnh sửa trực tiếp trên UI.
- `BUG-CHECKOUT-002` - Critical: backend chấp nhận `total_amount` do client gửi lên.
- `BUG-CHECKOUT-003` - Major: giỏ hàng không được xóa sau khi thanh toán thành công.

**FR-10 - Trạng thái đơn hàng:** có **2 bug Major**.

- `BUG-ORDER-STT-001`: user vẫn hủy được đơn hàng đang ở trạng thái `shipping`.
- `BUG-ORDER-STT-002`: admin chuyển được đơn hàng đã `canceled` sang `delivered`.

---

## 23127381 - Lâm Chí Khải

### Tổng quan test case

Tổng cộng có **38 test case**.

| Chức năng | Requirement | Kỹ thuật thiết kế test | Số TC |
|---|---:|---|---:|
| Đăng ký tài khoản | FR-01 | Decision Table Testing, Pairwise | 7 |
| Quản lý hồ sơ cá nhân | FR-04 | Use Case Testing, Boundary Value Analysis | 4 |
| Quên mật khẩu / đặt lại mật khẩu | FR-03 | State Transition Testing | 12 |
| Áp dụng mã giảm giá / tính giảm giá | FR-09 | Decision Table Testing | 15 |
| **Tổng** | **4 FR** | **4 nhóm kỹ thuật** | **38** |

### Coverage của test case

- **FR-01 - Đăng ký tài khoản:** bao phủ luồng đăng ký thành công, thiếu họ tên, thiếu email, email sai định dạng, email trùng, thiếu mật khẩu, mật khẩu yếu, thiếu xác nhận mật khẩu và xác nhận mật khẩu không khớp; có thêm nhóm pairwise để kiểm tra các tổ hợp lỗi đầu vào.
- **FR-04 - Quản lý hồ sơ cá nhân:** bao phủ cập nhật hồ sơ hợp lệ, chặn số điện thoại không hợp lệ, không cho thay đổi email qua giao diện, và không cho thay đổi role của chính mình.
- **FR-03 - Quên mật khẩu / đặt lại mật khẩu:** bao phủ điều hướng sang quên mật khẩu, quay lại đăng nhập, email không hợp lệ hoặc chưa đăng ký, tạo OTP thành công, OTP sai, OTP sai định dạng, OTP thuộc email khác, mật khẩu mới không đạt chính sách, xác nhận mật khẩu không khớp, đặt lại mật khẩu thành công, không cho dùng lại OTP, và chặn truy cập thẳng bước reset khi chưa tạo OTP.
- **FR-09 - Áp dụng mã giảm giá / tính giảm giá:** bao phủ mã percent và fixed, điều kiện mã tồn tại/hoạt động, hết hạn hay còn hạn, ngưỡng đơn hàng tối thiểu, trạng thái đăng nhập hợp lệ, giới hạn sử dụng, và kiểm tra công thức giảm giá trên giá trị tổng đơn hàng.

### Trạng thái test case

| Chức năng | Passed | Failed | Blocked | Not Run | Tổng |
|---|---:|---:|---:|---:|---:|
| Đăng ký tài khoản | 0 | 0 | 0 | 7 | 7 |
| Quản lý hồ sơ cá nhân | 0 | 0 | 0 | 4 | 4 |
| Quên mật khẩu / đặt lại mật khẩu | 0 | 0 | 0 | 12 | 12 |
| Áp dụng mã giảm giá / tính giảm giá | 0 | 0 | 0 | 15 | 15 |
| **Tổng** | **0** | **0** | **0** | **38** | **38** |

Ghi chú: trong các file test case hiện có, trạng thái thực tế chỉ xuất hiện dưới dạng `Bản nháp`, `Draft` và `Ready for execution`. Không có file nào thể hiện kết quả `Pass` hoặc `Failed`, nên toàn bộ 38 test case được tổng hợp là **Not Run**.

### Tổng quan bug

Trong phạm vi của người thực hiện này, có **0 bug** được ghi nhận.

| Requirement | Chức năng | Số bug | Severity |
|---|---|---:|---|
| FR-01 | Đăng ký tài khoản | 0 | - |
| FR-03 | Quên mật khẩu / đặt lại mật khẩu | 0 | - |
| FR-04 | Quản lý hồ sơ cá nhân | 0 | - |
| FR-09 | Áp dụng mã giảm giá / tính giảm giá | 0 | - |
| **Tổng** |  | **0** | **-** |

### Bug coverage theo requirement

Chưa có bug coverage theo requirement vì các test case chưa được thực thi và chưa có bug nào được ghi nhận.

---

## 23127464 - Trần Minh Quang

### Tổng quan test case

Tổng cộng có **31 test case** được tạo trong phạm vi báo cáo.

| Nhóm test case | Requirement | Kỹ thuật thiết kế test |  Số TC |
| -------------- | ----------: | ---------------------- | -----: |
| `FR-05`        |       FR-05 | Domain Testing         |     10 |
| `FR-10`        |       FR-10 | Decision Table Testing |     12 |
| `FR-16-import` |       FR-16 | Use Case Testing       |      9 |
| **Tổng**       |        3 FR | 3 nhóm kỹ thuật        | **31** |

### Coverage của test case

Bộ test hiện bao phủ ba feature requirement chính:

- **FR-05 - Xem danh sách & Tìm kiếm sản phẩm (Domain Testing):** bao phủ hiển thị danh sách sản phẩm dạng lưới (grid layout) responsive trên các thiết bị mobile, tablet, desktop. Kiểm tra độ chuẩn xác của UI hiển thị (alt text của hình ảnh, định dạng giá tiền ₫ với phân cách hàng nghìn). Kiểm tra chức năng tìm kiếm sản phẩm theo tên (Happy path: từ khóa khớp kết quả; Edge cases: từ khóa rỗng, khoảng trắng, từ khóa không tồn tại). Bao phủ các trường hợp kiểm thử phi chức năng: hiệu năng hiển thị (loading state), trải nghiệm người dùng khi không có kết quả (empty state), cấu trúc SEO (chỉ có đúng 1 thẻ `<h1>`), và kiểm thử bảo mật (XSS qua thanh tìm kiếm/error rendering, SQL Injection ở backend khi gọi API tìm kiếm).
- **FR-10 - Trạng thái Đơn hàng (Decision Table Testing):** bao phủ các luồng chuyển đổi trạng thái hợp lệ trong State Machine (chuyển tiếp tuyến tính pending → confirmed → shipping → delivered, và luồng hủy đơn pending → canceled, confirmed → canceled, shipping → canceled). Bao phủ các ràng buộc trạng thái kết thúc (không cho phép chuyển tiếp khi đơn hàng đã ở trạng thái `delivered` hoặc `canceled`). Bao phủ các trường hợp chuyển đổi không hợp lệ như bỏ qua bước trung gian (pending → shipping), quay ngược trạng thái (confirmed → pending), và kiểm tra phân quyền (chỉ Admin mới có quyền hủy đơn `shipping`, User bị từ chối; User cố gọi API Admin để xác nhận đơn hàng).
- **FR-16 - Import sản phẩm từ CSV (Use Case Testing):** bao phủ luồng chính (Basic Flow: import thành công file CSV hợp lệ đầy đủ thông tin). Bao phủ dòng sự kiện thay thế (Alternate Flow: file chứa trường có dấu phẩy bọc trong nháy kép theo chuẩn RFC 4180). Bao phủ các dòng sự kiện ngoại lệ (Exception Flows: sai đuôi file không phải .csv, sai cấu trúc header, rỗng cột `name`, giá tiền `price` không hợp lệ (số âm), kiểm tra tính chất giao dịch nguyên tử rollback toàn bộ file khi có một dòng lỗi, payloads độc hại chứa mã độc XSS/SQL Injection, và lỗ hổng CSV Formula Injection).

### Trạng thái test case

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

### Tổng quan bug

Trong phạm vi báo cáo có **17 bug** liên quan trực tiếp đến các test case đã chọn.

| Requirement | Nhóm chức năng      | Số bug | Severity                         |
| ----------- | ------------------- | -----: | -------------------------------- |
| FR-05       | Homepage & Search   |      8 | 3 Critical, 3 Major, 2 Minor     |
| FR-10       | Order State Machine |      3 | 2 Critical, 1 Major              |
| FR-16       | Import CSV          |      6 | 1 Critical, 4 Major, 1 Minor     |
| **Tổng**    |                     | **17** | **6 Critical, 8 Major, 3 Minor** |

### Bug coverage theo requirement

**FR-05 - Homepage & Search:** có **8 bug**, gồm **3 Critical**, **3 Major** và **2 Minor**.

- `BUG-HOME-001` - Critical: XSS qua thanh tìm kiếm (dangerouslySetInnerHTML). Trình duyệt thực thi mã JavaScript khi nhập payload XSS vào thanh tìm kiếm. Lỗi vi phạm tại `frontend-web/src/pages/Home.jsx` dòng 64 do sử dụng `dangerouslySetInnerHTML={{ __html: search }}` trực tiếp với input người dùng.
- `BUG-HOME-002` - Critical: XSS qua error HTML rendering. Lỗi từ backend trả về response chứa HTML được render bằng `dangerouslySetInnerHTML` ở frontend, tạo lỗ hổng XSS thông qua error message injection. Lỗi vi phạm tại `frontend-web/src/pages/Home.jsx` dòng 71.
- `BUG-HOME-003` - Minor: Ảnh sản phẩm thiếu alt text mô tả. Thuộc tính `alt` của ảnh sản phẩm được hardcode là chuỗi rỗng (`alt=""`), vi phạm tiêu chuẩn SEO và hỗ trợ người dùng khuyết tật (Accessibility - WCAG 2.1 Level A). Lỗi vi phạm tại `frontend-web/src/pages/Home.jsx` dòng 82, cần thay bằng `alt={product.name}`.
- `BUG-HOME-004` - Major: Hiển thị đơn vị tiền sai (VND thay vì ₫). Giá hiển thị sai định dạng: `1,500,000 VND` thay vì ký hiệu chuẩn `1.500.000 ₫`, không đúng chuẩn hiển thị tiền tệ và phân cách hàng nghìn của Việt Nam. Lỗi vi phạm tại `frontend-web/src/pages/Home.jsx` dòng 87.
- `BUG-HOME-005` - Major: Không có trạng thái loading khi tải dữ liệu. Trang hiển thị trống hoàn toàn (blank page) trong thời gian chờ gọi API khi giả lập mạng chậm, không hiển thị spinner hay skeleton placeholder. Component `Home` thiếu cơ chế quản lý loading state.
- `BUG-HOME-006` - Major: Không hiển thị empty state khi không có kết quả tìm kiếm. Khi tìm kiếm không có kết quả, giao diện hiển thị vùng trống hoàn toàn mà không có thông báo hay gợi ý tìm kiếm lại cho người dùng do thiếu conditional rendering kiểm tra `products.length === 0`.
- `BUG-HOME-007` - Minor: Trang có 2 thẻ `<h1>` (vi phạm chuẩn SEO). Cả heading chính "Danh sách sản phẩm" (dòng 43) và dòng text đếm số lượng sản phẩm "Hiển thị X sản phẩm" (dòng 110) đều dùng thẻ `<h1>`, vi phạm HTML semantics.
- `BUG-HOME-008` - Critical: SQL Injection trong API tìm kiếm sản phẩm. Backend sử dụng string concatenation trực tiếp input người dùng vào câu SQL truy vấn SQLite (`WHERE name LIKE '%${searchQuery}%'`), cho phép thực thi SQL Injection để lấy toàn bộ dữ liệu hoặc DROP bảng. Lỗi vi phạm tại `backend/server.js` dòng 144, cần sửa thành parameterized query.

**FR-10 - Order State Machine:** có **3 bug**, gồm **2 Critical** và **1 Major**.

- `BUG-FR10-001` - Major: Admin hủy đơn hàng shipping — hành vi không nhất quán giữa API và giao diện. Hệ thống cho phép API hủy đơn hàng shipping thành công nhưng giao diện Admin có thể không hiển thị tùy chọn hủy rõ ràng cho đơn hàng shipping, hoặc luồng hủy không nhất quán giữa API và UI.
- `BUG-FR10-002` - Critical: User có thể hủy đơn hàng đang shipping — vi phạm ràng buộc State Machine FR-10. API endpoint `PUT /api/orders/:id/cancel` không kiểm tra trạng thái hiện tại của đơn hàng trước khi cho phép hủy, dẫn đến việc User có thể tự hủy đơn hàng đang giao, gây tổn thất về mặt vận chuyển (logistics).
- `BUG-FR10-003` - Critical: User có thể gọi API Admin để xác nhận đơn hàng — thiếu kiểm tra role trên API Admin orders. API `PUT /api/admin/orders/:id/status` không kiểm tra vai trò admin của token JWT gửi lên, cho phép tài khoản người dùng bình thường tự xác nhận đơn hàng từ pending sang confirmed.

**FR-16 - Import CSV:** có **6 bug**, gồm **1 Critical**, **4 Major** và **1 Minor**.

- `BUG-FR16-001` - Major: Lỗi parse dấu phẩy trong nháy kép (RFC 4180) khiến lệch cột dữ liệu. Hệ thống sử dụng hàm `split(",")` tại frontend nên tách nhầm dấu phẩy nằm trong dấu nháy kép của tên/mô tả sản phẩm thành cột mới, gây lệch cột và gán nhầm giá trị giá tiền thành chuỗi ký tự.
- `BUG-FR16-002` - Minor: Thiếu validation đuôi file tại Import CSV. Hệ thống không kiểm tra định dạng đuôi file ở cả frontend và backend, cố gắng đọc bất kỳ file nào (như `.txt`, `.xlsx`) được tải lên bằng `readAsText` và gửi dữ liệu lỗi lên backend.
- `BUG-FR16-003` - Major: Thiếu validation cấu trúc dòng header đầu tiên của file CSV. Hệ thống không kiểm tra cấu trúc dòng header đầu tiên, tự động parse các dòng tiếp theo và chèn giá trị mặc định/undefined/0 cho các cột bị thiếu vào cơ sở dữ liệu.
- `BUG-FR16-004` - Major: Cho phép import sản phẩm có giá tiền không phải số dương. Cả frontend và backend đều không kiểm tra ràng buộc giá tiền lớn hơn 0, đồng thời SQLite không có constraint `CHECK(price > 0)` khiến sản phẩm có giá âm hoặc bằng 0 vẫn được import thành công.
- `BUG-FR16-005` - Critical: Thiếu tính chất giao dịch nguyên tử (Atomic transaction) khi import. Backend thực hiện các câu lệnh chèn không đồng bộ bằng `stmt.run()` riêng lẻ mà không bọc trong Transaction, dẫn đến việc các dòng hợp lệ ở đầu file vẫn được chèn vào database dù dòng sau bị lỗi, vi phạm cơ chế rollback toàn bộ (All-or-nothing).
- `BUG-FR16-006` - Major: Lỗ hổng bảo mật CSV Formula Injection khi import. Hệ thống lưu nguyên văn chuỗi bắt đầu bằng các ký tự công thức (`=`, `+`, `-`, `@`) vào cơ sở dữ liệu mà không thực hiện xử lý hoặc escape, dẫn đến rủi ro thực thi mã độc trên máy tính của quản trị viên khi xuất/tải file báo cáo CSV sau này và mở bằng Excel.

---

## 23127475 - Ngô Hồng Thanh

### Tổng quan test case

Tổng cộng có **111 test case**.

| Chức năng | Requirement | Kỹ thuật thiết kế test | Số TC |
|---|---:|---|---:|
| Đăng nhập và khóa tài khoản | FR-02 | State Transition Testing | 9 |
| Quên mật khẩu & đặt lại mật khẩu Web | FR-03 | Domain Testing, Boundary Value Analysis, Use Case Testing | 30 |
| Xem lịch sử đơn hàng | FR-11 | Domain Testing, Boundary Value Analysis | 15 |
| Quản lý danh mục CRUD | FR-14 | Domain Testing, Boundary Value Analysis | 22 |
| Kiểm soát truy cập | FR-12 | Decision Table Testing, Pairwise Testing | 17 |
| Quên mật khẩu & đặt lại mật khẩu Mobile | FR-23 | Domain Testing, Boundary Value Analysis | 18 |
| **Tổng** | **6 FR** | **6 nhóm kỹ thuật** | **111** |

### Coverage của test case

Bộ test hiện bao phủ sáu feature requirement chính:

- **FR-02 - Đăng nhập và khóa tài khoản:** bao phủ các trạng thái guest, authenticated user, login failed count, locked account, hết thời gian khóa; các chuyển trạng thái khi đăng nhập đúng/sai, sai 1-2 lần chưa khóa, sai 3 lần khóa tài khoản, đang khóa vẫn bị từ chối và hết thời gian khóa thì đăng nhập lại.
- **FR-03 - Quên mật khẩu & đặt lại mật khẩu Web:** bao phủ luồng lấy OTP bằng email đã đăng ký, nút quay lại đăng nhập, email rỗng/sai định dạng/chưa đăng ký, reset thành công, reset khi chưa lấy OTP, OTP sai, OTP của email khác, mật khẩu yếu/rỗng, confirm mismatch, biên độ dài OTP và biên độ dài mật khẩu mới. Nhóm Use Case bổ sung coverage end-to-end theo actor goal và request OTP lại.
- **FR-11 - Xem lịch sử đơn hàng:** bao phủ user đã đăng nhập có/không có đơn hàng, nhiều đơn hàng, không lộ đơn hàng của user khác, xem chi tiết đơn của chính mình, từ chối truy cập chi tiết đơn người khác, hiển thị mã đơn/ngày đặt/tổng tiền/trạng thái và các biên 0/1/nhiều đơn.
- **FR-14 - Quản lý danh mục CRUD:** bao phủ admin/guest/user thường, xem danh sách, thêm/sửa/xóa danh mục hợp lệ, tên rỗng/chỉ khoảng trắng/Unicode, update/delete id không tồn tại, user thường thao tác qua API và các biên số lượng/tên danh mục.
- **FR-12 - Kiểm soát truy cập:** bao phủ Web Admin UI, nhóm API `/api/admin/*`, API ghi dữ liệu products/categories/coupons, trạng thái thiếu token, token sai, user token, admin token, endpoint public read; pairwise mở rộng theo resource-method-auth state cho các API ghi dữ liệu rủi ro.
- **FR-23 - Quên mật khẩu & đặt lại mật khẩu Mobile:** bao phủ luồng mobile tương đương FR-03: lấy OTP, nút quay lại login, email rỗng/sai/chưa đăng ký, reset bằng OTP hợp lệ/sai/khác email, mật khẩu yếu/rỗng, confirm mismatch, biên OTP và biên mật khẩu mới trên mobile.

### Trạng thái test case

| Chức năng | Passed | Failed | Blocked | Not Run | Tổng |
|---|---:|---:|---:|---:|---:|
| FR-02 - Đăng nhập và khóa tài khoản | 5 | 4 | 0 | 0 | 9 |
| FR-03 - Quên mật khẩu Web | 11 | 19 | 0 | 0 | 30 |
| FR-11 - Xem lịch sử đơn hàng | 13 | 2 | 0 | 0 | 15 |
| FR-14 - Quản lý danh mục CRUD | 13 | 9 | 0 | 0 | 22 |
| FR-12 - Kiểm soát truy cập | 11 | 5 | 1 | 0 | 17 |
| FR-23 - Quên mật khẩu Mobile | 8 | 8 | 2 | 0 | 18 |
| **Tổng** | **61** | **47** | **3** | **0** | **111** |

Ghi chú:

- FR-03 được tính từ hai test run: `FR-03-forgot-password-run.md` cho Domain Testing/BVA và `FR-03-forgot-password-use-case-run.md` cho Use Case Testing.
- FR-12 chưa nằm trong working tree hiện tại của branch đang mở; số liệu lấy từ `reports/main-report.md` tại commit `670a2b7` của branch `fr12-decision-table-testing`.

### Tổng quan bug

Trong phạm vi báo cáo có **29 bug report** liên quan trực tiếp đến các test case đã chọn.

| Requirement | Chức năng | Số bug | Severity |
|---|---|---:|---|
| FR-02 | Đăng nhập và khóa tài khoản | 3 | 2 Major, 1 Minor |
| FR-03 | Quên mật khẩu Web | 12 | 4 Critical, 8 Major |
| FR-11 | Xem lịch sử đơn hàng | 2 | 1 Critical, 1 Minor |
| FR-14 | Quản lý danh mục CRUD | 3 | 1 Critical, 2 Major |
| FR-12 | Kiểm soát truy cập | 5 | 4 Critical, 1 Major |
| FR-23 | Quên mật khẩu Mobile | 4 | 1 Critical, 3 Major |
| **Tổng** |  | **29** | **11 Critical, 16 Major, 2 Minor** |

Ghi chú: nhóm `BUG-FR03-UC-*` được tạo riêng cho Use Case Testing. Một số bug trùng bản chất với bug FR-03 Domain/BVA cũ nhưng được giữ riêng để trace về use-case-level coverage.

### Bug coverage theo requirement

**FR-02 - Đăng nhập và khóa tài khoản:** có **3 bug**, gồm **2 Major** và **1 Minor**.

- `BUG-FR02-001` - Major: tài khoản bị khóa sau 2 lần đăng nhập sai dù lần thứ 3 nhập đúng.
- `BUG-FR02-002` - Major: tài khoản bị khóa lâu hơn 30 giây sau khi đăng nhập sai.
- `BUG-FR02-003` - Minor: email sai định dạng vẫn gọi API login thay vì bị HTML5 validation chặn.

**FR-03 - Quên mật khẩu & đặt lại mật khẩu Web:** có **12 bug**, gồm **4 Critical** và **8 Major**.

- `BUG-FR03-001` - Major: OTP quên mật khẩu chỉ có 4 chữ số thay vì 6 chữ số.
- `BUG-FR03-002` - Major: trang Quên mật khẩu không có nút Quay lại đăng nhập.
- `BUG-FR03-003` - Major: email sai định dạng trong luồng quên mật khẩu báo lỗi `User not found`.
- `BUG-FR03-004` - Major: bước đặt lại mật khẩu thiếu ô Xác nhận mật khẩu mới.
- `BUG-FR03-005` - Critical: frontend quên mật khẩu từ chối mật khẩu mạnh hợp lệ và không gửi API reset.
- `BUG-FR03-UC-001` - Major: OTP quên mật khẩu trong use case reset chỉ có 4 chữ số thay vì 6 chữ số.
- `BUG-FR03-UC-002` - Major: luồng quên mật khẩu 2 bước không hiển thị Step Indicator.
- `BUG-FR03-UC-003` - Major: không có nút Quay lại đăng nhập ở bước lấy OTP của use case quên mật khẩu.
- `BUG-FR03-UC-004` - Major: email sai định dạng trong use case quên mật khẩu báo lỗi `User not found`.
- `BUG-FR03-UC-005` - Major: bước reset password thiếu trường Xác nhận mật khẩu mới.
- `BUG-FR03-UC-006` - Critical: frontend chặn mật khẩu mạnh hợp lệ trong use case reset password.
- `BUG-FR03-UC-007` - Critical: backend reset-password chấp nhận mật khẩu yếu hoặc rỗng.

**FR-11 - Xem lịch sử đơn hàng:** có **2 bug**, gồm **1 Critical** và **1 Minor**.

- `BUG-FR11-007` - Critical: user thường truy cập được chi tiết đơn hàng của user khác qua API.
- `BUG-FR11-012` - Minor: màu trạng thái Đã xác nhận và Đang giao khó phân biệt.

**FR-14 - Quản lý danh mục CRUD:** có **3 bug**, gồm **1 Critical** và **2 Major**.

- `BUG-FR14-001` - Critical: user thường có thể thêm, sửa và xóa danh mục qua API.
- `BUG-FR14-002` - Major: API danh mục không validate tên bắt buộc khi thêm hoặc cập nhật.
- `BUG-FR14-003` - Major: API cập nhật/xóa danh mục không tồn tại vẫn trả thông báo thành công.

**FR-12 - Kiểm soát truy cập:** có **5 bug**, gồm **4 Critical** và **1 Major** từ commit `670a2b7` của branch `fr12-decision-table-testing`.

- `BUG-FR12-001` - Critical: user thường có thể xóa user qua API Admin.
- `BUG-FR12-002` - Critical: API tạo sản phẩm cho phép request không có token.
- `BUG-FR12-003` - Major: user thường có thể gọi API Admin để xóa coupon.
- `BUG-FR12-004` - Critical: user thường có thể cập nhật sản phẩm qua API product.
- `BUG-FR12-005` - Critical: user thường có thể tạo category qua API category.

**FR-23 - Quên mật khẩu & đặt lại mật khẩu Mobile:** có **4 bug**, gồm **1 Critical** và **3 Major**.

- `BUG-FR23-001` - Critical: mobile không hiển thị OTP demo và OTP không đúng 6 chữ số.
- `BUG-FR23-002` - Major: mobile thiếu nút Quay lại đăng nhập ở bước lấy OTP.
- `BUG-FR23-003` - Major: mobile báo `User not found` cho email rỗng hoặc sai định dạng.
- `BUG-FR23-004` - Major: mobile thiếu ô Xác nhận mật khẩu mới ở bước đặt lại mật khẩu.
