<!-- tests/test-cases/FR-08-checkout/domain-testing/TC-FR08-DT-002.md -->

# TC-FR08-DT-002: Checkout khi chưa đăng nhập — thiếu Token (Domain Testing)

## Requirement ID

FR-08

## Module / Test type / Technique

Thanh toán (Checkout) / Functional / Domain Testing

## Domain Analysis

### Input Variables & Domain

| Variable         | Type              | Domain / Constraints                  |
| ---------------- | ----------------- | ------------------------------------- |
| Authorization    | String (Header)   | JWT Token hợp lệ từ `POST /api/login` |
| total_amount     | Numeric (Body)    | Giá trị tổng tiền do client gửi       |
| shipping_address | String (Body)     | Địa chỉ giao hàng                     |
| Cart State       | Implicit (Server) | Trạng thái giỏ hàng trên server       |

### Domain Matrix

| TC     | Authorization                         | total_amount              | shipping_address  | Cart State             | Expected            |
| ------ | ------------------------------------- | ------------------------- | ----------------- | ---------------------- | ------------------- |
| DT-002 | EP-V1-02 — Missing (không gửi header) | EP-V2-01 — Giá trị hợp lệ | EP-V3-01 — Hợp lệ | EP-V4-01 — Có sản phẩm | ❌ 401 Unauthorized |

## Preconditions

- Hệ thống EShop đang hoạt động tại `http://localhost:3000`
- KHÔNG đăng nhập, KHÔNG có JWT Token

## Test data

| Field            | Value                      |
| ---------------- | -------------------------- |
| Authorization    | _(không gửi header)_       |
| total_amount     | `200000`                   |
| shipping_address | `"123 Le Loi, Q1, TP.HCM"` |

## Test steps

1. Gửi `POST /api/checkout` **KHÔNG** có header `Authorization`
2. Body: `{"total_amount": 200000, "shipping_address": "123 Le Loi, Q1, TP.HCM"}`
3. Kiểm tra response HTTP status code và body

## Expected result

- Response trả về HTTP **401 Unauthorized**
- Body chứa thông báo lỗi yêu cầu đăng nhập (ví dụ: `"No token provided"` hoặc `"Unauthorized"`)
- Không có đơn hàng nào được tạo

## Actual result

- Response trả về HTTP **401 Unauthorized**
- Body chứa thông báo lỗi yêu cầu đăng nhập (ví dụ: `"No token provided"` hoặc `"Unauthorized"`)
- Không có đơn hàng nào được tạo

## Status

PASSED
