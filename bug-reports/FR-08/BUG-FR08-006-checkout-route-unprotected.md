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

## Evidence

| Loại | Đường dẫn / tham chiếu | Xác nhận nguồn thật |
| --- | --- | --- |
| Screenshot Chromium | `playwrite-test/FR-08-checkout/playwright-report/data/9a0fc5789042e0f9d65b4d413c065ae4a82e22ea.png` | Anonymous header vẫn có `Đăng nhập/Đăng ký`, Checkout UI vẫn render |
| Trace Chromium / Firefox / Edge | `playwrite-test/FR-08-checkout/playwright-report/data/98f704fa66773040421b4c5778519e8679055328.zip`; `playwrite-test/FR-08-checkout/playwright-report/data/d950ad94f9c18d3581d1987f5e4b6b2a4f7468f6.zip`; `playwrite-test/FR-08-checkout/playwright-report/data/523b8378fe62ed14a231dc39d855035788b3ccc2.zip` | Timeline điều hướng và URL assertion trên ba project |
| Video Chromium | `playwrite-test/FR-08-checkout/playwright-report/data/d263e9e98c03c87b8594eacb63d3fab0d2db9958.webm` | Luồng UI thật |
| HTML report | `playwrite-test/FR-08-checkout/playwright-report/index.html` | Case fail trên 3/3 project |

Các đường dẫn `data/...` trong dòng trace được tính tương đối từ thư mục `playwright-report/`.

## GitHub Issue

- Trạng thái: `Chưa tạo — đề xuất`.
- URL/Issue ID: `N/A`.
- Ảnh đính kèm đề xuất: screenshot Chromium nêu trên.
