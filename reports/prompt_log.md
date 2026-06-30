# Prompt Log

File này ghi lại các lần sử dụng AI trong quá trình làm HW02 để tổng hợp AI Audit Report.

## 2026-06-26 18:58 +07 - Tạo skill hỗ trợ HW02

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | General |
| Technique | Skill Creation |
| Goal | Tạo/cập nhật skill cho Domain Testing, Boundary Value Analysis và prompt logging dựa trên requirement.md và SystemRequirementsSpecification.md |
| Files changed | `.codex/skills/domain-testing-eshop/SKILL.md`, `.codex/skills/boundary-value-analysis-eshop/SKILL.md`, `.codex/skills/prompt-log-eshop/SKILL.md`, `reports/prompt_log.md` |

### Prompt

```text
Đọc requirement.md và cấu trúc repo hiện tại, viết 2 file skill cho domain testing và boundary value analysis techniques bằng tiếng Việt cho FR-03, FR-11, FR-14, FR-23. Sau đó, khi có SystemRequirementsSpecification.md mới, đánh giá có cần sửa skill không và có cần thêm skill ghi prompt log ra prompt_log.md để viết AI Audit Report không.
```

### AI output

```text
Codex tạo 2 skill Domain Testing/BVA trong .codex/skills, sau đó cập nhật nội dung theo SystemRequirementsSpecification.md. Ở thời điểm này SRS đang mô tả FR-23 là Navigation Requirements, nhưng sau đó người làm xác nhận SRS sai và FR-23 đúng là FR-03 trên mobile. Codex cũng tạo thêm skill prompt-log-eshop và file reports/prompt_log.md để ghi nhật ký AI.
```

### Human review

- Cần kiểm tra lại các skill trước khi dùng chính thức cho từng FR.
- Khi sinh test case thật, cần bổ sung prompt/output cụ thể theo từng lần dùng AI.

## 2026-06-26 18:58 +07 - Sửa FR-23 theo xác nhận của người làm

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-23 |
| Technique | Requirement Correction / Skill Update |
| Goal | Sửa các nội dung liên quan vì FR-23 đúng là luồng Quên mật khẩu & Đặt lại mật khẩu trên Mobile, không phải Navigation Requirements |
| Files changed | `SystemRequirementsSpecification.md`, `.codex/skills/domain-testing-eshop/SKILL.md`, `.codex/skills/boundary-value-analysis-eshop/SKILL.md`, `reports/prompt_log.md` |

### Prompt

```text
à FR-23 là FR-03 nhưng trên mobile mới đúng, file SRS đang sai. sửa lại những nội dung liên quan giúp tôi
```

### AI output

```text
Codex sửa SRS để FR-23 trở thành Quên mật khẩu & Đặt lại mật khẩu trên Mobile, cập nhật skill Domain Testing và BVA để FR-23 dùng cùng logic FR-03 nhưng có thêm miền/biên đặc thù mobile, đồng thời sửa prompt log để ghi nhận correction này.
```

### Human review

- Cần dùng định nghĩa FR-23 mới này cho toàn bộ test case và report về sau.
- Nếu còn tài liệu nào nhắc FR-23 là Navigation Requirements, cần sửa trước khi nộp.

## 2026-06-26 18:58 +07 - Cập nhật skill theo black-box testing

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | General |
| Technique | Skill Update / Prompt Logging |
| Goal | Sửa skill để phù hợp với Domain Testing và BVA là black-box testing, không dùng source code; bổ sung phần giải thích từng bước áp dụng kỹ thuật và format thời gian có giờ phút trong prompt log |
| Files changed | `.codex/skills/domain-testing-eshop/SKILL.md`, `.codex/skills/boundary-value-analysis-eshop/SKILL.md`, `.codex/skills/prompt-log-eshop/SKILL.md`, `reports/prompt_log.md` |

### Prompt

```text
lưu ý giáo viên có nói đến việc ([Domain Testing](https://courses.ctda.hcmus.edu.vn/mod/hvp/view.php?id=110141) và Boundary Value Analysis) là Blackbox Testing nên không cần source code nên trong branch này đã được xóa source rồi, hình như trong skill đang tưởng có code để kiểm tra lại. hãy sửa các phần liên quan cho phù hợp. và trong đề chỗ ### 6. Requirements có nói đến: Provide a detailed, step-by-step explanation of how you applied the technique. là cần giải thích từng bước để tạo ra mỗi test case đúng không, vậy phần giải thích đó trình bày ở đâu, template như thế nào. về prompt_log phần thời gian thì cần thêm giờ vào nữa
```

