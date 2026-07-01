# Phân tích Domain Testing — FR-10: Trạng thái Đơn hàng

## 1. Tóm tắt requirement

| Thuộc tính | Nội dung |
|---|---|
| Requirement ID | FR-10 |
| Tên chức năng | Trạng thái Đơn hàng (Order State Machine) |
| Actor | Admin, User |
| Preconditions | Có đơn hàng tồn tại trong hệ thống; actor có thể truy cập chức năng thao tác trạng thái phù hợp với vai trò của mình. |
| Input | Trạng thái hiện tại của đơn hàng, actor thực hiện thao tác, thao tác hoặc trạng thái đích mong muốn. |
| Output | Trạng thái đơn hàng được cập nhật khi chuyển đổi hợp lệ; lỗi phù hợp khi chuyển đổi không hợp lệ. |
| Business rules | Đơn hàng có 5 trạng thái: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`. Chỉ được chuyển theo state machine: `pending` -> `confirmed`, `confirmed` -> `shipping`, `shipping` -> `delivered`, `pending` -> `canceled`, `confirmed` -> `canceled`. |
| Validation rules | `delivered` và `canceled` là final states, không được chuyển sang trạng thái khác. Khi đơn hàng ở `shipping`, User không được tự hủy. Mọi chuyển đổi không hợp lệ phải trả về lỗi với thông báo phù hợp. |
| Dependency | Tính hợp lệ phụ thuộc đồng thời vào trạng thái hiện tại, actor và thao tác/trạng thái đích. |
| Error conditions | Chuyển đổi không nằm trong state machine; chuyển đổi từ final state; User hủy đơn ở `shipping`; actor không có quyền thực hiện thao tác dành cho Admin. |
| Success conditions | Trạng thái đơn hàng thay đổi đúng theo chuyển đổi hợp lệ và hệ thống phản hồi thao tác thành công. |

## 2. Biến đầu vào và ràng buộc

| Variable / Condition | Type | Required | Domain / Constraints | Requirement source |
|---|---|---|---|---|
| `current_status` | Enum | Có | Một trong 5 trạng thái hợp lệ: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`. | FR-10 |
| `actor` | Enum / system state | Có | `Admin` hoặc `User`. Admin xác nhận, giao hàng, hoàn tất; User/Admin có thể hủy ở các trạng thái được cho phép. | FR-10 |
| `action_or_target_status` | Enum / command | Có | Thao tác/trạng thái đích phải tương ứng state machine: xác nhận -> `confirmed`, giao hàng -> `shipping`, hoàn tất -> `delivered`, hủy -> `canceled`. | FR-10 |
| `is_final_state` | Derived condition | Có | `delivered` và `canceled` là trạng thái kết thúc; mọi chuyển đổi ra khỏi hai trạng thái này đều invalid. | FR-10 |
| `is_transition_allowed` | Derived condition | Có | Hợp lệ khi tổ hợp trạng thái hiện tại, actor và trạng thái đích khớp state machine và quyền thao tác. | FR-10 |

## 3. Phân vùng tương đương

