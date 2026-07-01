# HW02 - Main Report

## 1. Scope

Các feature được kiểm thử:

| Feature | Tên feature | Platform |
| --- | --- | --- |
| FR-03 | Quên mật khẩu & Đặt lại mật khẩu | Web/API |
| FR-11 | Xem lịch sử đơn hàng | Web/API |
| FR-14 | Quản lý danh mục CRUD | Web Admin/API |
| FR-23 | Quên mật khẩu & Đặt lại mật khẩu trên Mobile | Mobile/API |

Nguồn đặc tả black-box:

- `requirement.md`
- `SystemRequirementsSpecification.md`
- `api_specification.md`
- UI/flow/API response quan sát được khi kiểm thử

## 2. Domain Testing Report

### 2.1 FR-03 - Domain Testing

#### Step 1 - Xác định phạm vi và tác nhân

FR-03 là luồng Quên mật khẩu và Đặt lại mật khẩu trên Web/API, gồm 2 bước:

1. Bước 1 - Lấy OTP: người dùng nhập email đã đăng ký để hệ thống sinh OTP.
2. Bước 2 - Reset password: người dùng nhập OTP, mật khẩu mới và xác nhận mật khẩu mới.

Tác nhân chính là người dùng chưa đăng nhập hoặc người dùng quên mật khẩu. Expected result được lấy từ `SystemRequirementsSpecification.md` và `api_specification.md`, không dựa trên source code.

#### Step 2 - Xác định biến đầu vào và trạng thái cần kiểm thử

| Nhóm | Biến / trạng thái | Nguồn đặc tả | Ý nghĩa kiểm thử |
| --- | --- | --- | --- |
| Bước 1 | Email | SRS FR-03, API `POST /api/forgot-password` | Quyết định hệ thống có sinh OTP hay không |
| Bước 1 | Step Indicator | SRS FR-03, GUI-02 | Giao diện phải thể hiện đây là luồng 2 bước |
| Bước 1 | Nút Quay lại đăng nhập | SRS FR-03 | Người dùng phải có đường quay lại Login |
| Luồng | Trạng thái đã/chưa lấy OTP | SRS FR-03 | Không được reset password nếu chưa có OTP hợp lệ |
| Bước 2 | OTP | SRS FR-03, API `POST /api/reset-password` | OTP phải đúng và thuộc email đã yêu cầu |
| Bước 2 | Mật khẩu mới | SRS FR-03 tham chiếu FR-01 | Mật khẩu mới phải là mật khẩu mạnh |
| Bước 2 | Xác nhận mật khẩu mới | SRS FR-03 | Hai trường mật khẩu phải khớp |

#### Step 3 - Phân hoạch tương đương

| Biến / trạng thái | Lớp hợp lệ | Lớp không hợp lệ / đặc biệt |
| --- | --- | --- |
| Email | Email đã đăng ký, đúng định dạng: `test@eshop.com` | Rỗng; sai định dạng; đúng định dạng nhưng chưa đăng ký |
| Nút Quay lại đăng nhập | Nút tồn tại và điều hướng về trang Đăng nhập | Không có nút hoặc nút không điều hướng đúng |
| Trạng thái luồng | Đã lấy OTP trước khi reset | Gửi reset khi chưa lấy OTP |
| OTP | OTP đúng cho chính email đã yêu cầu | Sai OTP; OTP của email khác |
| Mật khẩu mới | Đủ rule FR-01: >=8 ký tự, có chữ hoa, chữ thường, số, ký tự đặc biệt | Rỗng; yếu/thiếu một hoặc nhiều điều kiện mật khẩu mạnh |
| Xác nhận mật khẩu mới | Khớp mật khẩu mới | Không khớp mật khẩu mới |

#### Step 4 - Xác định ràng buộc liên biến

| Ràng buộc | Cách áp dụng vào test case |
| --- | --- |
| OTP phải gắn với email đã yêu cầu | Tạo TC-FR03-DT-009 để dùng OTP của email khác cho `test@eshop.com` |
| Reset password chỉ hợp lệ sau khi lấy OTP | Tạo TC-FR03-DT-007 để gửi reset khi chưa thực hiện bước lấy OTP |
| Mật khẩu mới và xác nhận mật khẩu mới phải khớp | Tạo TC-FR03-DT-011 để cô lập lỗi confirm mismatch |
| Khi kiểm thử một lớp lỗi, các biến còn lại giữ giá trị hợp lệ nếu có thể | Ví dụ TC-FR03-DT-008 chỉ làm sai OTP, còn mật khẩu mới và confirm giữ hợp lệ |

#### Step 5 - Tổng hợp test case từ các lớp tương đương

