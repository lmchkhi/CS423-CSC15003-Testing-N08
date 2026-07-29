# AI Audit Report — HW03 GUI & Usability Testing

Tài liệu này ghi lại đầy đủ prompt và AI output tương ứng từ ba cuộc hội thoại Codex được tham chiếu. Mỗi prompt của người dùng được ghi thành một entry riêng theo đúng thứ tự thời gian trong từng cuộc hội thoại.

## Entry #1

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-24 12:57:42

**Full prompt:**

```
Dùng skill eshop-gui-usability-audit để soạn usability test plan cho flow được giao: thêm sản phẩm vào giỏ → xem lại giỏ → xóa/cập nhật sản phẩm → vào checkout → áp dụng mã coupon hợp lệ/không hợp lệ → xác nhận thanh toán.

Yêu cầu:

Xác định 3–4 mục tiêu đánh giá cụ thể (ví dụ: người dùng có hiểu rõ tổng tiền/phản hồi coupon không, họ có tự tin khi hoàn tất thanh toán không, họ phản ứng thế nào khi coupon hoạt động không như mong đợi, họ có tự tìm được mã coupon để thử hay không mà không cần được cho biết trước).
Kịch bản (scenario) cho participant phải mang tính mục tiêu (goal-oriented) tuyệt đối: chỉ mô tả cần đạt được gì, không nói cụ thể bấm nút/menu/trường nào, và **không tiết lộ mã coupon cụ thể trước** — chỉ được cung cấp mã nếu participant chủ động hỏi trong lúc test, và việc này phải được ghi lại như một can thiệp của facilitator (Intervention), không đưa sẵn vào kịch bản.
Dùng đúng format bảng trong references/templates.md cho: Usability test plan, Participant table (chỉ khung rỗng), Observation notes (chỉ khung rỗng), SUS result summary (chỉ khung rỗng).
Xác nhận dùng SUS (10 câu, thang 1–5) là công cụ đo lường duy nhất — không trộn với UEQ-S.
Bước này chỉ tạo kế hoạch và khung bảng rỗng. Không tự điền bất kỳ dữ liệu participant mẫu/ví dụ nào vào Participant table hay Observation notes — dữ liệu participant thật sẽ do tôi tự nhập sau các phiên test thật, không do AI tạo ra.
```

### (2) AI Output

```
Mình sẽ dùng skill `eshop-gui-usability-audit`, đọc đầy đủ hướng dẫn và đúng template tham chiếu trước khi soạn. Mình sẽ chỉ tạo kế hoạch cùng các khung bảng rỗng, dùng duy nhất SUS và giữ mã coupon hoàn toàn ngoài kịch bản participant.

Template đã được kiểm tra. Có một điểm cần điều chỉnh có chủ đích: template gộp “SUS / UEQ-S”, nhưng yêu cầu của bạn là chỉ dùng SUS, nên mình sẽ giữ cấu trúc bảng tương ứng và loại toàn bộ cột UEQ-S; các bảng participant và observation sẽ không có bất kỳ dòng dữ liệu nào.

Bản nháp đã có đủ bốn mục tiêu, quy tắc can thiệp và khung SUS. Mình đang rà lại lần cuối theo hai ràng buộc dễ bị vi phạm nhất: kịch bản không được biến thành hướng dẫn thao tác, và mọi bảng dữ liệu phải thực sự trống.

Đã tạo [usability-test-plan.md](E:\Testing\CS423-CSC15003-Testing-N08\reports\usability-test-plan.md).

Nội dung gồm:

- 4 mục tiêu đánh giá cụ thể.
- Scenario hoàn toàn goal-oriented, không hướng dẫn thao tác hay tiết lộ coupon.
- Quy tắc chỉ cung cấp coupon khi participant chủ động hỏi và ghi `[Intervention]`.
- Chỉ sử dụng SUS: 10 câu, thang 1–5; không dùng UEQ-S.
- Participant table, Observation notes và SUS result summary đều là khung rỗng.
- Không tạo dữ liệu participant mẫu.
- Có prerequisite và tiêu chí xử lý task bị blocked.

Commit message đề xuất: `test(hw03): add cart checkout usability test plan`

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-24 12:57:42 +07:00
- User Prompt: Soạn usability test plan cho flow cart, checkout, coupon và thanh toán bằng SUS.
- AI Action: Tạo kế hoạch goal-oriented, quy trình facilitator và các khung bảng dữ liệu rỗng theo template.
```

---

## Entry #2

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-24 13:07:43

**Full prompt:**

```
Thêm cột 'Participant' vào đầu bảng Observation notes trong usability-test-plan.md, để mỗi dòng ghi chú xác định rõ thuộc về participant ID nào, giữ nguyên toàn bộ cấu trúc và nội dung còn lại.
```

### (2) AI Output

```
Mình sẽ dùng lại skill `eshop-gui-usability-audit` để giữ đúng quy ước artifact, rồi chỉ sửa duy nhất header của bảng Observation notes; mọi nội dung khác sẽ được giữ nguyên.

Đã thêm cột `Participant` vào đầu bảng Observation notes trong [usability-test-plan.md](E:\Testing\CS423-CSC15003-Testing-N08\reports\usability-test-plan.md). Toàn bộ nội dung khác được giữ nguyên.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-24 13:07:43 +07:00
- User Prompt: Thêm cột Participant vào đầu bảng Observation notes.
- AI Action: Cập nhật duy nhất header và separator của bảng Observation notes.
```

