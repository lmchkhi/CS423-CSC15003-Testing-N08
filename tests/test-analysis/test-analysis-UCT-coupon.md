# Phân tích Use Case Testing — FR-09: Mã Giảm Giá

## 1. Use Case Description

| Thuộc tính | Nội dung |
|-----------|---------|
| **Use Case ID** | UC-09 |
| **Tên Use Case** | Áp dụng mã giảm giá tại Checkout |
| **Actor(s)** | User (Primary Actor), System (Secondary Actor) |
| **Mô tả** | Người dùng nhập mã giảm giá tại bước Checkout; hệ thống kiểm tra năm điều kiện nghiệp vụ, tính số tiền giảm và tổng tiền cuối cùng nếu mã hợp lệ. |
| **Preconditions** | Người dùng đang ở bước Checkout và có đơn hàng với tổng tiền đã được xác định. Để áp dụng mã thành công, người dùng phải đăng nhập bằng JWT Token hợp lệ. |
| **Postconditions (Success)** | Mã giảm giá được áp dụng; `discount_amount` được tính theo loại mã; `final_amount = total - discount_amount`; số lượt User đã sử dụng mã tăng 1. |
| **Postconditions (Failure)** | Mã giảm giá không được áp dụng; tổng tiền không thay đổi; số lượt sử dụng mã không tăng; hệ thống hiển thị thông báo lỗi phù hợp. |
| **Trigger** | Người dùng nhập mã giảm giá và yêu cầu hệ thống áp dụng mã tại Checkout. |

## 2. Main Flow (Luồng chính)

Luồng chính sử dụng mã `SAVE10` để đại diện cho trường hợp giảm theo phần trăm.

| Bước | Actor | Hành động | Phản hồi hệ thống |
|------|-------|----------|-------------------|
| 1 | User | Đăng nhập và truy cập bước Checkout với đơn hàng có tổng tiền từ 300.000 ₫ trở lên. | Hiển thị thông tin Checkout và cho phép nhập mã giảm giá. |
| 2 | User | Nhập mã `SAVE10` và yêu cầu áp dụng. | Tiếp nhận mã giảm giá. |
| 3 | System |  | Kiểm tra đồng thời năm điều kiện: mã tồn tại và đang hoạt động; còn hạn; đủ ngưỡng đơn hàng; JWT Token hợp lệ; số lần User đã dùng mã nhỏ hơn giới hạn. |
| 4 | System |  | Xác định mã có loại `percent`, giá trị giảm 10%. |
| 5 | System |  | Tính `discount_amount = total × 10 / 100`. |
| 6 | System |  | Tính `final_amount = total - discount_amount` và áp dụng kết quả giảm giá cho Checkout. |
| 7 | System |  | Tăng số lượt User đã sử dụng mã `SAVE10` lên 1 và hiển thị thông báo áp dụng mã thành công. |

## 3. Alternative Flows (Luồng thay thế)

### AF-1: Áp dụng mã giảm giá loại fixed

- **Rẽ nhánh từ**: Bước 4 của Main Flow
- **Điều kiện**: Mã hợp lệ có loại `fixed`, ví dụ `BIGBUY` hoặc `VIP100`.
- **Các bước**:
  1. Hệ thống lấy `discount_value` cố định của mã.
  2. Hệ thống tính `discount_amount = discount_value`.
  3. Hệ thống tính `final_amount = total - discount_amount`.
  4. Hệ thống tăng số lượt User đã sử dụng mã lên 1.
- **Kết quả**: Mã giảm giá loại `fixed` được áp dụng và Use Case kết thúc thành công.

### AF-2: Tổng đơn hàng đúng bằng ngưỡng tối thiểu

- **Rẽ nhánh từ**: Bước 3 của Main Flow
- **Điều kiện**: `total = min_order_amount` của mã.
- **Các bước**:
  1. Hệ thống đánh giá điều kiện ngưỡng đơn hàng là hợp lệ vì FR-09 quy định `total >= min_order_amount`.
  2. Hệ thống tiếp tục kiểm tra các điều kiện còn lại.
  3. Hệ thống tính giảm giá theo loại mã.
- **Kết quả**: Mã được áp dụng nếu bốn điều kiện còn lại đều thỏa mãn; Use Case tiếp tục đến Bước 4 của Main Flow.

