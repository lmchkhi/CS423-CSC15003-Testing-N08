# Phân tích Domain Testing — FR-13: Dashboard

## 1. Tóm tắt requirement

| Thuộc tính | Nội dung |
|---|---|
| Requirement ID | FR-13 |
| Tên chức năng | Dashboard |
| Actor | Admin |
| Preconditions | Admin đã đăng nhập và có quyền truy cập phân hệ Web Admin. Điều kiện truy cập Admin là dependency từ FR-12. |
| Input | Không có input nhập trực tiếp từ người dùng được đặc tả. Domain chính là trạng thái đăng nhập/quyền truy cập và dữ liệu đơn hàng đang tồn tại trong hệ thống. |
| Output | Tổng doanh thu và tổng số đơn hàng trên Dashboard. |
| Business rules | Tổng doanh thu chỉ tính tổng `total_amount` của các đơn có `status = 'delivered'`. Tổng số đơn hàng phải phản ánh số lượng đơn hàng trong hệ thống. |
| Validation rules | Chưa được đặc tả validation input trực tiếp cho FR-13. |
| Dependency | FR-12 yêu cầu phân hệ Admin chỉ dành cho tài khoản có `role = 'admin'`. FR-10/API spec xác nhận các trạng thái đơn hàng gồm `pending`, `confirmed`, `shipping`, `delivered`, `canceled`. |
| Error conditions | Người không có quyền Admin không được xem Dashboard. Cách hiển thị lỗi hoặc redirect cụ thể chưa được đặc tả. |
| Success condition | Dashboard hiển thị đúng tổng doanh thu và tổng số đơn hàng theo dữ liệu đơn hàng hiện có. |

## 2. Biến đầu vào và ràng buộc

