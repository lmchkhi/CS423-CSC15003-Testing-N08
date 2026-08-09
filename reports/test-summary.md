# HW04 Automation Testing — Summary Report

## 1. Thông tin chung

| Mục | Giá trị |
| --- | --- |
| Sinh viên | Trần Minh Quang |
| MSSV / Run by | `23127464` |
| Nhóm | N08 |
| System Under Test | `EShop` |
| Framework | Playwright Test `1.62.1` + TypeScript |
| Feature được tự động hóa | `FR-05`, `FR-08`, `FR-12` |
| Trình duyệt | Chromium, Firefox, Microsoft Edge |
| Mốc report mới nhất | `09/08/2026 19:23` |
| Metadata report | Ba report đều có `Run by: 23127464`, thời gian `dd/MM/yyyy HH:mm` và ISO timestamp |
| Public repository | [CS423-CSC15003-Testing-N08](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/tree/test/23127464-Automation-Testing) |

## 2. Self-Assessment hiện tại

| No. | Tiêu chí HW04 | Điểm tối đa | Tự đánh giá hiện tại |
| ---: | --- | ---: | ---: |
| 1 | Task 1 — Feature A: FR-05 | 25 | 25 |
| 2 | Task 1 — Feature B: FR-08 | 25 | 25 |
| 3 | Task 1 — Feature C: FR-12 | 25 | 25 |
| 4 | Task 2 — Demo video | 15 | 0 |
| 5 | Agent Skill | 10 | 10 |
|  | **Tổng hiện tại** | **100** | **85** |

Task 2 đang để `0` vì chưa có link video cá nhân chứng minh đầy đủ automation đa trình duyệt, HTML report, một refinement và `whoami`/`hostname`. Sinh viên cập nhật lại điểm và link sau khi hoàn thành video.

## 3. Tổng hợp kết quả chạy thật

| Feature | Designed | Automated | Executed | Passed | Failed | Skipped | Browser runs | SUT defect root causes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `FR-05` | 12 | 12 | 36 | 12 | 24 | 0 | 3 | 6 |
| `FR-08` | 24 | 21 | 63 | 12 | 51 | 0 | 3 | 8 |
| `FR-12` | 40 | 40 | 120 | 69 | 51 | 0 | 3 | 4 |
| **Tổng** | **76** | **73** | **219** | **93** | **126** | **0** | **9** | **18** |

`Executed`, `Passed`, `Failed` và `Skipped` là số lượt case–project trong Playwright report. Các failure cuối đã được human review và phân loại là lỗi SUT; expected không bị hạ để khớp actual. Bug được đếm theo root cause, không đếm lặp cùng một lỗi trên ba trình duyệt.

FR-08 có 18 test case đầu vào, trong đó ba case trùng được truy vết qua case đại diện, tạo thành 15 API cases độc lập. Human review bổ sung 6 UI cases nên tổng designed là 24 và automated độc lập là 21.

## 4. Kết quả theo project

| Feature | Chromium | Firefox | Microsoft Edge | HTML report |
| --- | --- | --- | --- | --- |
| `FR-05` | `4P/8F/0S` | `4P/8F/0S` | `4P/8F/0S` | [Mở report](../playwrite-test/fr05-search/playwright-report/index.html) |
| `FR-08` | `4P/17F/0S` | `4P/17F/0S` | `4P/17F/0S` | [Mở report](../playwrite-test/FR-08-checkout/playwright-report/index.html) |
| `FR-12` | `23P/17F/0S` | `23P/17F/0S` | `23P/17F/0S` | [Mở report](../playwrite-test/fr12-access/playwright-report/index.html) |

Chú thích: `P = passed`, `F = failed`, `S = skipped`.

## 5. Phạm vi automation

| Feature | Test implementation | Data-driven fixture | Kiểu coverage | Assertion chính |
| --- | --- | --- | --- | --- |
| `FR-05` | `tests/fr05-search.spec.ts` | `data/fr05-search.json` — 12 records | UI-first trên cả ba browsers | DOM/content, state/attribute, count, network synchronization, layout |
| `FR-08` | `tests/FR-08-checkout.spec.ts`, `tests/FR-08-checkout-ui.spec.ts` | Hai JSON fixture — 15 API + 6 UI records | API state + 18 browser-page executions | Response, order/cart count, URL/DOM/attribute, backend/client postcondition |
| `FR-12` | `tests/fr12-access.spec.ts` | `data/fr12-access.json` — 40 records | Hybrid Web Admin UI + API | UI access, response/body, count/aggregate, object property |

FR-05 dùng UI làm oracle chính cho 12/12 case. FR-08 trình bày tách 45 API executions và 18 UI executions; phần API không được dùng để tuyên bố rendering coverage. FR-12 mở Web Admin page trong cả 40 case để kiểm tra access gate, sau đó dùng direct API assertions để xác minh enforcement backend.

## 6. Artifact và evidence

| Artifact | FR-05 | FR-08 | FR-12 | Trạng thái |
| --- | --- | --- | --- | --- |
| Fixture + Playwright spec | Có | Có | Có | Đủ |
| Test cases và traceability | Có | Có | Có | Đủ |
| Review notes | Có | Có | Có | Đủ |
| Gap analysis | Có | Có | Có | Đủ |
| Failure classification | 8 case / 6 root causes | 17 case / 8 root causes | 17 case / 4 root causes | Đủ |
| Bug reports | 6 | 8 | 4 | Đủ 18 report |
| GitHub Issues | `#220`–`#225` | `#226`–`#233` | `#234`–`#236`, `#238` | Đủ 18 Issue |
| Screenshot GitHub Issue | 6 | 8 | 4 | Đủ 18 screenshot |
| HTML multi-project report | Có | Có | Có | Metadata đã kiểm chứng |