| Class ID | Variable / Condition | Mô tả | Validity | Giá trị đại diện | Requirement source | Ghi chú |
|---|---|---|---|---|---|---|
| EC-CURRENT_STATUS-V01 | `current_status` | Trạng thái bắt đầu có chuyển đổi tiếp theo bằng Admin xác nhận. | Valid | `pending` | FR-10 | Dùng cho luồng `pending` -> `confirmed`. |
| EC-CURRENT_STATUS-V02 | `current_status` | Trạng thái đã xác nhận có chuyển đổi tiếp theo bằng Admin giao hàng hoặc có thể hủy. | Valid | `confirmed` | FR-10 | Dùng cho luồng `confirmed` -> `shipping` và `confirmed` -> `canceled`. |
| EC-CURRENT_STATUS-V03 | `current_status` | Trạng thái đang giao có chuyển đổi tiếp theo bằng Admin hoàn tất. | Valid | `shipping` | FR-10 | User không được tự hủy ở trạng thái này. |
| EC-CURRENT_STATUS-V04 | `current_status` | Trạng thái kết thúc giao thành công. | Valid | `delivered` | FR-10 | Không được chuyển tiếp. |
| EC-CURRENT_STATUS-V05 | `current_status` | Trạng thái kết thúc do hủy. | Valid | `canceled` | FR-10 | Không được chuyển tiếp. |
| EC-CURRENT_STATUS-I01 | `current_status` | Trạng thái không thuộc 5 trạng thái được đặc tả. | Invalid | `returned` | FR-10 | Chưa được đặc tả cách UI cho phép nhập trạng thái không hợp lệ; dùng để kiểm tra bảo vệ domain. |
| EC-ACTOR-V01 | `actor` | Admin thực hiện thao tác quản lý trạng thái. | Valid | `Admin` | FR-10 | Áp dụng cho xác nhận, giao hàng, hoàn tất và các thao tác hủy được cho phép. |
| EC-ACTOR-V02 | `actor` | User thực hiện thao tác hủy ở trạng thái cho phép. | Valid | `User` | FR-10 | Áp dụng cho hủy `pending` hoặc `confirmed`. |
| EC-ACTOR-I01 | `actor` | User thực hiện thao tác dành riêng cho Admin. | Invalid | `User` xác nhận đơn | FR-10 | Requirement mô tả các bước xác nhận/giao hàng/hoàn tất là Admin thao tác. |
| EC-ACTOR-I02 | `actor` | Actor chưa đăng nhập hoặc không xác định. | Invalid | `Guest` | FR-10 | Chưa được đặc tả trực tiếp trong FR-10; là điều kiện hệ thống cần xác nhận nếu chức năng yêu cầu xác thực. |
| EC-TARGET_STATUS-V01 | `action_or_target_status` | Chuyển `pending` sang `confirmed`. | Valid | `confirmed` | FR-10 | Admin xác nhận. |
| EC-TARGET_STATUS-V02 | `action_or_target_status` | Chuyển `confirmed` sang `shipping`. | Valid | `shipping` | FR-10 | Admin giao hàng. |
| EC-TARGET_STATUS-V03 | `action_or_target_status` | Chuyển `shipping` sang `delivered`. | Valid | `delivered` | FR-10 | Admin hoàn tất. |
| EC-TARGET_STATUS-V04 | `action_or_target_status` | Hủy đơn từ `pending` hoặc `confirmed`. | Valid | `canceled` | FR-10 | User/Admin hủy. |
| EC-TARGET_STATUS-I01 | `action_or_target_status` | Bỏ qua một trạng thái trong state machine. | Invalid | `pending` -> `shipping` | FR-10 | Không có cạnh chuyển đổi trực tiếp. |
| EC-TARGET_STATUS-I02 | `action_or_target_status` | Quay ngược trạng thái. | Invalid | `confirmed` -> `pending` | FR-10 | Không có cạnh chuyển đổi ngược. |
| EC-TARGET_STATUS-I03 | `action_or_target_status` | Chuyển từ final state sang trạng thái khác. | Invalid | `delivered` -> `shipping` | FR-10 | Bao phủ ràng buộc final state. |
| EC-TARGET_STATUS-I04 | `action_or_target_status` | Chuyển từ `canceled` sang trạng thái khác. | Invalid | `canceled` -> `pending` | FR-10 | Bao phủ ràng buộc final state. |
| EC-TARGET_STATUS-I05 | `action_or_target_status` | User tự hủy khi đơn hàng ở `shipping`. | Invalid | `shipping` -> `canceled` bởi User | FR-10 | Requirement nêu rõ User không được tự hủy. |
| EC-TARGET_STATUS-I06 | `action_or_target_status` | Trạng thái đích không thuộc 5 trạng thái được đặc tả. | Invalid | `returned` | FR-10 | Chưa được đặc tả thông báo lỗi cụ thể. |

## 4. Quan hệ phụ thuộc giữa các input và trạng thái hệ thống

