# AI Audit Report (AI-02)

## Thông tin sinh viên

## 1. Thông tin Sinh viên

| Mục                     | Giá trị                 |
| :---------------------- | :---------------------- |
| **Họ tên sinh viên:**   | Ngô Hồng Thanh              |
| **MSSV:**               | 23127475              |
| **Lớp / Khoá:**         | CS423 / CSC13003              |
| **Mã bài tập :**        | HW03                    |
| **Công cụ AI đã dùng:** | Codex                   |

## Entry #1

### (1) Prompt + Tool

| Field             | Content                                      |
| ----------------- | -------------------------------------------- |
| **Tool**          | Codex                                        |
| **Timestamp**     | 28/07/2026 20:34 GMT+7                       |
| **Artifact type** | Agent skill cập nhật + AI audit report entry |

**Full prompt:**

```text
skill đó dùng để tự động ghi như ghi log cho mỗi lần chat luôn chứ không phải khi nào tôi yêu cầu mới ghi
```

### (2) AI Output

```text
Đã cập nhật skill `write-ai-audit-report` để hoạt động như audit logger tự động cho các lượt chat/tác vụ phục vụ bài nộp:

- Sửa `skills/write-ai-audit-report/SKILL.md`:
  - Mở rộng description để trigger implicit sau mỗi lượt có tương tác AI đáng ghi nhận.
  - Thêm quy tắc xác định lượt cần ghi audit.
  - Thêm bước ghi audit tự động trước final khi có tạo/sửa artifact, tạo checklist/report/bug report, chạy validate/test hoặc phân tích phục vụ bài nộp.
  - Ghi rõ skill không phải daemon nền độc lập; mức tự động phụ thuộc vào việc skill được nạp/trigger trong Codex.

- Sửa `skills/write-ai-audit-report/agents/openai.yaml`:
  - Cập nhật short description/default prompt theo hướng audit logger tự động.
  - Thêm `policy.allow_implicit_invocation: true`.

- Chạy validate:
  - Lần đầu validator báo lỗi YAML do dấu hai chấm trong frontmatter description.
  - Đã quote description và chạy lại thành công: `Skill is valid!`.

- Cập nhật `reports/ai-audit-report.md`:
  - Tạo header thông tin sinh viên với placeholder để người học tự sửa sau.
  - Thêm Entry #1 cho chính lượt cập nhật skill này.
```

## Entry #2

### (1) Prompt + Tool

| Field             | Content                           |
| ----------------- | --------------------------------- |
| **Tool**          | Codex                             |
| **Timestamp**     | 28/07/2026 20:41 GMT+7            |
| **Artifact type** | Hỏi đáp về quy trình GUI checklist |

**Full prompt:**

```text
khi dùng skill để tạo checklist thì có cần chạy backend, frontend sẵn rồi AI mở web lên để xem và tạo checklist không
```

### (2) AI Output

```text
AI trả lời rằng không bắt buộc chạy backend/frontend để thiết kế checklist ban đầu.

Phân tách thành 2 pha:

1. Design checklist:
   - Chỉ cần đọc `HW03-GUI&Usability.md`, `SystemRequirementsSpecification.md`, `api_specification.md`, `GUI_Testing.html`.
   - Không cần chạy backend/frontend.
   - Checklist ở pha này nên để `Result = Not Run`.
   - Đây là checklist dựa trên requirement, GUI principle, component/state/category.

2. Execute checklist:
   - Khi thực thi mới cần chạy backend/frontend để mở web, thao tác như user thật, quan sát UI và chụp screenshot failed item.
   - Khi execute mới điền `Pass/Fail`, `Notes`, `Screenshot`, `Bug ID`.
   - Nếu `Fail` thì tạo bug report trong `bug-reports/`.

Kết luận: tạo checklist chưa cần chạy app; chạy app chỉ cần khi thực thi checklist và ghi evidence.
```

## Entry #3

### (1) Prompt + Tool

| Field             | Content                 |
| ----------------- | ----------------------- |
| **Tool**          | Codex                   |
| **Timestamp**     | 28/07/2026 20:41 GMT+7  |
| **Artifact type** | AI audit report cập nhật |

**Full prompt:**

