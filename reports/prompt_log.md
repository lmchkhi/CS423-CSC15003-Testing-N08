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

## 2026-06-30 19:34 +07 - Trình bày lại phần derivation Domain Testing FR-03

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-03 |
| Technique | Domain Testing / Report Writing |
| Goal | Chỉnh phần giải thích cách tạo Domain Testing test cases trong `reports/main-report.md` để rõ quy trình: xác định biến đầu vào, phân hoạch tương đương, ràng buộc liên biến và tổng hợp test case |
| Files changed | `reports/main-report.md`, `reports/prompt_log.md` |

### Prompt

```text
hiện tại reports/main-report.md tôi thấy cách trình bày từng bước tạo ra test case của domain testing đang chưa rõ ràng lắm. có thể trình bày theo từng bước kiểu như Xác định biến đầu vào, Phân hoạch tương đương rồi tổng hợp test case không. không cần đổi test case chỉ cần trình bày lại cho chi tiết hơn thôi
```

### AI output

```text
Codex đọc lại skill Domain Testing và Prompt Log, sau đó chỉnh riêng phần FR-03 Domain Testing trong main-report.md. Nội dung mới trình bày theo 5 bước: xác định phạm vi/tác nhân, xác định biến đầu vào và trạng thái, phân hoạch tương đương, xác định ràng buộc liên biến, và tổng hợp 12 test case từ các lớp tương đương. Không thay đổi nội dung các file test case.
```

### Human review

- Người làm cần đọc lại phần 2.1 FR-03 - Domain Testing để bảo đảm cách diễn giải phù hợp với yêu cầu của giảng viên.
- Không có thay đổi về expected result, status, bug report hoặc test data.

## 2026-06-30 20:14 +07 - Thiết kế test case và test run cho FR-11

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-11 |
| Technique | Domain Testing / BVA / Report Writing |
| Goal | Dựa trên các skill trong `.codex/skills`, thiết kế test case FR-11, tạo test run chưa thực thi và cập nhật phần FR-11 trong main report theo cách trình bày của FR-03 |
| Files changed | `tests/test-cases/FR-11-order-history/domain-testing/TC-FR11-DT-001.md` đến `TC-FR11-DT-012.md`, `tests/test-cases/FR-11-order-history/bva/TC-FR11-BVA-001.md` đến `TC-FR11-BVA-003.md`, `tests/test-runs/FR-11-order-history-run.md`, `ai-gap-analysis/FR-11-order-history.md`, `reports/main-report.md`, `README.md`, `reports/prompt_log.md` |

### Prompt

```text
dựa vào các skill trong CS423-CSC15003-Testing-N08/.codex/skills, hãy viết các test case, điền những thông tin test run cho FR-11, cập nhật reports/main-report.md phần FR-11 (tham khảo cách trình bày của FR-03) và các file liên quan khác theo skill yêu cầu. Lưu ý chưa điền kết quả test case, sau khi có test case tôi sẽ test rồi thông báo lại kết quả sau để tạo bug report và cập nhật reports/main-report.md lần nữa.
```

### AI output

```text
Codex đọc skill Domain Testing, BVA và Prompt Log, sau đó đọc requirement.md, SystemRequirementsSpecification.md, api_specification.md, FR-03 report/test case mẫu và test run hiện có. Codex tạo 12 Domain Testing test cases cho auth, ownership, danh sách rỗng/nhiều đơn, truy cập chi tiết, các trường mã đơn/ngày đặt/tổng tiền và status tiếng Việt/màu sắc. Codex tạo 3 BVA test cases cho số lượng đơn hàng 0/1/nhiều vì SRS/API không nêu pagination/filter. Codex tạo test run FR-11 với toàn bộ Result = Not Run, cập nhật main-report.md phần FR-11, README summary và file AI gap analysis FR-11.
```

### Human review

- Cần người làm chuẩn bị dữ liệu đơn hàng cho các tài khoản `test@eshop.com`, `fr11.noorders@example.com`, `fr11.oneorder@example.com`, `fr11.other@example.com` trước khi chạy đầy đủ.
- Chưa tạo bug report vì toàn bộ test case FR-11 đang ở trạng thái `Not Run`.
- Nếu UI thực tế có pagination/filter/sort không được nêu trong SRS/API, cần bổ sung test case trước khi cập nhật kết quả cuối.

