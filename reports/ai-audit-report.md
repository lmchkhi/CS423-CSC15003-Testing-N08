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

## Entry #6

### (1) Prompt + Tool

| Field             | Content                    |
| ----------------- | -------------------------- |
| **Tool**          | Codex                      |
| **Timestamp**     | 28/07/2026 22:44 GMT+7     |
| **Artifact type** | Agent skill cập nhật        |

**Full prompt:**

```text
dòng 
- `reports/gui-task1-summary.md`: tổng kết thực thi và ghi chú AI/human-review.
trong skills/generate-gui-checklist-eshop/SKILL.md sửa lại là trình bày chi tiết vào main-report.md luôn thay vì viết ra file đó
```

### (2) AI Output

```text
AI đã cập nhật `skills/generate-gui-checklist-eshop/SKILL.md`:

- Trong bước `Tổng kết Task 1`, đổi yêu cầu từ báo cáo summary riêng sang trình bày chi tiết trong `reports/main-report.md`.
- Trong section `File Đầu Ra`, thay dòng `reports/gui-task1-summary.md` bằng:
  `reports/main-report.md`: trình bày chi tiết Task 1, gồm phạm vi, quy trình tạo checklist, kết quả thực thi, ghi chú AI/human-review, bug summary và kết luận black-box.
- Kiểm tra lại không còn nhắc `gui-task1-summary`.
- Chạy validate skill: `Skill is valid!`.
- Thêm Entry #6 vào `reports/ai-audit-report.md` cho lượt chỉnh sửa này.
```

## Entry #7

### (1) Prompt + Tool

| Field             | Content                    |
| ----------------- | -------------------------- |
| **Tool**          | Codex                      |
| **Timestamp**     | 28/07/2026 22:56 GMT+7     |
| **Artifact type** | GUI checklist draft         |

**Full prompt:**

```text
dựa vào skill generate-gui-checklist-eshop, giúp tôi tạo checklist cho các screen admin login, admin dashboard, category management, product management, csv product import, user management. Lưu ý chỉ cần tạo checklist, chưa cần test, sau khi tạo checklist xong tôi sẽ xem xét và bổ sung, chỉnh sửa nếu cần
```

### (2) AI Output

```text
AI đã dùng skill `generate-gui-checklist-eshop` để tạo checklist thiết kế cho các màn hình admin được yêu cầu:

- Đã đọc `skills/generate-gui-checklist-eshop/SKILL.md`, reference workflow, checklist template, `SystemRequirementsSpecification.md`, `api_specification.md` và phần Task 1 trong `HW03-GUI&Usability.md`.
- Không đọc các thư mục mã nguồn bị cấm: `backend/`, `frontend-admin/`, `frontend-web/`, `frontend-mobile/`.
- Tạo file `reports/gui-checklist.md`.
- Checklist gồm 66 item cho các screen:
  - Admin Login
  - Admin Dashboard
  - Category Management
  - Product Management
  - CSV Product Import
  - User Management
- Checklist phủ đủ 4 IA:
  - IA-01: 23 item
  - IA-02: 14 item
  - IA-03: 10 item
  - IA-04: 19 item
- Checklist phủ đủ 8 Category:
  - Visual, Functional, Validation, Usability, Responsive, Compatibility, Accessibility, Feedback
- Vì người dùng chỉ yêu cầu tạo checklist và chưa test, toàn bộ `Result` được để là `Not Run`; `Screenshot` và `Bug ID` để trống.
- Chưa tạo bug report vì chưa có failed item.
```

## Entry #8

### (1) Prompt + Tool

| Field             | Content                              |
| ----------------- | ------------------------------------ |
| **Tool**          | Codex                                |
| **Timestamp**     | 28/07/2026 23:45 GMT+7               |
| **Artifact type** | GUI checklist human-review additions |

**Full prompt:**

```text
sau đây là các item mà tôi muốn thêm vào gui-checklist.md và lý do AI miss. hãy tạo thêm 1 table riêng cho phần này, cấu trúc tương tự table cũ nhưng thêm cột Why the AI missed it:

item: Sau 3 lần đăng nhập sai liên tiếp, giao diện hiển thị thông báo tài khoản bị khóa trong 30 giây và không cho phép tiếp tục đăng nhập cho đến khi hết thời gian khóa.
lý do: AI chủ yếu sinh checklist cho các thành phần giao diện phổ biến (form, validation, navigation) nhưng bỏ sót business state đặc thù được mô tả trong SRS. Prompt cũng tập trung vào GUI nên AI không liên hệ yêu cầu khóa tài khoản với trạng thái giao diện.

item: Trường Email sử dụng HTML5 type="email" để hỗ trợ kiểm tra định dạng email ngay trên trình duyệt.
lý do: AI chỉ kiểm tra hành vi "email hợp lệ" mà bỏ qua chi tiết triển khai GUI được quy định trong đặc tả (HTML input type). Đây là hạn chế khi AI thường tổng quát hóa thay vì bám sát từng yêu cầu kỹ thuật trong SRS.

item: Các nút hành động tích cực (Save, Add, Submit, Import...) sử dụng màu xanh dương nhất quán; các nút thao tác nguy hiểm (Delete, Remove...) sử dụng màu đỏ nhất quán trên toàn bộ giao diện.
lý do: AI tập trung vào chức năng và khả năng sử dụng của giao diện nhưng ít chú ý đến design consistency được quy định cụ thể trong GUI Standards. Điều này thường xảy ra khi prompt ưu tiên chức năng hơn là quy chuẩn thiết kế.

item: File CSV có các trường chứa dấu phẩy được bao trong dấu ngoặc kép (RFC 4180) vẫn được đọc và xử lý chính xác.
lý do: AI chỉ sinh các kiểm tra CSV phổ biến (đuôi .csv, header, trường bắt buộc) mà bỏ sót chuẩn RFC 4180 vì đây là yêu cầu đặc thù của hệ thống, không phải checklist GUI phổ biến.

item: Tất cả hình ảnh sản phẩm đều có thuộc tính alt mô tả nội dung ảnh và không để trống.
lý do: AI đã tạo một số mục Accessibility (Tab Order, Keyboard Navigation) nhưng bỏ sót khả năng truy cập đối với hình ảnh. Đây là một yêu cầu accessibility thường bị AI bỏ qua nếu prompt không nhấn mạnh việc kiểm thử theo tiêu chuẩn truy cập (accessibility).
```

### (2) AI Output

```text
AI đã cập nhật `reports/gui-checklist.md`:

- Thêm section `Human Review Additions`.
- Tạo bảng riêng với cấu trúc giống checklist chính và thêm cột `Why the AI missed it`.
- Thêm 5 item người học bổ sung với ID `HR-GUI-001` đến `HR-GUI-005`.
- Mỗi item được ánh xạ IA, Screen, Category, Expected result, origin, Result, Notes, Screenshot, Bug ID.
- Tất cả item mới để `Result = Not Run` vì chưa thực thi test.
- `Screenshot` và `Bug ID` để trống vì chưa có failed item.
- Kiểm tra bảng mới có 5 dòng human-review và đủ số cột.
- Thêm Entry #8 vào `reports/ai-audit-report.md` cho lượt cập nhật này.
```
