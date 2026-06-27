<!-- tests/test-cases/FR-08-checkout/domain-testing/TC-FR08-DT-001.md -->

# TC-FR08-DT-001: Checkout thành công với tất cả dữ liệu hợp lệ (Domain Testing)

## Requirement ID

FR-08

## Module / Test type / Technique

Thanh toán (Checkout) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable         | Type              | Domain / Constraints                                                                 |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------ |
| Authorization    | String (Header)   | JWT Token hợp lệ từ `POST /api/login`                                                |
| total_amount     | Numeric (Body)    | Giá trị tổng tiền do client gửi. Backend phải tự tính lại, không tin client (FR-08). |
| shipping_address | String (Body)     | Địa chỉ giao hàng hợp lệ                                                             |
| Cart State       | Implicit (Server) | Giỏ hàng phải có ít nhất 1 sản phẩm                                                  |

### Domain Matrix

| TC     | Authorization          | total_amount                 | shipping_address          | Cart State             | Expected                                  |
| ------ | ---------------------- | ---------------------------- | ------------------------- | ---------------------- | ----------------------------------------- |
| DT-001 | EP-V1-01 — Valid Token | EP-V2-01 — Khớp tổng thực tế | EP-V3-01 — Địa chỉ hợp lệ | EP-V4-01 — Có sản phẩm | ✅ Checkout thành công, đơn hàng được tạo |

## Preconditions

- Hệ thống EShop đang hoạt động tại `http://localhost:3000`
- Tài khoản `test@eshop.com` / `Test1234!` đã được đăng ký
- Đã đăng nhập và có JWT Token hợp lệ
- Giỏ hàng đã có ít nhất 1 sản phẩm (ví dụ: Sản phẩm A, giá 100,000₫, số lượng 2 → tổng 200,000₫)

## Test data

| Field            | Value                                       |
| ---------------- | ------------------------------------------- |
| Authorization    | `Bearer <token_hợp_lệ>`                     |
| total_amount     | `200000` (khớp tổng thực tế trong giỏ hàng) |
| shipping_address | `"123 Le Loi, Q1, TP.HCM"`                  |

## Test steps

1. Gửi `POST /api/login` với `{"email": "test@eshop.com", "password": "Test1234!"}` → Lưu `token`
2. Gửi `POST /api/cart` với `{"id": 1, "name": "Sản phẩm A", "price": 100000, "quantity": 2}` và header `Authorization: Bearer <token>`
3. Gửi `POST /api/checkout` với body `{"total_amount": 200000, "shipping_address": "123 Le Loi, Q1, TP.HCM"}` và header `Authorization: Bearer <token>`
4. Kiểm tra response trả về — expect 200 OK và thông tin đơn hàng
5. Gửi `GET /api/orders/my-orders` để xác nhận đơn hàng đã được tạo
6. Gửi `GET /api/cart` để xác nhận giỏ hàng đã được xóa sau checkout

## Expected result

- Response trả về HTTP 200 OK với thông tin đơn hàng mới
- Đơn hàng được tạo với `total_amount` = 200,000₫ (backend tự tính, khớp giá trị client gửi trong trường hợp này)
- Trạng thái đơn hàng ban đầu là `pending`
- Giỏ hàng được xóa sạch sau checkout thành công

## Actual result

- Response trả về HTTP 200 OK với thông tin đơn hàng mới
- Đơn hàng được tạo với `total_amount` = 200,000₫ (backend tự tính, khớp giá trị client gửi trong trường hợp này)
- Trạng thái đơn hàng ban đầu là `pending`
- Giỏ hàng không được xóa sạch sau checkout thành công

## Status

FAILED