## 2026-06-30 20:26 +07 - Sửa format bảng FR-11 trong main report

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-11 |
| Technique | Report Writing |
| Goal | Sửa lỗi Markdown table ở Step 2 và Step 5 của FR-11 trong `reports/main-report.md` để hiển thị đúng dạng bảng |
| Files changed | `reports/main-report.md`, `reports/prompt_log.md` |

### Prompt

```text
hiện tại step 2 và step 5 của FR-11 ở reports/main-report.md đang bị sai định dạng nên chưa hiển thị thành dạng bảng, sửa giúp tôi
```

### AI output

```text
Codex sửa dòng separator của hai bảng FR-11 Step 2 và Step 5 từ 3 cột thành 4 cột, khớp với số cột header/nội dung. Không thay đổi nội dung test case hoặc kết quả test run.
```

### Human review

- Cần xem lại preview Markdown của `reports/main-report.md` để xác nhận hai bảng FR-11 đã render đúng.

## 2026-06-30 22:32 +07 - Cập nhật kết quả test run và bug report cho FR-11

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-11 |
| Technique | Domain Testing / BVA / Bug Reporting / Report Writing |
| Goal | Rà soát kết quả tester đã note trong test run FR-11, gọi API để kiểm tra case ownership khả nghi, cập nhật kết quả từng test case, tạo bug report và cập nhật các file summary liên quan |
| Files changed | `tests/test-runs/FR-11-order-history-run.md`, các test case FR-11 trong `tests/test-cases/FR-11-order-history/`, `bug-reports/BUG-FR11-007.md`, `bug-reports/BUG-FR11-012.md`, `ai-gap-analysis/FR-11-order-history.md`, `reports/main-report.md`, `README.md`, `reports/prompt_log.md` |

### Prompt

```text
tôi đã test các test case DT và BVA và có note kết quả ở tests/test-runs/FR-11-order-history-run.md. hãy xem qua sau đó chỉnh sửa, format lại nếu cần và chỉnh sửa các kết quả trong từng file test case, viết các file bug report và các file liên quan giúp tôi luôn. Lưu ý những test case nào khả nghi có thể tự gọi api để kiểm tra lại giúp tôi (tôi có chạy sẵn backend, frontend-admin và frontend-web rồi).
```

### AI output

```text
Codex đọc test run FR-11, bug report mẫu và các skill Domain Testing/BVA/Prompt Log. Codex gọi API localhost để kiểm tra lại case ownership: không đăng nhập gọi my-orders trả 401; user test có 15 đơn cá nhân; own-order detail `GET /api/orders/16` trả `user_id = 2`; other-order detail `GET /api/orders/4` với token user test trả `200 OK`, `user_id = 1`. Codex xem screenshot màu trạng thái và xác nhận `Đã xác nhận`/`Đang giao` dùng tông xanh lam gần nhau. Sau đó Codex cập nhật test run FR-11 thành 13 Passed, 2 Failed, 0 Not Run; cập nhật Status / Related bugs trong test cases; tạo 2 bug reports; cập nhật AI gap analysis, main report và README.
```

### Human review

- Cần người làm kiểm tra lại bug report và bổ sung link GitHub Issue/screenshot nếu cần.
- Không đưa token thật vào prompt log hoặc bug report; các ảnh API có token lộ trên UI không được nhúng trực tiếp vào bug report.
- Nếu muốn chuẩn hóa bug ID tuần tự toàn repo, có thể đổi `BUG-FR11-007`/`BUG-FR11-012` thành `BUG-FR11-001`/`BUG-FR11-002`, nhưng hiện tại giữ theo test case/screenshot đã có.

## 2026-07-01 01:08 +07 - Thiết kế test case và test run cho FR-14

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-14 |
| Technique | Domain Testing / BVA / Report Writing |
| Goal | Dựa trên các skill trong `.codex/skills`, thiết kế test case FR-14 Category management CRUD, tạo test run chưa thực thi và cập nhật phần FR-14 trong main report theo cách trình bày của FR-03 |
| Files changed | `tests/test-cases/FR-14-category-management/domain-testing/TC-FR14-DT-001.md` đến `TC-FR14-DT-016.md`, `tests/test-cases/FR-14-category-management/bva/TC-FR14-BVA-001.md` đến `TC-FR14-BVA-006.md`, `tests/test-runs/FR-14-category-management-run.md`, `ai-gap-analysis/FR-14-category-management.md`, `reports/main-report.md`, `README.md`, `reports/prompt_log.md` |

