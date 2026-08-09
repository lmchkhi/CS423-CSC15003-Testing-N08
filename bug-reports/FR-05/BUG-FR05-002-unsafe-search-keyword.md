---
title: "[BUG][FR-05 Search] Keyword không được xử lý như dữ liệu trơ, gây lỗi DB và mở rộng kết quả"
labels: '["Type: Bug", "Status: New"]'
assignees: ""
---

# Bug Report — `BUG-FR05-002`

## Found by Test Case

`TC-FR05-DT-006`, `TC-FR05-DT-007`

## Requirement liên quan

`FR-05`

## Root cause chung

Search keyword do người dùng cung cấp không được SUT xử lý nhất quán như dữ liệu trơ: payload chứa quote làm lộ lỗi cú pháp database, còn payload điều kiện SQL làm kết quả mở rộng thành toàn bộ danh sách baseline. Kết luận chỉ dựa trên response/UI công khai; không đọc hoặc suy đoán chi tiết source triển khai.

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: XSS listeners được đăng ký trước submit, DOM không có script node do payload tạo; SQLi được so sánh bằng UI count, product names và baseline công khai, network chỉ bổ trợ.
- Đã loại trừ environment issue: cùng HTTP/UI behavior tái hiện trên Chromium, Firefox và Edge; bốn case control DT-001/002/005/008 vẫn pass trên cả ba project.
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

- EShop đang hoạt động; baseline công khai hiện có 5 sản phẩm.
- Localhost đã được xác nhận là môi trường test cô lập, không phải production.

## Steps to reproduce

1. Mở trang chủ và nhập `<script>alert('XSS')</script>`, sau đó submit mà không thực thi payload thủ công.
2. Quan sát HTTP status và nội dung UI; mở lại trang để lấy baseline product names/count.
3. Nhập `' OR '1'='1' --`, submit và so sánh product names/count với baseline.

## Expected result

Payload được hiển thị an toàn như text, không tạo dialog/script, không trả HTTP 500/raw database error; SQL-like payload không được làm kết quả bằng toàn bộ baseline và phải có empty state khi không khớp tên sản phẩm.

## Actual result

- Payload XSS không chạy script nhưng response là HTTP 500 và UI hiển thị `Database Error` cùng `SQLITE_ERROR: near "XSS": syntax error`.
- Payload SQL trả và hiển thị đủ 5 sản phẩm, product names/count giống hoàn toàn baseline, không có empty state.

## Severity / Priority

- Severity: `Critical`
- Priority: `P0`
- Lý do: Có bằng chứng SQL-like input làm thay đổi semantics truy vấn và raw database error bị lộ; đây là lỗi an toàn đầu vào có khả năng ảnh hưởng bảo mật, không chỉ là lỗi trình bày.

## Evidence

| Loại | Đường dẫn / tham chiếu | Xác nhận nguồn thật |
| --- | --- | --- |
| Screenshot | `test-results/fr05-phase-d/fr05-search-FR-05-—-Xem-da-7ae2f--—-Tìm-kiếm-với-XSS-Payload-chromium/TC-FR05-DT-006-after-xss-payload-ui.png`; `test-results/fr05-phase-d/fr05-search-FR-05-—-Xem-da-fe8ac-m-với-SQL-Injection-Payload-chromium/TC-FR05-DT-007-after-sql-injection-payload-ui.png` | Consolidated Phase D run, Chromium |
| Trace / video | Cùng hai result directory, `trace.zip` và `video.webm` | Chromium; tương ứng còn có artifact Firefox/msedge |
| Network / console log | `error-context.md` của DT-006 ghi HTTP assertion actual `500` và raw SQLite text; DT-007 ghi response/UI count `5` bằng baseline | Không chứa credential |
| HTML report | `playwrite-test/fr05-search/playwright-report/index.html` | DT-006/007 trên ba projects |

## GitHub Issue

- Trạng thái: `Chưa tạo — đề xuất`
- URL/Issue ID: `N/A`
- Ảnh đính kèm: `N/A — dùng artifact local ở trên`