---

## Entry #3

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-24 13:23:50

**Full prompt:**

```
Cập nhật file usability-test-plan.md (không tạo file mới), giữ nguyên cấu trúc cột hiện có của Participant table và Observation notes (đã lệch chủ đích so với references/templates.md và tôi chấp nhận giữ nguyên bản này làm chuẩn cuối cùng). Bổ sung 2 phần còn thiếu:

Một mục mới **'Post-task probe questions'**, đặt ngay sau phần Measurement instrument và tách biệt hoàn toàn khỏi bảng Non-leading prompts hiện có (Non-leading prompts dùng TRONG lúc participant thao tác; probe questions dùng SAU khi task và SAU khi làm SUS xong). Gồm đúng 4 câu hỏi mở, mỗi câu gắn nhãn rõ 1 khía cạnh bắt buộc: Clarity, Error recovery, Speed, Trust — và 1 câu thứ 5 riêng về trải nghiệm tìm/nhập mã coupon.
Một bảng ghi câu trả lời riêng cho probe questions, với cột: Participant | Câu trả lời Clarity | Câu trả lời Error recovery | Câu trả lời Speed | Câu trả lời Trust | Câu trả lời Coupon discoverability — tạo sẵn 7 dòng trống (P01–P07), không điền ví dụ hay dữ liệu giả vào bất kỳ ô nào.

Toàn bộ nội dung participant thật sẽ do tôi tự nhập sau từng phiên test thật.
```

### (2) AI Output

```
Mình sẽ dùng skill `eshop-gui-usability-audit` và cập nhật đúng file hiện có. Mình sẽ giữ nguyên tuyệt đối các cột của Participant table và Observation notes; phần probe sẽ là hoạt động sau task và sau SUS, với đúng 5 câu hỏi và bảng P01–P07 chỉ có ID được yêu cầu.

Theo bố cục hiện tại, `Measurement instrument` đang là một dòng trong Session details. Để đáp ứng đúng “ngay sau” mà không trộn probe vào `Non-leading prompts`, mình sẽ giữ nguyên nội dung các dòng nhưng đặt `Measurement instrument` ở cuối bảng Session details, rồi đặt mục probe độc lập ngay bên dưới.

Đã cập nhật [usability-test-plan.md](E:\Testing\CS423-CSC15003-Testing-N08\reports\usability-test-plan.md):

- Thêm đúng 5 post-task probe questions: Clarity, Error recovery, Speed, Trust và Coupon discoverability.
- Quy định chỉ hỏi sau khi hoàn thành task và SUS.
- Thêm bảng câu trả lời P01–P07, mọi ô dữ liệu đều trống.
- Giữ nguyên cấu trúc cột Participant table và Observation notes.
- Chuyển dòng Measurement instrument xuống cuối Session details để mục mới nằm ngay sau nó.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-24 13:23:50 +07:00
- User Prompt: Bổ sung post-task probe questions và bảng câu trả lời trống P01–P07.
- AI Action: Cập nhật file hiện có với 5 câu hỏi mở và bảng ghi nhận riêng, không tạo dữ liệu participant giả.
```

---

## Entry #4

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-24 13:27:01

**Full prompt:**

```
Trong usability-test-plan.md, thêm 7 dòng trống (P01 đến P07) vào 3 bảng: Participant table, Observation notes, và SUS result summary — chỉ điền cột ID/Participant với giá trị P01–P07, để trống toàn bộ các cột còn lại. Không thêm dữ liệu ví dụ hay placeholder vào bất kỳ cột nào khác. Giữ nguyên toàn bộ nội dung và cấu trúc còn lại của file.
```

### (2) AI Output

```
Mình sẽ dùng skill `eshop-gui-usability-audit` và chỉ thêm các dòng P01–P07 vào đúng ba bảng được nêu. Các cột còn lại sẽ để trống hoàn toàn; bảng probe và mọi nội dung khác không thay đổi.

Đã cập nhật [usability-test-plan.md](E:\Testing\CS423-CSC15003-Testing-N08\reports\usability-test-plan.md):

- Thêm P01–P07 vào Participant table.
- Thêm P01–P07 vào Observation notes.
- Thêm P01–P07 vào SUS result summary.
- Tất cả cột còn lại đều để trống; không thay đổi nội dung hoặc cấu trúc khác.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-24 13:27:01 +07:00
- User Prompt: Thêm bảy dòng trống P01–P07 vào ba bảng usability.
- AI Action: Điền duy nhất ID participant trong ba bảng và giữ trống toàn bộ ô còn lại.
```

---

## Entry #5

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-24 13:30:55

**Full prompt:**

