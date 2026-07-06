# Báo cáo tổng hợp test case và bug

Phạm vi: 23127475 - Ngô Hồng Thanh

## Nguồn dữ liệu

| Nhóm | Nguồn |
|---|---|
| FR-02, FR-03, FR-11, FR-14, FR-23 | Test case, test run và bug report đang có trong working tree hiện tại |
| FR-12 | Commit mới nhất của branch `fr12-decision-table-testing`: `670a2b7` - `Add decision table and pairwise test cases for access control (FR-12)` |

Ghi chú: FR-12 được lấy bằng cách đọc artifact từ branch `fr12-decision-table-testing`, gồm `tests/test-cases/FR-12-access-control/`, `reports/main-report.md` và `reports/bug-reports/BUG-FR12-001.md` đến `BUG-FR12-005.md`.

## Tổng quan số lượng test case

Tổng cộng có **111 test case** được tạo/ghi nhận trong phạm vi báo cáo.

| Chức năng | Requirement | Kỹ thuật thiết kế test | Số TC |
|---|---:|---|---:|
| Đăng nhập và khóa tài khoản | FR-02 | State Transition Testing | 9 |
| Quên mật khẩu & đặt lại mật khẩu Web | FR-03 | Domain Testing, Boundary Value Analysis, Use Case Testing | 30 |
| Xem lịch sử đơn hàng | FR-11 | Domain Testing, Boundary Value Analysis | 15 |
| Quản lý danh mục CRUD | FR-14 | Domain Testing, Boundary Value Analysis | 22 |
| Kiểm soát truy cập | FR-12 | Decision Table Testing, Pairwise Testing | 17 |
| Quên mật khẩu & đặt lại mật khẩu Mobile | FR-23 | Domain Testing, Boundary Value Analysis | 18 |
| **Tổng** | **6 FR** | **6 nhóm kỹ thuật** | **111** |

## Coverage của test case

Bộ test hiện bao phủ sáu feature requirement chính:

- **FR-02 - Đăng nhập và khóa tài khoản:** bao phủ các trạng thái guest, authenticated user, login failed count, locked account, hết thời gian khóa; các chuyển trạng thái khi đăng nhập đúng/sai, sai 1-2 lần chưa khóa, sai 3 lần khóa tài khoản, đang khóa vẫn bị từ chối và hết thời gian khóa thì đăng nhập lại.
- **FR-03 - Quên mật khẩu & đặt lại mật khẩu Web:** bao phủ luồng lấy OTP bằng email đã đăng ký, nút quay lại đăng nhập, email rỗng/sai định dạng/chưa đăng ký, reset thành công, reset khi chưa lấy OTP, OTP sai, OTP của email khác, mật khẩu yếu/rỗng, confirm mismatch, biên độ dài OTP và biên độ dài mật khẩu mới. Nhóm Use Case bổ sung coverage end-to-end theo actor goal và request OTP lại.
- **FR-11 - Xem lịch sử đơn hàng:** bao phủ user đã đăng nhập có/không có đơn hàng, nhiều đơn hàng, không lộ đơn hàng của user khác, xem chi tiết đơn của chính mình, từ chối truy cập chi tiết đơn người khác, hiển thị mã đơn/ngày đặt/tổng tiền/trạng thái và các biên 0/1/nhiều đơn.
- **FR-14 - Quản lý danh mục CRUD:** bao phủ admin/guest/user thường, xem danh sách, thêm/sửa/xóa danh mục hợp lệ, tên rỗng/chỉ khoảng trắng/Unicode, update/delete id không tồn tại, user thường thao tác qua API và các biên số lượng/tên danh mục.
- **FR-12 - Kiểm soát truy cập:** bao phủ Web Admin UI, nhóm API `/api/admin/*`, API ghi dữ liệu products/categories/coupons, trạng thái thiếu token, token sai, user token, admin token, endpoint public read; pairwise mở rộng theo resource-method-auth state cho các API ghi dữ liệu rủi ro.
- **FR-23 - Quên mật khẩu & đặt lại mật khẩu Mobile:** bao phủ luồng mobile tương đương FR-03: lấy OTP, nút quay lại login, email rỗng/sai/chưa đăng ký, reset bằng OTP hợp lệ/sai/khác email, mật khẩu yếu/rỗng, confirm mismatch, biên OTP và biên mật khẩu mới trên mobile.

