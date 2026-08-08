---
title: "[BUG][FR-05 Loading] Không có loading indicator khi request sản phẩm pending"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR05-005`

## Found by Test Case

`TC-FR05-DT-010`

## Requirement liên quan

`FR-05`

## Root cause chung

UI không render trạng thái loading có thể quan sát/accessibility khi request sản phẩm đang pending.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: route được đăng ký trước navigation, request thực sự bị intercept và giữ pending; trong pending product count bằng 0, response được release trong `finally`, sau đó 5 sản phẩm xuất hiện.
- Đã loại trừ environment issue: cùng transition pending → response tái hiện trên cả ba browser; chỉ loading indicator thiếu.
- Số lần tái hiện: `3/3` browser projects.

## Environment

| Mục | Giá trị |
| --- | --- |
| Browser / project | Chromium `151.0.7922.34`; Firefox `153.0`; Microsoft Edge `151.0.4129.72` |
| OS | Microsoft Windows NT `10.0.26200.0` |
| Frontend/Admin/API URL | Frontend `http://localhost:5173`; API `http://localhost:3000` |
| Build/commit SUT | Không xác định qua UI/API công khai |
| Thời điểm | `2026-08-08T16:07:38.995Z` |

## Tiền điều kiện

- Harness có thể intercept `GET **/api/products**` trước navigation.
- Route luôn được release sau khi chụp pending state.

## Steps to reproduce

1. Đăng ký route cho request sản phẩm và giữ response pending.
2. Mở trang chủ; xác nhận request đã bị intercept và product count đang bằng 0.
3. Quan sát UI trong pending state, sau đó release response và quan sát danh sách sản phẩm.

## Expected result

Loading indicator hiển thị trong lúc pending; sau response danh sách xuất hiện và indicator biến mất.

## Actual result

Trong pending state không có role `status`, text `Loading/Đang tải`, `aria-busy`, spinner hoặc skeleton. Sau khi release, danh sách 5 sản phẩm xuất hiện bình thường.

## Severity / Priority

- Severity: `Minor`
- Priority: `P2`
- Lý do: Người dùng không nhận được phản hồi trạng thái trong lúc chờ; luồng cuối vẫn hoàn tất sau response.

## Evidence

| Loại | Đường dẫn / tham chiếu | Xác nhận nguồn thật |
| --- | --- | --- |
| Screenshot | `test-results/fr05-phase-d/fr05-search-FR-05-—-Xem-da-297f4-oading-khi-đang-tải-dữ-liệu-chromium/TC-FR05-DT-010-loading-pending-ui.png`; cùng directory `TC-FR05-DT-010-products-after-response-ui.png` | Pending và post-response từ consolidated run |
| Trace / video | Cùng result directory, `trace.zip` và `video.webm` | Chromium; cùng failure trên Firefox/msedge |
| Network / console log | Route/waitForResponse evidence trong trace và test annotation | Network chỉ dùng synchronization |
| HTML report | `reports/fr05-search/playwright-report/index.html` | DT-010 trên ba projects |

## GitHub Issue

- Trạng thái: `Chưa tạo — đề xuất`
- URL/Issue ID: `N/A`
- Ảnh đính kèm: `N/A — dùng artifact local ở trên`
