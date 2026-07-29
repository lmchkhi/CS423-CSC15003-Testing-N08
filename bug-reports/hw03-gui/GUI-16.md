---
title: "[BUG][Checkout] Thiếu trường bắt buộc để kiểm tra submit rỗng"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-16

## Requirement liên quan

FR-08 / FR-22 — Checkout và Form Requirements

## Severity / Priority

Minor / P2

## Environment

- Chrome / Windows, viewport 1440 × 900
- Test date: 23/07/2026
- Frontend Web: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Account: user thường

## Steps to reproduce

1. Đăng nhập và mở Checkout với giỏ hàng hợp lệ.
2. Tìm các trường thông tin giao hàng/thanh toán bắt buộc.
3. Thử để trống từng trường bắt buộc trước khi submit.

## Expected result

Gửi form khi bỏ trống trường bắt buộc không tạo đơn; thông báo lỗi cụ thể xuất hiện gần trường liên quan và phía trên nút submit.

## Actual result

Checkout không có bất kỳ trường thông tin giao hàng/thanh toán bắt buộc nào để kiểm tra việc chặn submit khi bỏ trống; do đó không thể tái hiện đúng kịch bản của item này.

## Evidence

[GUI_15_16.png](../../evidence/hw03/Chrome/GUI_15_16.png)
