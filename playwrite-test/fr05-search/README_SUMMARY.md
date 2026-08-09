# HW04 Automation Test Summary — FR-05 Search

## Thông tin chung

| Mục                    | Giá trị                                                        |
| ---------------------- | -------------------------------------------------------------- |
| SUT                    | `EShop`                                                        |
| Run by                 | `23127464`                                                     |
| Thời điểm report       | `09/08/2026 15:28`                                     |
| Report artifact        | `playwrite-test/fr05-search/playwright-report/index.html`             |
| Metadata đã kiểm chứng | Có — đã mở report bằng Chromium headless và xác nhận trực tiếp |

## Test summary theo tính năng

| Feature  | Designed | Automated | Executed | Passed | Failed | Skipped | Browser runs |   SUT defects |
| -------- | -------: | --------: | -------: | -----: | -----: | ------: | -----------: | ------------: |
| `FR-05`  |       12 |        12 |       36 |     12 |     24 |       0 |            3 | 6 root causes |
| **Tổng** |   **12** |    **12** |   **36** | **12** | **24** |   **0** |        **3** |         **6** |

`Executed/Passed/Failed/Skipped` là lượt case–project từ consolidated Playwright report. `SUT defects` đếm root cause, không đếm 24 failure instances.

## Kết quả theo trình duyệt

| Feature | Chromium   | Firefox    | Edge       | Tổng lượt feature–browser | Artifact                                           |
| ------- | ---------- | ---------- | ---------- | ------------------------: | -------------------------------------------------- |
| `FR-05` | `4P/8F/0S` | `4P/8F/0S` | `4P/8F/0S` |                         3 | `playwrite-test/fr05-search/playwright-report/index.html` |

Chú thích: `P = passed`, `F = failed`, `S = skipped`. FR-05 dùng UI làm oracle chính cho cả 12 case, nên ba projects thực sự kiểm tra DOM/rendering và browser behavior; network chỉ bổ trợ ở 6 case đã duyệt.

## Ca chưa tự động hóa

| Feature | Test case | Lý do                             | Tác động                                         | Kế hoạch xử lý |
| ------- | --------- | --------------------------------- | ------------------------------------------------ | -------------- |
| `FR-05` | Không có  | Đủ 12/12 HW02 case đã tự động hóa | Không thiếu coverage trong phạm vi HW02 đã duyệt | N/A            |

Phase A xác định `0 Trùng lặp`; do đó không có case nào bị gộp khỏi suite. DT-009 tham gia hai bug report vì một test quan sát hai root cause độc lập, không phải duplicate case.

## Tự đánh giá kỹ thuật

| Tiêu chí                 | Mục tiêu                                                | Kết quả thật                                                                                                | Bằng chứng                             | Đạt?         |
| ------------------------ | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------ |
| Số lượng test            | Tối thiểu 12 case cho mỗi tính năng                     | 12 case/12 TC-ID canonical                                                                                  | `TEST_CASES.md`, fixture, report       | Có           |
| Data-driven              | Input/expected nằm ngoài spec ở JSON/CSV                | 12 record trong `data/fr05-search.json`; spec có interface và runtime validation                            | Fixture + spec                         | Có           |
| Assertion                | Ít nhất 3 nhóm assertion thực sự chạy                   | DOM/visible text; state/attribute; count/aggregate; network diagnostic/synchronization; layout/computed DOM | Spec, report, error contexts           | Có           |
| Đa trình duyệt và report | Chromium/Firefox/Edge; Run by + timestamp đã kiểm chứng | 3/3 projects, 36 executions; metadata đã mở kiểm chứng                                                      | `evidence/phase-d-run.md`, HTML report | Có cho FR-05 |

FR-05 đóng góp ba lượt feature–browser. Khi cộng với artifact FR-08 và FR-12 hiện có, summary toàn bài đạt 3 feature / 9 feature–browser runs.

## Review và khoảng trống

- Review notes: `playwrite-test/fr05-search/REVIEW_NOTES.md`.
- Bug reports có bằng chứng: `bug-reports/FR-05/BUG-FR05-001-missing-empty-state.md` đến `BUG-FR05-006-multiple-h1.md`.
- Gap analysis: `ai-gap-analysis/FR-05-search-multibrowser-gap.md`.
- Audit AI liên tục: `reports/ai-audit-report.md`.
- GitHub Issues: đã tạo `#220`–`#225`; sáu screenshot Issue đã được chèn vào sáu bug report.
- Checkpoint E: đã được người dùng duyệt bằng prompt `approved` lúc `08/08/2026 23:30`; FR-05 hoàn tất workflow A→E.
