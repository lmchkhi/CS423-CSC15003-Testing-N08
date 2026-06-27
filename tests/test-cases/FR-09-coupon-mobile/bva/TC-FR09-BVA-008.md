<!-- tests/test-cases/FR-09-coupon-mobile/bva/TC-FR09-BVA-008.md -->

# TC-FR09-BVA-008: VIP100 — Sử dụng lần thứ 2 (usage=1, max=2) (giá trị biên ON)

## Requirement ID

FR-09

## Module / Test type / Technique

Mã Giảm Giá (Coupon) / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

### Identified Boundaries

| Variable    | Constraint                          | Boundary Type         | BVA Points                                       |
| ----------- | ----------------------------------- | --------------------- | ------------------------------------------------ |
| usage_count | usage_count < max_uses_per_user (2) | max_uses_per_user = 2 | 0/lần 1 (OFF⁻), **1/lần 2 (ON)**, 2/lần 3 (OFF⁺) |

### BVA Test Matrix

| TC      | usage_count        | Độ dài/Giá trị       | Boundary Point        | Các ràng buộc khác                                                              | Expected     |
| ------- | ------------------ | -------------------- | --------------------- | ------------------------------------------------------------------------------- | ------------ |
| BVA-007 | 0 (lần dùng thứ 1) | OFF⁻ (xa biên)       | max_uses_per_user = 2 | code=VIP100 (valid, fixed 100,000₫), total=400,000₫ (≥300K), đăng nhập, còn hạn | ✅ Chấp nhận |
| BVA-008 | 1 (lần dùng thứ 2) | ON (lần cuối cùng)   | max_uses_per_user = 2 | code=VIP100 (valid, fixed 100,000₫), total=400,000₫ (≥300K), đăng nhập, còn hạn | ✅ Chấp nhận |
| BVA-009 | 2 (lần dùng thứ 3) | OFF⁺ (vượt giới hạn) | max_uses_per_user = 2 | code=VIP100 (valid, fixed 100,000₫), total=400,000₫ (≥300K), đăng nhập, còn hạn | ❌ Từ chối   |

> **Ghi chú:** Test case này kiểm tra giá trị ON — người dùng đã sử dụng mã VIP100 đúng 1 lần (usage=1), đang thực hiện lần dùng thứ 2 — lần cuối cùng được phép. Đây là giá trị biên ON, lần sử dụng cuối cùng hợp lệ.

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng di động (React Native) đã được cài đặt và hoạt động bình thường
- Người dùng đã đăng nhập bằng tài khoản test@eshop.com
- **Người dùng đã sử dụng mã VIP100 thành công 1 lần trước đó** (usage_count = 1)
  - Lần 1: Đã checkout thành công đơn hàng trước đó với mã VIP100
- Giỏ hàng hiện tại có sản phẩm mới với tổng giá trị đúng 400,000₫ (≥ ngưỡng tối thiểu 300,000₫)
- Mã VIP100 còn trong hạn sử dụng (hạn: 2099-12-31)

## Test data

| Field               | Value    |
| ------------------- | -------- |
| Mã giảm giá         | VIP100   |
| Loại giảm giá       | fixed    |
| Giá trị giảm        | 100,000₫ |
| Ngưỡng tối thiểu    | 300,000₫ |
| Tổng đơn hàng       | 400,000₫ |
| Số lần đã dùng      | 1        |
| Số lần tối đa/người | 2        |

> Người dùng đã dùng VIP100 đúng 1 lần trước đó (usage_count=1). Đây là lần dùng thứ 2 — lần cuối cùng được phép (ON). Cần hoàn thành checkout lần 1 trước, sau đó thêm sản phẩm mới vào giỏ hàng cho lần 2.

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đăng nhập bằng tài khoản test@eshop.com (nếu chưa đăng nhập)
3. Xác nhận người dùng đã sử dụng mã VIP100 thành công 1 lần trước đó (đã hoàn thành checkout lần 1)
4. Thêm sản phẩm mới vào giỏ hàng sao cho tổng giá trị đơn hàng = 400,000₫
5. Chạm vào tab **Giỏ hàng** trên thanh điều hướng dưới cùng
6. Xác nhận tổng giá trị giỏ hàng hiển thị là 400,000₫
7. Chạm vào nút **Thanh toán** để chuyển sang màn hình thanh toán
8. Tại màn hình thanh toán, chạm vào ô nhập **Mã giảm giá**
9. Nhập "VIP100" bằng bàn phím ảo
10. Chạm vào nút **Áp dụng** bên cạnh ô nhập mã giảm giá
11. Quan sát phản hồi trên màn hình (Toast/Alert thông báo)
12. Kiểm tra tổng tiền thanh toán đã được cập nhật

## Expected result

✅ **Chấp nhận — Mã VIP100 được áp dụng thành công (lần sử dụng 2/2 — lần cuối cùng)**

- Hệ thống hiển thị Toast/Alert thông báo áp dụng mã giảm giá thành công
- Mã VIP100 được áp dụng vào đơn hàng
- **Công thức tính giảm giá (fixed):**
  - `discount_amount = discount_value`
  - `discount_amount = 100,000₫`
- **Tổng thanh toán sau giảm:**
  - `final_amount = total - discount_amount`
  - `final_amount = 400,000 - 100,000 = 300,000₫`
- Màn hình thanh toán hiển thị:
  - Tổng đơn hàng: 400,000₫
  - Giảm giá (VIP100): -100,000₫
  - Tổng thanh toán: 300,000₫
- Số lần sử dụng mã VIP100 của người dùng tăng từ 1 lên 2 (đã dùng hết số lượt cho phép)

## Actual result

- Hệ thống hiển thị Toast/Alert thông báo áp dụng mã giảm giá thành công
- Mã VIP100 được áp dụng vào đơn hàng
- Màn hình thanh toán hiển thị:
  - Tổng đơn hàng: 400,000₫
  - Giảm giá (VIP100): -100,000₫
  - Tổng thanh toán: 300,000₫

## Status

PASSED
