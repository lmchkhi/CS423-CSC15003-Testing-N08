---
title: "[BUG][Checkout] Giỏ hàng không được xóa sau checkout thành công"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR08-002`

## Found by Test Case

`TC-FR08-DT-001`, `TC-FR08-DT-015` và `FR08-UI-README-003`. `DT-015` là case trùng được gộp vào assertion hậu điều kiện của `DT-001`; case UI tái hiện cùng root cause sau click thật trên frontend.

## Requirement liên quan

`FR-08`

## Root cause chung

Checkout tạo order thành công nhưng không xóa item khỏi giỏ của user.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: user mới được tạo riêng; cart count được kiểm tra là `1` ngay trước checkout và expected hậu điều kiện là `0`.
- Đã loại trừ environment issue: checkout/order/cart API đều trả response hợp lệ và actual `1` tái hiện trên ba project.
- Số lần tái hiện: API baseline tái hiện ổn định; UI bổ sung tái hiện `3/3` project.

## Environment

| Mục | Giá trị |
| --- | --- |
| Browser / project | Chromium `151.0.7922.34`; Firefox `153.0`; Edge `151.0.4129.59` |
| OS | `Microsoft Windows NT 10.0.26200.0` |
| Frontend/Admin/API URL | Frontend `http://localhost:5173`; API `http://localhost:3000` |
| Build/commit SUT | Không xác định |
| Thời điểm gần nhất | `09/08/2026 15:32` |

## Tiền điều kiện

- User tạm role `user` có đúng một cart item.

## Steps to reproduce

1. Tạo user tạm và thêm AirPods Pro 2 vào giỏ; xác nhận cart count là `1`.
2. Đăng nhập qua web frontend và mở `/checkout`.
3. Click `Xác Nhận Thanh Toán`.
4. Xác nhận UI gửi `POST /api/checkout`, nhận `200` và hiển thị `Thanh toán thành công!`.
5. Gọi lại `GET /api/cart` bằng session của cùng user.

## Expected result

Giỏ rỗng sau checkout; cart count bằng `0`.

## Actual result

Giỏ vẫn còn item; cart count bằng `1`.

## Severity / Priority

- Severity: `Major`
- Priority: `P1`
- Lý do: State giỏ sai sau giao dịch có thể khiến người dùng đặt trùng ở lần checkout tiếp theo.

## Evidence

| Loại | Đường dẫn / tham chiếu | Xác nhận nguồn thật |
| --- | --- | --- |
| Trace UI Chromium / Firefox / Edge | `playwrite-test/FR-08-checkout/playwright-report/data/84951e6bd3e51b74f2a1d74045ab35c852bf0db2.zip`; `playwrite-test/FR-08-checkout/playwright-report/data/dff5ed66b8eba7bdda54aa9d468b404f907242af.zip`; `playwrite-test/FR-08-checkout/playwright-report/data/1a9a2ecb81b4a17a9fcdc6d3fe1cf50d7e2b14b1.zip` | Click, checkout response và postcondition; trace đã redact credential/token runtime |
| Screenshot UI Chromium | `playwrite-test/FR-08-checkout/playwright-report/data/c3d174caadfb9b1f9182d691cfc8e55eab3ab3b5.png` | UI hiển thị thanh toán thành công trước khi postcondition cart fail |
| Video UI Chromium | `playwrite-test/FR-08-checkout/playwright-report/data/bb7d56fc334eb3160adde2f30c5eb367f5ffcec0.webm` | Luồng click Checkout thật |
| Network / result summary | `playwrite-test/FR-08-checkout/evidence/phase-a-api-results.md`, `phase-c-run.md`, `phase-d-run.md` | Pre/post cart count thật |
| HTML report | `playwrite-test/FR-08-checkout/playwright-report/index.html` | `DT-001` và `FR08-UI-README-003` fail trên ba project |

## GitHub Issue

- Trạng thái: `Chưa tạo — đề xuất`
- URL/Issue ID: `N/A`
- Ảnh đính kèm đề xuất: screenshot UI Chromium nêu trên.