### AI output

```text
Codex cập nhật skill Domain Testing và BVA để chỉ dựa trên requirement, SRS, UI/flow quan sát được và dữ liệu test, không dùng source code. Codex bổ sung section Technique Application Explanation vào template test case và cập nhật prompt log để dùng format ngày giờ có giờ phút.
```

### Human review

- Cần dùng template mới khi tạo test case thật cho FR-03, FR-11, FR-14 và FR-23.
- Khi viết report cuối, có thể tổng hợp phần Technique Application Explanation từ từng test case hoặc từng nhóm test case.

## 2026-06-26 19:25 +07 - Cập nhật theo API specification và hướng dẫn report

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | General |
| Technique | Skill Update / Report Template |
| Goal | Thêm api_specification.md làm nguồn black-box hợp lệ và chuyển phần giải thích cách tạo test case sang main report theo câu trả lời của giảng viên |
| Files changed | `.codex/skills/domain-testing-eshop/SKILL.md`, `.codex/skills/boundary-value-analysis-eshop/SKILL.md`, `.codex/skills/prompt-log-eshop/SKILL.md`, `reports/main-report.md`, `reports/prompt_log.md` |

### Prompt

```text
tôi có thêm thông tin về các api ở CS423-CSC15003-Testing-N08/api_specification.md. hãy chỉnh sửa các thông tin liên quan. và về phần trình bày các bước để tạo ra test case thì có người hỏi giảng viên ... được trả lời: Trình bày các bước để tạo ra 19 test cases nhé. vậy thì phải trình bày ở main report chứ không trình bày trong từng file test case như hiện tại hả
```

### AI output

```text
Codex cập nhật skill Domain Testing/BVA để đọc api_specification.md như tài liệu black-box công khai, bổ sung endpoint liên quan cho FR-03, FR-11, FR-14, FR-23. Codex cập nhật main-report.md với cấu trúc Domain Testing Report và BVA Report có bảng Step-by-Step Test Case Derivation cho từng test case, đồng thời điều chỉnh skill để phần giải thích nằm trong main report thay vì bắt buộc trong từng file test case.
```

### Human review

- Cần điền bảng Step-by-Step Test Case Derivation cho tất cả test cases thật sau khi thiết kế xong.
- File test case vẫn cần đủ precondition, test data, steps và expected result; main report là nơi giải thích cách tạo ra từng test case.

## 2026-06-26 19:41 +07 - Cập nhật SRS Mobile FR và timezone prompt log

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | General / Mobile |
| Technique | Requirement Correction / Prompt Logging |
| Goal | Đổi prompt log sang giờ Việt Nam và sửa section Mobile trong SRS để FR-20 đến FR-24 là các bản mobile của các FR trước |
| Files changed | `SystemRequirementsSpecification.md`, `.codex/skills/prompt-log-eshop/SKILL.md`, `reports/prompt_log.md` |

### Prompt

```text
sửa lại định dạng giờ trong prompt log sang giờ Việt Nam. và trong CS423-CSC15003-Testing-N08/SystemRequirementsSpecification.md thì sửa phần ## 7. Phân hệ Mobile (React Native) là các FR như sau (bản mobile của các FR trước):
FR-20: Shopping cart
FR-21: Checkout
FR-22: Discount coupons
FR-23: Forgot password and password reset (two steps)
FR-24: Order history view (user)

(FR-23 đang đúng rồi)
```

### AI output

```text
Codex đổi các heading thời gian trong prompt_log.md từ UTC sang +07, cập nhật skill prompt-log-eshop để dùng timezone Asia/Ho_Chi_Minh, và sửa SystemRequirementsSpecification.md để section Mobile gồm FR-20 Shopping cart, FR-21 Checkout, FR-22 Discount coupons, FR-23 Forgot/reset password, FR-24 Order history. Các yêu cầu GUI cũ được đổi mã sang GUI-01, GUI-02, GUI-03 để tránh trùng FR.
```

### Human review

- Cần dùng mã FR mobile mới khi chọn hoặc báo cáo mobile features.
- FR-23 vẫn là feature được chọn cho bài hiện tại, nên skill Domain Testing/BVA hiện tại chưa cần đổi feature selected.

