<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-016.md -->

# TC-FR09-STT-016: Double-click Apply (Race condition) (State Transition Testing)

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

| TC              | From State     | Event            | Guard Condition(s) | To State | Expected                  |
| --------------- | -------------- | ---------------- | ------------------ | -------- | ------------------------- |
| TC-FR09-STT-016 | S1: Validating | E1: Apply Coupon | Đang xử lý request | Blocked  | ✅ ⚠️ Block request trùng |

> **Ghi chú:** Sneak path (SP05) - Race condition protection

## Preconditions

- Hệ thống EShop đang hoạt động
- S0: Idle
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field        | Value     |
| ------------ | --------- |
| Coupon Code  | SAVE10    |
| Total Amount | 300,000 ₫ |

> Test debounce/disable

## Test steps

1. Nhập mã SAVE10
2. Click đúp liên tục vào nút 'Áp dụng' thật nhanh
3. Quan sát network request

## Expected result

Nút 'Áp dụng' bị disable ngay lần click đầu tiên (khi vào S1). Chỉ gửi đúng 1 request lên server. Không có lỗi spam api.

## Actual result

Nút Áp dụng bị disable khi request đang chạy, nên click đúp trong UI thường chỉ sinh 1 request.

## Status

PASSED
