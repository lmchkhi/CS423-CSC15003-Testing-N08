# Phân tích Boundary Value Analysis — FR-10: Trạng thái Đơn hàng

## 1. Tóm tắt requirement

| Thuộc tính | Nội dung |
|---|---|
| Requirement ID | FR-10 |
| Tên chức năng | Trạng thái Đơn hàng (Order State Machine) |
| Input | Trạng thái hiện tại của đơn hàng, actor thực hiện thao tác, thao tác hoặc trạng thái đích mong muốn. |
| Validation rules | Đơn hàng chỉ có 5 trạng thái: `pending`, `confirmed`, `shipping`, `delivered`, `canceled`. Chuyển đổi phải tuân theo state machine. `delivered` và `canceled` là final states. User không được tự hủy khi đơn hàng ở `shipping`. |
| Business rules | Các chuyển đổi hợp lệ được đặc tả bằng cạnh trạng thái: `pending` -> `confirmed`, `confirmed` -> `shipping`, `shipping` -> `delivered`, `pending` -> `canceled`, `confirmed` -> `canceled`. |
| Preconditions | Có đơn hàng tồn tại trong hệ thống; actor có vai trò phù hợp với thao tác đang xét. |
| Success condition | Chuyển đổi hợp lệ được chấp nhận và trạng thái đơn hàng được cập nhật đúng. |
| Error condition | Chuyển đổi không hợp lệ phải trả về lỗi với thông báo phù hợp và không làm thay đổi trạng thái đơn hàng. |

## 2. Các biến có biên

| Variable | Type | Constraint | Lower boundary | Upper boundary | Inclusive / Exclusive | Unit | Kết luận |
|---|---|---|---:|---:|---|---|---|
| `current_status` | Enum categorical | Một trong 5 trạng thái được đặc tả. | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Không có miền có thứ tự hoặc ngưỡng số học; không phù hợp BVA. |
| `actor` | Enum categorical / role | `Admin` hoặc `User` theo thao tác được phép. | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Vai trò là phân loại, không có thứ tự hoặc khoảng giá trị. |
| `action_or_target_status` | Enum categorical / command | Trạng thái đích hoặc thao tác phải khớp state machine. | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Trạng thái đích là phân loại và phụ thuộc cạnh chuyển trạng thái, không có min/max. |
| Số lượng trạng thái | Count in requirement | Requirement nêu hệ thống có 5 trạng thái. | Không áp dụng | Không áp dụng | Không áp dụng | trạng thái | Đây là số lượng phần tử của mô hình, không phải input có thể nhận giá trị 4, 5, 6 để kiểm thử boundary. |

## 3. Phương pháp BVA được sử dụng

- Phương pháp: Không áp dụng BVA cho FR-10.
- Lý do lựa chọn: FR-10 không có miền đầu vào dạng số, độ dài chuỗi, ngày giờ, số lần thử, giới hạn kích thước, collection size có thể thao tác, hoặc ngưỡng inclusive/exclusive. Các giá trị chính của FR-10 là trạng thái và actor dạng categorical, còn logic quan trọng là quan hệ chuyển đổi trong state machine. Áp dụng ON/OFF hoặc Normal/Robust BVA cho các trạng thái này sẽ tạo test case gượng ép và có nguy cơ bịa constraint.
- Kỹ thuật phù hợp hơn: Domain Testing hoặc state transition testing. Artifact Domain Testing đã được tách riêng tại `analysis/FR-10-order-state-machine/domain-testing-analysis.md`.

## 4. Xác định ON, OFF⁻ và OFF⁺

| Variable | Boundary | OFF⁻ | ON | OFF⁺ | Ghi chú |
|---|---|---:|---:|---:|---|
| Không có | Không có boundary hợp lệ | Không áp dụng | Không áp dụng | Không áp dụng | Không thể suy ra `min - 1`, `min`, `min + 1`, `max - 1`, `max`, `max + 1` từ enum trạng thái mà không tự bịa thứ tự số học. |

## 5. Boundary Value Derivation

