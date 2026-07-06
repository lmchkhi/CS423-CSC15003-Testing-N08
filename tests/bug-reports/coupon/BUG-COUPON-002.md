# [BUG][Coupon] Không tăng lượt sử dụng sau khi áp dụng mã thành công

## Found by Test Case

- [TC-COUPON-001](../../test-cases/coupon/TC-COUPON-001.md)
- [TC-COUPON-002](../../test-cases/coupon/TC-COUPON-002.md)
- [TC-COUPON-004](../../test-cases/coupon/TC-COUPON-004.md)

## Requirement liên quan

FR-09 — Sau khi áp dụng mã thành công, số lượt sử dụng mã của User tăng 1 để kiểm soát `max_uses_per_user`.

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

1. Xóa lịch sử sử dụng mã của User thử nghiệm.
2. Gửi yêu cầu hợp lệ để áp dụng `BIGBUY` với tổng đơn hàng 600.000 ₫ và JWT hợp lệ.
3. Xác nhận API trả thành công.
4. Kiểm tra số bản ghi `coupon_usage` của User đối với `BIGBUY`.
5. Lặp lại với `SAVE10`, hoặc chuẩn bị `VIP100` đã dùng 1/2 lượt rồi áp dụng lần thứ hai.

## Expected result

Mỗi lần áp dụng mã thành công làm số lượt sử dụng của User tăng đúng 1: `SAVE10` và `BIGBUY` tăng từ 0 lên 1; `VIP100` tăng từ 1 lên 2.

## Actual result

API trả thành công và tính đúng mã fixed nhưng không tạo bản ghi lượt sử dụng. `SAVE10` và `BIGBUY` vẫn ở 0 lượt; `VIP100` vẫn ở 1 lượt sau lần áp dụng thành công thứ hai.

## Evidence

- [Test Run FR-09](../../test-runs/fr-09-coupon-api-test-run-2026-07-06.md)
- Kết quả lượt sử dụng trước/sau đã được ghi trong mục **Actual result** phía trên.
- Các mục: `TC-COUPON-001`, `TC-COUPON-002`, `TC-COUPON-004`

## Labels nên gắn

- `type: bug`
- `module: coupon`
- `module: api`
- `severity: major`
- `priority: P1`
- `status: new`
- `found-by: test-case`
