---
title: "[BUG][Admin Coupon] Form tạo coupon thiếu nhãn và dấu bắt buộc"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-23

## Requirement liên quan

FR-17 / FR-22 — Coupon CRUD và Form Requirements

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
3. Quan sát form **Tạo mã giảm giá mới** và nhãn của từng control.

## Expected result

Tất cả trường bắt buộc khi tạo coupon — mã, loại, giá trị giảm, ngày hết hạn, đơn tối thiểu và giới hạn/người — có nhãn rõ, ký hiệu `*` và liên kết dễ nhận biết với control tương ứng.

## Actual result

Form tạo coupon không hiển thị ký hiệu `*` cho các trường bắt buộc; các ô nhập chủ yếu chỉ dùng placeholder, không có nhãn văn bản riêng hiển thị cạnh từng control.

## Evidence

[GUI_23_33_34.png](../../evidence/hw03/Chrome/GUI_23_33_34.png)