```text
ghi vào ai audit report luôn đi, mọi tin nhắn đều ghi lại vào đó cho tôi
```

### (2) AI Output

```text
AI cập nhật `reports/ai-audit-report.md` để ghi lại các lượt chat gần nhất:

- Thêm Entry #2 cho câu hỏi và câu trả lời về việc có cần chạy backend/frontend khi dùng skill tạo GUI checklist.
- Thêm Entry #3 cho yêu cầu ghi mọi tin nhắn vào AI Audit Report.
- Sửa lại thứ tự Markdown để mỗi entry có đủ `Prompt + Tool` và `AI Output`.
- Giữ nguyên phần thông tin sinh viên ở dạng placeholder để người học tự sửa sau.

AI cũng xác nhận từ các lượt sau, trong phạm vi phiên Codex còn được gọi và skill/ghi log được áp dụng, sẽ tiếp tục append entry vào `reports/ai-audit-report.md`.
```

## Entry #4

### (1) Prompt + Tool

| Field             | Content                            |
| ----------------- | ---------------------------------- |
| **Tool**          | Codex                              |
| **Timestamp**     | 28/07/2026 20:43 GMT+7             |
| **Artifact type** | Agent skill cập nhật + audit logger |

**Full prompt:**

```text
chỉnh sửa lại skill skills/generate-gui-checklist-eshop để ghi lại mọi tin nhắn đi
```

### (2) AI Output

```text
AI đã cập nhật skill `skills/generate-gui-checklist-eshop` để tự ghi audit cho mọi tin nhắn/tương tác liên quan đến GUI checklist:

- Sửa `skills/generate-gui-checklist-eshop/SKILL.md`:
  - Mở rộng description để nêu rõ skill vừa tạo/thực thi checklist vừa append audit vào `reports/ai-audit-report.md`.
  - Thêm `reports/ai-audit-report.md` và `skills/write-ai-audit-report/SKILL.md` vào đầu vào cần dùng khi ghi audit.
  - Thêm bước `Ghi AI Audit Report cho mọi tin nhắn liên quan`.
  - Quy định trước final phải append entry audit cho lượt hiện tại.
  - Yêu cầu ghi cả hỏi đáp chuẩn bị, chỉnh skill/template, validate/test, checklist execution và bug report.

- Sửa `skills/generate-gui-checklist-eshop/references/hw03-task1-gui-workflow.md`:
  - Thêm yêu cầu mọi tin nhắn/tương tác AI liên quan đến Task 1 phải ghi vào `reports/ai-audit-report.md`.
  - Thêm section `Ghi AI Audit Report` với format entry và nội dung cần ghi.

- Sửa `skills/generate-gui-checklist-eshop/agents/openai.yaml`:
  - Cập nhật short description/default prompt theo hướng vừa tạo checklist vừa ghi audit.
  - Thêm `policy.allow_implicit_invocation: true`.

- Chạy validate skill:
  - `Skill is valid!`

- Cập nhật `reports/ai-audit-report.md`:
  - Thêm Entry #4 cho lượt chỉnh sửa skill này.
```

## Entry #5

### (1) Prompt + Tool

| Field             | Content                         |
| ----------------- | ------------------------------- |
| **Tool**          | Codex                           |
| **Timestamp**     | 28/07/2026 20:50 GMT+7          |
| **Artifact type** | AI audit report cập nhật timezone |

**Full prompt:**

```text
Timestamp trong ai audit report đang không phải giờ Việt Nam, sửa lại thành giờ Việt Nam giúp tôi
```

### (2) AI Output

```text
AI đã cập nhật `reports/ai-audit-report.md` để dùng giờ Việt Nam:

- Đổi timestamp Entry #1 sang `28/07/2026 20:34 GMT+7`.
- Đổi timestamp Entry #2 sang `28/07/2026 20:41 GMT+7`.
- Đổi timestamp Entry #3 sang `28/07/2026 20:41 GMT+7`.
- Đổi timestamp Entry #4 sang `28/07/2026 20:43 GMT+7`.
- Thêm Entry #5 cho chính yêu cầu chỉnh timezone này.
- Giữ nguyên thông tin sinh viên người học đã điền trong report.
```
