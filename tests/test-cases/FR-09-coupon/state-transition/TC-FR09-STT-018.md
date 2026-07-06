<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-018.md -->

# TC-FR09-STT-018: EXPIRED with is_active=1 (State Transition Testing)

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

| TC              | From State     | Event  | Guard Condition(s) | To State     | Expected                        |
| --------------- | -------------- | ------ | ------------------ | ------------ | ------------------------------- |
| TC-FR09-STT-018 | S1: Validating | (auto) | C1=T, C2=F         | S3: Rejected | ✅ ❌ Mã hết hạn dù is_active=1 |

> **Ghi chú:** Edge Case (EC01) - C1 vs C2 interaction

## Preconditions

- Hệ thống EShop đang hoạt động
- S1: Validating
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field        | Value     |
| ------------ | --------- |
| Coupon Code  | EXPIRED   |
| Total Amount | 100,000 ₫ |

> EXPIRED có is_active=1 nhưng expired_at=2020

## Test steps

1. Nhập EXPIRED
2. Bấm 'Áp dụng'
3. Đợi validate

## Expected result

Chuyển S3: Rejected. Mặc dù cờ is_active = 1, điều kiện C2 (hạn) sai nên tổng thể bị reject, báo 'Mã đã hết hạn'.

## Actual result

EXPIRED bị reject đúng vì đã hết hạn

## Status

PASSED