| ID | Điều kiện phụ thuộc | Valid condition | Invalid condition | Requirement source |
|---|---|---|---|---|
| DC-01 | State machine của luồng xử lý bởi Admin. | `pending` -> `confirmed`, `confirmed` -> `shipping`, `shipping` -> `delivered`. | Bất kỳ bước nhảy, bước lùi hoặc trạng thái đích không nằm trong cạnh hợp lệ. | FR-10 |
| DC-02 | Hủy đơn bởi User/Admin. | User/Admin hủy khi trạng thái hiện tại là `pending` hoặc `confirmed`. | User hủy khi trạng thái hiện tại là `shipping`; hủy từ `delivered` hoặc `canceled`. | FR-10 |
| DC-03 | Final states. | Không phát sinh chuyển đổi nào từ `delivered` hoặc `canceled`. | Bất kỳ thao tác chuyển trạng thái nào từ `delivered` hoặc `canceled`. | FR-10 |
| DC-04 | Quyền thao tác theo actor. | Admin thực hiện xác nhận, giao hàng, hoàn tất; User chỉ thực hiện hủy ở trạng thái được cho phép. | User thực hiện xác nhận/giao hàng/hoàn tất hoặc Guest thao tác trạng thái. | FR-10; điều kiện Guest là giả định cần xác nhận. |

## 5. Domain Matrix

| Test Condition | `current_status` | `actor` | `action_or_target_status` | Expected validity | Expected behavior | Covered classes | Lý do chọn |
|---|---|---|---|---|---|---|---|
| COND-FR10-DT-001 | `pending` | Admin | `confirmed` | Valid | Đơn hàng được chuyển sang `confirmed` và hiển thị phản hồi thành công. | EC-CURRENT_STATUS-V01, EC-ACTOR-V01, EC-TARGET_STATUS-V01, DC-01 | Bao phủ chuyển đổi hợp lệ đầu tiên của state machine. |
| COND-FR10-DT-002 | `confirmed` | Admin | `shipping` | Valid | Đơn hàng được chuyển sang `shipping` và hiển thị phản hồi thành công. | EC-CURRENT_STATUS-V02, EC-ACTOR-V01, EC-TARGET_STATUS-V02, DC-01 | Bao phủ chuyển đổi hợp lệ từ xác nhận sang giao hàng. |
| COND-FR10-DT-003 | `shipping` | Admin | `delivered` | Valid | Đơn hàng được chuyển sang `delivered` và hiển thị phản hồi thành công. | EC-CURRENT_STATUS-V03, EC-ACTOR-V01, EC-TARGET_STATUS-V03, DC-01 | Bao phủ chuyển đổi hoàn tất đơn hàng. |
| COND-FR10-DT-004 | `pending` | User | `canceled` | Valid | Đơn hàng được chuyển sang `canceled` và không còn tiếp tục xử lý. | EC-CURRENT_STATUS-V01, EC-ACTOR-V02, EC-TARGET_STATUS-V04, DC-02 | Bao phủ quyền hủy của User tại trạng thái ban đầu. |
| COND-FR10-DT-005 | `confirmed` | Admin | `canceled` | Valid | Đơn hàng được chuyển sang `canceled` và không còn tiếp tục xử lý. | EC-CURRENT_STATUS-V02, EC-ACTOR-V01, EC-TARGET_STATUS-V04, DC-02 | Bao phủ hủy hợp lệ sau khi đã xác nhận bởi Admin. |
| COND-FR10-DT-006 | `pending` | Admin | `shipping` | Invalid | Hệ thống từ chối, giữ nguyên `pending`, và hiển thị lỗi phù hợp. | EC-CURRENT_STATUS-V01, EC-ACTOR-V01, EC-TARGET_STATUS-I01, DC-01 | Kiểm tra bước nhảy không hợp lệ. |
| COND-FR10-DT-007 | `confirmed` | Admin | `pending` | Invalid | Hệ thống từ chối, giữ nguyên `confirmed`, và hiển thị lỗi phù hợp. | EC-CURRENT_STATUS-V02, EC-ACTOR-V01, EC-TARGET_STATUS-I02, DC-01 | Kiểm tra chuyển đổi ngược không hợp lệ. |
| COND-FR10-DT-008 | `delivered` | Admin | `shipping` | Invalid | Hệ thống từ chối, giữ nguyên `delivered`, và hiển thị lỗi phù hợp. | EC-CURRENT_STATUS-V04, EC-ACTOR-V01, EC-TARGET_STATUS-I03, DC-03 | Kiểm tra final state `delivered`. |
| COND-FR10-DT-009 | `canceled` | Admin | `pending` | Invalid | Hệ thống từ chối, giữ nguyên `canceled`, và hiển thị lỗi phù hợp. | EC-CURRENT_STATUS-V05, EC-ACTOR-V01, EC-TARGET_STATUS-I04, DC-03 | Kiểm tra final state `canceled`. |
| COND-FR10-DT-010 | `shipping` | User | `canceled` | Invalid | Hệ thống từ chối, giữ nguyên `shipping`, và hiển thị lỗi phù hợp. | EC-CURRENT_STATUS-V03, EC-ACTOR-V02, EC-TARGET_STATUS-I05, DC-02 | Bao phủ rule User không được tự hủy khi đang giao. |
| COND-FR10-DT-011 | `pending` | User | `confirmed` | Invalid | Hệ thống từ chối, giữ nguyên `pending`, và hiển thị lỗi phù hợp. | EC-CURRENT_STATUS-V01, EC-ACTOR-I01, EC-TARGET_STATUS-V01, DC-04 | Kiểm tra thao tác dành cho Admin bị User thực hiện. |
| COND-FR10-DT-012 | `pending` | Admin | `returned` | Invalid | Hệ thống từ chối, giữ nguyên `pending`, và hiển thị lỗi phù hợp. | EC-CURRENT_STATUS-V01, EC-ACTOR-V01, EC-TARGET_STATUS-I06 | Kiểm tra trạng thái đích ngoài domain. |
| COND-FR10-DT-013 | `returned` | Admin | `confirmed` | Invalid | Hệ thống từ chối xử lý trạng thái hiện tại không hợp lệ và không tạo chuyển đổi trạng thái. | EC-CURRENT_STATUS-I01, EC-ACTOR-V01, EC-TARGET_STATUS-V01 | Kiểm tra bảo vệ khi trạng thái hiện tại ngoài domain được gửi tới hệ thống. |
| COND-FR10-DT-014 | `pending` | Guest | `canceled` | Invalid | Hệ thống từ chối thao tác và không thay đổi trạng thái đơn hàng. | EC-CURRENT_STATUS-V01, EC-ACTOR-I02, EC-TARGET_STATUS-V04, DC-04 | Bao phủ actor chưa đăng nhập/không xác định; cần xác nhận vì FR-10 không mô tả trực tiếp. |