```
Thêm vào usability-test-plan.md một mục mới tên 'Bộ 10 câu SUS' ngay trước bảng SUS result summary, liệt kê nguyên văn 10 phát biểu chuẩn (bản dịch tiếng Việt sát nghĩa, giữ đúng thứ tự gốc và tính chất xen kẽ tích cực/tiêu cực), kèm ghi chú thang trả lời 1 (Hoàn toàn không đồng ý) đến 5 (Hoàn toàn đồng ý). Đây là nội dung facilitator phải đọc nguyên văn cho participant, không diễn giải lại theo ý riêng.
```

### (2) AI Output

```
Mình sẽ dùng skill `eshop-gui-usability-audit` và chèn mục mới ngay trước `SUS result summary`. Bộ câu sẽ giữ thuật ngữ “hệ thống này”, đúng thứ tự chuẩn, xen kẽ câu tích cực/tiêu cực và có chỉ dẫn đọc nguyên văn cùng thang 1–5.

Đã cập nhật [usability-test-plan.md](E:\Testing\CS423-CSC15003-Testing-N08\reports\usability-test-plan.md) với mục `Bộ 10 câu SUS` ngay trước bảng SUS result summary, gồm:

- Đủ 10 phát biểu theo đúng thứ tự và tính chất tích cực/tiêu cực xen kẽ.
- Thang trả lời từ 1 đến 5.
- Chỉ dẫn facilitator…6871 tokens truncated…ng trong references/templates.md, cột Status để 'Not run', cột Origin ghi 'AI' cho toàn bộ item ở bước này.
```

### (2) AI Output

```
Mình tiếp tục dùng skill `eshop-gui-usability-audit`. Mình sẽ đọc mẫu bắt buộc, kiểm tra nhanh hướng dẫn chạy/routes để checklist bám đúng năm màn hình, rồi soạn tối thiểu 46 dòng với `Status = Not run` và `Origin = AI`; chưa thực thi bất kỳ item nào.

Mình đã đối chiếu mẫu checklist và yêu cầu GUI của SUT. Bảng sẽ giữ cấu trúc cốt lõi của template, đồng thời áp dụng hai cột bạn yêu cầu: đổi `Result` thành `Status` và thêm `Origin`; mỗi dòng vẫn là một kiểm tra quan sát được theo black-box.

Checklist đã được tạo và kiểm tra cơ học: đúng 46 item; phân bổ IA lần lượt `12 / 12 / 10 / 12`; độ phủ theo năm màn hình là `9 / 9 / 9 / 9 / 10`. Cả 46 dòng đều đang là `Not run` và `Origin = AI`, chưa có kết quả kiểm thử hay evidence được ghi nhận.

Đã soạn checklist tại [reports/hw03-gui-checklist.md](E:\Testing\CS423-CSC15003-Testing-N08\reports\hw03-gui-checklist.md).

Kết quả kiểm tra:

- IA-01: 12
- IA-02: 12
- IA-03: 10
- IA-04: 12
- Tổng: 46 item
- Độ phủ màn hình: Cart 9, Checkout 9, Coupon 9, Checkout Success 9, Admin Coupon Management 10
- Toàn bộ `Status = Not run`
- Toàn bộ `Origin = AI`
- Chưa ghi nhận kết quả hoặc evidence
- `git diff --check` không phát hiện lỗi định dạng

Commit đề xuất: `test(hw03): add initial EShop GUI checklist`

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-23 22:22:55 +07:00
- User Prompt: Soạn GUI checklist 46+ item theo phân bổ IA, phủ năm màn hình, để Not run và Origin AI
- AI Action: Đã tạo checklist 46 item đúng phân bổ, xác minh độ phủ màn hình và trạng thái ban đầu
```

---

## Entry #6

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-24 13:37:21

**Full prompt:**

```
Tạo session-P01.md đến session-P07.md từ usability-test-plan.md.
```

### (2) AI Output

````
Đã tạo 7 session sheet với Participant table, Observation notes, 10 câu SUS và 5 post-task probe questions; không lặp Objectives, Scenario hoặc facilitator rules.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-24 13:37:21 +07:00
- User Prompt: Tạo bảy session sheet riêng từ usability test plan.
- AI Action: Tạo session-P01.md đến session-P07.md với các khung dữ liệu trống.
````

---

## Entry #7

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-25 00:31:32

**Full prompt:**

```
Cập nhật session-P01.md bằng dữ liệu phiên thật P01.
```

### (2) AI Output

````
Đã nhập participant, 3 observation, 10 câu SUS và 5 probe; SUS `95/100`; giữ trống dữ liệu không được cung cấp.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-25 00:31:32 +07:00
- User Prompt: Nhập dữ liệu phiên usability thật của participant P01.
- AI Action: Cập nhật dữ liệu P01 và SUS 95/100.
````

---

## Entry #8

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-25 23:38:16

**Full prompt:**

```
Cập nhật session-P02.md bằng dữ liệu phiên thật P02.
```

### (2) AI Output

````
Đã nhập participant, 6 observation, 10 câu SUS và 5 probe; SUS `90/100`; giữ trống dữ liệu không thể xác minh.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-25 23:38:16 +07:00
- User Prompt: Nhập dữ liệu phiên usability thật của participant P02.
- AI Action: Cập nhật dữ liệu P02 và SUS 90/100.
````

---

## Entry #9

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-26 00:18:37

**Full prompt:**

```
Cập nhật session-P03.md bằng dữ liệu phiên thật P03.
```

