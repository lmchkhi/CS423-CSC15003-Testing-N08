<!-- tests/test-cases/FR-09-coupon-mobile/bva/TC-FR09-BVA-001.md -->

# TC-FR09-BVA-001: SAVE10 — total_amount = 299,999₫ (giá trị biên OFF⁻)

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

> **Ghi chú:** Test case này kiểm tra giá trị OFF⁻ — tổng đơn hàng thấp hơn ngưỡng tối thiểu đúng 1₫. Mã SAVE10 yêu cầu đơn hàng tối thiểu 300,000₫, giá trị 299,999₫ nằm ngay dưới biên nên phải bị từ chối.

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng di động (React Native) đã được cài đặt và hoạt động bình thường
- Người dùng đã đăng nhập bằng tài khoản test@eshop.com
- Giỏ hàng có sản phẩm với tổng giá trị đúng 299,999₫
- Người dùng chưa sử dụng mã SAVE10 trước đó
- Mã SAVE10 còn trong hạn sử dụng (hạn: 2099-12-31)

## Test data

| Field               | Value    |
| ------------------- | -------- |
| Mã giảm giá         | SAVE10   |
| Loại giảm giá       | percent  |
| Giá trị giảm        | 10%      |
| Ngưỡng tối thiểu    | 300,000₫ |
| Tổng đơn hàng       | 299,999₫ |
| Số lần đã dùng      | 0        |
| Số lần tối đa/người | 1        |

> Tổng đơn hàng 299,999₫ được thiết lập bằng cách thêm sản phẩm có giá phù hợp vào giỏ hàng. Giá trị này thấp hơn ngưỡng tối thiểu 300,000₫ đúng 1₫ (OFF⁻).

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đăng nhập bằng tài khoản test@eshop.com (nếu chưa đăng nhập)
3. Thêm sản phẩm vào giỏ hàng sao cho tổng giá trị đơn hàng = 299,999₫
4. Chạm vào tab **Giỏ hàng** trên thanh điều hướng dưới cùng
5. Xác nhận tổng giá trị giỏ hàng hiển thị là 299,999₫
6. Chạm vào nút **Thanh toán** để chuyển sang màn hình thanh toán
7. Tại màn hình thanh toán, chạm vào ô nhập **Mã giảm giá**
8. Nhập "SAVE10" bằng bàn phím ảo
9. Chạm vào nút **Áp dụng** bên cạnh ô nhập mã giảm giá
10. Quan sát phản hồi trên màn hình (Toast/Alert thông báo)

## Expected result

❌ **Từ chối — Đơn hàng chưa đạt ngưỡng tối thiểu 300,000₫**

- Hệ thống hiển thị Toast/Alert thông báo lỗi: đơn hàng chưa đạt ngưỡng tối thiểu 300,000₫ để sử dụng mã SAVE10
- Mã giảm giá SAVE10 **không** được áp dụng vào đơn hàng
- Tổng thanh toán vẫn giữ nguyên 299,999₫ (không có giảm giá)

## Actual result

- Mã giảm giá SAVE10 không được áp dụng, và hệ thống hiển thị thông báo lỗi: "Đơn hàng chưa đạt ngưỡng tối thiểu 300,000₫ để sử dụng mã SAVE10."

## Status

PASSED
