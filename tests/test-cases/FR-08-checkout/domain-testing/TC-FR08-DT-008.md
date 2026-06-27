<!-- tests/test-cases/FR-08-checkout/domain-testing/TC-FR08-DT-008.md -->

# TC-FR08-DT-008: Checkout khi không gửi trường total_amount (Domain Testing)

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

| TC     | Authorization    | total_amount                          | shipping_address  | Cart State             | Expected                                          |
| ------ | ---------------- | ------------------------------------- | ----------------- | ---------------------- | ------------------------------------------------- |
| DT-008 | EP-V1-01 — Valid | EP-V2-06 — Missing (không gửi trường) | EP-V3-01 — Hợp lệ | EP-V4-01 — Có sản phẩm | ✅ Checkout thành công, backend tự tính tổng tiền |

## Preconditions

- Hệ thống EShop đang hoạt động tại `http://localhost:3000`
- Đã đăng nhập với tài khoản `test@eshop.com` / `Test1234!` và có JWT Token hợp lệ
- Giỏ hàng đã có sản phẩm (tổng thực tế = 200,000₫)

## Test data

| Field            | Value                               |
| ---------------- | ----------------------------------- |
| Authorization    | `Bearer <token_hợp_lệ>`             |
| total_amount     | _(không gửi trường này trong body)_ |
| shipping_address | `"123 Le Loi, Q1, TP.HCM"`          |

> **Mục đích:** Kiểm tra backend có tự tính tổng tiền mà không cần client gửi `total_amount` hay không. Theo FR-08, backend PHẢI tự tính — nên việc thiếu trường này không được gây lỗi.

## Test steps

1. Gửi `POST /api/login` với `{"email": "test@eshop.com", "password": "Test1234!"}` → Lưu `token`
2. Gửi `POST /api/cart` với `{"id": 1, "name": "Sản phẩm A", "price": 100000, "quantity": 2}` và header `Authorization: Bearer <token>`
3. Gửi `POST /api/checkout` qua **Postman** với body **chỉ có** `{"shipping_address": "123 Le Loi, Q1, TP.HCM"}` _(không có trường `total_amount`)_ và header `Authorization: Bearer <token>`
4. Kiểm tra response
5. Gửi `GET /api/orders/my-orders` để lấy đơn hàng mới nhất
6. **Kiểm tra `total_amount` trong đơn hàng** — giá trị phải là 200,000₫ (backend tự tính)

## Expected result

- Checkout thành công (HTTP 200 OK) — backend tự tính tổng tiền mà không phụ thuộc client
- Đơn hàng được tạo với `total_amount` = **200,000₫**
- Nếu response trả về lỗi validation (ví dụ: `"total_amount is required"`) → 🐛 **BUG**: Backend phụ thuộc vào giá trị client gửi, vi phạm FR-08

## Actual result

- Checkout thành công (HTTP 200 OK)
- Đơn hàng được tạo với `total_amount` = **null**

## Status

FAILED
