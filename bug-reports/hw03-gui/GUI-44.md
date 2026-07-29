---
title: "[BUG][Admin Coupon] Danh sách trống khi tải chậm không có loading"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-44

## Requirement liên quan

FR-24 — Loading và Empty State

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
2. Chọn cấu hình mạng Slow 4G.
3. Mở **Mã Giảm Giá**.
4. Quan sát khu vực danh sách trong lúc chờ dữ liệu.

## Expected result

Trong lúc tải danh sách, UI có trạng thái loading; khi danh sách rỗng có empty state rõ và vẫn cung cấp đường tạo coupon.

## Actual result

Khi mạng chậm (Slow 4G), bảng danh sách coupon hiển thị trống hoàn toàn, không có loading indicator nào trong lúc chờ dữ liệu.

## Evidence

[GUI_44.png](../../evidence/hw03/Chrome/GUI_44.png)
