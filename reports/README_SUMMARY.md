# HW04 Automation Test Summary — Artifact hiện có

## Thông tin chung

| Mục | Giá trị |
| --- | --- |
| SUT | `EShop` |
| Run by | `23127464` |
| Phạm vi kiểm kê | Artifact automation hiện có cho FR-05, FR-08 và FR-12 |
| Thời điểm kiểm kê | `2026-08-08T23:19:36.0056526+07:00` |
| Metadata đã kiểm chứng | Có trên ba HTML report theo evidence Phase D tương ứng |

## Tổng hợp kết quả thật

| Feature | Designed | Automated | Executed | Passed | Failed | Skipped | Browser runs | SUT defect root causes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `FR-05` | 12 | 12 | 36 | 12 | 24 | 0 | 3 | 6 |
| `FR-08` | 18 | 15 | 45 | 12 | 33 | 0 | 3 | 5 |
| `FR-12` | 40 | 40 | 120 | 69 | 51 | 0 | 3 | 4 |
| **Tổng artifact hiện có** | **70** | **67** | **201** | **93** | **108** | **0** | **9** | **15** |

Số liệu trên chỉ cộng từ các HTML report/evidence đã có. FR-08 có ba case HW02 trùng được gộp nên 18 designed tương ứng 15 automated; không xem ba case này là bị bỏ sót. FR-05 và FR-12 tự động hóa đầy đủ toàn bộ case đã duyệt.

## Ma trận đầy đủ Phase E

| Artifact | FR-05 | FR-08 | FR-12 | Trạng thái sau kiểm tra |
| --- | --- | --- | --- | --- |
| Fixture + Playwright spec | Có | Có | Có | Đủ cho ba feature |
| Test cases cuối | Có | Có | Có | Đủ |
| Review notes theo template | Có | Có | Có | Đủ |
| Failure classification | 8 case / 6 SUT root causes | 11 case / 5 SUT root causes | 17 case / 4 SUT root causes | Đủ; test/environment issue được tách riêng |
| Bug report theo root cause | 6 | 5 | 4 | Đủ; chưa tạo GitHub Issue |
| Case chưa tự động hóa/gộp | 0 case | Có danh sách | 0 case | Đủ |
| Feature summary | Có | Có | Có | Đủ |
| Gap analysis | Có | Có | Có | Đủ trong `ai-gap-analysis/` hoặc feature report |
| HTML multi-project report | Có | Có | Có | Metadata cả ba đã kiểm chứng |
| Audit | Có | Có | Có | Tiếp tục ghi nối |

## Kết quả theo project

| Feature | Chromium | Firefox | Edge | Artifact |
| --- | --- | --- | --- | --- |
| `FR-05` | `4P/8F/0S` | `4P/8F/0S` | `4P/8F/0S` | `reports/fr05-search/playwright-report/index.html` |
| `FR-08` | `4P/11F/0S` | `4P/11F/0S` | `4P/11F/0S` | `reports/FR-08-checkout/playwright-report/index.html` |
| `FR-12` | `23P/17F/0S` | `23P/17F/0S` | `23P/17F/0S` | `reports/fr12-access/playwright-report/index.html` |

FR-08 và FR-12 là API-only; ba project của hai suite đó chứng minh runner/project/report coverage nhưng không chứng minh khác biệt DOM/rendering. FR-05 dùng UI làm oracle chính cho cả 12 case, nên matrix FR-05 có cross-browser DOM/rendering coverage thực tế.

## Khoảng trống còn lại

- Artifact hiện có cho ba feature `FR-05`, `FR-08`, `FR-12`, tương ứng đúng chín lượt feature–browser; tiêu chí `3 feature / 9 runs` đã có bằng chứng thật.
- `FR-09` vẫn chưa có fixture/spec/HTML report automation, nhưng không còn chặn tiêu chí tối thiểu ba feature.
- Chưa có public GitHub URL được kiểm chứng trong artifact.
- Video demo và AI Critique cá nhân vẫn do sinh viên tự thực hiện.

## Tài liệu chi tiết

- FR-05: `reports/fr05-search/README_SUMMARY.md`, `REVIEW_NOTES.md`, `ai-gap-analysis/FR-05-search-multibrowser-gap.md`.
- FR-08: `reports/FR-08-checkout/README_SUMMARY.md`, `REVIEW_NOTES.md`, `ai-gap-analysis/FR-08-api-only-multibrowser-gap.md`.
- FR-12: `reports/fr12-access/README_SUMMARY.md`, `REVIEW_NOTES.md`, `GAP_ANALYSIS.md`, `ai-gap-analysis/FR-12-access-gap-analysis.md`.
- Audit: `reports/ai-audit-report.md`.
