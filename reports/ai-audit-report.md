# AI Audit Report (AI-02)

## 1. Thông tin Sinh viên

| Mục | Giá trị |
| :--- | :--- |
| **Họ tên sinh viên:** | Ngô Hồng Thanh |
| **MSSV:** | 23127475 |
| **Lớp / Khoá:** | CS423 / CSC13003 |
| **Mã bài tập:** | HW02 |
| **Ngày làm bài:** | 26/06/2026 - 01/07/2026 |
| **Công cụ AI đã dùng:** | Codex |

## 2. Nguồn audit

| Nguồn | Nội dung dùng để audit |
| --- | --- |
| `reports/prompt_log.md` | Nhật ký prompt, output, file thay đổi và human review cho từng lần dùng AI |
| `.codex/skills/domain-testing-eshop/SKILL.md` | Quy trình Domain Testing black-box cho FR-03, FR-11, FR-14, FR-23 |
| `.codex/skills/boundary-value-analysis-eshop/SKILL.md` | Quy trình BVA black-box cho FR-03, FR-11, FR-14, FR-23 |
| `.codex/skills/prompt-log-eshop/SKILL.md` | Quy định ghi prompt log để tổng hợp AI Audit Report |
| Session `019f04c9-9def-7bd3-bf04-7f243fe23917` | Chat Codex cho FR-03 |
| Session `019f18a9-fc18-7960-8cf4-dbbfbe42cc46` | Chat Codex cho FR-11 |
| Session `019f19af-f7f0-7942-ae61-255a303fdd14` | Chat Codex cho FR-14 |
| Session `019f1c45-19b3-7be0-b6fe-70357f747bf3` | Chat Codex cho FR-23 |

## Entry #1

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-06-26 18:58 +07 |
| **Artifact type** | Skill Creation, Prompt Logging |
| **Related feature** | General |

**Full prompt:**

```text
Đọc requirement.md và cấu trúc repo hiện tại, viết 2 file skill cho domain testing và boundary value analysis techniques bằng tiếng Việt cho FR-03, FR-11, FR-14, FR-23. Sau đó, khi có SystemRequirementsSpecification.md mới, đánh giá có cần sửa skill không và có cần thêm skill ghi prompt log ra prompt_log.md để viết AI Audit Report không.
```

### (2) AI Output

```text
Codex tạo 2 skill Domain Testing/BVA trong .codex/skills, sau đó cập nhật nội dung theo SystemRequirementsSpecification.md. Ở thời điểm này SRS đang mô tả FR-23 là Navigation Requirements, nhưng sau đó người làm xác nhận SRS sai và FR-23 đúng là FR-03 trên mobile. Codex cũng tạo thêm skill prompt-log-eshop và file reports/prompt_log.md để ghi nhật ký AI.
```

### (3) Verdict

**`ACCEPTED_WITH_REVIEW`**

### (4) Reasoning

AI tạo được bộ skill ban đầu và prompt log để làm việc nhất quán. Tuy nhiên phần FR-23 cần chỉnh lại sau khi phát hiện SRS mô tả sai.

### (5) Student Fix

- Kiểm tra lại skill trước khi dùng chính thức.
- Cập nhật lại FR-23 trong các tài liệu và skill ở entry sau.

---

## Entry #2

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-06-26 18:58 +07 |
| **Artifact type** | Requirement Correction, Skill Update |
| **Related feature** | FR-23 |

**Full prompt:**

```text
à FR-23 là FR-03 nhưng trên mobile mới đúng, file SRS đang sai. sửa lại những nội dung liên quan giúp tôi
```

### (2) AI Output

```text
Codex sửa SRS để FR-23 trở thành Quên mật khẩu & Đặt lại mật khẩu trên Mobile, cập nhật skill Domain Testing và BVA để FR-23 dùng cùng logic FR-03 nhưng có thêm miền/biên đặc thù mobile, đồng thời sửa prompt log để ghi nhận correction này.
```

### (3) Verdict

**`ACCEPTED`**

### (4) Reasoning

AI phản ứng đúng với correction của người làm, sửa nguồn đặc tả và skill trước khi sinh test case FR-23.