## 6. Quá trình lựa chọn test case

Các test case được chọn theo hướng bao phủ mỗi cạnh hợp lệ chính của state machine và mỗi nhóm invalid quan trọng. Các input không phải mục tiêu được giữ ở giá trị valid nominal: đơn hàng tồn tại, trạng thái hiện tại xác định, actor phù hợp nếu mục tiêu không phải kiểm tra quyền. Không tạo Cartesian product giữa toàn bộ 5 trạng thái và 5 trạng thái đích vì FR-10 đã đặc tả state machine theo cạnh chuyển đổi; kiểm thử đại diện cho bước nhảy, bước lùi, final state và quyền actor là đủ để phát hiện sai lệch chính.

`COND-FR10-DT-014` được giữ lại dù FR-10 không đặc tả Guest trực tiếp, vì thao tác trạng thái đơn hàng là thao tác có ảnh hưởng dữ liệu và actor là điều kiện hệ thống quan trọng. Test case này được đánh dấu cần xác nhận trong phần giả định.

## 7. Ma trận truy vết

| Test Case ID | Test Condition | Covered Classes | Requirement Reference | Lý do lựa chọn |
|---|---|---|---|---|
| TC-FR10-DT-001 | COND-FR10-DT-001 | EC-CURRENT_STATUS-V01, EC-ACTOR-V01, EC-TARGET_STATUS-V01, DC-01 | FR-10 | Xác nhận chuyển đổi hợp lệ `pending` -> `confirmed`. |
| TC-FR10-DT-002 | COND-FR10-DT-002 | EC-CURRENT_STATUS-V02, EC-ACTOR-V01, EC-TARGET_STATUS-V02, DC-01 | FR-10 | Xác nhận chuyển đổi hợp lệ `confirmed` -> `shipping`. |
| TC-FR10-DT-003 | COND-FR10-DT-003 | EC-CURRENT_STATUS-V03, EC-ACTOR-V01, EC-TARGET_STATUS-V03, DC-01 | FR-10 | Xác nhận chuyển đổi hợp lệ `shipping` -> `delivered`. |
| TC-FR10-DT-004 | COND-FR10-DT-004 | EC-CURRENT_STATUS-V01, EC-ACTOR-V02, EC-TARGET_STATUS-V04, DC-02 | FR-10 | Xác nhận User có thể hủy khi đơn ở `pending`. |
| TC-FR10-DT-005 | COND-FR10-DT-005 | EC-CURRENT_STATUS-V02, EC-ACTOR-V01, EC-TARGET_STATUS-V04, DC-02 | FR-10 | Xác nhận Admin có thể hủy khi đơn ở `confirmed`. |
| TC-FR10-DT-006 | COND-FR10-DT-006 | EC-CURRENT_STATUS-V01, EC-ACTOR-V01, EC-TARGET_STATUS-I01, DC-01 | FR-10 | Kiểm tra bước nhảy không hợp lệ. |
| TC-FR10-DT-007 | COND-FR10-DT-007 | EC-CURRENT_STATUS-V02, EC-ACTOR-V01, EC-TARGET_STATUS-I02, DC-01 | FR-10 | Kiểm tra chuyển đổi ngược không hợp lệ. |
| TC-FR10-DT-008 | COND-FR10-DT-008 | EC-CURRENT_STATUS-V04, EC-ACTOR-V01, EC-TARGET_STATUS-I03, DC-03 | FR-10 | Kiểm tra `delivered` là final state. |
| TC-FR10-DT-009 | COND-FR10-DT-009 | EC-CURRENT_STATUS-V05, EC-ACTOR-V01, EC-TARGET_STATUS-I04, DC-03 | FR-10 | Kiểm tra `canceled` là final state. |
| TC-FR10-DT-010 | COND-FR10-DT-010 | EC-CURRENT_STATUS-V03, EC-ACTOR-V02, EC-TARGET_STATUS-I05, DC-02 | FR-10 | Kiểm tra User không được tự hủy khi đơn ở `shipping`. |
| TC-FR10-DT-011 | COND-FR10-DT-011 | EC-CURRENT_STATUS-V01, EC-ACTOR-I01, EC-TARGET_STATUS-V01, DC-04 | FR-10 | Kiểm tra User không được thực hiện thao tác Admin xác nhận. |
| TC-FR10-DT-012 | COND-FR10-DT-012 | EC-CURRENT_STATUS-V01, EC-ACTOR-V01, EC-TARGET_STATUS-I06 | FR-10 | Kiểm tra trạng thái đích ngoài domain. |
| TC-FR10-DT-013 | COND-FR10-DT-013 | EC-CURRENT_STATUS-I01, EC-ACTOR-V01, EC-TARGET_STATUS-V01 | FR-10 | Kiểm tra trạng thái hiện tại ngoài domain. |
| TC-FR10-DT-014 | COND-FR10-DT-014 | EC-CURRENT_STATUS-V01, EC-ACTOR-I02, EC-TARGET_STATUS-V04, DC-04 | FR-10 | Kiểm tra actor chưa đăng nhập/không xác định; cần xác nhận từ requirement xác thực. |

