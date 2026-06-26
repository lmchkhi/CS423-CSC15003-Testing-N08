---
name: test-execution
description: Execute or document execution of approved manual QA test cases. Use when Codex is asked to run test cases, fill Actual Result, determine Pass/Fail/Blocked/Not Run, collect evidence, or update tests/test-runs. Must not guess results when the system cannot actually be accessed or exercised.
---

# Test Execution Skill

## 1. Mục đích

Ghi nhận kết quả execution cho các test case đã được approve. Skill này chỉ đánh giá Pass/Fail khi có Actual Result quan sát được từ hệ thống, browser, API response, log, screenshot, hoặc bằng chứng người dùng cung cấp.

## 2. Quy tắc ngôn ngữ

1. Toàn bộ nội dung output viết bằng tiếng Việt.
2. Giữ nguyên ID, field name, URL, route, test data, message thực tế và tên file evidence.
3. Có thể giữ các thuật ngữ: Actual Result, Expected Result, Pass, Fail, Blocked, Not Run, Evidence, Environment.

## 3. Nguyên tắc bắt buộc

1. Không tự đoán kết quả.
2. Nếu không truy cập được hệ thống hoặc không có evidence, ghi `Not Run` hoặc `Blocked`.
3. Không sửa Expected Result trong lúc execution trừ khi người dùng yêu cầu review/sửa test case.
4. Không tạo bug report nếu chưa có status `Fail`.
5. Phân biệt:
   - `Fail`: đã chạy và Actual Result khác Expected Result.
   - `Pass`: đã chạy và Actual Result phù hợp Expected Result.
   - `Blocked`: không thể chạy do môi trường, account, data, build, dependency, hoặc thiếu thông tin.
   - `Not Run`: chưa thực hiện.
6. Evidence phải truy vết được đến test case và thời điểm chạy.

## 4. Đầu vào mong đợi

- Test case file trong `tests/test-cases/`
- Requirement và analysis liên quan
- Môi trường test: browser, OS, build, base URL, account, database state nếu có
- Evidence: screenshot, video, API response, console log, người dùng mô tả actual result
- Đường dẫn file test run nếu đã có

## 5. Quy trình execution

### Bước 1: Xác định phạm vi

Lập danh sách test case sẽ chạy:

| Test Case ID | File | Technique | Trạng thái trước khi chạy |
|---|---|---|---|

Bỏ qua test case chưa sẵn sàng hoặc thiếu preconditions và ghi lý do.

### Bước 2: Chuẩn bị môi trường

Ghi rõ:

- Tester
- Ngày giờ chạy
- Browser / OS / device
- Base URL hoặc build
- Account/data dùng để test
- Cách reset hoặc chuẩn bị data nếu có

Nếu thiếu môi trường, không chạy giả định; ghi `Blocked`.

### Bước 3: Thực hiện test steps

Với mỗi test case:

1. Đọc Preconditions, Test data, Test steps, Expected Result.
2. Thực hiện từng step đúng thứ tự.
3. Ghi Actual Result bằng hành vi quan sát được.
4. Gán status theo bảng:

| Điều kiện | Status |
|---|---|
| Actual Result khớp Expected Result | Pass |
| Actual Result khác Expected Result | Fail |
| Không thể chạy vì blocker | Blocked |
| Chưa chạy | Not Run |

### Bước 4: Lưu evidence

Nếu có file evidence, lưu hoặc tham chiếu theo quy ước:

`bug-reports/screenshots/<TEST-CASE-ID>-<short-note>.<ext>`

Hoặc ghi đường dẫn evidence người dùng đã cung cấp.

### Bước 5: Cập nhật test run

Tạo hoặc cập nhật:

`tests/test-runs/<FEATURE-ID>-<feature-name>-run.md`

Cấu trúc:

```md
# Test Run - <FEATURE-ID>: <Feature Name>

## 1. Thông tin môi trường

## 2. Phạm vi execution

## 3. Kết quả chi tiết

| Test Case ID | Status | Actual Result | Evidence | Related Bug |
|---|---|---|---|---|

## 4. Tổng kết

## 5. Blocker và ghi chú
```

## 6. Cập nhật test case file

Chỉ cập nhật mục `Status / Related bugs` trong test case nếu người dùng yêu cầu hoặc workflow yêu cầu đồng bộ. Không chèn log dài vào test case; để chi tiết trong test run.

## 7. Khi gặp Fail

1. Ghi Actual Result cụ thể.
2. Ghi evidence.
3. Đánh dấu Related Bug là `Pending` nếu chưa tạo bug.
4. Đề xuất dùng `$bug-report` để tạo bug report từ test case fail.
