---
title: "[BUG][Admin Coupon] Thứ tự Tab giữa form và danh sách không hợp lý"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-48

## Requirement liên quan

FR-21 — Tab Order

## Severity / Priority

Minor / P2

## Environment

- Chrome / Windows, viewport 1440 × 900
- Test date: 23/07/2026
- Frontend Admin: `http://localhost:5174`
- Backend: `http://localhost:3000`
- Account: admin

## Steps to reproduce

1. Đăng nhập bằng tài khoản admin và mở **Mã Giảm Giá**.
2. Dùng Tab để di chuyển qua sidebar, form tạo coupon, danh sách và các nút Xóa.
3. Ghi nhận thứ tự focus.

## Expected result

Admin Coupon Management — thứ tự Tab bàn phím khi di chuyển giữa danh sách, form tạo và nút sửa/xóa gộp chung 1 màn hình

## Actual result

Ảnh cho thấy form tạo coupon và danh sách coupon với các nút Xóa được gộp trên cùng một màn hình;.

## Evidence

[GUI_48.png](../../evidence/hw03/Chrome/GUI_48.png). Ảnh tĩnh không hiển thị thứ tự Tab.
