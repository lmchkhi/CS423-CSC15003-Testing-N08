<!-- tests/test-cases/FR-09-coupon-mobile/domain-testing/TC-FR09-DT-006.md -->

# TC-FR09-DT-006: Mã hết hạn sử dụng — EXPIRED (Domain Testing)

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

| TC     | code                           | total_amount                 | Authorization     | expired_at                          | usage_count               | Expected                        |
| ------ | ------------------------------ | ---------------------------- | ----------------- | ----------------------------------- | ------------------------- | ------------------------------- |
| DT-006 | V1-02 (Valid in DB: "EXPIRED") | V2-01 (500,000₫ >= 100,000₫) | V3-01 (Logged in) | **V4-02** (2020-01-01 — Đã hết hạn) | V5-01 (0 < 1 — Available) | ❌ Thông báo lỗi: mã đã hết hạn |

## Preconditions

- Hệ thống EShop đang hoạt động
- Người dùng đã đăng nhập với tài khoản test@eshop.com
- Giỏ hàng có sản phẩm với tổng giá trị 500,000₫
- Mã EXPIRED tồn tại trong CSDL (is_active = 1), loại percent, giá trị 20%, ngưỡng tối thiểu 100,000₫, hạn dùng **2020-01-01** (đã hết hạn), max_uses_per_user = 1
- Người dùng chưa sử dụng mã EXPIRED trước đó (usage_count = 0)

## Test data

| Field                  | Value                   |
| ---------------------- | ----------------------- |
| code                   | EXPIRED                 |
| total_amount           | 500,000₫                |
| Coupon type            | percent                 |
| discount_value         | 20%                     |
| min_order_amount       | 100,000₫                |
| expired_at             | 2020-01-01 (đã hết hạn) |
| max_uses_per_user      | 1                       |
| usage_count (hiện tại) | 0                       |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đăng nhập với tài khoản test@eshop.com (nếu chưa đăng nhập)
3. Chạm vào tab "Giỏ hàng" trên thanh điều hướng phía dưới
4. Xác nhận giỏ hàng hiển thị tổng giá trị 500,000₫
5. Chạm nút "Thanh toán" để chuyển sang màn hình Checkout
6. Tại màn hình Checkout, vuốt xuống đến khu vực "Mã giảm giá"
7. Chạm vào ô nhập mã giảm giá (input field)
8. Nhập "EXPIRED" bằng bàn phím ảo
9. Chạm nút "Áp dụng" bên cạnh ô nhập mã
10. Quan sát phản hồi từ hệ thống trên màn hình

## Expected result

- ❌ Hệ thống hiển thị Toast/Alert thông báo lỗi: "Mã giảm giá đã hết hạn sử dụng" hoặc "Mã giảm giá không còn hiệu lực"
- Tổng thanh toán **không thay đổi**, vẫn giữ nguyên 500,000₫
- Không có mã giảm giá nào được áp dụng vào đơn hàng
- Ô nhập mã giảm giá vẫn cho phép nhập lại mã khác

## Actual result

- Hệ thống hiển thị thông báo lỗi: "Mã giảm giá đã hết hạn sử dụng"
- Ô nhập mã giảm giá vẫn cho phép nhập lại mã khác

## Status

PASSED