| Boundary Value ID | Variable | Constraint | Point | Formula | Test value | Validity | Expected behavior | Requirement reference |
|---|---|---|---|---|---|---|---|---|
| Không tạo | Không có biến có biên | Không có min/max/range/length/ngưỡng được đặc tả | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Không tạo boundary value vì FR-10 không phù hợp BVA. | FR-10 |

## 6. Dependent Boundaries

| ID | Quan hệ | Boundary values | Expected behavior | Kết luận |
|---|---|---|---|---|
| Không tạo | Quan hệ giữa `current_status`, `actor` và `action_or_target_status` là quan hệ state transition, không phải dependent boundary dạng số/ngày/độ dài. | Không áp dụng | Không áp dụng | Nên kiểm thử bằng Domain Testing hoặc state transition testing, không dùng BVA. |

## 7. BVA Test Matrix

| Test Condition | Variable | Boundary Value ID | Point | Test value | Các ràng buộc khác | Expected | Lý do không tạo |
|---|---|---|---|---|---|---|---|
| Không tạo | Không có biến có biên | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Không tồn tại boundary point hợp lệ để tạo test condition. |

## 8. Quá trình lựa chọn test case

Không tạo test case BVA cho FR-10.

Quyết định này dựa trên các điểm sau:

- BVA chỉ phù hợp khi requirement có miền có thứ tự hoặc ngưỡng có ý nghĩa, ví dụ min/max, length, date/time, quantity, số lần thử hoặc giới hạn collection.
- FR-10 mô tả state machine gồm các trạng thái rời rạc và cạnh chuyển đổi. `pending`, `confirmed`, `shipping`, `delivered`, `canceled` không có thứ tự số học để xác định ON, OFF⁻, OFF⁺.
- Con số “5 trạng thái” là đặc tả số phần tử của state machine, không phải một input như “số trạng thái được phép nhập từ 1 đến 5”.
- Các final states `delivered` và `canceled` là điều kiện phân loại của state machine, không phải boundary min/max.
- Việc tạo test kiểu “4 trạng thái”, “5 trạng thái”, “6 trạng thái” sẽ kiểm thử một requirement không tồn tại trong FR-10.

## 9. Ma trận truy vết

| Test Case ID | Boundary Value ID | Boundary | Test Value | Expected Validity | Requirement Reference | Ghi chú |
|---|---|---|---|---|---|---|
| Không tạo | Không tạo | Không có boundary hợp lệ | Không áp dụng | Không áp dụng | FR-10 | Không tạo test case BVA để tránh test case gượng ép và tránh bịa rule. |

## 10. Tổng kết độ bao phủ

| Metric | Value |
|---|---:|
| Tổng biến có biên | 0 |
| Tổng lower boundaries | 0 |
| Tổng upper boundaries | 0 |
| Tổng dependent boundaries | 0 |
| Phương pháp BVA | Không áp dụng |
| Tổng boundary values | 0 |
| Tổng test cases | 0 |
| Boundary values đã cover | 0 |
| Boundary values chưa cover | 0 |

| Boundary / Candidate | Trạng thái coverage | Lý do |
|---|---|---|
| `current_status` | Chủ động loại trừ | Enum categorical không có thứ tự số học. |
| `actor` | Chủ động loại trừ | Role categorical không có min/max. |
| `action_or_target_status` | Chủ động loại trừ | Cần kiểm thử quan hệ chuyển trạng thái, không phải boundary point. |
| Số lượng 5 trạng thái | Chủ động loại trừ | Không phải input hoặc range do người dùng/hệ thống nhận để thao tác. |

## 11. Giả định và thông tin chưa được đặc tả

- Chưa được đặc tả bất kỳ min, max, length, date/time, số lần thử, số lượng phần tử đầu vào, hoặc ngưỡng inclusive/exclusive nào trong FR-10.
- Chưa được đặc tả trạng thái được mã hóa bằng số thứ tự có ý nghĩa nghiệp vụ. Vì vậy không được suy diễn `pending = 1`, `confirmed = 2`, ... để áp dụng BVA.
- API specification chỉ xác nhận danh sách trạng thái kỹ thuật nhất quán với FR-10; không bổ sung boundary nào có thể dùng để tạo BVA test case.
