## Prompt Log Entry - 2026-06-26 18:50:31 +07

### Transcript

```text
User:
$domain-testing
$test-case-review
$prompt-log

Phân tích FR-02 trong `requirements/system-requirements.md`.

Tạo:
- `analysis/FR-02-login/domain-testing-analysis.md`
- các test case tại `tests/test-cases/FR-02-login/domain-testing/`

Sau khi tạo xong, review và sửa các test case, rồi append log vào `prompt_log.md`.

User:
<skill>
<name>domain-testing</name>
<path>/Users/hbn/Documents/CS423-CSC15003-Testing-N08/.agents/skills/domain-testing/SKILL.md</path>
---
name: domain-testing
description: Phân tích yêu cầu chức năng bằng Domain Testing, xây dựng phân vùng tương đương, ma trận miền dữ liệu và sinh test case có khả năng truy vết. Sử dụng khi người dùng yêu cầu áp dụng Domain Testing, Equivalence Partitioning, phân tích miền đầu vào hoặc tạo test case từ requirement.
---

# Domain Testing Skill

## 1. Mục đích

Áp dụng Domain Testing một cách có hệ thống cho một functional requirement.

Skill phải thể hiện đầy đủ quá trình từ requirement đến test case, không chỉ sinh danh sách test case cuối cùng.

## 2. Quy tắc ngôn ngữ

1. Toàn bộ nội dung đầu ra phải được viết bằng tiếng Việt.
2. Có thể giữ nguyên các thuật ngữ kiểm thử phổ biến bằng tiếng Anh khi cần, ví dụ:
   - Domain Testing
   - Equivalence Class
   - Valid / Invalid
   - Preconditions
   - Expected Result
   - Status
3. Tiêu đề, mô tả, giải thích, lý do chọn test data và kết luận phải viết bằng tiếng Việt.
4. ID, tên biến, URL, route, dữ liệu test và thông báo thực tế của hệ thống phải được giữ nguyên.
5. Không tự ý chuyển tài liệu sang tiếng Anh.

## 3. Nguyên tắc bắt buộc

1. Xem hệ thống như một black-box.
2. Không dựa vào source code của hệ thống trừ khi người dùng yêu cầu rõ ràng.
3. Không tự bịa requirement, validation rule hoặc business rule.
4. Khi thiếu thông tin, phải ghi rõ:
   - `Chưa được đặc tả`, hoặc
   - `Giả định cần xác nhận`.
5. Phân biệt rõ:
   - Thông tin có trong requirement
   - Giả định
   - Điều kiện kiểm thử suy ra
6. Mỗi test case phải truy vết được đến ít nhất một equivalence class hoặc dependent condition.
7. Phải xem xét cả valid domain và invalid domain.
8. Hạn chế test case trùng lặp; nếu giữ lại phải giải thích lý do.
9. Với test case invalid, mặc định chỉ làm sai một điều kiện chính; các input còn lại dùng giá trị hợp lệ danh nghĩa.
10. File analysis và file test case phải tách riêng.

## 4. Đầu vào mong đợi

Có thể nhận một hoặc nhiều đầu vào sau:

- Functional requirement
- User story
- Acceptance criteria
- Validation rules
- Mô tả giao diện
- Test case template
- Cấu trúc thư mục project
- Đường dẫn output mong muốn

Nếu không có đủ dữ liệu để kết luận, vẫn tiếp tục phân tích phần có thể xác định và ghi phần còn thiếu vào mục `Giả định và thông tin chưa được đặc tả`.

## 5. Quy trình thực hiện

### Bước 1: Đọc và tóm tắt requirement

Trích xuất:

- Requirement ID
- Tên chức năng
- Actor
- Preconditions
- Input
- Output
- Business rules
- Validation rules
- Dependency
- Error conditions
- Success conditions

Tạo bảng tóm tắt requirement.

### Bước 2: Xác định biến đầu vào và điều kiện hệ thống

Không chỉ phân tích field trên giao diện.

Cần xem xét:

- Giá trị người dùng nhập
- Trạng thái đăng nhập
- User role
- Dữ liệu đã tồn tại hoặc chưa tồn tại
- Quan hệ giữa nhiều input
- Trạng thái hệ thống hoặc external service nếu requirement có đề cập

Với mỗi biến hoặc điều kiện, xác định:

- Tên biến
- Kiểu dữ liệu
- Bắt buộc hay không
- Format
- Range
- Valid conditions
- Invalid conditions
- Dependency
- Nguồn requirement

### Bước 3: Phân vùng tương đương

Chia mỗi input condition thành các equivalence class.

Mỗi class phải có:

- Class ID
- Input hoặc điều kiện
- Mô tả class
- Valid hoặc Invalid
- Giá trị đại diện
- Requirement reference
- Ghi chú hoặc giả định

Quy tắc ID:

- `EC-<INPUT>-V01` cho valid class
- `EC-<INPUT>-I01` cho invalid class

Ví dụ:

- `EC-EMAIL-V01`
- `EC-EMAIL-I01`
- `EC-PASSWORD-I02`

### Bước 4: Phân tích quan hệ phụ thuộc

Xác định các điều kiện phụ thuộc giữa input hoặc giữa input và system state.

Ví dụ:

- `confirmPassword` phải khớp `password`
- Email đúng format nhưng đã tồn tại
- End date phải sau start date
- Một field chỉ bắt buộc khi chọn một option khác

Dùng ID:

- `DC-01`
- `DC-02`

### Bước 5: Xây dựng Domain Matrix

Tạo Domain Matrix thể hiện các tổ hợp điều kiện dự kiến kiểm thử.

Mỗi dòng phải có:

- Test condition ID
- Các class được bao phủ
- Giá trị hoặc trạng thái đại diện
- Expected validity
- Expected behavior
- Lý do chọn

Quy tắc:

- Giữ input không phải mục tiêu ở trạng thái valid nominal.
- Ưu tiên một invalid class cho mỗi test case.
- Chỉ kết hợp nhiều invalid class khi có mục đích rõ ràng.
- Không tạo Cartesian product một cách máy móc.

Dùng ID:

- `COND-FRXX-DT-001`

### Bước 6: Sinh test case

Mỗi test condition được chọn phải tạo thành một test case riêng.

Dùng ID:

- `TC-FRXX-DT-001`

Mỗi file chỉ chứa một test case.

Không chèn toàn bộ Domain Matrix vào từng test case.

### Bước 7: Tổng kết coverage

Báo cáo:

- Tổng số input/condition đã phân tích
- Tổng valid equivalence class
- Tổng invalid equivalence class
- Tổng dependent condition
- Tổng test condition
- Tổng test case
- Class đã cover
- Class chưa cover
- Lý do loại trừ
- Requirement gap

Mỗi class phải có một trạng thái:

- `Đã cover`
- `Chủ động loại trừ`
- `Bị chặn do thiếu requirement`

## 6. Cấu trúc output

### Analysis file

Tạo tại:

`analysis/<FEATURE-ID>-<feature-name>/domain-testing-analysis.md`

Nội dung bắt buộc:

```md
# Phân tích Domain Testing — <Feature ID>: <Feature Name>

