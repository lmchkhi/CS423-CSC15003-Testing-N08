---
title: "[BUG][Admin Coupon] Xóa coupon không có xác nhận"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-46

## Requirement liên quan

FR-17 / FR-24 — Xóa coupon và xác nhận thao tác

## Severity / Priority

Major / P1

## Environment

- Chrome / Windows, viewport 1440 × 900
- Test date: 23/07/2026
- Frontend Admin: `http://localhost:5174`
- Backend: `http://localhost:3000`
- Account: admin

## Steps to reproduce

1. Đăng nhập bằng tài khoản admin.
2. Mở danh sách coupon có `SAVE10`.
3. Bấm **Xóa** tại dòng `SAVE10`.
4. Quan sát hộp thoại xác nhận và số dòng trong danh sách.

## Expected result

Xóa coupon yêu cầu xác nhận; Hủy không đổi danh sách, xác nhận xóa cập nhật đúng dòng; lỗi xóa có thông báo và không làm mất trạng thái danh sách.

## Actual result

Xóa coupon SAVE10 không xuất hiện hộp thoại xác nhận nào; danh sách cập nhật ngay từ 4 xuống 3 dòng.

## Evidence

[GUI_46.png](../../evidence/hw03/Chrome/GUI_46.png)
