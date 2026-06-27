<!-- tests/test-cases/FR-09-coupon-mobile/domain-testing/TC-FR09-DT-009.md -->

# TC-FR09-DT-009: Đã dùng hết lượt cho phép — SAVE10, max=1, đã dùng 1 lần (Domain Testing)

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

| TC     | code                    | total_amount                 | Authorization     | expired_at                       | usage_count                      | Expected                              |
| ------ | ----------------------- | ---------------------------- | ----------------- | -------------------------------- | -------------------------------- | ------------------------------------- |
| DT-009 | V1-01 (Valid: "SAVE10") | V2-01 (500,000₫ >= 300,000₫) | V3-01 (Logged in) | V4-01 (2099-12-31 — Not expired) | **V5-02** (1 >= 1 — Đã hết lượt) | ❌ Thông báo lỗi: đã hết lượt sử dụng |

## Preconditions

- Hệ thống EShop đang hoạt động
- Người dùng đã đăng nhập với tài khoản test@eshop.com
- Giỏ hàng có sản phẩm với tổng giá trị 500,000₫
- Mã SAVE10 đang hoạt động (is_active = 1), loại percent, giá trị 10%, ngưỡng tối thiểu 300,000₫, hạn dùng 2099-12-31, max_uses_per_user = 1
- **Người dùng đã sử dụng mã SAVE10 thành công 1 lần trước đó** (usage_count = 1, đã đạt max_uses_per_user)

## Test data

| Field                  | Value                |
| ---------------------- | -------------------- |
| code                   | SAVE10               |
| total_amount           | 500,000₫             |
| Coupon type            | percent              |
| discount_value         | 10%                  |
| min_order_amount       | 300,000₫             |
| expired_at             | 2099-12-31           |
| max_uses_per_user      | 1                    |
| usage_count (hiện tại) | 1 (đã dùng hết lượt) |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đăng nhập với tài khoản test@eshop.com (tài khoản đã dùng SAVE10 thành công 1 lần trước đó)
3. Chạm vào tab "Giỏ hàng" trên thanh điều hướng phía dưới
4. Xác nhận giỏ hàng hiển thị tổng giá trị 500,000₫
5. Chạm nút "Thanh toán" để chuyển sang màn hình Checkout
6. Tại màn hình Checkout, vuốt xuống đến khu vực "Mã giảm giá"
7. Chạm vào ô nhập mã giảm giá (input field)
8. Nhập "SAVE10" bằng bàn phím ảo
9. Chạm nút "Áp dụng" bên cạnh ô nhập mã
10. Quan sát phản hồi từ hệ thống trên màn hình

## Expected result

- ❌ Hệ thống hiển thị Toast/Alert thông báo lỗi: "Bạn đã sử dụng hết lượt cho phép của mã giảm giá này" hoặc "Mã giảm giá đã được sử dụng tối đa số lần cho phép"
- Tổng thanh toán **không thay đổi**, vẫn giữ nguyên 500,000₫
- Không có mã giảm giá nào được áp dụng vào đơn hàng
- Ô nhập mã giảm giá vẫn cho phép nhập lại mã khác

## Actual result

- Hệ thống hiển thị Toast/Alert thông báo lỗi: "Bạn đã sử dụng hết lượt cho phép của mã giảm giá này" hoặc "Mã giảm giá đã được sử dụng tối đa số lần cho phép"
- Tổng thanh toán **không thay đổi**, vẫn giữ nguyên 500,000₫
- Không có mã giảm giá nào được áp dụng vào đơn hàng
- Ô nhập mã giảm giá vẫn cho phép nhập lại mã khác

## Status

PASSED