### Prompt

```text
dựa vào các skill trong CS423-CSC15003-Testing-N08/.codex/skills, hãy viết các test case, điền những thông tin test run cho FR-14, cập nhật reports/main-report.md phần FR-14 (tham khảo cách trình bày của FR-03) và các file liên quan khác theo skill yêu cầu. Lưu ý chưa điền kết quả test case, sau khi có test case tôi sẽ test rồi thông báo lại kết quả sau để tạo bug report và cập nhật reports/main-report.md lần nữa.
```

### AI output

```text
Codex đọc skill Domain Testing, Boundary Value Analysis và Prompt Log, sau đó đọc requirement.md, SystemRequirementsSpecification.md, api_specification.md, cách trình bày FR-03/FR-11 trong main-report.md và test run hiện có. Codex tạo 16 Domain Testing test cases cho quyền admin/guest/user, xem danh sách, thêm danh mục hợp lệ/rỗng/whitespace/Unicode, cập nhật danh mục hợp lệ/rỗng/không tồn tại/sai role, và xóa danh mục hợp lệ/không tồn tại/sai role. Codex tạo 6 BVA test cases cho min length tên danh mục 0/1/2 ký tự và số lượng danh mục 0/1/nhiều. Codex tạo test run FR-14 với toàn bộ Result = Not Run, cập nhật main-report.md phần FR-14, README summary và AI gap analysis ở trạng thái chưa thực thi.
```

### Human review

- Cần người làm chuẩn bị dữ liệu danh mục test như `FR14 Test Accessories`, `FR14 Update Source`, `FR14 Delete Target` trước khi chạy đầy đủ.
- Chưa tạo bug report vì toàn bộ test case FR-14 đang ở trạng thái `Not Run`.
- Nếu UI Admin không có thao tác sửa danh mục, cần ghi rõ trong test run và kiểm tra Update qua API `PUT /api/categories/:id` theo `api_specification.md`.

## 2026-07-01 02:15 +07 - Cập nhật kết quả test run và bug report cho FR-14

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-14 |
| Technique | Domain Testing / BVA / Bug Reporting / Report Writing |
| Goal | Rà soát kết quả tester đã note trong test run FR-14, gọi API để kiểm tra các case khả nghi, cập nhật kết quả từng test case, tạo bug report và cập nhật các file summary liên quan |
| Files changed | `tests/test-runs/FR-14-category-management-run.md`, các test case FR-14 liên quan trong `tests/test-cases/FR-14-category-management/`, `bug-reports/BUG-FR14-001.md`, `bug-reports/BUG-FR14-002.md`, `bug-reports/BUG-FR14-003.md`, `ai-gap-analysis/FR-14-category-management.md`, `reports/main-report.md`, `README.md`, `reports/prompt_log.md` |

### Prompt

```text
tôi đã test các test case DT và BVA và có note kết quả ở tests/test-runs/FR-14-category-management-run.md. hãy xem qua sau đó chỉnh sửa, format lại nếu cần và chỉnh sửa các kết quả trong từng file test case, viết các file bug report và các file liên quan giúp tôi luôn, hình như trong reports/main-report.md chỗ step 5 của domain testing của fr-14 đang bị sai định dạng nên chưa hiển thị dạng bảng được, sửa giúp tôi luôn nhé. Lưu ý những test case nào khả nghi có thể tự gọi api để kiểm tra lại giúp tôi (tôi có chạy sẵn backend, frontend-admin và frontend-web rồi).
```

### AI output

```text
Codex đọc lại các skill Domain Testing, BVA và Prompt Log, sau đó đọc test run FR-14, main report và bug report mẫu. Codex gọi API localhost để kiểm tra lại các case khả nghi: user token gọi POST/PUT/DELETE /api/categories đều trả 200 OK; admin token tạo/cập nhật category với tên rỗng hoặc whitespace vẫn trả 200 OK; PUT/DELETE /api/categories/999999 vẫn trả success giả. Codex dọn dữ liệu category tạm sau khi verify, cập nhật test run thành 13 Passed, 9 Failed, 0 Not Run; cập nhật Status / Related bugs trong từng test case failed; tạo 3 bug reports FR-14; cập nhật AI gap analysis, main report, README và sửa lỗi bảng Step 5 FR-14 trong main-report.md.
```

