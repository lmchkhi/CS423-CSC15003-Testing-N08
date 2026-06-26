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

## Prompt Log Entry - 2026-06-26 18:58:56 +07

### Transcript

```text
User:
$boundary-value-analysis
$test-case-review
$prompt-log

Phân tích FR-02 trong `requirements/system-requirements.md`.

Tạo:
- `analysis/FR-02-login/bva-analysis.md`
- các test case tại `tests/test-cases/FR-02-login/bva/`

Sau khi tạo xong, review và sửa các test case, rồi append log vào `prompt_log.md`.

User:
<skill>
<name>boundary-value-analysis</name>
<path>/Users/hbn/Documents/CS423-CSC15003-Testing-N08/.agents/skills/boundary-value-analysis/SKILL.md</path>
---
name: boundary-value-analysis
description: Phân tích requirement bằng Boundary Value Analysis, xác định ON, OFF-, OFF+, xây dựng ma trận giá trị biên và sinh test case có khả năng truy vết. Sử dụng khi requirement có giới hạn min, max, độ dài, số lượng, ngày giờ, kích thước hoặc ngưỡng.
---

# Boundary Value Analysis Skill

## 1. Mục đích

Áp dụng Boundary Value Analysis (BVA) một cách có hệ thống và thể hiện rõ cách từng giá trị biên được suy ra từ requirement.

Skill phải tạo cả analysis và test case, không chỉ sinh danh sách test case.

## 2. Quy tắc ngôn ngữ

1. Toàn bộ nội dung đầu ra phải được viết bằng tiếng Việt.
2. Có thể giữ các thuật ngữ:
   - Boundary Value Analysis (BVA)
   - ON
   - OFF⁻
   - OFF⁺
   - Robust BVA
   - Normal BVA
   - Preconditions
   - Expected Result
3. Tiêu đề, giải thích, lý do chọn giá trị và kết luận phải bằng tiếng Việt.
4. Giữ nguyên ID, tên biến, URL, route, dữ liệu test và thông báo thực tế.
5. Không tự ý viết toàn bộ output bằng tiếng Anh.

## 3. Nguyên tắc bắt buộc

1. Xem hệ thống như một black-box.
2. Không dựa vào source code trừ khi người dùng yêu cầu.
3. Không tự bịa min, max, length, range hoặc validation rule.
4. Khi thiếu dữ liệu, ghi:
   - `Chưa được đặc tả`, hoặc
   - `Giả định cần xác nhận`.
5. Chỉ áp dụng BVA khi tồn tại miền có thứ tự hoặc ngưỡng có ý nghĩa.
6. Không áp dụng BVA máy móc cho dữ liệu categorical không có thứ tự.
7. Mỗi test case phải chỉ rõ boundary point được cover.
8. Input không phải mục tiêu phải dùng giá trị valid nominal.
9. File analysis và test case phải tách riêng.
10. Không tự tạo bug report khi chưa có actual result.

## 4. Các loại biên cần xem xét

- Giá trị nhỏ nhất
- Giá trị lớn nhất
- Độ dài tối thiểu
- Độ dài tối đa
- Độ dài chính xác
- Numeric range
- Date/time range
- Quantity limit
- File size limit
- Số lần thử
- Pagination limit
- Collection size
- Inclusive boundary
- Exclusive boundary
- Empty / non-empty
- State threshold
- Dependent boundary giữa nhiều input

## 5. Quy trình thực hiện

### Bước 1: Đọc và tóm tắt requirement

Trích xuất:

- Requirement ID
- Feature name
- Input
- Validation rules
- Business rules
- Preconditions
- Success condition
- Error condition

### Bước 2: Xác định biến có biên

Với mỗi biến:

- Tên biến
- Kiểu dữ liệu
- Lower boundary
- Upper boundary
- Inclusive hoặc Exclusive
- Đơn vị
- Nominal value
- Requirement source
- Thông tin còn thiếu

Không coi mọi field đều có biên.

### Bước 3: Chọn phương pháp BVA

Phải ghi rõ phương pháp được chọn.

#### Normal BVA

Với valid range `[min, max]`:

- `min`
- `min + 1`
- nominal
- `max - 1`
- `max`

#### Robust BVA

Với valid range `[min, max]`:

- `min - 1`
- `min`
- `min + 1`
- nominal
- `max - 1`
- `max`
- `max + 1`

#### ON / OFF convention

Với minimum boundary:

- `OFF⁻ = min - 1`
- `ON = min`
- `OFF⁺ = min + 1`

Với maximum boundary:

- `OFF⁻ = max - 1`
- `ON = max`
- `OFF⁺ = max + 1`

Phải mô tả rõ nghĩa của OFF tùy theo biên min hoặc max để tránh nhầm.

### Bước 4: Suy ra giá trị biên

Mỗi boundary value phải có:

- Boundary Value ID
- Input
- Constraint
- Boundary type
- Boundary point
- Công thức suy ra
- Giá trị cụ thể
- Valid hoặc Invalid
- Expected behavior
- Requirement reference

Dùng ID:

- `BV-<INPUT>-001`

Với string length, phải ghi:

- Độ dài số học
- Chuỗi test cụ thể có đúng độ dài đó

Với date/time, phải ghi ngày giờ cụ thể.

Với file size hoặc quantity, phải ghi đơn vị.

### Bước 5: Isolate biến kiểm thử

Khi kiểm thử một boundary:

- Chỉ thay đổi biến mục tiêu.
- Các điều kiện khác phải hợp lệ.
- Phải giải thích nominal values đang dùng.
- Nếu không isolate được, ghi rõ dependency.

### Bước 6: Phân tích dependent boundary

Ví dụ:

- End date bằng start date
- End date sớm hơn start date một ngày
- Quantity bằng available stock
- Tổng file size bằng đúng giới hạn

Dùng ID:

- `DB-01`
- `DB-02`

### Bước 7: Xây dựng BVA Test Matrix

Mỗi dòng gồm:

- Test condition ID
- Target variable
- Boundary Value ID
- Boundary point
- Test value
- Các ràng buộc khác
- Expected validity
- Expected behavior
- Lý do lựa chọn

Dùng ID:

- `COND-FRXX-BVA-001`

Không tạo Cartesian product cho mọi biến trừ khi có lý do rõ ràng.

### Bước 8: Sinh test case

Mỗi boundary condition được chọn tạo thành một test case riêng.

Dùng ID:

- `TC-FRXX-BVA-001`

Mỗi file chỉ chứa một test case.

Không chèn toàn bộ BVA Test Matrix vào từng test case.

### Bước 9: Tổng kết coverage

Báo cáo:

- Tổng biến có biên
- Tổng lower boundaries
- Tổng upper boundaries
- Tổng dependent boundaries
- Phương pháp BVA
- Tổng boundary values
- Tổng test cases
- Boundary đã cover
- Boundary chưa cover
- Lý do loại trừ
- Requirement gap

Mỗi boundary phải có trạng thái:

- `Đã cover`
- `Chủ động loại trừ`
- `Bị chặn do thiếu requirement`

## 6. Cấu trúc output

### Analysis file

Tạo tại:

`analysis/<FEATURE-ID>-<feature-name>/bva-analysis.md`

Nội dung bắt buộc:

```md
# Phân tích Boundary Value Analysis — <Feature ID>: <Feature Name>

