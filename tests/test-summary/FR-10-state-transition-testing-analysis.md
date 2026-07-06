# Phân tích thiết kế test case FR-10: Trạng thái đơn hàng

## Requirement ID
FR-10

## Module / Test type / Technique
Quản lý đơn hàng / Functional / State Transition Testing

## Mục tiêu kiểm thử
Mục tiêu của bộ test là xác nhận đơn hàng chỉ được chuyển trạng thái theo đúng state machine đã mô tả trong README. Bộ test tập trung vào luồng đi hợp lệ, các nhánh hủy hợp lệ, trạng thái kết thúc và các chuyển đổi không hợp lệ phải bị từ chối bằng thông báo lỗi phù hợp.

## Mô hình trạng thái
FR-10 định nghĩa 5 trạng thái của đơn hàng:

| Trạng thái | Ý nghĩa | Loại trạng thái |
| --- | --- | --- |
| `pending` | Đơn hàng mới tạo, đang chờ xác nhận | Trạng thái khởi đầu |
| `confirmed` | Đơn hàng đã được admin xác nhận | Trạng thái trung gian |
| `shipping` | Đơn hàng đang được giao | Trạng thái trung gian |
| `delivered` | Đơn hàng đã giao xong | Trạng thái kết thúc |
| `canceled` | Đơn hàng đã bị hủy | Trạng thái kết thúc |

## Bảng chuyển trạng thái
| Trạng thái hiện tại | Sự kiện / tác nhân | Trạng thái tiếp theo | Hợp lệ? | Ghi chú |
| --- | --- | --- | --- | --- |
| `pending` | Admin xác nhận | `confirmed` | Có | Luồng xử lý đơn bình thường |
| `pending` | User/Admin hủy | `canceled` | Có | Chỉ hợp lệ khi đơn còn chờ xác nhận |
| `confirmed` | Admin giao hàng | `shipping` | Có | Đơn đã xác nhận mới được giao |
| `confirmed` | User/Admin hủy | `canceled` | Có | Hủy vẫn được phép trước khi giao |
| `shipping` | Admin hoàn tất | `delivered` | Có | Kết thúc luồng giao hàng |
| `shipping` | User hủy | `canceled` | Không | FR-10 cấm user tự hủy khi đơn đang giao |
| `shipping` | Admin hủy | `canceled` | Không | Sơ đồ FR-10 không có cạnh `shipping -> canceled` |
| `delivered` | Bất kỳ chuyển đổi nào | Bất kỳ trạng thái khác | Không | `delivered` là trạng thái kết thúc |
| `canceled` | Bất kỳ chuyển đổi nào | Bất kỳ trạng thái khác | Không | `canceled` là trạng thái kết thúc |

Các chuyển đổi tắt như `pending -> shipping`, `pending -> delivered`, `confirmed -> delivered` hoặc quay lùi như `shipping -> confirmed` đều được xem là không hợp lệ vì không xuất hiện trong state machine.

## Phạm vi và giả định kiểm thử
- Kiểm thử có thể thực hiện qua API hoặc giao diện admin/user tương ứng.
- Base URL API theo tài liệu hiện có là `http://localhost:3000`.
- Các API cần token hợp lệ:
  - User: `PUT /api/orders/:id/cancel`
  - Admin: `PUT /api/admin/orders/:id/status`
- Mỗi test case dùng một đơn hàng độc lập hoặc reset dữ liệu trước khi chạy để tránh phụ thuộc thứ tự.
- Nếu chuyển đổi không hợp lệ, hệ thống phải trả lỗi, hiển thị thông báo phù hợp và giữ nguyên trạng thái hiện tại của đơn hàng.

## Chiến lược bao phủ
Bộ test được thiết kế theo tiêu chí transition coverage kết hợp invalid transition coverage:

| Nhóm bao phủ | Test case |
| --- | --- |
| Trạng thái khởi đầu sau checkout | TC-ORDER-STT-001 |
| Các chuyển đổi hợp lệ | TC-ORDER-STT-002, TC-ORDER-STT-003, TC-ORDER-STT-004, TC-ORDER-STT-005, TC-ORDER-STT-006, TC-ORDER-STT-007, TC-ORDER-STT-008 |
| Chuyển đổi không hợp lệ do user hủy khi đang giao | TC-ORDER-STT-009 |
| Chuyển đổi tắt không hợp lệ | TC-ORDER-STT-010, TC-ORDER-STT-011 |
| Chuyển đổi không hợp lệ từ `shipping` | TC-ORDER-STT-012 |
| Trạng thái kết thúc `delivered` | TC-ORDER-STT-013 |
| Trạng thái kết thúc `canceled` | TC-ORDER-STT-014 |

## Danh sách test case
| Test Case ID | Tên test case | Mục tiêu |
| --- | --- | --- |
| TC-ORDER-STT-001 | Tạo đơn hàng mới ở trạng thái `pending` | Xác nhận trạng thái khởi đầu |
| TC-ORDER-STT-002 | Admin xác nhận đơn từ `pending` sang `confirmed` | Kiểm tra chuyển đổi hợp lệ |
| TC-ORDER-STT-003 | Admin hủy đơn ở trạng thái `pending` | Kiểm tra nhánh hủy hợp lệ bởi admin |
| TC-ORDER-STT-004 | User hủy đơn ở trạng thái `pending` | Kiểm tra nhánh hủy hợp lệ bởi user |
| TC-ORDER-STT-005 | Admin chuyển đơn từ `confirmed` sang `shipping` | Kiểm tra chuyển đổi hợp lệ |
| TC-ORDER-STT-006 | Admin hủy đơn ở trạng thái `confirmed` | Kiểm tra nhánh hủy hợp lệ bởi admin |
| TC-ORDER-STT-007 | User hủy đơn ở trạng thái `confirmed` | Kiểm tra nhánh hủy hợp lệ bởi user |
| TC-ORDER-STT-008 | Admin hoàn tất đơn từ `shipping` sang `delivered` | Kiểm tra chuyển đổi hợp lệ đến trạng thái kết thúc |
| TC-ORDER-STT-009 | User không được hủy đơn ở trạng thái `shipping` | Kiểm tra ràng buộc quyền hủy của user |
| TC-ORDER-STT-010 | Admin không được chuyển tắt từ `pending` sang `shipping` | Kiểm tra chuyển đổi tắt không hợp lệ |
| TC-ORDER-STT-011 | Admin không được chuyển tắt từ `confirmed` sang `delivered` | Kiểm tra chuyển đổi tắt không hợp lệ |
| TC-ORDER-STT-012 | Admin không được hủy đơn ở trạng thái `shipping` | Kiểm tra cạnh không tồn tại trong state machine |
| TC-ORDER-STT-013 | Không được đổi trạng thái khi đơn đã `delivered` | Kiểm tra final state |
| TC-ORDER-STT-014 | Không được đổi trạng thái khi đơn đã `canceled` | Kiểm tra final state |

## Tiêu chí pass/fail chung
- Pass khi trạng thái sau thao tác đúng với state machine, response/status message rõ ràng và dữ liệu lưu trong hệ thống khớp với expected result.
- Fail khi hệ thống cho phép chuyển đổi không có trong state machine, thay đổi trạng thái sau thao tác bị từ chối, hoặc trả thông báo lỗi mơ hồ khiến tester không xác định được nguyên nhân.

