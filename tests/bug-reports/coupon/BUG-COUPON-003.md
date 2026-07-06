# [BUG][Coupon] Từ chối mã khi tổng đơn hàng đúng bằng ngưỡng tối thiểu

## Found by Test Case

- [TC-COUPON-003](../../test-cases/coupon/TC-COUPON-003.md)

## Requirement liên quan

FR-09 — Điều kiện C3 quy định tổng đơn hàng `>= min_order_amount`.

## Severity / Priority

Major / P1

## Environment

- API: `http://localhost:3000/api/apply-coupon`
- Browser: Chrome 149.0.7827.201
- OS: macOS 26.5.2 (25F84)
- Node.js: v24.18.0
- Commit: `969e156`
- Execution date: 06/07/2026 16:19 (UTC+07)

## Steps to reproduce

1. Đăng nhập bằng User có JWT hợp lệ và chưa sử dụng `SAVE10`.
2. Gửi `POST /api/apply-coupon` với `code = SAVE10` và `total_amount = 300000`.
3. Quan sát response.

## Expected result

API chấp nhận mã vì tổng đơn hàng đúng bằng ngưỡng 300.000 ₫, trả HTTP 200, giảm 30.000 ₫ và cho ra `final_amount = 270.000 ₫`.

## Actual result

API trả HTTP 400 và từ chối mã:

```json
{
  "error": "Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này"
}
```

## Evidence

- [Test Run FR-09](../../test-runs/fr-09-coupon-api-test-run-2026-07-06.md)
- HTTP response thực tế đã được nhúng trong mục **Actual result** phía trên.
- Mục `TC-COUPON-003`

## Labels nên gắn

- `type: bug`
- `module: coupon`
- `module: api`
- `severity: major`
- `priority: P1`
- `status: new`
- `found-by: test-case`
