# HW04 Automation Test Summary — FR-08 Checkout

## Thông tin chung

| Mục                    | Giá trị                                               |
| ---------------------- | ----------------------------------------------------- |
| SUT                    | `EShop`                                               |
| Run by                 | `23127464`                                            |
| Thời điểm report       | `2026-08-06T03:55:40.572Z`                            |
| Report artifact        | `reports/FR-08-checkout/playwright-report/index.html` |
| Metadata đã kiểm chứng | Có — Phase D đã mở report và xác nhận trực tiếp       |

## Test summary theo tính năng

| Feature  | Designed | Automated | Executed | Passed | Failed | Skipped | Browser runs |   SUT defects |
| -------- | -------: | --------: | -------: | -----: | -----: | ------: | -----------: | ------------: |
| `FR-08`  |       18 |        15 |       45 |     12 |     33 |       0 |            3 | 5 root causes |
| **Tổng** |   **18** |    **15** |   **45** | **12** | **33** |   **0** |        **3** |         **5** |

`Designed` tính 18 file HW02 vật lý. Ba case trùng được gộp vào case đại diện nên suite có 15 điểm kiểm tra độc lập. `Executed/Passed/Failed/Skipped` là lượt case–project từ Playwright report; `SUT defects` đếm root cause, không đếm 33 failure instances.

## Kết quả theo trình duyệt/project

| Feature | Chromium    | Firefox     | Edge        | Tổng lượt feature–browser | Artifact                                              |
| ------- | ----------- | ----------- | ----------- | ------------------------: | ----------------------------------------------------- |
| `FR-08` | `4P/11F/0S` | `4P/11F/0S` | `4P/11F/0S` |                         3 | `reports/FR-08-checkout/playwright-report/index.html` |

Chú thích: `P = passed`, `F = failed`, `S = skipped`.

FR-08 dùng Playwright `request` context và không tạo browser page. Ba project chứng minh multi-project runner/report coverage cho suite API; không chứng minh cross-browser DOM/rendering của Checkout UI.

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
| Số lượng test            | Tối thiểu 12 case cho mỗi tính năng          | 15 case độc lập                                                          | `TEST_CASES.md`, fixture, report       | Có                                                      |
| Data-driven              | Input/expected nằm ngoài spec ở JSON/CSV     | 15 record trong `data/FR-08-checkout.json`; spec đọc và validate fixture | Fixture + spec                         | Có                                                      |
| Assertion                | Ít nhất 3 nhóm assertion thực sự chạy        | Network/response; Count/aggregate; State/attribute                       | Spec, `evidence/phase-c-run.md`        | Có                                                      |
| Đa trình duyệt và report | Chromium/Firefox/Edge; có Run by + timestamp | 3/3 project; metadata đã mở kiểm chứng                                   | `evidence/phase-d-run.md`, HTML report | Có cho project/report; không phải UI rendering coverage |

FR-08 đóng góp ba lượt feature–browser. Tiêu chí toàn bài tối thiểu chín lượt cho ba feature phải được tổng hợp thêm từ các feature automation khác; không thể suy ra chỉ từ FR-08.

## Review và khoảng trống

- Review notes: `reports/FR-08-checkout/REVIEW_NOTES.md`.
- Bug reports có bằng chứng: `reports/FR-08-checkout/bugs/BUG-FR08-001-client-total-trusted.md` đến `BUG-FR08-005-empty-cart-checkout.md`.
- Gap analysis: `ai-gap-analysis/FR-08-api-only-multibrowser-gap.md`.
- Audit AI liên tục: `reports/ai-audit-report.md`.
- GitHub Issues: chưa tạo; các bug report chỉ ở trạng thái đề xuất.
