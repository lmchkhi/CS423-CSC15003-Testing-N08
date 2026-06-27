<!-- tests/test-cases/FR-08-checkout/domain-testing/TC-FR08-DT-003.md -->

# TC-FR08-DT-003: Checkout với Token sai / hết hạn / malformed (Domain Testing)

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

| TC     | Authorization                          | total_amount              | shipping_address  | Cart State             | Expected             |
| ------ | -------------------------------------- | ------------------------- | ----------------- | ---------------------- | -------------------- |
| DT-003 | EP-V1-03 — Invalid (token sai/hết hạn) | EP-V2-01 — Giá trị hợp lệ | EP-V3-01 — Hợp lệ | EP-V4-01 — Có sản phẩm | ❌ 401/403 Forbidden |

## Preconditions

- Hệ thống EShop đang hoạt động tại `http://localhost:3000`
- Có một JWT Token đã hết hạn hoặc bị chỉnh sửa (malformed)

## Test data

| Field            | Value                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| Authorization    | `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.INVALID.TOKEN_SIGNATURE` |
| total_amount     | `200000`                                                              |
| shipping_address | `"123 Le Loi, Q1, TP.HCM"`                                            |

## Test steps

1. Gửi `POST /api/checkout` với header `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.INVALID.TOKEN_SIGNATURE`
2. Body: `{"total_amount": 200000, "shipping_address": "123 Le Loi, Q1, TP.HCM"}`
3. Kiểm tra response HTTP status code và body

## Expected result

- Response trả về HTTP **401 Unauthorized** hoặc **403 Forbidden**
- Body chứa thông báo lỗi về token không hợp lệ (ví dụ: `"Invalid token"` hoặc `"jwt malformed"`)
- Không có đơn hàng nào được tạo

## Actual result

- Response trả về HTTP **403 Forbidden**
- Body chứa thông báo lỗi: `"Forbidden"`
- Không có đơn hàng nào được tạo

## Status

PASSED