| Test case ID | Lớp miền được chọn | Lý do chọn / cách tổng hợp | Test case file |
| --- | --- | --- | --- |
| TC-FR03-DT-001 | Email hợp lệ đã đăng ký | Kiểm tra happy path của Bước 1: email thuộc lớp hợp lệ nên hệ thống phải sinh OTP 6 chữ số. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-001.md` |
| TC-FR03-DT-002 | Nút Quay lại đăng nhập hợp lệ | Tách yêu cầu điều hướng khỏi dữ liệu email để xác minh UI có đủ nút quay lại Login. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-002.md` |
| TC-FR03-DT-003 | Email rỗng | Đại diện lớp invalid "missing required email"; expected là không sinh OTP và báo lỗi bắt buộc nhập. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-003.md` |
| TC-FR03-DT-004 | Email sai định dạng | Đại diện lớp invalid format; expected là lỗi định dạng email, khác với lỗi email chưa đăng ký. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-004.md` |
| TC-FR03-DT-005 | Email chưa đăng ký | Đại diện lớp đúng format nhưng không tồn tại; expected là từ chối vì FR-03 yêu cầu email đã đăng ký. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-005.md` |
| TC-FR03-DT-006 | Bước 2 hợp lệ toàn bộ | Kết hợp các lớp hợp lệ: đã lấy OTP, OTP đúng, mật khẩu mạnh và confirm khớp để kiểm tra happy path reset password. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-006.md` |
| TC-FR03-DT-007 | Chưa lấy OTP | Đại diện lỗi trạng thái luồng; các input reset còn lại dùng giá trị hợp lệ để lỗi chỉ đến từ việc chưa có OTP hợp lệ. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-007.md` |
| TC-FR03-DT-008 | OTP sai | Đại diện lớp OTP sai giá trị; email và mật khẩu mới giữ hợp lệ để cô lập lỗi OTP. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-008.md` |
| TC-FR03-DT-009 | OTP của email khác | Đại diện ràng buộc liên biến email-OTP; kiểm tra OTP không được dùng chéo giữa các tài khoản. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-009.md` |
| TC-FR03-DT-010 | Mật khẩu mới yếu | Đại diện lớp invalid password strength; OTP và confirm giữ hợp lệ để lỗi tập trung ở password mới. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-010.md` |
| TC-FR03-DT-011 | Confirm password không khớp | Đại diện lớp invalid confirm mismatch; mật khẩu mới vẫn mạnh để cô lập lỗi xác nhận mật khẩu. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-011.md` |
| TC-FR03-DT-012 | Mật khẩu mới rỗng | Đại diện lớp missing required password; expected là từ chối reset và không đổi mật khẩu. | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-012.md` |

### 2.2 FR-11 - Domain Testing

#### Step 1 - Xác định phạm vi và tác nhân

FR-11 là chức năng Xem lịch sử đơn hàng của user trên Web/API.

Tác nhân chính là người dùng thông thường đã đăng nhập. Các kiểm tra bảo mật bổ sung dùng trạng thái guest/chưa đăng nhập và user khác để xác minh rule "người dùng chỉ xem được đơn hàng của chính mình". Expected result được lấy từ `SystemRequirementsSpecification.md` FR-11, FR-10, GUI-01 và `api_specification.md` endpoint `GET /api/orders/my-orders`, `GET /api/orders/:id`.

#### Step 2 - Xác định biến đầu vào và trạng thái cần kiểm thử

| Nhóm | Biến / trạng thái | Nguồn đặc tả | Ý nghĩa kiểm thử |
| --- | --- | --- | --- |
| Auth | Session/token | API yêu cầu `Authorization: Bearer <token>` | Quyết định user có được xem lịch sử đơn hàng hay không |
| Ownership | User sở hữu đơn hàng | SRS FR-11 | Chỉ hiển thị/truy cập đơn của chính user đang đăng nhập |
| Dữ liệu | Số lượng đơn hàng | SRS FR-11, API `GET /api/orders/my-orders` | Kiểm tra danh sách rỗng, một đơn, nhiều đơn |
| Chi tiết | Order id | API `GET /api/orders/:id` | Kiểm tra order id thuộc chính user hoặc thuộc user khác |
| Hiển thị | Mã đơn | SRS FR-11 | Trường bắt buộc trong danh sách lịch sử đơn hàng |
| Hiển thị | Ngày đặt | SRS FR-11 | Trường bắt buộc trong danh sách lịch sử đơn hàng |
| Hiển thị | Tổng tiền | SRS FR-11, GUI-01 | Trường bắt buộc, cần định dạng tiền tệ rõ ràng |
| Hiển thị | Trạng thái hiện tại | SRS FR-11, FR-10 | Trạng thái phải dịch tiếng Việt và phân biệt màu sắc |

#### Step 3 - Phân hoạch tương đương

| Biến / trạng thái | Lớp hợp lệ | Lớp không hợp lệ / đặc biệt |
| --- | --- | --- |
| Session/token | User đăng nhập với token hợp lệ | Chưa đăng nhập/không có token |
| Ownership trong danh sách | Danh sách chỉ gồm đơn của user hiện tại | Danh sách có đơn của user khác |
| Order id chi tiết | Order id thuộc user hiện tại | Order id thuộc user khác |
| Số lượng đơn | User có 1 hoặc nhiều đơn | User có 0 đơn, cần hiển thị trạng thái rỗng đúng |
| Mã đơn | Mã đơn/id hiển thị rõ cho từng đơn | Thiếu mã đơn hoặc mã không phân biệt được các đơn |
| Ngày đặt | Ngày đặt hiển thị rõ và khớp dữ liệu | Thiếu ngày đặt hoặc ngày không đọc được |
| Tổng tiền | Tổng tiền hiển thị đúng, có `₫` và phân cách hàng nghìn | Thiếu tổng tiền hoặc sai định dạng tiền tệ |
| Trạng thái | `pending`, `confirmed`, `shipping`, `delivered`, `canceled` được dịch tiếng Việt và có màu phân biệt | Hiển thị raw status tiếng Anh, dịch mơ hồ hoặc màu không phân biệt |

#### Step 4 - Xác định ràng buộc liên biến

