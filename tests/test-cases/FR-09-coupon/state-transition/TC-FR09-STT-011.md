<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-011.md -->

# TC-FR09-STT-011: Re-Apply after Rejected (State Transition Testing)

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

| TC              | From State   | Event        | Guard Condition(s) | To State       | Expected                        |
| --------------- | ------------ | ------------ | ------------------ | -------------- | ------------------------------- |
| TC-FR09-STT-011 | S3: Rejected | E4: Re-Apply | —                  | S1: Validating | ✅ Hệ thống kiểm tra lại mã mới |

> **Ghi chú:** Valid transition (0-switch)

## Preconditions

- Hệ thống EShop đang hoạt động
- S3: Rejected (Vừa nhập mã NOTEXIST bị từ chối)
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field        | Value     |
| ------------ | --------- |
| Coupon Code  | SAVE10    |
| Total Amount | 300,000 ₫ |

> Nhập mã mới hợp lệ để thử lại

## Test steps

1. Ở trạng thái S3 (Rejected) do mã sai
2. Xóa mã sai, nhập mã mới SAVE10
3. Bấm 'Áp dụng' lại (E4)

## Expected result

Hệ thống tiếp nhận, chuyển về S1: Validating và kiểm tra mã SAVE10, sau đó thành công sang S2: Applied.

## Actual result

Re-apply SAVE10 ở mức 300,000 ₫ vẫn bị chặn ở min-order, nên không chuyển sang Applied như kỳ vọng.

## Status

FAILED
