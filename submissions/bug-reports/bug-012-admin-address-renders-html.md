# [BUG][Admin Orders] Địa chỉ giao hàng được render như HTML

## Found by Test Case
GUI-042

## Requirement liên quan
FR-18, SEC-04

## Severity / Priority
Critical / P0

## Environment
**Browser:** Chrome 150.0.7871.182
**OS:** macOS 26.5.2
**URL:** http://127.0.0.1:5174/
**Commit:** `fc5acd6d9d858aba553addd8a4a84391c178b15d`

## Steps to reproduce
1. Tạo đơn có địa chỉ `<b>QA_MARKUP_ADDRESS</b>`.
2. Đăng nhập Web Admin.
3. Mở mục “Đơn hàng”.
4. Kiểm tra HTML của ô Địa chỉ tương ứng.

## Expected result
Địa chỉ hiển thị như văn bản thuần và không tạo/thực thi HTML.

## Actual result
Ô địa chỉ có `innerHTML="<b>QA_MARKUP_ADDRESS</b>"`, chứng minh dữ liệu được đưa trực tiếp vào HTML.

## Evidence
![Evidence](../gui-testing/evidence/admin-orders-markup-and-final-state-action.png)
