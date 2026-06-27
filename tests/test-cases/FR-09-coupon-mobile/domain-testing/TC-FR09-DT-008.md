<!-- tests/test-cases/FR-09-coupon-mobile/domain-testing/TC-FR09-DT-008.md -->

# TC-FR09-DT-008: Người dùng chưa đăng nhập (Domain Testing)

## Requirement ID

FR-09

## Module / Test type / Technique

Mã Giảm Giá (Coupon) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable      | Type                  | Domain / Constraints                                                                 |
| ------------- | --------------------- | ------------------------------------------------------------------------------------ |
| code          | String (Input field)  | Mã coupon phải tồn tại trong CSDL và đang hoạt động (`is_active = 1`) — Điều kiện C1 |
| total_amount  | Numeric (Implicit)    | Tổng đơn hàng >= `min_order_amount` của coupon — Điều kiện C3                        |
| Authorization | String (Header)       | JWT Token hợp lệ từ người dùng đã đăng nhập — Điều kiện C4                           |
| expired_at    | Date (Server-side)    | Ngày hiện tại phải trước `expired_at` — Điều kiện C2                                 |
| usage_count   | Numeric (Server-side) | Số lần user đã dùng mã < `max_uses_per_user` — Điều kiện C5                          |

### Domain Matrix

| TC     | code                    | total_amount                 | Authorization                        | expired_at                       | usage_count                 | Expected                                           |
| ------ | ----------------------- | ---------------------------- | ------------------------------------ | -------------------------------- | --------------------------- | -------------------------------------------------- |
| DT-008 | V1-01 (Valid: "SAVE10") | V2-01 (500,000₫ >= 300,000₫) | **V3-02** (No auth — chưa đăng nhập) | V4-01 (2099-12-31 — Not expired) | V5-01 (N/A — chưa xác thực) | ❌ Không thể truy cập Checkout / Yêu cầu đăng nhập |

## Preconditions

- Hệ thống EShop đang hoạt động
- Người dùng **chưa đăng nhập** (trạng thái khách — guest)
- Giỏ hàng có sản phẩm với tổng giá trị 500,000₫ (nếu hệ thống cho phép khách thêm sản phẩm)
- Mã SAVE10 đang hoạt động trong hệ thống

## Test data

| Field         | Value                     |
| ------------- | ------------------------- |
| code          | SAVE10                    |
| total_amount  | 500,000₫                  |
| Authorization | Không có (chưa đăng nhập) |

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đảm bảo người dùng **chưa đăng nhập** (nếu đang đăng nhập, chạm vào tab "Tài khoản" → Chạm "Đăng xuất" → Xác nhận đăng xuất)
3. Chạm vào tab "Giỏ hàng" trên thanh điều hướng phía dưới
4. Thêm sản phẩm vào giỏ hàng có tổng giá trị 500,000₫ (nếu hệ thống cho phép khách thêm sản phẩm)
5. Chạm nút "Thanh toán" để thử chuyển sang màn hình Checkout
6. Quan sát phản hồi từ hệ thống trên màn hình

## Expected result

- ❌ Hệ thống **không cho phép** người dùng chưa đăng nhập truy cập màn hình Checkout
- Một trong hai kịch bản xảy ra:
  - **Kịch bản A**: Ứng dụng hiển thị Alert/Modal yêu cầu đăng nhập trước khi thanh toán, với nút "Đăng nhập" để chuyển sang màn hình đăng nhập
  - **Kịch bản B**: Ứng dụng tự động chuyển hướng đến màn hình Đăng nhập khi chạm nút "Thanh toán"
- Người dùng không thể nhập mã giảm giá khi chưa đăng nhập
- Nếu bằng cách nào đó người dùng vào được màn hình Checkout và nhập mã, hệ thống trả về lỗi xác thực (401 Unauthorized)

## Actual result

- Hệ thống không cho phép người dùng chưa đăng nhập
- Hiển thị Alert/Modal yêu cầu đăng nhập trước khi thanh toán và chuyển hướng tới trang đăng nhập.

## Status

PASSED