## 8. Tổng kết độ bao phủ

| Metric | Value |
|---|---:|
| Tổng input/condition đã phân tích | 5 |
| Tổng valid classes | 11 |
| Tổng invalid classes | 9 |
| Tổng dependent conditions | 4 |
| Tổng test conditions | 14 |
| Tổng test cases | 14 |
| Classes đã cover | 20 |
| Classes chưa cover | 0 |

| Class ID | Trạng thái coverage | Test case cover | Ghi chú |
|---|---|---|---|
| EC-CURRENT_STATUS-V01 | Đã cover | TC-FR10-DT-001, TC-FR10-DT-004, TC-FR10-DT-006, TC-FR10-DT-011, TC-FR10-DT-012, TC-FR10-DT-014 | Trạng thái đầu luồng. |
| EC-CURRENT_STATUS-V02 | Đã cover | TC-FR10-DT-002, TC-FR10-DT-005, TC-FR10-DT-007 | Trạng thái đã xác nhận. |
| EC-CURRENT_STATUS-V03 | Đã cover | TC-FR10-DT-003, TC-FR10-DT-010 | Trạng thái đang giao. |
| EC-CURRENT_STATUS-V04 | Đã cover | TC-FR10-DT-008 | Final state `delivered`. |
| EC-CURRENT_STATUS-V05 | Đã cover | TC-FR10-DT-009 | Final state `canceled`. |
| EC-CURRENT_STATUS-I01 | Đã cover | TC-FR10-DT-013 | Trạng thái hiện tại ngoài domain. |
| EC-ACTOR-V01 | Đã cover | TC-FR10-DT-001, TC-FR10-DT-002, TC-FR10-DT-003, TC-FR10-DT-005, TC-FR10-DT-006, TC-FR10-DT-007, TC-FR10-DT-008, TC-FR10-DT-009, TC-FR10-DT-012, TC-FR10-DT-013 | Admin. |
| EC-ACTOR-V02 | Đã cover | TC-FR10-DT-004, TC-FR10-DT-010 | User. |
| EC-ACTOR-I01 | Đã cover | TC-FR10-DT-011 | User thực hiện thao tác Admin. |
| EC-ACTOR-I02 | Đã cover | TC-FR10-DT-014 | Cần xác nhận requirement xác thực. |
| EC-TARGET_STATUS-V01 | Đã cover | TC-FR10-DT-001, TC-FR10-DT-011, TC-FR10-DT-013 | Chuyển sang `confirmed`. |
| EC-TARGET_STATUS-V02 | Đã cover | TC-FR10-DT-002 | Chuyển sang `shipping`. |
| EC-TARGET_STATUS-V03 | Đã cover | TC-FR10-DT-003 | Chuyển sang `delivered`. |
| EC-TARGET_STATUS-V04 | Đã cover | TC-FR10-DT-004, TC-FR10-DT-005, TC-FR10-DT-014 | Hủy đơn hợp lệ theo trạng thái hoặc kiểm tra quyền. |
| EC-TARGET_STATUS-I01 | Đã cover | TC-FR10-DT-006 | Bước nhảy. |
| EC-TARGET_STATUS-I02 | Đã cover | TC-FR10-DT-007 | Bước lùi. |
| EC-TARGET_STATUS-I03 | Đã cover | TC-FR10-DT-008 | Chuyển từ `delivered`. |
| EC-TARGET_STATUS-I04 | Đã cover | TC-FR10-DT-009 | Chuyển từ `canceled`. |
| EC-TARGET_STATUS-I05 | Đã cover | TC-FR10-DT-010 | User hủy khi `shipping`. |
| EC-TARGET_STATUS-I06 | Đã cover | TC-FR10-DT-012 | Trạng thái đích ngoài domain. |