### AF-3: Áp dụng mã khi User đã dùng nhưng chưa hết lượt

- **Rẽ nhánh từ**: Bước 3 của Main Flow
- **Điều kiện**: User đã dùng mã ít nhất một lần nhưng số lần đã dùng vẫn nhỏ hơn `max_uses_per_user`, ví dụ đã dùng `VIP100` 1 lần trên giới hạn 2 lần.
- **Các bước**:
  1. Hệ thống xác định `used_count < max_uses_per_user`.
  2. Hệ thống tiếp tục tính giảm giá theo loại mã.
- **Kết quả**: Mã được áp dụng nếu bốn điều kiện còn lại đều thỏa mãn; Use Case tiếp tục đến Bước 4 của Main Flow.

## 4. Exception Flows (Luồng ngoại lệ)

### EF-1: Mã không tồn tại

- **Rẽ nhánh từ**: Bước 3 của Main Flow
- **Điều kiện**: Mã người dùng nhập không có trong CSDL.
- **Các bước**:
  1. Hệ thống xác định điều kiện C1 không thỏa mãn.
  2. Hệ thống từ chối áp dụng mã và hiển thị thông báo **"Mã giảm giá không tồn tại"**.
- **Kết quả**: Không tính giảm giá, không tăng lượt sử dụng; Use Case kết thúc thất bại.

### EF-2: Mã không hoạt động

- **Rẽ nhánh từ**: Bước 3 của Main Flow
- **Điều kiện**: Mã tồn tại nhưng có `is_active != 1`.
- **Các bước**:
  1. Hệ thống xác định điều kiện C1 không thỏa mãn.
  2. Hệ thống từ chối áp dụng mã và hiển thị thông báo **"Mã giảm giá hiện không hoạt động"**.
- **Kết quả**: Không tính giảm giá, không tăng lượt sử dụng; Use Case kết thúc thất bại.

### EF-3: Mã đã hết hạn

- **Rẽ nhánh từ**: Bước 3 của Main Flow
- **Điều kiện**: Ngày hiện tại không trước `expired_at`, ví dụ mã `EXPIRED` có hạn dùng `2020-01-01`.
- **Các bước**:
  1. Hệ thống xác định điều kiện C2 không thỏa mãn.
  2. Hệ thống từ chối áp dụng mã và hiển thị thông báo **"Mã giảm giá đã hết hạn"**.
- **Kết quả**: Không tính giảm giá, không tăng lượt sử dụng; Use Case kết thúc thất bại.

### EF-4: Tổng đơn hàng dưới ngưỡng tối thiểu

- **Rẽ nhánh từ**: Bước 3 của Main Flow
- **Điều kiện**: `total < min_order_amount` của mã.
- **Các bước**:
  1. Hệ thống xác định điều kiện C3 không thỏa mãn.
  2. Hệ thống từ chối áp dụng mã và hiển thị thông báo **"Đơn hàng chưa đạt giá trị tối thiểu để sử dụng mã"**.
- **Kết quả**: Không tính giảm giá, không tăng lượt sử dụng; Use Case kết thúc thất bại.

### EF-5: User chưa đăng nhập

- **Rẽ nhánh từ**: Bước 3 của Main Flow
- **Điều kiện**: Yêu cầu áp dụng mã không có JWT Token.
- **Các bước**:
  1. Hệ thống xác định điều kiện C4 không thỏa mãn.
  2. Hệ thống từ chối áp dụng mã và hiển thị thông báo **"Vui lòng đăng nhập để sử dụng mã giảm giá"**.
- **Kết quả**: Không tính giảm giá, không tăng lượt sử dụng; Use Case kết thúc thất bại.

### EF-6: JWT Token không hợp lệ

- **Rẽ nhánh từ**: Bước 3 của Main Flow
- **Điều kiện**: Yêu cầu có JWT Token nhưng token không hợp lệ.
- **Các bước**:
  1. Hệ thống xác định điều kiện C4 không thỏa mãn.
  2. Hệ thống từ chối áp dụng mã và hiển thị thông báo **"Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại"**.
- **Kết quả**: Không tính giảm giá, không tăng lượt sử dụng; Use Case kết thúc thất bại.

### EF-7: User đã dùng hết lượt của mã

