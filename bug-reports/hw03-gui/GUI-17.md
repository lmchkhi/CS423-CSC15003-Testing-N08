---
title: "[BUG][Checkout] Tổng tiền thanh toán có thể chỉnh sửa trực tiếp"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-17

## Requirement liên quan

FR-08 — Tổng tiền Checkout không cho phép chỉnh sửa trực tiếp

## Severity / Priority

Major / P1

## Environment

- Chrome / Windows, viewport 1440 × 900
- Test date: 23/07/2026
- Frontend Web: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Account: user thường

## Steps to reproduce

1. Đăng nhập và mở Checkout với giỏ hàng không rỗng.
2. Đưa focus vào ô Tổng tiền thanh toán.
3. Dùng bàn phím để thay đổi giá trị.

## Expected result

Với toàn bộ dữ liệu hợp lệ, form chấp nhận gửi; dữ liệu trong phần tóm tắt và tổng tiền không trở thành trường cho phép chỉnh sửa trực tiếp.

## Actual result

Ô Tổng tiền thanh toán là input có thể chỉnh sửa trực tiếp bằng bàn phím, không phải trường chỉ đọc như kỳ vọng.

## Evidence

[GUI_17.png](../../evidence/hw03/Chrome/GUI_17.png)
