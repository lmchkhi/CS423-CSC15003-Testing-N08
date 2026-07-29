---
title: "[BUG][Cart] Không có điều khiển tăng giảm số lượng"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-13

## Requirement liên quan

FR-07 — Giỏ hàng

## Severity / Priority

Minor / P2

## Environment

- Chrome / Windows, viewport 1440 × 900
- Test date: 23/07/2026
- Frontend Web: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Account: user thường

## Steps to reproduce

1. Đăng nhập bằng tài khoản user thường.
2. Thêm một sản phẩm với số lượng 1 vào giỏ.
3. Mở Cart.
4. Quan sát khu vực Số lượng và tìm điều khiển tăng/giảm.

## Expected result

Điều khiển số lượng có nhãn/biểu tượng dễ hiểu, vùng bấm rõ ràng và không cho người dùng tạo số lượng nhỏ hơn 1.

## Actual result

Không thể kiểm tra min-quantity vì control tăng/giảm số lượng không tồn tại.

## Evidence

[GUI_13_14.png](../../evidence/hw03/Chrome/GUI_13_14.png)
