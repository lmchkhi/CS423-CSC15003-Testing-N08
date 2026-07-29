---
title: "[BUG][Checkout Success] Không có trạng thái khôi phục rõ khi mất mạng"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-43

## Requirement liên quan

FR-24 — Feedback và Error Recovery

## Severity / Priority

Trivial / P3

## Environment

- Chrome / Windows, viewport 1440 × 900
- Test date: 23/07/2026
- Frontend Web: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Account: user thường

## Steps to reproduce

1. Chuẩn bị một đơn hàng hợp lệ.
2. Làm gián đoạn kết nối mạng trong luồng hoàn tất thanh toán.
3. Quan sát phản hồi và khả năng chuyển tới/tải lại Checkout Success.

## Expected result

Khi không tải được chi tiết xác nhận, màn hình có trạng thái lỗi/khôi phục rõ và không hiển thị nhầm thành thất bại thanh toán hay khuyến khích trả tiền lại.

## Actual result

Ảnh ghi nhận tại Checkout khi mất mạng: alert “Lỗi khi thanh toán: Network Error”, request checkout ở trạng thái pending và nút hiển thị “Đang xử lý...”; ảnh không hiển thị màn hình Checkout Success hoặc trạng thái tải lại chi tiết xác nhận.

## Evidence

[GUI_38_43.png](../../evidence/hw03/Chrome/GUI_38_43.png). Evidence hiện tại không ghi lại màn hình Checkout Success.
