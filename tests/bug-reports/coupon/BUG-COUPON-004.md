# [BUG][Coupon] Thông báo không phân biệt mã không tồn tại và mã bị vô hiệu hóa

## Found by Test Case

- [TC-COUPON-005](../../test-cases/coupon/TC-COUPON-005.md)
- [TC-COUPON-006](../../test-cases/coupon/TC-COUPON-006.md)
- [TC-COUPON-012](../../test-cases/coupon/TC-COUPON-012.md)

## Requirement liên quan

FR-09 — Hệ thống phải kiểm tra mã tồn tại, `is_active = 1`, phân biệt chữ hoa/thường và trả thông báo phù hợp với nguyên nhân thất bại.

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

1. Gửi yêu cầu áp dụng mã không tồn tại `NOTFOUND`.
2. Tạm đặt `BIGBUY.is_active = 0` rồi gửi yêu cầu áp dụng `BIGBUY`.
3. Gửi yêu cầu áp dụng mã sai chữ hoa/thường `save10` trong khi CSDL chỉ có `SAVE10`.
4. So sánh thông báo của ba response.

## Expected result

- `NOTFOUND` và `save10`: **"Mã giảm giá không tồn tại"**.
- `BIGBUY` không hoạt động: **"Mã giảm giá hiện không hoạt động"**.

## Actual result

Cả ba trường hợp đều trả HTTP 404 với cùng thông báo, khiến User không biết mã không tồn tại hay đã bị vô hiệu hóa:

```json
{
  "error": "Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa"
}
```

## Evidence

- [Test Run FR-09](../../test-runs/fr-09-coupon-api-test-run-2026-07-06.md)
- HTTP response chung của ba trường hợp đã được nhúng trong mục **Actual result** phía trên.
- Các mục: `TC-COUPON-005`, `TC-COUPON-006`, `TC-COUPON-012`

## Labels nên gắn

- `type: bug`
- `module: coupon`
- `module: api`
- `severity: minor`
- `priority: P2`
- `status: new`
- `found-by: test-case`