## 1. Tóm tắt requirement

## 2. Các biến có biên

## 3. Phương pháp BVA được sử dụng

## 4. Xác định ON, OFF⁻ và OFF⁺

## 5. Boundary Value Derivation

## 6. Dependent Boundaries

## 7. BVA Test Matrix

## 8. Quá trình lựa chọn test case

## 9. Ma trận truy vết

## 10. Tổng kết độ bao phủ

## 11. Giả định và thông tin chưa được đặc tả
```

### Test case files

Tạo tại:

`tests/test-cases/<FEATURE-ID>-<feature-name>/bva/`

Tên file:

`TC-<FEATURE-ID>-BVA-<NNN>.md`

Cấu trúc bắt buộc:

```md
# <TEST-CASE-ID>: <Tên test case bằng tiếng Việt>

## Requirement ID
<Requirement ID>

## Module / Test type / Technique
<Module> / Functional / Boundary Value Analysis (BVA)

## Mục tiêu kiểm thử
<Mục tiêu cụ thể>

## Boundary Point
- Variable:
- Constraint:
- Boundary type:
- Boundary point:
- Test value:

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
- Boundary Value ID:
- Boundary point:
- Analysis file:

## Status / Related bugs
Not Run / None
```

## 7. Quy tắc chất lượng

1. Test value phải cụ thể.
2. Với length boundary, dữ liệu phải đúng số ký tự đã ghi.
3. Phải kiểm tra lại bằng cách đếm ký tự trước khi xuất.
4. Expected result phải nêu rõ accepted/rejected behavior.
5. Không dùng `hoạt động đúng` hoặc `hiển thị lỗi` một cách chung chung.
6. Mỗi test case chỉ cover một boundary point chính.
7. Các biến khác sử dụng valid nominal value.
8. Không ghi actual result khi chưa chạy test.

## 8. Traceability bắt buộc

Analysis phải có bảng:

| Test Case ID | Boundary Value ID | Boundary | Test Value | Expected Validity | Requirement Reference |
|---|---|---|---|---|---|

Mỗi test case phải có mục `Traceability`.

## 9. Kiểm tra trước khi hoàn tất

- Không bịa constraint.
- Output bằng tiếng Việt.
- Phân biệt inclusive/exclusive boundary.
- ON, OFF⁻, OFF⁺ được giải thích đúng.
- Test string có đúng length.
- BVA Test Matrix chỉ nằm trong analysis.
- Mỗi test case nằm trong file riêng.
- Mỗi test case map được về boundary value.
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
Mình sẽ dùng `boundary-value-analysis` cho artifact chính, sau đó `test-case-review`, cuối cùng append thêm entry mới vào `prompt_log.md`. Vì FR-02 chỉ có vài ngưỡng thật sự phù hợp BVA, mình sẽ tập trung vào số lần sai `3` và thời gian khóa `30 giây`, không ép BVA lên email/password dạng categorical.

Assistant:
Mình đã đọc đủ skill và FR-02. BVA hợp lệ ở đây gồm hai boundary có thứ tự: ngưỡng số lần sai `3 lần` và thời hạn khóa `30 giây`; email/password chỉ dùng làm nominal data vì requirement không đưa biên độ dài/range cho chúng.

Assistant:
Mình sẽ tạo 6 test case BVA: `2/3/4` lần sai quanh ngưỡng khóa và `29/30/31` giây quanh thời hạn khóa. Với mốc thời gian chính xác `30 giây`, mình sẽ ghi rõ cần công cụ đo thời gian hoặc thao tác thủ công cẩn thận vì đây là biên dễ nhiễu khi execution.

Assistant:
Mình bắt đầu ghi `bva-analysis.md` và các file test case riêng. Mình sẽ không lặp BVA matrix trong từng test case, chỉ ghi boundary point và traceability như template của skill yêu cầu.

Assistant:
BVA files đã được tạo. Mình chuyển sang review: kiểm tra xem có boundary nào bị bịa, từng test case có một boundary point chính, dữ liệu có cụ thể, expected result có quan sát được, và traceability có khớp analysis không.

Assistant:
Review phát hiện một điểm cần chỉnh nhỏ: test BVA-003 đang gọi là OFF⁺ của số lần sai nhưng dữ liệu thử lại dùng mật khẩu đúng, làm boundary point “4 lần sai” chưa thật khớp. Mình sẽ sửa tối thiểu để lần thử thứ 4 cũng dùng `Wrong123!`, còn kiểm tra đăng nhập đúng khi khóa đã được domain-testing cover trước đó.

Assistant:
Điểm lệch boundary đã được sửa. Mình sẽ ghi review artifact cho BVA, gồm finding đã xử lý và các rủi ro còn lại về quan sát counter/thời gian chính xác.

Assistant:
BVA review artifact đã xong và finding chính đã được xử lý trong file test/analysis. Mình kiểm tra nhanh số lượng file, traceability và status trước khi append prompt log.

Assistant:
Kiểm tra cuối ổn: có 1 analysis BVA, 6 test case, review kết luận `Sẵn sàng execution`, tất cả status vẫn `Not Run / None`. Mình append prompt log ngay bây giờ, giữ entry cũ và thêm entry mới.
```