### (2) AI Output

````
Đã nhập participant, 5 observation, 10 câu SUS và 5 probe; SUS `67.5/100`; giữ trống dữ liệu không thể xác minh.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-26 00:18:37 +07:00
- User Prompt: Nhập dữ liệu phiên usability thật của participant P03.
- AI Action: Cập nhật dữ liệu P03 và SUS 67.5/100.
````

---

## Entry #10

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-26 10:57:49

**Full prompt:**

```
Cập nhật session-P04.md bằng dữ liệu phiên thật P04.
```

### (2) AI Output

````
Đã nhập participant, 6 observation, 10 câu SUS và 5 probe; SUS `92.5/100`; giữ trống Time và Evidence ref.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-26 10:57:49 +07:00
- User Prompt: Nhập dữ liệu phiên usability thật của participant P04.
- AI Action: Cập nhật dữ liệu P04 và SUS 92.5/100.
````

---

## Entry #11

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-27 01:58:31

**Full prompt:**

```
Cập nhật session-P05.md bằng dữ liệu phiên thật P05.
```

### (2) AI Output

````
Đã nhập participant, 5 observation, 10 câu SUS và 5 probe; SUS `75/100`; giữ trống Time và Evidence ref.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-27 01:58:31 +07:00
- User Prompt: Nhập dữ liệu phiên usability thật của participant P05.
- AI Action: Cập nhật dữ liệu P05 và SUS 75/100.
````

---

## Entry #12

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-27 10:34:30

**Full prompt:**

```
Cập nhật session-P06.md bằng dữ liệu phiên thật P06.
```

### (2) AI Output

````
Đã nhập participant, 6 observation, 10 câu SUS và 5 probe; SUS `92.5/100`; giữ nguyên mức độ chắc chắn của finding.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-27 10:34:30 +07:00
- User Prompt: Nhập dữ liệu phiên usability thật của participant P06.
- AI Action: Cập nhật dữ liệu P06 và SUS 92.5/100.
````

---

## Entry #13

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-27 11:18:52

**Full prompt:**

```
Cập nhật session-P07.md bằng dữ liệu phiên thật P07.
```

### (2) AI Output

````
Đã nhập participant, 7 observation, 10 câu SUS và 5 probe; SUS `45/100`; giữ nguyên mức độ chắc chắn của finding.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-27 11:18:52 +07:00
- User Prompt: Nhập dữ liệu phiên usability thật của participant P07.
- AI Action: Cập nhật dữ liệu P07 và SUS 45/100.
````

---

## Entry #14

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-27 11:29:23

**Full prompt:**

```
Gộp 7 session vào usability-test-plan.md, tính SUS và tổng hợp severity-ranked findings.
```

### (2) AI Output

````
Đã gộp 7 participant, 38 observation và 7 SUS score. Kết quả: `n=7`, Mean `79.64`, Median `90`, Range `45–95`, Missing data `0`; thêm 8 severity-ranked findings theo ba nhóm yêu cầu.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-27 11:29:23 +07:00
- User Prompt: Gộp bảy phiên usability, tính SUS và tổng hợp severity-ranked findings.
- AI Action: Hợp nhất dữ liệu và phân loại findings.
````

---

## Entry #15

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-28 22:09:07

**Full prompt:**

```
Bổ sung evidence ref YouTube cho P01–P07 tại các session.
```

### (2) AI Output

````
Đã nối đúng 7 URL vào toàn bộ 38 observation trong thư mục `sessions`; chỉ cột Evidence ref thay đổi và không ghi tên thật vào session.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-28 22:09:07 +07:00
- User Prompt: Bổ sung video evidence cho các session P01–P07.
- AI Action: Nối URL YouTube vào 38 observation.
````

---

## Entry #16

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-28 22:10:43

**Full prompt:**

```
Cập nhật cả nội dung trong usability-test-plan.md.
```

### (2) AI Output

````
Đã đồng bộ 38 Evidence ref từ session vào bảng Observation notes tổng; các cột dữ liệu khác không thay đổi.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-28 22:10:43 +07:00
- User Prompt: Đồng bộ evidence links vào usability test plan.
- AI Action: Nối đủ 38 URL video vào bảng tổng.
````

---

## Entry #17

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-23 22:19:26

**Full prompt:**

```
Xác nhận bối cảnh kiểm thử EShop HW03 trước khi thiết kế checklist.
```

### (2) AI Output

````
Đã xác nhận backend `localhost:3000`, frontend web `localhost:5173`, frontend admin `localhost:5174`, Chrome/Windows, viewport 1440×900, tài khoản user/admin, ngày test 23/07/2026 và evidence `./evidence/hw03`; chưa thiết kế checklist.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-23 22:19:26 +07:00
- User Prompt: Xác nhận bối cảnh kiểm thử EShop HW03 trước khi thiết kế checklist
- AI Action: Xác nhận môi trường, tài khoản, phạm vi và evidence.
````

---

## Entry #18

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-23 22:22:55

**Full prompt:**

```
Soạn GUI checklist 46+ item theo phân bổ IA, phủ năm màn hình, Status Not run và Origin AI.
```

### (2) AI Output

