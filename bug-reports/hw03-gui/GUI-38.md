---
title: "[BUG][Checkout] Lỗi mạng khiến submit kẹt ở trạng thái xử lý"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-38

## Requirement liên quan

FR-24 — Feedback và Error Recovery

## Severity / Priority

Major / P1

## Environment

- Chrome / Windows, viewport 1440 × 900
- Test date: 23/07/2026
- Frontend Web: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Account: user thường

## Steps to reproduce

1. Đăng nhập và mở Checkout với giỏ hợp lệ.
2. Chuyển mạng sang Offline.
3. Bấm **Xác nhận thanh toán**.
4. Đóng alert lỗi và quan sát trạng thái nút submit.

## Expected result

Nếu tải/gửi đơn thất bại, UI hiển thị lỗi dễ hiểu, giữ dữ liệu người dùng hợp lý và cung cấp cách thử lại mà không làm mất giỏ.

## Actual result

Khi mất kết nối mạng lúc submit, hệ thống hiển thị alert lỗi chung "Lỗi khi thanh toán: Network Error", nút Xác nhận thanh toán bị kẹt ở trạng thái "Đang xử lý..." không rõ có cho phép thử lại hay không.

## Evidence

[GUI_38_43.png](../../evidence/hw03/Chrome/GUI_38_43.png)
