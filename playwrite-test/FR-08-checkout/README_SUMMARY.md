# HW04 Automation Test Summary — FR-08 Checkout

## Thông tin chung

| Mục                    | Giá trị                                               |
| ---------------------- | ----------------------------------------------------- |
| SUT                    | `EShop`                                               |
| Run by                 | `23127464`                                            |
| Thời điểm report       | `09/08/2026 15:32`                            |
| Report artifact        | `playwrite-test/FR-08-checkout/playwright-report/index.html` |
| Metadata đã kiểm chứng | Có — Phase D đã mở report và xác nhận trực tiếp       |

## Test summary theo tính năng

| Feature  | Designed | Automated | Executed | Passed | Failed | Skipped | Browser runs |   SUT defects |
| -------- | -------: | --------: | -------: | -----: | -----: | ------: | -----------: | ------------: |
| `FR-08`  |       21 |        18 |       54 |     12 |     42 |       0 |            3 | 8 reported root causes |
| **Tổng** |   **21** |    **18** |   **54** | **12** | **42** |   **0** |        **3** | **8 reported root causes** |

`Designed` gồm 18 file HW02 vật lý và 3 case UI bổ sung từ README FR-08. Ba case HW02 trùng được gộp vào case đại diện nên suite có 15 điểm API độc lập + 3 điểm UI độc lập. `Executed/Passed/Failed/Skipped` là lượt case–project từ Playwright report. Có 8 bug report theo root cause: 5 report Phase E, 3 report UI bổ sung; cart-not-cleared UI được gộp vào bug hiện có thay vì tạo trùng.

## Kết quả theo trình duyệt/project

| Feature | Chromium    | Firefox     | Edge        | Tổng lượt feature–browser | Artifact                                              |
| ------- | ----------- | ----------- | ----------- | ------------------------: | ----------------------------------------------------- |
| `FR-08` | `4P/14F/0S` | `4P/14F/0S` | `4P/14F/0S` |                         3 | `playwrite-test/FR-08-checkout/playwright-report/index.html` |

Chú thích: `P = passed`, `F = failed`, `S = skipped`.

Suite HW02 cốt lõi vẫn dùng Playwright `request` context. Suite bổ sung `tests/FR-08-checkout-ui.spec.ts` tạo browser page thật và kiểm tra URL, DOM, thuộc tính input, UI-triggered network response cùng hậu điều kiện giỏ trên cả ba project. Vì vậy report hiện có 9 lượt UI cross-browser thật; riêng `DT-012` vẫn API-only và không chứng minh chống XSS UI.

## Case không tự động hóa riêng

| Feature | Test case               | Lý do                                                                          | Tác động                                    | Kế hoạch xử lý                                                       |
| ------- | ----------------------- | ------------------------------------------------------------------------------ | ------------------------------------------- | -------------------------------------------------------------------- |
| `FR-08` | `BVA-002`               | Trùng `DT-005` với `total_amount=0`                                            | Không mất điểm kiểm tra độc lập             | Truy vết qua case đại diện `DT-005`                                  |
| `FR-08` | `BVA-003`               | Trùng `DT-004` với `total_amount=1`                                            | Không mất điểm kiểm tra độc lập             | Truy vết qua case đại diện `DT-004`                                  |
| `FR-08` | `DT-015`                | Assertion xóa giỏ đã nằm trong hậu điều kiện của `DT-001`                      | Không mất assertion                         | Truy vết qua case đại diện `DT-001`                                  |
| `FR-08` | `DT-012` phần render UI | Phạm vi đã duyệt chỉ tự động hóa checkout API; UI không có trường nhập địa chỉ | Không có bằng chứng chống XSS khi render UI | Không tuyên bố Pass UI; chỉ mở rộng khi có test design UI được duyệt |

## Tự đánh giá kỹ thuật

| Tiêu chí                 | Mục tiêu                                     | Kết quả thật                                                             | Bằng chứng                             | Đạt?                                                    |
| ------------------------ | -------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------- | ------------------------------------------------------- |
| Số lượng test            | Tối thiểu 12 case cho mỗi tính năng          | 18 case độc lập: 15 API + 3 UI                                            | `TEST_CASES.md`, fixture, report       | Có |
| Data-driven              | Input/expected nằm ngoài spec ở JSON/CSV     | 15 record API + 3 record UI trong hai fixture JSON                         | Fixture + spec                         | Có |
| Assertion                | Ít nhất 3 nhóm assertion thực sự chạy        | API response/count/state và UI URL/DOM/attribute/network/postcondition     | Spec, evidence Phase C và UI refinement | Có |
| Đa trình duyệt và report | Chromium/Firefox/Edge; có Run by + timestamp | 3/3 project; 9 lượt UI thật; metadata/report đã mở kiểm chứng               | `evidence/ui-refinement-run.md`, HTML report | Có; DT-012 vẫn API-only |

FR-08 đóng góp ba lượt feature–browser. Tiêu chí toàn bài tối thiểu chín lượt cho ba feature phải được tổng hợp thêm từ các feature automation khác; không thể suy ra chỉ từ FR-08.

## Review và khoảng trống

- Review notes: `playwrite-test/FR-08-checkout/REVIEW_NOTES.md`.
- Bug reports có bằng chứng: `bug-reports/FR-08/BUG-FR08-001-client-total-trusted.md` đến `BUG-FR08-008-checkout-total-zero-editable.md`.
- Gap analysis: `ai-gap-analysis/FR-08-checkout-coverage-gap-analysis.md`.
- Audit AI liên tục: `reports/ai-audit-report.md`.
- GitHub Issues: chưa tạo; các bug report chỉ ở trạng thái đề xuất.
