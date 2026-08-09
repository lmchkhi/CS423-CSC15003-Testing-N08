# HW04 Automation Test Summary — FR-08 Checkout

## Thông tin chung

| Mục                    | Giá trị                                               |
| ---------------------- | ----------------------------------------------------- |
| SUT                    | `EShop`                                               |
| Run by                 | `23127464`                                            |
| Thời điểm report       | `09/08/2026 19:23`                            |
| Report artifact        | `playwrite-test/FR-08-checkout/playwright-report/index.html` |
| Metadata đã kiểm chứng | Có — Phase D đã mở report và xác nhận trực tiếp       |

## Test summary theo tính năng

| Feature  | Designed | Automated | Executed | Passed | Failed | Skipped | Browser runs |   SUT defects |
| -------- | -------: | --------: | -------: | -----: | -----: | ------: | -----------: | ------------: |
| `FR-08`  |       24 |        21 |       63 |     12 |     51 |       0 |            3 | 8 reported root causes |
| **Tổng** |   **24** |    **21** |   **63** | **12** | **51** |   **0** |        **3** | **8 reported root causes** |

`Designed` gồm 18 file HW02 vật lý và 6 case UI bổ sung từ README/human review FR-08. Ba case HW02 trùng được gộp vào case đại diện nên suite có 15 điểm API độc lập + 6 điểm UI độc lập. `Executed/Passed/Failed/Skipped` là lượt case–project từ Playwright report. Ba case UI mới ánh xạ các root cause đã có về cart-not-cleared, default-address và empty-cart nên tổng số bug report vẫn là 8.

## Kết quả theo trình duyệt/project

| Feature | Chromium    | Firefox     | Edge        | Tổng lượt feature–browser | Artifact                                              |
| ------- | ----------- | ----------- | ----------- | ------------------------: | ----------------------------------------------------- |
| `FR-08` | `4P/17F/0S` | `4P/17F/0S` | `4P/17F/0S` |                         3 | `playwrite-test/FR-08-checkout/playwright-report/index.html` |

Chú thích: `P = passed`, `F = failed`, `S = skipped`.

Suite HW02 cốt lõi vẫn dùng Playwright `request` context. Suite bổ sung `tests/FR-08-checkout-ui.spec.ts` tạo browser page thật và kiểm tra URL, DOM, thuộc tính input, UI-triggered network response, địa chỉ order và hậu điều kiện giỏ trên cả ba project. Report hiện có 18 lượt UI cross-browser thật, kèm 18 trace và 18 video từ lần chạy cuối; riêng `DT-012` vẫn API-only và không chứng minh chống XSS UI. Trace đã được che dữ liệu runtime và quét lại trước khi lưu report.

Sau mỗi lần chạy `npm run test:fr08` hoặc `npm run test:fr08:ui`, chạy `npm run redact:fr08:traces` trước khi commit report để che credential/token trong các ZIP trace.

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
| Số lượng test            | Tối thiểu 12 case cho mỗi tính năng          | 21 case độc lập: 15 API + 6 UI                                            | `TEST_CASES.md`, fixture, report       | Có |
| Data-driven              | Input/expected nằm ngoài spec ở JSON/CSV     | 15 record API + 6 record UI trong hai fixture JSON                         | Fixture + spec                         | Có |
| Assertion                | Ít nhất 3 nhóm assertion thực sự chạy        | API response/count/state và UI URL/DOM/attribute/network/postcondition     | Spec, evidence Phase C và UI refinement | Có |
| Đa trình duyệt và report | Chromium/Firefox/Edge; có Run by + timestamp | 3/3 project; 18 lượt UI thật; metadata embedded đã kiểm chứng               | `evidence/ui-refinement-run.md`, HTML report | Có; DT-012 vẫn API-only |

FR-08 đóng góp ba lượt feature–browser. Tiêu chí toàn bài tối thiểu chín lượt cho ba feature phải được tổng hợp thêm từ các feature automation khác; không thể suy ra chỉ từ FR-08.

## Review và khoảng trống

- Review notes: `playwrite-test/FR-08-checkout/REVIEW_NOTES.md`.
- Bug reports: `bug-reports/FR-08/BUG-FR08-001-client-total-trusted.md` đến `BUG-FR08-008-checkout-total-zero-editable.md`.
- Gap analysis: `ai-gap-analysis/FR-08-checkout-coverage-gap-analysis.md`.
- GitHub Issues: đã tạo `#226`–`#233`; tám screenshot Issue đã được chèn vào tám bug report.