### (5) Student Fix

- Dùng định nghĩa FR-23 mới cho toàn bộ test case và report.
- Rà lại tài liệu để tránh còn chỗ gọi FR-23 là Navigation Requirements.

---

## Entry #3

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-06-26 18:58 +07 |
| **Artifact type** | Skill Update, Prompt Logging |
| **Related feature** | General |

**Full prompt:**

```text
lưu ý giáo viên có nói đến việc ([Domain Testing](https://courses.ctda.hcmus.edu.vn/mod/hvp/view.php?id=110141) và Boundary Value Analysis) là Blackbox Testing nên không cần source code nên trong branch này đã được xóa source rồi, hình như trong skill đang tưởng có code để kiểm tra lại. hãy sửa các phần liên quan cho phù hợp. và trong đề chỗ ### 6. Requirements có nói đến: Provide a detailed, step-by-step explanation of how you applied the technique. là cần giải thích từng bước để tạo ra mỗi test case đúng không, vậy phần giải thích đó trình bày ở đâu, template như thế nào. về prompt_log phần thời gian thì cần thêm giờ vào nữa
```

### (2) AI Output

```text
Codex cập nhật skill Domain Testing và BVA để chỉ dựa trên requirement, SRS, UI/flow quan sát được và dữ liệu test, không dùng source code. Codex bổ sung section Technique Application Explanation vào template test case và cập nhật prompt log để dùng format ngày giờ có giờ phút.
```

### (3) Verdict

**`ACCEPTED_WITH_REVIEW`**

### (4) Reasoning

AI sửa đúng hướng black-box và bổ sung yêu cầu giải thích kỹ thuật. Vị trí trình bày phần explanation sau đó được điều chỉnh tiếp theo hướng main report.

### (5) Student Fix

- Dùng template mới cho test case.
- Chuyển phần giải thích từng bước sang main report khi có hướng dẫn rõ hơn từ giảng viên.

---

## Entry #4

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-06-26 19:25 +07 |
| **Artifact type** | Skill Update, Report Template |
| **Related feature** | General |

**Full prompt:**

```text
tôi có thêm thông tin về các api ở CS423-CSC15003-Testing-N08/api_specification.md. hãy chỉnh sửa các thông tin liên quan. và về phần trình bày các bước để tạo ra test case thì có người hỏi giảng viên ... được trả lời: Trình bày các bước để tạo ra 19 test cases nhé. vậy thì phải trình bày ở main report chứ không trình bày trong từng file test case như hiện tại hả
```

### (2) AI Output

```text
Codex cập nhật skill Domain Testing/BVA để đọc api_specification.md như tài liệu black-box công khai, bổ sung endpoint liên quan cho FR-03, FR-11, FR-14, FR-23. Codex cập nhật main-report.md với cấu trúc Domain Testing Report và BVA Report có bảng Step-by-Step Test Case Derivation cho từng test case, đồng thời điều chỉnh skill để phần giải thích nằm trong main report thay vì bắt buộc trong từng file test case.
```

### (3) Verdict

**`ACCEPTED`**

### (4) Reasoning

AI đưa API specification vào nguồn black-box hợp lệ và thống nhất vị trí trình bày explanation trong main report, phù hợp phản hồi từ giảng viên.

### (5) Student Fix

- Điền bảng derivation cho test case thật sau khi thiết kế.
- Giữ file test case tập trung vào precondition, test data, steps và expected result.

---

## Entry #5

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-06-26 19:41 +07 |
| **Artifact type** | Requirement Correction, Prompt Logging |
| **Related feature** | General / Mobile |

**Full prompt:**

```text
sửa lại định dạng giờ trong prompt log sang giờ Việt Nam. và trong CS423-CSC15003-Testing-N08/SystemRequirementsSpecification.md thì sửa phần ## 7. Phân hệ Mobile (React Native) là các FR như sau (bản mobile của các FR trước):
FR-20: Shopping cart
FR-21: Checkout
FR-22: Discount coupons
FR-23: Forgot password and password reset (two steps)
FR-24: Order history view (user)

(FR-23 đang đúng rồi)
```

