# HW04 Automation Test Summary

## Thông tin chung

| Mục | Giá trị |
| --- | --- |
| SUT | `EShop` |
| Run by | `23127464` |
| Thời điểm report | `<timestamp ISO 8601 runtime thật>` |
| Report artifact | `<đường dẫn đã mở kiểm chứng>` |
| Metadata đã kiểm chứng | `<Có / Không>` |

## Test summary theo tính năng

| Feature | Designed | Automated | Executed | Passed | Failed | Skipped | Browser runs | SUT defects |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `<FR-ID>` | `<n>` | `<n>` | `<n>` | `<n>` | `<n>` | `<n>` | `<n>` | `<n>` |
| **Tổng** | `<n>` | `<n>` | `<n>` | `<n>` | `<n>` | `<n>` | `<n>` | `<n>` |

Chỉ cộng số từ runner/report thật. Không coi test defect hoặc environment issue là SUT defect.

## Kết quả theo trình duyệt

| Feature | Chromium | Firefox | Edge | Tổng lượt feature–browser | Artifact |
| --- | --- | --- | --- | ---: | --- |
| `<FR-ID>` | `<P/F/S/NR>` | `<P/F/S/NR>` | `<P/F/S/NR>` | `<n>` | `<đường dẫn>` |

Chú thích: `P = passed`, `F = có failed`, `S = skipped`, `NR = not run`.

## Ca chưa tự động hóa

| Feature | Test case | Lý do | Tác động | Kế hoạch xử lý |
| --- | --- | --- | --- | --- |
| `<FR-ID>` | `<TC-ID>` | `<lý do>` | `<coverage bị thiếu>` | `<hướng xử lý>` |

## Tự đánh giá kỹ thuật

| Tiêu chí | Mục tiêu | Kết quả thật | Bằng chứng | Đạt? |
| --- | --- | --- | --- | --- |
| Số lượng test | Tối thiểu 12 case cho mỗi tính năng | `<số theo từng feature>` | `<test-cases/review>` | `<Có / Không>` |
| Data-driven | Input/expected nằm ngoài spec ở JSON/CSV | `<kết quả kiểm tra>` | `<fixture + spec>` | `<Có / Không>` |
| Assertion | Ít nhất 3 nhóm assertion thực sự chạy | `<các nhóm>` | `<report/test>` | `<Có / Không>` |
| Đa trình duyệt và report | Chromium/Firefox/Edge; tối thiểu 9 lượt cho 3 feature; có Run by + timestamp đã kiểm chứng | `<số lượt + metadata>` | `<artifact đã mở>` | `<Có / Không>` |

## Review và khoảng trống

- Review notes: `<đường dẫn>`
- Bug reports có bằng chứng: `<đường dẫn/danh sách>`
- Gap analysis: `<tóm tắt và đường dẫn>`
- Audit AI liên tục: `<đường dẫn>`

## Phần sinh viên tự thực hiện

- Video demo: `<Sinh viên tự thực hiện — trạng thái>`
- AI Critique cá nhân: `<Sinh viên tự viết — trạng thái>`

Không dùng nội dung do agent viết thay cho hai phần cá nhân bắt buộc này.
