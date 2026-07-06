# [BUG][Order] User vẫn hủy được đơn hàng đang giao

## Found by Test Case
TC-ORDER-STT-009

## Requirement liên quan
FR-10

## Severity / Priority
Major / P1

## Environment
- Browser: Chrome hoặc trình duyệt đang dùng để chạy browser console
- OS: macOS
- URL: `http://localhost:3000`
- API: `PUT /api/orders/:id/cancel`
- Build/commit: local working copy
- Test data: đơn hàng của user đang ở trạng thái `shipping`

## Steps to reproduce
1. Đăng nhập bằng tài khoản user hợp lệ.
2. Tạo một đơn hàng mới bằng `POST /api/checkout`.
3. Đăng nhập bằng tài khoản admin.
4. Chuyển đơn hàng từ `pending` sang `confirmed`.
5. Chuyển đơn hàng từ `confirmed` sang `shipping`.
6. Dùng token user gọi `PUT /api/orders/:id/cancel` cho đơn hàng đang ở trạng thái `shipping`.
7. Gọi `GET /api/orders/:id` để kiểm tra trạng thái hiện tại của đơn hàng.

## Expected result
API hủy đơn phải bị từ chối, ví dụ trả HTTP `400 Bad Request`. Trạng thái đơn hàng phải giữ nguyên là `shipping`, vì FR-10 không cho phép user tự hủy đơn khi đơn đang được giao.

## Actual result
API trả HTTP `200 OK`. Đơn hàng bị chuyển từ `shipping` sang `canceled`.

## Evidence
Kết quả chạy test trên browser console:

| Test Case | Result | Actual | Expected |
| --- | --- | --- | --- |
| TC-ORDER-STT-009 | Fail | `200, canceled` | `400, shipping` |

## Labels
- `type: bug`
- `module: order`
- `technique: state-transition`
- `severity: major`
- `priority: P1`
- `status: new`
- `found-by: test-case`
