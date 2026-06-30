# TC-FR13-DT-003: Cộng dồn doanh thu của nhiều đơn hàng delivered

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
| `order.status` | Enum / trạng thái | Đơn có `status = 'delivered'` được tính vào tổng doanh thu. |
| `order.total_amount` | Số tiền | `total_amount` của từng đơn `delivered` được cộng vào tổng doanh thu. |
| `order_count` | Số lượng tính toán | Tổng số đơn hàng phải bằng số đơn hiện có. |

### Domain Matrix

| TC | `admin_session` | `order_dataset` | `order.status` / `order.total_amount` | Expected |
|---|---|---|---|---|
| COND-FR13-DT-003 | EC-SESSION-V01 | EC-DATASET-V03, EC-COUNT-V02 | EC-STATUS-V01, EC-AMOUNT-V01: `delivered = 120000`, `delivered = 80000` | Dashboard hiển thị tổng doanh thu `200000` và tổng số đơn hàng `2`. |

## Preconditions
- Có tài khoản Admin hợp lệ.
- Môi trường test có đúng hai đơn hàng, cả hai đều có trạng thái `delivered`.

## Test data

| Field | Value |
|---|---|
| Tài khoản đăng nhập | Admin có `role = 'admin'` |
| Đơn hàng 1 - status | `delivered` |
| Đơn hàng 1 - total_amount | `120000` |
| Đơn hàng 2 - status | `delivered` |
| Đơn hàng 2 - total_amount | `80000` |
| Tổng doanh thu kỳ vọng | `200000` |
| Tổng số đơn hàng kỳ vọng | `2` |

## Test steps
1. Đăng nhập vào phân hệ Web Admin bằng tài khoản Admin.
2. Mở màn hình Dashboard.
3. Quan sát chỉ số tổng doanh thu.
4. Quan sát chỉ số tổng số đơn hàng.

## Expected result
Dashboard cho phép Admin xem màn hình. Chỉ số tổng doanh thu hiển thị `200000`, bằng `120000 + 80000`; chỉ số tổng số đơn hàng hiển thị `2`. Dữ liệu đơn hàng không bị thay đổi khi chỉ xem Dashboard.

## Status / Related bugs
Fail / BUG-FR13-001