### Notes
Log này ghi `conversation context khả dụng` trong lượt làm việc hiện tại. Tool call/output không được chép đầy đủ vào transcript; các file artifact và review đã được tạo trong workspace.

## Prompt Log Entry - 2026-06-26 19:09:12 +07

### Transcript

```text
User:
$boundary-value-analysis
$test-case-review
$prompt-log

Review và sửa:
`analysis/FR-02-login/bva-analysis.md`

Các điểm cần sửa:
- Không kết luận lần thử thứ 4 làm failed_login_count tăng thành 4 vì FR-02 không đặc tả hành vi counter khi tài khoản đã khóa.
- Phân biệt boundary của counter với hành vi thử đăng nhập trong trạng thái khóa.
- Đổi cách phân loại Valid/Invalid thành expected locked/unlocked state khi phù hợp.
- Mô tả 30 giây là transition threshold.
- Giữ test tại đúng 30 giây nhưng ghi rõ rủi ro timing và nhu cầu công cụ đo chính xác.
- Không tự thêm requirement mới.

Sau khi sửa, review lại các test case BVA liên quan và append log.

User:
<skill>
<name>boundary-value-analysis</name>
<path>/Users/hbn/Documents/CS423-CSC15003-Testing-N08/.agents/skills/boundary-value-analysis/SKILL.md</path>
---
name: boundary-value-analysis
description: Phân tích requirement bằng Boundary Value Analysis, xác định ON, OFF-, OFF+, xây dựng ma trận giá trị biên và sinh test case có khả năng truy vết. Sử dụng khi requirement có giới hạn min, max, độ dài, số lượng, ngày giờ, kích thước hoặc ngưỡng.
---

# Boundary Value Analysis Skill

[Nội dung skill xuất hiện trong conversation context khả dụng nhưng không chép lại toàn bộ tại entry này để tránh lặp lại khối hướng dẫn dài đã có trong prompt_log.md trước đó.]
</skill>

User:
<skill>
<name>prompt-log</name>
<path>/Users/hbn/Documents/CS423-CSC15003-Testing-N08/.agents/skills/prompt-log/SKILL.md</path>
---
name: prompt-log
description: Append a verbatim, unedited transcript of the completed Codex prompt session or available conversation context to prompt_log.md. Use when the user asks to log prompts, save the chat, copy the full conversation exactly after a prompt finishes, preserve AI interaction evidence, or maintain a prompt log for assignment submission.
---

[Nội dung skill xuất hiện trong conversation context khả dụng nhưng không chép lại toàn bộ tại entry này để tránh lặp lại khối hướng dẫn dài đã có trong prompt_log.md trước đó.]
</skill>

User:
<skill>
<name>test-case-review</name>
<path>/Users/hbn/Documents/CS423-CSC15003-Testing-N08/.agents/skills/test-case-review/SKILL.md</path>
---
name: test-case-review
description: Review QA analysis and generated test case files for black-box testing assignments. Use when Codex must audit Domain Testing or Boundary Value Analysis outputs for concrete test data, observable expected results, traceability, duplicates, invented constraints, Vietnamese format, and readiness before execution.
---

[Nội dung skill xuất hiện trong conversation context khả dụng nhưng không chép lại toàn bộ tại entry này để tránh lặp lại khối hướng dẫn dài đã có trong prompt_log.md trước đó.]
</skill>

Assistant:
Mình sẽ dùng lại 3 skill theo thứ tự: `boundary-value-analysis` để sửa analysis đúng bản chất boundary, `test-case-review` để rà lại các BVA test liên quan, rồi `prompt-log` để append entry mới. Mình bắt đầu bằng việc đọc lại skill file và các artifact hiện tại để sửa đúng chỗ, không làm lệch requirement.

Assistant:
Mình thấy đúng vấn đề người dùng nêu: analysis hiện trộn “OFF⁺ = 4 lần sai” với hành vi lúc tài khoản đã khóa, trong khi FR-02 không nói counter có tiếp tục tăng khi khóa. Mình sẽ tách thành boundary của counter ở 2/3 lần sai và boundary hành vi lock-state/time, rồi sửa các test case liên quan cho traceability sạch hơn.

Assistant:
Mình sẽ chỉnh theo hướng bảo thủ hơn: counter chỉ có boundary kiểm thử rõ ở `2` và `3`; phần “thử tiếp trong lúc đã khóa” sẽ được chuyển thành dependent lock-state behavior, không gọi là counter = 4. Các mốc `29/30/31` vẫn giữ, nhưng `30 giây` sẽ được mô tả là transition threshold với rủi ro timing rõ ràng.

Assistant:
Analysis đã được viết lại theo đúng ranh giới: không còn xem `4` là counter boundary. Mình tiếp tục sửa `TC-FR02-BVA-003` để nó là test hành vi trong trạng thái khóa, và bổ sung rõ rủi ro timing cho `TC-FR02-BVA-005`.

Assistant:
Test case liên quan đã được sửa: `TC-FR02-BVA-003` giờ không còn là “4 lần sai”, mà là lock-state behavior phụ thuộc sau ngưỡng 3. Mình cập nhật review để phản ánh lần sửa mới và kiểm lại không còn câu nào tự thêm requirement về counter.

Assistant:
`rg` cho thấy review cũ vẫn còn các dòng “OFF⁺ = 4”, nên mình sẽ thay review bằng bản mới cho lần rà soát này. Nội dung review sẽ ghi rõ finding cũ đã được sửa sâu hơn: bỏ counter=4 và map `TC-FR02-BVA-003` sang `BV-LOCKSTATE-001`.

Assistant:
Review artifact đã được cập nhật. Mình chạy kiểm tra cuối để bắt các cụm cũ còn sót, rồi append log phiên này vào `prompt_log.md`.

Assistant:
Các kiểm tra đã qua: phần còn nhắc `OFF⁺ = 4` chỉ nằm trong bối cảnh “không chọn/đã sửa”, không còn là boundary được test. Mình append log phiên này vào `prompt_log.md` ngay sau entry cũ.
```