### (2) AI Output

```text
Codex đổi các heading thời gian trong prompt_log.md từ UTC sang +07, cập nhật skill prompt-log-eshop để dùng timezone Asia/Ho_Chi_Minh, và sửa SystemRequirementsSpecification.md để section Mobile gồm FR-20 Shopping cart, FR-21 Checkout, FR-22 Discount coupons, FR-23 Forgot/reset password, FR-24 Order history. Các yêu cầu GUI cũ được đổi mã sang GUI-01, GUI-02, GUI-03 để tránh trùng FR.
```

### (3) Verdict

**`ACCEPTED`**

### (4) Reasoning

AI cập nhật đúng timezone và mã FR mobile, giúp prompt log có timestamp nhất quán để đưa vào audit.

### (5) Student Fix

- Dùng mã FR mobile mới trong report.
- Giữ FR-23 là feature mobile được chọn cho bài.

---

## Entry #6

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-06-26 23:42 +07 |
| **Artifact type** | Test Case Design, Test Run Draft, Report Writing |
| **Related feature** | FR-03 |

**Full prompt:**

```text
dựa vào các skill trong CS423-CSC15003-Testing-N08/.codex/skills, hãy viết các test case và điền những thông tin test run cho FR-03 giúp tôi. Lưu ý chưa điền kết quả, sau khi có test case tôi sẽ test rồi thông báo lại kết quả sau. nhớ xem skill prompt log và viết prompt_log.md nữa
```

### (2) AI Output

```text
Codex đọc các skill Domain Testing, Boundary Value Analysis và Prompt Log, sau đó đọc requirement.md, SystemRequirementsSpecification.md, api_specification.md và template test run hiện có. Codex tạo 12 Domain Testing test cases cho các miền email, điều hướng, trạng thái luồng, OTP, mật khẩu mới và xác nhận mật khẩu; tạo 6 BVA test cases cho biên độ dài OTP 5/6/7 chữ số và mật khẩu mới 7/8/9 ký tự. Codex tạo test run FR-03 với toàn bộ Result = Not Run, cập nhật main-report.md phần FR-03 và ghi entry prompt log này.
```

### (3) Verdict

**`ACCEPTED_NEEDS_EXECUTION`**

### (4) Reasoning

AI sinh được test case và test run ban đầu, nhưng kết quả thực tế chưa có nên chưa thể kết luận Passed/Failed.

### (5) Student Fix

- Người làm chạy SUT thật rồi điền Result, Related Bug và Note trong test run FR-03.
- Tạo bug report nếu actual result khác expected result.

---

## Entry #7

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-06-30 15:23 +07 |
| **Artifact type** | Test Run Update, API Verification, Bug Reporting |
| **Related feature** | FR-03 |

**Full prompt:**

```text
tôi đã test các test case DT và BVA và có note kết quả ở tests/test-runs/FR-03-forgot-password-run.md. hãy xem qua sau đó chỉnh sửa, format lại nếu cần và chỉnh sửa các kết quả trong từng file test case, viết các file bug report và các file liên quan giúp tôi luôn. Lưu ý những test case nào khả nghi có thể tự gọi api để kiểm tra lại giúp tôi (tôi có chạy sẵn backend và frontend-web rồi).
```

### (2) AI Output

```text
Codex đọc test run FR-03, bug report mẫu và prompt-log skill. Codex gọi API localhost để kiểm tra lại các điểm khả nghi: forgot-password trả resetToken 4 chữ số; email sai định dạng trả 404 User not found; reset-password với OTP sai trả lỗi token/email; reset-password với mật khẩu mạnh hợp lệ thành công qua backend; OTP của email khác bị từ chối đúng. Codex khôi phục mật khẩu mặc định của test@eshop.com sau khi kiểm tra API. Sau đó Codex chuẩn hóa test run thành 7 Passed, 11 Failed, 0 Not Run; cập nhật Status / Related bugs trong từng test case; tạo 5 bug reports FR-03; tạo AI gap analysis; cập nhật main report và README.
```

### (3) Verdict

**`ACCEPTED_WITH_FIXES`**

