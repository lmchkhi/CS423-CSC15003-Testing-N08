<!-- tests/test-cases/FR-08-checkout/domain-testing/TC-FR08-DT-009.md -->

# TC-FR08-DT-009: Hacker gửi total_amount kiểu string thay vì number (Domain Testing)

## Requirement ID

FR-08

## Module / Test type / Technique

Thanh toán (Checkout) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable         | Type              | Domain / Constraints                              |
| ---------------- | ----------------- | ------------------------------------------------- |
| Authorization    | String (Header)   | JWT Token hợp lệ từ `POST /api/login`             |
| total_amount     | Numeric (Body)    | Giá trị tổng tiền do client gửi. Phải là kiểu số. |
| shipping_address | String (Body)     | Địa chỉ giao hàng                                 |
| Cart State       | Implicit (Server) | Giỏ hàng phải có sản phẩm                         |

### Domain Matrix

| TC     | Authorization    | total_amount                               | shipping_address  | Cart State             | Expected                                 |
| ------ | ---------------- | ------------------------------------------ | ----------------- | ---------------------- | ---------------------------------------- |
| DT-009 | EP-V1-01 — Valid | EP-V2-07 — Kiểu dữ liệu sai (String "abc") | EP-V3-01 — Hợp lệ | EP-V4-01 — Có sản phẩm | ❌ Lỗi hoặc ✅ Backend bỏ qua và tự tính |

## Preconditions

- Hệ thống EShop đang hoạt động tại `http://localhost:3000`
- Đã đăng nhập với tài khoản `test@eshop.com` / `Test1234!` và có JWT Token hợp lệ
- Giỏ hàng đã có sản phẩm (tổng thực tế = 200,000₫)

## Test data

| Field            | Value                              |
| ---------------- | ---------------------------------- |
| Authorization    | `Bearer <token_hợp_lệ>`            |
| total_amount     | `"abc"` _(chuỗi ký tự thay vì số)_ |
| shipping_address | `"123 Le Loi, Q1, TP.HCM"`         |

> **Kịch bản tấn công:** Hacker gửi kiểu dữ liệu sai cho `total_amount` nhằm gây lỗi hệ thống hoặc bypass validation.

## Test steps

1. Gửi `POST /api/login` với `{"email": "test@eshop.com", "password": "Test1234!"}` → Lưu `token`
2. Gửi `POST /api/cart` với `{"id": 1, "name": "Sản phẩm A", "price": 100000, "quantity": 2}` và header `Authorization: Bearer <token>`
3. Gửi `POST /api/checkout` qua **Postman** với body `{"total_amount": "abc", "shipping_address": "123 Le Loi, Q1, TP.HCM"}` và header `Authorization: Bearer <token>`
4. Kiểm tra response

## Expected result

- **Kịch bản lý tưởng (theo FR-08):** Backend bỏ qua `total_amount` từ client, tự tính tổng tiền, checkout thành công với `total_amount` = 200,000₫
- **Kịch bản chấp nhận được:** Backend reject với lỗi validation (ví dụ: `"total_amount must be a number"`)
- **KHÔNG chấp nhận:** Server crash, 500 Internal Server Error, hoặc tạo đơn hàng với `total_amount = 0` hoặc `NaN`

## Actual result

- Checkout thành công (HTTP 200 OK)
- Đơn hàng được tạo với `total_amount` = **abc**

## Status

FAILED
