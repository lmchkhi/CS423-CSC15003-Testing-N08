---
title: "[BUG][Admin Coupon] Các luồng quản lý coupon bị gộp trên một màn hình"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-34

## Requirement liên quan

FR-17 — Quản lý Mã Giảm Giá

## Severity / Priority

Minor / P2

## Environment

- Chrome / Windows, viewport 1440 × 900
- Test date: 23/07/2026
- Frontend Admin: `http://localhost:5174`
- Backend: `http://localhost:3000`
- Account: admin

## Steps to reproduce

1. Đăng nhập bằng tài khoản admin.
2. Mở **Mã Giảm Giá**.
3. Quan sát form tạo, danh sách và các hành động quản lý coupon.

## Expected result

Luồng xem danh sách → tạo/xóa coupon → quay lại danh sách có hành động rõ ràng; không có control tạo, sửa, xóa hoặc hủy nào dẫn đến màn hình sai hay ngõ cụt.

## Actual result

Không có luồng tách biệt xem/tạo/sửa/xóa; toàn bộ gộp trên một màn hình.

## Evidence

[GUI_23_33_34.png](../../evidence/hw03/Chrome/GUI_23_33_34.png)