### Human review

- Cần người làm kiểm tra lại bug report và bổ sung link GitHub Issue/screenshot nếu cần.
- Không ghi token thật vào report/prompt log; API verification chỉ ghi role, endpoint, HTTP status và message.
- Dữ liệu category tạm dùng để verify đã được dọn, danh sách category còn 3 category mặc định: `Điện thoại`, `Laptop`, `Phụ kiện`.

## 2026-07-01 13:04 +07 - Thiết kế test case và test run cho FR-23

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-23 |
| Technique | Domain Testing / BVA / Report Writing |
| Goal | Dựa trên các skill trong `.codex/skills`, thiết kế test case FR-23 Mobile Forgot Password, tạo test run chưa thực thi, cập nhật main report và các file liên quan |
| Files changed | `tests/test-cases/FR-23-forgot-password-mobile/domain-testing/TC-FR23-DT-001.md` đến `TC-FR23-DT-012.md`, `tests/test-cases/FR-23-forgot-password-mobile/bva/TC-FR23-BVA-001.md` đến `TC-FR23-BVA-006.md`, `tests/test-runs/FR-23-forgot-password-mobile-run.md`, `ai-gap-analysis/FR-23-forgot-password-mobile.md`, `reports/main-report.md`, `README.md`, `reports/prompt_log.md` |

### Prompt

```text
dựa vào các skill trong CS423-CSC15003-Testing-N08/.codex/skills, hãy viết các test case, điền những thông tin test run cho FR-23, cập nhật reports/main-report.md phần FR-23 (tham khảo cách trình bày của FR-03) và các file liên quan khác theo skill yêu cầu. Lưu ý chưa điền kết quả test case, sau khi có test case tôi sẽ test rồi thông báo lại kết quả sau để tạo bug report và cập nhật reports/main-report.md lần nữa.
```

### AI output

```text
Codex đọc skill Domain Testing, Boundary Value Analysis và Prompt Log, sau đó đọc SRS FR-23, API forgot/reset password, FR-03 trong main report và các test run hiện có. Codex tạo 12 Domain Testing test cases cho email, điều hướng, trạng thái luồng, OTP, mật khẩu mới, xác nhận mật khẩu và yêu cầu hiển thị lỗi/điều hướng mobile; tạo 6 BVA test cases cho biên OTP length 5/6/7 và password length 7/8/9. Codex tạo test run FR-23 với toàn bộ Result = Not Run, cập nhật main-report.md phần FR-23 theo cấu trúc FR-03, cập nhật README summary và tạo AI gap placeholder.
```

### Human review

- Chưa tạo bug report vì toàn bộ test case FR-23 đang ở trạng thái `Not Run`.
- Người làm cần chạy ứng dụng mobile thật rồi cập nhật Result, Related Bug và Note trong `tests/test-runs/FR-23-forgot-password-mobile-run.md`.
- Nếu kết quả thực tế khác expected result, cần tạo bug report và cập nhật lại `reports/main-report.md`, `README.md`, file test case liên quan và `ai-gap-analysis/FR-23-forgot-password-mobile.md`.

## 2026-07-01 14:31 +07 - Sửa API URL mobile và ghi AI gap FR-23

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-23 |
| Technique | Other / AI Gap Analysis / Report Writing |
| Goal | Sửa `frontend-mobile/App.js` vì hard-coded LAN IP làm tester không chạy được mobile app, đồng thời ghi nhận đây là AI gap của FR-23 |
| Files changed | `frontend-mobile/App.js` (ignored by git), `tests/test-runs/FR-23-forgot-password-mobile-run.md`, `ai-gap-analysis/FR-23-forgot-password-mobile.md`, `reports/main-report.md`, `reports/prompt_log.md` |

### Prompt

```text
tôi không thể test trên mobile vì dòng:

const API_URL = "http://192.168.10.13:3000/api"; // IP LAN để chạy được trên iOS/Android và thiết bị thật

trong file frontend-mobile/App.js. cần sửa theo ip của tôi để chạy được đúng không. nếu đúng thì sửa thành const API_URL = "http://172.20.10.3:3000/api"; và xem đây là 1 phần AI gap và ghi vào ai-gap-analysis
```

### AI output

