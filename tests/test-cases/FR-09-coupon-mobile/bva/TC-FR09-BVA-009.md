<!-- tests/test-cases/FR-09-coupon-mobile/bva/TC-FR09-BVA-009.md -->

# TC-FR09-BVA-009: VIP100 — Sử dụng lần thứ 3 (usage=2, max=2) (giá trị biên OFF⁺)

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

> **Ghi chú:** Test case này kiểm tra giá trị OFF⁺ — người dùng đã sử dụng hết 2 lượt mã VIP100 (usage=2), đang cố sử dụng lần thứ 3. Giá trị usage_count=2 vượt qua biên max_uses_per_user=2, nên phải bị từ chối.

## Preconditions

- Hệ thống EShop đang hoạt động
- Ứng dụng di động (React Native) đã được cài đặt và hoạt động bình thường
- Người dùng đã đăng nhập bằng tài khoản test@eshop.com
- **Người dùng đã sử dụng mã VIP100 thành công 2 lần trước đó** (usage_count = 2)
  - Lần 1: Đã checkout thành công đơn hàng với mã VIP100
  - Lần 2: Đã checkout thành công đơn hàng với mã VIP100
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
| Số lần đã dùng      | 2        |
| Số lần tối đa/người | 2        |

> Người dùng đã dùng VIP100 đủ 2 lần (usage_count=2, đã hết lượt). Đây là lần cố sử dụng thứ 3, nằm ở vị trí OFF⁺ so với biên max_uses_per_user=2.

## Test steps

1. Mở ứng dụng EShop trên thiết bị di động
2. Đăng nhập bằng tài khoản test@eshop.com (nếu chưa đăng nhập)
3. Xác nhận người dùng đã sử dụng mã VIP100 thành công 2 lần trước đó (đã hoàn thành checkout lần 1 và lần 2)
4. Thêm sản phẩm mới vào giỏ hàng sao cho tổng giá trị đơn hàng = 400,000₫
5. Chạm vào tab **Giỏ hàng** trên thanh điều hướng dưới cùng
6. Xác nhận tổng giá trị giỏ hàng hiển thị là 400,000₫
7. Chạm vào nút **Thanh toán** để chuyển sang màn hình thanh toán
8. Tại màn hình thanh toán, chạm vào ô nhập **Mã giảm giá**
9. Nhập "VIP100" bằng bàn phím ảo
10. Chạm vào nút **Áp dụng** bên cạnh ô nhập mã giảm giá
11. Quan sát phản hồi trên màn hình (Toast/Alert thông báo)

## Expected result

❌ **Từ chối — Đã sử dụng hết số lượt cho phép (2/2)**

- Hệ thống hiển thị Toast/Alert thông báo lỗi: người dùng đã sử dụng hết số lượt cho phép của mã VIP100 (2/2)
- Mã giảm giá VIP100 **không** được áp dụng vào đơn hàng
- Tổng thanh toán vẫn giữ nguyên 400,000₫ (không có giảm giá)
- Ô nhập mã giảm giá có thể hiển thị trạng thái lỗi (viền đỏ hoặc thông báo lỗi bên dưới)

## Actual result

- Hệ thống hiển thị Toast/Alert thông báo lỗi: "Bạn đã sử dụng mã này 2 lần (đã đạt giới hạn)."

## Status

PASSED
