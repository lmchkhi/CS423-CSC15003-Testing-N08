---
title: "[BUG][FR-05 Search] Không hiển thị empty state khi tìm kiếm không có kết quả"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR05-001`

## Found by Test Case

`TC-FR05-DT-003`, `TC-FR05-DT-004`

## Requirement liên quan

`FR-05`

## Root cause chung

Vùng kết quả tìm kiếm không render thông báo empty state khi tập kết quả bằng 0, xảy ra với cả keyword thông thường không tồn tại và keyword có ký tự đặc biệt. Đây là root cause quan sát từ UI; không suy đoán implementation nội bộ.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: UI product count thực tế bằng 0 và search summary hiển thị đúng, nhưng accessibility snapshot không có bất kỳ empty-state text nào trong các pattern đã duyệt.
- Đã loại trừ environment issue: cùng hành vi tái hiện trên Chromium, Firefox và Microsoft Edge trong consolidated run; frontend/API vẫn phản hồi.
- Số lần tái hiện: `6/6` case–project runs (`2` TC-ID × `3` browser projects).

## Environment

| Mục | Giá trị |
| --- | --- |
| Browser / project | Chromium `151.0.7922.34`; Firefox `153.0`; Microsoft Edge `151.0.4129.72` |
| OS | Microsoft Windows NT `10.0.26200.0` |
| Frontend/Admin/API URL | Frontend `http://localhost:5173`; API `http://localhost:3000` |
| Build/commit SUT | Không xác định qua UI/API công khai |
| Thời điểm | `09/08/2026 15:28` |

## Tiền điều kiện

- EShop đang hoạt động và không có sản phẩm công khai khớp keyword thử nghiệm.
- Môi trường localhost đã được người dùng xác nhận là test cô lập, không phải production.

## Steps to reproduce

1. Mở `http://localhost:5173/`.
2. Nhập `xyznoexist123`, submit tìm kiếm và quan sát vùng kết quả.
3. Lặp lại với `Áo @#$%`.

## Expected result

Không có product card và UI hiển thị empty state phù hợp; không crash hoặc hiển thị raw system error.

## Actual result

UI hiển thị search summary và không có product card, nhưng vùng main hoàn toàn không có empty-state message.

## Severity / Priority

- Severity: `Minor`
- Priority: `P2`
- Lý do: Người dùng không phân biệt được trạng thái “không có kết quả” với lỗi/đang tải, nhưng không làm mất dữ liệu hoặc chặn các search có kết quả.

## Evidence

| Loại | Đường dẫn / tham chiếu | Xác nhận nguồn thật |
| --- | --- | --- |
| Screenshot | `test-results/fr05-phase-d/fr05-search-FR-05-—-Xem-da-6ec9c-ếm-từ-khóa-không-có-kết-quả-chromium/TC-FR05-DT-003-no-results-state-ui.png`; `test-results/fr05-phase-d/fr05-search-FR-05-—-Xem-da-d32e5-m-từ-khóa-có-ký-tự-đặc-biệt-chromium/TC-FR05-DT-004-special-characters-result-ui.png` | Consolidated Phase D run, Chromium |
| Trace / video | Cùng hai result directory, `trace.zip` và `video.webm` | Chromium; report timestamp ở trên |
| Network / console log | DT-004 request/status được lưu trong Playwright annotation; UI vẫn là oracle chính | Không chứa credential |
| HTML report | `playwrite-test/fr05-search/playwright-report/index.html` | DT-003/004 trên Chromium, Firefox, msedge |

## GitHub Issue

- Trạng thái: `Chưa tạo — đề xuất`
- URL/Issue ID: `N/A`
- Ảnh đính kèm: `N/A — dùng artifact local ở trên`