| Variable / Condition | Type | Required | Domain / Constraints | Requirement source |
|---|---|---:|---|---|
| `admin_session` | Trạng thái hệ thống | Có | Có phiên đăng nhập hợp lệ và tài khoản có `role = 'admin'` để truy cập phân hệ Web Admin. | FR-12, FR-13 |
| `order_dataset` | Tập dữ liệu | Có | Tập đơn hàng hiện có trong hệ thống; có thể rỗng hoặc có một/nhiều đơn. | FR-13 |
| `order.status` | Enum / trạng thái | Có với mỗi đơn hàng | Đơn có `status = 'delivered'` được tính vào tổng doanh thu; các trạng thái khác không được tính vào tổng doanh thu. Trạng thái hợp lệ tham chiếu từ FR-10/API spec: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`. | FR-13, FR-10, API spec để xác minh kỹ thuật |
| `order.total_amount` | Số tiền | Có với mỗi đơn hàng | Chỉ `total_amount` của đơn `delivered` được cộng vào tổng doanh thu. Ràng buộc min/max, định dạng tiền tệ và làm tròn chưa được đặc tả trong FR-13. | FR-13 |
| `order_count` | Số lượng tính toán | Có | Tổng số đơn hàng được hiển thị, không có điều kiện lọc trạng thái được đặc tả. | FR-13 |

## 3. Phân vùng tương đương

| Class ID | Variable / Condition | Mô tả | Validity | Giá trị đại diện | Requirement source | Ghi chú |
|---|---|---|---|---|---|---|
| EC-SESSION-V01 | `admin_session` | Người dùng đã đăng nhập bằng tài khoản Admin hợp lệ. | Valid | Admin `role = 'admin'` | FR-12, FR-13 | Điều kiện danh nghĩa để kiểm thử Dashboard. |
| EC-SESSION-I01 | `admin_session` | Người dùng chưa đăng nhập. | Invalid | Không có phiên đăng nhập | FR-12 | Cách phản hồi cụ thể chưa được đặc tả. |
| EC-ROLE-I01 | `admin_session` | Người dùng đã đăng nhập nhưng không có quyền Admin. | Invalid | User thường `role = 'user'` | FR-12 | Kiểm tra dependency truy cập của phân hệ Admin. |
| EC-DATASET-V01 | `order_dataset` | Không có đơn hàng trong hệ thống. | Valid | `[]` | FR-13 | Dashboard vẫn phải hiển thị số liệu tính toán được. |
| EC-DATASET-V02 | `order_dataset` | Có đúng một đơn hàng. | Valid | 1 đơn | FR-13 | Đại diện tập dữ liệu nhỏ nhất có dữ liệu. |
| EC-DATASET-V03 | `order_dataset` | Có nhiều đơn hàng. | Valid | 5 đơn | FR-13 | Đại diện trường hợp cộng dồn và đếm nhiều bản ghi. |
| EC-STATUS-V01 | `order.status` | Đơn hàng có `status = 'delivered'`. | Valid | `delivered` | FR-13 | Được tính vào tổng doanh thu. |
| EC-STATUS-I01 | `order.status` | Đơn hàng có trạng thái khác `delivered`. | Invalid | `pending`, `confirmed`, `shipping`, `canceled` | FR-13, FR-10 | Invalid theo điều kiện được cộng vào doanh thu; các trạng thái này vẫn là trạng thái đơn hàng hợp lệ. |
| EC-AMOUNT-V01 | `order.total_amount` | `total_amount` của đơn `delivered` được cộng vào tổng doanh thu. | Valid | `120000`, `80000`, `250000` | FR-13 | Giá trị cụ thể dùng để quan sát phép cộng. |
| EC-AMOUNT-I01 | `order.total_amount` | `total_amount` của đơn không phải `delivered` không được cộng vào tổng doanh thu. | Invalid | `90000`, `110000`, `130000`, `70000` | FR-13 | Invalid theo điều kiện được cộng vào doanh thu, không khẳng định số tiền không hợp lệ. |
| EC-COUNT-V01 | `order_count` | Tổng số đơn hàng bằng 0 khi không có đơn hàng. | Valid | `0` | FR-13 | Kiểm tra hiển thị số lượng rỗng. |
| EC-COUNT-V02 | `order_count` | Tổng số đơn hàng bằng số bản ghi đơn hàng hiện có, không phụ thuộc trạng thái. | Valid | `1`, `2`, `5` | FR-13 | Kiểm tra rule tổng số đơn hàng. |

## 4. Quan hệ phụ thuộc giữa các input và trạng thái hệ thống

| ID | Điều kiện phụ thuộc | Valid condition | Invalid condition | Requirement source |
|---|---|---|---|---|
| DC-01 | Quyền truy cập Dashboard phụ thuộc vào trạng thái đăng nhập và role Admin. | Có phiên đăng nhập hợp lệ với `role = 'admin'`. | Không đăng nhập hoặc đăng nhập bằng tài khoản không có `role = 'admin'`. | FR-12, FR-13 |
| DC-02 | Tổng doanh thu phụ thuộc vào quan hệ giữa `order.status` và `order.total_amount`. | Chỉ cộng `total_amount` khi `status = 'delivered'`. | Cộng `total_amount` của đơn có `status != 'delivered'` hoặc bỏ sót đơn `delivered`. | FR-13 |
| DC-03 | Tổng số đơn hàng phụ thuộc vào toàn bộ `order_dataset`. | Đếm tất cả đơn hàng hiện có. | Chỉ đếm một phần đơn hàng hoặc đếm theo bộ lọc trạng thái không được đặc tả. | FR-13 |

## 5. Domain Matrix

| Test Condition | `admin_session` | `order_dataset` | `order.status` / `order.total_amount` | Expected validity | Expected behavior | Covered classes | Lý do chọn |
|---|---|---|---|---|---|---|---|
| COND-FR13-DT-001 | EC-SESSION-V01 | EC-DATASET-V01 | Không có đơn hàng | Valid | Dashboard hiển thị tổng doanh thu `0` và tổng số đơn hàng `0`. | EC-SESSION-V01, EC-DATASET-V01, EC-COUNT-V01, DC-03 | Kiểm tra miền dữ liệu rỗng. |
| COND-FR13-DT-002 | EC-SESSION-V01 | EC-DATASET-V02 | 1 đơn `delivered`, `total_amount = 120000` | Valid | Dashboard hiển thị tổng doanh thu `120000` và tổng số đơn hàng `1`. | EC-SESSION-V01, EC-DATASET-V02, EC-STATUS-V01, EC-AMOUNT-V01, EC-COUNT-V02, DC-02, DC-03 | Kiểm tra trường hợp tối thiểu có dữ liệu doanh thu. |
| COND-FR13-DT-003 | EC-SESSION-V01 | EC-DATASET-V03 | 2 đơn `delivered`, `total_amount = 120000` và `80000` | Valid | Dashboard hiển thị tổng doanh thu `200000` và tổng số đơn hàng `2`. | EC-SESSION-V01, EC-DATASET-V03, EC-STATUS-V01, EC-AMOUNT-V01, EC-COUNT-V02, DC-02, DC-03 | Kiểm tra cộng dồn nhiều đơn delivered. |
| COND-FR13-DT-004 | EC-SESSION-V01 | EC-DATASET-V03 | 1 đơn `delivered = 120000`; 4 đơn không delivered có tổng `400000` | Valid | Dashboard hiển thị tổng doanh thu `120000` và tổng số đơn hàng `5`. | EC-SESSION-V01, EC-DATASET-V03, EC-STATUS-V01, EC-STATUS-I01, EC-AMOUNT-V01, EC-AMOUNT-I01, EC-COUNT-V02, DC-02, DC-03 | Kiểm tra loại trừ doanh thu của trạng thái không delivered nhưng vẫn đếm đơn. |
| COND-FR13-DT-005 | EC-SESSION-V01 | EC-DATASET-V03 | 4 đơn không delivered, không có đơn `delivered` | Valid | Dashboard hiển thị tổng doanh thu `0` và tổng số đơn hàng `4`. | EC-SESSION-V01, EC-DATASET-V03, EC-STATUS-I01, EC-AMOUNT-I01, EC-COUNT-V02, DC-02, DC-03 | Kiểm tra không có đơn nào đủ điều kiện doanh thu. |
| COND-FR13-DT-006 | EC-ROLE-I01 | EC-DATASET-V02 | Dữ liệu đơn hàng hợp lệ danh nghĩa | Invalid | Người dùng không có quyền Admin không xem được Dashboard; dữ liệu dashboard không được hiển thị. | EC-ROLE-I01, DC-01 | Kiểm tra dependency truy cập Admin với một invalid condition chính. |

## 6. Quá trình lựa chọn test case

Các test case được chọn theo hướng bao phủ các miền dữ liệu có rủi ro chính của Dashboard: tập dữ liệu rỗng, tập dữ liệu nhỏ nhất có doanh thu, cộng dồn nhiều đơn, loại trừ các trạng thái không phải `delivered`, vẫn đếm toàn bộ đơn hàng, và điều kiện truy cập Admin.

Không tạo Cartesian product giữa mọi trạng thái đơn hàng vì FR-13 chỉ phân biệt điều kiện `status = 'delivered'` và `status != 'delivered'` khi tính doanh thu. Các trạng thái `pending`, `confirmed`, `shipping`, `canceled` được gom vào một equivalence class đại diện cho nhóm không được tính vào doanh thu.

Invalid case COND-FR13-DT-006 chỉ làm sai một điều kiện chính là role truy cập; dữ liệu đơn hàng giữ ở trạng thái hợp lệ danh nghĩa để tránh trộn mục tiêu kiểm thử.

## 7. Ma trận truy vết

| Test Case ID | Test Condition | Covered Classes | Requirement Reference | Lý do lựa chọn |
|---|---|---|---|---|
| TC-FR13-DT-001 | COND-FR13-DT-001 | EC-SESSION-V01, EC-DATASET-V01, EC-COUNT-V01, DC-03 | FR-13 | Bao phủ Dashboard khi chưa có đơn hàng. |
| TC-FR13-DT-002 | COND-FR13-DT-002 | EC-SESSION-V01, EC-DATASET-V02, EC-STATUS-V01, EC-AMOUNT-V01, EC-COUNT-V02, DC-02, DC-03 | FR-13 | Bao phủ rule tính doanh thu với một đơn delivered. |
| TC-FR13-DT-003 | COND-FR13-DT-003 | EC-SESSION-V01, EC-DATASET-V03, EC-STATUS-V01, EC-AMOUNT-V01, EC-COUNT-V02, DC-02, DC-03 | FR-13 | Bao phủ cộng dồn nhiều đơn delivered. |
| TC-FR13-DT-004 | COND-FR13-DT-004 | EC-SESSION-V01, EC-DATASET-V03, EC-STATUS-V01, EC-STATUS-I01, EC-AMOUNT-V01, EC-AMOUNT-I01, EC-COUNT-V02, DC-02, DC-03 | FR-13 | Bao phủ loại trừ doanh thu của trạng thái không delivered và vẫn đếm tổng đơn. |
| TC-FR13-DT-005 | COND-FR13-DT-005 | EC-SESSION-V01, EC-DATASET-V03, EC-STATUS-I01, EC-AMOUNT-I01, EC-COUNT-V02, DC-02, DC-03 | FR-13 | Bao phủ trường hợp có đơn hàng nhưng không có doanh thu hợp lệ. |
| TC-FR13-DT-006 | COND-FR13-DT-006 | EC-ROLE-I01, DC-01 | FR-12, FR-13 | Bao phủ dependency phân hệ Admin chỉ dành cho Admin. |

## 8. Tổng kết độ bao phủ

| Metric | Value |
|---|---:|
| Tổng input/condition đã phân tích | 5 |
| Tổng valid classes | 8 |
| Tổng invalid classes | 4 |
| Tổng dependent conditions | 3 |
| Tổng test conditions | 6 |
| Tổng test cases | 6 |
| Classes đã cover | 11 |
| Classes chưa cover | 1 |

| Class ID | Trạng thái coverage | Lý do |
|---|---|---|
| EC-SESSION-V01 | Đã cover | Dùng trong các test case Dashboard hợp lệ. |
| EC-SESSION-I01 | Chủ động loại trừ | Không đăng nhập là dependency của FR-12; FR-13 chỉ cần một invalid access representative, đã chọn EC-ROLE-I01 để tránh trùng mục tiêu. |
| EC-ROLE-I01 | Đã cover | Bao phủ bởi TC-FR13-DT-006. |
| EC-DATASET-V01 | Đã cover | Bao phủ bởi TC-FR13-DT-001. |
| EC-DATASET-V02 | Đã cover | Bao phủ bởi TC-FR13-DT-002 và TC-FR13-DT-006. |
| EC-DATASET-V03 | Đã cover | Bao phủ bởi TC-FR13-DT-003, TC-FR13-DT-004, TC-FR13-DT-005. |
| EC-STATUS-V01 | Đã cover | Bao phủ bởi TC-FR13-DT-002, TC-FR13-DT-003, TC-FR13-DT-004. |
| EC-STATUS-I01 | Đã cover | Bao phủ bởi TC-FR13-DT-004 và TC-FR13-DT-005. |
| EC-AMOUNT-V01 | Đã cover | Bao phủ bởi TC-FR13-DT-002, TC-FR13-DT-003, TC-FR13-DT-004. |
| EC-AMOUNT-I01 | Đã cover | Bao phủ bởi TC-FR13-DT-004 và TC-FR13-DT-005. |
| EC-COUNT-V01 | Đã cover | Bao phủ bởi TC-FR13-DT-001. |
| EC-COUNT-V02 | Đã cover | Bao phủ bởi TC-FR13-DT-002 đến TC-FR13-DT-005. |

## 9. Giả định và thông tin chưa được đặc tả

- FR-13 không đặc tả route, màn hình cụ thể, đơn vị tiền tệ, định dạng hiển thị số tiền, quy tắc làm tròn, filter theo ngày, phân quyền chi tiết trên UI, hoặc thông báo lỗi khi bị chặn truy cập.
- FR-13 không đặc tả cách tạo dữ liệu đơn hàng phục vụ kiểm thử; test case giả định tester có thể chuẩn bị dữ liệu đơn hàng qua luồng nghiệp vụ hoặc dữ liệu seed của môi trường test.
- FR-13 không nói tổng số đơn hàng có bị lọc theo trạng thái hay khoảng thời gian hay không; vì vậy phân tích hiểu là tổng toàn bộ đơn hàng hiện có.
- API spec được dùng để kiểm tra nhất quán về trạng thái đơn hàng và quyền Admin, không đưa endpoint, method, request body hoặc công cụ kiểm thử vào analysis/test case.
