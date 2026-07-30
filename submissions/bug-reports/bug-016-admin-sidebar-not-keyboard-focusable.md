# [BUG][Admin Navigation] Các mục sidebar không thể focus bằng bàn phím

## Found by Test Case
GUI-051

## Requirement liên quan
FR-21, FR-23

## Severity / Priority
Major / P1

## Environment
**Browser:** Chrome 150.0.7871.182
**OS:** macOS 26.5.2
**URL:** http://127.0.0.1:5174/
**Commit:** `fc5acd6d9d858aba553addd8a4a84391c178b15d`

## Steps to reproduce
1. Đăng nhập Web Admin.
2. Kiểm tra các mục Dashboard/Danh mục/Sản phẩm/Đơn hàng trong sidebar.
3. Chuyển tab và kiểm tra `document.activeElement`.

## Expected result
Mỗi mục điều hướng là control có thể focus/kích hoạt bằng bàn phím; sau chuyển tab, focus được đặt tại vị trí hợp lý trong nội dung mới.

## Actual result
Các mục là `li` có `onClick` nhưng không có `tabindex` hay semantics điều khiển. Sau khi chọn “Đơn hàng”, `document.activeElement` vẫn là `BODY`.

## Evidence
![Evidence](../gui-testing/evidence/admin-orders-markup-and-final-state-action.png)