## 1. Tóm tắt requirement

## 2. Biến đầu vào và ràng buộc

## 3. Phân vùng tương đương

## 4. Quan hệ phụ thuộc giữa các input và trạng thái hệ thống

## 5. Domain Matrix

## 6. Quá trình lựa chọn test case

## 7. Ma trận truy vết

## 8. Tổng kết độ bao phủ

## 9. Giả định và thông tin chưa được đặc tả
```

### Test case files

Tạo tại:

`tests/test-cases/<FEATURE-ID>-<feature-name>/domain-testing/`

Mỗi test case là một file:

`TC-<FEATURE-ID>-DT-<NNN>.md`

Cấu trúc bắt buộc:

```md
# <TEST-CASE-ID>: <Tên test case bằng tiếng Việt>

## Requirement ID
<Requirement ID>

## Module / Test type / Technique
<Module> / Functional / Domain Testing

## Mục tiêu kiểm thử
<Mục tiêu cụ thể>

## Preconditions
- <Điều kiện tiên quyết>

## Test data

| Field | Value |
|---|---|
| <Tên field> | <Giá trị cụ thể> |

## Test steps
1. <Bước cụ thể>
2. <Bước cụ thể>

## Expected result
<Kết quả quan sát được>

## Traceability
- Requirement:
- Test condition:
- Equivalence class:
- Analysis file:

