<!-- tests/test-cases/FR-09-coupon-mobile/domain-testing/TC-FR09-DT-002.md -->

# TC-FR09-DT-002: Áp dụng mã BIGBUY thành công — tất cả điều kiện hợp lệ (fixed) (Domain Testing)

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

| TC     | code                    | total_amount                 | Authorization     | expired_at                       | usage_count               | Expected                                             |
| ------ | ----------------------- | ---------------------------- | ----------------- | -------------------------------- | ------------------------- | ---------------------------------------------------- |
| DT-002 | V1-01 (Valid: "BIGBUY") | V2-01 (600,000₫ >= 500,000₫) | V3-01 (Logged in) | V4-01 (2099-12-31 — Not expired) | V5-01 (0 < 1 — Available) | ✅ Thành công — discount = 50,000₫, final = 550,000₫ |

## Preconditions

- Hệ thống EShop đang hoạt động
- Người dùng đã đăng nhập với tài khoản test@eshop.com
- Giỏ hàng có sản phẩm với tổng giá trị 600,000₫
- Mã BIGBUY đang hoạt động (is_active = 1), loại fixed, giá trị 50,000₫, ngưỡng tối thiểu 500,000₫, hạn dùng 2099-12-31, max_uses_per_user = 1
- Người dùng chưa sử dụng mã BIGBUY trước đó (usage_count = 0)

## Test data

| Field                  | Value      |
| ---------------------- | ---------- |
| code                   | BIGBUY     |
| total_amount           | 600,000₫   |
| Coupon type            | fixed      |
| discount_value         | 50,000₫    |
| min_order_amount       | 500,000₫   |
| expired_at             | 2099-12-31 |
| max_uses_per_user      | 1          |
| usage_count (hiện tại) | 0          |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đăng nhập với tài khoản test@eshop.com (nếu chưa đăng nhập)
3. Chạm vào tab "Giỏ hàng" trên thanh điều hướng phía dưới
4. Xác nhận giỏ hàng hiển thị tổng giá trị 600,000₫
5. Chạm nút "Thanh toán" để chuyển sang màn hình Checkout
6. Tại màn hình Checkout, vuốt xuống đến khu vực "Mã giảm giá"
7. Chạm vào ô nhập mã giảm giá (input field)
8. Nhập "BIGBUY" bằng bàn phím ảo
9. Chạm nút "Áp dụng" bên cạnh ô nhập mã
10. Quan sát phản hồi từ hệ thống trên màn hình

## Expected result

- ✅ Hệ thống hiển thị Toast/thông báo thành công: mã giảm giá BIGBUY đã được áp dụng
- Số tiền giảm giá hiển thị: **50,000₫** (loại fixed — discount_value = 50,000₫)
- Tổng thanh toán cập nhật thành: **550,000₫** (tính theo công thức: 600,000 - 50,000 = 550,000₫)
- Mã BIGBUY hiển thị trong khu vực mã giảm giá đã áp dụng

## Actual result

- Hệ thống hiển thị Toast/thông báo thành công: mã giảm giá BIGBUY đã được áp dụng
- Số tiền giảm giá hiển thị: **50,000₫** (loại fixed — discount_value = 50,000₫)
- Tổng thanh toán cập nhật thành: **550,000₫** (tính theo công thức: 600,000 - 50,000 = 550,000₫)
- Mã BIGBUY hiển thị trong khu vực mã giảm giá đã áp dụng

## Status

PASSED
