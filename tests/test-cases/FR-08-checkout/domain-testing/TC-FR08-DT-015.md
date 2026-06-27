<!-- tests/test-cases/FR-08-checkout/domain-testing/TC-FR08-DT-015.md -->

# TC-FR08-DT-015: Giỏ hàng được xóa sau checkout thành công (Domain Testing)

## Requirement ID

FR-08

## Module / Test type / Technique

Thanh toán (Checkout) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable         | Type              | Domain / Constraints                                     |
| ---------------- | ----------------- | -------------------------------------------------------- |
| Authorization    | String (Header)   | JWT Token hợp lệ                                         |
| total_amount     | Numeric (Body)    | Giá trị tổng tiền                                        |
| shipping_address | String (Body)     | Địa chỉ giao hàng                                        |
| Cart State       | Implicit (Server) | Giỏ hàng phải có sản phẩm, và phải được xóa sau checkout |

### Domain Matrix

| TC     | Authorization    | total_amount      | shipping_address  | Cart State                              | Expected                       |
| ------ | ---------------- | ----------------- | ----------------- | --------------------------------------- | ------------------------------ |
| DT-015 | EP-V1-01 — Valid | EP-V2-01 — Hợp lệ | EP-V3-01 — Hợp lệ | EP-V4-01 — Có sản phẩm → Post: xóa sạch | ✅ Giỏ hàng trống sau checkout |

## Preconditions

- Hệ thống EShop đang hoạt động tại `http://localhost:3000`
- Đã đăng nhập với tài khoản `test@eshop.com` / `Test1234!` và có JWT Token hợp lệ
- Giỏ hàng đã có sản phẩm (tổng thực tế = 200,000₫)

## Test data

| Field            | Value                      |
| ---------------- | -------------------------- |
| Authorization    | `Bearer <token_hợp_lệ>`    |
| total_amount     | `200000`                   |
| shipping_address | `"123 Le Loi, Q1, TP.HCM"` |

## Test steps

1. Gửi `POST /api/login` với `{"email": "test@eshop.com", "password": "Test1234!"}` → Lưu `token`
2. Gửi `POST /api/cart` với `{"id": 1, "name": "Sản phẩm A", "price": 100000, "quantity": 2}` và header `Authorization: Bearer <token>`
3. Gửi `GET /api/cart` để xác nhận giỏ hàng **có sản phẩm** trước checkout
4. Gửi `POST /api/checkout` với body `{"total_amount": 200000, "shipping_address": "123 Le Loi, Q1, TP.HCM"}` và header `Authorization: Bearer <token>`
5. Xác nhận checkout thành công (HTTP 200 OK)
6. **Gửi `GET /api/cart`** ngay sau checkout
7. Kiểm tra giỏ hàng có trống hay không

## Expected result

- Checkout thành công (HTTP 200 OK)
- Sau checkout, `GET /api/cart` trả về giỏ hàng **trống** (không còn sản phẩm nào)
- FR-08 yêu cầu: _"Sau thanh toán thành công, giỏ hàng được xóa"_
- Nếu giỏ hàng vẫn còn sản phẩm sau checkout → 🐛 **BUG**: Giỏ hàng không được dọn dẹp

## Actual result

- Checkout thành công (HTTP 200 OK)
- Sau checkout, `GET /api/cart` trả về giỏ hàng **vẫn còn sản phẩm**

## Status

FAILED
