# AI Audit Report (AI-02)

## Thông tin sinh viên

## 1. Thông tin Sinh viên

| Mục                     | Giá trị                 |
| :---------------------- | :---------------------- |
| **Họ tên sinh viên:**   | Lâm Vĩ Khang            |
| **MSSV:**               | 23127062                |
| **Lớp / Khoá:**         | CS423 / CSC13003        |
| **Mã bài tập :**        | HW03                    |
| **Ngày làm bài:**       | 24-07-2026 - ../07/2026 |
| **Công cụ AI đã dùng:** | Claude                  |

## Entry #1

### (1) Prompt + Tool

| Field             | Content                                             |
| ----------------- | --------------------------------------------------- |
| **Tool**          | Codex (GPT 5.6 Sol Medium)                          |
| **Timestamp**     | 24/07/2026 13:49:32 (UTC+7)                         |
| **Artifact type** | Tạo agent skill sinh checklist GUI cho yêu cầu HW03 |

**Full prompt:**

```
Dựa vào yêu cầu cho HW3, giúp tôi tạo một agent skills cho việc tạo một gui checklist khi người dùng input một list các screens trong app (một trong số đó có thể là primary screen và còn lại sẽ là supporting screens).
Gui checklist đó cần có hơn 40 items và phủ toàn bộ 4 interface aspects của app: IA-01 đến IA-04.
Bỏ nó vào folder skills trong project.
Tạo skills bằng tiếng anh nhưng output của agent khi tạo gui checklist là tiếng việt.
```

### (2) AI Output

'''
Mình sẽ dùng skill `skill-creator` để tạo đúng cấu trúc agent skill, đồng thời đọc yêu cầu HW3 trong project để checklist bám sát IA-01 đến IA-04. Phần hướng dẫn skill sẽ viết bằng tiếng Anh, còn đầu ra checklist được quy định bằng tiếng Việt.

Tài liệu yêu cầu chính là PDF, nên mình sẽ áp dụng thêm skill `pdf` để trích xuất và kiểm tra chính xác định nghĩa IA-01…IA-04 trước khi viết rubric cho checklist. Việc này quyết định trực tiếp số lượng và cách phân bổ các mục kiểm tra.

Mình đã xác nhận yêu cầu cốt lõi: checklist phải có trên 40 mục, bao phủ đủ 4 IA, sau đó mới được thực thi Passed/Failed; ảnh chỉ bắt buộc cho mục Failed. Skill sẽ tạo baseline có thể kiểm thử, phân bổ sâu hơn cho primary screen, không tự bịa kết quả thực thi hay coi các mục AI tạo là “mục sinh viên tự bổ sung”.

Skill đã được tạo với target mặc định 48 mục (12 mục mỗi IA), hard minimum vẫn đảm bảo tổng >40, và có quality gate để tránh checklist lặp hoặc mơ hồ. Theo quy trình `skill-creator`, mình sẽ validate cấu trúc rồi forward-test bằng một yêu cầu mẫu để kiểm tra skill có thật sự tạo đầu ra tiếng Việt, đúng phân vai primary/supporting và đủ coverage hay không.

Validator chính thức đang thiếu dependency `PyYAML` trong cả Python hệ thống lẫn runtime đi kèm. Mình sẽ cài dependency này vào thư mục tạm (không sửa môi trường project) để chạy đúng validator của `skill-creator`, rồi tiếp tục forward-test.

Validation chính thức đã pass (`Skill is valid!`). Forward-test đang tạo đủ checklist mẫu nên mất thêm một chút thời gian; mình đang kiểm tra đặc biệt các lỗi dễ gặp: đếm sai 48 dòng, IA-02 bị ép vào màn hình không có form, và trạng thái bị gán Passed/Failed khi chưa chạy SUT.

Bản thử đang mất thời gian chủ yếu vì agent kiểm tra cả requirements lẫn source UI trước khi sinh 48 dòng, đúng với thiết kế của skill. Mình đã yêu cầu nó chốt ngắn gọn ngoài bảng và báo rõ số dòng theo từng IA/màn hình để có thể đối chiếu tự động bằng mắt.

Forward-test đã đạt các tiêu chí chính: 48 mục, 12 mục/IA, Checkout sâu hơn từng supporting screen, toàn bộ output tiếng Việt và không bịa Passed/Failed. Nó cũng lộ ra một điểm cần siết: có thể suy diễn hành vi chuẩn hóa coupon (`save10` → `SAVE10`) dù SRS không quy định. Mình sẽ bổ sung guardrail để các hành vi chưa được đặc tả chỉ được ghi như heuristic có nêu giả định, không biến thành yêu cầu giả.

Đã tạo agent skill tại:

- [SKILL.md](/Users/lvkhang/Documents/uni/software-testing/HW3/skills/generate-gui-checklist/SKILL.md)
- [IA coverage guide](/Users/lvkhang/Documents/uni/software-testing/HW3/skills/generate-gui-checklist/references/ia-coverage-guide.md)
- [Agent metadata](/Users/lvkhang/Documents/uni/software-testing/HW3/skills/generate-gui-checklist/agents/openai.yaml)

Skill `$generate-gui-checklist`:

- Nhận danh sách primary/supporting screens.
- Tạo mặc định 48 mục, bao phủ IA-01 đến IA-04.
- Ưu tiên coverage sâu hơn cho primary screen.
- Viết hướng dẫn bằng tiếng Anh nhưng checklist đầu ra bằng tiếng Việt.
- Không tự gán Passed/Failed khi chưa thực thi.
- Phân biệt yêu cầu SRS và GUI heuristic chưa được đặc tả.
- Có phần gợi ý để sinh viên tự phản biện và bổ sung các mục AI bỏ sót.
- Đã qua validator chính thức và forward-test thành công với Checkout, Cart, Product Detail và Login.
  '''

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

- Yêu cầu đề bài định nghĩa IA-01 đến IA-04 một cách độc lập, nhưng skill lại liên kết chúng với các requirements FR-21, FR-22, FR-23, FR-24. Điều này có thể dẫn đến việc bỏ sót các hành vi cần kiểm tra nếu chúng không được nêu trong các yêu cầu đó.

### (5) Student Fix

- Bỏ việc liên kết IA-01 đến IA-04 với các yêu cầu FR-21, FR-22, FR-23, FR-24.