## Status / Related bugs
Not Run / None
```

## 7. Quy tắc chất lượng test case

1. Test data phải là dữ liệu cụ thể, không chỉ ghi `Valid` hoặc `Invalid`.
2. Test steps phải có thể thực thi.
3. Expected result phải quan sát được.
4. Không dùng mô tả mơ hồ như:
   - `Hoạt động đúng`
   - `Validation thành công`
   - `Hiển thị lỗi`
5. Phải nêu rõ:
   - Hành động được chấp nhận hay bị từ chối
   - Thông báo hoặc validation behavior mong đợi
   - Có tạo hoặc thay đổi dữ liệu hay không
   - Có redirect hay không
6. Không ghi actual result hoặc tạo bug report khi test chưa được chạy.

## 8. Traceability bắt buộc

Analysis phải có bảng:

| Test Case ID | Test Condition | Covered Classes | Requirement Reference | Lý do lựa chọn |
|---|---|---|---|---|

Mỗi test case phải có mục `Traceability`.

## 9. Kiểm tra trước khi hoàn tất

- Không bịa constraint.
- Tất cả output bằng tiếng Việt.
- Mỗi test case chỉ nằm trong một file riêng.
- Domain Matrix chỉ nằm trong analysis.
- Có cả valid và invalid classes.
- Có phân tích dependent conditions.
- Mỗi test case map được về analysis.
- Test data cụ thể.
- Expected result có thể quan sát.
- Missing requirement được ghi rõ.

</skill>

User:
<skill>
<name>prompt-log</name>
<path>/Users/hbn/Documents/CS423-CSC15003-Testing-N08/.agents/skills/prompt-log/SKILL.md</path>
---
name: prompt-log
description: Append a verbatim, unedited transcript of the completed Codex prompt session or available conversation context to prompt_log.md. Use when the user asks to log prompts, save the chat, copy the full conversation exactly after a prompt finishes, preserve AI interaction evidence, or maintain a prompt log for assignment submission.
---

# Prompt Log Skill

## 1. Mục đích

Ghi lại nguyên văn toàn bộ đoạn chat hoặc phần hội thoại khả dụng vào `prompt_log.md` sau khi một prompt/task đã hoàn thành. Skill này dùng để lưu evidence về cách đã dùng AI trong bài tập, nên độ trung thực của transcript quan trọng hơn độ gọn đẹp.

## 2. Nguyên tắc bắt buộc

1. Ghi log sau khi đã hoàn thành việc chính của prompt.
2. Không thay thế nội dung cũ trong `prompt_log.md`; luôn append thêm entry mới.
3. Nếu không truy cập được toàn bộ lịch sử hội thoại, ghi rõ phạm vi log là `conversation context khả dụng`.
4. Copy nguyên văn câu chữ, thứ tự, lỗi chính tả, cách viết tắt, dấu câu và ngôn ngữ của từng message trong context.
5. Không tóm tắt, không diễn giải, không sửa văn phong, không dịch, không chuẩn hóa câu chữ.
6. Không bịa lại nội dung chat không có trong context.
7. Chỉ được thay đổi nội dung khi cần che bí mật như token, password, key hoặc credential; thay đúng phần bí mật bằng `[REDACTED]`.
8. Nếu có tool output quá dài không còn đầy đủ trong context, ghi nguyên văn phần còn thấy được và ghi chú rõ phần bị thiếu.

## 3. File output

Ghi tại root project:

`prompt_log.md`

Nếu file chưa tồn tại, tạo file mới.

## 4. Format entry

Mỗi lần ghi log, thêm một entry:

```md
## Prompt Log Entry - <YYYY-MM-DD HH:mm:ss TZ>

### Transcript

```text
User:
<copy nguyên văn user message>

Assistant:
<copy nguyên văn assistant message>

Tool:
<copy nguyên văn tool call/output khả dụng nếu cần lưu evidence>
```

