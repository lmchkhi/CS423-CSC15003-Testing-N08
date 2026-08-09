# HW04 Automation Test Summary — FR-12 Access Control

## Thông tin chung

| Mục                    | Giá trị                                                   |
| ---------------------- | --------------------------------------------------------- |
| SUT                    | `EShop`                                                   |
| Run by                 | `23127464`                                                |
| Thời điểm report       | `09/08/2026 16:40`                                        |
| Report artifact        | `playwrite-test/fr12-access/playwright-report/index.html` |
| Metadata đã kiểm chứng | Có — đã mở report và xác nhận trực tiếp                   |

## Thiết lập chạy FR-12

Hai tài khoản kiểm thử mặc định được khai báo trực tiếp trong `data/fr12-access.json`. Backend API và Web Admin tại `http://localhost:5174` phải hoạt động trước khi chạy.

```powershell
npm run test:fr12:phase-d
```

## Test summary theo tính năng

| Feature  | Designed | Automated | Executed | Passed | Failed | Skipped | Browser runs |   SUT defects |
| -------- | -------: | --------: | -------: | -----: | -----: | ------: | -----------: | ------------: |
| `FR-12`  |       40 |        40 |      120 |     69 |     51 |       0 |            3 | 4 root causes |
| **Tổng** |   **40** |    **40** |  **120** | **69** | **51** |   **0** |        **3** |         **4** |

`Executed/Passed/Failed/Skipped` là lượt case–project từ Playwright report. `SUT defects` đếm root cause, không đếm 51 failure instance.

## Kết quả theo trình duyệt

| Feature | Chromium     | Firefox      | Edge         | Tổng lượt feature–browser | Artifact                                                  |
| ------- | ------------ | ------------ | ------------ | ------------------------: | --------------------------------------------------------- |
| `FR-12` | `23P/17F/0S` | `23P/17F/0S` | `23P/17F/0S` |                         3 | `playwrite-test/fr12-access/playwright-report/index.html` |

Chú thích: `P = passed`, `F = failed`, `S = skipped`.

## Ca chưa tự động hóa

| Feature | Test case | Lý do                             | Tác động                                     | Kế hoạch xử lý |
| ------- | --------- | --------------------------------- | -------------------------------------------- | -------------- |
| `FR-12` | Không có  | Đủ 40/40 HW02 case đã tự động hóa | Không thiếu case trong phạm vi HW02 đã duyệt | N/A            |

## Tự đánh giá kỹ thuật

| Tiêu chí                 | Mục tiêu                                      | Kết quả thật                                                           | Bằng chứng                             | Đạt?         |
| ------------------------ | --------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------- | ------------ |
| Số lượng test            | Tối thiểu 12 case cho mỗi tính năng           | 40 case FR-12                                                          | `TEST_CASES.md`, fixture               | Có           |
| Data-driven              | Input/expected nằm ngoài spec ở JSON/CSV      | 40 record trong `data/fr12-access.json`; spec đọc fixture              | Fixture + spec                         | Có           |
| Assertion                | Ít nhất 3 nhóm assertion thực sự chạy         | UI access/visibility; Network/direct response; Count/aggregate/object property | Spec + HTML report/error context       | Có           |
| Đa trình duyệt và report | Chromium/Firefox/Edge; metadata đã kiểm chứng | 3/3 project FR-12, `Run by` + timestamp hiển thị                       | `evidence/phase-d-run.md`, HTML report | Có cho FR-12 |

FR-12 đóng góp 3 lượt feature–browser thật. Mỗi case mở Web Admin bằng `page` để kiểm tra cổng truy cập theo trạng thái không token, token sai, user và admin; assertion API giữ vai trò kiểm chứng sâu enforcement backend.

## Review và khoảng trống

- Review notes: `playwrite-test/fr12-access/REVIEW_NOTES.md`.
- Bug reports có bằng chứng: `bug-reports/FR-12/BUG-FR12-001-product-no-auth-middleware.md` đến `BUG-FR12-004-wrong-status-invalid-token.md`.
- Gap analysis: `ai-gap-analysis/FR-12-access-multibrowser-gap-analysis.md`.
- Audit AI liên tục: `reports/ai-audit-report.md`.
