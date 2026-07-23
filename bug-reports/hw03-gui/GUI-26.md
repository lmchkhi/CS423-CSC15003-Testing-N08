---
title: "[BUG][Cart] Thiếu chỉ báo vị trí hiện tại trước Checkout"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

GUI-26

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
2. Quan sát breadcrumb, navbar hoặc step indicator trước khi chuyển bước.
3. Bấm **Tiến hành thanh toán**.

## Expected result

Nút tiến tới Checkout điều hướng đúng màn hình; breadcrumb/navbar thể hiện Cart là vị trí hiện tại trước khi chuyển bước.

## Actual result

Không có breadcrumb/navbar/step indicator nào thể hiện Cart là bước hiện tại trước khi chuyển sang Checkout.

## Evidence

[GUI_26_27_36.png](../../evidence/hw03/GUI_26_27_36.png)
