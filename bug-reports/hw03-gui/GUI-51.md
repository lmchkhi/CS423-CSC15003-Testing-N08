---
title: "[BUG][Cart] Thêm lại sản phẩm tạo dòng trùng thay vì cộng dồn số lượng"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

Quan sát exploratory trong khi thực thi Cart; defect được ghi nhận tách biệt khỏi GUI-13 và GUI-14.

## Requirement liên quan

FR-07 — Thêm cùng một sản phẩm vào giỏ phải tăng số lượng, không tạo dòng mới.

## Severity / Priority

Major / P1

## Environment

- Test date: 23/07/2026
- Browser: Chrome
- OS: Windows
- Viewport: 1440 × 900
- Frontend Web: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Account: user thường, không phải admin
- Build/commit: chưa được cung cấp

## Steps to reproduce

1. Đăng nhập bằng tài khoản user thường.
2. Thêm một sản phẩm vào giỏ hàng.
3. Thêm lại đúng sản phẩm đó vào giỏ hàng.
4. Mở màn hình Cart.

## Expected result

Cart chỉ hiển thị một dòng cho sản phẩm và tăng số lượng của dòng đó từ 1 lên 2.

## Actual result

Cart hiển thị hai dòng cùng tên sản phẩm, mỗi dòng có số lượng 1, thay vì cộng dồn số lượng. Tổng tiền của hai dòng vẫn được tính vào tổng giỏ.

## Evidence

[GUI_13_14.png](../../evidence/hw03/Chrome/GUI_13_14.png)
