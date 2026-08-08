# AI Audit Report (AI-02)

## Thông tin sinh viên

## 1. Thông tin Sinh viên

| Mục                     | Giá trị                 |
| :---------------------- | :---------------------- |
| **Họ tên sinh viên:**   | Lâm Vĩ Khang            |
| **MSSV:**               | 23127062                |
| **Lớp / Khoá:**         | CS423 / CSC13003        |
| **Mã bài tập :**        | HW04                    |
| **Ngày làm bài:**       | 03/08/2026 - ../08/2026 |
| **Công cụ AI đã dùng:** | Claude; Codex           |

## Entry #1

### (1) Prompt + Tool

| Field             | Content                                                     |
| ----------------- | ----------------------------------------------------------- |
| **Tool**          | GPT-5.6 Sol                                                 |
| **Timestamp**     | 03/08/2026 12:56:16                                         |
| **Artifact type** | Tạo agent skill hỗ trợ kiểm thử tự động Playwright cho HW04 |

**Full prompt:**

```
Dựa vào specs pdf của HW04, giúp tôi tạo một agent skill giúp với automation testing.
Cụ thể, khi user input một feature hệ thống thì agent sẽ phân tích rồi tạo ra:
- Ít nhất 12 test case (mỗi test case trình bày bằng 1 file markdown theo format trong [03 - github_testcase_management.pptx](.lvkhang/03 - github_testcase_management.pptx))
- Chuyển các test case vừa tạo thành automation scripts (sử dụng Playwright, cho 3 nền tảng Chromium/Firefox/WebKit, phải đạt ít nhất 3 assertion patterns khác nhau, không sử dụng các giá trị hard-coded)
- Các test data được lưu riêng trong các file .csv hoặc .json
- Multi-browser HTML report của feature đó, có chứa "Run by: {StudentID}" (StudentID sẽ được user cung cấp) sau khi run automation script
- Nếu có bug xảy ra, tạo 1 file bug report markdown theo format trong [03 - github_testcase_management.pptx](.lvkhang/03 - github_testcase_management.pptx)
```

### (2) AI Output

'''
Mình sẽ dùng `skill-creator` để đóng gói workflow thành một agent skill tái sử dụng, đồng thời dùng kỹ năng PDF và Presentations để đọc đúng rubric HW04 cùng format test case/bug report từ slide. Trước tiên mình sẽ kiểm tra các tài liệu và cấu trúc repo, sau đó tạo skill và chạy kiểm tra hợp lệ.

Mình đã tìm thấy đúng hai nguồn: PDF đặc tả HW04 và deck hướng dẫn quản lý test case. Skill sẽ được đặt trong repo tại `skills/` để có thể version-control cùng bài tập; mình đang trích xuất cả nội dung lẫn cấu trúc biểu mẫu trước khi viết workflow.

Các ràng buộc quan trọng đã được xác nhận trực tiếp từ tài liệu: tối thiểu 12 case/feature, data ngoài script, ít nhất 3 kiểu assertion, chạy riêng Chromium/Firefox/WebKit, report thật có StudentID và ISO timestamp, đồng thời chỉ lập bug report khi failure đã được phân loại là lỗi sản phẩm thực sự. Mình sẽ đưa các “quality gate” này vào một validator đi kèm skill để tránh chỉ dựa vào checklist thủ công.

Skill đã có workflow, hai template Markdown, tài liệu triển khai Playwright và một validator kiểm tra cấu trúc/traceability/report. Giờ mình đang chạy hai lớp kiểm tra: validator chính thức của hệ thống skill và một fixture mẫu “đạt chuẩn” để chắc rằng quality gate không chỉ chạy được mà còn nhận đúng một feature hợp lệ.

Một điểm triển khai cần xác minh theo phiên bản Playwright hiện hành là cách gắn chuỗi nhận diện vào HTML report. Mình đang đối chiếu tài liệu chính thức để bảo đảm skill dùng tùy chọn reporter được hỗ trợ, rồi sẽ chốt lần kiểm tra cuối.

Đã tạo agent skill tại [hw04-playwright-automation/SKILL.md](/Users/lvkhang/Documents/uni/software-testing/HW04/skills/hw04-playwright-automation/SKILL.md).

Skill bao gồm:

- Workflow phân tích feature và tạo tối thiểu 12 test case.
- Template [test case](/Users/lvkhang/Documents/uni/software-testing/HW04/skills/hw04-playwright-automation/assets/test-case-template.md) theo slide 7. :codex-file-citation{path="/Users/lvkhang/Documents/uni/software-testing/HW04/.lvkhang/03 - github_testcase_management.pptx" purpose="source" artifact_kind="presentation" slide_number="7"}
- Template [bug report](/Users/lvkhang/Documents/uni/software-testing/HW04/skills/hw04-playwright-automation/assets/bug-report-template.md) theo slide 12. :codex-file-citation{path="/Users/lvkhang/Documents/uni/software-testing/HW04/.lvkhang/03 - github_testcase_management.pptx" purpose="source" artifact_kind="presentation" slide_number="12"}
- Hướng dẫn Playwright data-driven, Chromium/Firefox/WebKit, tối thiểu ba assertion patterns.
- Report riêng cho từng browser, chứa `Run by: <StudentID>` và ISO timestamp bằng Playwright metadata chính thức.
- Quy trình phân loại test defect, infrastructure failure và product bug.
- [Validator tự động](/Users/lvkhang/Documents/uni/software-testing/HW04/skills/hw04-playwright-automation/scripts/validate_feature.py) kiểm tra test case, dữ liệu, traceability, assertions, browsers, reports và bug report.

Các yêu cầu được tổng hợp từ HW04 specification. :codex-file-citation{path="/Users/lvkhang/Documents/uni/software-testing/HW04/.lvkhang/2026.HW04.Automation Testing_En.pdf" purpose="source"}

Skill đã vượt qua structural validation và một fixture thử nghiệm gồm 12 test case cùng ba browser report. Phần cấu hình dựa trên tài liệu chính thức về [Playwright metadata](https://playwright.dev/docs/api/class-testconfig), [HTML reporter](https://playwright.dev/docs/test-reporters) và [multi-browser projects](https://playwright.dev/docs/test-projects).

Chưa tạo report giả ở bước này; report chỉ được sinh khi skill thực sự chạy một feature với StudentID được cung cấp.
'''

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

