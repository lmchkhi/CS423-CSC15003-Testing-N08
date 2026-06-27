<!-- tests/test-cases/FR-09-coupon-mobile/bva/TC-FR09-BVA-002.md -->

# TC-FR09-BVA-002: SAVE10 — total_amount = 300,000₫ (giá trị biên ON)

## Requirement ID

FR-09

## Module / Test type / Technique

Mã Giảm Giá (Coupon) / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

### Identified Boundaries

| Variable     | Constraint                                  | Boundary Type               | BVA Points                                          |
| ------------ | ------------------------------------------- | --------------------------- | --------------------------------------------------- |
| total_amount | total_amount >= min_order_amount (300,000₫) | min_order_amount = 300,000₫ | 299,999₫ (OFF⁻), **300,000₫ (ON)**, 300,001₫ (OFF⁺) |

### BVA Test Matrix

| TC      | total_amount | Độ dài/Giá trị        | Boundary Point              | Các ràng buộc khác                                                 | Expected     |
| ------- | ------------ | --------------------- | --------------------------- | ------------------------------------------------------------------ | ------------ |
| BVA-001 | 299,999₫     | OFF⁻ (dưới ngưỡng 1₫) | min_order_amount = 300,000₫ | code=SAVE10 (valid, percent 10%), đã đăng nhập, chưa dùng, còn hạn | ❌ Từ chối   |
| BVA-002 | 300,000₫     | ON (đúng ngưỡng)      | min_order_amount = 300,000₫ | code=SAVE10 (valid, percent 10%), đã đăng nhập, chưa dùng, còn hạn | ✅ Chấp nhận |
| BVA-003 | 300,001₫     | OFF⁺ (trên ngưỡng 1₫) | min_order_amount = 300,000₫ | code=SAVE10 (valid, percent 10%), đã đăng nhập, chưa dùng, còn hạn | ✅ Chấp nhận |

> **Ghi chú:** Test case này kiểm tra giá trị ON — tổng đơn hàng đúng bằng ngưỡng tối thiểu 300,000₫. Đây là giá trị nhỏ nhất mà mã SAVE10 phải được chấp nhận.

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng di động (React Native) đã được cài đặt và hoạt động bình thường
- Người dùng đã đăng nhập bằng tài khoản test@eshop.com
- Giỏ hàng có sản phẩm với tổng giá trị đúng 300,000₫
- Người dùng chưa sử dụng mã SAVE10 trước đó
- Mã SAVE10 còn trong hạn sử dụng (hạn: 2099-12-31)

## Test data

| Field               | Value    |
| ------------------- | -------- |
| Mã giảm giá         | SAVE10   |
| Loại giảm giá       | percent  |
| Giá trị giảm        | 10%      |
| Ngưỡng tối thiểu    | 300,000₫ |
| Tổng đơn hàng       | 300,000₫ |
| Số lần đã dùng      | 0        |
| Số lần tối đa/người | 1        |

> Tổng đơn hàng 300,000₫ đúng bằng ngưỡng tối thiểu (ON). Công thức tính: discount = 300,000 × 10/100 = 30,000₫; final = 300,000 − 30,000 = 270,000₫.

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đăng nhập bằng tài khoản test@eshop.com (nếu chưa đăng nhập)
3. Thêm sản phẩm vào giỏ hàng sao cho tổng giá trị đơn hàng = 300,000₫
4. Chạm vào tab **Giỏ hàng** trên thanh điều hướng dưới cùng
5. Xác nhận tổng giá trị giỏ hàng hiển thị là 300,000₫
6. Chạm vào nút **Thanh toán** để chuyển sang màn hình thanh toán
7. Tại màn hình thanh toán, chạm vào ô nhập **Mã giảm giá**
8. Nhập "SAVE10" bằng bàn phím ảo
9. Chạm vào nút **Áp dụng** bên cạnh ô nhập mã giảm giá
10. Quan sát phản hồi trên màn hình (Toast/Alert thông báo)
11. Kiểm tra tổng tiền thanh toán đã được cập nhật

## Expected result

✅ **Chấp nhận — Mã SAVE10 được áp dụng thành công**

- Hệ thống hiển thị Toast/Alert thông báo áp dụng mã giảm giá thành công
- Mã SAVE10 được áp dụng vào đơn hàng
- **Công thức tính giảm giá (percent):**
  - `discount_amount = total × discount_value / 100`
  - `discount_amount = 300,000 × 10 / 100 = 30,000₫`
- **Tổng thanh toán sau giảm:**
  - `final_amount = total - discount_amount`
  - `final_amount = 300,000 - 30,000 = 270,000₫`
- Màn hình thanh toán hiển thị:
  - Tổng đơn hàng: 300,000₫
  - Giảm giá (SAVE10 - 10%): -30,000₫
  - Tổng thanh toán: 270,000₫

## Actual result

- Hệ thống hiển thị thông báo lỗi: "Đơn hàng chưa đạt ngưỡng tối thiểu 300,000₫ để sử dụng mã này." và không áp dụng mã giảm giá.

## Status

FAILED