### Failure attachments

- FR-05 report giữ screenshot, trace, video và error context cho 24 failure instances.
- FR-08 report giữ 18 UI trace ZIP, 18 UI video, screenshot và error context. Trace đã qua redaction; scan cuối có 0 JWT, runtime credential và credential mặc định, 18/18 ZIP hợp lệ.
- FR-12 report giữ screenshot và error context; trace/video được tắt để hạn chế lưu login payload, Authorization và JWT.

## 7. Human Review và refinement chính

- Bỏ serial fail-fast để mọi case đều được thực thi.
- Đưa input/expected sang JSON và kiểm tra fixture schema ở runtime.
- Sửa locator, timeout, wait và network synchronization để loại flaky/test timeout.
- Dùng UI làm oracle chính cho FR-05 khi Firefox cache revalidation trả `304`.
- Bổ sung sáu browser-page cases cho FR-08 sau khi phát hiện suite ban đầu chỉ lặp API.
- Cô lập runtime user/cart và giữ SPA navigation để tránh stale state hoặc pass giả.
- Bổ sung Web Admin access gate cho cả 40 FR-12 cases thay vì chỉ kiểm tra API.
- Dùng một worker để tránh reset race giữa các project stateful.
- Xử lý Firefox content sandbox sau probe `newPage` tối thiểu.
- Mở và kiểm tra HTML report thật thay vì chỉ tin reporter config.
- Redact và scan FR-08 trace trước khi public artifact.

## 8. Bug tracking

| Feature | Bug reports | GitHub Issues |
| --- | --- | --- |
| `FR-05` | [`bug-reports/FR-05/`](../bug-reports/FR-05/) | [#220](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/220)–[#225](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/225) |
| `FR-08` | [`bug-reports/FR-08/`](../bug-reports/FR-08/) | [#226](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/226)–[#233](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/233) |
| `FR-12` | [`bug-reports/FR-12/`](../bug-reports/FR-12/) | [#234](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/234)–[#236](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/236), [#238](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/238) |

Screenshot của từng GitHub Issue nằm trong `bug-reports/screenshots_issues/<Feature>/` và đã được chèn vào bug report tương ứng.

## 9. Khoảng trống trước khi nộp

| Hạng mục | Trạng thái | Việc cần làm |
| --- | --- | --- |
| FR-12 artifact hygiene | Password user mặc định còn trong 15 `error-context.md` | Xóa input sau login, rerun đủ ba browsers và quét lại report |
| Task 2 demo video | Chưa có link video HW04 phù hợp | Sinh viên tự quay video tối thiểu 5 phút và cập nhật link |
| AI Critique | File hiện hành vượt giới hạn và còn nội dung cũ | Sinh viên tự viết lại 200–300 từ theo ba feature automation |
| AI Audit Report | Có file nhưng chưa phản ánh các tương tác cuối | Sinh viên tự hoàn thiện theo yêu cầu bắt buộc; agent không chỉnh do chỉ thị hiện hành |
| PDF | Các PDF chưa đồng bộ Markdown mới | Tạo lại sau khi duyệt nội dung cuối |
| Git commit log | `git-log.txt` chưa chứa lịch sử automation mới | Tạo lại sau commit cuối |

Lịch sử Git hiện đã đạt tối thiểu: 12 commit thay đổi `.spec.ts` trên bốn ngày khác nhau. Chỉ cần tạo lại file log sau khi hoàn thành tài liệu cuối.

## 10. Tài liệu chi tiết

- [README HW04](../README.md)
- [Main Report](main-report.md)
- [FR-05 Summary](../playwrite-test/fr05-search/README_SUMMARY.md)
- [FR-05 Review Notes](../playwrite-test/fr05-search/REVIEW_NOTES.md)
- [FR-05 Gap Analysis](../ai-gap-analysis/FR-05-search-multibrowser-gap.md)
- [FR-08 Summary](../playwrite-test/FR-08-checkout/README_SUMMARY.md)
- [FR-08 Review Notes](../playwrite-test/FR-08-checkout/REVIEW_NOTES.md)
- [FR-08 Gap Analysis](../ai-gap-analysis/FR-08-checkout-coverage-gap-analysis.md)
- [FR-12 Summary](../playwrite-test/fr12-access/README_SUMMARY.md)
- [FR-12 Review Notes](../playwrite-test/fr12-access/REVIEW_NOTES.md)
- [FR-12 Gap Analysis](../ai-gap-analysis/FR-12-access-multibrowser-gap-analysis.md)
- [Agent Skill](../ai-first-playwright-testing/SKILL.md)

## 11. Demo và tài liệu bắt buộc

- Agent Skill demo: [YouTube](https://youtu.be/z8VBOkv9DZ0)
- Task 2 automation demo: **chưa bổ sung**
- AI Critique: [`reports/ai-critique.md`](ai-critique.md)
- AI Audit Report: [`reports/ai-audit-report.md`](ai-audit-report.md)
- Git commit log: [`git-log.txt`](../git-log.txt)

Trước khi đóng gói, sinh viên cần hoàn thành các mục còn thiếu ở phần 9, cập nhật self-assessment và tạo lại PDF từ Markdown đã duyệt.
