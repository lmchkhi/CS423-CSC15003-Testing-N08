---
title: "[BUG][Checkout] Checkout không xóa giỏ hàng sau khi đặt hàng thành công"
labels: '["Type: Bug", "Status: New"]'
assignees: "Trần Minh Quang"
---

## Found by Test Case

PERF-RCO-06-Checkout (Phase A runtime probe + Phase D1–D4 measured execution)

## Requirement liên quan

FR-08 — Checkout

## Severity / Priority

Major / P1

## Environment

- Backend: Node.js + Express + SQLite, `localhost:3000`
- OS: Windows 11 Pro, Intel i7-12700H, 32 GB RAM
- Commit: `fd030c68`

## Steps to reproduce

1. Đăng nhập với tài khoản hợp lệ (`POST /api/login`)
2. Thêm sản phẩm vào giỏ hàng (`POST /api/cart`)
3. Xác nhận giỏ hàng có ≥1 item (`GET /api/cart`)
4. Thực hiện checkout (`POST /api/checkout`)
5. Kiểm tra lại giỏ hàng (`GET /api/cart`)

## Expected result

Sau checkout thành công, giỏ hàng của user được xóa hoặc làm rỗng. `GET /api/cart` trả về mảng rỗng `[]`.

## Actual result

Giỏ hàng vẫn giữ nguyên item sau checkout. `GET /api/cart` trả về danh sách item cũ. Cart tích lũy qua các iteration, gây state drift trong test dài hạn.

## Evidence

- **Runtime probe Phase A:** Sau checkout, cart vẫn còn 1 item (xác nhận lúc `21:44:43 +07:00`).
- **Phase D4 Endurance (30 phút):** Working set tăng +4,7 MiB do cart/order accumulation; Checkout avg tăng từ 7,9 ms (D1, 6 phút) lên 36,3 ms (D4, 30 phút).