| Ràng buộc | Cách áp dụng vào test case |
| --- | --- |
| Token xác định user hiện tại | Tạo TC-FR11-DT-001 cho token hợp lệ và TC-FR11-DT-002 cho trạng thái không có token |
| Order ownership phụ thuộc vào user trong token | Tạo TC-FR11-DT-005 để kiểm tra danh sách không lẫn đơn user khác và TC-FR11-DT-007 để thử truy cập chi tiết đơn user khác |
| Chi tiết đơn chỉ hợp lệ khi order id thuộc owner | Tạo TC-FR11-DT-006 cho own order id và TC-FR11-DT-007 cho other user's order id |
| Các trường hiển thị phải đúng trên từng đơn trong danh sách | Tách TC-FR11-DT-008, DT-009, DT-010 để dễ định vị lỗi thiếu mã đơn, ngày đặt hoặc tổng tiền |
| Status là enum nhưng yêu cầu UI gồm cả ngôn ngữ và màu sắc | Tách TC-FR11-DT-011 cho tiếng Việt và TC-FR11-DT-012 cho màu sắc để isolate lỗi text và lỗi visual |

#### Step 5 - Tổng hợp test case từ các lớp tương đương

| Test case ID | Lớp miền được chọn | Lý do chọn / cách tổng hợp | Test case file |
| --- | --- | --- | --- |
| TC-FR11-DT-001 | User đã đăng nhập và có đơn | Kiểm tra happy path của FR-11: token hợp lệ, user có đơn, danh sách lịch sử phải hiển thị dữ liệu cá nhân. | `tests/test-cases/FR-11-order-history/domain-testing/TC-FR11-DT-001.md` |
| TC-FR11-DT-002 | Chưa đăng nhập | Đại diện lớp invalid auth; API yêu cầu Bearer token nên Web/API không được trả lịch sử đơn hàng khi thiếu token. | `tests/test-cases/FR-11-order-history/domain-testing/TC-FR11-DT-002.md` |
| TC-FR11-DT-003 | User có 0 đơn | Đại diện special domain danh sách rỗng; expected là empty state rõ ràng và không hiển thị đơn của user khác. | `tests/test-cases/FR-11-order-history/domain-testing/TC-FR11-DT-003.md` |
| TC-FR11-DT-004 | User có nhiều đơn | Đại diện lớp dữ liệu nhiều bản ghi; kiểm tra danh sách không mất/gộp sai đơn khi user có nhiều order. | `tests/test-cases/FR-11-order-history/domain-testing/TC-FR11-DT-004.md` |
| TC-FR11-DT-005 | Danh sách có nguy cơ lẫn đơn user khác | Đại diện rule ownership ở list API/UI: token của `test@eshop.com` không được thấy order của `fr11.other@example.com`. | `tests/test-cases/FR-11-order-history/domain-testing/TC-FR11-DT-005.md` |
| TC-FR11-DT-006 | Order id thuộc user hiện tại | Kiểm tra miền hợp lệ của endpoint chi tiết đơn: owner được xem chi tiết đơn của chính mình. | `tests/test-cases/FR-11-order-history/domain-testing/TC-FR11-DT-006.md` |
| TC-FR11-DT-007 | Order id thuộc user khác | Đại diện miền invalid ownership ở endpoint chi tiết; expected là từ chối và không lộ dữ liệu. | `tests/test-cases/FR-11-order-history/domain-testing/TC-FR11-DT-007.md` |
| TC-FR11-DT-008 | Trường Mã đơn | Tách riêng yêu cầu hiển thị mã đơn để phát hiện lỗi thiếu identifier trong mỗi dòng lịch sử. | `tests/test-cases/FR-11-order-history/domain-testing/TC-FR11-DT-008.md` |
| TC-FR11-DT-009 | Trường Ngày đặt | Tách riêng yêu cầu hiển thị ngày đặt để kiểm tra thông tin thời gian của đơn hàng. | `tests/test-cases/FR-11-order-history/domain-testing/TC-FR11-DT-009.md` |
| TC-FR11-DT-010 | Trường Tổng tiền | Tách riêng yêu cầu tổng tiền và kết hợp GUI-01 về ký hiệu `₫`/phân cách hàng nghìn. | `tests/test-cases/FR-11-order-history/domain-testing/TC-FR11-DT-010.md` |
| TC-FR11-DT-011 | Dịch trạng thái sang tiếng Việt | Đại diện yêu cầu FR-11 về status label; bao phủ 5 trạng thái từ FR-10. | `tests/test-cases/FR-11-order-history/domain-testing/TC-FR11-DT-011.md` |
| TC-FR11-DT-012 | Màu sắc phân biệt trạng thái | Đại diện yêu cầu visual của FR-11; tách khỏi text để nếu label đúng nhưng màu sai vẫn ghi nhận được. | `tests/test-cases/FR-11-order-history/domain-testing/TC-FR11-DT-012.md` |

### 2.3 FR-14 - Domain Testing

#### Step 1 - Xác định phạm vi và tác nhân

FR-14 là chức năng quản lý danh mục trong Web Admin/API. Phạm vi kiểm thử gồm xem danh sách, thêm mới, cập nhật theo endpoint API công khai, và xóa danh mục.

Tác nhân chính là Admin. Các tác nhân phụ gồm Guest/chưa đăng nhập và User thường để kiểm tra rule phân quyền của FR-12: mọi API có tính ảnh hưởng dữ liệu như `POST/PUT/DELETE /api/categories` phải yêu cầu JWT hợp lệ và `role = 'admin'`. Expected result được lấy từ `SystemRequirementsSpecification.md` FR-12, FR-14 và `api_specification.md`.

#### Step 2 - Xác định biến đầu vào và trạng thái cần kiểm thử

