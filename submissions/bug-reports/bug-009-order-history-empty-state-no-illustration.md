# [BUG][Order History] Empty state thiếu icon hoặc hình minh họa

## Found by Test Case
GUI-036

## Requirement liên quan
FR-24

## Severity / Priority
Minor / P2

## Environment
**Browser:** Chrome 150.0.7871.182
**OS:** macOS 26.5.2
**URL:** http://127.0.0.1:5173/profile
**Commit:** `fc5acd6d9d858aba553addd8a4a84391c178b15d`

## Steps to reproduce
1. Đăng nhập bằng tài khoản chưa có đơn hàng.
2. Mở `/profile`.
3. Quan sát khu vực “Lịch sử đơn hàng”.

## Expected result
Empty state có thông điệp thân thiện và icon/hình minh họa.

## Actual result
Khu vực chỉ hiển thị “Bạn chưa có đơn hàng nào.” và không có `img` hoặc `svg`.

## Evidence
![Evidence](../gui-testing/evidence/order-history-empty-without-illustration.png)
