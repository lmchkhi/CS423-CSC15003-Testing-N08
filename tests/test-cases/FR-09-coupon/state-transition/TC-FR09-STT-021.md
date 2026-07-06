<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-021.md -->

# TC-FR09-STT-021: VIP100 at max_uses_per_user (State Transition Testing)

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

| TC              | From State     | Event  | Guard Condition(s)        | To State     | Expected                     |
| --------------- | -------------- | ------ | ------------------------- | ------------ | ---------------------------- |
| TC-FR09-STT-021 | S1: Validating | (auto) | C5 boundary (uses == max) | S3: Rejected | ✅ ❌ Bị reject (Chạm limit) |

> **Ghi chú:** Edge Case (EC04) - C5 Boundary (uses limit reached)

## Preconditions

- Hệ thống EShop đang hoạt động
- S1: Validating (User đã dùng VIP100 2 lần)
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field        | Value     |
| ------------ | --------- |
| Coupon Code  | VIP100    |
| Total Amount | 300,000 ₫ |

> VIP100 max_uses=2, đã dùng 2, giờ test lượt 3

## Test steps

1. User đã dùng VIP100 đủ 2 lần trong 2 đơn thành công trước đó
2. Tạo đơn thứ 3, nhập VIP100
3. Bấm 'Áp dụng'

## Expected result

C5 fail vì (uses=2) không nhỏ hơn (max=2). Chuyển S3: Rejected, báo 'Bạn đã sử dụng hết lượt'.

## Actual result

VIP100 ở mức 300,000 ₫ cũng bị chặn ở min-order trước khi xét max_uses_per_user.

## Status

FAILED
