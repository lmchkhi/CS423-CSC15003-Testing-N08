---
title: "[BUG][Checkout UI] Tổng tiền bằng 0 và có thể chỉnh trực tiếp"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR08-008`

## Found by Test Case

`FR08-UI-README-002` — phần assertion giá trị và trạng thái total input, chạy trên Chromium, Firefox và Microsoft Edge.

## Requirement liên quan

`FR-08` — tổng tiền được tự động tính từ giỏ hàng và không cho chỉnh trực tiếp.

## Root cause chung

Checkout UI không lấy tổng từ backend cart và render tổng dưới dạng input number editable với giá trị `0`.

## Phân loại xác minh

- Phân loại: `SUT defect`.
- Đã loại trừ test defect: fixture tính `6,000,000 × 2 = 12,000,000`; precondition API xác nhận cart item trước khi mở UI; expected dùng chính phép tính fixture.
- Đã loại trừ environment issue: input total render và tương tác được bình thường; actual `0`/editable tái hiện trên `3/3` project.
- Liên quan nhưng không trùng `BUG-FR08-001`: bug `001` là backend tin total client; bug này là presentation/control defect tại Checkout UI. Hai lỗi kết hợp làm tăng rủi ro sai giá trị đơn hàng.

## Environment

| Mục | Giá trị |
| --- | --- |
| Browser / project | Chromium; Firefox; Microsoft Edge (`msedge`) |
| OS | `Microsoft Windows NT 10.0.26200.0` |
| Frontend/API URL | `http://localhost:5173`; `http://localhost:3000` |
| Build/commit SUT | Không xác định |
| Thời điểm | `09/08/2026 15:32` |

## Tiền điều kiện

- User tạm role `user` đăng nhập thành công.
- Backend cart có AirPods Pro 2 ×2, tổng kỳ vọng `12,000,000`.

## Steps to reproduce

1. Chuẩn bị user/cart theo tiền điều kiện.
2. Đăng nhập qua web frontend và mở `/checkout`.
3. Kiểm tra input dưới nhãn `Tổng tiền thanh toán (VND)`.
4. Thử focus/chỉnh giá trị input.

## Expected result

UI hiển thị tổng `12,000,000` tính từ cart và không cho người dùng chỉnh trực tiếp.

## Actual result

Input number hiển thị `0`, dòng `Tổng thanh toán: 0 ₫`, và input vẫn editable.

## Severity / Priority

- Severity: `Critical`.
- Priority: `P1`.
- Lý do: UI cho phép client kiểm soát giá trị tài chính; backend hiện cũng không tự tính lại theo `BUG-FR08-001`.

## GitHub Issue

- Trạng thái: `Đã tạo — Open`
- URL/Issue ID: `#233` — https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/233
- Screenshot Issue: [Mở ảnh](<../screenshots_issues/FR-08/[BUG][Checkout UI] Tổng tiền bằng 0 và có thể chỉnh trực tiếp.png>)

![GitHub Issue #233](<../screenshots_issues/FR-08/[BUG][Checkout UI] Tổng tiền bằng 0 và có thể chỉnh trực tiếp.png>)