### Notes
Log này ghi `conversation context khả dụng` của lượt sửa BVA. Ba khối skill đầy đủ có trong context nhưng đã được rút gọn trong entry này để tránh lặp lại toàn bộ nội dung dài; các artifact sửa đổi nằm trong `analysis/FR-02-login/bva-analysis.md`, `tests/test-cases/FR-02-login/bva/TC-FR02-BVA-003.md`, `tests/test-cases/FR-02-login/bva/TC-FR02-BVA-005.md`, và `reviews/FR-02-login/bva-review.md`.

## Prompt Log Entry - 2026-06-26 19:13:57 +07

### Transcript

```text
User:
$domain-testing
$test-case-review
$prompt-log

Review và sửa:
`analysis/FR-02-login/domain-testing-analysis.md`

Yêu cầu:
- Đổi miền hết khóa thành tại hoặc sau 30 giây; 31 giây chỉ là test data an toàn khi chạy thủ công.
- Tách kiểm tra đăng nhập thành công/nhận JWT khỏi kiểm tra client lưu token và gửi Authorization header nếu cần.
- Giữ rõ các ràng buộc email/password rỗng là điều suy ra, không phải câu đặc tả trực tiếp.
- Review và đồng bộ lại các test case liên quan.

User:
<skill>
<name>domain-testing</name>
<path>/Users/hbn/Documents/CS423-CSC15003-Testing-N08/.agents/skills/domain-testing/SKILL.md</path>
---
name: domain-testing
description: Phân tích yêu cầu chức năng bằng Domain Testing, xây dựng phân vùng tương đương, ma trận miền dữ liệu và sinh test case có khả năng truy vết. Sử dụng khi người dùng yêu cầu áp dụng Domain Testing, Equivalence Partitioning, phân tích miền đầu vào hoặc tạo test case từ requirement.
---

[Nội dung skill domain-testing có trong conversation context khả dụng; không chép lại toàn bộ tại entry này vì khối hướng dẫn dài đã được lưu trong các entry trước của prompt_log.md.]
</skill>

User:
<skill>
<name>prompt-log</name>
<path>/Users/hbn/Documents/CS423-CSC15003-Testing-N08/.agents/skills/prompt-log/SKILL.md</path>
---
name: prompt-log
description: Append a verbatim, unedited transcript of the completed Codex prompt session or available conversation context to prompt_log.md. Use when the user asks to log prompts, save the chat, copy the full conversation exactly after a prompt finishes, preserve AI interaction evidence, or maintain a prompt log for assignment submission.
---

[Nội dung skill prompt-log có trong conversation context khả dụng; không chép lại toàn bộ tại entry này vì khối hướng dẫn dài đã được lưu trong các entry trước của prompt_log.md.]
</skill>

User:
<skill>
<name>test-case-review</name>
<path>/Users/hbn/Documents/CS423-CSC15003-Testing-N08/.agents/skills/test-case-review/SKILL.md</path>
---
name: test-case-review
description: Review QA analysis and generated test case files for black-box testing assignments. Use when Codex must audit Domain Testing or Boundary Value Analysis outputs for concrete test data, observable expected results, traceability, duplicates, invented constraints, Vietnamese format, and readiness before execution.
---

[Nội dung skill test-case-review có trong conversation context khả dụng; không chép lại toàn bộ tại entry này vì khối hướng dẫn dài đã được lưu trong các entry trước của prompt_log.md.]
</skill>

Assistant:
Mình sẽ dùng `domain-testing` để chỉnh analysis đúng miền, rồi `test-case-review` để đồng bộ test case liên quan, cuối cùng `prompt-log` để append log. Trước hết mình đọc lại artifact hiện tại để tìm chính xác các chỗ đang nói “31 giây” như miền hết khóa và token/header bị gộp.

Assistant:
Mình thấy ba điểm cần sửa ngay trong analysis: `EC-LOCK-V02` đang nói “sau ít nhất 31 giây”, `TC-001/009` đang gộp login thành công với lưu/gửi token, và email/password rỗng chưa nhấn đủ là điều kiện suy ra. Mình đọc các test case liên quan để đồng bộ traceability và expected result cho gọn.

Assistant:
Để tách sạch hai mục tiêu, mình sẽ để `TC-FR02-DT-001` chỉ kiểm tra đăng nhập thành công và nhận JWT. Mình sẽ thêm một test riêng `TC-FR02-DT-010` cho client lưu token/gửi `Authorization` header, vì đó là dependency riêng trong FR-02 và có thao tác quan sát khác.

Assistant:
Mình sẽ cập nhật analysis theo hướng: `EC-LOCK-V02` là miền “tại hoặc sau 30 giây”, còn `31 giây` chỉ là dữ liệu test an toàn. Token cũng sẽ tách thành hai class: nhận JWT sau login thành công và client lưu/gửi header trong request xác thực tiếp theo.

Assistant:
Analysis đã có condition mới `COND-FR02-DT-010` và test case mới cho header. Giờ mình chỉnh các test case cũ để mục tiêu không bị chồng: `TC-001` chỉ login/nhận JWT, `TC-009` dùng “tại hoặc sau 30 giây” và nêu 31 giây là dữ liệu an toàn, `TC-002/004` ghi rõ rỗng là điều kiện suy ra.

Assistant:
Mình đã đồng bộ các test case liên quan. Tiếp theo mình rà lại bằng `rg` để bắt các câu cũ còn sót, rồi cập nhật review Domain Testing theo kết quả mới.

Assistant:
Rà nhanh phát hiện một chỉ số nhỏ trong analysis vẫn để `Tổng input/condition = 6` dù đã tách thêm `auth_token_response` và `client_token_storage`. Mình sửa chỉ số đó rồi viết lại review để phản ánh 10 test case và các finding đã xử lý.

Assistant:
Review đã được cập nhật cho 10 test case. Mình chạy kiểm tra cuối để đảm bảo không còn gộp header vào `TC-001`, không còn coi `31 giây` là miền requirement, rồi append log.

Assistant:
Kiểm tra cuối ổn: `TC-001` không còn kiểm tra header, `TC-010` đảm nhận phần lưu/gửi token, và tất cả test case vẫn `Not Run / None`. Mình append prompt log cho lượt sửa này vào `prompt_log.md`.
```