| Nhóm | Biến / trạng thái | Nguồn đặc tả | Ý nghĩa kiểm thử |
| --- | --- | --- | --- |
| Auth | Session/token | SRS FR-12 | Quyết định người dùng có được vào Web Admin và thao tác dữ liệu hay không |
| Auth | Role trong token | SRS FR-12 | Chỉ `role = 'admin'` được phép gọi API thêm/sửa/xóa danh mục |
| Read | Danh sách danh mục | SRS FR-14, API `GET /api/categories` | Admin phải xem được danh mục hiện có |
| Create/Update | Tên danh mục | SRS FR-14, API body `{"name":"Tên DM"}` | Tên danh mục là input bắt buộc, không được rỗng |
| Update | Category id | API `PUT /api/categories/:id` | Id phải tồn tại nếu cập nhật danh mục |
| Delete | Category id | API `DELETE /api/categories/:id` | Id phải tồn tại nếu xóa danh mục |

#### Step 3 - Phân hoạch tương đương

| Biến / trạng thái | Lớp hợp lệ | Lớp không hợp lệ / đặc biệt |
| --- | --- | --- |
| Session/token | Admin đã đăng nhập với JWT hợp lệ | Guest không có token; token user thường |
| Role | `role = 'admin'` | `role = 'user'` hoặc thiếu role admin |
| Category list | Danh sách rỗng, một danh mục, nhiều danh mục | Lỗi tải danh sách hoặc user không có quyền admin nhưng vẫn xem được admin page |
| Category name | Chuỗi khác rỗng, ví dụ `FR14 Test Accessories` | Rỗng; chỉ gồm khoảng trắng |
| Category name special | Unicode tiếng Việt, ví dụ `Đồ gia dụng FR14` | Lỗi encoding, mất dấu hoặc hiển thị sai |
| Category id | Id danh mục tồn tại | Id không tồn tại; id đã bị xóa; id của thao tác không được phép với user thường |

#### Step 4 - Xác định ràng buộc liên biến

| Ràng buộc | Cách áp dụng vào test case |
| --- | --- |
| Quyền thao tác phụ thuộc đồng thời vào token hợp lệ và role admin | Tạo TC-FR14-DT-002/003 cho Web Admin route, TC-FR14-DT-004/005/013/016 cho API mutation khi thiếu quyền |
| Khi kiểm tra lỗi phân quyền, dữ liệu category name/id giữ hợp lệ | Ví dụ TC-FR14-DT-005 dùng tên hợp lệ để lỗi chỉ đến từ `role = user` |
| Tên danh mục bắt buộc áp dụng cho create và update | Tạo TC-FR14-DT-007/008 cho create invalid name và TC-FR14-DT-011 cho update invalid name |
| Update/Delete chỉ hợp lệ với category id tồn tại | Tạo TC-FR14-DT-010/014 cho id tồn tại và TC-FR14-DT-012/015 cho id không tồn tại hoặc đã xóa |
| Unicode là miền hợp lệ cần bảo toàn khi lưu/hiển thị | Tạo TC-FR14-DT-009 để kiểm tra tên tiếng Việt có dấu |

#### Step 5 - Tổng hợp test case từ các lớp tương đương

| Test case ID | Lớp miền được chọn | Lý do chọn / cách tổng hợp | Test case file |
| --- | --- | --- | --- |
| TC-FR14-DT-001 | Admin xem danh sách | Happy path của Read: admin hợp lệ phải xem được danh sách danh mục trên Web Admin/API. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-001.md` |
| TC-FR14-DT-002 | Guest truy cập admin page | Đại diện lớp thiếu token; guest không được thấy dữ liệu hoặc thao tác quản trị. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-002.md` |
| TC-FR14-DT-003 | User thường truy cập admin page | Đại diện lớp token hợp lệ nhưng sai role; kiểm tra phân hệ Admin chỉ dành cho admin. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-003.md` |
| TC-FR14-DT-004 | Guest gọi API create | Kiểm tra `POST /api/categories` khi thiếu token; tên giữ hợp lệ để cô lập lỗi xác thực. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-004.md` |
| TC-FR14-DT-005 | User thường gọi API create | Kiểm tra `POST /api/categories` khi có token nhưng không có role admin. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-005.md` |
| TC-FR14-DT-006 | Admin create tên hợp lệ | Happy path của Create: tên khác rỗng phải tạo được category mới. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-006.md` |
| TC-FR14-DT-007 | Create tên rỗng | Đại diện lớp invalid required field; expected là từ chối và không tạo category rỗng. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-007.md` |
| TC-FR14-DT-008 | Create tên chỉ khoảng trắng | Đại diện special invalid domain: sau trim tương đương rỗng, không nên tạo record khó nhìn. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-008.md` |
| TC-FR14-DT-009 | Create tên Unicode tiếng Việt | Đại diện special valid domain; kiểm tra hệ thống lưu và hiển thị đúng dấu tiếng Việt. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-009.md` |
| TC-FR14-DT-010 | Admin update id tồn tại | Kiểm tra phần Update của CRUD theo endpoint `PUT /api/categories/:id`; id và tên mới đều hợp lệ. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-010.md` |
| TC-FR14-DT-011 | Update tên rỗng | Kiểm tra rule tên bắt buộc khi sửa danh mục, không chỉ khi thêm mới. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-011.md` |
| TC-FR14-DT-012 | Update id không tồn tại | Đại diện invalid route parameter; hệ thống không được tạo mới ngầm hoặc sửa nhầm category khác. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-012.md` |
| TC-FR14-DT-013 | User thường update | Kiểm tra phân quyền của `PUT /api/categories/:id` với token user thường. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-013.md` |
| TC-FR14-DT-014 | Admin delete id tồn tại | Happy path của Delete: admin xóa đúng danh mục được chọn. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-014.md` |
| TC-FR14-DT-015 | Delete id không tồn tại/đã xóa | Đại diện invalid delete target và xóa lặp lại; danh sách phải vẫn nhất quán. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-015.md` |
| TC-FR14-DT-016 | User thường delete | Kiểm tra phân quyền của `DELETE /api/categories/:id` với token user thường. | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-016.md` |

