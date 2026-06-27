<!-- tests/test-cases/FR-09-coupon-mobile/bva/TC-FR09-BVA-010.md -->

# TC-FR09-BVA-010: SAVE10 — Sử dụng lần thứ 1 (usage=0, max=1) (giá trị biên ON)

## Requirement ID

FR-09

## Module / Test type / Technique

Mã Giảm Giá (Coupon) / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

### Identified Boundaries

| Variable    | Constraint                          | Boundary Type         | BVA Points                       |
| ----------- | ----------------------------------- | --------------------- | -------------------------------- |
| usage_count | usage_count < max_uses_per_user (1) | max_uses_per_user = 1 | **0/lần 1 (ON)**, 1/lần 2 (OFF⁺) |

### BVA Test Matrix

| TC      | usage_count        | Độ dài/Giá trị       | Boundary Point        | Các ràng buộc khác                                                           | Expected     |
| ------- | ------------------ | -------------------- | --------------------- | ---------------------------------------------------------------------------- | ------------ |
| BVA-010 | 0 (lần dùng thứ 1) | ON (lần duy nhất)    | max_uses_per_user = 1 | code=SAVE10 (valid, percent 10%), total=500,000₫ (≥300K), đăng nhập, còn hạn | ✅ Chấp nhận |
| BVA-011 | 1 (lần dùng thứ 2) | OFF⁺ (vượt giới hạn) | max_uses_per_user = 1 | code=SAVE10 (valid, percent 10%), total=500,000₫ (≥300K), đăng nhập, còn hạn | ❌ Từ chối   |

> **Ghi chú:** Test case này kiểm tra giá trị ON — người dùng chưa sử dụng mã SAVE10 lần nào (usage=0), đang thực hiện lần dùng đầu tiên và duy nhất. Với max_uses_per_user=1, lần dùng thứ 1 chính là giá trị biên ON — lần sử dụng duy nhất được phép.

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng di động (React Native) đã được cài đặt và hoạt động bình thường
- Người dùng đã đăng nhập bằng tài khoản test@eshop.com
- Giỏ hàng có sản phẩm với tổng giá trị đúng 500,000₫ (≥ ngưỡng tối thiểu 300,000₫)
- Người dùng **chưa sử dụng** mã SAVE10 trước đó (usage_count = 0)
- Mã SAVE10 còn trong hạn sử dụng (hạn: 2099-12-31)

## Test data

| Field               | Value    |
| ------------------- | -------- |
| Mã giảm giá         | SAVE10   |
| Loại giảm giá       | percent  |
| Giá trị giảm        | 10%      |
| Ngưỡng tối thiểu    | 300,000₫ |
| Tổng đơn hàng       | 500,000₫ |
| Số lần đã dùng      | 0        |
| Số lần tối đa/người | 1        |

> Người dùng chưa dùng mã SAVE10 lần nào (usage_count=0). Đây là lần dùng đầu tiên và duy nhất được phép (ON). Công thức tính: discount = 500,000 × 10/100 = 50,000₫; final = 500,000 − 50,000 = 450,000₫.

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đăng nhập bằng tài khoản test@eshop.com (nếu chưa đăng nhập)
3. Thêm sản phẩm vào giỏ hàng sao cho tổng giá trị đơn hàng = 500,000₫
4. Chạm vào tab **Giỏ hàng** trên thanh điều hướng dưới cùng
5. Xác nhận tổng giá trị giỏ hàng hiển thị là 500,000₫
6. Chạm vào nút **Thanh toán** để chuyển sang màn hình thanh toán
7. Tại màn hình thanh toán, chạm vào ô nhập **Mã giảm giá**
8. Nhập "SAVE10" bằng bàn phím ảo
9. Chạm vào nút **Áp dụng** bên cạnh ô nhập mã giảm giá
10. Quan sát phản hồi trên màn hình (Toast/Alert thông báo)
11. Kiểm tra tổng tiền thanh toán đã được cập nhật

## Expected result

✅ **Chấp nhận — Mã SAVE10 được áp dụng thành công (lần sử dụng 1/1 — lần duy nhất)**

- Hệ thống hiển thị Toast/Alert thông báo áp dụng mã giảm giá thành công
- Mã SAVE10 được áp dụng vào đơn hàng
- **Công thức tính giảm giá (percent):**
  - `discount_amount = total × discount_value / 100`
  - `discount_amount = 500,000 × 10 / 100 = 50,000₫`
- **Tổng thanh toán sau giảm:**
  - `final_amount = total - discount_amount`
  - `final_amount = 500,000 - 50,000 = 450,000₫`
- Màn hình thanh toán hiển thị:
  - Tổng đơn hàng: 500,000₫
  - Giảm giá (SAVE10 - 10%): -50,000₫
  - Tổng thanh toán: 450,000₫
- Số lần sử dụng mã SAVE10 của người dùng tăng từ 0 lên 1 (đã dùng hết số lượt cho phép)

## Actual result

- Hệ thống hiển thị Toast/Alert thông báo áp dụng mã giảm giá thành công
- Mã SAVE10 được áp dụng vào đơn hàng
- Tuy nhiên tổng thanh toán sau khi áp dụng mã giảm giá lại cao hơn rất nhiều so với trước khi áp dụng mã. Tổng thanh toán từ 500,000₫ lúc chưa sử dụng mã giảm giá chuyển thành 5,000,000₫ sau khi áp dụng mã giảm giá.

## Status

FAILED
