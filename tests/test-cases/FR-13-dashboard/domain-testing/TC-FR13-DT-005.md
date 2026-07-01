# TC-FR13-DT-005: Hiển thị doanh thu bằng 0 khi không có đơn delivered

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
| `order.status` | Enum / trạng thái | Đơn có trạng thái khác `delivered` không được tính vào tổng doanh thu. |
| `order.total_amount` | Số tiền | `total_amount` của đơn không phải `delivered` không được cộng vào tổng doanh thu. |
| `order_count` | Số lượng tính toán | Tổng số đơn hàng phải bằng số đơn hiện có, không bị lọc theo trạng thái. |

### Domain Matrix

| TC | `admin_session` | `order_dataset` | `order.status` / `order.total_amount` | Expected |
|---|---|---|---|---|
| COND-FR13-DT-005 | EC-SESSION-V01 | EC-DATASET-V03, EC-COUNT-V02 | EC-STATUS-I01, EC-AMOUNT-I01: 4 đơn không delivered | Dashboard hiển thị tổng doanh thu `0` và tổng số đơn hàng `4`. |

## Preconditions
- Có tài khoản Admin hợp lệ.
- Môi trường test có bốn đơn hàng, không có đơn nào ở trạng thái `delivered`.

## Test data

| Field | Value |
|---|---|
| Tài khoản đăng nhập | Admin có `role = 'admin'` |
| Đơn hàng 1 - status / total_amount | `pending` / `90000` |
| Đơn hàng 2 - status / total_amount | `confirmed` / `110000` |
| Đơn hàng 3 - status / total_amount | `shipping` / `130000` |
| Đơn hàng 4 - status / total_amount | `canceled` / `70000` |
| Tổng doanh thu kỳ vọng | `0` |
| Tổng số đơn hàng kỳ vọng | `4` |

## Test steps
1. Đăng nhập vào phân hệ Web Admin bằng tài khoản Admin.
2. Mở màn hình Dashboard.
3. Quan sát chỉ số tổng doanh thu.
4. Quan sát chỉ số tổng số đơn hàng.

## Expected result
Dashboard cho phép Admin xem màn hình. Chỉ số tổng doanh thu hiển thị `0` vì không có đơn nào có `status = 'delivered'`. Chỉ số tổng số đơn hàng hiển thị `4`. Dữ liệu đơn hàng không bị thay đổi khi chỉ xem Dashboard.

## Status / Related bugs
Passed / None
