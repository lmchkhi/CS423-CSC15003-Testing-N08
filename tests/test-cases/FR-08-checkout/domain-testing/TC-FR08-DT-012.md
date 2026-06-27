<!-- tests/test-cases/FR-08-checkout/domain-testing/TC-FR08-DT-012.md -->

# TC-FR08-DT-012: XSS Injection trong shipping_address (Domain Testing)

## Requirement ID

FR-08, SEC-04

## Module / Test type / Technique

Thanh toán (Checkout) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable         | Type              | Domain / Constraints                                 |
| ---------------- | ----------------- | ---------------------------------------------------- |
| Authorization    | String (Header)   | JWT Token hợp lệ                                     |
| total_amount     | Numeric (Body)    | Giá trị tổng tiền                                    |
| shipping_address | String (Body)     | Địa chỉ giao hàng — SEC-04: phải escape khi hiển thị |
| Cart State       | Implicit (Server) | Giỏ hàng phải có sản phẩm                            |

### Domain Matrix

| TC     | Authorization    | total_amount      | shipping_address       | Cart State             | Expected                                    |
| ------ | ---------------- | ----------------- | ---------------------- | ---------------------- | ------------------------------------------- |
| DT-012 | EP-V1-01 — Valid | EP-V2-01 — Hợp lệ | EP-V3-04 — XSS Payload | EP-V4-01 — Có sản phẩm | ✅ Lưu thành công nhưng escape khi hiển thị |

## Preconditions

- Hệ thống EShop đang hoạt động tại `http://localhost:3000`
- Đã đăng nhập với tài khoản `test@eshop.com` / `Test1234!` và có JWT Token hợp lệ
- Giỏ hàng đã có sản phẩm (tổng thực tế = 200,000₫)

## Test data

| Field            | Value                             |
| ---------------- | --------------------------------- |
| Authorization    | `Bearer <token_hợp_lệ>`           |
| total_amount     | `200000`                          |
| shipping_address | `"<script>alert('xss')</script>"` |

> **Kịch bản tấn công XSS:** Hacker nhúng mã JavaScript vào trường `shipping_address`. Nếu backend/frontend không escape đúng, mã sẽ thực thi khi admin xem đơn hàng (Stored XSS — FR-18, SEC-04).

## Test steps

1. Gửi `POST /api/login` với `{"email": "test@eshop.com", "password": "Test1234!"}` → Lưu `token`
2. Gửi `POST /api/cart` với `{"id": 1, "name": "Sản phẩm A", "price": 100000, "quantity": 2}` và header `Authorization: Bearer <token>`
3. Gửi `POST /api/checkout` qua **Postman** với body `{"total_amount": 200000, "shipping_address": "<script>alert('xss')</script>"}` và header `Authorization: Bearer <token>`
4. Kiểm tra response — expect checkout thành công
5. Gửi `GET /api/orders/my-orders` hoặc `GET /api/orders/:id` để xem đơn hàng
6. **Kiểm tra `shipping_address` trong response** — phải được lưu dạng plain text, không render HTML
7. Đăng nhập Admin (`admin@eshop.com` / `Admin123!`) và vào trang quản lý đơn hàng
8. **Kiểm tra trên giao diện Admin** — địa chỉ phải hiển thị an toàn (không thực thi script)

## Expected result

- Checkout thành công (HTTP 200 OK)
- `shipping_address` được lưu vào DB nhưng khi hiển thị trên giao diện (cả User và Admin), phải được **escape** đúng cách
- Không có popup `alert('xss')` xuất hiện trên bất kỳ giao diện nào
- FR-18 yêu cầu: _"Địa chỉ giao hàng phải được hiển thị an toàn (không render HTML)"_
- Nếu script thực thi → 🐛 **BUG BẢO MẬT (XSS)**: Vi phạm SEC-04

## Actual result

- Checkout thành công (HTTP 200 OK)
- Trên giao diện Admin, chuỗi payload không hiển thị thành văn bản bình thường. Khi inspect element, chuỗi `<script>alert('xss')</script>` được render nguyên vẹn thành một HTML node (thẻ script) bên trong DOM (thẻ `<td>`), chứng tỏ hệ thống không thực hiện escape dữ liệu mà nhúng trực tiếp qua innerHTML.

## Status

FAILED
