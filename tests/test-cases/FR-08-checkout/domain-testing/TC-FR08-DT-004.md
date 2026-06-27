<!-- tests/test-cases/FR-08-checkout/domain-testing/TC-FR08-DT-004.md -->

# TC-FR08-DT-004: Hacker gửi total_amount thấp hơn tổng tiền thực tế (Domain Testing)

## Requirement ID

FR-08

## Module / Test type / Technique

Thanh toán (Checkout) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable         | Type              | Domain / Constraints                                                                |
| ---------------- | ----------------- | ----------------------------------------------------------------------------------- |
| Authorization    | String (Header)   | JWT Token hợp lệ từ `POST /api/login`                                               |
| total_amount     | Numeric (Body)    | Giá trị tổng tiền do client gửi. **FR-08:** Backend phải tự tính, không tin client. |
| shipping_address | String (Body)     | Địa chỉ giao hàng                                                                   |
| Cart State       | Implicit (Server) | Giỏ hàng phải có sản phẩm                                                           |

### Domain Matrix

| TC     | Authorization    | total_amount                                 | shipping_address  | Cart State             | Expected                                                                |
| ------ | ---------------- | -------------------------------------------- | ----------------- | ---------------------- | ----------------------------------------------------------------------- |
| DT-004 | EP-V1-01 — Valid | EP-V2-02 — Thấp hơn thực tế (1₫ vs 200,000₫) | EP-V3-01 — Hợp lệ | EP-V4-01 — Có sản phẩm | ✅ Checkout thành công, tổng tiền đơn hàng = 200,000₫ (backend tự tính) |

## Preconditions

- Hệ thống EShop đang hoạt động tại `http://localhost:3000`
- Đã đăng nhập với tài khoản `test@eshop.com` / `Test1234!` và có JWT Token hợp lệ
- Giỏ hàng đã có sản phẩm (tổng thực tế = 200,000₫)

## Test data

| Field            | Value                                    |
| ---------------- | ---------------------------------------- |
| Authorization    | `Bearer <token_hợp_lệ>`                  |
| total_amount     | `1` _(hacker cố gửi giá rẻ hơn thực tế)_ |
| shipping_address | `"123 Le Loi, Q1, TP.HCM"`               |

> **Kịch bản tấn công:** Hacker dùng Postman gửi `total_amount = 1` trong khi giỏ hàng thực tế có tổng = 200,000₫, nhằm mua hàng với giá 1₫.

## Test steps

1. Gửi `POST /api/login` với `{"email": "test@eshop.com", "password": "Test1234!"}` → Lưu `token`
2. Gửi `POST /api/cart` với `{"id": 1, "name": "Sản phẩm A", "price": 100000, "quantity": 2}` và header `Authorization: Bearer <token>`
3. Gửi `POST /api/checkout` qua **Postman** với body `{"total_amount": 1, "shipping_address": "123 Le Loi, Q1, TP.HCM"}` và header `Authorization: Bearer <token>`
4. Kiểm tra response — expect checkout thành công
5. Gửi `GET /api/orders/my-orders` để lấy đơn hàng mới nhất
6. **Kiểm tra `total_amount` trong đơn hàng** — giá trị phải là 200,000₫ (backend tự tính), KHÔNG phải 1₫

## Expected result

- Checkout thành công (HTTP 200 OK)
- Đơn hàng được tạo với `total_amount` = **200,000₫** (backend tự tính từ giỏ hàng)
- Backend **bỏ qua** giá trị `total_amount = 1` do client gửi
- Nếu `total_amount` trong đơn hàng = 1₫ → 🐛 **BUG BẢO MẬT NGHIÊM TRỌNG**: Backend tin tưởng giá trị client

## Actual result

- Checkout thành công (HTTP 200 OK)
- Đơn hàng được tạo với `total_amount` = **1**
- Backend **tin tưởng** giá trị `total_amount` từ client

## Status

FAILED