### 2.4 FR-23 - Domain Testing

#### Step 1 - Xác định phạm vi và tác nhân

FR-23 là luồng Quên mật khẩu và Đặt lại mật khẩu trên Mobile, tương đương FR-03 nhưng được kiểm thử trên ứng dụng React Native/Expo.

1. Bước 1 - Lấy OTP: người dùng mobile nhập email đã đăng ký để hệ thống sinh OTP.
2. Bước 2 - Reset password: người dùng mobile nhập OTP, mật khẩu mới và xác nhận mật khẩu mới.

Tác nhân chính là người dùng mobile chưa đăng nhập hoặc người dùng quên mật khẩu. Expected result được lấy từ `SystemRequirementsSpecification.md` FR-23 và `api_specification.md` endpoint `POST /api/forgot-password`, `POST /api/reset-password`.

#### Step 2 - Xác định biến đầu vào và trạng thái cần kiểm thử

| Nhóm | Biến / trạng thái | Nguồn đặc tả | Ý nghĩa kiểm thử |
| --- | --- | --- | --- |
| Bước 1 | Email | SRS FR-23, API `POST /api/forgot-password` | Quyết định hệ thống có sinh OTP hay không |
| Bước 1 | Step Indicator mobile | SRS FR-23 | Màn hình mobile phải thể hiện đây là luồng 2 bước |
| Bước 1 | Nút Quay lại đăng nhập | SRS FR-23 | Người dùng mobile phải có đường quay lại màn hình Đăng nhập |
| Luồng | Trạng thái đã/chưa lấy OTP | SRS FR-23 | Không được reset password nếu chưa có OTP hợp lệ |
| Bước 2 | OTP | SRS FR-23, API `POST /api/reset-password` | OTP phải đúng 6 chữ số và thuộc email đã yêu cầu |
| Bước 2 | Mật khẩu mới | SRS FR-23 tham chiếu FR-01 | Mật khẩu mới phải là mật khẩu mạnh |
| Bước 2 | Xác nhận mật khẩu mới | SRS FR-23 | Hai trường mật khẩu phải khớp |
| Bước 2 | Hiển thị lỗi mobile | SRS FR-23 | Lỗi OTP sai, mật khẩu yếu, confirm mismatch phải rõ ràng trên mobile |
| Sau reset | Điều hướng | SRS FR-23 | Sau khi reset thành công phải về màn hình Đăng nhập |

#### Step 3 - Phân hoạch tương đương

| Biến / trạng thái | Lớp hợp lệ | Lớp không hợp lệ / đặc biệt |
| --- | --- | --- |
| Email | Email đã đăng ký, đúng định dạng: `test@eshop.com` | Rỗng; sai định dạng; đúng định dạng nhưng chưa đăng ký |
| Nút Quay lại đăng nhập | Nút tồn tại và điều hướng về màn hình Đăng nhập | Không có nút hoặc nút không điều hướng đúng |
| Trạng thái luồng | Đã lấy OTP trước khi reset | Gửi reset khi chưa lấy OTP |
| OTP | OTP đúng 6 chữ số cho chính email đã yêu cầu | Sai OTP; OTP của email khác |
| Mật khẩu mới | Đủ rule FR-01: >=8 ký tự, có chữ hoa, chữ thường, số, ký tự đặc biệt | Rỗng; yếu/thiếu một hoặc nhiều điều kiện mật khẩu mạnh |
| Xác nhận mật khẩu mới | Khớp mật khẩu mới | Không khớp mật khẩu mới |
| Điều hướng sau reset | Reset thành công rồi về màn hình Đăng nhập | Không điều hướng hoặc ở lại màn hình reset sau khi thành công |

#### Step 4 - Xác định ràng buộc liên biến

| Ràng buộc | Cách áp dụng vào test case |
| --- | --- |
| OTP phải gắn với email đã yêu cầu | Tạo TC-FR23-DT-009 để dùng OTP của email phụ cho `test@eshop.com` |
| Reset password chỉ hợp lệ sau khi lấy OTP | Tạo TC-FR23-DT-007 để gửi reset khi chưa thực hiện bước lấy OTP |
| Mật khẩu mới và xác nhận mật khẩu mới phải khớp | Tạo TC-FR23-DT-011 để cô lập lỗi confirm mismatch |
| Lỗi trên mobile phải rõ ràng với OTP sai, mật khẩu yếu, confirm mismatch | Gắn expected result rõ ràng vào TC-FR23-DT-008, TC-FR23-DT-010 và TC-FR23-DT-011 |
| Reset thành công phải điều hướng về Đăng nhập | Gắn expected result vào TC-FR23-DT-006 và các BVA case hợp lệ |

#### Step 5 - Tổng hợp test case từ các lớp tương đương

