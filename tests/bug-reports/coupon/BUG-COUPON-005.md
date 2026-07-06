# [BUG][Coupon] Thông báo đơn hàng dưới ngưỡng không đúng nội dung kỳ vọng

## Found by Test Case

- [TC-COUPON-008](../../test-cases/coupon/TC-COUPON-008.md)

## Requirement liên quan

FR-09 — Hệ thống từ chối mã khi `total < min_order_amount` và hiển thị thông báo phù hợp.

## Severity / Priority

Minor / P2

## Environment

- API: `http://localhost:3000/api/apply-coupon`
- Browser: Chrome 149.0.7827.201
- OS: macOS 26.5.2 (25F84)
- Node.js: v24.18.0
- Commit: `969e156`
- Execution date: 06/07/2026 16:19 (UTC+07)

## Steps to reproduce

1. Đăng nhập bằng User có JWT hợp lệ và chưa dùng `SAVE10`.
2. Gửi `POST /api/apply-coupon` với `code = SAVE10` và `total_amount = 299999`.
3. Quan sát thông báo lỗi.

## Expected result

API trả **"Đơn hàng chưa đạt giá trị tối thiểu để sử dụng mã"**, không tính giảm giá và không tăng lượt sử dụng.

## Actual result

API từ chối đúng điều kiện và không tăng lượt, nhưng trả nội dung khác với Expected Result:

```json
{
  "error": "Đơn hàng chưa đủ giá trị tối thiểu 300,000 ₫ để áp dụng mã này"
}
```

## Evidence

- [Test Run FR-09](../../test-runs/fr-09-coupon-api-test-run-2026-07-06.md)
- HTTP response thực tế đã được nhúng trong mục **Actual result** phía trên.
- Mục `TC-COUPON-008`

## Labels nên gắn

- `type: bug`
- `module: coupon`
- `module: api`
- `severity: minor`
- `priority: P2`
- `status: new`
- `found-by: test-case`