- AI tạo skills theo yêu cầu để thực hiện web automation testing, nhưng đặt tên bị mặc định là HW04.

### (5) Student Fix

- Chỉnh sửa lại skills bỏ các mặc định về HW04 để skills reusable hơn.

## Entry #2

### (1) Prompt + Tool

| Field             | Content                                                     |
| ----------------- | ----------------------------------------------------------- |
| **Tool**          | GPT-5.6 Sol                                                 |
| **Timestamp**     | 05/08/2026 10:35:55                                         |
| **Artifact type** | Kiểm thử Playwright FR-01 và liên kết bug với GitHub Issues |

**Full prompt:**

```
Sử dụng skill [playwright-automation](skills/playwright-automation/) để thực hiện test cho FR-01 được đặc tả trong file readme ở root

Token không hợp lệ có thể vì sandbox, gh auth status trong terminal vẫn trả về token còn hợp lệ
```

### (2) AI Output

'''
Mình sẽ dùng skill `playwright-automation` theo yêu cầu, trước hết đọc đầy đủ hướng dẫn của skill và đặc tả FR-01 trong README, rồi chạy/hoàn thiện bài test và kiểm chứng kết quả.

Skill yêu cầu bộ bằng chứng đầy đủ: tối thiểu 12 test case Markdown, dữ liệu ngoài, Playwright chạy riêng Chromium/Firefox/WebKit, report có StudentID và timestamp thật, rồi phân loại lỗi. Mình đang dò cấu trúc dự án, cách khởi động và StudentID có sẵn trong workspace để không tự bịa dữ liệu.

Mình đã xác nhận StudentID `23127062` từ báo cáo học phần trong workspace và thấy SUT cố ý có các điểm lệch FR-01 ở form/API. Bộ test sẽ kiểm tra độc lập validation email, tính duy nhất, các lớp mật khẩu, xác nhận mật khẩu và điều hướng thành công; dữ liệu test được tách JSON và email được làm duy nhất theo lần chạy.

Bộ suite đã qua kiểm tra cấu trúc: 15 test case, 15 dòng dữ liệu, 45 phép chạy (15 × 3 browser), đủ nhiều mẫu assertion. SUT đã sẵn sàng; mình sẽ chạy từng browser riêng với StudentID `23127062` và timestamp ISO thật để tạo ba HTML report độc lập.

Chromium lần đầu: 11 pass, 4 fail. Khi review failure, mình phát hiện TC-REG-006/007 đang bị lỗi regex mật khẩu chặn trước nên chưa thật sự kiểm tra được email/uniqueness—đây là lỗi thiết kế test, không phải pass đáng tin. Theo skill, mình sẽ giữ report ban đầu, sửa dữ liệu hai case để đi xuyên qua regex hiện tại và chạy lại, nhờ đó cô lập đúng hai quy tắc email.

Kết quả chính thức nhất quán trên cả 3 engine: mỗi browser 9 pass, 6 fail. Sáu failure quy về 4 lỗi sản phẩm có thể tái hiện và có bằng chứng thật: regex mật khẩu sai, không validation định dạng email, email không unique, và thiếu xác nhận mật khẩu. Mình đang ghi bug report, cập nhật traceability trong test case, rồi sẽ đối chiếu nhãn hiện có của GitHub trước khi tạo issue.

GitHub publication is blocked at the credential gate: `gh auth status` reports the active token for `lvkhang16` is invalid. Theo skill, mình không được claim đã tạo issue hoặc chọn/đặt nhãn khi chưa đọc được remote; mình sẽ giữ đủ 4 bug report cục bộ, ghi rõ blocker, rồi chạy validator cuối cho toàn bộ artifacts/report.

Đã hoàn tất kiểm thử FR-01 bằng skill `playwright-automation`.

Kết quả:

- 15 test case được tự động hóa, không có case bỏ sót.
- Chạy thật trên Chromium, Firefox và WebKit.
- Mỗi browser: 9 pass, 6 fail.
- Xác nhận 4 lỗi sản phẩm:
  - Regex từ chối mật khẩu hợp lệ.
  - Chấp nhận email sai định dạng.
  - Cho phép đăng ký trùng email.
  - Thiếu trường Xác nhận mật khẩu.
- Validator: `PASSED: 15 test cases`.
- Report có StudentID `23127062` và timestamp ISO thật.
- Các server tạm đã được dừng.

Tài liệu chính:

- [Tổng hợp kết quả](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/account-registration/README.md)
- [Playwright suite](/Users/lvkhang/Documents/uni/software-testing/HW04/tests/e2e/account-registration.spec.mjs)
- [Test data](/Users/lvkhang/Documents/uni/software-testing/HW04/tests/data/account-registration.json)
- [Chromium report](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/account-registration/chromium/index.html)
- [Firefox report](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/account-registration/firefox/index.html)
- [WebKit report](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/account-registration/webkit/index.html)
- [BUG-REG-001](/Users/lvkhang/Documents/uni/software-testing/HW04/bugs/account-registration/BUG-REG-001.md)
- [BUG-REG-002](/Users/lvkhang/Documents/uni/software-testing/HW04/bugs/account-registration/BUG-REG-002.md)
- [BUG-REG-003](/Users/lvkhang/Documents/uni/software-testing/HW04/bugs/account-registration/BUG-REG-003.md)
- [BUG-REG-004](/Users/lvkhang/Documents/uni/software-testing/HW04/bugs/account-registration/BUG-REG-004.md)

Chưa thể tạo GitHub Issues vì `gh auth status` báo token của `lvkhang16` không hợp lệ. Các bug report đã ghi rõ blocker; sau khi chạy `gh auth login -h github.com`, có thể tiếp tục đối chiếu label và xuất bản Issues.

Đúng, khả năng cao sandbox không truy cập được credential helper/keychain dù terminal thường vẫn dùng được. Mình sẽ tiếp tục theo `playwright-automation`, kiểm tra lại `gh` ngoài sandbox; nếu xác thực thành công, mình sẽ đọc convention label/issue hiện có rồi publish và verify từng bug.

Xác nhận của bạn đúng: ngoài sandbox, `gh` đăng nhập thành công bằng keyring và có quyền `repo`. Remote đã có đúng module label `Module: Register` cùng các label `Type: Bug`, `Severity: Major`, `Priority: P1`, `Status: New`, `found-by: test-case`; mình đang tìm duplicate theo module, tiêu đề và nội dung trước khi tạo issue.

Không cần tạo issue mới: remote đã có 4 issue trùng đúng theo từng lỗi của FR-01 (#2, #3, #7, #8). Theo skill mình sẽ tái sử dụng thay vì tạo duplicate, verify URL/title/labels của từng issue rồi cập nhật các bug report và test case cục bộ.

Đúng, nguyên nhân là sandbox không truy cập được keyring. Chạy ngoài sandbox, `gh` xác thực thành công.

Bốn lỗi đều đã có issue tương ứng nên mình tái sử dụng, tránh tạo duplicate:

- [BUG-REG-001 → Issue #2](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/2)
- [BUG-REG-002 → Issue #3](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/3)
- [BUG-REG-003 → Issue #7](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/7)
- [BUG-REG-004 → Issue #8](https://github.com/lmchkhi/CS423-CSC15003-Testing-N08/issues/8)

Các bug report, test case và [báo cáo tổng hợp](/Users/lvkhang/Documents/uni/software-testing/HW04/reports/account-registration/README.md) đã được cập nhật URL cùng labels thực tế. Validator cuối vẫn đạt: `PASSED: 15 test cases`.
'''

### (3) Verdict

**`INCOMPLETE`**

### (4) Reasoning

- AI tự động thêm phần `Suggested labels` và `Verified remote labels` vào bug report thay vì đi theo format có sẵn.
- Các phần hình ảnh trong evidence chỉ để path thay vì cho preview.
- Student ID chưa được hiển thị khi mở html report.
- TC-REG-006 và TC-REG-007 dùng dữ liệu mật khẩu sai đặc tả. Cụ thể: "Valid1 a".
- Cơ chế chờ response sẽ bị treo khi validation phía client hoạt động đúng. Khi type="email" được sửa đúng, TC-REG-006 sẽ bị HTML5 validation chặn trước request.

### (5) Student Fix

- Bỏ 2 phần đó và cập nhật lại agent skill.
- Chuyển các ảnh ở phần evidence sang dạng preview để dễ đọc hơn.
- Sửa lại để Student ID được hiển thị trong phần title khi mở report.
- Sửa lại dữ liệu mật khẩu trong TC-REG-006 và TC-REG-007 để tuân thủ đúng đặc tả.
- Sửa flaky wait: Không tạo chung waitForResponse cho cả malformed email và duplicate email.