| Test case ID | Lớp miền được chọn | Lý do chọn / cách tổng hợp | Test case file |
| --- | --- | --- | --- |
| TC-FR23-DT-001 | Email hợp lệ đã đăng ký trên mobile | Kiểm tra happy path của Bước 1: email thuộc lớp hợp lệ nên hệ thống phải sinh OTP 6 chữ số và màn hình mobile chuyển tiếp đúng. | `tests/test-cases/FR-23-forgot-password-mobile/domain-testing/TC-FR23-DT-001.md` |
| TC-FR23-DT-002 | Nút Quay lại đăng nhập hợp lệ | Tách yêu cầu điều hướng mobile khỏi dữ liệu email để xác minh màn hình lấy OTP có đủ đường quay lại Login. | `tests/test-cases/FR-23-forgot-password-mobile/domain-testing/TC-FR23-DT-002.md` |
| TC-FR23-DT-003 | Email rỗng | Đại diện lớp invalid "missing required email"; expected là không sinh OTP và báo lỗi bắt buộc nhập trên mobile. | `tests/test-cases/FR-23-forgot-password-mobile/domain-testing/TC-FR23-DT-003.md` |
| TC-FR23-DT-004 | Email sai định dạng | Đại diện lớp invalid format; expected là lỗi định dạng email rõ ràng, khác với lỗi email chưa đăng ký. | `tests/test-cases/FR-23-forgot-password-mobile/domain-testing/TC-FR23-DT-004.md` |
| TC-FR23-DT-005 | Email chưa đăng ký | Đại diện lớp đúng format nhưng không tồn tại; expected là từ chối vì FR-23 yêu cầu email đã đăng ký. | `tests/test-cases/FR-23-forgot-password-mobile/domain-testing/TC-FR23-DT-005.md` |
| TC-FR23-DT-006 | Bước 2 hợp lệ toàn bộ | Kết hợp các lớp hợp lệ: đã lấy OTP, OTP đúng, mật khẩu mạnh, confirm khớp và kiểm tra điều hướng về Login sau reset thành công. | `tests/test-cases/FR-23-forgot-password-mobile/domain-testing/TC-FR23-DT-006.md` |
| TC-FR23-DT-007 | Chưa lấy OTP | Đại diện lỗi trạng thái luồng; các input reset còn lại dùng giá trị hợp lệ để lỗi chỉ đến từ việc chưa có OTP hợp lệ. | `tests/test-cases/FR-23-forgot-password-mobile/domain-testing/TC-FR23-DT-007.md` |
| TC-FR23-DT-008 | OTP sai | Đại diện lớp OTP sai giá trị; email và mật khẩu mới giữ hợp lệ để cô lập lỗi OTP và kiểm tra thông báo lỗi mobile. | `tests/test-cases/FR-23-forgot-password-mobile/domain-testing/TC-FR23-DT-008.md` |
| TC-FR23-DT-009 | OTP của email khác | Đại diện ràng buộc liên biến email-OTP; kiểm tra OTP không được dùng chéo giữa các tài khoản. | `tests/test-cases/FR-23-forgot-password-mobile/domain-testing/TC-FR23-DT-009.md` |
| TC-FR23-DT-010 | Mật khẩu mới yếu | Đại diện lớp invalid password strength; OTP và confirm giữ hợp lệ để lỗi tập trung ở password mới và thông báo mobile. | `tests/test-cases/FR-23-forgot-password-mobile/domain-testing/TC-FR23-DT-010.md` |
| TC-FR23-DT-011 | Confirm password không khớp | Đại diện lớp invalid confirm mismatch; mật khẩu mới vẫn mạnh để cô lập lỗi xác nhận mật khẩu và thông báo mobile. | `tests/test-cases/FR-23-forgot-password-mobile/domain-testing/TC-FR23-DT-011.md` |
| TC-FR23-DT-012 | Mật khẩu mới rỗng | Đại diện lớp missing required password; expected là từ chối reset và không đổi mật khẩu. | `tests/test-cases/FR-23-forgot-password-mobile/domain-testing/TC-FR23-DT-012.md` |

## 3. Boundary Value Analysis Report

### 3.1 FR-03 - BVA

#### Boundary Analysis Summary

| Variable | Constraint Source | Boundary Points |
| --- | --- | --- |
| OTP length | SRS FR-03: OTP 6 chữ số | 5 (OFF-), 6 (ON), 7 (OFF+) |
| newPassword.length | SRS FR-03 tham chiếu rule mật khẩu mạnh FR-01: tối thiểu 8 ký tự | 7 (OFF-), 8 (ON), 9 (OFF+) |

#### Step-by-Step Test Case Derivation

| Test case ID | Step-by-step explanation of how the test case was derived | Test case file |
| --- | --- | --- |
| TC-FR03-BVA-001 | Chọn điểm ON của OTP length: OTP hệ thống sinh phải đúng 6 chữ số. Các input khác giữ hợp lệ để xác nhận điểm biên được chấp nhận. | `tests/test-cases/FR-03-forgot-password/bva/TC-FR03-BVA-001.md` |
| TC-FR03-BVA-002 | Chọn điểm OFF- của OTP length: 5 chữ số, nhỏ hơn ràng buộc đúng 6 chữ số. Expected là bị từ chối. | `tests/test-cases/FR-03-forgot-password/bva/TC-FR03-BVA-002.md` |
| TC-FR03-BVA-003 | Chọn điểm OFF+ của OTP length: 7 chữ số, lớn hơn ràng buộc đúng 6 chữ số. Expected là bị từ chối. | `tests/test-cases/FR-03-forgot-password/bva/TC-FR03-BVA-003.md` |
| TC-FR03-BVA-004 | Chọn điểm OFF- của độ dài mật khẩu mới: 7 ký tự. Chuỗi vẫn có đủ loại ký tự để lỗi chỉ do length. | `tests/test-cases/FR-03-forgot-password/bva/TC-FR03-BVA-004.md` |
| TC-FR03-BVA-005 | Chọn điểm ON của độ dài mật khẩu mới: đúng 8 ký tự và đủ rule mật khẩu mạnh. Expected là được chấp nhận. | `tests/test-cases/FR-03-forgot-password/bva/TC-FR03-BVA-005.md` |
| TC-FR03-BVA-006 | Chọn điểm OFF+ theo min boundary: 9 ký tự, vẫn là giá trị hợp lệ vì lớn hơn min và đủ rule mật khẩu mạnh. | `tests/test-cases/FR-03-forgot-password/bva/TC-FR03-BVA-006.md` |

