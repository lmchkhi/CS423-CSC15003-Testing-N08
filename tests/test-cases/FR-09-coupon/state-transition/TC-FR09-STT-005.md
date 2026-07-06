<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-005.md -->

# TC-FR09-STT-005: C3=F Rejected (BIGBUY under min amount) (State Transition Testing)

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

| TC              | From State     | Event  | Guard Condition(s)                 | To State     | Expected                                                  |
| --------------- | -------------- | ------ | ---------------------------------- | ------------ | --------------------------------------------------------- |
| TC-FR09-STT-005 | S1: Validating | (auto) | C1=T, C2=T, C3=F (đơn dưới ngưỡng) | S3: Rejected | ✅ ❌ Thông báo lỗi 'Đơn hàng chưa đạt giá trị tối thiểu' |

> **Ghi chú:** Valid transition (Error path), isolates C3=False

## Preconditions

- Hệ thống EShop đang hoạt động
- S1: Validating
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field        | Value     |
| ------------ | --------- |
| Coupon Code  | BIGBUY    |
| Total Amount | 400,000 ₫ |

> Mã BIGBUY yêu cầu tối thiểu 500,000đ, nhưng đơn chỉ có 400,000đ

## Test steps

1. Tạo giỏ hàng có tổng = 400,000đ
2. Vào Checkout, nhập mã BIGBUY
3. Bấm 'Áp dụng' (S1)
4. Đợi hệ thống validate xong

## Expected result

Hệ thống chuyển sang S3: Rejected. Hiển thị thông báo 'Đơn hàng chưa đạt giá trị tối thiểu'. Tổng tiền giữ nguyên.

## Actual result

Hệ thống chuyển sang S3: Rejected. Hiển thị thông báo 'Đơn hàng chưa đạt giá trị tối thiểu'. Tổng tiền giữ nguyên.

## Status

PASSED
