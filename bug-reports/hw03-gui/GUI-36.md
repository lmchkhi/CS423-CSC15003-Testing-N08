---
title: "[BUG][Cart] Xóa sản phẩm ngay không có xác nhận"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-36

## Requirement liên quan

FR-07 / FR-24 — Xác nhận xóa sản phẩm

## Severity / Priority

Major / P1

## Environment

- Chrome / Windows, viewport 1440 × 900
- Test date: 23/07/2026
- Frontend Web: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Account: user thường

## Steps to reproduce

1. Đăng nhập và mở Cart có ít nhất hai sản phẩm.
2. Bấm **Xóa** trên một dòng sản phẩm.
3. Quan sát xem có hộp thoại xác nhận hay không và kiểm tra danh sách.

## Expected result

Xóa sản phẩm yêu cầu xác nhận; Hủy giữ nguyên dòng, Xác nhận xóa cập nhật danh sách, tổng tiền và badge giỏ ngay, kèm phản hồi nhìn thấy được.

## Actual result

Xóa sản phẩm không có hộp thoại xác nhận; sản phẩm bị xóa ngay khi bấm.

## Evidence

[GUI_26_27_36.png](../../evidence/hw03/GUI_26_27_36.png)