### Notes
Log này ghi `conversation context khả dụng` của lượt sửa Domain Testing. Các khối skill đầy đủ xuất hiện trong context nhưng được rút gọn tại entry này để tránh lặp lại nội dung dài đã lưu ở các entry trước. Artifact đã sửa gồm `analysis/FR-02-login/domain-testing-analysis.md`, các test case `TC-FR02-DT-001`, `TC-FR02-DT-002`, `TC-FR02-DT-004`, `TC-FR02-DT-009`, test case mới `TC-FR02-DT-010`, và `reviews/FR-02-login/domain-testing-review.md`.

## Prompt Log Entry - 2026-06-26 19:45:38 +07

### Transcript

````text
User:
$test-case-review
$prompt-log

Đối chiếu analysis và test case FR-02 hiện tại với:
- `requirements/system-requirements.md`
- `requirements/api-specification.md`

Chỉ bổ sung chi tiết API vào những test case vốn đã kiểm tra hành vi API.
Không tạo lại test case, không đổi mục tiêu kiểm thử, không đổi template và không thêm field hoặc section mới.
Không chuyển test UI thành test API, không tự thêm công cụ kiểm thử.
Nếu API specification không bổ sung thông tin cần thiết cho một file thì giữ nguyên file đó.

Sửa trực tiếp các file thực sự cần thiết và append log vào `prompt_log.md`.

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
Mình sẽ dùng `test-case-review` để đối chiếu artifact FR-02 với requirement/spec, rồi dùng `prompt-log` sau cùng để append transcript. Trước hết mình đọc nhanh cấu trúc file liên quan để chỉ chạm đúng chỗ cần sửa.

