# [BUG][Coupon] Thông báo hết lượt sử dụng không đúng nội dung kỳ vọng

## Found by Test Case

- [TC-COUPON-011](../../test-cases/coupon/TC-COUPON-011.md)

## Requirement liên quan

FR-09 — Hệ thống từ chối mã khi `used_count >= max_uses_per_user` và hiển thị thông báo phù hợp.

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

1. Chuẩn bị User đã dùng `SAVE10` đúng 1 lần, bằng `max_uses_per_user = 1`.
2. Gửi `POST /api/apply-coupon` với `code = SAVE10`, `total_amount = 400000`, `user_id` và JWT hợp lệ.
3. Quan sát thông báo lỗi.

## Expected result

API từ chối mã, giữ lượt sử dụng là 1 và trả **"Bạn đã sử dụng hết lượt cho mã giảm giá này"**.

## Actual result

API từ chối đúng và giữ lượt sử dụng là 1 nhưng trả nội dung khác với Expected Result:

```json
{
  "error": "Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)"
}
```

## Evidence

- [Test Run FR-09](../../test-runs/fr-09-coupon-api-test-run-2026-07-06.md)
- HTTP response thực tế đã được nhúng trong mục **Actual result** phía trên.
- Mục `TC-COUPON-011`

## Labels nên gắn

- `type: bug`
- `module: coupon`
- `module: api`
- `severity: minor`
- `priority: P2`
- `status: new`
- `found-by: test-case`
