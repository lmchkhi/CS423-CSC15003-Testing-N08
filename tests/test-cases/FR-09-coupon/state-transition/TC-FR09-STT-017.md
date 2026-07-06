<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-017.md -->

# TC-FR09-STT-017: Apply mã rỗng (State Transition Testing)

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

| TC              | From State | Event            | Guard Condition(s) | To State     | Expected           |
| --------------- | ---------- | ---------------- | ------------------ | ------------ | ------------------ |
| TC-FR09-STT-017 | S0: Idle   | E1: Apply Coupon | Mã rỗng            | S3: Rejected | ✅ ⚠️ Từ chối rỗng |

> **Ghi chú:** Sneak path (SP06) - Empty request block

## Preconditions

- Hệ thống EShop đang hoạt động
- S0: Idle
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field        | Value      |
| ------------ | ---------- |
| Coupon Code  | (Để trống) |
| Total Amount | 300,000 ₫  |

> Không nhập gì vào ô coupon

## Test steps

1. Không nhập mã nào
2. Bấm 'Áp dụng' (nếu nút bấm được)
3. Quan sát UI

## Expected result

Giao diện phải block luôn (nút disable) hoặc validate ở Frontend, báo lỗi 'Vui lòng nhập mã', không gửi request lên server.

## Actual result

Nút Áp dụng bị vô hiệu khi coupon rỗng; không gửi request lên server.

## Status

PASSED
