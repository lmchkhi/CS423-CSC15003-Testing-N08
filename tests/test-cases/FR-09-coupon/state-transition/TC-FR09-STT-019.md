<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-019.md -->

# TC-FR09-STT-019: SAVE10 at min_order_amount (State Transition Testing)

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

| TC              | From State     | Event  | Guard Condition(s)         | To State    | Expected              |
| --------------- | -------------- | ------ | -------------------------- | ----------- | --------------------- |
| TC-FR09-STT-019 | S1: Validating | (auto) | C3 boundary (total == min) | S2: Applied | ✅ Áp dụng thành công |

> **Ghi chú:** Edge Case (EC02) - C3 Boundary (>=' min amount)

## Preconditions

- Hệ thống EShop đang hoạt động
- S1: Validating
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field        | Value     |
| ------------ | --------- |
| Coupon Code  | SAVE10    |
| Total Amount | 300,000 ₫ |

> Chỉnh giỏ hàng vừa đúng 300,000

## Test steps

1. Điều chỉnh giỏ hàng sao cho total = đúng 300,000đ
2. Vào Checkout, nhập SAVE10
3. Bấm 'Áp dụng'

## Expected result

C3 thỏa mãn vì >= min. Chuyển S2: Applied, giảm giá 10% (30,000đ).

## Actual result

SAVE10 ở đúng ngưỡng 300,000 ₫ vẫn bị reject do lỗi > thay vì >=.

## Status

FAILED
