<!-- tests/test-cases/FR-09-coupon-mobile/bva/TC-FR09-BVA-011.md -->

# TC-FR09-BVA-011: SAVE10 — Sử dụng lần thứ 2 (usage=1, max=1) (giá trị biên OFF⁺)

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

> **Ghi chú:** Test case này kiểm tra giá trị OFF⁺ — người dùng đã sử dụng hết 1 lượt mã SAVE10 (usage=1), đang cố sử dụng lần thứ 2. Giá trị usage_count=1 đã đạt giới hạn max_uses_per_user=1, nên phải bị từ chối.

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng di động (React Native) đã được cài đặt và hoạt động bình thường
- Người dùng đã đăng nhập bằng tài khoản test@eshop.com
- **Người dùng đã sử dụng mã SAVE10 thành công 1 lần trước đó** (usage_count = 1)
  - Lần 1: Đã checkout thành công đơn hàng với mã SAVE10
- Giỏ hàng hiện tại có sản phẩm mới với tổng giá trị đúng 500,000₫ (≥ ngưỡng tối thiểu 300,000₫)
- Mã SAVE10 còn trong hạn sử dụng (hạn: 2099-12-31)

## Test data

| Field               | Value    |
| ------------------- | -------- |
| Mã giảm giá         | SAVE10   |
| Loại giảm giá       | percent  |
| Giá trị giảm        | 10%      |
| Ngưỡng tối thiểu    | 300,000₫ |
| Tổng đơn hàng       | 500,000₫ |
| Số lần đã dùng      | 1        |
| Số lần tối đa/người | 1        |

> Người dùng đã dùng SAVE10 đủ 1 lần (usage_count=1, đã hết lượt). Đây là lần cố sử dụng thứ 2, nằm ở vị trí OFF⁺ so với biên max_uses_per_user=1.

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đăng nhập bằng tài khoản test@eshop.com (nếu chưa đăng nhập)
3. Xác nhận người dùng đã sử dụng mã SAVE10 thành công 1 lần trước đó (đã hoàn thành checkout lần 1)
4. Thêm sản phẩm mới vào giỏ hàng sao cho tổng giá trị đơn hàng = 500,000₫
5. Chạm vào tab **Giỏ hàng** trên thanh điều hướng dưới cùng
6. Xác nhận tổng giá trị giỏ hàng hiển thị là 500,000₫
7. Chạm vào nút **Thanh toán** để chuyển sang màn hình thanh toán
8. Tại màn hình thanh toán, chạm vào ô nhập **Mã giảm giá**
9. Nhập "SAVE10" bằng bàn phím ảo
10. Chạm vào nút **Áp dụng** bên cạnh ô nhập mã giảm giá
11. Quan sát phản hồi trên màn hình (Toast/Alert thông báo)

## Expected result

❌ **Từ chối — Đã sử dụng hết số lượt cho phép (1/1)**

- Hệ thống hiển thị Toast/Alert thông báo lỗi: người dùng đã sử dụng hết số lượt cho phép của mã SAVE10 (1/1)
- Mã giảm giá SAVE10 **không** được áp dụng vào đơn hàng
- Tổng thanh toán vẫn giữ nguyên 500,000₫ (không có giảm giá)
- Ô nhập mã giảm giá có thể hiển thị trạng thái lỗi (viền đỏ hoặc thông báo lỗi bên dưới)

## Actual result

- Hệ thống hiển thị Toast/Alert thông báo lỗi: "Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)."

## Status

PASSED
