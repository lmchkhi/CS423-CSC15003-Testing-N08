<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-015.md -->

# TC-FR09-STT-015: Place Order lại sau khi Checked Out (State Transition Testing)

## Requirement ID

FR-09

## Module / Test type / Technique

Mã Giảm Giá (Coupon) Checkout / Functional / State Transition Testing (STT)

## State Transition Analysis

### State List

| State ID | State Name  | Description                                                 |
| -------- | ----------- | ----------------------------------------------------------- |
| S0       | Idle        | Người dùng đang ở trang Checkout, chưa nhập mã coupon       |
| S1       | Validating  | Hệ thống đang kiểm tra 5 điều kiện (C1–C5). Transient state |
| S2       | Applied     | Coupon hợp lệ (C1-C5 pass). Giảm giá được áp dụng           |
| S3       | Rejected    | Coupon không hợp lệ. Hệ thống hiển thị thông báo lỗi        |
| S4       | Checked Out | Đã hoàn tất thanh toán. Final State                         |

### State Transition Diagram (textual)

[S0: Idle] --(E1: Apply)--> [S1: Validating] --(C1-C5=T)--> [S2: Applied]
\--(any F)--> [S3: Rejected]
[S2: Applied] --(E2: Remove)--> [S0: Idle]
[S2: Applied] --(E3: Order)--> [S4: Checked Out]
[S0: Idle] --(E3: Order)--> [S4: Checked Out]
[S3: Rejected] --(E4: Re-Apply)--> [S1: Validating]

### State Transition Table

| TC              | From State      | Event           | Guard Condition(s) | To State       | Expected                     |
| --------------- | --------------- | --------------- | ------------------ | -------------- | ---------------------------- |
| TC-FR09-STT-015 | S4: Checked Out | E3: Place Order | Final State        | S4 (không đổi) | ✅ ⚠️ Từ chối đặt hàng trùng |

> **Ghi chú:** Sneak path (SP04) - Duplicate order

## Preconditions

- Hệ thống EShop đang hoạt động
- S4: Checked Out (Vừa đặt hàng thành công)
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field        | Value     |
| ------------ | --------- |
| Coupon Code  | (N/A)     |
| Total Amount | 300,000 ₫ |

> Gọi lại API đặt hàng với payload cũ

## Test steps

1. Hoàn tất đặt hàng (S4)
2. Bấm 'Back' trên trình duyệt hoặc gửi lại request POST /checkout y hệt
3. Nhận phản hồi

## Expected result

Hệ thống từ chối do giỏ hàng trống, trả về thông báo 'Giỏ hàng trống' hoặc không tạo đơn hàng thứ 2.

## Actual result

Gửi lại POST /api/checkout có thể tạo thêm đơn mới vì backend không khóa duplicate order / không kiểm tra cart trống.

## Status

FAILED
