# HW04 Automation Test Summary — Artifact hiện có

## Thông tin chung

| Mục | Giá trị |
| --- | --- |
| SUT | `EShop` |
| Run by | `23127464` |
| Phạm vi kiểm kê | Artifact automation hiện có cho FR-08 và FR-12 |
| Thời điểm kiểm kê | `07/08/2026 16:25` |
| Metadata đã kiểm chứng | Có trên hai HTML report theo evidence Phase D tương ứng |

## Tổng hợp kết quả thật

| Feature | Designed | Automated | Executed | Passed | Failed | Skipped | Browser runs | SUT defect root causes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `FR-08` | 18 | 15 | 45 | 12 | 33 | 0 | 3 | 5 |
| `FR-12` | 40 | 40 | 120 | 69 | 51 | 0 | 3 | 4 |
| **Tổng artifact hiện có** | **58** | **55** | **165** | **81** | **84** | **0** | **6** | **9** |

Số liệu trên chỉ cộng từ các HTML report/evidence đã có. FR-08 có ba case HW02 trùng được gộp nên 18 designed tương ứng 15 automated; không xem ba case này là bị bỏ sót.

## Ma trận đầy đủ Phase E

| Artifact | FR-08 | FR-12 | Trạng thái sau kiểm tra |
| --- | --- | --- | --- |
| Fixture + Playwright spec | Có | Có | Đủ cho hai feature |
| Test cases cuối | Có | Có | Đủ |
| Review notes theo template | Có | Có | Đủ |
| Failure classification | 11 case / 5 SUT root causes | 17 case / 4 SUT root causes | Đủ; test/environment issue được tách riêng |
| Bug report theo root cause | 5 | 4 | Đủ; chưa tạo GitHub Issue |
| Case chưa tự động hóa/gộp | Có danh sách | 0 case | Đủ |
| Feature summary | Đã bổ sung lại trong lượt review này | Có | Đủ |
| Gap analysis | Có trong `ai-gap-analysis/` | Có bản evidence và bản AI gap đã đồng bộ | Đủ |
| HTML multi-project report | Có | Có | Đủ; metadata đã được kiểm chứng ở Phase D |
| Audit | Có | Có | Tiếp tục ghi nối |

## Kết quả theo project

| Feature | Chromium | Firefox | Edge | Artifact |
| --- | --- | --- | --- | --- |
| `FR-08` | `4P/11F/0S` | `4P/11F/0S` | `4P/11F/0S` | `reports/FR-08-checkout/playwright-report/index.html` |
| `FR-12` | `23P/17F/0S` | `23P/17F/0S` | `23P/17F/0S` | `reports/fr12-access/playwright-report/index.html` |

Cả hai suite hiện là API-only. Việc chạy trên ba project chứng minh runner/project/report coverage; không chứng minh khác biệt DOM/rendering giữa các browser.

## Khoảng trống không thể bổ sung chỉ bằng tài liệu

- Repository hiện chỉ có fixture/spec/HTML report automation cho hai feature `FR-08` và `FR-12`, tương ứng sáu lượt feature–browser.
- `FR-05` và `FR-09` có test case/gap analysis thủ công nhưng không có fixture, Playwright spec hoặc HTML report automation trong artifact hiện tại.
- Vì vậy chưa đủ bằng chứng để kết luận tiêu chí toàn bài `3 feature / 9 feature–browser runs`. Cần hoàn thành automation A→E cho ít nhất một feature thứ ba; không được điền số ước lượng vào summary.
- Chưa có public GitHub URL được kiểm chứng trong artifact.
- Video demo và AI Critique cá nhân vẫn do sinh viên tự thực hiện.

## Tài liệu chi tiết

- FR-08: `reports/FR-08-checkout/README_SUMMARY.md`, `REVIEW_NOTES.md`, `ai-gap-analysis/FR-08-api-only-multibrowser-gap.md`.
- FR-12: `reports/fr12-access/README_SUMMARY.md`, `REVIEW_NOTES.md`, `GAP_ANALYSIS.md`, `ai-gap-analysis/FR-12-access-gap-analysis.md`.
- Audit: `reports/ai-audit-report.md`.