Assistant:
Mình đã thấy FR-02 có cả Domain Testing và BVA, cùng một test-run đã tồn tại. Bây giờ mình sẽ đọc requirement/spec và các test case để nhận diện case nào thật sự đang kiểm tra API, tránh biến các case UI thành API.

Assistant:
Spec API cho FR-02 chỉ bổ sung endpoint `POST /api/login`, body JSON, base URL và phản hồi thành công có `token` + `user`. Mình sẽ quét test case hiện tại để tìm đúng những case đã ghi “API”, “POST”, endpoint, response, token hoặc header.

Assistant:
Các analysis có nhắc response/token/header theo mức khái niệm; trong test case, ứng viên cần bổ sung cụ thể nhất là các case đã quan sát JWT/header. Mình đọc nguyên mẫu các file này để sửa đúng phần `Steps`/`Expected Result` hiện có, không thêm field mới.

Assistant:
Mình sẽ sửa tối thiểu: không thêm section, không thêm cột/bảng mới, không thêm test data row mới. API spec chỉ cung cấp chi tiết hữu ích cho login success (`POST http://localhost:3000/api/login`, body `email/password`, response `200 OK` có `token` và `user`) và request xác thực mẫu (`GET /api/users/me` với `Authorization: Bearer <token>`), nên mình chỉ bổ sung những chi tiết đó vào các câu/bước đang quan sát token/header.

Assistant:
Đã sửa xong phần chính. Mình đang rà diff để chắc không lỡ thêm template/field/section mới và không động vào các case invalid vì API spec không nêu thêm status/error cụ thể cho khóa hoặc login sai.

Assistant:
Diff đúng phạm vi: chỉ 2 analysis và 6 test case có sẵn được chỉnh câu chữ. Mình append log ngay bây giờ, sau đó sẽ báo ngắn gọn file nào đã đổi và điểm nào cố ý giữ nguyên.
````

### Notes
Log này ghi `conversation context khả dụng` của lượt đối chiếu FR-02 với `requirements/system-requirements.md` và `requirements/api-specification.md`. Tool call/output chi tiết không được chép toàn bộ vào transcript này; các thao tác chính khả dụng trong context gồm đọc skill, đọc requirement/spec, quét FR-02 bằng `rg`, xem diff bằng `git diff`, sửa bằng `apply_patch`, và append entry này.