### (4) Reasoning

AI dùng kết quả manual test và xác minh API cho các case nghi ngờ. Output hữu ích vì cập nhật trạng thái, bug report, AI gap và summary; vẫn cần người làm review bug report và bổ sung evidence nếu có.

### (5) Student Fix

- Kiểm tra lại bug report FR-03 và bổ sung GitHub Issue/screenshot nếu cần.
- Ghi nhận lỗi mật khẩu mạnh là khác biệt frontend validation, không phải backend reset API.

---

## Entry #8

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-06-30 19:34 +07 |
| **Artifact type** | Report Writing |
| **Related feature** | FR-03 |

**Full prompt:**

```text
hiện tại reports/main-report.md tôi thấy cách trình bày từng bước tạo ra test case của domain testing đang chưa rõ ràng lắm. có thể trình bày theo từng bước kiểu như Xác định biến đầu vào, Phân hoạch tương đương rồi tổng hợp test case không. không cần đổi test case chỉ cần trình bày lại cho chi tiết hơn thôi
```

### (2) AI Output

```text
Codex đọc lại skill Domain Testing và Prompt Log, sau đó chỉnh riêng phần FR-03 Domain Testing trong main-report.md. Nội dung mới trình bày theo 5 bước: xác định phạm vi/tác nhân, xác định biến đầu vào và trạng thái, phân hoạch tương đương, xác định ràng buộc liên biến, và tổng hợp 12 test case từ các lớp tương đương. Không thay đổi nội dung các file test case.
```

### (3) Verdict

**`ACCEPTED`**

### (4) Reasoning

AI cải thiện phần giải thích trong main report mà không làm thay đổi test data, expected result hoặc kết quả test.

### (5) Student Fix

- Người làm đọc lại mục FR-03 Domain Testing để đảm bảo diễn giải đúng yêu cầu giảng viên.

---

## Entry #9

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-06-30 20:14 +07 |
| **Artifact type** | Test Case Design, Test Run Draft, Report Writing |
| **Related feature** | FR-11 |

**Full prompt:**

```text
dựa vào các skill trong CS423-CSC15003-Testing-N08/.codex/skills, hãy viết các test case, điền những thông tin test run cho FR-11, cập nhật reports/main-report.md phần FR-11 (tham khảo cách trình bày của FR-03) và các file liên quan khác theo skill yêu cầu. Lưu ý chưa điền kết quả test case, sau khi có test case tôi sẽ test rồi thông báo lại kết quả sau để tạo bug report và cập nhật reports/main-report.md lần nữa.
```

### (2) AI Output

```text
Codex đọc skill Domain Testing, BVA và Prompt Log, sau đó đọc requirement.md, SystemRequirementsSpecification.md, api_specification.md, FR-03 report/test case mẫu và test run hiện có. Codex tạo 12 Domain Testing test cases cho auth, ownership, danh sách rỗng/nhiều đơn, truy cập chi tiết, các trường mã đơn/ngày đặt/tổng tiền và status tiếng Việt/màu sắc. Codex tạo 3 BVA test cases cho số lượng đơn hàng 0/1/nhiều vì SRS/API không nêu pagination/filter. Codex tạo test run FR-11 với toàn bộ Result = Not Run, cập nhật main-report.md phần FR-11, README summary và file AI gap analysis FR-11.
```

### (3) Verdict

**`ACCEPTED_NEEDS_EXECUTION`**

### (4) Reasoning

AI thiết kế test case FR-11 theo skill và không bịa boundary pagination/filter khi đặc tả chưa nêu. Kết quả cần manual execution sau đó.

### (5) Student Fix

- Chuẩn bị dữ liệu đơn hàng cho các tài khoản test trước khi chạy.
- Bổ sung test nếu UI thực tế có pagination/filter/sort ngoài đặc tả.

---

## Entry #10

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-06-30 20:26 +07 |
| **Artifact type** | Markdown Formatting |
| **Related feature** | FR-11 |

**Full prompt:**

```text
hiện tại step 2 và step 5 của FR-11 ở reports/main-report.md đang bị sai định dạng nên chưa hiển thị thành dạng bảng, sửa giúp tôi
```