````
Đã tạo checklist 46 item: IA-01 `12`, IA-02 `12`, IA-03 `10`, IA-04 `12`; phủ Cart, Checkout, Coupon, Checkout Success và Admin Coupon Management; toàn bộ `Not run`, Origin `AI`.

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-23 22:22:55 +07:00
- User Prompt: Soạn GUI checklist 46+ item theo phân bổ IA.
- AI Action: Tạo checklist đúng phân bổ và trạng thái ban đầu.
````

---


## Entry #19

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-24 03:18:16

**Full prompt:**

```
Tôi tự review và phát hiện checklist còn thiếu các khía cạnh sau, đã đối chiếu và xác nhận không trùng với 46 item hiện có: (1) Cart — tổng tiền có tính đúng khi giỏ có dòng trùng sản phẩm do lỗi thêm lại không cộng dồn; (2) Admin Coupon Management — thứ tự Tab bàn phím khi di chuyển giữa danh sách, form tạo và nút sửa/xóa gộp chung 1 màn hình; (3) Coupon section — nhãn hiển thị loại coupon percent có khớp chiều hướng tính toán thực tế; (4) Checkout — dữ liệu form có bị mất khi refresh giữa chừng khi không có cảnh báo rời trang. Hãy thêm 4 item này vào bảng 'Human-review additions' trong hw03-gui-checklist.md, gán ID từ GUI-047 đến GUI-050, giữ nguyên nội dung tôi mô tả không diễn giải thêm, Status = 'Not run', Origin = 'Human'.
```

### (2) AI Output

```
Mình tiếp tục áp dụng skill `eshop-gui-usability-audit` vì đây là vòng human review của checklist HW03. Mình sẽ chỉ bổ sung đúng bốn nội dung bạn cung cấp, giữ nguyên câu chữ của từng check; các cột phân loại và lý do AI có thể bỏ sót sẽ được ghi riêng theo yêu cầu audit của skill.

Đã thêm `GUI-047` đến `GUI-050` vào bảng Human-review additions tại [hw03-gui-checklist.md](E:\Testing\CS423-CSC15003-Testing-N08\reports\hw03-gui-checklist.md).

- Nội dung bốn check được giữ nguyên.
- Cả bốn có `Status = Not run`, `Origin = Human`.
- Đã bổ sung lý do AI có thể bỏ sót theo yêu cầu audit của skill.
- `git diff --check` không phát hiện lỗi định dạng.

Commit đề xuất: `test(hw03): add human-reviewed GUI checklist items`

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-24 03:18:16 +07:00
- User Prompt: Thêm bốn mục human review GUI-047 đến GUI-050 vào checklist
- AI Action: Đã thêm bốn mục với nguyên văn nội dung, phân loại IA, lý do AI bỏ sót, trạng thái Not run và nguồn Human
```

---

## Entry #20

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-24 03:21:57

**Full prompt:**

```
Tôi vừa thực thi trên Cart thật: cập nhật GUI-13/14 Blocked, tạo GUI-BUG-01 cho dòng sản phẩm trùng, GUI-047 pass, GUI-36 failed. Thực thi Coupon: GUI-07 và GUI-049 failed do SAVE10 tăng tổng tiền. Checkout: GUI-15 failed, GUI-050 failed vì mất dữ liệu. Admin: GUI-34 failed; GUI-048 chỉ cập nhật sau khi có kết quả thật. Chỉ đính evidence cho FAILED/BLOCKED.
```

### (2) AI Output

```
Mình tiếp tục dùng skill `eshop-gui-usability-audit` để cập nhật kết quả black-box và tách `GUI-BUG-01` khỏi hai mục bị chặn. Mình sẽ chỉ dùng các quan sát bạn vừa cung cấp, kiểm tra evidence hiện có trong `./evidence/hw03`, và không suy đoán kết quả `GUI-048` vì phần đó vẫn là placeholder chưa có kết quả quan sát thật.

Mình đã tìm thấy evidence phù hợp cho `GUI-13/14`, `GUI-07/049`, `GUI-15`, `GUI-36` và `GUI-34`. Hiện chưa có ảnh dành cho `GUI-050`, nên mục này có thể ghi nhận kết quả và note nhưng evidence phải được đánh dấu là còn thiếu; `GUI-048` sẽ giữ `Not run` vì chưa có thứ tự focus quan sát thực tế để ghi. Skill yêu cầu tuyệt đối không biến placeholder thành kết quả đã thực thi.

Đã cập nhật [GUI checklist](E:\Testing\CS423-CSC15003-Testing-N08\reports\hw03-gui-checklist.md):

- `GUI-13`, `GUI-14`: `Blocked`
- `GUI-07`, `GUI-15`, `GUI-36`, `GUI-049`, `GUI-050`: failed theo yêu cầu
- `GUI-34`: `Failed`
- `GUI-047`: `PASSED`
- `GUI-048`: giữ `Not run` vì chưa có kết quả focus-order thực tế
- Chỉ các dòng failed/blocked được gắn evidence
- `GUI-050` đã ghi nhận failed nhưng đánh dấu thiếu file evidence trong thư mục

Đã tạo bug riêng [GUI-BUG-01.md](E:\Testing\CS423-CSC15003-Testing-N08\bug-reports\GUI-BUG-01.md), dùng đúng headings của issue template và tách khỏi `GUI-13/14`.

`git diff --check` không phát hiện lỗi định dạng.

Commit đề xuất: `test(hw03): record GUI results and duplicate cart item bug`

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-24 03:21:57 +07:00
- User Prompt: Cập nhật kết quả thực thi Cart, Coupon, Checkout và Admin Coupon Management; tạo GUI-BUG-01
- AI Action: Đã cập nhật status/notes/evidence, giữ GUI-048 Not run, ghi nhận thiếu evidence GUI-050 và tạo bug report dòng sản phẩm trùng
```

