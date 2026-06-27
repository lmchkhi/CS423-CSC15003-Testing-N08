<!-- tests/test-cases/FR-08-checkout/domain-testing/TC-FR08-DT-011.md -->

# TC-FR08-DT-011: Checkout khi không gửi trường shipping_address (Domain Testing)

## Requirement ID

FR-08

## Module / Test type / Technique

Thanh toán (Checkout) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable         | Type              | Domain / Constraints                      |
| ---------------- | ----------------- | ----------------------------------------- |
| Authorization    | String (Header)   | JWT Token hợp lệ                          |
| total_amount     | Numeric (Body)    | Giá trị tổng tiền                         |
| shipping_address | String (Body)     | Địa chỉ giao hàng — bắt buộc để giao hàng |
| Cart State       | Implicit (Server) | Giỏ hàng phải có sản phẩm                 |

### Domain Matrix

| TC     | Authorization    | total_amount      | shipping_address                      | Cart State             | Expected                             |
| ------ | ---------------- | ----------------- | ------------------------------------- | ---------------------- | ------------------------------------ |
| DT-011 | EP-V1-01 — Valid | EP-V2-01 — Hợp lệ | EP-V3-03 — Missing (không gửi trường) | EP-V4-01 — Có sản phẩm | ❌ Lỗi hoặc ✅ Dùng địa chỉ mặc định |

## Preconditions

- Hệ thống EShop đang hoạt động tại `http://localhost:3000`
- Đã đăng nhập với tài khoản `test@eshop.com` / `Test1234!` và có JWT Token hợp lệ
- Giỏ hàng đã có sản phẩm (tổng thực tế = 200,000₫)

## Test data

| Field            | Value                               |
| ---------------- | ----------------------------------- |
| Authorization    | `Bearer <token_hợp_lệ>`             |
| total_amount     | `200000`                            |
| shipping_address | _(không gửi trường này trong body)_ |

## Test steps

1. Gửi `POST /api/login` với `{"email": "test@eshop.com", "password": "Test1234!"}` → Lưu `token`
2. Gửi `POST /api/cart` với `{"id": 1, "name": "Sản phẩm A", "price": 100000, "quantity": 2}` và header `Authorization: Bearer <token>`
3. Gửi `POST /api/checkout` với body **chỉ có** `{"total_amount": 200000}` _(không có trường `shipping_address`)_ và header `Authorization: Bearer <token>`
4. Kiểm tra response

## Expected result

- **Kịch bản 1:** Response trả về lỗi — yêu cầu cung cấp `shipping_address`
- **Kịch bản 2 (chấp nhận):** Backend sử dụng địa chỉ mặc định từ hồ sơ cá nhân (FR-04)
- **KHÔNG chấp nhận:** Tạo đơn hàng với `shipping_address = null/undefined` mà không thông báo

## Actual result

- Checkout thành công (HTTP 200 OK)
- Đơn hàng được tạo với `total_amount` đúng với giỏ hàng, nhưng `shipping_address` = `null` (không có giá trị)

## Status

FAILED
