# [BUG][Navigation] Nút đăng xuất trên Web User dùng nhãn “Thoát”

## Found by Test Case
GUI-035, GUI-050

## Requirement liên quan
FR-23

## Severity / Priority
Minor / P2

## Environment
**Browser:** Chrome 150.0.7871.182
**OS:** macOS 26.5.2
**URL:** http://127.0.0.1:5173/profile
**Commit:** `fc5acd6d9d858aba553addd8a4a84391c178b15d`

## Steps to reproduce
1. Đăng nhập bằng tài khoản người dùng.
2. Quan sát nút đăng xuất trên navbar.

## Expected result
Nút có nhãn chính xác “Đăng xuất”.

## Actual result
Nút có nhãn “Thoát”.

## Evidence
![Evidence](../gui-testing/evidence/profile-page-baseline.png)
