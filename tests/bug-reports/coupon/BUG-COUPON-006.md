# [BUG][Coupon] API cho phép áp dụng mã khi thiếu hoặc sai JWT Token

## Found by Test Case

- [TC-COUPON-009](../../test-cases/coupon/TC-COUPON-009.md)
- [TC-COUPON-010](../../test-cases/coupon/TC-COUPON-010.md)

## Requirement liên quan

FR-09 — Điều kiện C4 yêu cầu User phải có JWT Token hợp lệ.

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

1. Gửi `POST /api/apply-coupon` với `code = SAVE10`, `total_amount = 400000`, `user_id = 2` nhưng không có header `Authorization`.
2. Gửi lại cùng body với `Authorization: Bearer invalid.jwt.token`.
3. Quan sát status và response của cả hai yêu cầu.

## Expected result

- Thiếu JWT: API trả HTTP 401 và thông báo **"Vui lòng đăng nhập để sử dụng mã giảm giá"**.
- JWT sai: API trả HTTP 401/403 và thông báo **"Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại"**.
- Cả hai trường hợp không trả kết quả giảm giá và không tăng lượt sử dụng.

## Actual result

Cả hai yêu cầu đều trả HTTP 200 và áp dụng mã thành công. API tin tưởng `user_id` từ body mà không xác thực JWT:

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
- HTTP response của yêu cầu thiếu/sai JWT đã được nhúng trong mục **Actual result** phía trên.
- Các mục: `TC-COUPON-009`, `TC-COUPON-010`

## Labels nên gắn

- `type: bug`
- `module: coupon`
- `module: api`
- `severity: critical`
- `priority: P0`
- `status: new`
- `found-by: test-case`