### 3.2 FR-11 - BVA

#### Boundary Analysis Summary

| Variable | Constraint Source | Boundary Points |
| --- | --- | --- |
| Số lượng đơn hàng trong lịch sử cá nhân | SRS FR-11 yêu cầu xem lịch sử đơn hàng cá nhân; API không nêu pagination/filter, nên boundary có căn cứ là số lượng đơn trả về trong danh sách | 0 đơn, 1 đơn, nhiều đơn |

#### Step-by-Step Test Case Derivation

| Test case ID | Step-by-step explanation of how the test case was derived | Test case file |
| --- | --- | --- |
| TC-FR11-BVA-001 | Chọn điểm biên 0 đơn: đây là minimum count hợp lệ của lịch sử cá nhân, expected là empty state rõ ràng và không hiển thị dữ liệu user khác. | `tests/test-cases/FR-11-order-history/bva/TC-FR11-BVA-001.md` |
| TC-FR11-BVA-002 | Chọn điểm ngay sau min là 1 đơn: expected là hiển thị đúng một đơn, không hiển thị empty state và không nhân bản dòng. | `tests/test-cases/FR-11-order-history/bva/TC-FR11-BVA-002.md` |
| TC-FR11-BVA-003 | Chọn representative above min là nhiều đơn vì SRS/API không nêu max hoặc page size; expected là danh sách hiển thị được nhiều đơn của cùng user. | `tests/test-cases/FR-11-order-history/bva/TC-FR11-BVA-003.md` |

### 3.3 FR-14 - BVA

#### Boundary Analysis Summary

| Variable | Constraint Source | Boundary Points |
| --- | --- | --- |
| `category.name.length` | SRS FR-14: tên danh mục là bắt buộc; SRS/API không nêu max length | 0 ký tự (OFF-), 1 ký tự (ON), 2 ký tự (ON+) |
| Số lượng danh mục trong list | SRS FR-14 yêu cầu Admin xem danh mục; API không nêu pagination/page size | 0 danh mục, 1 danh mục, nhiều danh mục |

#### Step-by-Step Test Case Derivation

| Test case ID | Step-by-step explanation of how the test case was derived | Test case file |
| --- | --- | --- |
| TC-FR14-BVA-001 | Chọn điểm OFF- của min length: tên danh mục dài 0 ký tự vi phạm rule bắt buộc, expected là bị từ chối. | `tests/test-cases/FR-14-category-management/bva/TC-FR14-BVA-001.md` |
| TC-FR14-BVA-002 | Chọn điểm ON của min length: tên danh mục dài đúng 1 ký tự, expected là được chấp nhận vì khác rỗng. | `tests/test-cases/FR-14-category-management/bva/TC-FR14-BVA-002.md` |
| TC-FR14-BVA-003 | Chọn điểm ON+ ngay sau min: tên dài 2 ký tự, expected là được chấp nhận; không kiểm tra max vì đặc tả không nêu max. | `tests/test-cases/FR-14-category-management/bva/TC-FR14-BVA-003.md` |
| TC-FR14-BVA-004 | Chọn điểm biên 0 danh mục: minimum count hợp lệ của danh sách, expected là empty state/danh sách rỗng không lỗi. | `tests/test-cases/FR-14-category-management/bva/TC-FR14-BVA-004.md` |
| TC-FR14-BVA-005 | Chọn điểm ngay sau min là 1 danh mục: expected là hiển thị đúng một dòng, không empty state và không nhân bản. | `tests/test-cases/FR-14-category-management/bva/TC-FR14-BVA-005.md` |
| TC-FR14-BVA-006 | Chọn representative above min là nhiều danh mục vì SRS/API không nêu max/page size; expected là danh sách hiển thị nhiều item đúng. | `tests/test-cases/FR-14-category-management/bva/TC-FR14-BVA-006.md` |

### 3.4 FR-23 - BVA

#### Boundary Analysis Summary

| Variable | Constraint Source | Boundary Points |
| --- | --- | --- |
| OTP length | SRS FR-23: OTP 6 chữ số | 5 (OFF-), 6 (ON), 7 (OFF+) |
| newPassword.length | SRS FR-23 tham chiếu rule mật khẩu mạnh FR-01: tối thiểu 8 ký tự | 7 (OFF-), 8 (ON), 9 (OFF+) |

#### Step-by-Step Test Case Derivation

| Test case ID | Step-by-step explanation of how the test case was derived | Test case file |
| --- | --- | --- |
| TC-FR23-BVA-001 | Chọn điểm ON của OTP length: OTP hệ thống sinh trên mobile phải đúng 6 chữ số. Các input khác giữ hợp lệ để xác nhận điểm biên được chấp nhận. | `tests/test-cases/FR-23-forgot-password-mobile/bva/TC-FR23-BVA-001.md` |
| TC-FR23-BVA-002 | Chọn điểm OFF- của OTP length: 5 chữ số, nhỏ hơn ràng buộc đúng 6 chữ số. Expected là bị từ chối và lỗi hiển thị rõ trên mobile. | `tests/test-cases/FR-23-forgot-password-mobile/bva/TC-FR23-BVA-002.md` |
| TC-FR23-BVA-003 | Chọn điểm OFF+ của OTP length: 7 chữ số, lớn hơn ràng buộc đúng 6 chữ số. Expected là bị từ chối và lỗi hiển thị rõ trên mobile. | `tests/test-cases/FR-23-forgot-password-mobile/bva/TC-FR23-BVA-003.md` |
| TC-FR23-BVA-004 | Chọn điểm OFF- của độ dài mật khẩu mới: 7 ký tự. Chuỗi vẫn có đủ loại ký tự để lỗi chỉ do length. | `tests/test-cases/FR-23-forgot-password-mobile/bva/TC-FR23-BVA-004.md` |
| TC-FR23-BVA-005 | Chọn điểm ON của độ dài mật khẩu mới: đúng 8 ký tự và đủ rule mật khẩu mạnh. Expected là được chấp nhận và điều hướng về Login sau reset. | `tests/test-cases/FR-23-forgot-password-mobile/bva/TC-FR23-BVA-005.md` |
| TC-FR23-BVA-006 | Chọn điểm OFF+ theo min boundary: 9 ký tự, vẫn là giá trị hợp lệ vì lớn hơn min và đủ rule mật khẩu mạnh. | `tests/test-cases/FR-23-forgot-password-mobile/bva/TC-FR23-BVA-006.md` |

