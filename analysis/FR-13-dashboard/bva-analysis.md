# Phân tích Boundary Value Analysis — FR-13: Dashboard

## 1. Tóm tắt requirement

| Thuộc tính | Nội dung |
|---|---|
| Requirement ID | FR-13 |
| Tên chức năng | Dashboard |
| Input | FR-13 không đặc tả input nhập trực tiếp từ người dùng. Dữ liệu liên quan là tập đơn hàng hiện có trong hệ thống. |
| Validation rules | Chưa được đặc tả validation rule có min/max, độ dài, range, số lượng giới hạn, ngày giờ hoặc ngưỡng. |
| Business rules | Dashboard hiển thị tổng doanh thu, chỉ tính tổng `total_amount` của các đơn có `status = 'delivered'`; Dashboard hiển thị tổng số đơn hàng. |
| Preconditions | Admin có quyền truy cập phân hệ Web Admin; dependency từ FR-12. |
| Success condition | Dashboard hiển thị đúng tổng doanh thu và tổng số đơn hàng. |
| Error condition | Người không có quyền Admin không được truy cập phân hệ Admin; cách hiển thị lỗi chưa được đặc tả trong FR-13. |

## 2. Các biến có biên

Không xác định được biến có biên phù hợp để áp dụng Boundary Value Analysis từ FR-13.

| Variable | Type | Constraint | Lower boundary | Upper boundary | Inclusive / Exclusive | Unit | Kết luận |
|---|---|---|---|---|---|---|---|
| `order.status` | Categorical / enum | Chỉ đơn có `status = 'delivered'` được tính vào tổng doanh thu. | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Không phù hợp BVA vì đây là điều kiện phân loại, không phải miền có thứ tự hoặc ngưỡng. |
| `order.total_amount` | Numeric / số tiền | Chỉ cộng `total_amount` của đơn `delivered`. | Chưa được đặc tả | Chưa được đặc tả | Chưa được đặc tả | Chưa được đặc tả | Không phù hợp BVA vì FR-13 không đặc tả min, max, range, ngưỡng làm tròn hoặc giới hạn số tiền. |
| Tổng số đơn hàng | Numeric / số đếm tính toán | Hiển thị tổng số đơn hàng. | Chưa được đặc tả như boundary kiểm thử | Chưa được đặc tả | Chưa được đặc tả | Đơn hàng | Không phù hợp BVA vì FR-13 không đặc tả giới hạn số lượng đơn hàng, pagination limit, collection size limit hoặc ngưỡng chuyển hành vi. |
| Quyền Admin | Trạng thái hệ thống | Chỉ Admin được truy cập phân hệ Admin. | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Không phù hợp BVA vì đây là điều kiện phân quyền dạng categorical/state, không phải giá trị biên. |

## 3. Phương pháp BVA được sử dụng

- Phương pháp: Không áp dụng BVA cho FR-13.
- Lý do lựa chọn: FR-13 không có miền có thứ tự hoặc ngưỡng có ý nghĩa được đặc tả. Các yếu tố chính của requirement là aggregation và filtering theo trạng thái `delivered`, phù hợp với Domain Testing hơn Boundary Value Analysis.
- API specification chỉ được dùng để kiểm tra tính nhất quán: tài liệu kỹ thuật không bổ sung min/max, range, giới hạn số lượng, độ dài, ngày giờ hoặc ngưỡng cho Dashboard.

## 4. Xác định ON, OFF⁻ và OFF⁺

Không xác định ON/OFF⁻/OFF⁺ vì không có boundary point hợp lệ được đặc tả.

| Variable | Boundary | OFF⁻ | ON | OFF⁺ | Ghi chú |
|---|---|---|---|---|---|
| Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Không có min/max hoặc threshold để suy ra điểm ON/OFF. |

## 5. Boundary Value Derivation

Không sinh Boundary Value ID vì mọi boundary point sẽ phải dựa trên giả định ngoài requirement.

| Boundary Value ID | Variable | Constraint | Boundary type | Boundary point | Formula | Test value | Validity | Expected behavior | Requirement reference |
|---|---|---|---|---|---|---|---|---|---|
| Không áp dụng | Không áp dụng | Không có boundary được đặc tả | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | FR-13 |

## 6. Dependent Boundaries

Không xác định dependent boundary hợp lệ.

| ID | Quan hệ | Boundary values | Expected behavior | Requirement reference |
|---|---|---|---|---|
| Không áp dụng | Không có quan hệ min/max, date range, quantity limit hoặc threshold giữa nhiều input. | Không áp dụng | Không áp dụng | FR-13 |

## 7. BVA Test Matrix

Không tạo BVA Test Matrix vì không có boundary value hợp lệ để chọn làm test condition.

| Test Condition | Target variable | Boundary Value ID | Boundary point | Test value | Các ràng buộc khác | Expected validity | Expected behavior | Lý do |
|---|---|---|---|---|---|---|---|---|
| Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Không áp dụng | Không có boundary phù hợp trong FR-13. |

## 8. Quá trình lựa chọn test case

Không tạo test case BVA cho FR-13.

Lý do:

- Không tự bịa min/max cho `total_amount`.
- Không tự bịa upper bound cho tổng số đơn hàng.
- Không coi `status = 'delivered'` là boundary vì đây là categorical condition.
- Không coi quyền Admin là boundary vì đây là access-control state.
- Trường hợp không có đơn hàng hoặc không có đơn `delivered` đã phù hợp với Domain Testing hơn BVA; dùng lại chúng như BVA sẽ là test case gượng ép.

## 9. Ma trận truy vết

Không có test case BVA được tạo.

| Test Case ID | Boundary Value ID | Boundary | Test Value | Expected Validity | Requirement Reference | Trạng thái |
|---|---|---|---|---|---|---|
| Không áp dụng | Không áp dụng | Không có boundary được đặc tả | Không áp dụng | Không áp dụng | FR-13 | Không tạo test case |

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

| Boundary / Candidate | Trạng thái | Lý do |
|---|---|---|
| `order.status = 'delivered'` | Chủ động loại trừ | Đây là điều kiện phân loại, không có thứ tự và không có ON/OFF. |
| `order.total_amount` | Bị chặn do thiếu requirement | FR-13 không đặc tả min/max/range/ngưỡng số tiền. |
| Tổng số đơn hàng | Bị chặn do thiếu requirement | FR-13 không đặc tả giới hạn số lượng, upper bound hoặc threshold hành vi. |
| Quyền Admin | Chủ động loại trừ | Đây là trạng thái phân quyền, không phải boundary value. |

## 11. Giả định và thông tin chưa được đặc tả

- FR-13 không đặc tả giới hạn nhỏ nhất/lớn nhất cho `total_amount`.
- FR-13 không đặc tả giới hạn tổng số đơn hàng, phân trang, giới hạn dataset hoặc ngưỡng hiệu năng.
- FR-13 không đặc tả định dạng tiền tệ, quy tắc làm tròn hoặc đơn vị hiển thị để tạo boundary về format.
- FR-13 không đặc tả khoảng thời gian lọc doanh thu hoặc ngày bắt đầu/ngày kết thúc để tạo boundary về date/time.
- Không tạo test case BVA để tránh suy diễn requirement và tránh trùng lặp gượng ép với Domain Testing đã phù hợp hơn cho FR-13.
