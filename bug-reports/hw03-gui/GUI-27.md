---
title: "[BUG][Checkout] Luồng Cart sang Checkout thiếu step indicator"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-27

## Requirement liên quan

FR-23 — Navigation Requirements

## Severity / Priority

Trivial / P3

## Environment

- Chrome / Windows, viewport 1440 × 900
- Test date: 23/07/2026
- Frontend Web: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Account: user thường

## Steps to reproduce

1. Đăng nhập và mở Cart có sản phẩm.
2. Bấm **Tiến hành thanh toán**.
3. Quan sát chỉ báo bước/vị trí trên Checkout.

## Expected result

Luồng Cart → Checkout thể hiện bước hiện tại rõ ràng bằng breadcrumb/navbar/step indicator và không làm người dùng mất phương hướng.

## Actual result

Luồng Cart → Checkout không có breadcrumb/step indicator nào thể hiện bước hiện tại.

## Evidence

[GUI_26_27_36.png](../../evidence/hw03/Chrome/GUI_26_27_36.png)
