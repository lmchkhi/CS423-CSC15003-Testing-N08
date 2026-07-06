# Báo cáo tổng hợp test case và bug theo phạm vi chọn lọc

23127062 - Lâm Vĩ Khang

## Tổng quan số lượng test case

Tổng cộng có **53 test case** được tạo trong phạm vi báo cáo.

| Nhóm test case | Requirement | Kỹ thuật thiết kế test | Số TC |
|---|---:|---|---:|
| `FR-01-register` | FR-01 | Domain Testing, Boundary Value Analysis | 16 |
| `FR-02-login` | FR-02 | Decision Table Testing | 13 |
| `checkout` | FR-08 | State Transition Testing | 12 |
| `coupon` | FR-09 | Use Case Testing | 12 |
| **Tổng** | 4 FR | 4 nhóm kỹ thuật | **53** |

## Coverage của test case

Bộ test hiện bao phủ bốn feature requirement chính:

- **FR-01 - Đăng ký tài khoản (Domain Testing + BVA):** bao phủ luồng đăng ký thành công với dữ liệu hợp lệ, kiểm tra domain của từng trường đầu vào bao gồm Họ Tên rỗng, Email rỗng, Email sai định dạng (thiếu `@`, thiếu domain), Email đã tồn tại, Mật khẩu rỗng, Mật khẩu quá ngắn, thiếu chữ hoa, thiếu chữ thường, thiếu chữ số, thiếu ký tự đặc biệt, Xác nhận mật khẩu không khớp. Bộ test còn có nhóm BVA kiểm tra biên độ dài mật khẩu: 7 ký tự (OFF⁻), 8 ký tự (ON — min) và 9 ký tự (OFF⁺).
- **FR-02 - Đăng nhập và khóa tài khoản (Decision Table Testing):** bao phủ kiểm tra UI trường Email dùng `type="email"`, HTML5 validation chặn email sai định dạng, đăng nhập thành công trả JWT Token, client lưu JWT sau đăng nhập, client gắn Bearer token vào request xác thực. Về luồng khóa tài khoản: lần sai thứ nhất chưa khóa, lần sai thứ hai chưa khóa, lần sai thứ ba kích hoạt khóa, lỗi đăng nhập không tiết lộ sự tồn tại tài khoản, khóa còn hiệu lực chặn cả credentials đúng và sai, tài khoản vẫn bị khóa ngay trước mốc 30 giây, đăng nhập lại được sau 30 giây, và đăng nhập thành công kết thúc chuỗi sai liên tiếp.
- **FR-08 - Thanh toán (State Transition Testing):** bao phủ mô hình chuyển trạng thái từ S0 (chưa đăng nhập) → S1 (đăng nhập, giỏ trống) → S2 (giỏ có sản phẩm, sẵn sàng thanh toán) → S3 (thanh toán thành công). Bao gồm đăng nhập với giỏ trống/có sản phẩm, thêm sản phẩm để chuyển S1 → S2, backend tự tính tổng tiền, chặn payload giả mạo `total_amount`, thanh toán thành công xóa giỏ, báo lỗi khi thanh toán thất bại, từ chối khi chưa đăng nhập/giỏ trống, không cho chỉnh sửa tổng tiền, từ chối gửi lại sau thanh toán, và hoàn tất chuỗi S0 → S3.
- **FR-09 - Mã giảm giá (Use Case Testing):** bao phủ Main Flow (áp dụng mã percent thành công), 3 Alternative Flow (mã fixed, tổng đơn đúng bằng ngưỡng tối thiểu, mã nhiều lượt sử dụng) và 8 Exception Flow (mã không tồn tại, mã không hoạt động, mã hết hạn, đơn dưới ngưỡng tối thiểu, thiếu JWT, JWT không hợp lệ, hết lượt sử dụng, mã sai chữ hoa/thường).

## Trạng thái test case

| Nhóm test case | Passed | Failed | Blocked | Not Run | Tổng |
|---|---:|---:|---:|---:|---:|
| `FR-01-register` | 0 | 0 | 16 | 0 | 16 |
| `FR-02-login` | 2 | 2 | 0 | 9 | 13 |
| `checkout` | 4 | 7 | 1 | 0 | 12 |
| `coupon` | 1 | 11 | 0 | 0 | 12 |
| **Tổng** | **7** | **20** | **17** | **9** | **53** |

