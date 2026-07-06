<!-- tests/test-cases/FR-09-coupon/state-transition/TC-FR09-STT-012.md -->

# TC-FR09-STT-012: Apply lại khi đã Applied (chồng mã) (State Transition Testing)

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

| TC              | From State  | Event            | Guard Condition(s)   | To State        | Expected                       |
| --------------- | ----------- | ---------------- | -------------------- | --------------- | ------------------------------ |
| TC-FR09-STT-012 | S2: Applied | E1: Apply Coupon | Đã có coupon Applied | S2 (giữ nguyên) | ✅ ⚠️ Từ chối áp dụng chồng mã |

> **Ghi chú:** Sneak path (SP01) - Ngăn ngừa Double discount

## Preconditions

- Hệ thống EShop đang hoạt động
- S2: Applied (Mã SAVE10 đang áp dụng)
- Người dùng đã đăng nhập với tài khoản test@eshop.com (trừ test case API unauth)
- Giỏ hàng có sản phẩm, đang ở trang Checkout

## Test data

| Field        | Value     |
| ------------ | --------- |
| Coupon Code  | VIP100    |
| Total Amount | 300,000 ₫ |

> Cố tình nhập thêm mã thứ 2

## Test steps

1. Đã ở S2: Applied với SAVE10
2. Thử tìm cách nhập mã VIP100 (qua UI hoặc API POST /apply)
3. Gửi request áp dụng mã mới

## Expected result

Hệ thống không cho phép áp dụng chồng mã. Trả về thông báo 'Vui lòng gỡ mã cũ trước' hoặc tự động replace mã cũ. Không được phép cộng dồn 2 coupon.

## Actual result

Project cho phép thay coupon, nhưng với dữ liệu 300,000 ₫ thì SAVE10 không áp dụng được ngay từ đầu nên case không đạt precondition thực tế.

## Status

FAILED
