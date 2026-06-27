<!-- tests/test-cases/FR-09-coupon-mobile/bva/TC-FR09-BVA-004.md -->

# TC-FR09-BVA-004: BIGBUY — total_amount = 499,999₫ (giá trị biên OFF⁻)

## Requirement ID

FR-09

## Module / Test type / Technique

Mã Giảm Giá (Coupon) / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

### Identified Boundaries

| Variable     | Constraint                                  | Boundary Type               | BVA Points                                          |
| ------------ | ------------------------------------------- | --------------------------- | --------------------------------------------------- |
| total_amount | total_amount >= min_order_amount (500,000₫) | min_order_amount = 500,000₫ | 499,999₫ (OFF⁻), **500,000₫ (ON)**, 500,001₫ (OFF⁺) |

### BVA Test Matrix

| TC      | total_amount | Độ dài/Giá trị        | Boundary Point              | Các ràng buộc khác                                                   | Expected     |
| ------- | ------------ | --------------------- | --------------------------- | -------------------------------------------------------------------- | ------------ |
| BVA-004 | 499,999₫     | OFF⁻ (dưới ngưỡng 1₫) | min_order_amount = 500,000₫ | code=BIGBUY (valid, fixed 50,000₫), đã đăng nhập, chưa dùng, còn hạn | ❌ Từ chối   |
| BVA-005 | 500,000₫     | ON (đúng ngưỡng)      | min_order_amount = 500,000₫ | code=BIGBUY (valid, fixed 50,000₫), đã đăng nhập, chưa dùng, còn hạn | ✅ Chấp nhận |
| BVA-006 | 500,001₫     | OFF⁺ (trên ngưỡng 1₫) | min_order_amount = 500,000₫ | code=BIGBUY (valid, fixed 50,000₫), đã đăng nhập, chưa dùng, còn hạn | ✅ Chấp nhận |

> **Ghi chú:** Test case này kiểm tra giá trị OFF⁻ — tổng đơn hàng thấp hơn ngưỡng tối thiểu 500,000₫ đúng 1₫. Mã BIGBUY yêu cầu đơn hàng tối thiểu 500,000₫, giá trị 499,999₫ nằm ngay dưới biên nên phải bị từ chối.

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng di động (React Native) đã được cài đặt và hoạt động bình thường
- Người dùng đã đăng nhập bằng tài khoản test@eshop.com
- Giỏ hàng có sản phẩm với tổng giá trị đúng 499,999₫
- Người dùng chưa sử dụng mã BIGBUY trước đó
- Mã BIGBUY còn trong hạn sử dụng (hạn: 2099-12-31)

## Test data

| Field               | Value    |
| ------------------- | -------- |
| Mã giảm giá         | BIGBUY   |
| Loại giảm giá       | fixed    |
| Giá trị giảm        | 50,000₫  |
| Ngưỡng tối thiểu    | 500,000₫ |
| Tổng đơn hàng       | 499,999₫ |
| Số lần đã dùng      | 0        |
| Số lần tối đa/người | 1        |

> Tổng đơn hàng 499,999₫ thấp hơn ngưỡng tối thiểu 500,000₫ đúng 1₫ (OFF⁻). Mã BIGBUY không được áp dụng vì chưa đạt ngưỡng.

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đăng nhập bằng tài khoản test@eshop.com (nếu chưa đăng nhập)
3. Thêm sản phẩm vào giỏ hàng sao cho tổng giá trị đơn hàng = 499,999₫
4. Chạm vào tab **Giỏ hàng** trên thanh điều hướng dưới cùng
5. Xác nhận tổng giá trị giỏ hàng hiển thị là 499,999₫
6. Chạm vào nút **Thanh toán** để chuyển sang màn hình thanh toán
7. Tại màn hình thanh toán, chạm vào ô nhập **Mã giảm giá**
8. Nhập "BIGBUY" bằng bàn phím ảo
9. Chạm vào nút **Áp dụng** bên cạnh ô nhập mã giảm giá
10. Quan sát phản hồi trên màn hình (Toast/Alert thông báo)

## Expected result

❌ **Từ chối — Đơn hàng chưa đạt ngưỡng tối thiểu 500,000₫**

- Hệ thống hiển thị Toast/Alert thông báo lỗi: đơn hàng chưa đạt ngưỡng tối thiểu 500,000₫ để sử dụng mã BIGBUY
- Mã giảm giá BIGBUY **không** được áp dụng vào đơn hàng
- Tổng thanh toán vẫn giữ nguyên 499,999₫ (không có giảm giá)

## Actual result

- Hệ thống hiển thị Toast/Alert thông báo lỗi: đơn hàng chưa đạt ngưỡng tối thiểu 500,000₫ để sử dụng mã BIGBUY
- Mã giảm giá BIGBUY **không** được áp dụng vào đơn hàng
- Tổng thanh toán vẫn giữ nguyên 499,999₫ (không có giảm giá)

## Status

PASSED
