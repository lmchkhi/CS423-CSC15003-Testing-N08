---
title: "[BUG][Checkout] Checkout tin total_amount từ client — không validate server-side"
labels: '["Type: Bug", "Status: New", "Security"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

PERF-RCO-06-Checkout (Phase A source code review)

## Requirement liên quan

FR-08 — Checkout

## Severity / Priority

Critical / P0

## Environment

- Backend: Node.js + Express + SQLite, `localhost:3000`
- OS: Windows 11 Pro, Intel i7-12700H, 32 GB RAM
- Commit: `fd030c68`

## Steps to reproduce

1. Đăng nhập với tài khoản hợp lệ
2. Thêm sản phẩm iPhone 15 Pro Max (giá 30.000.000₫) vào giỏ hàng
3. Gửi `POST /api/checkout` với body:
   ```json
   {
     "total_amount": 1,
     "shipping_address": "Test Address"
   }
   ```
4. Kiểm tra order vừa tạo

## Expected result

Server tính `total_amount` từ giỏ hàng thực tế (price × quantity). Giá trị `total_amount` từ client bị bỏ qua hoặc dùng để cross-check.

## Actual result

Server chấp nhận bất kỳ `total_amount` nào từ client mà không validate. Order được tạo thành công với `total_amount = 1` (thay vì 30.000.000₫).

## Evidence

- **Performance test handling:** Workflow RCO tính `totalAmount = detailPrice × quantity` từ product detail response trước khi gửi checkout mô phỏng client behavior hợp lệ. Nhưng server không enforce, nên bất kỳ giá trị nào cũng được chấp nhận.