```text
Codex xác nhận mobile app cần dùng IP LAN truy cập được từ thiết bị thật/Expo. Codex sửa `frontend-mobile/App.js` thành `const API_URL = "http://172.20.10.3:3000/api";`, cập nhật test run FR-23 environment, `ai-gap-analysis/FR-23-forgot-password-mobile.md` và `reports/main-report.md` để ghi nhận đây là AI gap/test setup gap.
```

### Human review

- Đây là AI gap/test setup gap, chưa phải bug SUT vì chưa chạy test case chức năng FR-23.
- Cần đảm bảo backend lắng nghe trên `0.0.0.0` hoặc IP LAN và thiết bị mobile cùng mạng/hotspot với máy chạy backend.
- `frontend-mobile/` đang bị git ignore, nên cần chú ý nếu muốn đưa thay đổi mobile code vào commit/nộp bài.

## 2026-07-01 16:00 +07 - Cập nhật kết quả test run và bug report cho FR-23

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-23 |
| Technique | Domain Testing / BVA / Bug Reporting / Report Writing |
| Goal | Rà soát kết quả tester đã note trong test run FR-23, gọi API để kiểm tra các case khả nghi, cập nhật kết quả từng test case, tạo bug report và cập nhật các file summary liên quan |
| Files changed | `tests/test-runs/FR-23-forgot-password-mobile-run.md`, các test case FR-23 trong `tests/test-cases/FR-23-forgot-password-mobile/`, `bug-reports/BUG-FR23-001.md`, `bug-reports/BUG-FR23-002.md`, `bug-reports/BUG-FR23-003.md`, `bug-reports/BUG-FR23-004.md`, `ai-gap-analysis/FR-23-forgot-password-mobile.md`, `reports/main-report.md`, `README.md`, `reports/prompt_log.md` |

### Prompt

```text
tôi đã test các test case DT và BVA và có note kết quả ở tests/test-runs/FR-23-forgot-password-mobile-run.md. hãy xem qua sau đó chỉnh sửa, format lại nếu cần, xem các Result trong FR-23-forgot-password-mobile-run.md và Status trong các test case tôi có đánh đúng chưa và chỉnh sửa các kết quả trong từng file test case, viết các file bug report và các file liên quan giúp tôi luôn. Lưu ý những test case nào khả nghi có thể tự gọi api để kiểm tra lại giúp tôi (tôi có chạy sẵn backend và frontend-mobile rồi).
```

### AI output

```text
Codex đọc lại các skill Domain Testing, BVA và Prompt Log, sau đó đọc test run FR-23, SRS/API spec và bug report mẫu. Codex gọi API localhost để kiểm tra lại các case khả nghi: forgot-password với email hợp lệ trả resetToken 4 chữ số; email rỗng/sai định dạng trả 404 User not found; OTP 5/7 chữ số bị từ chối bằng 400 Invalid token or email; reset-password với mật khẩu 8/9 ký tự hợp lệ được backend chấp nhận khi có token hợp lệ. Codex restore mật khẩu test@eshop.com về Password123! sau khi verify. Sau đó Codex cập nhật test run thành 8 Passed, 8 Failed, 2 Blocked, 0 Not Run; cập nhật Status / Related bugs trong từng test case; tạo 4 bug reports FR-23; cập nhật AI gap analysis, main report và README.
```

### Human review

- Không ghi OTP/resetToken thật vào report hoặc prompt log; chỉ ghi status, message và độ dài token.
- Hai case Blocked được giữ riêng vì mobile UI không hiển thị OTP nên không thể thực hiện đầy đủ luồng trên mobile.
- Cần người làm kiểm tra lại bug report và bổ sung link GitHub Issue/screenshot/video nếu cần.

## 2026-07-01 17:23 +07 - Tổng hợp AI Audit Report

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | General |
| Technique | Report Writing / AI Audit |
| Goal | Điền `reports/ai-audit-report.md` theo template, dựa trên `reports/prompt_log.md`, các skill trong `.codex/skills`, và 4 session id Codex cho FR-03, FR-11, FR-14, FR-23 |
| Files changed | `reports/ai-audit-report.md`, `reports/prompt_log.md` |

### Prompt

