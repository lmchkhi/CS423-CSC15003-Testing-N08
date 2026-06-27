<!-- tests/test-cases/FR-08-checkout/bva/TC-FR08-BVA-002.md -->

# TC-FR08-BVA-002: Hacker gửi total_amount = 0 (giá trị biên ON)

## Requirement ID

FR-08

## Module / Test type / Technique

Thanh toán (Checkout) / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

### Identified Boundaries

| Variable                   | Constraint                               | Boundary Type      | BVA Points                      |
| -------------------------- | ---------------------------------------- | ------------------ | ------------------------------- |
| total_amount (client-sent) | Phải > 0 nếu backend dùng giá trị client | Min boundary tại 0 | -1 (OFF⁻), **0 (ON)**, 1 (OFF⁺) |

### BVA Test Matrix

| TC      | total_amount (client gửi) | Độ dài/Giá trị | Boundary Point       | Các ràng buộc khác                                                                  | Expected                                                  |
| ------- | ------------------------- | -------------- | -------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------- |
| BVA-002 | `0`                       | 0              | **ON** (đúng biên 0) | Authorization: Valid, shipping_address: hợp lệ, Cart: có sản phẩm (tổng = 200,000₫) | ✅ Backend bỏ qua giá trị 0, tự tính tổng tiền = 200,000₫ |

> **Ghi chú:** Giá trị 0 là **đúng biên** — ranh giới giữa vùng âm (không hợp lệ) và vùng dương (hợp lệ nhưng vẫn không đáng tin từ client). Tất cả biến khác giữ hợp lệ để cô lập boundary test.

## Preconditions

- Hệ thống EShop đang hoạt động tại `http://localhost:3000`
- Đã đăng nhập với tài khoản `test@eshop.com` / `Test1234!` và có JWT Token hợp lệ
- Giỏ hàng đã có sản phẩm: Sản phẩm A (giá 100,000₫ × số lượng 2 = tổng thực tế **200,000₫**)

## Test data

| Field            | Value                            |
| ---------------- | -------------------------------- |
| Authorization    | `Bearer <token_hợp_lệ>`          |
| total_amount     | `0` _(ON — đúng tại boundary 0)_ |
| shipping_address | `"123 Le Loi, Q1, TP.HCM"`       |

> Giá trị `0` là **đúng biên** — mua hàng miễn phí. Đây là điểm kiểm tra quan trọng nhất vì nhiều hệ thống chỉ validate `> 0` nhưng quên kiểm tra `= 0`.

## Test steps

1. Gửi `POST /api/login` với `{"email": "test@eshop.com", "password": "Test1234!"}` → Lưu `token`
2. Gửi `POST /api/cart` với `{"id": 1, "name": "Sản phẩm A", "price": 100000, "quantity": 2}` và header `Authorization: Bearer <token>`
3. Gửi `POST /api/checkout` qua **Postman** với body `{"total_amount": 0, "shipping_address": "123 Le Loi, Q1, TP.HCM"}` và header `Authorization: Bearer <token>`
4. Kiểm tra response — ghi nhận HTTP status code và body
5. Gửi `GET /api/orders/my-orders` để lấy đơn hàng mới nhất
6. **So sánh `total_amount` trong đơn hàng** với giá trị kỳ vọng (200,000₫)

## Expected result

- Checkout thành công (HTTP 200 OK)
- Đơn hàng được tạo với `total_amount` = **200,000₫** (backend tự tính từ giỏ hàng)
- Backend **hoàn toàn bỏ qua** giá trị `total_amount = 0` do client gửi
- Nếu `total_amount` trong đơn hàng = 0₫ → 🐛 **BUG BẢO MẬT NGHIÊM TRỌNG (Critical)**: Backend cho phép mua hàng miễn phí, vi phạm FR-08

## Actual result

- Checkout thành công (HTTP 200 OK)
- Đơn hàng được tạo với `total_amount` = **0**
- Backend **tin tưởng** giá trị `total_amount` từ client

## Status

FAILED
