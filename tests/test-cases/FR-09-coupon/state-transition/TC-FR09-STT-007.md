<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-007.md -->

# TC-FR09-STT-007: C5=F Rejected (SAVE10 max uses reached) (State Transition Testing)

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

| TC              | From State     | Event  | Guard Condition(s)                      | To State     | Expected                                      |
| --------------- | -------------- | ------ | --------------------------------------- | ------------ | --------------------------------------------- |
| TC-FR09-STT-007 | S1: Validating | (auto) | C1=T, C2=T, C3=T, C4=T, C5=F (hết lượt) | S3: Rejected | ✅ ❌ Thông báo lỗi 'Bạn đã sử dụng hết lượt' |

> **Ghi chú:** Valid transition (Error path), isolates C5=False

## Preconditions

- Hệ thống EShop đang hoạt động
- S1: Validating (User test@eshop.com đã từng dùng SAVE10 1 lần trước đó)
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field        | Value     |
| ------------ | --------- |
| Coupon Code  | SAVE10    |
| Total Amount | 300,000 ₫ |

> SAVE10 có max_uses_per_user=1, user đã dùng hết limit

## Test steps

1. Đảm bảo user đã dùng SAVE10 trong 1 đơn hàng thành công trước đó
2. Tạo đơn mới, vào Checkout
3. Nhập mã SAVE10 và bấm 'Áp dụng' (S1)
4. Đợi validate

## Expected result

Hệ thống chuyển sang S3: Rejected. Hiển thị thông báo 'Bạn đã sử dụng hết lượt dùng mã này'.

## Actual result

Không tới được bước xét lượt dùng vì request bị chặn ở min-order 300,000 ₫ trước đó.

## Status

FAILED
