---
title: "[BUG][Admin Navigation] Back rời Admin thay vì về tab trước"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-33

## Requirement liên quan

FR-23 — Navigation Requirements

## Severity / Priority

Trivial / P3

## Environment

- Chrome / Windows, viewport 1440 × 900
- Test date: 23/07/2026
- Frontend Admin: `http://localhost:5174`
- Backend: `http://localhost:3000`
- Account: admin

## Steps to reproduce

1. Đăng nhập bằng tài khoản admin.
2. Từ một mục admin khác, chọn **Mã Giảm Giá**.
3. Xác nhận màn hình quản lý coupon được mở.
4. Bấm Back trên Chrome.

## Expected result

Mục Coupon trong điều hướng admin đưa đến đúng màn hình, có trạng thái đang chọn rõ ràng; Back/Forward giữ luồng điều hướng dễ hiểu.

## Actual result

Mục “Mã Giảm Giá” được highlight màu xanh và mở đúng màn hình “Quản lý Mã Giảm Giá”; Khi ấn backward thì lại ra trang chủ trình duyệt thay vì tab trước đó.

## Evidence

[GUI_23_33_34.png](../../evidence/hw03/Chrome/GUI_23_33_34.png)
