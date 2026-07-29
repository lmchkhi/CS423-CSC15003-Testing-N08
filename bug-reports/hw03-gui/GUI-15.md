---
title: "[BUG][Checkout] Thiếu dấu hiệu nhận biết trường bắt buộc"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-15

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

1. Đăng nhập bằng tài khoản user thường.
2. Chuẩn bị giỏ hàng hợp lệ và mở Checkout.
3. Quan sát nhãn và dấu hiệu bắt buộc của các trường thông tin giao hàng/thanh toán.

## Expected result

Mọi trường bắt buộc của thông tin giao hàng/thanh toán có nhãn rõ và ký hiệu `*`; nhãn vẫn hiểu được sau khi người dùng nhập dữ liệu.

## Actual result

Không có dấu `*` hoặc dấu hiệu nào cho trường bắt buộc.

## Evidence

[GUI_15_16.png](../../evidence/hw03/Chrome/GUI_15_16.png)