## Trạng thái test case

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

## Tổng quan bug

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

## Bug coverage theo requirement

### FR-02 - Đăng nhập và khóa tài khoản

Có **3 bug** với severity gồm **2 Major** và **1 Minor**:

- `BUG-FR02-001` - Major: tài khoản bị khóa sau 2 lần đăng nhập sai dù lần thứ 3 nhập đúng.
- `BUG-FR02-002` - Major: tài khoản bị khóa lâu hơn 30 giây sau khi đăng nhập sai.
- `BUG-FR02-003` - Minor: email sai định dạng vẫn gọi API login thay vì bị HTML5 validation chặn.

### FR-03 - Quên mật khẩu & đặt lại mật khẩu Web

Có **12 bug** với severity gồm **4 Critical** và **8 Major**:

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

### FR-11 - Xem lịch sử đơn hàng

Có **2 bug** với severity gồm **1 Critical** và **1 Minor**:

- `BUG-FR11-007` - Critical: user thường truy cập được chi tiết đơn hàng của user khác qua API.
- `BUG-FR11-012` - Minor: màu trạng thái Đã xác nhận và Đang giao khó phân biệt.

### FR-14 - Quản lý danh mục CRUD

Có **3 bug** với severity gồm **1 Critical** và **2 Major**:

- `BUG-FR14-001` - Critical: user thường có thể thêm, sửa và xóa danh mục qua API.
- `BUG-FR14-002` - Major: API danh mục không validate tên bắt buộc khi thêm hoặc cập nhật.
- `BUG-FR14-003` - Major: API cập nhật/xóa danh mục không tồn tại vẫn trả thông báo thành công.

### FR-12 - Kiểm soát truy cập

Có **5 bug** với severity gồm **4 Critical** và **1 Major** từ commit `670a2b7` của branch `fr12-decision-table-testing`:

- `BUG-FR12-001` - Critical: user thường có thể xóa user qua API Admin.
- `BUG-FR12-002` - Critical: API tạo sản phẩm cho phép request không có token.
- `BUG-FR12-003` - Major: user thường có thể gọi API Admin để xóa coupon.
- `BUG-FR12-004` - Critical: user thường có thể cập nhật sản phẩm qua API product.
- `BUG-FR12-005` - Critical: user thường có thể tạo category qua API category.

### FR-23 - Quên mật khẩu & đặt lại mật khẩu Mobile

Có **4 bug** với severity gồm **1 Critical** và **3 Major**:

- `BUG-FR23-001` - Critical: mobile không hiển thị OTP demo và OTP không đúng 6 chữ số.
- `BUG-FR23-002` - Major: mobile thiếu nút Quay lại đăng nhập ở bước lấy OTP.
- `BUG-FR23-003` - Major: mobile báo `User not found` cho email rỗng hoặc sai định dạng.
- `BUG-FR23-004` - Major: mobile thiếu ô Xác nhận mật khẩu mới ở bước đặt lại mật khẩu.

## Nhận xét rủi ro chính

- Các lỗi nghiêm trọng tập trung nhiều ở nhóm **access control** và **authentication/password reset**, đặc biệt là API cho phép user thường hoặc request thiếu token thực hiện thao tác quản trị/ghi dữ liệu.
- FR-03 và FR-23 có nhiều lỗi tương đồng giữa Web và Mobile: OTP không đủ 6 chữ số, thiếu navigation về login, thiếu confirm password và message validation chưa đúng.
- FR-14 và FR-12 cùng cho thấy rủi ro phân quyền API danh mục: user thường vẫn có thể thao tác category qua API trong một số flow.
- FR-11 có một bug bảo mật quan trọng: user xem được chi tiết đơn hàng của user khác qua API, dù danh sách lịch sử đơn hàng chính đạt nhiều expected result.
