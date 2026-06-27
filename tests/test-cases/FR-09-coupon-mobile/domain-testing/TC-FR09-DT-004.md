<!-- tests/test-cases/FR-09-coupon-mobile/domain-testing/TC-FR09-DT-004.md -->

# TC-FR09-DT-004: Mã không tồn tại trong CSDL — FAKECODE (Domain Testing)

## Requirement ID

FR-09

## Module / Test type / Technique

Mã Giảm Giá (Coupon) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable      | Type                  | Domain / Constraints                                                                 |
| ------------- | --------------------- | ------------------------------------------------------------------------------------ |
| code          | String (Input field)  | Mã coupon phải tồn tại trong CSDL và đang hoạt động (`is_active = 1`) — Điều kiện C1 |
| total_amount  | Numeric (Implicit)    | Tổng đơn hàng >= `min_order_amount` của coupon — Điều kiện C3                        |
| Authorization | String (Header)       | JWT Token hợp lệ từ người dùng đã đăng nhập — Điều kiện C4                           |
| expired_at    | Date (Server-side)    | Ngày hiện tại phải trước `expired_at` — Điều kiện C2                                 |
| usage_count   | Numeric (Server-side) | Số lần user đã dùng mã < `max_uses_per_user` — Điều kiện C5                          |

### Domain Matrix

| TC     | code                                                       | total_amount              | Authorization     | expired_at                     | usage_count                    | Expected                           |
| ------ | ---------------------------------------------------------- | ------------------------- | ----------------- | ------------------------------ | ------------------------------ | ---------------------------------- |
| DT-004 | **V1-03** (Invalid: "FAKECODE" — không tồn tại trong CSDL) | V2-01 (500,000₫ — hợp lệ) | V3-01 (Logged in) | V4-01 (N/A — mã không tồn tại) | V5-01 (N/A — mã không tồn tại) | ❌ Thông báo lỗi: mã không tồn tại |

## Preconditions

- Hệ thống EShop đang hoạt động
- Người dùng đã đăng nhập với tài khoản test@eshop.com
- Giỏ hàng có sản phẩm với tổng giá trị 500,000₫
- Mã "FAKECODE" không tồn tại trong cơ sở dữ liệu hệ thống

## Test data

| Field         | Value                           |
| ------------- | ------------------------------- |
| code          | FAKECODE                        |
| total_amount  | 500,000₫                        |
| Authorization | JWT Token hợp lệ (đã đăng nhập) |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đăng nhập với tài khoản test@eshop.com (nếu chưa đăng nhập)
3. Chạm vào tab "Giỏ hàng" trên thanh điều hướng phía dưới
4. Xác nhận giỏ hàng hiển thị tổng giá trị 500,000₫
5. Chạm nút "Thanh toán" để chuyển sang màn hình Checkout
6. Tại màn hình Checkout, vuốt xuống đến khu vực "Mã giảm giá"
7. Chạm vào ô nhập mã giảm giá (input field)
8. Nhập "FAKECODE" bằng bàn phím ảo
9. Chạm nút "Áp dụng" bên cạnh ô nhập mã
10. Quan sát phản hồi từ hệ thống trên màn hình

## Expected result

- ❌ Hệ thống hiển thị Toast/Alert thông báo lỗi: "Mã giảm giá không tồn tại" hoặc "Mã giảm giá không hợp lệ"
- Tổng thanh toán **không thay đổi**, vẫn giữ nguyên 500,000₫
- Không có mã giảm giá nào được áp dụng vào đơn hàng

## Actual result

- Hệ thống hiển thị thông báo lỗi: "Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa"

## Status

PASSED