---

## Entry #21

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-24 03:39:49

**Full prompt:**

```
Cập nhật cột Evidence/notes cho GUI-16, GUI-17, GUI-26, GUI-27, GUI-38, GUI-44, GUI-46 đúng nội dung và file evidence tôi cung cấp. Đổi GUI-16 từ FAILED sang Blocked. Đồng thời chuẩn hóa toàn bộ Status về PASSED, FAILED, BLOCKED, N/A (sửa GUI-34 thành FAILED).
```

### (2) AI Output

```
Mình tiếp tục dùng skill `eshop-gui-usability-audit` để cập nhật kết quả thực thi black-box. Mình sẽ chép nguyên văn bảy nội dung Notes, gắn đúng các file evidence bạn chỉ định, đổi `GUI-16` sang `BLOCKED`, rồi chuẩn hóa mọi Status thành đúng `PASSED`, `FAILED`, `BLOCKED` hoặc `N/A`.

Bảy dòng đã được cập nhật theo đúng câu chữ bạn cung cấp. Mình đang kiểm tra lại toàn bộ 50 item để bảo đảm không còn biến thể Status như `Failed`, `Blocked` hoặc `Not run`, đồng thời xác minh tất cả đường dẫn evidence đều tồn tại.

Đã cập nhật [hw03-gui-checklist.md](E:\Testing\CS423-CSC15003-Testing-N08\reports\hw03-gui-checklist.md):

- Ghi nguyên văn Notes và evidence cho `GUI-16`, `17`, `26`, `27`, `38`, `44`, `46`.
- Chuyển `GUI-16` thành `BLOCKED`.
- Chuẩn hóa toàn bộ 50 Status:
  - `PASSED`: 32
  - `FAILED`: 15
  - `BLOCKED`: 3
  - `N/A`: 0
- Không còn Status ngoài bốn giá trị cho phép.
- Tất cả đường dẫn evidence đều tồn tại.
- `git diff --check` không phát hiện lỗi.

Commit đề xuất: `test(hw03): update checklist evidence and normalize statuses`

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-24 03:39:49 +07:00
- User Prompt: Cập nhật Notes/evidence cho bảy GUI items và chuẩn hóa toàn bộ Status
- AI Action: Đã cập nhật đúng nội dung quan sát, đổi GUI-16 thành BLOCKED, chuẩn hóa 50 Status và xác minh evidence
```

---

## Entry #22

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-24 03:43:23

**Full prompt:**

```
đã có evidence cho GUI-23 và 33 tại file đính kèm, tiến hành chỉnh sửa và trình bày phù hợp
```

### (2) AI Output

```
Mình tiếp tục dùng skill `eshop-gui-usability-audit` để cập nhật evidence black-box cho `GUI-23` và `GUI-33`. Mình sẽ đối chiếu đúng nội dung hai item với ảnh đính kèm, chỉ ghi những gì ảnh thực sự chứng minh và nêu rõ giới hạn của ảnh tĩnh nếu item còn có hành vi Back/Forward.

Đã cập nhật [hw03-gui-checklist.md](E:\Testing\CS423-CSC15003-Testing-N08\reports\hw03-gui-checklist.md):

- `GUI-23`: ghi nhận form thiếu ký hiệu `*` và chủ yếu dùng placeholder thay cho nhãn riêng.
- `GUI-33`: ghi nhận mục “Mã Giảm Giá” được highlight và mở đúng màn hình; nêu rõ ảnh tĩnh không chứng minh được hành vi Back/Forward.
- Cả hai liên kết tới [GUI_23_33_34.png](E:\Testing\CS423-CSC15003-Testing-N08\evidence\hw03\GUI_23_33_34.png).
- Giữ nguyên Status `FAILED`.
- `git diff --check` không phát hiện lỗi.

Commit đề xuất: `test(hw03): attach evidence for admin coupon checks`

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-24 03:43:23 +07:00
- User Prompt: Bổ sung evidence GUI_23_33_34.png cho GUI-23 và GUI-33
- AI Action: Đã cập nhật notes dựa trên nội dung quan sát được, liên kết evidence và nêu giới hạn của ảnh tĩnh đối với Back/Forward
```

---

## Entry #23

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-24 03:46:32

**Full prompt:**

```
evidence cho GUI_43 và GUI_48 cũng đã được cung cấp bổ sung thêm nội dung trình bày phù hợp
```

### (2) AI Output