### (2) AI Output

```text
Codex sửa dòng separator của hai bảng FR-11 Step 2 và Step 5 từ 3 cột thành 4 cột, khớp với số cột header/nội dung. Không thay đổi nội dung test case hoặc kết quả test run.
```

### (3) Verdict

**`ACCEPTED`**

### (4) Reasoning

AI sửa lỗi trình bày Markdown có phạm vi hẹp, không làm thay đổi logic test.

### (5) Student Fix

- Xem lại preview Markdown để xác nhận bảng render đúng.

---

## Entry #11

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-06-30 22:32 +07 |
| **Artifact type** | Test Run Update, API Verification, Bug Reporting |
| **Related feature** | FR-11 |

**Full prompt:**

```text
tôi đã test các test case DT và BVA và có note kết quả ở tests/test-runs/FR-11-order-history-run.md. hãy xem qua sau đó chỉnh sửa, format lại nếu cần và chỉnh sửa các kết quả trong từng file test case, viết các file bug report và các file liên quan giúp tôi luôn. Lưu ý những test case nào khả nghi có thể tự gọi api để kiểm tra lại giúp tôi (tôi có chạy sẵn backend, frontend-admin và frontend-web rồi).
```

### (2) AI Output

```text
Codex đọc test run FR-11, bug report mẫu và các skill Domain Testing/BVA/Prompt Log. Codex gọi API localhost để kiểm tra lại case ownership: không đăng nhập gọi my-orders trả 401; user test có 15 đơn cá nhân; own-order detail GET /api/orders/16 trả user_id = 2; other-order detail GET /api/orders/4 với token user test trả 200 OK, user_id = 1. Codex xem screenshot màu trạng thái và xác nhận Đã xác nhận/Đang giao dùng tông xanh lam gần nhau. Sau đó Codex cập nhật test run FR-11 thành 13 Passed, 2 Failed, 0 Not Run; cập nhật Status / Related bugs trong test cases; tạo 2 bug reports; cập nhật AI gap analysis, main report và README.
```

### (3) Verdict

**`ACCEPTED_WITH_FIXES`**

### (4) Reasoning

AI đối chiếu manual notes với API và screenshot, phát hiện lỗi ownership và khả năng phân biệt màu trạng thái. Output cần người làm rà lại evidence và bug ID.

### (5) Student Fix

- Không đưa token thật vào report hoặc prompt log.
- Kiểm tra lại bug report và bổ sung GitHub Issue/screenshot nếu cần.
- Có thể chuẩn hóa bug ID nếu muốn, nhưng hiện tại giữ theo test case/screenshot.

---

## Entry #12

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-07-01 01:08 +07 |
| **Artifact type** | Test Case Design, Test Run Draft, Report Writing |
| **Related feature** | FR-14 |

**Full prompt:**

```text
dựa vào các skill trong CS423-CSC15003-Testing-N08/.codex/skills, hãy viết các test case, điền những thông tin test run cho FR-14, cập nhật reports/main-report.md phần FR-14 (tham khảo cách trình bày của FR-03) và các file liên quan khác theo skill yêu cầu. Lưu ý chưa điền kết quả test case, sau khi có test case tôi sẽ test rồi thông báo lại kết quả sau để tạo bug report và cập nhật reports/main-report.md lần nữa.
```

### (2) AI Output

```text
Codex đọc skill Domain Testing, Boundary Value Analysis và Prompt Log, sau đó đọc requirement.md, SystemRequirementsSpecification.md, api_specification.md, cách trình bày FR-03/FR-11 trong main-report.md và test run hiện có. Codex tạo 16 Domain Testing test cases cho quyền admin/guest/user, xem danh sách, thêm danh mục hợp lệ/rỗng/whitespace/Unicode, cập nhật danh mục hợp lệ/rỗng/không tồn tại/sai role, và xóa danh mục hợp lệ/không tồn tại/sai role. Codex tạo 6 BVA test cases cho min length tên danh mục 0/1/2 ký tự và số lượng danh mục 0/1/nhiều. Codex tạo test run FR-14 với toàn bộ Result = Not Run, cập nhật main-report.md phần FR-14, README summary và AI gap analysis ở trạng thái chưa thực thi.
```

