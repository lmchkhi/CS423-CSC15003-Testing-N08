---
title: "[BUG][Checkout UI] Người chưa đăng nhập vẫn truy cập được trang checkout"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR08-006`

## Found by Test Case

`FR08-UI-README-001` — chạy bằng browser page thật trên Chromium, Firefox và Microsoft Edge.

## Requirement liên quan

`FR-08` — chỉ người dùng đã đăng nhập mới tiến hành thanh toán được.

## Root cause chung

Frontend không bảo vệ route `/checkout`: anonymous context vẫn render đầy đủ trang xác nhận đơn hàng và nút thanh toán thay vì chuyển tới `/login`.

## Phân loại xác minh

- Phân loại: `SUT defect`.
- Đã loại trừ test defect: mỗi case dùng browser context mới, không có login/storage state; URL được assert trực tiếp.
- Đã loại trừ environment issue: frontend trả trang hợp lệ và cùng actual tái hiện trên `3/3` project.
- Số lần tái hiện: `3/3` lượt UI — Chromium, Firefox, Edge.

## Environment

| Mục | Giá trị |
| --- | --- |
| Browser / project | Chromium; Firefox; Microsoft Edge (`msedge`) |
| OS | `Microsoft Windows NT 10.0.26200.0` |
| Frontend/API URL | `http://localhost:5173`; `http://localhost:3000` |
| Build/commit SUT | Không xác định |
| Thời điểm | `09/08/2026 15:32` |

## Tiền điều kiện

- Browser context mới, chưa đăng nhập và không có authentication state.

## Steps to reproduce

1. Mở browser context chưa đăng nhập.
2. Điều hướng trực tiếp tới `http://localhost:5173/checkout`.
3. Quan sát URL và nội dung trang.

## Expected result

Frontend chuyển người dùng tới `/login`; Checkout UI không được render cho anonymous user.

## Actual result

URL vẫn ở `/checkout`. Trang hiển thị heading `Xác Nhận Đơn Hàng`, input tổng, coupon control và nút `Xác Nhận Thanh Toán`.

## Severity / Priority

- Severity: `Major`.
- Priority: `P2`.
- Lý do: vi phạm access-flow đã mô tả và làm lộ chức năng checkout cho anonymous user; bug này chưa tự kết luận backend cho phép tạo order không token.

## GitHub Issue

- Trạng thái: `Đã tạo — Open`
- URL/Issue ID: `#231` — https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/231
- Screenshot Issue: [Mở ảnh](<../screenshots_issues/FR-08/[BUG][Checkout UI] Người chưa đăng nhập vẫn truy cập được trang checkout.png>)

![GitHub Issue #231](<../screenshots_issues/FR-08/[BUG][Checkout UI] Người chưa đăng nhập vẫn truy cập được trang checkout.png>)
