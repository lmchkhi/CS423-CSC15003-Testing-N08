---
title: "[BUG][Checkout UI] Danh sách sản phẩm trong giỏ không hiển thị tại checkout"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR08-007`

## Found by Test Case

`FR08-UI-README-002` — phần assertion hiển thị sản phẩm, chạy trên Chromium, Firefox và Microsoft Edge.

## Requirement liên quan

`FR-08` — UI hiển thị đầy đủ danh sách sản phẩm đã đặt.

## Root cause chung

Checkout summary không render item đã có trong backend cart của user đã đăng nhập.

## Phân loại xác minh

- Phân loại: `SUT defect`.
- Đã loại trừ test defect: setup API xác nhận cart có đúng một item tên `Tai nghe AirPods Pro 2` trước khi login UI; login UI thành công và header hiển thị user.
- Đã loại trừ environment issue: Checkout heading/list container render bình thường; cùng item thiếu trên `3/3` project.
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

- User tạm role `user` đăng nhập thành công qua UI.
- Backend cart đã được xác minh có AirPods Pro 2, quantity `2`, đơn giá `6,000,000`.

## Steps to reproduce

1. Tạo user tạm và thêm AirPods Pro 2 ×2 vào cart.
2. Xác nhận `GET /api/cart` trả đúng một item.
3. Đăng nhập qua web frontend.
4. Mở `/checkout`.
5. Quan sát phần `Sản phẩm:`.

## Expected result

Checkout UI hiển thị `Tai nghe AirPods Pro 2` và thông tin sản phẩm trong giỏ.

## Actual result

Heading `Sản phẩm:` xuất hiện nhưng list rỗng; không tìm thấy text `Tai nghe AirPods Pro 2`.

## Severity / Priority

- Severity: `Major`.
- Priority: `P1`.
- Lý do: người dùng không thể kiểm tra nội dung đơn hàng trước khi xác nhận thanh toán.

## Evidence

| Loại | Đường dẫn / tham chiếu | Xác nhận nguồn thật |
| --- | --- | --- |
| Screenshot Chromium | `playwrite-test/FR-08-checkout/playwright-report/data/99acd75392e56e291eb58a4f36d5693a4251da6d.png` | User đã login; phần sản phẩm trống |
| Trace Chromium / Firefox / Edge | `playwrite-test/FR-08-checkout/playwright-report/data/51ac5526fa0f8d28e2b71f580b7b5aa08ae2ffb8.zip`; `playwrite-test/FR-08-checkout/playwright-report/data/86743aa05ae82797f7aa7560803284a636b39147.zip`; `playwrite-test/FR-08-checkout/playwright-report/data/4d0903c72e638cf754520ce9ad7e287b91958afc.zip` | DOM snapshot và failed locator trên ba project |
| Video Chromium | `playwrite-test/FR-08-checkout/playwright-report/data/ba3549a5fa7f95c4106b3f49a35f446ff8561dc5.webm` | Login và mở Checkout UI thật |
| Error context / HTML report | `playwrite-test/FR-08-checkout/playwright-report/index.html` | Accessible snapshot ghi `list` rỗng và product locator fail trên 3/3 project |

Các đường dẫn `data/...` trong dòng trace được tính tương đối từ thư mục `playwright-report/`.

## GitHub Issue

- Trạng thái: `Chưa tạo — đề xuất`.
- URL/Issue ID: `N/A`.
- Ảnh đính kèm đề xuất: screenshot Chromium nêu trên.
