# [BUG][Authorization] User thường đọc được toàn bộ đơn hàng qua API Admin

## Found by Test Case
GUI-044

## Requirement liên quan
FR-12, SEC-03

## Severity / Priority
Critical / P0

## Environment
**Browser:** Chrome 150.0.7871.182
**OS:** macOS 26.5.2
**URL:** http://127.0.0.1:3000/api/admin/orders
**Commit:** `fc5acd6d9d858aba553addd8a4a84391c178b15d`

## Steps to reproduce
1. Đăng nhập API bằng `test@eshop.com` (role `user`).
2. Gửi JWT nhận được tới `GET /api/admin/orders`.
3. Kiểm tra status và payload.

## Expected result
API trả `403 Forbidden` và không trả danh sách đơn hàng toàn hệ thống.

## Actual result
API trả `200 OK` và danh sách 5 đơn hàng dù token có role `user`.

## Evidence
![Evidence](../gui-testing/evidence/admin-orders-markup-and-final-state-action.png)