- **Rẽ nhánh từ**: Bước 3 của Main Flow
- **Điều kiện**: Số lần User đã dùng mã bằng hoặc lớn hơn `max_uses_per_user`.
- **Các bước**:
  1. Hệ thống xác định điều kiện C5 không thỏa mãn vì `used_count >= max_uses_per_user`.
  2. Hệ thống từ chối áp dụng mã và hiển thị thông báo **"Bạn đã sử dụng hết lượt cho mã giảm giá này"**.
- **Kết quả**: Không tính giảm giá, không tăng lượt sử dụng; Use Case kết thúc thất bại.

### EF-8: Nhập mã sai chữ hoa/thường

- **Rẽ nhánh từ**: Bước 3 của Main Flow
- **Điều kiện**: Giá trị nhập không khớp chính xác chữ hoa/thường với mã trong CSDL, ví dụ `save10` thay vì `SAVE10`.
- **Các bước**:
  1. Hệ thống so sánh mã có phân biệt chữ hoa/thường.
  2. Hệ thống xác định không có mã khớp chính xác.
  3. Hệ thống từ chối áp dụng mã và hiển thị thông báo **"Mã giảm giá không tồn tại"**.
- **Kết quả**: Không tính giảm giá, không tăng lượt sử dụng; Use Case kết thúc thất bại.

## 5. Tổng hợp Test Scenarios

| # | Scenario | Flow | Mô tả |
|---|---------|------|-------|
| 1 | Main Success — Percent | Main Flow | Áp dụng `SAVE10` thành công và giảm 10% cho đơn đủ điều kiện. |
| 2 | Fixed Discount | AF-1 | Áp dụng mã loại `fixed` thành công và trừ đúng số tiền cố định. |
| 3 | Minimum Threshold Boundary | AF-2 | Chấp nhận mã khi tổng đơn hàng đúng bằng ngưỡng tối thiểu. |
| 4 | Usage Below Maximum | AF-3 | Chấp nhận `VIP100` khi User đã dùng 1 lần và giới hạn là 2 lần. |
| 5 | Coupon Does Not Exist | EF-1 | Từ chối mã không tồn tại trong CSDL. |
| 6 | Coupon Inactive | EF-2 | Từ chối mã tồn tại nhưng không hoạt động. |
| 7 | Coupon Expired | EF-3 | Từ chối mã `EXPIRED`. |
| 8 | Total Below Minimum | EF-4 | Từ chối mã khi tổng đơn hàng thấp hơn ngưỡng tối thiểu. |
| 9 | Missing JWT Token | EF-5 | Từ chối áp dụng mã khi yêu cầu không có JWT Token. |
| 10 | Invalid JWT Token | EF-6 | Từ chối áp dụng mã khi JWT Token không hợp lệ. |
| 11 | Usage Limit Reached | EF-7 | Từ chối mã khi User đã dùng hết số lượt cho phép. |
| 12 | Case-sensitive Coupon Code | EF-8 | Từ chối mã không khớp chính xác chữ hoa/thường, ví dụ `save10`. |

## 6. Chiến lược sinh Test Case

- Main Flow: 1 test case cho mã `percent` (`SAVE10`).
- Alternative Flows: 3 test case, lần lượt cho mã `fixed`, biên đúng bằng ngưỡng tối thiểu và User đã dùng mã nhưng chưa hết lượt.
- Exception Flows: 8 test case, mỗi exception flow một test case.
- Tổng số test case dự kiến: **12**.

## 7. Quy ước đã xác nhận

1. Chỉ có bốn mã mẫu: `SAVE10`, `BIGBUY`, `VIP100`, `EXPIRED`.
2. Sau khi áp dụng mã thành công, số lượt sử dụng mã của User tăng 1; áp dụng thất bại không làm tăng lượt.
3. Hệ thống hiển thị thông báo phù hợp với nguyên nhân thất bại; nội dung kỳ vọng được xác định trong từng Exception Flow.
4. Mã giảm giá có phân biệt chữ hoa/thường và phải khớp chính xác với mã trong CSDL.
5. Không xét trường hợp `discount_amount > total` vì mỗi mã mẫu đều có ngưỡng đơn hàng phù hợp.
6. Để kiểm thử EF-2 mà không tạo thêm mã mẫu, cần tạm đặt `is_active != 1` cho một trong bốn mã trong dữ liệu kiểm thử và hoàn tác sau khi kiểm thử.