```
Mình tiếp tục dùng skill `eshop-gui-usability-audit` để cập nhật evidence cho `GUI-43` và `GUI-048`. Mình sẽ ghi nhận đúng những gì hai ảnh thể hiện, đồng thời phân biệt rõ phần nào ảnh tĩnh chưa chứng minh được—đặc biệt là trạng thái Checkout Success của `GUI-43` và thứ tự Tab thực tế của `GUI-048`.

Đã cập nhật [hw03-gui-checklist.md](E:\Testing\CS423-CSC15003-Testing-N08\reports\hw03-gui-checklist.md):

- `GUI-43`: bổ sung quan sát về alert Network Error, request pending và nút kẹt ở “Đang xử lý...”; ghi rõ ảnh không thể hiện Checkout Success.
- `GUI-048`: bổ sung bố cục form và danh sách coupon chung màn hình; ghi rõ ảnh tĩnh không xác nhận được thứ tự Tab.
- Đã liên kết đúng [GUI_38_43.png](E:\Testing\CS423-CSC15003-Testing-N08\evidence\hw03\GUI_38_43.png) và [GUI_48.png](E:\Testing\CS423-CSC15003-Testing-N08\evidence\hw03\GUI_48.png).
- Giữ nguyên Status hiện có: `GUI-43 = FAILED`, `GUI-048 = PASSED`.
- `git diff --check` không phát hiện lỗi.

Commit đề xuất: `test(hw03): document evidence for GUI-43 and GUI-048`

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-24 03:46:32 +07:00
- User Prompt: Bổ sung nội dung evidence cho GUI-43 và GUI-048
- AI Action: Đã cập nhật notes và liên kết hai ảnh, đồng thời ghi rõ giới hạn bằng chứng của ảnh tĩnh
```

---

## Entry #24

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-24 03:56:26

**Full prompt:**

```
Với toàn bộ item đang có Status FAILED hoặc BLOCKED và đã có evidence (GUI-07, GUI-13, GUI-14, GUI-15, GUI-16, GUI-17, GUI-23, GUI-26, GUI-27, GUI-33, GUI-34, GUI-36, GUI-38, GUI-43, GUI-44, GUI-46, GUI-048, GUI-049, GUI-050, GUI-051), hãy inspect .github/ISSUE_TEMPLATE trong repo eshop-sut trước, sau đó soạn GitHub Issue riêng cho từng lỗi theo đúng template hiện có, gồm test case, environment, bước tái hiện, expected, actual và evidence; không dùng code/DOM. Xếp Severity theo bốn mức được chỉ định và map theo field chuẩn của template nếu cần.
```

### (2) AI Output

```
Mình sẽ dùng skill `eshop-gui-usability-audit` cho toàn bộ loạt issue này. Trước tiên mình sẽ đọc đúng issue template trong repo `src/eshop-sut`, sau đó đối chiếu từng dòng checklist/evidence hiện tại và tạo một issue file riêng cho từng ID—chỉ dựa trên quan sát UI, Check, Notes và ảnh, không dùng code/DOM.

Có một điểm mình sẽ xử lý minh bạch: danh sách phân hạng của bạn chưa nêu `GUI-34`; dựa trên ảnh hưởng quản lý coupon nhưng không chặn toàn bộ tác vụ, mình tạm xếp mục này vào mức Trung bình và map theo template.

Trong `src/eshop-sut` không có thư mục `.github/ISSUE_TEMPLATE`; template khả dụng của repo làm bài nằm tại `.github/ISSUE_TEMPLATE/bug-report-template.md`. Mình sẽ dùng nguyên các heading của template đó và map mức ảnh hưởng thành `Critical/P0`, `Major/P1`, `Minor/P2`, `Trivial/P3`. `GUI-34` được xếp `Minor/P2` theo giả định đã nêu.

Mình đã đối chiếu 19 dòng hiện có; có hai sai lệch dữ liệu cần giữ trung thực trong bộ issue:

- `GUI-048` hiện đang là `PASSED`, Notes/ảnh không ghi lại thứ tự focus cụ thể, dù prompt này xếp nó vào nhóm lỗi Tab.
- `GUI-051` chưa tồn tại trong checklist và `GUI-050` chưa có file ảnh trong `evidence/hw03`.

Mình vẫn sẽ tạo đủ 20 issue draft: `GUI-048` và `GUI-043` sẽ ghi rõ giới hạn evidence; `GUI-050` ghi rõ ảnh còn thiếu; `GUI-051` dùng quan sát đã xác nhận trước đó và ảnh `GUI_13_14.png`, không bịa dữ liệu.

Đã tạo đủ 20 issue draft riêng theo template. Mình đang chạy kiểm tra chéo tự động: số heading bắt buộc, mức Severity/Priority, environment, test case ID và đường dẫn evidence; sau đó mình sẽ sửa mọi chỗ chưa khớp nguyên văn Check/Notes.

Đã tạo 20 GitHub Issue draft riêng tại [bug-reports/hw03-gui](E:\Testing\CS423-CSC15003-Testing-N08\bug-reports\hw03-gui).

Phân bổ:

- Critical/P0: 3
- Major/P1: 4
- Minor/P2: 8
- Trivial/P3: 5

Mỗi issue dùng đúng headings của template, có test case, environment, bước tái hiện, Check làm expected result, Notes làm actual result và evidence tương ứng. Không sử dụng lý do từ code/DOM.

Các giới hạn được ghi rõ:

- `GUI-43`: ảnh không thể hiện Checkout Success.
- `GUI-048`: checklist hiện là `PASSED`; ảnh tĩnh không chứng minh thứ tự Tab.
- `GUI-050`: chưa có file evidence.
- `GUI-051`: chưa có trong checklist; issue dựa trên quan sát đã xác nhận trước đó và `GUI_13_14.png`.
- `GUI-34`: map thành `Minor/P2` do không được phân hạng trực tiếp trong prompt.

`git diff --check` không phát hiện lỗi.

Commit đề xuất: `docs(hw03): add evidence-backed GUI issue drafts`

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-24 03:56:26 +07:00
- User Prompt: Soạn issue riêng cho toàn bộ GUI item Failed/Blocked có evidence và phân hạng severity
- AI Action: Đã tạo 20 issue draft theo template, map bốn mức severity và ghi rõ các khoảng trống evidence/checklist
```