## 9. Giả định và thông tin chưa được đặc tả

- Chưa được đặc tả thông báo lỗi cụ thể cho từng chuyển đổi không hợp lệ; Expected Result chỉ yêu cầu lỗi phù hợp và trạng thái không đổi.
- Chưa được đặc tả cách chuẩn bị đơn hàng ở từng trạng thái trước khi test; test case ghi precondition cần có dữ liệu đơn hàng ở trạng thái tương ứng.
- Chưa được đặc tả User có thể hủy qua màn hình nào và Admin thao tác qua màn hình nào; test steps dùng mô tả chức năng mức black-box.
- Chưa được đặc tả trạng thái đích ngoài domain hoặc trạng thái hiện tại ngoài domain có thể được nhập qua giao diện hay chỉ qua lớp bảo vệ hệ thống; các test này kiểm tra domain robustness.
- Giả định cần xác nhận: actor chưa đăng nhập/không xác định phải bị từ chối khi thao tác trạng thái đơn hàng. FR-10 không mô tả trực tiếp xác thực, nhưng đây là điều kiện hệ thống liên quan đến thao tác trạng thái.
- Giả định cần xác nhận: FR-10 không khẳng định Admin được hủy đơn ở trạng thái `shipping`; vì vậy không tạo valid test case cho `shipping` -> `canceled` bởi Admin.