Ghi chú:
- Nhóm `FR-01-register`: tất cả 16 TC đều bị **Blocked** bởi BUG-FR-01-001 (trang Đăng ký thiếu trường "Xác nhận mật khẩu"), nên không TC nào có thể thực thi đúng flow.
- Nhóm `FR-02-login`: 9 TC về luồng khóa tài khoản và Bearer token chưa được thực thi (Not Run).

## Tổng quan bug

Trong phạm vi báo cáo có **11 bug** liên quan trực tiếp đến các test case đã chọn.

| Requirement | Nhóm chức năng | Số bug | Severity |
|---|---|---:|---|
| FR-01 | Register | 1 | 1 Critical |
| FR-02 | Login | 0 | — |
| FR-08 | Checkout | 3 | 2 Critical, 1 Major |
| FR-09 | Coupon | 7 | 1 Critical, 2 Major, 4 Minor |
| **Tổng** |  | **11** | **4 Critical, 2 Major, 4 Minor** |

## Bug coverage theo requirement

### FR-01 - Register

Có **1 bug**, severity **Critical**:

- `BUG-FR-01-001` - Critical: trang Đăng ký thiếu trường "Xác nhận mật khẩu" dẫn đến không thể hoàn thành đăng ký và kiểm tra xác nhận mật khẩu. Tất cả 16 test case đều bị Blocked bởi bug này.

### FR-02 - Login

Chưa phát hiện bug trong phạm vi các test case đã thực thi (2 Passed, 2 Failed do UI không dùng đúng `type="email"`). Các TC liên quan đến luồng khóa tài khoản chưa được thực thi (Not Run).

### FR-08 - Checkout

Có **3 bug** với severity gồm **2 Critical** và **1 Major**:

- `BUG-FR08-001` - Critical: client có thể sửa và quyết định tổng tiền đơn hàng. Trang Checkout hiển thị tổng tiền dưới dạng `<input type="number">` có thể chỉnh sửa, backend chấp nhận `total_amount` từ client mà không tự tính lại.
- `BUG-FR08-002` - Major: thanh toán thành công không xóa giỏ hàng. Frontend không gọi `clearCart` sau thành công, backend cũng không xóa giỏ phía server.
- `BUG-FR08-003` - Critical: backend tạo đơn khi giỏ hàng trống hoặc gửi lại Checkout. UI và backend không kiểm tra giỏ hàng trước khi tạo đơn.

### FR-09 - Coupon

Có **7 bug** với severity gồm **1 Critical**, **2 Major** và **4 Minor**:

- `BUG-COUPON-001` - Critical: công thức mã percent tạo số tiền giảm âm và làm tổng tiền tăng. `SAVE10` giảm 10% nhưng trả `discount_amount = -3.600.000 ₫` và `final_amount = 4.000.000 ₫`.
- `BUG-COUPON-002` - Major: không tăng lượt sử dụng sau khi áp dụng mã thành công. Lượt sử dụng của `SAVE10`, `BIGBUY` và `VIP100` không được cập nhật.
- `BUG-COUPON-003` - Major: từ chối mã khi tổng đơn hàng đúng bằng ngưỡng tối thiểu. API dùng phép so sánh `>` thay vì `>=` nên từ chối khi `total = min_order_amount`.
- `BUG-COUPON-004` - Minor: thông báo không phân biệt mã không tồn tại và mã bị vô hiệu hóa. Cả ba trường hợp (mã không tồn tại, mã inactive, mã sai chữ hoa/thường) đều trả cùng một thông báo.
- `BUG-COUPON-005` - Minor: thông báo đơn hàng dưới ngưỡng không đúng nội dung kỳ vọng. Nội dung trả về khác với Expected Result đã phê duyệt.
- `BUG-COUPON-006` - Critical: API cho phép áp dụng mã khi thiếu hoặc sai JWT Token. Cả yêu cầu không có JWT và có JWT sai đều nhận HTTP 200 và áp dụng mã thành công.
- `BUG-COUPON-007` - Minor: thông báo hết lượt sử dụng không đúng nội dung kỳ vọng. API từ chối đúng nhưng nội dung thông báo khác với Expected Result.

