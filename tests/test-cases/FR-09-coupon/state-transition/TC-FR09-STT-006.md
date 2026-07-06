<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-006.md -->

# TC-FR09-STT-006: C4=F Rejected (No JWT) (State Transition Testing)

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

| TC              | From State     | Event  | Guard Condition(s)        | To State     | Expected                                   |
| --------------- | -------------- | ------ | ------------------------- | ------------ | ------------------------------------------ |
| TC-FR09-STT-006 | S1: Validating | (auto) | C4=F (không có JWT Token) | S3: Rejected | ✅ ❌ Hệ thống từ chối — yêu cầu đăng nhập |

> **Ghi chú:** Valid transition (Error path), API-level sneak path for C4=False

## Preconditions

- Hệ thống EShop đang hoạt động
- S1: Validating (Gửi request qua Postman/fetch trực tiếp, không JWT)
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field        | Value     |
| ------------ | --------- |
| Coupon Code  | SAVE10    |
| Total Amount | 300,000 ₫ |

> Thực hiện qua API (không token) do UI đã chặn khách vãng lai vào Checkout

## Test steps

1. Gửi POST request tới API apply coupon với mã SAVE10
2. Không kèm header Authorization: Bearer
3. Nhận response từ server

## Expected result

API trả về HTTP 401 Unauthorized, chặn không cho áp dụng coupon.

## Actual result

Không có JWT vẫn không bị chặn với dữ liệu 300,000 ₫ và SAVE10, API vẫn trả lỗi min-order.

## Status

FAILED