### (3) Verdict

**`ACCEPTED_NEEDS_EXECUTION`**

### (4) Reasoning

AI tạo test set đầy đủ cho CRUD category và quyền admin. Một số điểm phụ thuộc UI Admin thực tế nên cần người làm chạy kiểm thử.

### (5) Student Fix

- Chuẩn bị dữ liệu danh mục test trước khi chạy.
- Nếu UI Admin không có thao tác sửa danh mục, ghi rõ trong test run và kiểm tra qua API công khai.

---

## Entry #13

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-07-01 02:15 +07 |
| **Artifact type** | Test Run Update, API Verification, Bug Reporting |
| **Related feature** | FR-14 |

**Full prompt:**

```text
tôi đã test các test case DT và BVA và có note kết quả ở tests/test-runs/FR-14-category-management-run.md. hãy xem qua sau đó chỉnh sửa, format lại nếu cần và chỉnh sửa các kết quả trong từng file test case, viết các file bug report và các file liên quan giúp tôi luôn, hình như trong reports/main-report.md chỗ step 5 của domain testing của fr-14 đang bị sai định dạng nên chưa hiển thị dạng bảng được, sửa giúp tôi luôn nhé. Lưu ý những test case nào khả nghi có thể tự gọi api để kiểm tra lại giúp tôi (tôi có chạy sẵn backend, frontend-admin và frontend-web rồi).
```

### (2) AI Output

```text
Codex đọc lại các skill Domain Testing, BVA và Prompt Log, sau đó đọc test run FR-14, main report và bug report mẫu. Codex gọi API localhost để kiểm tra lại các case khả nghi: user token gọi POST/PUT/DELETE /api/categories đều trả 200 OK; admin token tạo/cập nhật category với tên rỗng hoặc whitespace vẫn trả 200 OK; PUT/DELETE /api/categories/999999 vẫn trả success giả. Codex dọn dữ liệu category tạm sau khi verify, cập nhật test run thành 13 Passed, 9 Failed, 0 Not Run; cập nhật Status / Related bugs trong từng test case failed; tạo 3 bug reports FR-14; cập nhật AI gap analysis, main report, README và sửa lỗi bảng Step 5 FR-14 trong main-report.md.
```

### (3) Verdict

**`ACCEPTED_WITH_FIXES`**

### (4) Reasoning

AI xác minh API cho các case access control, validation và non-existing id, rồi cập nhật bug report và summary. Output phù hợp nhưng vẫn cần người làm rà evidence và bảo đảm không lộ token.

### (5) Student Fix

- Kiểm tra bug report FR-14 và bổ sung link/screenshot nếu cần.
- Không ghi token thật vào report hoặc prompt log.
- Xác nhận dữ liệu category tạm đã được dọn sau verify.

---

## Entry #14

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-07-01 13:04 +07 |
| **Artifact type** | Test Case Design, Test Run Draft, Report Writing |
| **Related feature** | FR-23 |

**Full prompt:**

```text
dựa vào các skill trong CS423-CSC15003-Testing-N08/.codex/skills, hãy viết các test case, điền những thông tin test run cho FR-23, cập nhật reports/main-report.md phần FR-23 (tham khảo cách trình bày của FR-03) và các file liên quan khác theo skill yêu cầu. Lưu ý chưa điền kết quả test case, sau khi có test case tôi sẽ test rồi thông báo lại kết quả sau để tạo bug report và cập nhật reports/main-report.md lần nữa.
```

### (2) AI Output

```text
Codex đọc skill Domain Testing, Boundary Value Analysis và Prompt Log, sau đó đọc SRS FR-23, API forgot/reset password, FR-03 trong main report và các test run hiện có. Codex tạo 12 Domain Testing test cases cho email, điều hướng, trạng thái luồng, OTP, mật khẩu mới, xác nhận mật khẩu và yêu cầu hiển thị lỗi/điều hướng mobile; tạo 6 BVA test cases cho biên OTP length 5/6/7 và password length 7/8/9. Codex tạo test run FR-23 với toàn bộ Result = Not Run, cập nhật main-report.md phần FR-23 theo cấu trúc FR-03, cập nhật README summary và tạo AI gap placeholder.
```