```text
xem các skill tại .codex/skills, sau đó dựa vào prompt_log hoặc các session id chat sau:
019f04c9-9def-7bd3-bf04-7f243fe23917
019f18a9-fc18-7960-8cf4-dbbfbe42cc46
019f19af-f7f0-7942-ae61-255a303fdd14
019f1c45-19b3-7be0-b6fe-70357f747bf3

tôi cần điền file reports/ai-audit-report.md theo template reports/ai-audit-report-template.md.  tôi thấy trong mỗi session chat có chức năng copy markdown, có thể dùng chức năng đó cho tiện không, nếu được thì cứ dùng đi
```

### AI output

```text
Codex đọc skill Prompt Log, Domain Testing và BVA; đọc template AI Audit Report, prompt_log.md, danh sách session id trong ~/.codex/session_index.jsonl và các transcript jsonl tương ứng. Codex điền reports/ai-audit-report.md với thông tin sinh viên, nguồn audit, 17 entry audit theo format template gồm Prompt + Tool, AI Output, Verdict, Reasoning và Student Fix, sau đó kiểm tra cấu trúc entry, code fences và git diff --check.
```

### Human review

- Người làm cần xem lại `reports/ai-audit-report.md` để đảm bảo mức độ chi tiết phù hợp yêu cầu nộp.
- Chức năng copy markdown trong UI không được dùng trực tiếp; thay vào đó Codex đọc transcript jsonl cục bộ và `prompt_log.md`, nên không cần copy tay.
- Report tránh ghi token thật, OTP/resetToken thật hoặc dữ liệu nhạy cảm.

## 2026-07-06 15:47 +07 - Tạo skill State Transition Testing và Use Case Testing

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | General |
| Technique | Skill Creation |
| Goal | Tạo 2 skill mới cho HW02 EShop để áp dụng kỹ thuật State Transition Testing và Use Case Testing khi thiết kế/phát sinh test case |
| Files changed | `.codex/skills/state-transition-testing-eshop/SKILL.md`, `.codex/skills/state-transition-testing-eshop/agents/openai.yaml`, `.codex/skills/use-case-testing-eshop/SKILL.md`, `.codex/skills/use-case-testing-eshop/agents/openai.yaml`, `reports/prompt_log.md` |

### Prompt

```text
[$skill-creator](/home/thanhngo/.codex/skills/.system/skill-creator/SKILL.md) giúp tôi tạo 2 skill cho việc áp dụng kĩ thuật state transition testing và use case testing để thiết kế và phát sinh test case
```

### AI output

```text
Codex dùng skill-creator để scaffold 2 skill trong `.codex/skills`: `state-transition-testing-eshop` và `use-case-testing-eshop`. Mỗi skill có `SKILL.md` mô tả nguyên tắc black-box, tài liệu cần đọc, quy trình phân tích, gợi ý theo FR-03/FR-11/FR-14/FR-23, template test case Markdown và tiêu chuẩn chất lượng. Codex cũng tạo/cập nhật `agents/openai.yaml`, sửa lỗi shell làm mất literal `$skill-name` trong default prompt, rồi chạy `quick_validate.py` và cả hai skill đều hợp lệ.
```

### Human review

- Người làm cần đọc lại hai skill mới để xác nhận tên thư mục test case (`state-transition-testing`, `use-case-testing`) và format mã test case (`ST`, `UC`) phù hợp với cách nộp bài.
- Chưa phát sinh test case mới trong lần này; các skill chỉ chuẩn bị quy trình cho những lần thiết kế test tiếp theo.

## 2026-07-06 15:52 +07 - Sửa skill sang tiếng Việt có dấu

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | General |
| Technique | Skill Creation |
| Goal | Chuyển nội dung 2 skill State Transition Testing và Use Case Testing từ tiếng Việt không dấu sang tiếng Việt có dấu |
| Files changed | `.codex/skills/state-transition-testing-eshop/SKILL.md`, `.codex/skills/use-case-testing-eshop/SKILL.md`, `reports/prompt_log.md` |

### Prompt

```text
sửa lại skill dùng tiếng việt có dấu
```

### AI output

```text
Codex sửa lại toàn bộ phần description và body của `state-transition-testing-eshop/SKILL.md` và `use-case-testing-eshop/SKILL.md` sang tiếng Việt có dấu, giữ nguyên `name` dạng hyphen-case để skill vẫn trigger đúng. Codex chạy `quick_validate.py` cho cả hai skill và đều hợp lệ.
```

### Human review

