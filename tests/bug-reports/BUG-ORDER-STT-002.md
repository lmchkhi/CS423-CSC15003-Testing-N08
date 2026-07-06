# [BUG][Order] Admin chuyển được đơn hàng đã hủy sang đã giao

## Found by Test Case
TC-ORDER-STT-014

## Requirement liên quan
FR-10

## Severity / Priority
Major / P1

## Environment
- Browser: Chrome hoặc trình duyệt đang dùng để chạy browser console
- OS: macOS
- URL: `http://localhost:3000`
- API: `PUT /api/admin/orders/:id/status`
- Build/commit: local working copy
- Test data: đơn hàng đang ở trạng thái `canceled`

## Steps to reproduce
1. Đăng nhập bằng tài khoản user hợp lệ.
2. Tạo một đơn hàng mới bằng `POST /api/checkout`.
3. Đăng nhập bằng tài khoản admin.
4. Chuyển đơn hàng từ `pending` sang `canceled`.
5. Dùng token admin gọi `PUT /api/admin/orders/:id/status` với body `{"status": "delivered"}`.
6. Gọi `GET /api/orders/:id` để kiểm tra trạng thái hiện tại của đơn hàng.

## Expected result
API cập nhật trạng thái phải bị từ chối, ví dụ trả HTTP `400 Bad Request`. Trạng thái đơn hàng phải giữ nguyên là `canceled`, vì `canceled` là trạng thái kết thúc theo FR-10.

## Actual result
API trả HTTP `200 OK`. Đơn hàng bị chuyển từ `canceled` sang `delivered`.

## Evidence
Kết quả chạy test trên browser console:

| Test Case | Result | Actual | Expected |
| --- | --- | --- | --- |
| TC-ORDER-STT-014 | Fail | `200, delivered` | `400, canceled` |

## Labels
- `type: bug`
- `module: order`
- `technique: state-transition`
- `severity: major`
- `priority: P1`
- `status: new`
- `found-by: test-case`