### (3) Verdict

**`ACCEPTED_NEEDS_EXECUTION`**

### (4) Reasoning

AI áp dụng lại logic FR-03 cho mobile FR-23 và thêm các điểm đặc thù mobile. Chưa có kết quả chạy ứng dụng mobile nên cần manual execution.

### (5) Student Fix

- Chạy ứng dụng mobile thật rồi cập nhật Result, Related Bug và Note.
- Tạo bug report nếu actual result khác expected result.

---

## Entry #15

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-07-01 14:31 +07 |
| **Artifact type** | Test Setup Fix, AI Gap Analysis |
| **Related feature** | FR-23 |

**Full prompt:**

```text
tôi không thể test trên mobile vì dòng:

const API_URL = "http://192.168.10.13:3000/api"; // IP LAN để chạy được trên iOS/Android và thiết bị thật

trong file frontend-mobile/App.js. cần sửa theo ip của tôi để chạy được đúng không. nếu đúng thì sửa thành const API_URL = "http://172.20.10.3:3000/api"; và xem đây là 1 phần AI gap và ghi vào ai-gap-analysis
```

### (2) AI Output

```text
Codex xác nhận mobile app cần dùng IP LAN truy cập được từ thiết bị thật/Expo. Codex sửa frontend-mobile/App.js thành const API_URL = "http://172.20.10.3:3000/api";, cập nhật test run FR-23 environment, ai-gap-analysis/FR-23-forgot-password-mobile.md và reports/main-report.md để ghi nhận đây là AI gap/test setup gap.
```

### (3) Verdict

**`ACCEPTED_WITH_NOTE`**

### (4) Reasoning

AI giúp tháo gỡ blocker test setup cho mobile và ghi nhận đúng là AI gap/test setup gap, không phải bug SUT chức năng.

### (5) Student Fix

- Đảm bảo backend lắng nghe trên IP LAN và thiết bị mobile cùng mạng/hotspot.
- Lưu ý `frontend-mobile/` đang bị git ignore nếu muốn đưa thay đổi vào bài nộp.

---

## Entry #16

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-07-01 16:00 +07 |
| **Artifact type** | Test Run Update, API Verification, Bug Reporting |
| **Related feature** | FR-23 |

**Full prompt:**

```text
tôi đã test các test case DT và BVA và có note kết quả ở tests/test-runs/FR-23-forgot-password-mobile-run.md. hãy xem qua sau đó chỉnh sửa, format lại nếu cần, xem các Result trong FR-23-forgot-password-mobile-run.md và Status trong các test case tôi có đánh đúng chưa và chỉnh sửa các kết quả trong từng file test case, viết các file bug report và các file liên quan giúp tôi luôn. Lưu ý những test case nào khả nghi có thể tự gọi api để kiểm tra lại giúp tôi (tôi có chạy sẵn backend và frontend-mobile rồi).
```

### (2) AI Output

```text
Codex đọc lại các skill Domain Testing, BVA và Prompt Log, sau đó đọc test run FR-23, SRS/API spec và bug report mẫu. Codex gọi API localhost để kiểm tra lại các case khả nghi: forgot-password với email hợp lệ trả resetToken 4 chữ số; email rỗng/sai định dạng trả 404 User not found; OTP 5/7 chữ số bị từ chối bằng 400 Invalid token or email; reset-password với mật khẩu 8/9 ký tự hợp lệ được backend chấp nhận khi có token hợp lệ. Codex restore mật khẩu test@eshop.com về Password123! sau khi verify. Sau đó Codex cập nhật test run thành 8 Passed, 8 Failed, 2 Blocked, 0 Not Run; cập nhật Status / Related bugs trong từng test case; tạo 4 bug reports FR-23; cập nhật AI gap analysis, main report và README.
```

### (3) Verdict

**`ACCEPTED_WITH_FIXES`**

### (4) Reasoning

