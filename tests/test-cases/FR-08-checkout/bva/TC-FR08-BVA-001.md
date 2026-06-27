<!-- tests/test-cases/FR-08-checkout/bva/TC-FR08-BVA-001.md -->

# TC-FR08-BVA-001: Hacker gửi total_amount = -1 (giá trị biên OFF⁻)

## Requirement ID

FR-08

## Module / Test type / Technique

Thanh toán (Checkout) / Functional / Boundary Value Analysis (BVA)

## Boundary Analysis

### Identified Boundaries

| Variable                   | Constraint                               | Boundary Type      | BVA Points                      |
| -------------------------- | ---------------------------------------- | ------------------ | ------------------------------- |
| total_amount (client-sent) | Phải > 0 nếu backend dùng giá trị client | Min boundary tại 0 | **-1 (OFF⁻)**, 0 (ON), 1 (OFF⁺) |

### BVA Test Matrix

| TC      | total_amount (client gửi) | Độ dài/Giá trị | Boundary Point         | Các ràng buộc khác                                                                  | Expected                                                   |
| ------- | ------------------------- | -------------- | ---------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| BVA-001 | `-1`                      | -1             | **OFF⁻** (dưới biên 0) | Authorization: Valid, shipping_address: hợp lệ, Cart: có sản phẩm (tổng = 200,000₫) | ✅ Backend bỏ qua giá trị -1, tự tính tổng tiền = 200,000₫ |

> **Ghi chú:** Tất cả biến khác giữ giá trị hợp lệ để cô lập boundary point của `total_amount`. Test này kiểm tra backend có thực sự bỏ qua giá trị âm dưới biên 0 từ client hay không.

## Preconditions

- Hệ thống EShop đang hoạt động tại `http://localhost:3000`
- Đã đăng nhập với tài khoản `test@eshop.com` / `Test1234!` và có JWT Token hợp lệ
- Giỏ hàng đã có sản phẩm: Sản phẩm A (giá 100,000₫ × số lượng 2 = tổng thực tế **200,000₫**)

## Test data

| Field            | Value                                        |
| ---------------- | -------------------------------------------- |
| Authorization    | `Bearer <token_hợp_lệ>`                      |
| total_amount     | `-1` _(OFF⁻ — giá trị ngay dưới boundary 0)_ |
| shipping_address | `"123 Le Loi, Q1, TP.HCM"`                   |

> Giá trị `-1` nằm **dưới biên 0**, thuộc vùng giá trị âm hoàn toàn không hợp lệ. Nếu backend tin client, đơn hàng sẽ có tổng tiền = -1₫ → lỗ vốn.

## Test steps

1. Gửi `POST /api/login` với `{"email": "test@eshop.com", "password": "Test1234!"}` → Lưu `token`
2. Gửi `POST /api/cart` với `{"id": 1, "name": "Sản phẩm A", "price": 100000, "quantity": 2}` và header `Authorization: Bearer <token>`
3. Gửi `POST /api/checkout` qua **Postman** với body `{"total_amount": -1, "shipping_address": "123 Le Loi, Q1, TP.HCM"}` và header `Authorization: Bearer <token>`
4. Kiểm tra response — ghi nhận HTTP status code và body
5. Gửi `GET /api/orders/my-orders` để lấy đơn hàng mới nhất
6. **So sánh `total_amount` trong đơn hàng** với giá trị kỳ vọng (200,000₫)

## Expected result

- Checkout thành công (HTTP 200 OK)
- Đơn hàng được tạo với `total_amount` = **200,000₫** (backend tự tính từ giỏ hàng)
- Backend **hoàn toàn bỏ qua** giá trị `total_amount = -1` do client gửi
- Nếu `total_amount` trong đơn hàng = -1₫ → 🐛 **BUG BẢO MẬT NGHIÊM TRỌNG (Critical)**: Backend tin tưởng giá trị client, cho phép tạo đơn hàng với tổng tiền âm

## Actual result

- Checkout thành công (HTTP 200 OK)
- Backend **sử dụng** giá trị `total_amount = -1` do client gửi
- Đơn hàng được tạo với `total_amount` = **-1₫**

## Status

FAILED
