# HW04 Automation Test Summary — Artifact hiện có

## Thông tin chung

| Mục | Giá trị |
| --- | --- |
| SUT | `EShop` |
| Run by | `23127464` |
| Phạm vi kiểm kê | Artifact automation hiện có cho FR-05, FR-08 và FR-12 |
| Thời điểm kiểm kê | `09/08/2026 15:41` |
| Metadata đã kiểm chứng | Có trên ba HTML report theo evidence Phase D tương ứng |

## Tổng hợp kết quả thật

| Feature | Designed | Automated | Executed | Passed | Failed | Skipped | Browser runs | SUT defect root causes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `FR-05` | 12 | 12 | 36 | 12 | 24 | 0 | 3 | 6 |
| `FR-08` | 21 | 18 | 54 | 12 | 42 | 0 | 3 | 8 |
| `FR-12` | 40 | 40 | 120 | 69 | 51 | 0 | 3 | 4 |
| **Tổng artifact hiện có** | **73** | **70** | **210** | **93** | **117** | **0** | **9** | **18** |

Số liệu trên chỉ cộng từ các HTML report/evidence đã có. FR-08 có 18 case HW02 vật lý, trong đó ba case trùng được gộp thành 15 điểm API độc lập, cộng thêm 3 case UI bổ sung từ README. Ba root cause UI mới đã có bug report; UI cart-not-cleared được gộp vào root cause/report hiện có. Cả 18 bug report hiện hành đã được tạo thành GitHub Issue: FR-05 `#220`–`#225`, FR-08 `#226`–`#233`, FR-12 `#234`–`#236` và `#238`; screenshot Issue đã được lưu trong `bug-reports/screenshots_issues/` và chèn vào từng report.

## Ma trận đầy đủ Phase E

| Artifact | FR-05 | FR-08 | FR-12 | Trạng thái sau kiểm tra |
| --- | --- | --- | --- | --- |
| Fixture + Playwright spec | Có | Có | Có | Đủ cho ba feature |
| Test cases cuối | Có | Có | Có | Đủ |
| Review notes theo template | Có | Có | Có | Đủ |
| Failure classification | 8 case / 6 SUT root causes | 14 case / 8 SUT root causes | 17 case / 4 SUT root causes | Đủ; test/environment issue được tách riêng |
| Bug report theo root cause | 6 | 8 | 4 | Đủ; đã ánh xạ 18 GitHub Issues và 18 screenshot Issue |
| Case chưa tự động hóa/gộp | 0 case | Có danh sách | 0 case | Đủ |
| Feature summary | Có | Có | Có | Đủ |
| Gap analysis | Có | Có | Có | Đủ trong `ai-gap-analysis/` hoặc feature report |
| HTML multi-project report | Có | Có | Có | Metadata cả ba đã kiểm chứng |
| Audit | Có | Có | Có | Tiếp tục ghi nối |

## Kết quả theo project

| Feature | Chromium | Firefox | Edge | Artifact |
| --- | --- | --- | --- | --- |
| `FR-05` | `4P/8F/0S` | `4P/8F/0S` | `4P/8F/0S` | `playwrite-test/fr05-search/playwright-report/index.html` |
| `FR-08` | `4P/14F/0S` | `4P/14F/0S` | `4P/14F/0S` | `playwrite-test/FR-08-checkout/playwright-report/index.html` |
| `FR-12` | `23P/17F/0S` | `23P/17F/0S` | `23P/17F/0S` | `playwrite-test/fr12-access/playwright-report/index.html` |

FR-08 hiện gồm 15 case API và 3 case UI thật; 9 lượt UI dùng browser page/DOM trên ba project, còn DT-012 vẫn API-only. FR-12 dùng hybrid Web Admin UI + API: cả 40 case đều mở page thật để kiểm tra cổng truy cập, sau đó kiểm chứng sâu enforcement backend. FR-05 dùng UI làm oracle chính cho cả 12 case.

## Khoảng trống còn lại

- Artifact hiện có cho ba feature `FR-05`, `FR-08`, `FR-12`, tương ứng đúng chín lượt feature–browser; tiêu chí `3 feature / 9 runs` đã có bằng chứng thật.
- `FR-09` vẫn chưa có fixture/spec/HTML report automation, nhưng không còn chặn tiêu chí tối thiểu ba feature.
- Public GitHub Issues và screenshot Issue đã có đủ cho 18 bug report.
- Video demo và AI Critique cá nhân vẫn do sinh viên tự thực hiện.

## Tài liệu chi tiết

- FR-05: `playwrite-test/fr05-search/README_SUMMARY.md`, `REVIEW_NOTES.md`, `ai-gap-analysis/FR-05-search-multibrowser-gap.md`.
- FR-08: `playwrite-test/FR-08-checkout/README_SUMMARY.md`, `REVIEW_NOTES.md`, `ai-gap-analysis/FR-08-checkout-coverage-gap-analysis.md`.
- FR-12: `playwrite-test/fr12-access/README_SUMMARY.md`, `REVIEW_NOTES.md`, `GAP_ANALYSIS.md`, `ai-gap-analysis/FR-12-access-gap-analysis.md`.
- Audit: `reports/ai-audit-report.md`.
