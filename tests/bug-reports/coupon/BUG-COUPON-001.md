# [BUG][Coupon] Công thức mã percent tạo số tiền giảm âm và làm tổng tiền tăng

## Found by Test Case

- [TC-COUPON-001](../../test-cases/coupon/TC-COUPON-001.md)

## Requirement liên quan

FR-09 — Mã Giảm Giá: `discount_amount = total × discount_value / 100` và `final_amount = total - discount_amount`.

## Severity / Priority

Critical / P0

## Environment

- API: `http://localhost:3000/api/apply-coupon`
- Browser: Chrome 149.0.7827.201
- OS: macOS 26.5.2 (25F84)
- Node.js: v24.18.0
- Commit: `969e156`
- Execution date: 06/07/2026 16:19 (UTC+07)

## Steps to reproduce

1. Đăng nhập bằng tài khoản `test@eshop.com` để lấy JWT Token và `user_id = 2`.
2. Gửi `POST /api/apply-coupon` với mã `SAVE10`, `total_amount = 400000`, `user_id = 2` và JWT hợp lệ.
3. Kiểm tra `discount_amount` và `final_amount` trong response.

## Expected result

API áp dụng mức giảm 10%: `discount_amount = 40.000 ₫` và `final_amount = 360.000 ₫`.

## Actual result

API trả HTTP 200 nhưng `discount_amount = -3.600.000 ₫` và `final_amount = 4.000.000 ₫`. Tổng tiền sau giảm lớn gấp 10 lần tổng ban đầu.

```json
{
  "success": true,
  "coupon_id": 1,
  "discount_amount": -3600000,
  "final_amount": 4000000,
  "message": "Áp dụng thành công! Giảm 10%"
}
```

## Evidence

- [Test Run FR-09](../../test-runs/fr-09-coupon-api-test-run-2026-07-06.md)
- Request/response thực tế đã được nhúng trong mục **Actual result** phía trên.
- Runner: `node tests/api/run-fr09-api-tests.js`

## Labels nên gắn

- `type: bug`
- `module: coupon`
- `module: api`
- `severity: critical`
- `priority: P0`
- `status: new`
- `found-by: test-case`
