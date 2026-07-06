<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-013.md -->

# TC-FR09-STT-013: Checkout khi coupon bị Rejected (State Transition Testing)

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

| TC              | From State   | Event           | Guard Condition(s) | To State        | Expected                         |
| --------------- | ------------ | --------------- | ------------------ | --------------- | -------------------------------- |
| TC-FR09-STT-013 | S3: Rejected | E3: Place Order | Coupon bị Rejected | S4: Checked Out | ✅ ⚠️ Checkout với tổng tiền gốc |

> **Ghi chú:** Sneak path (SP02) - Đảm bảo Discount leak không xảy ra

## Preconditions

- Hệ thống EShop đang hoạt động
- S3: Rejected (Nhập EXPIRED bị lỗi)
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field        | Value     |
| ------------ | --------- |
| Coupon Code  | EXPIRED   |
| Total Amount | 300,000 ₫ |

> Mã đã bị reject

## Test steps

1. Đang ở S3: Rejected với thông báo lỗi
2. Bấm 'Đặt hàng' (E3) bỏ qua lỗi
3. Quan sát đơn hàng được tạo

## Expected result

Cho phép đặt hàng (chuyển sang S4). NHƯNG đơn hàng tạo ra phải giữ nguyên giá gốc, không có bất kỳ khoản discount nào được áp dụng do coupon kia đã bị reject.

## Actual result

Coupon bị reject nhưng checkout vẫn tạo đơn với tổng tiền gốc, không bị leak discount.

## Status

PASSED
