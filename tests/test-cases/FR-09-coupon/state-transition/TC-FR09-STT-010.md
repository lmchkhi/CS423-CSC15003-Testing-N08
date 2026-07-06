<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-010.md -->
# TC-FR09-STT-010: Place order without coupon (State Transition Testing)

## Requirement ID

FR-09

## Module / Test type / Technique

Mã Giảm Giá (Coupon) Checkout / Functional / State Transition Testing (STT)

## State Transition Analysis

### State List

| State ID | State Name | Description |
| -------- | ---------- | ------------ |
| S0 | Idle | Người dùng đang ở trang Checkout, chưa nhập mã coupon |
| S1 | Validating | Hệ thống đang kiểm tra 5 điều kiện (C1–C5). Transient state |
| S2 | Applied | Coupon hợp lệ (C1-C5 pass). Giảm giá được áp dụng |
| S3 | Rejected | Coupon không hợp lệ. Hệ thống hiển thị thông báo lỗi |
| S4 | Checked Out | Đã hoàn tất thanh toán. Final State |

### State Transition Diagram (textual)

[S0: Idle] --(E1: Apply)--> [S1: Validating] --(C1-C5=T)--> [S2: Applied]
                                             \--(any F)--> [S3: Rejected]
[S2: Applied] --(E2: Remove)--> [S0: Idle]
[S2: Applied] --(E3: Order)--> [S4: Checked Out]
[S0: Idle] --(E3: Order)--> [S4: Checked Out]
[S3: Rejected] --(E4: Re-Apply)--> [S1: Validating]

### State Transition Table

| TC | From State | Event | Guard Condition(s) | To State | Expected |
| --- | --- | --- | --- | --- | --- |
| TC-FR09-STT-010 | S0: Idle | E3: Place Order | — | S4: Checked Out | ✅ Đặt hàng thành công không có coupon |

> **Ghi chú:** Valid transition (0-switch), Terminal state

## Preconditions

- Hệ thống EShop đang hoạt động
- S0: Idle (Chưa áp dụng bất kỳ mã nào)
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field | Value |
| --- | --- |
| Coupon Code | (Bỏ trống) |
| Total Amount | 300,000 ₫ |

> Không dùng coupon

## Test steps

1. Ở trạng thái S0 (Idle), không nhập mã
2. Bấm nút 'Đặt hàng' / 'Thanh toán' (E3)
3. Đợi xử lý

## Expected result

Hệ thống chuyển sang S4: Checked Out. Tạo đơn hàng thành công với giá gốc. Giỏ hàng bị xóa.

## Actual result

Đặt hàng không coupon vẫn tạo order thành công, nhưng frontend không xóa cart sau checkout.

## Status

FAILED