- Người làm cần đọc nhanh hai skill mới để xác nhận câu chữ tiếng Việt phù hợp văn phong bài nộp.
- Không phát sinh hoặc sửa test case trong lần này.

## 2026-07-06 15:57 +07 - Cập nhật skill State Transition cho FR-02

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-02 / General |
| Technique | Skill Creation |
| Goal | Thêm FR-02 Login and account lockout vào gợi ý state của skill State Transition Testing và làm rõ các FR trong skill là gợi ý có sẵn, không phải giới hạn cứng |
| Files changed | `.codex/skills/state-transition-testing-eshop/SKILL.md`, `.codex/skills/use-case-testing-eshop/SKILL.md`, `reports/prompt_log.md` |

### Prompt

```text
à 2 skill đang mặc định dùng cho các FR cụ thể như FR-03, FR-11, FR-14, FR-23. nhưng tôi định dùng skill state transition cho FR-02 và use case cho FR-03 để tạo test case. có thể thêm FR-02 vào Gợi ý state theo feature
```

### AI output

```text
Codex đọc SRS/API cho FR-02 và cập nhật `state-transition-testing-eshop/SKILL.md`: thêm FR-02 vào description, danh sách feature có gợi ý sẵn, và thêm section `FR-02 Login and account lockout` với object, state, event, guard, valid/invalid transition và API `POST /api/login`. Codex cũng chỉnh wording trong `use-case-testing-eshop/SKILL.md` để nói rõ các FR hiện có là gợi ý có sẵn, còn skill vẫn áp dụng được cho FR khác nếu phù hợp kỹ thuật. Cả hai skill được validate lại bằng `quick_validate.py`.
```

### Human review

- FR-02 hợp với State Transition vì có failed-login counter, trạng thái account locked, lockout timer 30 giây và authenticated session.
- Use Case Testing cho FR-03 đã có sẵn trong skill nên chưa cần thêm section mới.

## 2026-07-06 16:11 +07 - Tạo test design analysis FR-02 State Transition

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-02 / General |
| Technique | State Transition Testing / Skill Creation |
| Goal | Tạo test design analysis cho FR-02 bằng State Transition Testing và cập nhật 2 skill mới để bắt buộc đọc test design analysis trước khi tạo test case |
| Files changed | `tests/test-design/FR-02-login-state-transition.md`, `.codex/skills/state-transition-testing-eshop/SKILL.md`, `.codex/skills/use-case-testing-eshop/SKILL.md`, `reports/prompt_log.md` |

### Prompt

```text
tạo test design analysis cho FR-02 dùng state transition testing đặt ở tests/test-design giúp tôi và chỉnh sửa 2 skill mới yêu cầu đọc test design analysis trước mới tạo test case (chưa cần tạo test design analysis cho FR-03 dùng state transition)
```

### AI output

```text
Codex tạo `tests/test-design/FR-02-login-state-transition.md` gồm source documents, black-box principles, assumptions, state definitions, events, guards, state transition table, coverage strategy, candidate test case derivation, test data guidance và AI gap notes cho FR-02 Login/account lockout. Codex cập nhật `state-transition-testing-eshop` và `use-case-testing-eshop` để trước khi sinh test case phải đọc file liên quan trong `tests/test-design/`; nếu chưa có test design analysis thì tạo/đề xuất tạo trước. Không tạo test design analysis FR-03 State Transition và chưa tạo test case chi tiết.
```

### Human review

- Người làm cần đọc lại candidate TC trong file design FR-02 để quyết định số lượng test case chi tiết sẽ tạo sau này.
- Khi sinh test case FR-02, dùng file design này làm nguồn trace chính cho transition ID và coverage.

## 2026-07-06 16:18 +07 - Tạo test case FR-02 State Transition

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-02 |
| Technique | State Transition Testing |
| Goal | Dùng skill State Transition Testing và test design analysis FR-02 để tạo test case chi tiết cho FR-02 Login/account lockout |
| Files changed | `tests/test-cases/FR-02-login/state-transition-testing/TC-FR02-ST-001.md` đến `TC-FR02-ST-009.md`, `reports/prompt_log.md` |

### Prompt

```text
oke dùng skill .codex/skills/state-transition-testing-eshop/SKILL.md và tests/test-design/FR-02-login-state-transition.md để tạo test case cho FR-02 giúp tôi. chưa cần sửa reports/main-report.md
```