## 2026-06-26 23:42 +07 - Thiết kế test case và test run cho FR-03

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-03 |
| Technique | Domain Testing / BVA / Test Run |
| Goal | Dựa trên các skill trong `.codex/skills`, thiết kế test case cho FR-03 Quên mật khẩu & Đặt lại mật khẩu, tạo test run ở trạng thái chưa thực thi và cập nhật phần giải thích trong main report |
| Files changed | `tests/test-cases/FR-03-forgot-password/domain-testing/TC-FR03-DT-001.md` đến `TC-FR03-DT-012.md`, `tests/test-cases/FR-03-forgot-password/bva/TC-FR03-BVA-001.md` đến `TC-FR03-BVA-006.md`, `tests/test-runs/FR-03-forgot-password-run.md`, `reports/main-report.md`, `reports/prompt_log.md` |

### Prompt

```text
dựa vào các skill trong CS423-CSC15003-Testing-N08/.codex/skills, hãy viết các test case và điền những thông tin test run cho FR-03 giúp tôi. Lưu ý chưa điền kết quả, sau khi có test case tôi sẽ test rồi thông báo lại kết quả sau. nhớ xem skill prompt log và viết prompt_log.md nữa
```

### AI output

```text
Codex đọc các skill Domain Testing, Boundary Value Analysis và Prompt Log, sau đó đọc requirement.md, SystemRequirementsSpecification.md, api_specification.md và template test run hiện có. Codex tạo 12 Domain Testing test cases cho các miền email, điều hướng, trạng thái luồng, OTP, mật khẩu mới và xác nhận mật khẩu; tạo 6 BVA test cases cho biên độ dài OTP 5/6/7 chữ số và mật khẩu mới 7/8/9 ký tự. Codex tạo test run FR-03 với toàn bộ Result = Not Run, cập nhật main-report.md phần FR-03 và ghi entry prompt log này.
```

### Human review

- Cần người làm chạy SUT thật rồi điền Result, Related Bug và Note trong `tests/test-runs/FR-03-forgot-password-run.md`.
- Nếu kết quả thực tế khác expected result, cần tạo bug report/GitHub Issue và cập nhật lại Execution Summary.

## 2026-06-30 15:23 +07 - Cập nhật kết quả test run và bug report cho FR-03

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-03 |
| Technique | Domain Testing / BVA / Bug Reporting / Report Writing |
| Goal | Rà soát kết quả tester đã note trong test run FR-03, gọi API để kiểm tra các case khả nghi, cập nhật kết quả trong từng test case, tạo bug report và cập nhật các file summary liên quan |
| Files changed | `tests/test-runs/FR-03-forgot-password-run.md`, các test case FR-03 trong `tests/test-cases/FR-03-forgot-password/`, `bug-reports/BUG-FR03-001.md` đến `BUG-FR03-005.md`, `ai-gap-analysis/FR-03-forgot-password.md`, `reports/main-report.md`, `README.md`, `reports/prompt_log.md` |

### Prompt

```text
tôi đã test các test case DT và BVA và có note kết quả ở tests/test-runs/FR-03-forgot-password-run.md. hãy xem qua sau đó chỉnh sửa, format lại nếu cần và chỉnh sửa các kết quả trong từng file test case, viết các file bug report và các file liên quan giúp tôi luôn. Lưu ý những test case nào khả nghi có thể tự gọi api để kiểm tra lại giúp tôi (tôi có chạy sẵn backend và frontend-web rồi).
```

### AI output

```text
Codex đọc test run FR-03, bug report mẫu và prompt-log skill. Codex gọi API localhost để kiểm tra lại các điểm khả nghi: forgot-password trả resetToken 4 chữ số; email sai định dạng trả 404 User not found; reset-password với OTP sai trả lỗi token/email; reset-password với mật khẩu mạnh hợp lệ thành công qua backend; OTP của email khác bị từ chối đúng. Codex khôi phục mật khẩu mặc định của test@eshop.com sau khi kiểm tra API. Sau đó Codex chuẩn hóa test run thành 7 Passed, 11 Failed, 0 Not Run; cập nhật Status / Related bugs trong từng test case; tạo 5 bug reports FR-03; tạo AI gap analysis; cập nhật main report và README.
```

### Human review

- Cần người làm kiểm tra lại nội dung bug report và bổ sung link GitHub Issue/screenshot nếu có.
- API verification cho thấy lỗi mật khẩu mạnh nằm ở frontend validation, không phải backend reset API.
- Một số test Passed vẫn có Related Bug dạng observation vì trong lúc chạy case chính có phát hiện lỗi giao diện phụ như thiếu confirm password hoặc OTP 4 chữ số.
