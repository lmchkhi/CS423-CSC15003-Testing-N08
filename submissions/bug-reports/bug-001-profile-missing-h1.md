# [BUG][Profile] Trang hồ sơ không có tiêu đề `h1`

## Found by Test Case
GUI-001

## Requirement liên quan
FR-21

## Severity / Priority
Major / P1

## Environment
**Browser:** Chrome 150.0.7871.182
**OS:** macOS 26.5.2
**URL:** http://127.0.0.1:5173/profile
**Commit:** `fc5acd6d9d858aba553addd8a4a84391c178b15d`

## Steps to reproduce
1. Đăng nhập bằng tài khoản người dùng hợp lệ.
2. Mở `/profile`.
3. Kiểm tra cấu trúc heading của vùng nội dung chính.

## Expected result
Trang có đúng một `h1` mô tả nội dung hồ sơ; “Hồ sơ của bạn” và “Lịch sử đơn hàng” là heading cấp thấp hơn.

## Actual result
Trang không có `h1`; cả “Hồ sơ của bạn” và “Lịch sử đơn hàng” đều là `h2`.

## Evidence
![Evidence](../gui-testing/evidence/profile-page-baseline.png)
