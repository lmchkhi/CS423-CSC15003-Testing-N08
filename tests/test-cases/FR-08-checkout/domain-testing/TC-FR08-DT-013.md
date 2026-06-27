<!-- tests/test-cases/FR-08-checkout/domain-testing/TC-FR08-DT-013.md -->

# TC-FR08-DT-013: SQL Injection trong shipping_address (Domain Testing)

## Requirement ID

FR-08, SEC-05

## Module / Test type / Technique

Thanh toán (Checkout) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable         | Type              | Domain / Constraints                                      |
| ---------------- | ----------------- | --------------------------------------------------------- |
| Authorization    | String (Header)   | JWT Token hợp lệ                                          |
| total_amount     | Numeric (Body)    | Giá trị tổng tiền                                         |
| shipping_address | String (Body)     | Địa chỉ giao hàng — SEC-05: phải dùng parameterized query |
| Cart State       | Implicit (Server) | Giỏ hàng phải có sản phẩm                                 |

### Domain Matrix

| TC     | Authorization    | total_amount      | shipping_address                 | Cart State             | Expected                                              |
| ------ | ---------------- | ----------------- | -------------------------------- | ---------------------- | ----------------------------------------------------- |
| DT-013 | EP-V1-01 — Valid | EP-V2-01 — Hợp lệ | EP-V3-05 — SQL Injection payload | EP-V4-01 — Có sản phẩm | ✅ Parameterized query ngăn chặn, lưu dạng plain text |

## Preconditions

- Hệ thống EShop đang hoạt động tại `http://localhost:3000`
- Đã đăng nhập với tài khoản `test@eshop.com` / `Test1234!` và có JWT Token hợp lệ
- Giỏ hàng đã có sản phẩm (tổng thực tế = 200,000₫)

## Test data

| Field            | Value                       |
| ---------------- | --------------------------- |
| Authorization    | `Bearer <token_hợp_lệ>`     |
| total_amount     | `200000`                    |
| shipping_address | `"'; DROP TABLE orders;--"` |

> **Kịch bản tấn công SQL Injection:** Hacker cố gắng inject SQL command qua trường `shipping_address` để xóa bảng `orders` trong database.

## Test steps

1. Gửi `POST /api/login` với `{"email": "test@eshop.com", "password": "Test1234!"}` → Lưu `token`
2. Gửi `POST /api/cart` với `{"id": 1, "name": "Sản phẩm A", "price": 100000, "quantity": 2}` và header `Authorization: Bearer <token>`
3. Gửi `POST /api/checkout` qua **Postman** với body `{"total_amount": 200000, "shipping_address": "'; DROP TABLE orders;--"}` và header `Authorization: Bearer <token>`
4. Kiểm tra response
5. Gửi `GET /api/orders/my-orders` để kiểm tra hệ thống vẫn hoạt động bình thường
6. Kiểm tra đơn hàng vừa tạo — `shipping_address` phải lưu nguyên dạng plain text

## Expected result

- Checkout thành công (HTTP 200 OK) hoặc từ chối với lỗi validation
- **Parameterized query (SEC-05)** ngăn chặn SQL injection — lệnh DROP TABLE **KHÔNG** được thực thi
- Bảng `orders` vẫn tồn tại và hoạt động bình thường
- `shipping_address` trong đơn hàng lưu nguyên chuỗi `'; DROP TABLE orders;--` dạng plain text
- Nếu bảng `orders` bị xóa hoặc hệ thống crash → 🐛 **BUG BẢO MẬT NGHIÊM TRỌNG (SQL Injection)**: Vi phạm SEC-05

## Actual result

- Checkout thành công (HTTP 200 OK)
- `shipping_address` trong đơn hàng lưu nguyên chuỗi `'; DROP TABLE orders;--` dạng plain text

## Status

PASSED