### AI output

```text
Codex đọc skill State Transition Testing, file `tests/test-design/FR-02-login-state-transition.md`, prompt-log skill và các test case mẫu. Codex tạo 9 test case Markdown cho FR-02 trong `tests/test-cases/FR-02-login/state-transition-testing/`, bao phủ T1/T9 login thành công và dùng JWT, T2 sai lần 1, T2/T3 sai lần 2, T2/T3/T4 khóa sau lần sai thứ 3, T5 login đúng khi đang bị khóa, T6/T7 hết 30 giây rồi login lại, T8 email sai định dạng bị UI chặn, T2/T10 sai 1 lần rồi đúng, và T2/T3/T11 sai 2 lần rồi đúng. Toàn bộ test case đang ở trạng thái `Not Run / None`. Codex không sửa `reports/main-report.md`.
```

### Human review

- Người làm cần chạy SUT thật rồi ghi kết quả vào test run/test case sau.
- Các test lockout nên dùng tài khoản test riêng hoặc đảm bảo tài khoản `test@eshop.com` được đưa về trạng thái không khóa trước mỗi case để tránh nhiễu giữa các test.

## 2026-07-06 16:31 +07 - Tạo test run FR-02 chưa thực thi

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-02 |
| Technique | State Transition Testing / Test Run |
| Goal | Tạo file test run cho FR-02 với toàn bộ kết quả ở trạng thái Not Run để người làm thực thi và cập nhật sau |
| Files changed | `tests/test-runs/FR-02-login-run.md`, `reports/prompt_log.md` |

### Prompt

```text
viết thêm test run cho fr02 nữa, kết quả cứ để not run tôi sẽ test rồi cập nhật lại sau
```

### AI output

```text
Codex tham khảo format các test run hiện có và tạo `tests/test-runs/FR-02-login-run.md` cho FR-02 Đăng nhập & Khóa tài khoản. File gồm thông tin chung, section State Transition Testing với 9 test case `TC-FR02-ST-001` đến `TC-FR02-ST-009`, toàn bộ Result = `Not Run`, Related Bug/Note để trống, và tổng kết Passed 0, Failed 0, Blocked 0, Not Run 9, Tổng 9.
```

### Human review

- Người làm sẽ chạy 9 test case FR-02 trên SUT thật rồi cập nhật Result, Related Bug và Note.
- Khi có Failed hoặc Blocked, cần tạo/ghi bug report hoặc lý do rõ ràng theo ghi chú trong test run.

## 2026-07-06 16:41 +07 - Cập nhật kết quả test run và bug report cho FR-02

| Field | Value |
| --- | --- |
| AI tool | Codex |
| Feature | FR-02 |
| Technique | State Transition Testing / Bug Reporting |
| Goal | Rà soát kết quả tester đã note trong test run FR-02, chuẩn hóa test run/test case status và tạo bug report |
| Files changed | `tests/test-runs/FR-02-login-run.md`, các test case FR-02 liên quan trong `tests/test-cases/FR-02-login/state-transition-testing/`, `bug-reports/BUG-FR02-001.md`, `bug-reports/BUG-FR02-002.md`, `bug-reports/BUG-FR02-003.md`, `reports/prompt_log.md` |

### Prompt

```text
tôi đã test và điền kết quả, note vào test run rồi, đọc lại và chỉnh sửa, format nếu cần sau đó tạo bug report cho tôi
```

### AI output

```text
Codex đọc `tests/test-runs/FR-02-login-run.md`, các test case FR-02 và bug report mẫu. Codex chuẩn hóa test run thành 5 Passed, 4 Failed, 0 Blocked, 0 Not Run; cập nhật Related Bug cho các case failed và case passed có observation phụ. Codex cập nhật Status / Related bugs trong các test case FR-02 liên quan và tạo 3 bug report: `BUG-FR02-001` cho lỗi bị khóa sau 2 lần sai dù lần thứ 3 nhập đúng, `BUG-FR02-002` cho lỗi khóa lâu hơn 30 giây, và `BUG-FR02-003` cho lỗi email sai định dạng vẫn gọi API login.
```

### Human review

- Bug report dựa trên note tester trong test run; chưa có API verification bổ sung trong lần này.
- Người làm cần bổ sung screenshot/video hoặc GitHub Issue link nếu bài nộp yêu cầu bằng chứng trực quan.
