---
title: "[BUG][Cart] Không thể kiểm tra focus của điều khiển số lượng"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-14

## Requirement liên quan

FR-07 / FR-21 — Điều khiển số lượng và Tab Order

## Severity / Priority

Minor / P2

## Environment

- Chrome / Windows, viewport 1440 × 900
- Test date: 23/07/2026
- Frontend Web: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Account: user thường

## Steps to reproduce

1. Đăng nhập và mở Cart có ít nhất hai sản phẩm.
2. Dùng phím Tab để di chuyển qua các control trong từng dòng.
3. Tìm điều khiển tăng/giảm số lượng và quan sát focus.

## Expected result

Khi thay đổi số lượng bằng bàn phím hoặc điều khiển tăng/giảm, focus vẫn nhìn thấy và thứ tự Tab đi theo trình tự thị giác hợp lý.

## Actual result

Không thể kiểm tra focus-order vì control tăng/giảm số lượng không tồn tại.

## Evidence

[GUI_13_14.png](../../evidence/hw03/GUI_13_14.png)
