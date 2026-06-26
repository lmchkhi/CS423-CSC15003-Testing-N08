---
name: qa-workflow
description: Coordinate black-box QA work for this software testing project. Use when Codex must choose between Domain Testing and Boundary Value Analysis, generate analysis and test cases, run a test-case review, organize files under requirements/analysis/tests/reviews/bug-reports, or manage the staged workflow from requirement to report without prematurely executing tests.
---

# QA Workflow Skill

## 1. Mục đích

Điều phối workflow black-box testing cho bài tập. Skill này giúp chọn đúng skill con, tạo artifact đúng thư mục, review kết quả, và dừng đúng giai đoạn nếu người dùng chưa yêu cầu execution.

## 2. Thứ tự ưu tiên skill

Dùng skill con theo giai đoạn:

| Giai đoạn | Skill cần dùng | Khi nào dùng |
|---|---|---|
| Phân tích miền dữ liệu | `$domain-testing` | Requirement có input, rule, state, dependency, valid/invalid class |
| Phân tích giá trị biên | `$boundary-value-analysis` | Requirement có min/max, length, range, date/time, quantity, threshold |
| Review test case | `$test-case-review` | Sau khi đã tạo analysis và test case |
| Execution | `$test-execution` | Chỉ khi người dùng yêu cầu chạy test hoặc ghi actual result |
| Bug report | `$bug-report` | Chỉ khi có failed test case với actual result và evidence |
| Prompt log | `$prompt-log` | Sau khi prompt/task chính đã hoàn thành và người dùng yêu cầu ghi log |

Không kích hoạt tất cả skill cùng lúc. Chọn skill tối thiểu phù hợp giai đoạn hiện tại.

## 3. Nguyên tắc bắt buộc

1. Xem hệ thống như black-box.
2. Không đọc source code để bổ sung rule trừ khi người dùng yêu cầu.
3. Không bịa constraint, min/max, validation message, business rule, account, data tồn tại, hoặc actual result.
4. File analysis và test case phải tách riêng.
5. Mỗi test case nằm trong một file riêng.
6. Sau khi generate test case, phải review trước khi coi là sẵn sàng execution.
7. Dừng trước execution nếu người dùng chỉ yêu cầu tạo test case/analysis.
8. Chỉ tạo bug report sau execution có status `Fail`.
9. Chỉ ghi `prompt_log.md` sau khi đã hoàn thành việc chính của prompt.

## 4. Workflow mặc định

### Bước 1: Xác định requirement

Đọc requirement trong `requirements/` hoặc nội dung người dùng cung cấp. Trích xuất:

- Feature ID và tên feature.
- Input và system state.
- Rule rõ ràng.
- Rule còn thiếu hoặc mơ hồ.
- Dấu hiệu phù hợp Domain Testing.
- Dấu hiệu phù hợp BVA.

### Bước 2: Chọn kỹ thuật

Chọn theo bảng:

| Điều kiện requirement | Kỹ thuật |
|---|---|
| Có valid/invalid class, format, dependency, state | Domain Testing |
| Có giới hạn min/max, độ dài, range, threshold | Boundary Value Analysis |
| Có cả hai | Tạo hai analysis riêng và hai nhóm test case riêng |
| Không đủ thông tin cho kỹ thuật nào | Ghi gap, hỏi/ghi `Chưa được đặc tả` |

### Bước 3: Tạo analysis và test case

Nếu dùng Domain Testing, làm theo `$domain-testing`.

Output:

- `analysis/<FEATURE-ID>-<feature-name>/domain-testing-analysis.md`
- `tests/test-cases/<FEATURE-ID>-<feature-name>/domain-testing/TC-<FEATURE-ID>-DT-<NNN>.md`

Nếu dùng BVA, làm theo `$boundary-value-analysis`.

Output:

- `analysis/<FEATURE-ID>-<feature-name>/bva-analysis.md`
- `tests/test-cases/<FEATURE-ID>-<feature-name>/bva/TC-<FEATURE-ID>-BVA-<NNN>.md`

### Bước 4: Review bắt buộc

Sau khi tạo test case, dùng `$test-case-review` để kiểm:

- Traceability.
- Expected Result có quan sát được.
- Test data cụ thể.
- Duplicate.
- Invalid case isolate.
- BVA length/count nếu có.
- Constraint có bị bịa không.

Lưu review tại:

`reviews/<FEATURE-ID>-<feature-name>/<technique>-review.md`

Nếu có finding Major/Critical, sửa artifact trước khi kết luận.

### Bước 5: Dừng trước execution

Nếu user chỉ yêu cầu `tạo`, `phân tích`, `sinh test case`, hoặc `review`, không chạy test và không tạo bug. Kết thúc với danh sách file đã tạo và trạng thái readiness.

### Bước 6: Execution khi được yêu cầu

Chỉ dùng `$test-execution` khi user yêu cầu chạy test, ghi actual result, hoặc cập nhật test run.

Output:

`tests/test-runs/<FEATURE-ID>-<feature-name>-run.md`

### Bước 7: Bug report khi có Fail

Chỉ dùng `$bug-report` khi có:

- Failed test case.
- Expected Result.
- Actual Result.
- Environment.
- Evidence hoặc mô tả quan sát được.

Output:

`bug-reports/BUG-FRXX-NNN.md`

### Bước 8: Prompt log khi được yêu cầu

Nếu người dùng yêu cầu lưu prompt hoặc lưu đoạn chat, dùng `$prompt-log` sau khi hoàn thành workflow chính.

Output:

`prompt_log.md`

## 5. Cấu trúc project đúng

```text
.agents/skills/
requirements/
analysis/
tests/test-cases/
tests/test-runs/
reviews/
bug-reports/
ai-gap-analysis/
reports/
templates/
```

## 6. Kết quả cuối cùng nên báo cáo

Mỗi lần hoàn thành workflow, tóm tắt ngắn:

- Requirement đã xử lý.
- Kỹ thuật đã dùng.
- File đã tạo/cập nhật.
- Số test case.
- Review status.
- Gap hoặc giả định cần xác nhận.
- Bước tiếp theo hợp lý, nếu có.
