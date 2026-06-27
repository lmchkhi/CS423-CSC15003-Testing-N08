<!-- tests/test-cases/FR-09-coupon-mobile/bva/TC-FR09-BVA-006.md -->

# TC-FR09-BVA-006: BIGBUY — total_amount = 500,001₫ (giá trị biên OFF⁺)

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

> **Ghi chú:** Test case này kiểm tra giá trị OFF⁺ — tổng đơn hàng vượt ngưỡng tối thiểu 500,000₫ đúng 1₫. Giá trị 500,001₫ nằm ngay trên biên, mã BIGBUY phải được chấp nhận.

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng di động (React Native) đã được cài đặt và hoạt động bình thường
- Người dùng đã đăng nhập bằng tài khoản test@eshop.com
- Giỏ hàng có sản phẩm với tổng giá trị đúng 500,001₫
- Người dùng chưa sử dụng mã BIGBUY trước đó
- Mã BIGBUY còn trong hạn sử dụng (hạn: 2099-12-31)

## Test data

| Field               | Value    |
| ------------------- | -------- |
| Mã giảm giá         | BIGBUY   |
| Loại giảm giá       | fixed    |
| Giá trị giảm        | 50,000₫  |
| Ngưỡng tối thiểu    | 500,000₫ |
| Tổng đơn hàng       | 500,001₫ |
| Số lần đã dùng      | 0        |
| Số lần tối đa/người | 1        |

> Tổng đơn hàng 500,001₫ vượt ngưỡng tối thiểu 1₫ (OFF⁺). Công thức tính: discount = 50,000₫ (fixed); final = 500,001 − 50,000 = 450,001₫.

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đăng nhập bằng tài khoản test@eshop.com (nếu chưa đăng nhập)
3. Thêm sản phẩm vào giỏ hàng sao cho tổng giá trị đơn hàng = 500,001₫
4. Chạm vào tab **Giỏ hàng** trên thanh điều hướng dưới cùng
5. Xác nhận tổng giá trị giỏ hàng hiển thị là 500,001₫
6. Chạm vào nút **Thanh toán** để chuyển sang màn hình thanh toán
7. Tại màn hình thanh toán, chạm vào ô nhập **Mã giảm giá**
8. Nhập "BIGBUY" bằng bàn phím ảo
9. Chạm vào nút **Áp dụng** bên cạnh ô nhập mã giảm giá
10. Quan sát phản hồi trên màn hình (Toast/Alert thông báo)
11. Kiểm tra tổng tiền thanh toán đã được cập nhật

## Expected result

✅ **Chấp nhận — Mã BIGBUY được áp dụng thành công**

- Hệ thống hiển thị Toast/Alert thông báo áp dụng mã giảm giá thành công
- Mã BIGBUY được áp dụng vào đơn hàng
- **Công thức tính giảm giá (fixed):**
  - `discount_amount = discount_value`
  - `discount_amount = 50,000₫`
- **Tổng thanh toán sau giảm:**
  - `final_amount = total - discount_amount`
  - `final_amount = 500,001 - 50,000 = 450,001₫`
- Màn hình thanh toán hiển thị:
  - Tổng đơn hàng: 500,001₫
  - Giảm giá (BIGBUY): -50,000₫
  - Tổng thanh toán: 450,001₫

## Actual result

- Hệ thống hiển thị Toast/Alert thông báo áp dụng mã giảm giá thành công
- Mã BIGBUY được áp dụng vào đơn hàng

## Status

PASSED
