# TC-FR13-DT-004: Chỉ tính doanh thu của đơn delivered khi dữ liệu có nhiều trạng thái

## Requirement ID
FR-13

## Module / Test type / Technique
Web Admin Dashboard / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `admin_session` | Trạng thái hệ thống | Admin đã đăng nhập hợp lệ; dependency từ FR-12. |
| `order_dataset` | Tập dữ liệu | Có nhiều đơn hàng. |
| `order.status` | Enum / trạng thái | Chỉ đơn có `status = 'delivered'` được tính vào tổng doanh thu; đơn có trạng thái khác `delivered` không được tính vào tổng doanh thu. |
| `order.total_amount` | Số tiền | Chỉ `total_amount` của đơn `delivered` được cộng vào tổng doanh thu. |
| `order_count` | Số lượng tính toán | Tổng số đơn hàng phải bằng số đơn hiện có, không bị lọc theo trạng thái. |

### Domain Matrix

| TC | `admin_session` | `order_dataset` | `order.status` / `order.total_amount` | Expected |
|---|---|---|---|---|
| COND-FR13-DT-004 | EC-SESSION-V01 | EC-DATASET-V03, EC-COUNT-V02 | EC-STATUS-V01, EC-STATUS-I01, EC-AMOUNT-V01, EC-AMOUNT-I01: 1 đơn `delivered = 120000`, 4 đơn không delivered có tổng `400000` | Dashboard hiển thị tổng doanh thu `120000` và tổng số đơn hàng `5`. |

## Preconditions
- Có tài khoản Admin hợp lệ.
- Môi trường test có năm đơn hàng với các trạng thái và số tiền như bảng test data.

## Test data

| Field | Value |
|---|---|
| Tài khoản đăng nhập | Admin có `role = 'admin'` |
| Đơn hàng 1 - status / total_amount | `delivered` / `120000` |
| Đơn hàng 2 - status / total_amount | `pending` / `90000` |
| Đơn hàng 3 - status / total_amount | `confirmed` / `110000` |
| Đơn hàng 4 - status / total_amount | `shipping` / `130000` |
| Đơn hàng 5 - status / total_amount | `canceled` / `70000` |
| Tổng doanh thu kỳ vọng | `120000` |
| Tổng số đơn hàng kỳ vọng | `5` |

## Test steps
1. Đăng nhập vào phân hệ Web Admin bằng tài khoản Admin.
2. Mở màn hình Dashboard.
3. Quan sát chỉ số tổng doanh thu.
4. Quan sát chỉ số tổng số đơn hàng.

## Expected result
Dashboard cho phép Admin xem màn hình. Chỉ số tổng doanh thu hiển thị `120000`, chỉ lấy `total_amount` của đơn `delivered` và không cộng `90000`, `110000`, `130000`, `70000`. Chỉ số tổng số đơn hàng hiển thị `5`. Dữ liệu đơn hàng không bị thay đổi khi chỉ xem Dashboard.

## Status / Related bugs
Failed / BUG-FR13-001