### Notes
<Chỉ ghi metadata hoặc giới hạn context, ví dụ: "Một phần hội thoại trước đó không còn trong context". Không tóm tắt nội dung chat tại đây trừ khi người dùng yêu cầu riêng.>
```

## 5. Khi người dùng yêu cầu "toàn bộ đoạn chat"

1. Ghi transcript đầy đủ nhất có trong context hiện tại.
2. Phân vai rõ `User`, `Assistant`, `Tool`, hoặc `System note` nếu cần.
3. Nếu context đã bị compact hoặc thiếu đoạn cũ, ghi chú: `Một phần hội thoại trước đó không còn trong context, chỉ log phần khả dụng`.
4. Không tự tạo lại nguyên văn những đoạn không còn nhìn thấy.
5. Không thay một đoạn chat bằng summary. Nếu đoạn nào không thể copy nguyên văn, bỏ đoạn đó và ghi rõ lý do trong `Notes`.

## 6. Khi dùng cùng skill khác

Nếu prompt chính dùng `$qa-workflow`, `$domain-testing`, `$boundary-value-analysis`, `$test-case-review`, `$test-execution`, hoặc `$bug-report`, hoàn thành skill chính trước. Sau đó mới dùng `$prompt-log` để append entry vào `prompt_log.md`.

</skill>

User:
<skill>
<name>test-case-review</name>
<path>/Users/hbn/Documents/CS423-CSC15003-Testing-N08/.agents/skills/test-case-review/SKILL.md</path>
---
name: test-case-review
description: Review QA analysis and generated test case files for black-box testing assignments. Use when Codex must audit Domain Testing or Boundary Value Analysis outputs for concrete test data, observable expected results, traceability, duplicates, invented constraints, Vietnamese format, and readiness before execution.
---

# Test Case Review Skill

## 1. Mục đích

Review test case đã tạo trước khi execution. Skill này không mặc định sinh test case mới; chỉ phân tích lỗi, đề xuất sửa, và chỉ sửa file khi người dùng yêu cầu rõ ràng hoặc task đang yêu cầu hoàn thiện artifact.

## 2. Quy tắc ngôn ngữ

1. Toàn bộ output viết bằng tiếng Việt.
2. Giữ nguyên ID, route, URL, field name, test data, thông báo hệ thống và đường dẫn file.
3. Có thể giữ các thuật ngữ: Domain Testing, Boundary Value Analysis, Expected Result, Actual Result, Traceability, Preconditions, Pass, Fail, Blocked, Not Run.

## 3. Nguyên tắc review

1. Xem hệ thống như black-box.
2. Không đọc source code để suy ra expected result trừ khi người dùng yêu cầu.
3. Không bịa constraint, validation rule, business rule hoặc thông báo lỗi.
4. Nếu requirement thiếu thông tin, ghi `Chưa được đặc tả` hoặc `Giả định cần xác nhận`.
5. Phân biệt lỗi nghiêm trọng cần sửa với gợi ý cải thiện.
6. Không biến một test case thành nhiều mục tiêu kiểm thử chính.
7. Không gán Pass/Fail khi chưa có Actual Result.

## 4. Checklist review

Review từng analysis file và test case file theo các điểm sau:

- Requirement reference có đúng và đầy đủ không.
- Technique có đúng với nội dung không: Domain Testing hay BVA.
- Test case ID, condition ID, equivalence class ID hoặc boundary value ID có nhất quán không.
- Test data có giá trị cụ thể, không chỉ ghi `valid`, `invalid`, `empty`, `too long`.
- Expected Result có quan sát được không: accepted/rejected, validation message nếu requirement có nêu, redirect, data created/updated/not changed.
- Test steps có thực thi được theo UI/API được mô tả không.
- Preconditions có đủ để chạy test không.
- Invalid case có isolate một điều kiện chính không.
- Các input khác có dùng valid nominal value không.
- BVA string length đã đếm đúng số ký tự chưa.
- Domain Matrix hoặc BVA Matrix có nằm trong analysis, không lặp lại đầy đủ trong từng test case.
- Test case có duplicate mục tiêu, duplicate data hoặc duplicate coverage không.
- Status ban đầu phải là `Not Run / None` nếu chưa execution.
- Output có đúng tiếng Việt và đúng format template project không.

## 5. Cách review

### Bước 1: Thu thập ngữ cảnh

Đọc các file liên quan:

- `requirements/<FEATURE-ID>-<feature-name>.md`
- `analysis/<FEATURE-ID>-<feature-name>/*.md`
- `tests/test-cases/<FEATURE-ID>-<feature-name>/**/*.md`
- Template trong `templates/` nếu cần đối chiếu format.

### Bước 2: Lập danh sách phát hiện

Mỗi finding nên có:

- Mã finding: `REV-<FEATURE-ID>-<NNN>`
- Mức độ: `Critical`, `Major`, `Minor`
- File và dòng nếu có thể xác định
- Mô tả vấn đề
- Ảnh hưởng đến test quality
- Đề xuất sửa cụ thể

### Bước 3: Kiểm tra traceability

Lập bảng:

| Test Case ID | Requirement | Analysis condition | Class/Boundary | Trạng thái | Ghi chú |
|---|---|---|---|---|---|

Trạng thái gồm:

- `Hợp lệ`
- `Thiếu liên kết`
- `Sai liên kết`
- `Cần xác nhận`

### Bước 4: Kiểm tra coverage và duplicate

Lập bảng ngắn:

| Coverage item | Test case cover | Trạng thái | Ghi chú |
|---|---|---|---|

Không yêu cầu tạo Cartesian product. Chỉ đánh dấu gap khi class, boundary, hoặc dependent condition đã được chọn trong analysis nhưng không có test case tương ứng.

### Bước 5: Kết luận sẵn sàng execution

Kết luận một trong các trạng thái:

- `Sẵn sàng execution`
- `Cần sửa trước execution`
- `Bị chặn do thiếu requirement`

## 6. Output mặc định

Nếu người dùng không chỉ định file output, tạo review tại:

`reviews/<FEATURE-ID>-<feature-name>/<technique>-review.md`

Với cấu trúc:

```md
# Review test case - <FEATURE-ID>: <Feature Name>

