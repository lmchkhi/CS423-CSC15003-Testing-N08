<!-- tests/test-cases/FR-08-checkout/domain-testing/TC-FR08-DT-014.md -->

# TC-FR08-DT-014: Checkout với giỏ hàng trống (Domain Testing)

## Requirement ID

FR-08

## Module / Test type / Technique

Thanh toán (Checkout) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable         | Type              | Domain / Constraints                            |
| ---------------- | ----------------- | ----------------------------------------------- |
| Authorization    | String (Header)   | JWT Token hợp lệ                                |
| total_amount     | Numeric (Body)    | Giá trị tổng tiền                               |
| shipping_address | String (Body)     | Địa chỉ giao hàng                               |
| Cart State       | Implicit (Server) | Giỏ hàng phải có ít nhất 1 sản phẩm để checkout |

### Domain Matrix

| TC     | Authorization    | total_amount      | shipping_address  | Cart State                | Expected            |
| ------ | ---------------- | ----------------- | ----------------- | ------------------------- | ------------------- |
| DT-014 | EP-V1-01 — Valid | EP-V2-01 — Hợp lệ | EP-V3-01 — Hợp lệ | EP-V4-02 — Giỏ hàng trống | ❌ Từ chối checkout |

## Preconditions

- Hệ thống EShop đang hoạt động tại `http://localhost:3000`
- Đã đăng nhập với tài khoản `test@eshop.com` / `Test1234!` và có JWT Token hợp lệ
- Giỏ hàng **trống** — không có sản phẩm nào

## Test data

| Field            | Value                      |
| ---------------- | -------------------------- |
| Authorization    | `Bearer <token_hợp_lệ>`    |
| total_amount     | `200000`                   |
| shipping_address | `"123 Le Loi, Q1, TP.HCM"` |

> **Lưu ý:** Trước khi test, đảm bảo giỏ hàng trống bằng cách gọi `GET /api/cart` và xóa hết sản phẩm nếu có.

## Test steps

1. Gửi `POST /api/login` với `{"email": "test@eshop.com", "password": "Test1234!"}` → Lưu `token`
2. Gửi `GET /api/cart` và xác nhận giỏ hàng trống (hoặc xóa hết sản phẩm trong giỏ)
3. Gửi `POST /api/checkout` với body `{"total_amount": 200000, "shipping_address": "123 Le Loi, Q1, TP.HCM"}` và header `Authorization: Bearer <token>`
4. Kiểm tra response

## Expected result

- Response trả về lỗi (HTTP 400 Bad Request hoặc tương đương)
- Thông báo lỗi rõ ràng: giỏ hàng trống, không thể checkout (ví dụ: `"Cart is empty"`)
- **Không** tạo đơn hàng với `total_amount = 0` hoặc bất kỳ giá trị nào
- Nếu checkout thành công với giỏ hàng trống → 🐛 **BUG**: Tạo đơn hàng phantom

## Actual result

- Response trả về 200 Ok
- **Có** tạo đơn hàng với total_amount = 200,000₫ mặc dù giỏ hàng trống

## Status

FAILED