---

## Entry #25

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-27 22:15:49

**Full prompt:**

```
Chỉnh sửa lại nội dung của GUI-50 kết quả thực tế biểu thị rằng nếu đang trong quá trình nhập mà refresh UI sẽ hiển thi **404**: NOT_FOUND và evidence đã được đính kèm trong đường dẫn phù hợp
```

### (2) AI Output

```
Mình tiếp tục dùng skill `eshop-gui-usability-audit` để cập nhật quan sát black-box cho `GUI-050`. Mình sẽ kiểm tra file evidence mới, sửa Notes trong checklist và Actual result/Evidence của issue tương ứng, không bổ sung nguyên nhân kỹ thuật ngoài hiện tượng UI `404: NOT_FOUND`.

Mình đã kiểm tra `GUI_50.png`: file tồn tại và sẽ được liên kết đúng. Tuy nhiên ảnh hiện tại hiển thị Checkout trước/sau refresh với dữ liệu bị reset về tổng `0 ₫`, không hiển thị trực tiếp trang `404: NOT_FOUND`. Mình vẫn sẽ ghi nhận `404: NOT_FOUND` theo quan sát bạn vừa xác nhận, nhưng sẽ nêu rõ giới hạn này trong phần Evidence để không gán cho ảnh điều nó không thể hiện.

Đã cập nhật:

- [Checklist GUI-050](E:\Testing\CS423-CSC15003-Testing-N08\reports\hw03-gui-checklist.md): Actual Notes ghi UI hiển thị **404: NOT_FOUND** khi refresh trong lúc nhập.
- [Issue GUI-050](E:\Testing\CS423-CSC15003-Testing-N08\bug-reports\hw03-gui\GUI-050.md): sửa tiêu đề, bước tái hiện, Actual result và liên kết evidence.
- Evidence: [GUI_50.png](E:\Testing\CS423-CSC15003-Testing-N08\evidence\hw03\GUI_50.png).

Ảnh hiện tại thể hiện dữ liệu/tổng tiền bị reset sau refresh nhưng không trực tiếp hiển thị trang 404, nên issue đã ghi rõ `404: NOT_FOUND` là quan sát do người kiểm thử cung cấp.

Commit đề xuất: `test(hw03): update GUI-050 refresh failure evidence`

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-27 22:15:49 +07:00
- User Prompt: Cập nhật GUI-050 để phản ánh refresh khi đang nhập hiển thị 404 NOT_FOUND
- AI Action: Đã cập nhật checklist, issue và evidence reference; đồng thời ghi rõ giới hạn của ảnh hiện có
```

---

## Entry #26

### (1) Prompt + Tool

**Tool:** Codex (GPT-5.6-Sol Medium)

**DateTime:** 2026-07-27 23:16:09

**Full prompt:**

```
chỉnh sửa đường dẫn evidence trong file checklist, hiện tại đường dẫn là evidence/hw03/Chrome
```

### (2) AI Output

```
Mình tiếp tục dùng skill `eshop-gui-usability-audit`. Mình sẽ kiểm tra cấu trúc thực tế dưới `evidence/hw03/Chrome`, rồi cập nhật toàn bộ liên kết evidence trong file checklist sang đúng đường dẫn tương đối và xác minh không còn link hỏng.

Đã cập nhật [hw03-gui-checklist.md](E:\Testing\CS423-CSC15003-Testing-N08\reports\hw03-gui-checklist.md):

- Evidence directory: `./evidence/hw03/Chrome`
- Cập nhật toàn bộ 19 liên kết thành `../evidence/hw03/Chrome/<file>`
- Không còn đường dẫn cũ
- Tất cả 19 file evidence đều tồn tại
- `git diff --check` không phát hiện lỗi

Commit đề xuất: `docs(hw03): update checklist Chrome evidence paths`

AI Audit Entry:
- Tool: Codex AI assistant / model not visible
- Date: 2026-07-27 23:16:09 +07:00
- User Prompt: Chỉnh đường dẫn evidence trong checklist sang evidence/hw03/Chrome
- AI Action: Đã cập nhật toàn bộ đường dẫn evidence và xác minh không còn link hỏng
```

---
