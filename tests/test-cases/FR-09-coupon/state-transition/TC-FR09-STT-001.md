<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-001.md -->

# TC-FR09-STT-001: Apply coupon trigger flow (State Transition Testing)

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

| TC              | From State | Event            | Guard Condition(s) | To State       | Expected                                    |
| --------------- | ---------- | ---------------- | ------------------ | -------------- | ------------------------------------------- |
| TC-FR09-STT-001 | S0: Idle   | E1: Apply Coupon | —                  | S1: Validating | ✅ Hệ thống nhận mã, bắt đầu kiểm tra C1–C5 |

> **Ghi chú:** Valid transition (0-switch)

## Preconditions

- Hệ thống EShop đang hoạt động
- S0: Idle (Chưa nhập mã giảm giá)
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field        | Value     |
| ------------ | --------- |
| Coupon Code  | SAVE10    |
| Total Amount | 300,000 ₫ |

> Mã hợp lệ để kích hoạt flow

## Test steps

1. Truy cập trang Checkout (S0)
2. Nhập mã coupon vào ô nhập
3. Bấm nút 'Áp dụng' (E1)
4. Quan sát trạng thái loading (S1)

## Expected result

Giao diện chuyển sang trạng thái Validating (có thể hiện loading/spinner spinner trong tích tắc) trước khi ra kết quả S2 hoặc S3. Request được gửi tới server.

## Actual result

Giao diện không chuyển sang trạng thái Validating (không có loading/spinner).

Request được gửi tới server, nhưng không có phản hồi trạng thái loading.

## Status

FAILED
