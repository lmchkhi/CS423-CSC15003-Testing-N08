<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-014.md -->

# TC-FR09-STT-014: Apply coupon sau khi Checked Out (State Transition Testing)

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

| TC              | From State      | Event            | Guard Condition(s) | To State       | Expected              |
| --------------- | --------------- | ---------------- | ------------------ | -------------- | --------------------- |
| TC-FR09-STT-014 | S4: Checked Out | E1: Apply Coupon | Final State        | S4 (không đổi) | ✅ ⚠️ Từ chối áp dụng |

> **Ghi chú:** Sneak path (SP03) - Post-checkout manipulation

## Preconditions

- Hệ thống EShop đang hoạt động
- S4: Checked Out (Đã đặt hàng xong, đang ở trang cảm ơn hoặc gọi thẳng API)
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field        | Value     |
| ------------ | --------- |
| Coupon Code  | SAVE10    |
| Total Amount | 300,000 ₫ |

> Gọi API apply coupon sau khi đơn đã chốt

## Test steps

1. Hoàn tất đặt hàng thành công (S4)
2. Giữ lại ID giỏ hàng cũ, gọi thẳng API POST apply coupon với mã SAVE10
3. Nhận phản hồi

## Expected result

API phải trả về lỗi, từ chối áp dụng do giỏ hàng không còn tồn tại hoặc đơn hàng đã đóng. Không được làm sai lệch final_amount của đơn.

## Actual result

Sau khi đã checkout xong, UI không còn luồng áp coupon; nếu gọi API trực tiếp thì server vẫn không chặn trạng thái đã checkout.

## Status

FAILED
