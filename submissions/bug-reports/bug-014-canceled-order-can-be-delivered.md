# [BUG][Admin Orders] Đơn đã hủy có thể chuyển sang Đã giao

## Found by Test Case
GUI-047

## Requirement liên quan
FR-10, FR-18

## Severity / Priority
Major / P1

## Environment
**Browser:** Chrome 150.0.7871.182
**OS:** macOS 26.5.2
**URL:** http://127.0.0.1:5174/
**Commit:** `fc5acd6d9d858aba553addd8a4a84391c178b15d`

## Steps to reproduce
1. Đăng nhập Web Admin.
2. Mở mục “Đơn hàng”.
3. Tìm đơn ở trạng thái “Đã hủy”.
4. Bấm “Đánh dấu Đã giao”.

## Expected result
`canceled` là trạng thái kết thúc; không có hành động chuyển trạng thái và backend từ chối mọi chuyển đổi.

## Actual result
UI hiển thị nút “Đánh dấu Đã giao”; thao tác thành công và đơn chuyển từ “Đã hủy” sang “Đã giao”.

## Evidence
![Evidence](../gui-testing/evidence/admin-orders-markup-and-final-state-action.png)
![Evidence](../gui-testing/evidence/admin-canceled-order-changed-to-delivered.png)
