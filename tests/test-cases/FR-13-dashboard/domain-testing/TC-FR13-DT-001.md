# TC-FR13-DT-001: Hiển thị Dashboard khi chưa có đơn hàng

## Requirement ID
FR-13

## Module / Test type / Technique
Web Admin Dashboard / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable | Type | Domain / Constraints |
|---|---|---|
| `admin_session` | Trạng thái hệ thống | Admin đã đăng nhập hợp lệ; dependency từ FR-12. |
| `order_dataset` | Tập dữ liệu | Không có đơn hàng trong hệ thống. |
| `order_count` | Số lượng tính toán | Tổng số đơn hàng phải bằng số đơn hiện có. |

### Domain Matrix

| TC | `admin_session` | `order_dataset` | Expected |
|---|---|---|---|
| COND-FR13-DT-001 | EC-SESSION-V01 | EC-DATASET-V01, EC-COUNT-V01 | Dashboard hiển thị tổng doanh thu `0` và tổng số đơn hàng `0`. |

## Preconditions
- Có tài khoản Admin hợp lệ.
- Môi trường test không có đơn hàng nào.

## Test data

| Field | Value |
|---|---|
| Tài khoản đăng nhập | Admin có `role = 'admin'` |
| Số đơn hàng trong hệ thống | `0` |
| Tổng doanh thu kỳ vọng | `0` |
| Tổng số đơn hàng kỳ vọng | `0` |

## Test steps
1. Đăng nhập vào phân hệ Web Admin bằng tài khoản Admin.
2. Mở màn hình Dashboard.
3. Quan sát chỉ số tổng doanh thu.
4. Quan sát chỉ số tổng số đơn hàng.

## Expected result
Dashboard cho phép Admin xem màn hình. Chỉ số tổng doanh thu hiển thị `0`; chỉ số tổng số đơn hàng hiển thị `0`. Không có đơn hàng nào được tạo hoặc thay đổi trong quá trình xem Dashboard.

## Status / Related bugs
Passed / None
