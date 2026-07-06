<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-002.md -->

# TC-FR09-STT-002: All guards pass (SAVE10) (State Transition Testing)

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

| TC              | From State     | Event  | Guard Condition(s)           | To State    | Expected                            |
| --------------- | -------------- | ------ | ---------------------------- | ----------- | ----------------------------------- |
| TC-FR09-STT-002 | S1: Validating | (auto) | C1=T, C2=T, C3=T, C4=T, C5=T | S2: Applied | ✅ Coupon SAVE10 áp dụng thành công |

> **Ghi chú:** Valid transition (Happy path, All conditions true)

## Preconditions

- Hệ thống EShop đang hoạt động
- S1: Validating (Vừa bấm Áp dụng)
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field        | Value     |
| ------------ | --------- |
| Coupon Code  | SAVE10    |
| Total Amount | 300,000 ₫ |

> Đơn hàng đủ điều kiện >= 300,000

## Test steps

1. Tại trang Checkout, nhập mã SAVE10
2. Bấm 'Áp dụng' để hệ thống Validating (S1)
3. Đợi hệ thống validate xong

## Expected result

Hệ thống chuyển sang trạng thái Applied (S2). Hiển thị số tiền giảm (discount_amount) và tổng tiền cuối cùng (final_amount) đã giảm 10%.

## Actual result

SAVE10 không được áp dụng ở mức 300,000 ₫. API trả lỗi 'Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này' do điều kiện min-order dùng > thay vì >=.

## Status

FAILED