## 1. Phạm vi review

## 2. Tóm tắt kết quả

## 3. Findings cần sửa

## 4. Traceability audit

## 5. Coverage và duplicate audit

## 6. Kết luận readiness

## 7. Giả định và thông tin cần xác nhận
```

## 7. Khi được yêu cầu sửa file

1. Sửa tối thiểu để khắc phục finding.
2. Giữ ID đã có nếu không bắt buộc đổi.
3. Không tạo expected result mới vượt quá requirement.
4. Cập nhật review để ghi rõ finding nào đã được xử lý.

</skill>

Assistant:
Mình sẽ dùng lần lượt `domain-testing`, rồi `test-case-review`, cuối cùng `prompt-log`. Trước tiên mình đọc requirement FR-02 và cấu trúc repo để bám đúng format hiện có.

Assistant:
FR-02 khá ngắn nhưng có vài điều kiện trạng thái quan trọng: định dạng email HTML5, sai thông tin đăng nhập, khóa sau 3 lần sai liên tiếp, và token khi thành công. Mình đang đối chiếu template để artifact mới hòa với repo hiện tại.

Assistant:
Mình đã đủ ngữ cảnh để tạo bộ Domain Testing. Mình sẽ giữ phần “bộ đếm tăng đúng 1” ở mức có thể kiểm chứng black-box qua ngưỡng khóa sau 3 lần, đồng thời ghi rõ gap nếu không có log/API/admin để quan sát trực tiếp giá trị counter.

Assistant:
Mình đang ghi analysis trước, rồi sinh từng test case riêng theo các condition đã chọn. Các expected result sẽ tránh tự đặt thông báo cụ thể khi requirement chỉ nói “phù hợp” và “không để lộ chi tiết nguyên nhân”.

Assistant:
Các file chính đã được tạo. Giờ mình review như một lượt QA riêng: kiểm tra traceability, dữ liệu cụ thể, duplicate, expected result có quan sát được, và chỗ nào đang dựa vào giả định sẽ được ghi rõ thay vì biến thành rule mới.

Assistant:
Review không phát hiện lỗi lớn cần đổi cấu trúc, nhưng mình sẽ ghi review artifact để có dấu vết audit. Mình cũng sẽ đánh dấu rõ rủi ro còn lại: counter “tăng đúng 1” không quan sát trực tiếp nếu môi trường không cung cấp log/API.

Assistant:
Review artifact đã xong và không cần sửa thêm test case. Bước cuối là append prompt log vào `prompt_log.md` theo đúng skill, ghi rõ đây là phần context khả dụng của phiên hiện tại.

Assistant:
`prompt_log.md` chưa tồn tại nên mình sẽ tạo mới và thêm entry đầu tiên. Mình chỉ ghi phần hội thoại khả dụng của lượt này, không dựng lại nội dung nào ngoài context đang thấy.
```

### Notes
Log này ghi `conversation context khả dụng` trong lượt làm việc hiện tại. Tool call/output không được chép đầy đủ vào transcript vì phần chính cần lưu evidence là prompt, skill instruction khả dụng, và các phản hồi hội thoại; artifact sinh ra nằm trong các file project tương ứng.
