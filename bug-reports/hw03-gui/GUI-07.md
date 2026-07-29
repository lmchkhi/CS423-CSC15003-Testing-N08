---
title: "[BUG][Coupon] SAVE10 làm tăng tổng tiền thay vì giảm"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-07

## Requirement liên quan

FR-09 — Mã giảm giá

## Severity / Priority

Critical / P0

## Environment

- Chrome / Windows, viewport 1440 × 900
- Test date: 23/07/2026
- Frontend Web: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Account: user thường

## Steps to reproduce

1. Đăng nhập bằng tài khoản user thường và thêm sản phẩm đủ điều kiện vào giỏ.
2. Mở Checkout và ghi nhận tổng tiền trước giảm.
3. Nhập `SAVE10` tại Coupon section.
4. Bấm **Áp dụng** và quan sát tổng tiền.

## Expected result

Giá trị giảm, tổng trước giảm và tổng sau giảm dùng ký hiệu `₫`, phân cách hàng nghìn; phần trăm dùng `%` đúng và dễ phân biệt.

## Actual result

Coupon SAVE10 tăng giá thay vì giảm, sai logic áp dụng, không phải lỗi định dạng.

## Evidence

[GUI_07_49.png](../../evidence/hw03/Chrome/GUI_07_49.png)