## 4. Execution Summary

| Feature | Technique | Designed | Executed | Passed | Failed | Blocked | Not Run | Related bugs |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR-03 | Domain Testing | 12 | 12 | 6 | 6 | 0 | 0 | BUG-FR03-001, BUG-FR03-002, BUG-FR03-003, BUG-FR03-004, BUG-FR03-005 |
| FR-03 | BVA | 6 | 6 | 1 | 5 | 0 | 0 | BUG-FR03-001, BUG-FR03-004, BUG-FR03-005 |
| FR-11 | Domain Testing | 12 | 12 | 10 | 2 | 0 | 0 | BUG-FR11-007, BUG-FR11-012 |
| FR-11 | BVA | 3 | 3 | 3 | 0 | 0 | 0 | None |
| FR-14 | Domain Testing | 16 | 16 | 8 | 8 | 0 | 0 | BUG-FR14-001, BUG-FR14-002, BUG-FR14-003 |
| FR-14 | BVA | 6 | 6 | 5 | 1 | 0 | 0 | BUG-FR14-002 |
| FR-23 | Domain Testing | 12 | 12 | 5 | 5 | 2 | 0 | BUG-FR23-001, BUG-FR23-002, BUG-FR23-003, BUG-FR23-004 |
| FR-23 | BVA | 6 | 6 | 3 | 3 | 0 | 0 | BUG-FR23-001, BUG-FR23-004 |

## 5. AI Gap Analysis Summary

| Feature | Technique | Missed test cases / bugs | Reason | Correction |
| --- | --- | --- | --- | --- |
| FR-03 | Domain Testing / BVA | AI ban đầu chưa tách rõ lỗi frontend và backend cho reset password; TC-FR03-DT-009 cũng phụ thuộc chuẩn bị tài khoản thứ hai qua UI nên bị cản bởi lỗi frontend. | Prompt/test design ban đầu tập trung vào expected result theo SRS, chưa dự phòng bước API verification khi UI bị chặn. | Gọi API trực tiếp để xác nhận backend sinh OTP 4 chữ số, email sai định dạng trả `User not found`, mật khẩu mạnh được backend chấp nhận, OTP của email khác bị từ chối đúng; cập nhật test run, bug reports và `ai-gap-analysis/FR-03-forgot-password.md`. |
| FR-11 | Domain Testing / BVA | Phát hiện 2 lỗi sau khi chạy: user thường truy cập được chi tiết đơn user khác qua API; màu `Đã xác nhận` và `Đang giao` khó phân biệt. | AI thiết kế đúng test ownership bằng API bổ trợ nhưng ban đầu chưa biết Web không có page chi tiết đơn; BVA 0/1/nhiều đơn không phát hiện lỗi vì lỗi nằm ở authorization và visual status. | Gọi API để xác nhận `GET /api/orders/4` trả dữ liệu user khác cho `test@eshop.com`; cập nhật test run, bug reports và `ai-gap-analysis/FR-11-order-history.md`. |
| FR-14 | Domain Testing / BVA | Phát hiện 3 nhóm lỗi sau khi chạy: user thường gọi được API thêm/sửa/xóa danh mục; API cho phép tên category rỗng/whitespace; update/delete id không tồn tại vẫn trả success. | AI thiết kế đúng các miền role, required name và nonexistent id; BVA min length phát hiện lỗi tên rỗng. AI không tạo duplicate/max length vì SRS/API không nêu rule có căn cứ. | Gọi API để xác nhận các lỗi bằng token user/admin, tạo `BUG-FR14-001` đến `BUG-FR14-003`, cập nhật test run, từng test case và `ai-gap-analysis/FR-14-category-management.md`. |
| FR-23 | Domain Testing / BVA | Sau khi chạy 18 test cases, phát hiện 4 nhóm lỗi: mobile không hiển thị OTP/OTP 4 chữ số, thiếu nút quay lại Login, email rỗng/sai định dạng báo `User not found`, và thiếu ô xác nhận mật khẩu mới. Có 2 test bị Blocked do không chuẩn bị được OTP trên mobile. | AI thiết kế đúng các miền FR-23 nhưng ban đầu chưa rà soát cấu hình IP mobile, và chưa dự phòng việc UI mobile không hiển thị OTP khiến một số case phụ thuộc setup bị chặn. | Sửa `frontend-mobile/App.js` sang IP LAN hiện tại để chạy test; gọi API để xác nhận `resetToken` dài 4 chữ số, email invalid trả `User not found`, OTP 5/7 bị từ chối, password 8/9 ký tự hợp lệ được backend chấp nhận; tạo `BUG-FR23-001` đến `BUG-FR23-004`, cập nhật test run, từng test case và `ai-gap-analysis/FR-23-forgot-password-mobile.md`. |