AI kết hợp kết quả manual mobile test với API verification để phân loại Passed, Failed và Blocked. Việc giữ Blocked riêng cho case mobile UI không hiển thị OTP giúp audit rõ ràng hơn.

### (5) Student Fix

- Không ghi OTP/resetToken thật vào report hoặc prompt log.
- Giữ hai case Blocked riêng vì mobile UI không thể thực hiện đầy đủ luồng.
- Kiểm tra lại bug report và bổ sung GitHub Issue/screenshot/video nếu cần.

---

## Entry #17

### (1) Prompt + Tool

| Field | Content |
| --- | --- |
| **Tool** | Codex |
| **Timestamp** | 2026-07-01 17:23 +07 |
| **Artifact type** | AI Audit Report Writing |
| **Related feature** | General |

**Full prompt:**

```text
xem các skill tại .codex/skills, sau đó dựa vào prompt_log hoặc các session id chat sau:
019f04c9-9def-7bd3-bf04-7f243fe23917
019f18a9-fc18-7960-8cf4-dbbfbe42cc46
019f19af-f7f0-7942-ae61-255a303fdd14
019f1c45-19b3-7be0-b6fe-70357f747bf3

tôi cần điền file reports/ai-audit-report.md theo template reports/ai-audit-report-template.md.  tôi thấy trong mỗi session chat có chức năng copy markdown, có thể dùng chức năng đó cho tiện không, nếu được thì cứ dùng đi
```

### (2) AI Output

```text
Codex đọc skill Prompt Log, Domain Testing và BVA; đọc template AI Audit Report, prompt_log.md, danh sách session id trong ~/.codex/session_index.jsonl và các transcript jsonl tương ứng. Codex điền reports/ai-audit-report.md với thông tin sinh viên, nguồn audit, 17 entry audit theo format template gồm Prompt + Tool, AI Output, Verdict, Reasoning và Student Fix, sau đó kiểm tra cấu trúc entry, code fences và git diff --check.
```

### (3) Verdict

**`ACCEPTED_WITH_REVIEW`**

### (4) Reasoning

AI hoàn thành bản tổng hợp audit dựa trên prompt log và session metadata cục bộ. Nội dung vẫn cần người làm đọc lại để xác nhận mức độ chi tiết và thông tin sinh viên đúng trước khi nộp.

### (5) Student Fix

- Không cần copy markdown thủ công từ UI vì transcript jsonl và prompt log đã có trên máy.
- Kiểm tra lại file audit trong preview Markdown.
- Đảm bảo report không chứa token thật, OTP/resetToken thật hoặc dữ liệu nhạy cảm.

---

## 3. Tổng kết sử dụng AI

AI được dùng để hỗ trợ ba nhóm việc chính:

1. Tạo và cập nhật quy trình làm bài qua các skill Domain Testing, BVA và Prompt Log.
2. Sinh test case, test run draft và phần giải thích technique application cho FR-03, FR-11, FR-14 và FR-23.
3. Sau khi người làm test thủ công, hỗ trợ chuẩn hóa kết quả, xác minh lại bằng API công khai, viết bug report, AI gap analysis, main report và README.

Các artifact do AI tạo không được dùng nguyên trạng. Người làm đã review bằng cách chạy SUT, ghi note vào test run, yêu cầu AI xác minh lại case khả nghi, phân biệt lỗi SUT với AI gap/test setup gap, và yêu cầu sửa định dạng hoặc nội dung khi phát hiện thiếu rõ ràng.

## 4. Các điểm cần lưu ý khi chấm

- Domain Testing và BVA được xử lý theo hướng black-box: expected result dựa trên SRS, requirement, API specification công khai và hành vi quan sát được, không dựa trên source code.
- Các lần API verification chỉ dùng để kiểm tra lại actual behavior của SUT khi tester đã chạy hoặc nghi ngờ kết quả, không dùng để suy ra expected result từ implementation.
- Sensitive data như token thật, OTP/resetToken thật không được ghi vào audit report.
- Một số thay đổi setup mobile như IP LAN được ghi là AI gap/test setup gap, không tính là bug chức năng của SUT.
