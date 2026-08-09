---
title: "[BUG][<Module>] <Tên lỗi>"
labels: '["Type: Bug", "Status: New"]'
assignees: "<Người phụ trách hoặc để trống>"
---

# Bug Report — `<BUG-ID>`

## Found by Test Case

`<TC-ID>` — hoặc danh sách nhiều TC-ID nếu bug report này gộp nhiều case cùng chứng minh một root cause: `<TC-ID-1>, <TC-ID-2>, ...`

## Requirement liên quan

`<FR-ID>`

## Root cause chung

`<Mô tả ngắn gọn nguyên nhân gốc mà mọi TC-ID ở trên cùng chứng minh; nếu bug này không gộp nhiều case, ghi nguyên nhân của case đó>`

## Phân loại xác minh

- Phân loại: `SUT defect`
- Đã loại trừ test defect: `<cách xác minh>`
- Đã loại trừ environment issue: `<cách xác minh>`
- Số lần tái hiện: `<n>/<n>`

## Environment

| Mục | Giá trị |
| --- | --- |
| Browser / project | `<Chromium / Firefox / Edge + version>` |
| OS | `<OS + version>` |
| Frontend/Admin/API URL | `<URL>` |
| Build/commit SUT | `<giá trị quan sát được hoặc Không xác định>` |
| Thời điểm | `<dd/MM/yyyy HH:mm — thời gian thật>` |

## Tiền điều kiện

- `<trạng thái hoặc dữ liệu cần có>`
- `<không chứa credential bí mật>`

## Steps to reproduce

1. `<bước thao tác hộp đen>`
2. `<bước tiếp theo>`
3. `<bước gây ra hành vi>`

## Expected result

`<Kết quả từ test case/artifact đã duyệt>`

## Actual result

`<Kết quả quan sát được trong lần chạy thật>`

## Severity / Priority

- Severity: `<Critical / Major / Minor / Trivial / Block>`
- Priority: `<P0 / P1 / P2 / P3>`
- Lý do: `<tác động và phạm vi>`

## Evidence

| Loại | Đường dẫn / tham chiếu | Xác nhận nguồn thật |
| --- | --- | --- |
| Screenshot | `<đường dẫn hoặc N/A>` | `<tạo bởi lần chạy nào>` |
| Trace / video | `<đường dẫn hoặc N/A>` | `<project + timestamp>` |
| Network / console log | `<đường dẫn hoặc N/A>` | `<đã loại bỏ bí mật>` |
| HTML report | `<đường dẫn>` | `<test + project>` |

## GitHub Issue

- Trạng thái: `<Chưa tạo — đề xuất / Đã tạo>`
- URL/Issue ID: `<N/A cho đến khi có kết quả tạo issue thật>`
- Ảnh đính kèm: `<N/A hoặc URL/path thật>`

Không đổi trạng thái sang `Đã tạo` nếu chưa có URL hoặc ID do GitHub trả về.
